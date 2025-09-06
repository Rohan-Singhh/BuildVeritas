const ProjectRepository = require('../repositories/project.repository');
const { ApiError } = require('../utils/apiError');

class ProjectService {
    constructor() {
        this.projectRepository = new ProjectRepository();
    }

    async createProject(clientId, projectData) {
        // Validate client role
        if (projectData.client && projectData.client.toString() !== clientId.toString()) {
            throw new ApiError(403, 'You can only create projects for yourself');
        }

        // Prepare project data
        const newProjectData = {
            ...projectData,
            client: clientId,
            status: 'pending'
        };

        // Create project
        const project = await this.projectRepository.create(newProjectData);
        
        // TODO: Trigger AI budget estimation process
        // This will be implemented later when AI service is ready
        
        return project;
    }

    async getProjectById(projectId, clientId) {
        const project = await this.projectRepository.findById(projectId);
        
        if (!project) {
            throw new ApiError(404, 'Project not found');
        }

        // Ensure client can only access their own projects
        if (project.client._id.toString() !== clientId.toString()) {
            throw new ApiError(403, 'Access denied');
        }

        return project;
    }

    async getClientProjects(clientId, page = 1, limit = 10) {
        const skip = (page - 1) * limit;
        const projects = await this.projectRepository.findByClientId(clientId, skip, limit);
        const total = await this.projectRepository.count();

        return {
            projects,
            pagination: {
                current_page: page,
                total_pages: Math.ceil(total / limit),
                total_items: total,
                items_per_page: limit
            }
        };
    }

    async updateProject(projectId, clientId, updateData) {
        // First check if project exists and belongs to client
        const project = await this.getProjectById(projectId, clientId);

        // Don't allow updating certain fields
        delete updateData.client;
        delete updateData.status;
        delete updateData.budget_estimate;

        // Update project
        return await this.projectRepository.update(projectId, updateData);
    }

    async deleteProject(projectId, clientId) {
        // First check if project exists and belongs to client
        await this.getProjectById(projectId, clientId);

        // Delete project
        return await this.projectRepository.delete(projectId);
    }
}

module.exports = ProjectService;
