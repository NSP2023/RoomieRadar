// src/hooks/useAuth.js
import { useUser } from '../context/UserContext';

/**
 * useAuth - convenient hook to access authentication state and actions
 *
 * Usage:
 *   const { user, login, logout, isAuthenticated, loading } = useAuth();
 */
const useAuth = () => {
  const {
    user,
    loading,
    error,
    login,
    register,
    logout,
    updateProfile,
    isAuthenticated,
  } = useUser();

  return {
    // User data
    user,
    isAuthenticated,
    loading,
    error,

    // Authentication actions
    login,
    register,
    logout,

    // Profile management
    updateProfile,

    // Optional friendly aliases
    isLoggedIn: isAuthenticated,
    currentUser: user,
  };
};

export default useAuth;