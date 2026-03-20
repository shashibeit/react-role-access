/**
 * Auth Slice
 * Redux slice for authentication and authorization state management
 * Handles auth initialization from cookies and API calls
 */

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { AuthPermissions } from '../types/api';
import { MOCK_USER, MOCK_PERMISSIONS } from '../mocks/mockData';
import { getAuthDataFromCookies, parseCCLVLRoles, storeSessionKey } from '../utils/cookieUtils';

/**
 * Auth state interface
 */
interface AuthState {
  user: {
    userKey: string;
    sessionId: string;
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
 * Async thunk for initializing auth from cookies
 * Called on app mount to handle redirect from auth portal
 */
export const initializeAuthFromCookies = createAsyncThunk(
  'auth/initializeAuthFromCookies',
  async (_, { rejectWithValue }) => {
    try {
      const authData = getAuthDataFromCookies();

      // Check if auth data exists in cookies
      if (!authData.userKey || !authData.sessionKey) {
        console.log('[Auth] No cookie data found');
        return null;
      }

      console.log('[Auth] Found redirect data:', {
        userKey: authData.userKey,
        sessionId: authData.sessionKey,
      });

      // Parse roles from CCLVL
      const roles = parseCCLVLRoles(authData.cclvl || '');
      console.log('[Auth] Parsed roles:', roles);

      // Store session key in sessionStorage
      storeSessionKey(authData.sessionKey);
      console.log('[Auth] Session key stored in sessionStorage');

      // Call getAccessRoleAPI to fetch permissions
      const response = await fetch('/api/auth/getAccessRole', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userKey: authData.userKey,
          sessionKey: authData.sessionKey,
        }),
      });

      if (!response.ok) {
        console.error('[Auth API] Error response:', response.status);
        return rejectWithValue('Failed to fetch permissions');
      }

      const data = await response.json();
      console.log('[Auth API] Permissions received:', data);

      return data;
    } catch (error) {
      console.error('[Auth] Error initializing auth from cookies:', error);
      return rejectWithValue((error as Error).message);
    }
  }
);

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
     * Logout handler
     * Clears all auth data
     */
    logoutHandler: (state) => {
      state.user = null;
      state.permissions = null;
      state.isAuthenticated = false;
      state.loading = false;
      state.error = null;
    },
  },

  /**
   * Extra reducers for async thunks
   */
  extraReducers: (builder) => {
    builder
      // Handle initializeAuthFromCookies pending
      .addCase(initializeAuthFromCookies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      // Handle initializeAuthFromCookies fulfilled
      .addCase(initializeAuthFromCookies.fulfilled, (state, action) => {
        state.loading = false;
        
        if (action.payload) {
          // Successfully fetched permissions from API
          state.user = action.payload.user;
          state.permissions = action.payload.permissions;
          state.isAuthenticated = true;
        } else {
          // No cookies found, use mock data
          state.user = MOCK_USER;
          state.permissions = MOCK_PERMISSIONS;
          state.isAuthenticated = true;
        }
      })
      // Handle initializeAuthFromCookies rejected
      .addCase(initializeAuthFromCookies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        // Fallback to mock data on error
        state.user = MOCK_USER;
        state.permissions = MOCK_PERMISSIONS;
        state.isAuthenticated = true;
      });
  },
});

export const { 
  setLoading, 
  setError, 
  clearError, 
  clearAuth,
  logoutHandler,
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
export const selectAuthError = (state: { auth: AuthState }) =>
  state.auth.error;
