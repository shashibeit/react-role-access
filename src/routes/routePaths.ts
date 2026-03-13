/**
 * Route path constants for the Questionnaire Generation System
 * Centralized management of all application routes
 */

export const ROUTE_PATHS = {
  // Root
  ROOT: '/',

  // Main modules
  PARTICIPANTS: '/participants',
  
  // Question Bank module
  QUESTION_BANK: '/question-bank',
  QUESTION_BANK_LIST: '/question-bank/question-list',
  QUESTION_BANK_ORDER: '/question-bank/question-order',
  QUESTION_BANK_PENDING: '/question-bank/pending-changes',
  QUESTION_BANK_CREATE: '/question-bank/create',

  // Workflow Queue module
  WORKFLOW_QUEUE: '/workflow-queue',
} as const;

/**
 * Type-safe route path type
 */
export type RoutePath = (typeof ROUTE_PATHS)[keyof typeof ROUTE_PATHS];
