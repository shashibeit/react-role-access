/**
 * Route configuration for the Questionnaire Generation System
 * Defines all routes and their corresponding components
 */

import React from 'react';
import { Navigate, RouteObject } from 'react-router-dom';
import { ROUTE_PATHS } from './routePaths';

// Layout
import MainLayout from '../components/layout/MainLayout';

// Page components
import ParticipantListPage from '../pages/participants/ParticipantListPage';
import QuestionListPage from '../pages/questionBank/QuestionListPage';
import QuestionOrderPage from '../pages/questionBank/QuestionOrderPage';
import PendingChangesPage from '../pages/questionBank/PendingChangesPage';
import CreateQuestionPage from '../pages/questionBank/CreateQuestionPage';
import WorkflowQueuePage from '../pages/workflowQueue/WorkflowQueuePage';

/**
 * App routes configuration
 * All routes are wrapped under MainLayout for consistent navigation
 */
export const routes: RouteObject[] = [
  {
    element: <MainLayout />,
    children: [
      // Root redirect
      {
        path: ROUTE_PATHS.ROOT,
        element: <Navigate to={ROUTE_PATHS.PARTICIPANTS} replace />,
      },

      // Participant List module
      {
        path: ROUTE_PATHS.PARTICIPANTS,
        element: <ParticipantListPage />,
      },

      // Question Bank module with nested routes
      {
        path: ROUTE_PATHS.QUESTION_BANK,
        children: [
          // Question Bank index redirect
          {
            index: true,
            element: <Navigate to={ROUTE_PATHS.QUESTION_BANK_LIST} replace />,
          },

          // Question List Table
          {
            path: 'question-list',
            element: <QuestionListPage />,
          },

          // Question Order
          {
            path: 'question-order',
            element: <QuestionOrderPage />,
          },

          // Pending Changes
          {
            path: 'pending-changes',
            element: <PendingChangesPage />,
          },

          // Create Question
          {
            path: 'create',
            element: <CreateQuestionPage />,
          },
        ],
      },

      // Workflow Queue module
      {
        path: ROUTE_PATHS.WORKFLOW_QUEUE,
        element: <WorkflowQueuePage />,
      },
    ],
  },
];
