const { validationResult } = require('express-validator');
const vendorProfileService = require('../services/vendor.profile.service');
const { ApiResponse } = require('../utils/apiResponse');
const { ApiError } = require('../utils/apiError');

class VendorProfileController {
    constructor() {
        this.createProfile = this.createProfile.bind(this);
        this.updateProfile = this.updateProfile.bind(this);
        this.getProfile = this.getProfile.bind(this);
        this.getAllVendors = this.getAllVendors.bind(this);
        this.searchVendors = this.searchVendors.bind(this);
        this.deleteProfile = this.deleteProfile.bind(this);
        this.softDeleteProfile = this.softDeleteProfile.bind(this);
    }

    async createProfile(req, res, next) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                throw new ApiError(400, 'Validation Error', errors.array());
            }

            // Only vendor_supplier role can create profiles
            if (req.user.role !== 'vendor_supplier') {
                throw new ApiError(403, 'Only vendors can create vendor profiles');
            }

            const profile = await vendorProfileService.createProfile(req.user.id, req.body);
            return ApiResponse.success(res, profile, 'Vendor profile created successfully');
        } catch (error) {
            next(error);
        }
    }

    async updateProfile(req, res, next) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                throw new ApiError(400, 'Validation Error', errors.array());
            }

            const profile = await vendorProfileService.updateProfile(req.user.id, req.body);
            return ApiResponse.success(res, profile, 'Vendor profile updated successfully');
        } catch (error) {
            next(error);
        }
    }

    async getProfile(req, res, next) {
        try {
            const profile = await vendorProfileService.getProfileById(req.params.id);
            return ApiResponse.success(res, profile, 'Vendor profile retrieved successfully');
        } catch (error) {
            next(error);
        }
    }

    async getAllVendors(req, res, next) {
        try {
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 10;
            const sortBy = req.query.sortBy || 'ratings.average';
            const order = req.query.order || 'desc';

            const vendors = await vendorProfileService.getAllVendors(page, limit, sortBy, order);
            return ApiResponse.success(res, vendors, 'Vendors retrieved successfully');
        } catch (error) {
            next(error);
        }
    }

    async searchVendors(req, res, next) {
        try {
            const {
                city,
                state,
                services,
                minExperience,
                minRating,
                page = 1,
                limit = 10
            } = req.query;

            const searchCriteria = {
                city,
                state,
                services: services ? services.split(',') : undefined,
                minExperience: minExperience ? parseInt(minExperience) : undefined,
                minRating: minRating ? parseFloat(minRating) : undefined
            };

            const results = await vendorProfileService.searchVendors(searchCriteria, page, limit);
            return ApiResponse.success(res, results, 'Search results retrieved successfully');
        } catch (error) {
            next(error);
        }
    }

    async deleteProfile(req, res, next) {
        try {
            // Only allow vendors to delete their own profile
            if (req.user.role !== 'vendor_supplier') {
                throw new ApiError(403, 'Only vendors can delete their profiles');
            }

            const profile = await vendorProfileService.deleteProfile(req.user.id);
            return ApiResponse.success(res, profile, 'Vendor profile deleted successfully');
        } catch (error) {
            next(error);
        }
    }

    async softDeleteProfile(req, res, next) {
        try {
            // Only allow vendors to soft delete their own profile
            if (req.user.role !== 'vendor_supplier') {
                throw new ApiError(403, 'Only vendors can deactivate their profiles');
            }

            const profile = await vendorProfileService.softDeleteProfile(req.user.id);
            return ApiResponse.success(res, profile, 'Vendor profile deactivated successfully');
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new VendorProfileController();
