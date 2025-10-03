import api from './api.service';

export const bidAPI = {
  // Get project bids
  getProjectBids: async (projectId) => {
    try {
      const response = await api.get(`/bids/project/${projectId}`);
      return response.data;
    } catch (error) {
      console.error('Get Project Bids Error:', error);
      throw error;
    }
  },

  // Get bid details
  getBidDetails: async (bidId) => {
    try {
      console.log('bidAPI.getBidDetails called with bidId:', bidId);
      const response = await api.get(`/bids/${bidId}/details`);
      console.log('getBidDetails API response:', response);
      return response.data;
    } catch (error) {
      console.error('Get Bid Details Error:', error);
      console.error('Get Bid Details Error Response:', error.response);
      throw error;
    }
  },

  // Accept/Select a bid
  selectBid: async (bidId, projectId) => {
    try {
      console.log('bidAPI.selectBid called with:', { bidId, projectId });
      const response = await api.post(`/bids/${bidId}/select/${projectId}`);
      console.log('selectBid API response:', response);
      return response.data;
    } catch (error) {
      console.error('Select Bid Error:', error);
      console.error('Select Bid Error Response:', error.response);
      throw error;
    }
  },

  // Reject a bid
  rejectBid: async (bidId, projectId, reason = 'Bid rejected by client') => {
    try {
      console.log('bidAPI.rejectBid called with:', { bidId, projectId, reason });
      const response = await api.post(`/bids/${bidId}/reject/${projectId}`, {
        reason
      });
      console.log('rejectBid API response:', response);
      return response.data;
    } catch (error) {
      console.error('Reject Bid Error:', error);
      console.error('Reject Bid Error Response:', error.response);
      throw error;
    }
  },

  // Get vendor bids
  getVendorBids: async (filters = {}) => {
    try {
      const response = await api.get('/bids/vendor/bids', { params: filters });
      return response.data;
    } catch (error) {
      console.error('Get Vendor Bids Error:', error);
      throw error;
    }
  },

  // Submit a bid (for vendors)
  submitBid: async (projectId, bidData) => {
    try {
      const response = await api.post(`/bids/project/${projectId}`, bidData);
      return response.data;
    } catch (error) {
      console.error('Submit Bid Error:', error);
      throw error;
    }
  },

  // Update a bid (for vendors)
  updateBid: async (bidId, bidData) => {
    try {
      const response = await api.put(`/bids/${bidId}`, bidData);
      return response.data;
    } catch (error) {
      console.error('Update Bid Error:', error);
      throw error;
    }
  }
};
