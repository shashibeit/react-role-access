/**
 * useAuth Hook
 * Custom hook for accessing auth state and actions
 * Simplified local state management without API calls
 */

import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../store/store';
import {
  selectIsAuthenticated,
  selectUser,
  selectPermissions,
  selectAuthLoading,
  selectAuthError,
  clearError,
  loginHandler,
  logoutHandler,
  getCurrentUserHandler,
  setLoading,
} from '../store/authSlice';
import { AuthPermissions, LoginRequest } from '../types/api';

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

  const handleClearError = () => {
    dispatch(clearError());
  };

  /**
   * Dispatch login handler (mocks API: POST /auth/login)
   * TODO: Replace with actual API call when backend is ready
   */
  const login = (_credentials: LoginRequest) => {
    dispatch(setLoading(true));
    dispatch(loginHandler());
  };

  /**
   * Dispatch logout handler (mocks API: POST /auth/logout)
   */
  const logout = () => {
    dispatch(setLoading(true));
    dispatch(logoutHandler());
  };

  /**
   * Dispatch get current user handler (mocks API: GET /auth/me)
   */
  const getCurrentUser = () => {
    dispatch(setLoading(true));
    dispatch(getCurrentUserHandler());
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
