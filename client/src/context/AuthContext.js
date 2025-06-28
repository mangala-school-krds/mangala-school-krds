// src/context/AuthContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check if user is authenticated on app load
  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      setLoading(false);
      return;
    }

    try {
      // Set axios defaults
      axios.defaults.baseURL = 'http://localhost:5000';
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      // Verify token with backend
      const response = await axios.get('/api/admin/verify');
      setUser(response.data.user);
    } catch (error) {
      console.error('Token verification failed:', error);
      // Remove invalid token
      localStorage.removeItem('adminToken');
      delete axios.defaults.headers.common['Authorization'];
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const login = async (credentials) => {
    try {
      const response = await axios.post('/api/admin/login', credentials);
      const { token, user } = response.data;
      
      localStorage.setItem('adminToken', token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      setUser(user);
      
      return { success: true };
    } catch (error) {
      if (error.code === 'ERR_NETWORK') {
        return { 
          success: false, 
          error: 'Cannot connect to server. Please make sure the backend is running on port 5000.' 
        };
      }
      return { 
        success: false, 
        error: error.response?.data?.message || 'Login failed' 
      };
    }
  };

  const logout = () => {
    localStorage.removeItem('adminToken');
    delete axios.defaults.headers.common['Authorization'];
    setUser(null);
  };

  const createAdmin = async (adminData) => {
    try {
      const response = await axios.post('/api/admin/create', adminData);
      return { success: true, message: 'Admin created successfully' };
    } catch (error) {
      if (error.code === 'ERR_NETWORK') {
        return { 
          success: false, 
          error: 'Cannot connect to server. Please make sure the backend is running on port 5000.' 
        };
      }
      return { 
        success: false, 
        error: error.response?.data?.message || 'Failed to create admin' 
      };
    }
  };

  const deleteAdmin = async (adminId) => {
    try {
      await axios.delete(`/api/admin/${adminId}`);
      return { success: true, message: 'Admin deleted successfully' };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.message || 'Failed to delete admin' 
      };
    }
  };

  const getAllAdmins = async () => {
    try {
      const response = await axios.get('/api/admin/all');
      return { success: true, admins: response.data };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.message || 'Failed to fetch admins' 
      };
    }
  };

  const value = {
    user,
    loading,
    login,
    logout,
    createAdmin,
    deleteAdmin,
    getAllAdmins,
    isAuthenticated: !!user,
    isRootAdmin: user?.role === 'root'
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};