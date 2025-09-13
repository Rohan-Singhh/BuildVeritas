import { authAPI } from './api.service';

class AuthService {
    async login(email, password, role) {
        try {
            // Test credentials bypass
            if (email === "buildveritas@gmail.com" && 
                password === "test@123" && 
                role === "client_owner") {
                    
                // Create mock response for test login
                const mockUser = {
                    id: "test123",
                    email: "buildveritas@gmail.com",
                    role: "client_owner",
                    firstName: "Test",
                    lastName: "User"
                };
                const mockToken = "test_token_123";
                
                // Store in localStorage
                localStorage.setItem('token', mockToken);
                localStorage.setItem('user', JSON.stringify(mockUser));
                
                return {
                    user: mockUser,
                    token: mockToken
                };
            }

            // Normal login flow for other credentials
            console.log('Login attempt with:', { email, role });
            const response = await authAPI.login({ email, password, role });
            console.log('Login response:', response);

            // Handle the backend response format
            if (response?.status === 'success' && response?.data) {
                const { token, user } = response.data;
                localStorage.setItem('token', token);
                localStorage.setItem('user', JSON.stringify(user));
                return response.data;
            } else {
                console.error('Invalid response format:', response);
                throw new Error('Invalid response from server');
            }
        } catch (error) {
            console.error('Login error:', error);
            // Handle different error formats
            if (error.message) {
                throw new Error(error.message);
            }
            if (error.errors) {
                throw new Error(error.errors[0]?.msg || 'Validation failed');
            }
            throw new Error('Login failed. Please try again.');
        }
    }

    async register(userData) {
        try {
            console.log('Register attempt with:', userData);
            const response = await authAPI.register(userData);
            console.log('Register response:', response);

            // Handle the backend response format
            if (response?.status === 'success' && response?.data) {
                const { token, user } = response.data;
                localStorage.setItem('token', token);
                localStorage.setItem('user', JSON.stringify(user));
                return response.data;
            } else {
                console.error('Invalid response format:', response);
                throw new Error('Invalid response from server');
            }
        } catch (error) {
            console.error('Register error:', error);
            // Handle different error formats
            if (error.message) {
                throw new Error(error.message);
            }
            if (error.errors) {
                throw new Error(error.errors[0]?.msg || 'Validation failed');
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