const mongoose = require('mongoose');

const vendorProfileSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true
    },
    companyName: {
        type: String,
        required: [true, 'Company name is required'],
        trim: true
    },
    location: {
        address: {
            type: String,
            required: [true, 'Address is required'],
            trim: true
        },
        city: {
            type: String,
            required: [true, 'City is required'],
            trim: true
        },
        state: {
            type: String,
            required: [true, 'State is required'],
            trim: true
        },
        pincode: {
            type: String,
            required: [true, 'Pincode is required'],
            match: [/^[1-9][0-9]{5}$/, 'Please enter a valid 6-digit pincode']
        }
    },
    contactInfo: {
        email: {
            type: String,
            required: [true, 'Email is required'],
            trim: true,
            lowercase: true,
            match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
        },
        phone: {
            type: String,
            required: [true, 'Phone number is required'],
            match: [/^[0-9]{10}$/, 'Please enter a valid 10-digit phone number']
        },
        alternatePhone: {
            type: String,
            match: [/^[0-9]{10}$/, 'Please enter a valid 10-digit phone number']
        }
    },
    experience: {
        yearsInBusiness: {
            type: Number,
            required: [true, 'Years of experience is required'],
            min: [0, 'Years of experience cannot be negative']
        },
        totalProjects: {
            type: Number,
            required: [true, 'Total number of projects is required'],
            min: [0, 'Total projects cannot be negative']
        }
    },
    companyLogo: {
        type: String,
        required: [true, 'Company logo is required']
    },
    companyPhotos: [{
        type: String,
        required: [true, 'Company photos are required']
    }],
    services: [{
        type: String,
        required: [true, 'At least one service is required']
    }],
    specializations: [{
        type: String
    }],
    certifications: [{
        name: {
            type: String,
            required: true
        },
        issuedBy: {
            type: String,
            required: true
        },
        year: {
            type: Number,
            required: true
        }
    }],
    ratings: {
        average: {
            type: Number,
            default: 0,
            min: 0,
            max: 5
        },
        count: {
            type: Number,
            default: 0
        }
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    status: {
        type: String,
        enum: ['active', 'inactive', 'suspended'],
        default: 'active'
    }
}, {
    timestamps: true
});

// Index for efficient queries
vendorProfileSchema.index({ 'location.city': 1, 'location.state': 1 });
vendorProfileSchema.index({ 'ratings.average': -1 });
vendorProfileSchema.index({ 'experience.yearsInBusiness': -1 });

module.exports = mongoose.model('VendorProfile', vendorProfileSchema);
