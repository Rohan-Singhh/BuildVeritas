const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const UserRepository = require('../repositories/user.repository');
const { ApiError } = require('../utils/apiError');

class AuthService {
    constructor() {
        this.userRepository = new UserRepository();
    }

    async registerUser({ email, password, firstName, lastName }) {
        // Check if user exists
        const existingUser = await this.userRepository.findByEmail(email);
        if (existingUser) {
            throw new ApiError(400, 'User already exists');
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 12);

        // Create user - ALWAYS as client, ignore any role sent from frontend
        const user = await this.userRepository.create({
            email,
            password: hashedPassword,
            firstName,
            lastName,
            role: 'client' // Hardcoded role, can't be overridden from frontend
        });

        // Generate token
        const token = this.generateToken(user);

        return {
            user: this.sanitizeUser(user),
            token
        };
    }

    async loginUser({ email, password }) {
        // Find user
        const user = await this.userRepository.findByEmail(email);
        if (!user) {
            throw new ApiError(404, 'No account found with this email. Please sign up first.');
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

    async getAllUsers(page = 1, limit = 20, requestingUserId) {
        // Verify admin status again as double security
        const adminUser = await this.userRepository.findById(requestingUserId);
        if (!adminUser || adminUser.role !== 'admin') {
            throw new ApiError(403, 'Access denied. Admin only.');
        }

        // Get paginated users
        const skip = (page - 1) * limit;
        const users = await this.userRepository.findAll(skip, limit);
        
        // Get total count for pagination
        const total = await this.userRepository.count();
        
        // Sanitize user data and remove sensitive info
        const sanitizedUsers = users.map(user => ({
            id: user._id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            createdAt: user.createdAt,
            // Only show role to admins
            ...(adminUser.role === 'admin' ? { role: user.role } : {})
        }));
        
        return {
            users: sanitizedUsers,
            pagination: {
                total,
                page,
                limit,
                pages: Math.ceil(total / limit)
            }
        };
    }

    async makeUserAdmin(email, requestingUserId) {
        // Double-check admin status
        const adminUser = await this.userRepository.findById(requestingUserId);
        if (!adminUser || adminUser.role !== 'admin') {
            throw new ApiError(403, 'Access denied. Admin only.');
        }

        // Add rate limiting for this sensitive operation
        // You might want to add a rate limiter middleware here

        const user = await this.userRepository.findByEmail(email);
        if (!user) {
            throw new ApiError(404, 'User not found');
        }
        
        user.role = 'admin';
        await user.save();
        
        return this.sanitizeUser(user);
    }

    async deleteUser(userId, requestingUserId) {
        // Double-check admin status
        const adminUser = await this.userRepository.findById(requestingUserId);
        if (!adminUser || adminUser.role !== 'admin') {
            throw new ApiError(403, 'Access denied. Admin only.');
        }

        // Get the user to be deleted
        const userToDelete = await this.userRepository.findById(userId);
        if (!userToDelete) {
            throw new ApiError(404, 'User not found');
        }

        // Prevent admin from deleting themselves
        if (userId === requestingUserId) {
            throw new ApiError(400, 'Admins cannot delete their own account');
        }

        // Delete the user
        await this.userRepository.deleteById(userId);

        return {
            message: 'User deleted successfully',
            deletedUser: this.sanitizeUser(userToDelete)
        };
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