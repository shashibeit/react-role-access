/**
 * Auth Slice
 * Redux slice for authentication and authorization state management
 */

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { AuthResponse, LoginRequest, AuthPermissions } from '../types/api';
import { apiPost, apiGet } from '../utils/api';

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
 * Async thunk for login
 * TODO: Replace with actual API endpoint
 */
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (credentials: LoginRequest, { rejectWithValue }) => {
    try {
      const response = await apiPost<AuthResponse>('/auth/login', credentials);
      return response;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

/**
 * Async thunk for fetching current user
 * TODO: Replace with actual API endpoint
 */
export const fetchCurrentUser = createAsyncThunk(
  'auth/fetchCurrentUser',
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiGet<AuthResponse>('/auth/me');
      return response;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

/**
 * Async thunk for logout
 * TODO: Replace with actual API endpoint
 */
export const logoutUser = createAsyncThunk(
  'auth/logoutUser',
  async (_, { rejectWithValue }) => {
    try {
      await apiPost('/auth/logout', {});
      return null;
    } catch (error) {
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
  },

  extraReducers: (builder) => {
    /**
     * Login user handlers
     */
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.permissions = action.payload.permissions;
        state.isAuthenticated = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.isAuthenticated = false;
      });

    /**
     * Fetch current user handlers
     */
    builder
      .addCase(fetchCurrentUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCurrentUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.permissions = action.payload.permissions;
        state.isAuthenticated = true;
      })
      .addCase(fetchCurrentUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.isAuthenticated = false;
      });

    /**
     * Logout user handlers
     */
    builder
      .addCase(logoutUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.loading = false;
        state.user = null;
        state.permissions = null;
        state.isAuthenticated = false;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearError, clearAuth } = authSlice.actions;
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
