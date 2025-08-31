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

            // Only accept allowed fields, ignore role if sent
            const { email, password, firstName, lastName } = req.body;
            const userData = await this.authService.registerUser({ 
                email, 
                password, 
                firstName, 
                lastName
            });
            
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
            const userId = req.user.id;
            const userProfile = await this.authService.getUserProfile(userId);
            
            return ApiResponse.success(res, userProfile, 'Profile retrieved successfully');
        } catch (error) {
            next(error);
        }
    };

    getAllUsers = async (req, res, next) => {
        try {
            // Check if user is admin
            if (req.user.role !== 'admin') {
                throw new ApiError(403, 'Access denied. Admin only.');
            }

            // Get pagination parameters
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 10;

            // Get users with requesting user's ID for double security
            const usersData = await this.authService.getAllUsers(page, limit, req.user.id);
            
            return ApiResponse.success(res, usersData, 'Users retrieved successfully');
        } catch (error) {
            next(error);
        }
    };

    makeUserAdmin = async (req, res, next) => {
        try {
            // Check if user is admin
            if (req.user.role !== 'admin') {
                throw new ApiError(403, 'Access denied. Admin only.');
            }

            const { email } = req.body;
            const updatedUser = await this.authService.makeUserAdmin(email, req.user.id);
            
            return ApiResponse.success(res, updatedUser, 'User role updated to admin successfully');
        } catch (error) {
            next(error);
        }
    };

    deleteUser = async (req, res, next) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                throw new ApiError(400, 'Validation Error', errors.array());
            }

            // Check if user is admin
            if (req.user.role !== 'admin') {
                throw new ApiError(403, 'Access denied. Admin only.');
            }

            const { userId } = req.params;
            const result = await this.authService.deleteUser(userId, req.user.id);
            
            return ApiResponse.success(res, result, 'User deleted successfully');
        } catch (error) {
            next(error);
        }
    };
}

module.exports = new AuthController();