import api from './api.service';

export const projectAPI = {
    // Create a new project
    createProject: async (projectData) => {
        try {
            // Using create-and-publish endpoint to directly publish the project
            const response = await api.post('/projects/create-and-publish', projectData);
            return response.data;
        } catch (error) {
            console.error('Create Project Error:', error);
            throw error;
        }
    },

    // Get all projects (with optional filters)
    getProjects: async (filters = {}) => {
        try {
            const response = await api.get('/projects', { params: filters });
            return response.data;
        } catch (error) {
            console.error('Get Projects Error:', error);
            throw error;
        }
    },

    // Get a single project by ID
    getProjectById: async (projectId) => {
        try {
            const response = await api.get(`/projects/${projectId}`);
            return response.data;
        } catch (error) {
            console.error('Get Project Error:', error);
            throw error;
        }
    },

    // Update a project
    updateProject: async (projectId, projectData) => {
        try {
            const response = await api.put(`/projects/${projectId}`, projectData);
            return response.data;
        } catch (error) {
            console.error('Update Project Error:', error);
            throw error;
        }
    },

    // Delete a project
    deleteProject: async (projectId) => {
        try {
            const response = await api.delete(`/projects/${projectId}`);
            return response.data;
        } catch (error) {
            console.error('Delete Project Error:', error);
            throw error;
        }
    },

    // Get matching vendors for a project
    getMatchingVendors: async (projectId) => {
        try {
            const response = await api.get(`/projects/${projectId}/matching-vendors`);
            return response.data;
        } catch (error) {
            console.error('Get Matching Vendors Error:', error);
            throw error;
        }
    },

    // Upload project attachments
    uploadAttachments: async (projectId, files) => {
        try {
            const formData = new FormData();
            files.forEach(file => {
                formData.append('attachments', file);
            });

            const response = await api.post(`/projects/${projectId}/attachments`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            return response.data;
        } catch (error) {
            console.error('Upload Attachments Error:', error);
            throw error;
        }
    }
};
