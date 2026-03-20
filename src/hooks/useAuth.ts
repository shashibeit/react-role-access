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
  logoutHandler,
} from '../store/authSlice';
import { AuthPermissions } from '../types/api';

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
   * Dispatch logout handler
   * Clears all auth data and sessionStorage
   */
  const logout = () => {
    dispatch(logoutHandler());
    // Clear sessionStorage
    sessionStorage.removeItem('MSC_SESSION');
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
    logout,
    clearError: handleClearError,

    // Utilities
    hasPermission,
  };
}
export function usePermissions() {
  const permissions = useSelector(selectPermissions);

  const hasPermission = (permissionKey: keyof AuthPermissions): boolean => {
    if (!permissions) return false;
    const permission = permissions[permissionKey];
    return permission === 'true';
  };

  return {
    permissions,
    hasPermission,
  };
}
