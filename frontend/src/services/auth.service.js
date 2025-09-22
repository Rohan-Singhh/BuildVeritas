import { authAPI } from './api.service';
import sessionService from './session.service';

class AuthService {
    async login(email, password, role) {
        try {
            console.log('Login attempt with:', { email, role });
            
            // Check for test credentials
            if (email === "buildveritas@gmail.com" && 
                password === "test@123" && 
                role === "client_owner") {
                    // Create mock response for test credentials
                    const mockResponse = {
                        user: {
                            id: "test_user_123",
                            email: "buildveritas@gmail.com",
                            role: "client_owner",
                            name: "Test User"
                        },
                        token: "test_token_123"
                    };
                    
                    // Store auth data immediately
                    localStorage.setItem('token', mockResponse.token);
                    localStorage.setItem('user', JSON.stringify(mockResponse.user));
                    console.log('Stored test credentials:', {
                        token: mockResponse.token,
                        user: mockResponse.user
                    });
                    
                    return mockResponse;
            }
            
            // If not test credentials, proceed with actual API call
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

            // Start session monitoring
            sessionService.startSession();

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
        sessionService.clearSession();
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
        const user = this.getCurrentUser();
        
        console.log('Checking authentication:', {
            hasToken: !!token,
            tokenValue: token,
            hasUser: !!user
        });
        
        // Check both token and user existence
        return !!token && !!user && (token === 'test_token_123' || token.length > 20);
    }

    // Simplified to return single dashboard route
    getDashboardRoute() {
        return '/dashboard';
    }
}

export default new AuthService();