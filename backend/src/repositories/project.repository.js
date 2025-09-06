const Project = require('../models/project.model');

class ProjectRepository {
    async create(projectData) {
        return await Project.create(projectData);
    }

    async findById(id) {
        return await Project.findById(id).populate('client', '-password');
    }

    async findByClientId(clientId, skip = 0, limit = 10) {
        return await Project.find({ client: clientId })
            .sort({ created_at: -1 })
            .skip(skip)
            .limit(limit)
            .populate('client', '-password');
    }

    async update(id, updateData) {
        return await Project.findByIdAndUpdate(id, updateData, { new: true })
            .populate('client', '-password');
    }

    async delete(id) {
        return await Project.findByIdAndDelete(id);
    }

    async findAll(skip = 0, limit = 10) {
        return await Project.find()
            .sort({ created_at: -1 })
            .skip(skip)
            .limit(limit)
            .populate('client', '-password');
    }

    async updateBudgetEstimate(id, estimateData) {
        const updateData = {
            'budget_estimate.min_amount': estimateData.min_amount,
            'budget_estimate.max_amount': estimateData.max_amount,
            'budget_estimate.generated_at': new Date(),
            status: 'estimated'
        };
        return await Project.findByIdAndUpdate(id, updateData, { new: true })
            .populate('client', '-password');
    }

    async count() {
        return await Project.countDocuments();
    }
}

module.exports = ProjectRepository;
