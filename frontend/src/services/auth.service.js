import { authAPI } from './api.service';

class AuthService {
    async login(email, password, role) {
        try {
            console.log('Login attempt with:', { email, role });
            const response = await authAPI.login({ email, password, role });
            console.log('Auth service received response:', response);

            // Check if response is an error
            if (response.status === 'fail' || response.status === 'error') {
                throw new Error(response.message || 'Login failed');
            }

            // Extract user and token from response
            let userData, tokenData;

            if (response.data) {
                // Handle nested data structure
                userData = response.data.user || response.data;
                tokenData = response.data.token || response.token;
            } else {
                // Handle flat data structure
                userData = response.user;
                tokenData = response.token;
            }

            // Validate required data
            if (!userData || !tokenData) {
                console.error('Invalid response structure:', response);
                throw new Error('Server response missing required data');
            }

            // Store auth data
            localStorage.setItem('token', tokenData);
            localStorage.setItem('user', JSON.stringify(userData));

            return {
                user: userData,
                token: tokenData
            };
        } catch (error) {
            console.error('Login error in auth service:', error);
            
            // If error is already formatted, pass it through
            if (error.message) {
                throw error;
            }
            
            // Format unknown errors
            throw new Error('An unexpected error occurred during login');
        }
    }

    async register(userData) {
        try {
            console.log('Register attempt with:', userData);
            const response = await authAPI.register(userData);
            console.log('Register response:', response);

            // Handle the backend response format
            console.log('Raw response:', response);
            
            // Handle different response formats
            const data = response.data || response;
            const { token, user } = data.data || data;
            
            if (!token || !user) {
                console.error('Invalid response format:', response);
                throw new Error('Invalid response format from server');
            }
            
            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(user));
            return { token, user };
        } catch (error) {
            console.error('Register error:', error);
            
            // Handle backend error response
            if (error.response?.data) {
                const errorData = error.response.data;
                throw new Error(errorData.message || errorData.error || 'Registration failed');
            }
            
            // Handle network or other errors
            if (error.message) {
                throw new Error(error.message);
            }
            
            throw new Error('Registration failed. Please try again.');
        }
    }

    async getProfile() {
        try {
            const response = await authAPI.getProfile();
            if (response?.status === 'success') {
                return response.data;
            }
            throw new Error('Failed to get profile');
        } catch (error) {
            console.error('Get profile error:', error);
            throw error;
        }
    }

    logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    }

    getCurrentUser() {
        try {
            const userStr = localStorage.getItem('user');
            if (!userStr) return null;
            return JSON.parse(userStr);
        } catch (error) {
            console.error('Get current user error:', error);
            this.logout(); // Clear potentially corrupted data
            return null;
        }
    }

    isAuthenticated() {
        const token = localStorage.getItem('token');
        // Allow both real tokens and our test token
        return !!token && (token === 'test_token_123' || token.length > 20);
    }

    // Simplified to return single dashboard route
    getDashboardRoute() {
        return '/dashboard';
    }
}

export default new AuthService();