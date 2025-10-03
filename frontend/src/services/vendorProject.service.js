import api from './api.service';

export const vendorProjectAPI = {
  // Get all published projects for vendors to view
  getPublishedProjects: async (filters = {}) => {
    try {
      console.log('vendorProjectAPI.getPublishedProjects called with filters:', filters);
      
      const params = new URLSearchParams();
      
      // Add filters to query params
      if (filters.status) params.append('status', filters.status);
      if (filters.projectType) params.append('projectType', filters.projectType);
      if (filters.page) params.append('page', filters.page);
      if (filters.limit) params.append('limit', filters.limit);
      if (filters.search) params.append('search', filters.search);
      
      const queryString = params.toString();
      const url = `/projects/public/search${queryString ? `?${queryString}` : ''}`;
      
      console.log('Making request to:', url);
      
      const response = await api.get(url);
      console.log('getPublishedProjects API response:', response);
      
      return response.data;
    } catch (error) {
      console.error('Get Published Projects Error:', error);
      throw error;
    }
  },

  // Get project details by ID
  getProjectDetails: async (projectId) => {
    try {
      console.log('vendorProjectAPI.getProjectDetails called for projectId:', projectId);
      
      const response = await api.get(`/projects/${projectId}`);
      console.log('getProjectDetails API response:', response);
      
      return response.data;
    } catch (error) {
      console.error('Get Project Details Error:', error);
      throw error;
    }
  },

  // Search projects with text search
  searchProjects: async (searchTerm, filters = {}) => {
    try {
      console.log('vendorProjectAPI.searchProjects called with searchTerm:', searchTerm);
      
      const searchFilters = {
        ...filters,
        search: searchTerm
      };
      
      return await vendorProjectAPI.getPublishedProjects(searchFilters);
    } catch (error) {
      console.error('Search Projects Error:', error);
      throw error;
    }
  }
};
