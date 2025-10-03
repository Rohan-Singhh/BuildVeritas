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
    // Removed createProject and publishProject - only using createAndPublish now

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
     * Delete a project
     */
    async deleteProject(req, res, next) {
        try {
            const { projectId } = req.params;
            const clientId = req.user._id;
            
            await projectService.deleteProject(projectId, clientId);
            
            res.status(200).json(new ApiResponse(
                200,
                'Project deleted successfully'
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

            // Get user role from auth (if available)
            const userRole = req.user?.role || 'vendor_supplier'; // Default to vendor for public access
            const userId = req.user?.id;
            console.log('User role:', userRole, 'User ID:', userId);

            const criteria = {
                status,
                projectType,
                location,
                budget: budget ? {
                    min: parseFloat(budget.min),
                    max: parseFloat(budget.max)
                } : undefined,
                userRole, // Pass user role to service
                userId // Pass user ID to service (may be undefined for public access)
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
            const clientId = req.user.id; // JWT contains 'id' not '_id'
            const { status, page = 1, limit = 10 } = req.query;
            
            console.log('getClientProjects - clientId:', clientId);
            console.log('getClientProjects - query params:', { status, page, limit });

            // First, get the client profile to find the actual client ID
            const ClientProfile = require('mongoose').model('ClientProfile');
            const clientProfile = await ClientProfile.findOne({ user: clientId });
            
            console.log('getClientProjects - clientProfile:', clientProfile);
            
            if (!clientProfile) {
                console.log('getClientProjects - No client profile found, returning empty results');
                return res.status(200).json({
                    status: 'success',
                    message: 'Client projects retrieved successfully',
                    data: { projects: [], total: 0, page: 1, limit: 10 }
                });
            }

            const searchCriteria = { userId: clientProfile._id, status, userRole: 'client_owner' };
            console.log('getClientProjects - searchCriteria:', searchCriteria);
            
            const results = await projectService.searchProjects(
                searchCriteria,
                { page: parseInt(page), limit: parseInt(limit) }
            );
            
            console.log('getClientProjects - results:', results);
            
            // Ensure we return the projects in the correct format
            const responseData = {
                projects: results.projects || [],
                total: results.pagination?.total || 0,
                page: results.pagination?.page || parseInt(page),
                limit: results.pagination?.limit || parseInt(limit)
            };
            
            console.log('getClientProjects - final response data:', responseData);
            
            res.status(200).json({
                status: 'success',
                message: 'Client projects retrieved successfully',
                data: responseData
            });
        } catch (error) {
            console.error('getClientProjects - error:', error);
            next(error);
        }
    }
}

module.exports = new ProjectController();
