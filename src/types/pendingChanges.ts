/**
 * Pending Changes Type Definitions
 * Comprehensive types for the pending question changes feature
 */

/**
 * ENUMS FOR RESPONSE AND ATTRIBUTES
 */

/**
 * Supported question response types
 */
export enum ResponseType {
  SINGLE_SELECT = 'SINGLE_SELECT',
  MULTI_SELECT = 'MULTI_SELECT',
  TEXT = 'TEXT',
  TITLE = 'TITLE',
  PARAGRAPH = 'PARAGRAPH',
}

/**
 * Type of change for a pending question
 */
export enum ChangeType {
  NEW = 'NEW',
  MODIFIED = 'MODIFIED',
}

/**
 * Dynamic attribute names available for questions
 */
export enum AttributeName {
  HBR = 'HBR',
  COUNTRY_RATINGS = 'COUNTRY_RATINGS',
  PCI_DUE_DATE = 'PCI_DUE_DATE',
}

/**
 * Control type for attribute rendering
 */
export enum AttributeControlType {
  MULTI_SELECT = 'MULTI_SELECT',
  RADIO = 'RADIO',
}

/**
 * Values for PCI_DUE_DATE attribute
 */
export enum PciDueDateValue {
  LESS_THAN_12_MONTHS = 'LESS_THAN_12_MONTHS',
  GREATER_THAN_12_MONTHS = 'GREATER_THAN_12_MONTHS',
}

/**
 * RESPONSE OPTIONS INTERFACE
 */

/**
 * Single option in a response set (for SINGLE_SELECT or MULTI_SELECT)
 */
export interface ResponseOption {
  id: string;
  label: string;
  value: string;
  isCorrect?: boolean; // For SINGLE_SELECT, one option is marked as correct
}

/**
 * Wrapper for response options
 */
export interface ResponseOptionsSet {
  options: ResponseOption[];
}

/**
 * DYNAMIC ATTRIBUTES INTERFACE
 */

/**
 * Base interface for all dynamic attributes
 */
export interface DynamicAttributeBase {
  name: AttributeName;
  controlType: AttributeControlType;
}

/**
 * Multi-select attribute (like HBR or COUNTRY_RATINGS)
 */
export interface MultiSelectAttribute extends DynamicAttributeBase {
  controlType: AttributeControlType.MULTI_SELECT;
  selectedValues: string[];
}

/**
 * Radio attribute (like PCI_DUE_DATE)
 */
export interface RadioAttribute extends DynamicAttributeBase {
  controlType: AttributeControlType.RADIO;
  selectedValue: string;
}

/**
 * Discriminated union for all attribute types
 */
export type DynamicAttribute = MultiSelectAttribute | RadioAttribute;

/**
 * QUESTION DETAIL INTERFACE
 */

/**
 * Complete question details as they appear in pending changes
 */
export interface QuestionDetail {
  questionId?: string; // For MODIFIED changes, if question already has an ID
  questionText: string;
  responseType: ResponseType;
  responseOptions?: ResponseOptionsSet;
  sectionName: string;
  reviewTypes: string[];
  participantTypes: string[];
  countries: string[];
  dynamicAttributes: DynamicAttribute[];
}

/**
 * PENDING CHANGE INTERFACE
 */

/**
 * Represents a single pending question change in the system
 */
export interface PendingQuestionChange {
  changeId: string;
  changeType: ChangeType;
  changedBy: string;
  changedDate: string;
  comments?: string;
  
  // For NEW changes: only the proposed question
  // For MODIFIED changes: previous AND proposed versions
  proposed: QuestionDetail;
  previous?: QuestionDetail; // Only for MODIFIED changes

  // Metadata for tracking
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  approvalNotes?: string;
}

/**
 * Summary of changed fields for display purposes
 */
export interface ChangedFieldSummary {
  fieldName: string;
  fieldLabel: string;
  hasChanged: boolean;
  previousValue?: unknown;
  proposedValue?: unknown;
}

/**
 * Comparison result for a pending change
 */
export interface PendingChangeComparison {
  changeId: string;
  changeType: ChangeType;
  changedFields: ChangedFieldSummary[];
  isIdentical: boolean;
}

/**
 * API REQUEST/RESPONSE TYPES
 */

/**
 * Request to approve a pending change
 */
export interface ApprovePendingChangeRequest {
  changeId: string;
  approvalNotes?: string;
}

/**
 * Request to reject a pending change
 */
export interface RejectPendingChangeRequest {
  changeId: string;
  rejectionReason: string;
}

/**
 * Response from pending changes list API
 */
export interface PendingChangesListResponse {
  changes: PendingQuestionChange[];
  total: number;
  page: number;
  pageSize: number;
}
