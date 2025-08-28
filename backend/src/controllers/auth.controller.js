const { validationResult } = require('express-validator');
const AuthService = require('../services/auth.service');
const { ApiResponse } = require('../utils/apiResponse');
const { ApiError } = require('../utils/apiError');

class AuthController {
    constructor() {
        this.authService = new AuthService();
    }

    register = async (req, res, next) => {
        try {
            // Validation
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                throw new ApiError(400, 'Validation Error', errors.array());
            }

            const { email, password, name } = req.body;
            const userData = await this.authService.registerUser({ email, password, name });
            
            return ApiResponse.success(res, userData, 'User registered successfully');
        } catch (error) {
            next(error);
        }
    };

    login = async (req, res, next) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                throw new ApiError(400, 'Validation Error', errors.array());
            }

            const { email, password } = req.body;
            const authData = await this.authService.loginUser({ email, password });
            
            return ApiResponse.success(res, authData, 'Login successful');
        } catch (error) {
            next(error);
        }
    };

    getProfile = async (req, res, next) => {
        try {
            const userId = req.user.id; // From auth middleware
            const userProfile = await this.authService.getUserProfile(userId);
            
            return ApiResponse.success(res, userProfile, 'Profile retrieved successfully');
        } catch (error) {
            next(error);
        }
    };
}

module.exports = new AuthController();
