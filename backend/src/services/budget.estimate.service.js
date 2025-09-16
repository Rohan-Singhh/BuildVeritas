const BudgetEstimate = require('../models/budget.estimate.model');
const { ApiError } = require('../utils/apiError');
const openRouterService = require('./openrouter.service');

class BudgetEstimateService {
    constructor() {
        this.openRouterService = openRouterService;
    }

    async createEstimate(userId, estimateData) {
        try {
            // Create initial estimate record
            const estimate = await BudgetEstimate.create({
                ...estimateData,
                user: userId,
                status: 'processing'
            });

            // Wait for AI estimate to complete
            console.log('Starting AI estimation...');
            const completeEstimate = await this.generateAIEstimate(estimate._id);
            console.log('AI estimation completed');

            return completeEstimate;
        } catch (error) {
            throw new ApiError(500, 'Error creating budget estimate', error);
        }
    }

    async generateAIEstimate(estimateId) {
        try {
            const estimate = await BudgetEstimate.findById(estimateId);
            if (!estimate) {
                throw new ApiError(404, 'Estimate not found');
            }

            // Set timeout for AI response (2 minutes)
            const timeout = new Promise((_, reject) => {
                setTimeout(() => {
                    reject(new ApiError(408, 'AI estimation timed out. Please try again.'));
                }, 120000); // 2 minutes
            });

            // Prepare prompt for AI
            const prompt = this.prepareAIPrompt(estimate);

            // Get AI response with timeout
            const aiResponse = await Promise.race([
                this.getAIResponse(prompt),
                timeout
            ]);

            // Parse and structure AI response
            const structuredEstimate = this.parseAIResponse(aiResponse);

            // Update estimate with AI results
            estimate.estimate_result = structuredEstimate;
            estimate.status = 'completed';
            await estimate.save();

            return estimate;
        } catch (error) {
            // Update estimate status to failed
            await BudgetEstimate.findByIdAndUpdate(estimateId, {
                status: 'failed'
            });
            throw new ApiError(500, 'Error generating AI estimate', error);
        }
    }

    prepareAIPrompt(estimate) {
        const projectDetails = this.getProjectTypeDetails(estimate);
        
        return `Estimate the construction cost for the following project:

Project Name: ${estimate.project_name}
Project Type: ${estimate.project_type}
Location: ${estimate.location.city}, ${estimate.location.state} (consider local labor and tax rates)
Area: ${estimate.general.area_sqm} sq.m
Timeline: ${estimate.general.timeline_months} months
Budget Range: INR ${estimate.general.budget_range.min.toLocaleString()} - INR ${estimate.general.budget_range.max.toLocaleString()}
Special Requirements: ${estimate.general.special_requirements.join(', ')}
Current Role: ${estimate.general.current_role}
Quality Option: ${estimate.quality_option}

Details:
${projectDetails}

Provide a detailed cost breakdown including:
${estimate.cost_breakdown_preferences.join(', ')}
Adjust costs for city-wise labor and tax rates.

Response Format:
{
    "total_cost": {
        "min": number,
        "max": number
    },
    "cost_breakdown": [
        {
            "category": "string",
            "amount": {
                "min": number,
                "max": number
            },
            "percentage": number,
            "details": [
                {
                    "item": "string",
                    "quantity": "string",
                    "unit_cost": number,
                    "total_cost": number
                }
            ]
        }
    ],
    "factors_considered": [
        {
            "factor": "string",
            "impact": "string",
            "percentage_effect": number
        }
    ],
    "recommendations": [
        {
            "type": "string",
            "description": "string",
            "potential_savings": number
        }
    ]
}`;
    }

    getProjectTypeDetails(estimate) {
        const details = estimate.details[estimate.project_type];
        if (!details) return '';

        return Object.entries(details)
            .map(([key, value]) => `- ${key.replace(/_/g, ' ')}: ${value}`)
            .join('\n');
    }

    async getAIResponse(prompt) {
        try {
            return await this.openRouterService.getBudgetEstimate(prompt);
        } catch (error) {
            throw new ApiError(500, 'Error getting AI response', error);
        }
    }

    parseAIResponse(response) {
        try {
            // Response is already JSON from OpenRouter service
            return response;
        } catch (error) {
            throw new ApiError(500, 'Error parsing AI response', error);
        }
    }

    async getEstimate(estimateId, userId) {
        const estimate = await BudgetEstimate.findOne({
            _id: estimateId,
            user: userId
        });
        
        if (!estimate) {
            throw new ApiError(404, 'Estimate not found');
        }
        
        return estimate;
    }

    async getUserEstimates(userId, page = 1, limit = 10) {
        const estimates = await BudgetEstimate.find({ user: userId })
            .sort({ created_at: -1 })
            .skip((page - 1) * limit)
            .limit(limit);
            
        const total = await BudgetEstimate.countDocuments({ user: userId });
        
        return {
            estimates,
            total,
            page,
            pages: Math.ceil(total / limit)
        };
    }
}

module.exports = new BudgetEstimateService();
