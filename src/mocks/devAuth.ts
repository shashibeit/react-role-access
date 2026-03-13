/**
 * Development Auth Helper
 * Automatically authenticates user in development mode
 * This allows testing without login screen
 */

import { store } from '../store/store';
import { setToken } from '../store/authSlice';

/**
 * Initialize development authentication
 * Sets up mock user in localStorage and Redux state
 * TODO: Remove or disable in production
 */
export function initializeDevelopmentAuth(): void {
  // Only run in development and if not already authenticated
  if (process.env.NODE_ENV !== 'development') {
    return;
  }

  const existingToken = localStorage.getItem('authToken');
  if (existingToken) {
    console.log('[Dev Auth] User already authenticated');
    return;
  }

  // Mock user data (matches Mirage mock)
  const mockToken = `dev-mock-token-${Date.now()}`;
  const mockUser = {
    id: '1',
    email: 'developer@example.com',
    name: 'Developer User',
  };
  const mockPermissions = {
    roleName: 'FRC_DEV_PSOR_DUE_DIL_MGR',
    viewAllQuestions: 'true',
    viewQuestionSectionOrder: null,
    createNewQuestion: 'true',
    editQuestion: 'true',
    viewWorkflowTask: null,
    viewPendingChanges: null,
    viewParticipantInfo: 'true',
    viewParticipantQuestionnaire: 'true',
    createQuestionnaire: 'true',
    editEmail: 'true',
    viewMessage: 'true',
    editSendMessage: 'true',
  };

  // Store in localStorage
  localStorage.setItem('authToken', mockToken);
  localStorage.setItem('authUser', JSON.stringify(mockUser));
  localStorage.setItem('authPermissions', JSON.stringify(mockPermissions));

  // Update Redux state
  store.dispatch(setToken(mockToken));

  console.log('[Dev Auth] Auto-authenticated developer user');
  console.log('[Dev Auth] Email:', mockUser.email);
  console.log('[Dev Auth] Role:', mockPermissions.roleName);
}
