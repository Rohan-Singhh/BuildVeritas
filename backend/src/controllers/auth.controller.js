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

            console.log('Request body:', {
                ...req.body,
                gstNumber: req.body.gstNumber ? `[${req.body.gstNumber}]` : undefined
            });

            // Basic validation for required fields
            const { email, password, firstName, lastName, role, phone, companyName, gstNumber } = req.body;
            
            if (!email?.trim() || !password || !firstName?.trim() || !lastName?.trim() || !role || !phone) {
                throw new ApiError(400, 'Email, password, first name, last name, role, and phone number are required');
            }

            // Validate phone number format
            if (!/^[0-9]{10}$/.test(phone)) {
                throw new ApiError(400, 'Please provide a valid 10-digit phone number');
            }

            // Role-specific validation
            switch (role) {
                case 'client_owner':
                    // Client only needs basic fields
                    break;

                case 'vendor_supplier':
                case 'construction_firm':
                    if (!phone) {
                        throw new ApiError(400, `Phone number is required for ${role === 'vendor_supplier' ? 'vendors/suppliers' : 'construction firms'}`);
                    }
                    if (!/^[0-9]{10}$/.test(phone)) {
                        throw new ApiError(400, 'Please provide a valid 10-digit phone number');
                    }

                    if (role === 'construction_firm') {
                        if (!companyName?.trim()) {
                            throw new ApiError(400, 'Company name is required for construction firms');
                        }
                        if (!gstNumber?.trim()) {
                            throw new ApiError(400, 'GST number is required for construction firms');
                        }
                    }
                    break;

                default:
                    throw new ApiError(400, 'Invalid role specified');
            }

            // Pass the complete body to service for processing
            const userData = await this.authService.registerUser(req.body);
            
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

            const { email, password, role } = req.body;

            // Validate required fields
            if (!email || !password || !role) {
                throw new ApiError(400, 'Email, password, and role are required');
            }

            const authData = await this.authService.loginUser({ email, password, role });
            
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
}

module.exports = new AuthController();