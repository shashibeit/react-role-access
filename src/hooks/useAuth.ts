/**
 * useAuth Hook
 * Custom hook for accessing auth state and actions
 */

import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../store/store';
import {
  selectIsAuthenticated,
  selectUser,
  selectPermissions,
  selectAuthLoading,
  selectAuthError,
  loginUser,
  logoutUser,
  fetchCurrentUser,
  clearError,
} from '../store/authSlice';
import { LoginRequest, AuthPermissions } from '../types/api';

/**
 * useAuth hook
 * Provides auth state and dispatch functions
 */
export function useAuth() {
  const dispatch = useDispatch<AppDispatch>();

  const isAuthenticated = useSelector(selectIsAuthenticated);
  const user = useSelector(selectUser);
  const permissions = useSelector(selectPermissions);
  const loading = useSelector(selectAuthLoading);
  const error = useSelector(selectAuthError);

  const login = (credentials: LoginRequest) => {
    return dispatch(loginUser(credentials));
  };

  const logout = () => {
    return dispatch(logoutUser());
  };

  const getCurrentUser = () => {
    return dispatch(fetchCurrentUser());
  };

  const handleClearError = () => {
    dispatch(clearError());
  };

  /**
   * Check if user has specific permission
   */
  const hasPermission = (permissionKey: keyof AuthPermissions): boolean => {
    if (!permissions) return false;
    const permission = permissions[permissionKey];
    return permission === 'true';
  };

  return {
    // State
    isAuthenticated,
    user,
    permissions,
    loading,
    error,

    // Actions
    login,
    logout,
    getCurrentUser,
    clearError: handleClearError,

    // Utilities
    hasPermission,
  };
}

/**
 * Custom hook for accessing only permissions
 */
export function usePermissions() {
  const permissions = useSelector(selectPermissions);

  const hasPermission = (permissionKey: keyof typeof permissions): boolean => {
    if (!permissions) return false;
    const permission = permissions[permissionKey];
    return permission === 'true';
  };

  return {
    permissions,
    hasPermission,
  };
}
