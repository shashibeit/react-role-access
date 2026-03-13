/**
 * Redux Store Configuration
 * Central store for application state management
 */

import { configureStore } from '@reduxjs/toolkit';
import { authReducer } from './authSlice';

/**
 * Configure Redux store
 */
export const store = configureStore({
  reducer: {
    auth: authReducer,
    // TODO: Add other slices here as features are developed
    // participants: participantsReducer,
    // questions: questionsReducer,
    // workflows: workflowsReducer,
  },
});

/**
 * Infer RootState type from store
 */
export type RootState = ReturnType<typeof store.getState>;

/**
 * Infer AppDispatch type from store
 */
export type AppDispatch = typeof store.dispatch;
