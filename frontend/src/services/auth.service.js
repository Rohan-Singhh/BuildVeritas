import { authAPI } from './api.service';

class AuthService {
    async login(email, password) {
        try {
            const response = await authAPI.login({ email, password });
            if (response.data?.token) {
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('user', JSON.stringify(response.data.user));
            }
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    async register(userData) {
        try {
            const response = await authAPI.register(userData);
            if (response.data?.token) {
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('user', JSON.stringify(response.data.user));
            }
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    async getProfile() {
        try {
            const response = await authAPI.getProfile();
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    }

    getCurrentUser() {
        const userStr = localStorage.getItem('user');
        if (userStr) {
            return JSON.parse(userStr);
        }
        return null;
    }

    isAuthenticated() {
        return !!localStorage.getItem('token');
    }
}

export default new AuthService();