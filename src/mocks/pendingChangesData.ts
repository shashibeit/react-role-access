/**
 * Mock Data for Pending Changes Feature
 * Contains realistic pending question changes for testing
 */

import {
  PendingQuestionChange,
  ChangeType,
  ResponseType,
  AttributeName,
  AttributeControlType,
  DynamicAttribute,
  ResponseOption,
} from '../types/pendingChanges';

/**
 * MOCK RESPONSE OPTIONS
 */

const mockSingleSelectOptions: ResponseOption[] = [
  {
    id: 'opt1',
    label: 'React is a JavaScript library',
    value: 'react_lib',
    isCorrect: true,
  },
  {
    id: 'opt2',
    label: 'React is a programming language',
    value: 'react_lang',
    isCorrect: false,
  },
  {
    id: 'opt3',
    label: 'React is a web server',
    value: 'react_server',
    isCorrect: false,
  },
  {
    id: 'opt4',
    label: 'React is a CSS framework',
    value: 'react_css',
    isCorrect: false,
  },
];

const mockMultiSelectOptions: ResponseOption[] = [
  {
    id: 'ts_opt1',
    label: 'Strongly Typed',
    value: 'strongly_typed',
    isCorrect: true,
  },
  {
    id: 'ts_opt2',
    label: 'Object-Oriented',
    value: 'object_oriented',
    isCorrect: true,
  },
  {
    id: 'ts_opt3',
    label: 'Dynamically Typed',
    value: 'dynamically_typed',
    isCorrect: false,
  },
  {
    id: 'ts_opt4',
    label: 'Functional',
    value: 'functional',
    isCorrect: true,
  },
];

/**
 * MOCK DYNAMIC ATTRIBUTES
 */

const mockHBRAttribute: DynamicAttribute = {
  name: AttributeName.HBR,
  controlType: AttributeControlType.MULTI_SELECT,
  selectedValues: ['Heritage', 'Burden'],
};

const mockCountryRatingsAttribute: DynamicAttribute = {
  name: AttributeName.COUNTRY_RATINGS,
  controlType: AttributeControlType.MULTI_SELECT,
  selectedValues: ['AAA', 'BBB', 'CCC'],
};

const mockPciDueDateAttribute: DynamicAttribute = {
  name: AttributeName.PCI_DUE_DATE,
  controlType: AttributeControlType.RADIO,
  selectedValue: 'LESS_THAN_12_MONTHS',
};

/**
 * PENDING CHANGES DATA
 */

/**
 * Scenario 1: NEW Question - React Basics
 */
const mockNewQuestionChange: PendingQuestionChange = {
  changeId: 'change_001',
  changeType: ChangeType.NEW,
  changedBy: 'John Doe',
  changedDate: '2025-03-15',
  comments: 'Added basic React question for beginner level assessment',
  status: 'PENDING',
  proposed: {
    questionText: 'What is React?',
    responseType: ResponseType.SINGLE_SELECT,
    responseOptions: {
      options: mockSingleSelectOptions,
    },
    sectionName: 'Frontend Development',
    reviewTypes: ['Technical Assessment', 'Knowledge Check'],
    participantTypes: ['Developer', 'QA Engineer'],
    countries: ['US', 'UK', 'India'],
    dynamicAttributes: [mockHBRAttribute, mockPciDueDateAttribute],
  },
};

/**
 * Scenario 2: MODIFIED Question - TypeScript Features
 * Shows a question that was previously published, now has modifications
 */
const mockModifiedQuestionChange: PendingQuestionChange = {
  changeId: 'change_002',
  changeType: ChangeType.MODIFIED,
  changedBy: 'Jane Smith',
  changedDate: '2025-03-14',
  comments: 'Updated options and added new attributes for better assessment',
  status: 'PENDING',
  previous: {
    questionId: 'q_002',
    questionText: 'Which of the following are features of TypeScript?',
    responseType: ResponseType.MULTI_SELECT,
    responseOptions: {
      options: [
        {
          id: 'ts_old_1',
          label: 'Static Typing',
          value: 'static_typing',
          isCorrect: true,
        },
        {
          id: 'ts_old_2',
          label: 'Interfaces',
          value: 'interfaces',
          isCorrect: true,
        },
        {
          id: 'ts_old_3',
          label: 'Dynamic Typing',
          value: 'dynamic_typing',
          isCorrect: false,
        },
      ],
    },
    sectionName: 'JavaScript Advanced',
    reviewTypes: ['Technical Assessment'],
    participantTypes: ['Developer'],
    countries: ['US', 'UK'],
    dynamicAttributes: [mockHBRAttribute],
  },
  proposed: {
    questionId: 'q_002',
    questionText: 'Which of the following are key features of TypeScript? (Updated)',
    responseType: ResponseType.MULTI_SELECT,
    responseOptions: {
      options: mockMultiSelectOptions,
    },
    sectionName: 'Language Features & Advanced Concepts',
    reviewTypes: ['Technical Assessment', 'Code Review'],
    participantTypes: ['Developer', 'Architect'],
    countries: ['US', 'UK', 'Canada', 'Australia', 'India'],
    dynamicAttributes: [mockHBRAttribute, mockCountryRatingsAttribute, mockPciDueDateAttribute],
  },
};

/**
 * Scenario 3: NEW Question - CSS Flexbox
 * Another new question example with attributes
 */
const mockNewCSSQuestion: PendingQuestionChange = {
  changeId: 'change_003',
  changeType: ChangeType.NEW,
  changedBy: 'Bob Johnson',
  changedDate: '2025-03-13',
  comments: 'New CSS Flexbox question for frontend developers',
  status: 'PENDING',
  proposed: {
    questionText: 'What is the default value of flex-direction in CSS Flexbox?',
    responseType: ResponseType.SINGLE_SELECT,
    responseOptions: {
      options: [
        {
          id: 'flex_1',
          label: 'row',
          value: 'row',
          isCorrect: true,
        },
        {
          id: 'flex_2',
          label: 'column',
          value: 'column',
          isCorrect: false,
        },
        {
          id: 'flex_3',
          label: 'row-reverse',
          value: 'row_reverse',
          isCorrect: false,
        },
        {
          id: 'flex_4',
          label: 'column-reverse',
          value: 'column_reverse',
          isCorrect: false,
        },
      ],
    },
    sectionName: 'CSS & Styling',
    reviewTypes: ['Knowledge Check', 'Technical Assessment'],
    participantTypes: ['Developer', 'Designer'],
    countries: ['US'],
    dynamicAttributes: [mockCountryRatingsAttribute],
  },
};

/**
 * Scenario 4: MODIFIED Question - Approved (non-editable example)
 */
const mockApprovedChange: PendingQuestionChange = {
  changeId: 'change_004',
  changeType: ChangeType.MODIFIED,
  changedBy: 'Alice Williams',
  changedDate: '2025-03-12',
  comments: 'Fixed typo in question text and updated options',
  status: 'APPROVED',
  approvalNotes: 'Changes look good. Updated question aligns with current assessment requirements.',
  previous: {
    questionId: 'q_004',
    questionText: 'What does REST stand for?',
    responseType: ResponseType.SINGLE_SELECT,
    responseOptions: {
      options: [
        {
          id: 'rest_1',
          label: 'Representational State Transfer',
          value: 'rest_correct',
          isCorrect: true,
        },
        {
          id: 'rest_2',
          label: 'Remote Execution Service Technology',
          value: 'rest_incorrect_1',
          isCorrect: false,
        },
      ],
    },
    sectionName: 'API & Web Services',
    reviewTypes: ['Technical Assessment'],
    participantTypes: ['Developer'],
    countries: ['US'],
    dynamicAttributes: [],
  },
  proposed: {
    questionId: 'q_004',
    questionText: 'What does REST stand for? (Corrected)',
    responseType: ResponseType.SINGLE_SELECT,
    responseOptions: {
      options: [
        {
          id: 'rest_1',
          label: 'Representational State Transfer',
          value: 'rest_correct',
          isCorrect: true,
        },
        {
          id: 'rest_2',
          label: 'Remote Execution Service Technology',
          value: 'rest_incorrect_1',
          isCorrect: false,
        },
        {
          id: 'rest_3',
          label: 'Real-Time Event Streaming Technology',
          value: 'rest_incorrect_2',
          isCorrect: false,
        },
      ],
    },
    sectionName: 'API & Web Services',
    reviewTypes: ['Technical Assessment'],
    participantTypes: ['Developer'],
    countries: ['US'],
    dynamicAttributes: [],
  },
};

/**
 * Collection of all mock pending changes
 */
export const MOCK_PENDING_CHANGES: PendingQuestionChange[] = [
  mockNewQuestionChange,
  mockModifiedQuestionChange,
  mockNewCSSQuestion,
  mockApprovedChange,
];

/**
 * Export individual scenarios for testing
 */
export {
  mockNewQuestionChange,
  mockModifiedQuestionChange,
  mockNewCSSQuestion,
  mockApprovedChange,
};

/**
 * Helper function: Get mock pending changes with pagination
 */
export const getMockPendingChanges = (page: number = 1, pageSize: number = 10) => {
  const startIdx = (page - 1) * pageSize;
  const endIdx = startIdx + pageSize;

  return {
    changes: MOCK_PENDING_CHANGES.slice(startIdx, endIdx),
    total: MOCK_PENDING_CHANGES.length,
    page,
    pageSize,
  };
};

/**
 * Helper function: Get mock pending changes filtered by status
 */
export const getMockPendingChangesByStatus = (
  status: 'PENDING' | 'APPROVED' | 'REJECTED',
  page: number = 1,
  pageSize: number = 10
) => {
  const filtered = MOCK_PENDING_CHANGES.filter((change) => change.status === status);
  const startIdx = (page - 1) * pageSize;
  const endIdx = startIdx + pageSize;

  return {
    changes: filtered.slice(startIdx, endIdx),
    total: filtered.length,
    page,
    pageSize,
  };
};
