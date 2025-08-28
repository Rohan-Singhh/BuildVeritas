const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserRepository = require('../repositories/user.repository');
const { ApiError } = require('../utils/apiError');

class AuthService {
    constructor() {
        this.userRepository = new UserRepository();
    }

    async registerUser({ email, password, name }) {
        // Check if user exists
        const existingUser = await this.userRepository.findByEmail(email);
        if (existingUser) {
            throw new ApiError(400, 'User already exists');
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 12);

        // Create user
        const user = await this.userRepository.create({
            email,
            password: hashedPassword,
            name,
            role: 'client' // Default role for now
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
            throw new ApiError(401, 'Invalid credentials');
        }

        // Verify password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw new ApiError(401, 'Invalid credentials');
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
