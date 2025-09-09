const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    client: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Client reference is required']
    },
    project_type: {
        type: String,
        required:[true, 'Project type is required'],
        trim: true
    },
    location: {
        type: String,
        required: [true, 'Location is required'],
        trim: true
    },
    area_sqft: {
        type: Number,
        required: [true, 'Area in square feet is required'],
        min: [100, 'Area must be at least 100 square feet']
    },
    phases: {
        type: Number,
        required: [true, 'Number of phases is required'],
        min: [1, 'Must have at least 1 phase']
    },
    timeline_months: {
        type: Number,
        required: [true, 'Timeline in months is required'],
        min: [1, 'Timeline must be at least 1 month']
    },
    services_needed: {
        type: [String],
        required: [true, 'At least one service is required'],
        validate: {
            validator: function(array) {
                return array && array.length > 0;
            },
            message: 'At least one service must be specified'
        }
    },
    material_spec: {
        type: [String],
        required: [true, 'Material specifications are required'],
        validate: {
            validator: function(array) {
                return array && array.length > 0;
            },
            message: 'At least one material specification must be specified'
        }
    },
    unique_factors: {
        type: [String],
        default: []
    },
    status: {
        type: String,
        enum: ['pending', 'processing', 'estimated', 'rejected'],
        default: 'pending'
    },
    budget_estimate: {
        min_amount: Number,
        max_amount: Number,
        currency: {
            type: String,
            default: 'INR'
        },
        generated_at: Date
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date,
        default: Date.now
    }
});

// Update the updated_at timestamp before saving
projectSchema.pre('save', function(next) {
    this.updated_at = new Date();
    next();
});

module.exports = mongoose.model('Project', projectSchema);
