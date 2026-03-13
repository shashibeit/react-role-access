/**
 * Mirage JS Server Configuration
 * Mock API server for development and testing
 */

import { createServer } from 'miragejs';
import { setupRoutes } from './handlers.js';

/**
 * Configure and create Mirage server instance
 * This replaces real API calls during development
 */
export function makeServer({ environment = 'development' } = {}) {
  const server = createServer({
    environment,

    /**
     * Define data models for Mirage
     * TODO: Add models as API endpoints are defined
     * Examples:
     * - participant: Model.extend({})
     * - question: Model.extend({})
     * - workflow: Model.extend({})
     */
    models: {
      // Models will be added here
    },

    /**
     * Define routes for mock API endpoints
     * TODO: Add route handlers in handlers.ts
     */
    routes() {
      setupRoutes(this);
    },

    /**
     * Seed initial data for the mock server
     * TODO: Add seeding logic when models are defined
     */
    seeds() {
      // TODO: Seed initial mock data
      console.log('[Mirage] Server initialized with mock data');
    },
  });

  return server;
}
