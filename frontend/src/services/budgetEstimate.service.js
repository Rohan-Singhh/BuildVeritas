import api from './api.service';

class BudgetEstimateService {
  // Create a new budget estimate
  async createEstimate(estimateData) {
    try {
      const response = await api.post('/budget-estimate/', estimateData);
      return response.data;
    } catch (error) {
      console.error('Error creating budget estimate:', error);
      throw error;
    }
  }

  // Get a specific estimate by ID
  async getEstimate(estimateId) {
    try {
      const response = await api.get(`/budget-estimate/${estimateId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching budget estimate:', error);
      throw error;
    }
  }

  // Get all estimates for the current user
  async getUserEstimates(page = 1, limit = 10) {
    try {
      const response = await api.get(`/budget-estimate/?page=${page}&limit=${limit}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching user estimates:', error);
      throw error;
    }
  }

  // Poll for estimate completion (for real-time updates)
  async pollEstimateStatus(estimateId, maxAttempts = 30, interval = 2000) {
    return new Promise((resolve, reject) => {
      let attempts = 0;
      
      const poll = async () => {
        try {
          const response = await this.getEstimate(estimateId);
          const estimate = response.data;
          
          if (estimate.status === 'completed') {
            resolve(estimate);
          } else if (estimate.status === 'failed') {
            reject(new Error('Estimate generation failed'));
          } else if (attempts >= maxAttempts) {
            reject(new Error('Estimate generation timed out'));
          } else {
            attempts++;
            setTimeout(poll, interval);
          }
        } catch (error) {
          reject(error);
        }
      };
      
      poll();
    });
  }
}

export default new BudgetEstimateService();
