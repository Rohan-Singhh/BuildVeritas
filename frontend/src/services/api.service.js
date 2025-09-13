import axios from 'axios';

// API URL configuration
const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

// Function to clean and validate URL
function constructApiUrl(baseUrl) {
    // Remove trailing slashes and /api
    let cleanUrl = baseUrl.trim().replace(/\/+$/, '').replace(/\/api$/, '');
    
    // Replace buildveritas-backend with buildveritas in render.com URLs
    cleanUrl = cleanUrl.replace('buildveritas-backend.onrender.com', 'buildveritas.onrender.com');
    
    // Construct final URL
    const apiUrl = `${cleanUrl}/api`;
    
    // Debug logging
    console.log('API URL Construction:', {
        input: baseUrl,
        cleaned: cleanUrl,
        final: apiUrl,
        environment: import.meta.env.MODE
    });
    
    return apiUrl;
}

// Construct the API URL
const API_URL = constructApiUrl(BASE_URL);

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
    baseURL: API_URL,
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
                method: error.config?.method
            }
        });

        if (error.code === 'ECONNABORTED') {
            return Promise.reject({
                response: {
                    data: { message: 'Request timed out. Please try again.' }
                }
            });
        }

        if (!error.response) {
            return Promise.reject({
                response: {
                    data: { message: `Network error. Please check your connection.` }
                }
            });
        }

        // Format error response consistently
        if (error.response?.data) {
            console.log('API Error Response Data:', error.response.data);
            return Promise.reject({
                response: {
                    status: error.response.status,
                    data: {
                        message: error.response.data.message || error.response.data.error,
                        errors: error.response.data.errors || []
                    }
                }
            });
        }
        
        return Promise.reject(error);
    }
);

// Auth API endpoints
export const authAPI = {
    login: async (credentials) => {
        try {
            console.log('Sending login request with:', credentials);
            const response = await api.post('/auth/login', credentials);
            console.log('Raw login response:', response);
            
            // Handle different response formats
            const responseData = response.data;
            console.log('Processed response data:', responseData);
            
            if (responseData.status === 'fail' || responseData.status === 'error') {
                throw new Error(responseData.message || 'Login failed');
            }
            
            return responseData;
        } catch (error) {
            console.error('Login Error in API:', error);
            if (error.response?.data) {
                throw error.response.data;
            }
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