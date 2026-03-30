// src/context/UserContext.jsx
import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';


const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000/api';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Attempt to restore user session on app load / page refresh
  useEffect(() => {
    const restoreSession = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        // Try to fetch current user profile using stored token
        const response = await axios.get(`${API_BASE_URL}/users/profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUser(response.data.user || response.data);
      } catch (err) {
        console.error('Session restore failed:', err.message);
        // Clear invalid/expired token
        localStorage.removeItem('token');
        setError('Your session has expired. Please log in again.');
      } finally {
        setLoading(false);
      }
    };

    restoreSession();
  }, []);

  // Login
  const login = async (email, password) => {
    try {
      setError(null);
      const response = await axios.post(`${API_BASE_URL}/users/login`, {
        email,
        password,
      });

      const { token, user: loggedInUser } = response.data;

      // Save token & user
      localStorage.setItem('token', token);
      setUser(loggedInUser);

      return loggedInUser;
    } catch (err) {
      const message =
        err.response?.data?.message ||
        'Login failed. Please check your credentials.';
      setError(message);
      throw new Error(message);
    }
  };

// Inside UserProvider
const register = async (userData) => {
  try {
    setError(null);
    const response = await axios.post(`${API_BASE_URL}/users/register`, userData);  // ← FIX: /register, not /login

    const { token, user: newUser } = response.data;

    localStorage.setItem('token', token);
    setUser(newUser);

    return newUser;
  } catch (err) {
    const message =
      err.response?.data?.message ||
      'Registration failed. Please try again.';
    setError(message);
    throw new Error(message);
  }
};

  // Logout
  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    setError(null);
  };

  // Update profile / lifestyle / preferences
  const updateProfile = async (updates) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('Not authenticated');

      const response = await axios.put(`${API_BASE_URL}/users/profile`, updates, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Update local user state
      setUser((prev) => ({
        ...prev,
        ...response.data.user,
      }));

      return response.data;
    } catch (err) {
      const message = err.response?.data?.message || 'Failed to update profile';
      setError(message);
      throw new Error(message);
    }
  };

  const value = {
    user,
    loading,
    error,
    login,
    register,
    logout,
    updateProfile,
    isAuthenticated: !!user && !loading,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

// Custom hook for easy access
export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};