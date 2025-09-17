const VendorProfile = require('../models/vendor.profile.model');
const { ApiError } = require('../utils/apiError');

class VendorProfileService {
    async createProfile(userId, profileData) {
        // Check if profile already exists
        const existingProfile = await VendorProfile.findOne({ user: userId });
        if (existingProfile) {
            throw new ApiError(400, 'Vendor profile already exists');
        }

        // Create new profile
        const profile = new VendorProfile({
            user: userId,
            ...profileData
        });

        return await profile.save();
    }

    async updateProfile(userId, updateData) {
        const profile = await VendorProfile.findOneAndUpdate(
            { user: userId },
            { $set: updateData },
            { new: true, runValidators: true }
        );

        if (!profile) {
            throw new ApiError(404, 'Vendor profile not found');
        }

        return profile;
    }

    async getProfileById(profileId) {
        const profile = await VendorProfile.findById(profileId)
            .populate('user', 'firstName lastName email');

        if (!profile) {
            throw new ApiError(404, 'Vendor profile not found');
        }

        return profile;
    }

    async getAllVendors(page = 1, limit = 10, sortBy = 'ratings.average', order = 'desc') {
        const skip = (page - 1) * limit;
        const sortOptions = {};
        sortOptions[sortBy] = order === 'desc' ? -1 : 1;

        const [vendors, total] = await Promise.all([
            VendorProfile.find({ status: 'active' })
                .populate('user', 'firstName lastName')
                .sort(sortOptions)
                .skip(skip)
                .limit(limit),
            VendorProfile.countDocuments({ status: 'active' })
        ]);

        return {
            vendors,
            pagination: {
                currentPage: page,
                totalPages: Math.ceil(total / limit),
                totalItems: total,
                hasMore: page * limit < total
            }
        };
    }

    async searchVendors(criteria, page = 1, limit = 10) {
        const query = { status: 'active' };

        if (criteria.city) {
            query['location.city'] = new RegExp(criteria.city, 'i');
        }
        if (criteria.state) {
            query['location.state'] = new RegExp(criteria.state, 'i');
        }
        if (criteria.services) {
            query.services = { $in: criteria.services };
        }
        if (criteria.minExperience) {
            query['experience.yearsInBusiness'] = { $gte: criteria.minExperience };
        }
        if (criteria.minRating) {
            query['ratings.average'] = { $gte: criteria.minRating };
        }

        const skip = (page - 1) * limit;

        const [vendors, total] = await Promise.all([
            VendorProfile.find(query)
                .populate('user', 'firstName lastName')
                .sort({ 'ratings.average': -1, 'experience.yearsInBusiness': -1 })
                .skip(skip)
                .limit(limit),
            VendorProfile.countDocuments(query)
        ]);

        return {
            vendors,
            pagination: {
                currentPage: page,
                totalPages: Math.ceil(total / limit),
                totalItems: total,
                hasMore: page * limit < total
            }
        };
    }
}

module.exports = new VendorProfileService();
