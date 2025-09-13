import axios from 'axios';

// API URL configuration
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Remove any double /api occurrences
const cleanApiUrl = API_URL.replace('/api/api', '/api');

// Log the API URL being used
console.log('Using API URL:', API_URL);
console.log('Environment Variables:', {
    VITE_API_URL: import.meta.env.VITE_API_URL,
    MODE: import.meta.env.MODE,
    DEV: import.meta.env.DEV,
    PROD: import.meta.env.PROD
});

// Create axios instance
const api = axios.create({
    baseURL: cleanApiUrl,
    headers: {
        'Content-Type': 'application/json'
    },
    // Add timeout and other options
    timeout: 10000,
    validateStatus: function (status) {
        return status >= 200 && status < 500; // Handle all responses
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
        // Enhanced error logging
        console.error('API Error Details:', {
            status: error.response?.status,
            data: error.response?.data,
            message: error.message,
            config: {
                url: error.config?.url,
                baseURL: error.config?.baseURL,
                method: error.config?.method,
                headers: error.config?.headers
            }
        });

        if (error.code === 'ECONNABORTED') {
            return Promise.reject(new Error('Request timed out. Please try again.'));
        }

        if (!error.response) {
            return Promise.reject(new Error(`Network error. API URL: ${API_URL}. Please check your connection and API URL.`));
        }

        // Return the error response data with more context
        const errorMessage = error.response.data?.message || error.message || 'Unknown error occurred';
        return Promise.reject({
            message: errorMessage,
            status: error.response.status,
            data: error.response.data
        });
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