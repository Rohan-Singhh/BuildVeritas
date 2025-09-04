import axios from 'axios';

// API URL configuration
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Create axios instance
const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

// Request interceptor for adding auth token
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        // Log request for debugging
        console.log('API Request:', {
            url: config.url,
            method: config.method,
            data: config.data
        });
        return config;
    },
    (error) => {
        console.error('Request Error:', error);
        return Promise.reject(error);
    }
);

// Response interceptor for handling errors
api.interceptors.response.use(
    (response) => {
        // Log successful response
        console.log('API Success Response:', response);
        return response;
    },
    (error) => {
        // Log error in detail
        console.error('API Error Response:', {
            status: error.response?.status,
            data: error.response?.data,
            message: error.message
        });

        if (!error.response) {
            return Promise.reject(new Error('Network error. Please check your connection.'));
        }

        // Return the error response data
        return Promise.reject(error.response.data);
    }
);

// Auth API endpoints
export const authAPI = {
    login: async (credentials) => {
        try {
            const response = await api.post('/auth/login', credentials);
            console.log('Login Response:', response);
            return response.data;
        } catch (error) {
            console.error('Login Error:', error);
            throw error;
        }
    },
    register: async (userData) => {
        try {
            // Ensure all data is properly formatted
            // Send the data as is, let backend handle cleaning
            const formattedData = userData;
            console.log('Sending registration data:', {
                ...formattedData,
                gstNumber: formattedData.gstNumber ? `[${formattedData.gstNumber}]` : undefined
            });
            console.log('Sending registration request:', formattedData); // Debug log
            const response = await api.post('/auth/register', formattedData);
            console.log('Registration response:', response.data); // Debug log
            return response.data;
        } catch (error) {
            console.error('Register Error:', error);
            throw error;
        }
    },
    getProfile: async () => {
        try {
            const response = await api.get('/auth/profile');
            return response.data;
        } catch (error) {
            console.error('Get Profile Error:', error);
            throw error;
        }
    }
};

export default api;