/**
 * Auth Slice
 * Redux slice for authentication and authorization state management
 * Built-in mock authentication - simplified local state only
 */

import { createSlice } from '@reduxjs/toolkit';
import { AuthPermissions } from '../types/api';

/**
 * Mock user data for development
 */
const MOCK_USER = {
  id: '1',
  email: 'admin@example.com',
  name: 'Admin User',
};

const MOCK_PERMISSIONS: AuthPermissions = {
  roleName: 'Admin',
  viewAllQuestions: 'true',
  viewQuestionSectionOrder: 'true',
  createNewQuestion: 'true',
  editQuestion: 'true',
  viewWorkflowTask: 'true',
  viewPendingChanges: 'true',
  viewParticipantInfo: 'true',
  viewParticipantQuestionnaire: 'true',
  createQuestionnaire: 'true',
  editEmail: 'true',
  viewMessage: 'true',
  editSendMessage: 'true',
};

/**
 * Mock login API response
 * Simulates: POST /auth/login
 */
const getMockLoginResponse = () => ({
  user: MOCK_USER,
  permissions: MOCK_PERMISSIONS,
});

/**
 * Mock get current user API response
 * Simulates: GET /auth/me
 */
const getMockCurrentUserResponse = () => ({
  user: MOCK_USER,
  permissions: MOCK_PERMISSIONS,
});

/**
 * Auth state interface
 */
interface AuthState {
  user: {
    id: string;
    email: string;
    name: string;
  } | null;
  permissions: AuthPermissions | null;
  loading: boolean;
  error: string | null;
  isAuthenticated: boolean;
}

/**
 * Initial state
 * Sets up mock authentication automatically
 */
const initialState: AuthState = {
  user: MOCK_USER,
  permissions: MOCK_PERMISSIONS,
  loading: false,
  error: null,
  isAuthenticated: true,
};

/**
 * Auth Slice
 */
export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    /**
     * Set loading state
     */
    setLoading: (state, action) => {
      state.loading = action.payload;
    },

    /**
     * Set error message
     */
    setError: (state, action) => {
      state.error = action.payload;
    },

    /**
     * Clear auth error
     */
    clearError: (state) => {
      state.error = null;
    },

    /**
     * Clear auth state
     */
    clearAuth: (state) => {
      state.user = null;
      state.permissions = null;
      state.isAuthenticated = false;
    },

    /**
     * Placeholder: Login handler
     * Mocks API call: POST /auth/login
     * Returns: { user, permissions }
     */
    loginHandler: (state) => {
      const mockResponse = getMockLoginResponse();
      state.user = mockResponse.user;
      state.permissions = mockResponse.permissions;
      state.isAuthenticated = true;
      state.loading = false;
      state.error = null;
    },

    /**
     * Placeholder: Logout handler
     * Mocks API call: POST /auth/logout
     * Returns: { success: true }
     */
    logoutHandler: (state) => {
      // Mock API response: { success: true }
      state.user = null;
      state.permissions = null;
      state.isAuthenticated = false;
      state.loading = false;
      state.error = null;
    },

    /**
     * Placeholder: Get current user handler
     * Mocks API call: GET /auth/me
     * Returns: { user, permissions }
     */
    getCurrentUserHandler: (state) => {
      const mockResponse = getMockCurrentUserResponse();
      state.user = mockResponse.user;
      state.permissions = mockResponse.permissions;
      state.isAuthenticated = true;
      state.loading = false;
    },
  },
});

export const { 
  setLoading, 
  setError, 
  clearError, 
  clearAuth,
  loginHandler,
  logoutHandler,
  getCurrentUserHandler,
} = authSlice.actions;
export const authReducer = authSlice.reducer;

/**
 * Selectors
 */
export const selectIsAuthenticated = (state: { auth: AuthState }) =>
  state.auth.isAuthenticated;
export const selectUser = (state: { auth: AuthState }) => state.auth.user;
export const selectPermissions = (state: { auth: AuthState }) =>
  state.auth.permissions;
export const selectAuthLoading = (state: { auth: AuthState }) =>
  state.auth.loading;
export const selectAuthError = (state: { auth: AuthState }) => state.auth.error;
