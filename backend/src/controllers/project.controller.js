const { validationResult } = require('express-validator');
const ProjectService = require('../services/project.service');
const { ApiResponse } = require('../utils/apiResponse');
const { ApiError } = require('../utils/apiError');

class ProjectController {
    constructor() {
        this.projectService = new ProjectService();
    }

    createProject = async (req, res, next) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                throw new ApiError(400, 'Validation Error', errors.array());
            }

            // Ensure only clients can create projects
            if (req.user.role !== 'client_owner') {
                throw new ApiError(403, 'Only clients can create projects');
            }

            const projectData = {
                project_type: req.body.project_type,
                location: req.body.location,
                area_sqft: req.body.area_sqft,
                phases: req.body.phases,
                timeline_months: req.body.timeline_months,
                services_needed: req.body.services_needed,
                material_spec: req.body.material_spec,
                unique_factors: req.body.unique_factors || []
            };

            const project = await this.projectService.createProject(req.user.id, projectData);
            return ApiResponse.success(res, project, 'Project created successfully');
        } catch (error) {
            next(error);
        }
    };

    getProject = async (req, res, next) => {
        try {
            const project = await this.projectService.getProjectById(req.params.id, req.user.id);
            return ApiResponse.success(res, project, 'Project retrieved successfully');
        } catch (error) {
            next(error);
        }
    };

    getClientProjects = async (req, res, next) => {
        try {
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 10;

            const result = await this.projectService.getClientProjects(req.user.id, page, limit);
            return ApiResponse.success(res, result, 'Projects retrieved successfully');
        } catch (error) {
            next(error);
        }
    };

    updateProject = async (req, res, next) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                throw new ApiError(400, 'Validation Error', errors.array());
            }

            const updateData = {
                project_type: req.body.project_type,
                location: req.body.location,
                area_sqft: req.body.area_sqft,
                phases: req.body.phases,
                timeline_months: req.body.timeline_months,
                services_needed: req.body.services_needed,
                material_spec: req.body.material_spec,
                unique_factors: req.body.unique_factors
            };

            // Remove undefined fields
            Object.keys(updateData).forEach(key => 
                updateData[key] === undefined && delete updateData[key]
            );

            const project = await this.projectService.updateProject(
                req.params.id,
                req.user.id,
                updateData
            );
            return ApiResponse.success(res, project, 'Project updated successfully');
        } catch (error) {
            next(error);
        }
    };

    deleteProject = async (req, res, next) => {
        try {
            await this.projectService.deleteProject(req.params.id, req.user.id);
            return ApiResponse.success(res, null, 'Project deleted successfully');
        } catch (error) {
            next(error);
        }
    };
}

module.exports = new ProjectController();
