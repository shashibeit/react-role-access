/**
 * Mirage JS API Handlers
 * Define all mock API endpoints here
 * Mock data imported from shared mockData.ts file
 */

import { Server } from 'miragejs';
import { getMockCurrentUserResponse, getMockLogoutResponse } from './mockData';

/**
 * Setup all API route handlers
 * Routes will be organized by module:
 * - /api/participants/*
 * - /api/questions/*
 * - /api/workflows/*
 *
 * TODO: Add the following API endpoints as needed:
 *
 * PARTICIPANT ENDPOINTS:
 * - GET /api/participants - Get all participants
 * - POST /api/participants - Create new participant
 * - GET /api/participants/:id - Get participant by ID
 * - PUT /api/participants/:id - Update participant
 * - DELETE /api/participants/:id - Delete participant
 *
 * QUESTION ENDPOINTS:
 * - GET /api/questions - Get all questions
 * - POST /api/questions - Create new question
 * - GET /api/questions/:id - Get question by ID
 * - PUT /api/questions/:id - Update question
 * - DELETE /api/questions/:id - Delete question
 * - PUT /api/questions/:id/order - Update question order
 * - GET /api/questions/pending-changes - Get pending changes
 * - POST /api/questions/:id/approve - Approve pending changes
 * - POST /api/questions/:id/reject - Reject pending changes
 *
 * WORKFLOW ENDPOINTS:
 * - GET /api/workflows - Get all workflows
 * - POST /api/workflows - Create new workflow
 * - GET /api/workflows/:id - Get workflow by ID
 * - POST /api/workflows/:id/start - Start workflow
 * - POST /api/workflows/:id/pause - Pause workflow
 * - POST /api/workflows/:id/retry - Retry workflow
 * - GET /api/workflows/:id/logs - Get workflow logs
 */
export function setupRoutes(server: Server) {
  // API namespace for all endpoints
  server.namespace = '/api';

  /**
   * AUTHENTICATION ENDPOINTS
   */
  server.post('/auth/logout', () => {
    return getMockLogoutResponse();
  });

  server.get('/auth/me', () => {
    // Get current user and permissions from shared mockData
    return getMockCurrentUserResponse();
  });

  server.post('/auth/getAccessRole', () => {
    // Get access role/permissions based on session key
    // Called when user is redirected from auth portal with MSC_SESSION
    // Returns permissions mapped to this app
    return getMockCurrentUserResponse();
  });

  /**
   * PARTICIPANTS ENDPOINTS
   * TODO: Implement participant CRUD operations
   */
  server.get('/participants', () => {
    // TODO: Return mock participants list
    return {
      participants: [],
    };
  });

  server.post('/participants', () => {
    // TODO: Create new participant
    return {
      success: true,
      message: 'Participant created',
    };
  });

  /**
   * QUESTIONS ENDPOINTS
   * TODO: Implement question CRUD operations
   */
  server.get('/questions', () => {
    // TODO: Return mock questions list
    return {
      questions: [],
    };
  });

  server.post('/questions', () => {
    // TODO: Create new question
    return {
      success: true,
      message: 'Question created',
    };
  });

  server.get('/questions/pending-changes', () => {
    // TODO: Return pending changes
    return {
      pendingChanges: [],
    };
  });

  /**
   * WORKFLOWS ENDPOINTS
   * TODO: Implement workflow operations
   */
  server.get('/workflows', () => {
    // TODO: Return mock workflows list
    return {
      workflows: [],
    };
  });

  server.post('/workflows', () => {
    // TODO: Create new workflow
    return {
      success: true,
      message: 'Workflow created',
    };
  });

  /**
   * Global error handler
   * Catch-all for undefined routes
   */
  server.get('/*', () => {
    return {
      error: 'Not found',
    };
  });

  console.log('[Mirage] API routes configured');
}
