/**
 * API Response and Data Types
 * Type definitions for API endpoints
 */

/**
 * AUTHENTICATION & AUTHORIZATION TYPES
 */
export interface AuthPermissions {
  roleName: string;
  viewAllQuestions: string;
  viewQuestionSectionOrder: string | null;
  createNewQuestion: string;
  editQuestion: string;
  viewWorkflowTask: string | null;
  viewPendingChanges: string | null;
  viewParticipantInfo: string;
  viewParticipantQuestionnaire: string;
  createQuestionnaire: string;
  editEmail: string;
  viewMessage: string;
  editSendMessage: string;
}

export interface AuthResponse {
  user: {
    id: string;
    email: string;
    name: string;
  };
  permissions: AuthPermissions;
  token: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

/**
 * PARTICIPANT TYPES
 */
export interface Participant {
  id: number;
  name: string;
  email: string;
  status: 'Active' | 'Inactive';
  createdAt: string;
  updatedAt: string;
}

export interface ParticipantListResponse {
  participants: Participant[];
  total: number;
  page: number;
  pageSize: number;
}

export interface CreateParticipantRequest {
  name: string;
  email: string;
  status: 'Active' | 'Inactive';
}

/**
 * QUESTION TYPES
 */
export interface Question {
  id: number;
  title: string;
  category: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  questionText: string;
  optionA: string;
  optionB: string;
  optionC: string;
  optionD: string;
  correctAnswer: 'A' | 'B' | 'C' | 'D';
  explanation?: string;
  status: 'Published' | 'Draft';
  order: number;
  createdAt: string;
  updatedAt: string;
}

export interface QuestionListResponse {
  questions: Question[];
  total: number;
  page: number;
  pageSize: number;
}

export interface CreateQuestionRequest {
  title: string;
  category: string;
  difficulty: string;
  questionText: string;
  optionA: string;
  optionB: string;
  optionC: string;
  optionD: string;
  correctAnswer: string;
  explanation?: string;
}

export interface QuestionOrder {
  id: number;
  order: number;
}

export interface UpdateQuestionOrderRequest {
  questions: QuestionOrder[];
}

/**
 * PENDING CHANGES TYPES
 */
export interface PendingChange {
  id: number;
  questionId: number;
  title: string;
  changeType: 'Modified' | 'Deleted' | 'Added';
  changedBy: string;
  changedDate: string;
  changeData?: unknown;
}

export interface PendingChangesResponse {
  pendingChanges: PendingChange[];
  total: number;
}

export interface ApprovePendingChangeRequest {
  changeId: number;
}

export interface RejectPendingChangeRequest {
  changeId: number;
}

/**
 * WORKFLOW TYPES
 */
export interface Workflow {
  id: number;
  name: string;
  status: 'Pending' | 'Running' | 'Completed' | 'Failed';
  progress: number;
  createdDate: string;
  startedDate?: string;
  completedDate?: string;
}

export interface WorkflowListResponse {
  workflows: Workflow[];
  total: number;
  page: number;
  pageSize: number;
}

export interface WorkflowSummary {
  total: number;
  pending: number;
  running: number;
  completed: number;
  failed: number;
}

export interface CreateWorkflowRequest {
  name: string;
  type: string;
  config?: unknown;
}

export interface WorkflowLogsResponse {
  logs: string[];
  status: string;
}

/**
 * COMMON TYPES
 */
export interface ApiErrorResponse {
  error: string;
  message?: string;
  code?: string;
}

export interface PaginationParams {
  page?: number;
  pageSize?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

/**
 * TODO: Add more specific types as APIs are implemented
 * TODO: Add generic response wrapper types
 * TODO: Add utility types for API requests/responses
 */
