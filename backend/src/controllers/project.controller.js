const projectService = require('../services/project.service');
const { ApiError } = require('../utils/apiError');
const { ApiResponse } = require('../utils/apiResponse');

class ProjectController {
    /**
     * Create and publish a project
     */
    async createAndPublish(req, res, next) {
        try {
            console.log('User from request:', req.user);
            const clientId = req.user.id;
            console.log('Client ID being used:', clientId);
            
            const project = await projectService.createAndPublish(clientId, req.body);
            
            res.status(201).json(new ApiResponse(
                201,
                'Project created and published successfully. Vendors can now view and bid on your project.',
                project
            ));
        } catch (error) {
            next(error);
        }
    }
    /**
     * Create a new project
     */
    async createProject(req, res, next) {
        try {
            console.log('User from request:', req.user);
            // Get the client ID from the decoded token
            const clientId = req.user.id; // JWT contains 'id' not '_id'
            console.log('Client ID being used:', clientId);
            const project = await projectService.createProject(clientId, req.body);
            
            res.status(201).json(new ApiResponse(
                201,
                'Project created successfully',
                project
            ));
        } catch (error) {
            next(error);
        }
    }

    /**
     * Publish a project
     */
    async publishProject(req, res, next) {
        try {
            const { projectId } = req.params;
            const clientId = req.user._id;
            
            const project = await projectService.publishProject(projectId, clientId);
            
            res.status(200).json(new ApiResponse(
                200,
                'Project published successfully',
                project
            ));
        } catch (error) {
            next(error);
        }
    }

    /**
     * Update a project
     */
    async updateProject(req, res, next) {
        try {
            const { projectId } = req.params;
            const clientId = req.user._id;
            
            const project = await projectService.updateProject(
                projectId,
                clientId,
                req.body
            );
            
            res.status(200).json(new ApiResponse(
                200,
                'Project updated successfully',
                project
            ));
        } catch (error) {
            next(error);
        }
    }

    /**
     * Get project details
     */
    async getProject(req, res, next) {
        try {
            const { projectId } = req.params;
            const project = await projectService.getProjectById(projectId);
            
            res.status(200).json(new ApiResponse(
                200,
                'Project retrieved successfully',
                project
            ));
        } catch (error) {
            next(error);
        }
    }

    /**
     * Search projects
     */
    async searchProjects(req, res, next) {
        try {
            const { 
                status, 
                projectType, 
                location, 
                budget,
                page = 1,
                limit = 10,
                sort = '-metadata.createdAt'
            } = req.query;

            // Get user role from auth
            const userRole = req.user.role;
            console.log('User role:', userRole);

            const criteria = {
                status,
                projectType,
                location,
                budget: budget ? {
                    min: parseFloat(budget.min),
                    max: parseFloat(budget.max)
                } : undefined,
                userRole, // Pass user role to service
                userId: req.user.id // Pass user ID to service
            };

            const results = await projectService.searchProjects(criteria, {
                page: parseInt(page),
                limit: parseInt(limit),
                sort
            });
            
            const message = results.projects.length > 0 
                ? 'Projects retrieved successfully'
                : 'No projects found matching the criteria';

            return ApiResponse.success(
                res,
                {
                    projects: results.projects,
                    pagination: results.pagination
                },
                message
            );
        } catch (error) {
            next(error);
        }
    }

    /**
     * Get matching vendors for a project
     */
    async getMatchingVendors(req, res, next) {
        try {
            const { projectId } = req.params;
            const vendors = await projectService.findMatchingVendors(projectId);
            
            res.status(200).json(new ApiResponse(
                200,
                'Matching vendors retrieved successfully',
                vendors
            ));
        } catch (error) {
            next(error);
        }
    }

    /**
     * Get client's projects
     */
    async getClientProjects(req, res, next) {
        try {
            const clientId = req.user._id;
            const { status, page = 1, limit = 10 } = req.query;

            const results = await projectService.searchProjects(
                { client: clientId, status },
                { page: parseInt(page), limit: parseInt(limit) }
            );
            
            res.status(200).json(new ApiResponse(
                200,
                'Client projects retrieved successfully',
                results
            ));
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new ProjectController();
