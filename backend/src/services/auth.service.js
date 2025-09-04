const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const UserRepository = require('../repositories/user.repository');
const { ApiError } = require('../utils/apiError');

class AuthService {
    constructor() {
        this.userRepository = new UserRepository();
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
        // Add role-specific fields
        if (cleanData.role === 'vendor_supplier' || cleanData.role === 'construction_firm') {
            userData.phone = cleanData.phone;
        }
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
        // Find user
        const user = await this.userRepository.findByEmail(email);
        if (!user) {
            throw new ApiError(404, 'No account found with this email. Please sign up first.');
        }

        // Verify role matches
        if (user.role !== role) {
            throw new ApiError(401, 'Invalid role for this account');
        }

        // Verify password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw new ApiError(401, 'Incorrect password. Please try again.');
        }

        // Generate token
        const token = this.generateToken(user);

        return {
            user: this.sanitizeUser(user),
            token
        };
    }

    async getUserProfile(userId) {
        const user = await this.userRepository.findById(userId);
        if (!user) {
            throw new ApiError(404, 'User not found');
        }
        return this.sanitizeUser(user);
    }

    generateToken(user) {
        return jwt.sign(
            { 
                id: user._id,
                role: user.role
            },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );
    }

    sanitizeUser(user) {
        const { password, ...sanitizedUser } = user.toObject();
        return sanitizedUser;
    }
}

module.exports = AuthService;