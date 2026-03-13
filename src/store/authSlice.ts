/**
 * Auth Slice
 * Redux slice for authentication and authorization state management
 */

import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { AuthResponse, LoginRequest, AuthPermissions } from '../types/api';
import { apiPost, apiGet } from '../utils/api';

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
  token: string | null;
  loading: boolean;
  error: string | null;
  isAuthenticated: boolean;
}

/**
 * Initial state
 * Restores auth data from localStorage on app startup
 */
const getInitialState = (): AuthState => {
  const token = localStorage.getItem('authToken');
  const userJson = localStorage.getItem('authUser');
  const permissionsJson = localStorage.getItem('authPermissions');

  let user = null;
  let permissions = null;

  if (userJson) {
    try {
      user = JSON.parse(userJson);
    } catch (e) {
      console.error('Failed to parse stored user:', e);
    }
  }

  if (permissionsJson) {
    try {
      permissions = JSON.parse(permissionsJson);
    } catch (e) {
      console.error('Failed to parse stored permissions:', e);
    }
  }

  return {
    user,
    permissions,
    token,
    loading: false,
    error: null,
    isAuthenticated: !!token,
  };
};

const initialState: AuthState = getInitialState();

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
     * Set token manually (for testing)
     */
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
      localStorage.setItem('authToken', action.payload);
    },

    /**
     * Clear auth state
     */
    clearAuth: (state) => {
      state.user = null;
      state.permissions = null;
      state.token = null;
      state.isAuthenticated = false;
      localStorage.removeItem('authToken');
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
        state.token = action.payload.token;
        state.isAuthenticated = true;
        localStorage.setItem('authToken', action.payload.token);
        localStorage.setItem('authUser', JSON.stringify(action.payload.user));
        localStorage.setItem(
          'authPermissions',
          JSON.stringify(action.payload.permissions)
        );
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
        localStorage.setItem('authUser', JSON.stringify(action.payload.user));
        localStorage.setItem(
          'authPermissions',
          JSON.stringify(action.payload.permissions)
        );
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
        state.token = null;
        state.isAuthenticated = false;
        localStorage.removeItem('authToken');
        localStorage.removeItem('authUser');
        localStorage.removeItem('authPermissions');
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearError, setToken, clearAuth } = authSlice.actions;
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
export const selectAuthToken = (state: { auth: AuthState }) => state.auth.token;
