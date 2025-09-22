const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const UserRepository = require('../repositories/user.repository');
const { ApiError } = require('../utils/apiError');

// Constants for performance optimization
const SALT_ROUNDS = 12;
const TOKEN_EXPIRY = '24h';
const LOGIN_TIMEOUT = 30000; // 30 seconds

// Cache for frequently accessed users
const userCache = new Map();
const USER_CACHE_MAX_SIZE = 1000;
const USER_CACHE_EXPIRY = 5 * 60 * 1000; // 5 minutes

class AuthService {
    constructor() {
        this.userRepository = new UserRepository();
        
        // Clean expired users from cache periodically
        setInterval(() => {
            const now = Date.now();
            for (const [key, value] of userCache.entries()) {
                if (now > value.expiresAt) {
                    userCache.delete(key);
                }
            }
        }, 60000); // Clean every minute
    }

    // Helper method to manage user cache
    async getCachedUser(email) {
        const cachedUser = userCache.get(email);
        if (cachedUser && Date.now() <= cachedUser.expiresAt) {
            return cachedUser.user;
        }
        return null;
    }

    // Helper method to cache user
    cacheUser(email, user) {
        if (userCache.size >= USER_CACHE_MAX_SIZE) {
            const oldestKey = userCache.keys().next().value;
            userCache.delete(oldestKey);
        }
        userCache.set(email, {
            user,
            expiresAt: Date.now() + USER_CACHE_EXPIRY
        });
    }

    async registerUser(data) {
        console.log('Raw registration data:', {
            ...data,
            gstNumber: data.gstNumber ? `[${data.gstNumber}]` : undefined
        });

        // Clean and validate the data
        const cleanData = {
            ...data,
            email: data.email?.trim().toLowerCase(),
            firstName: data.firstName?.trim(),
            lastName: data.lastName?.trim(),
            companyName: data.companyName?.trim(),
            // Handle GST number specially for construction firms
            gstNumber: data.role === 'construction_firm' ? data.gstNumber?.trim().toUpperCase() : undefined
        };

        console.log('Processing registration data:', {
            email: cleanData.email,
            role: cleanData.role,
            companyName: cleanData.companyName,
            gstNumber: cleanData.gstNumber ? `[${cleanData.gstNumber}]` : undefined,
            hasGST: Boolean(cleanData.gstNumber)
        });
        
        // Check if user exists
        const existingUser = await this.userRepository.findByEmail(cleanData.email);
        if (existingUser) {
            throw new ApiError(400, 'User already exists');
        }
        // Validate role
        const validRoles = ['client_owner', 'vendor_supplier', 'construction_firm'];
        if (!validRoles.includes(cleanData.role)) {
            throw new ApiError(400, 'Invalid role specified');
        }
        // Hash password
        const hashedPassword = await bcrypt.hash(cleanData.password, 12);
        // Create user with role-specific fields
        const userData = {
            email: cleanData.email,
            password: hashedPassword,
            firstName: cleanData.firstName,
            lastName: cleanData.lastName,
            role: cleanData.role
        };
        // Add phone number for all users
        userData.phone = cleanData.phone;
        if (cleanData.role === 'construction_firm') {
            if (!cleanData.companyName?.trim()) {
                throw new ApiError(400, 'Company name is required for construction firms');
            }
            if (!cleanData.gstNumber?.trim()) {
                throw new ApiError(400, 'GST number is required for construction firms');
            }
            // Validate GST format
            const gstPattern = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z][1-9A-Z]Z[0-9A-Z]$/;
            if (!gstPattern.test(cleanData.gstNumber)) {
                throw new ApiError(400, 'Invalid GST number format. Example: 27ABCDE1234F1Z5');
            }
            userData.companyName = cleanData.companyName;
            userData.gstNumber = cleanData.gstNumber;
            console.log('Construction firm data:', { companyName: userData.companyName, gstNumber: userData.gstNumber });
        }
        const user = await this.userRepository.create(userData);
        // Generate token
        const token = this.generateToken(user);
        return {
            user: this.sanitizeUser(user),
            token
        };
    }

    async loginUser({ email, password, role }) {
        try {
            // Set timeout for login operation
            const loginPromise = this._performLogin({ email, password, role });
            const timeoutPromise = new Promise((_, reject) => {
                setTimeout(() => reject(new ApiError(408, 'Login request timed out')), LOGIN_TIMEOUT);
            });

            return await Promise.race([loginPromise, timeoutPromise]);
        } catch (error) {
            if (error.statusCode === 408) {
                console.error('Login timeout:', { email, role });
            }
            throw error;
        }
    }

    async _performLogin({ email, password, role }) {
        try {
            // Normalize and clean email
            const normalizedEmail = email?.trim().toLowerCase();
            if (!normalizedEmail) {
                throw new ApiError(400, 'Email is required');
            }

            // Clean password
            if (!password?.trim()) {
                throw new ApiError(400, 'Password is required');
            }

            // Check cache first
            let user = await this.getCachedUser(normalizedEmail);
            
            if (!user) {
                // Find user with normalized email if not in cache
                user = await this.userRepository.findByEmail(normalizedEmail);
                if (!user) {
                    throw new ApiError(404, 'No account found with this email. Please sign up first.');
                }
                // Cache the user for future requests
                this.cacheUser(normalizedEmail, user);
            }

            // Verify role matches
            if (user.role !== role) {
                throw new ApiError(401, 'Invalid role for this account');
            }

            // Verify password with cleaned input
            const isPasswordValid = await bcrypt.compare(password.trim(), user.password);
            if (!isPasswordValid) {
                throw new ApiError(401, 'Incorrect password. Please try again.');
            }

            // Check if JWT_SECRET is properly set
            if (!process.env.JWT_SECRET) {
                throw new ApiError(500, 'Authentication service configuration error');
            }

            // Generate token
            const token = this.generateToken(user);

            return {
                user: this.sanitizeUser(user),
                token
            };
        } catch (error) {
            // Log the error for debugging (but don't expose details to client)
            console.error('Login error:', error);
            throw error;
        }
    }

    async getUserProfile(userId) {
        const user = await this.userRepository.findById(userId);
        if (!user) {
            throw new ApiError(404, 'User not found');
        }
        return this.sanitizeUser(user);
    }

    generateToken(user) {
        try {
            return jwt.sign(
                { 
                    id: user._id,
                    role: user.role
                },
                process.env.JWT_SECRET,
                { 
                    expiresIn: TOKEN_EXPIRY,
                    algorithm: 'HS256' // Specify faster algorithm
                }
            );
        } catch (error) {
            console.error('Token generation error:', error);
            throw new ApiError(500, 'Failed to generate authentication token');
        }
    }

    sanitizeUser(user) {
        const { password, ...sanitizedUser } = user.toObject();
        return sanitizedUser;
    }
}

module.exports = AuthService;