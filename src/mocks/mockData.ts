/**
 * Mock Data Constants
 * Shared mock data used by both Mirage handlers and Redux slices
 */

import { AuthPermissions } from '../types/api';

/**
 * Mock user data for development
 * Stores USERKEY and Session ID (not email/name)
 */
export const MOCK_USER = {
  userKey: 'user123',
  sessionId: 'abc123xyz789',
};

/**
 * Mock permissions for development
 * Defines all user permissions (true/false/null)
 */
export const MOCK_PERMISSIONS: AuthPermissions = {
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

/**
 * Mock get current user API response
 * Simulates: GET /api/auth/getAccessRole
 */
export const getMockCurrentUserResponse = () => ({
  user: MOCK_USER,
  permissions: MOCK_PERMISSIONS,
});

/**
 * Mock logout API response
 * Simulates: POST /auth/logout
 */
export const getMockLogoutResponse = () => ({
  success: true,
  message: 'Logged out successfully',
});
