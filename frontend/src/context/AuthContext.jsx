import React, { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../services/auth.service';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in on mount
    const currentUser = authService.getCurrentUser();
    if (currentUser) {
      setUser(currentUser);
    }
    setLoading(false);
  }, []);

  const login = async (email, password, role) => {
    try {
      console.log('AuthContext: Attempting login with:', { email, role });
      const response = await authService.login(email, password, role);
      console.log('AuthContext: Login successful:', response);
      
      if (!response.user) {
        throw new Error('Login response missing user data');
      }
      
      setUser(response.user);
      navigate('/dashboard');
      return response;
      
    } catch (error) {
      console.error('AuthContext: Login Error:', error);
      
      // Ensure we always throw an Error object with a message
      if (error instanceof Error) {
        throw error;
      } else if (typeof error === 'string') {
        throw new Error(error);
      } else {
        throw new Error(error?.message || 'Login failed');
      }
    }
  };

  const register = async (userData) => {
    try {
      const response = await authService.register(userData);
      
      // Verify response structure
      if (!response?.user) {
        throw new Error('Invalid response from server');
      }

      setUser(response.user);
      
      // Use single dashboard route
      navigate('/dashboard');
      
      return response;
    } catch (error) {
      console.error('Registration Error:', error);
      throw error;
    }
  };

  const logout = () => {
    authService.logout();
    setUser(null);
    navigate('/login');
  };

  const value = {
    user,
    loading,
    login,
    register,
    logout,
    isAuthenticated: authService.isAuthenticated,
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;