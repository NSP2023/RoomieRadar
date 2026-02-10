// src/services/api.js

import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000/api';

// Create a single axios instance with base config
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 15000, // 15 seconds timeout (prevents hanging requests)
});

// Automatically attach JWT token to every request (if it exists)
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Optional: Handle 401 globally (e.g. token expired → logout)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token invalid/expired → clear it
      localStorage.removeItem('token');
      // Optional: redirect to login
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// ────────────────────────────────────────────────
// USER PROFILE
// ────────────────────────────────────────────────

/**
 * Fetch current authenticated user's profile
 * Endpoint: GET /api/users/profile
 */
export const fetchUserProfile = async () => {
  try {
    const response = await api.get('/users/profile');
    return response.data.user || response.data;
  } catch (error) {
    console.error('Error fetching user profile:', error);
    throw error.response?.data?.message || 'Failed to load profile';
  }
};

/**
 * Update current user's profile (name, lifestyle, preferences, etc.)
 * Endpoint: PUT /api/users/profile
 * @param {Object} data - Fields to update
 */
export const updateUserProfile = async (data) => {
  try {
    const response = await api.put('/users/profile', data);
    return response.data;
  } catch (error) {
    console.error('Error updating user profile:', error);
    throw error.response?.data?.message || 'Failed to update profile';
  }
};

// ────────────────────────────────────────────────
// MATCHES & SIMULATION
// ────────────────────────────────────────────────

/**
 * Fetch top matches for the current authenticated user
 * Endpoint: GET /api/matches/top
 */
export const fetchTopMatches = async () => {
  try {
    const response = await api.get('/matches/top');
    return response.data.topMatches || [];
  } catch (error) {
    console.error('Error fetching top matches:', error);
    throw error.response?.data?.message || 'Failed to load matches';
  }
};

/**
 * Fetch day simulation for a specific roommate match
 * Endpoint: GET /api/matches/simulation/:roommateId
 * @param {string} roommateId - ID of the matched roommate
 */
export const fetchSimulation = async (roommateId) => {
  try {
    const response = await api.get(`/matches/simulation/${roommateId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching simulation:', error);
    throw error.response?.data?.message || 'Failed to load simulation';
  }
};

/**
 * Compare two roommates side-by-side
 * Endpoint: POST /api/matches/compare
 * @param {string} roommate1Id
 * @param {string} roommate2Id
 */
export const compareRoommates = async (roommate1Id, roommate2Id) => {
  try {
    const response = await api.post('/matches/compare', {
      roommate1Id,
      roommate2Id,
    });
    return response.data;
  } catch (error) {
    console.error('Error comparing roommates:', error);
    throw error.response?.data?.message || 'Failed to compare roommates';
  }
};

// Export the axios instance itself (useful for custom requests)
export default api;