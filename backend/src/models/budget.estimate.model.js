const mongoose = require('mongoose');

const budgetEstimateSchema = new mongoose.Schema({
    project_name: {
        type: String,
        required: [true, 'Project name is required'],
        trim: true
    },
    project_type: {
        type: String,
        required: [true, 'Project type is required'],
        enum: [
            'residential',
            'commercial',
            'industrial',
            'landscaping',
            'renovation',
            'interior'
        ]
    },
    location: {
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
        coordinates: {
            latitude: Number,
            longitude: Number
        }
    },
    general: {
        area_sqm: {
            type: Number,
            required: [true, 'Area in square meters is required'],
            min: [10, 'Area must be at least 10 square meters']
        },
        timeline_months: {
            type: Number,
            required: [true, 'Timeline in months is required'],
            min: [1, 'Timeline must be at least 1 month']
        },
        budget_range: {
            min: {
                type: Number,
                required: [true, 'Minimum budget is required']
            },
            max: {
                type: Number,
                required: [true, 'Maximum budget is required']
            }
        },
        current_role: {
            type: String,
            required: [true, 'Current role is required'],
            enum: ['client', 'contractor', 'architect', 'consultant']
        },
        special_requirements: [{
            type: String,
            trim: true
        }]
    },
    quality_option: {
        type: String,
        required: [true, 'Quality option is required'],
        enum: ['basic', 'standard', 'premium', 'luxury']
    },
    details: {
        // Residential specific
        residential: {
            floors: Number,
            bedrooms: Number,
            bathrooms: Number,
            kitchen_type: String,
            parking_spaces: Number,
            balconies: Number,
            elevator: Boolean,
            swimming_pool: Boolean
        },
        // Commercial specific
        commercial: {
            floors: Number,
            office_spaces: Number,
            conference_rooms: Number,
            reception_area: Boolean,
            parking_spaces: Number,
            elevator: Boolean,
            cafeteria: Boolean
        },
        // Industrial specific
        industrial: {
            building_height: Number,
            loading_docks: Number,
            office_space_percentage: Number,
            heavy_machinery_support: Boolean,
            ventilation_type: String,
            floor_load_capacity: Number
        },
        // Landscaping specific
        landscaping: {
            green_area_percentage: Number,
            pavement_type: String,
            irrigation_system: String,
            lighting_type: String,
            water_features: Boolean,
            outdoor_structures: [String]
        },
        // Renovation specific
        renovation: {
            building_age: Number,
            scope_areas: [String],
            structural_changes: Boolean,
            utility_upgrade: Boolean,
            heritage_building: Boolean
        },
        // Interior specific
        interior: {
            rooms: Number,
            style_theme: String,
            custom_furniture: Boolean,
            smart_home: Boolean,
            lighting_plan: String
        }
    },
    cost_breakdown_preferences: [{
        type: String,
        enum: [
            'materials',
            'labor',
            'equipment',
            'permits',
            'utilities',
            'finishes',
            'landscaping',
            'technology',
            'safety',
            'management'
        ]
    }],
    estimate_result: {
        total_cost: {
            min: {
                type: Number,
                required: false
            },
            max: {
                type: Number,
                required: false
            },
            currency: {
                type: String,
                default: 'INR'
            }
        },
        cost_breakdown: [{
            _id: false,
            category: {
                type: String,
                required: false
            },
            amount: {
                min: {
                    type: Number,
                    required: false
                },
                max: {
                    type: Number,
                    required: false
                }
            },
            percentage: {
                type: Number,
                required: false
            },
            details: [{
                _id: false,
                item: {
                    type: String,
                    required: false
                },
                quantity: {
                    type: String,
                    required: false
                },
                unit_cost: {
                    type: Number,
                    required: false
                },
                total_cost: {
                    type: Number,
                    required: false
                }
            }]
        }],
        factors_considered: [{
            _id: false,
            factor: {
                type: String,
                required: false
            },
            impact: {
                type: String,
                required: false
            },
            percentage_effect: {
                type: Number,
                required: false
            }
        }],
        recommendations: [{
            _id: false,
            type: {
                type: String,
                required: false
            },
            description: {
                type: String,
                required: false
            },
            potential_savings: {
                type: Number,
                required: false
            }
        }]
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date,
        default: Date.now
    },
    status: {
        type: String,
        enum: ['pending', 'processing', 'completed', 'failed'],
        default: 'pending'
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

// Update timestamp on save
budgetEstimateSchema.pre('save', function(next) {
    this.updated_at = new Date();
    next();
});

module.exports = mongoose.model('BudgetEstimate', budgetEstimateSchema);
