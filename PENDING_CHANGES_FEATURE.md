# Pending Changes Feature - Question Bank Module

## Overview

The Pending Changes feature provides a comprehensive review and approval workflow for managing proposed and modified questions in the Question Bank. Users can view detailed comparisons, approve changes with comments, or reject with reasons.

## Features

### 1. **Two Change Scenarios**

#### New Questions (ChangeType.NEW)
- Display proposed new questions with all fields in read-only mode
- Full question details visible upfront
- Ideal for reviewing brand new question submissions

#### Modified Questions (ChangeType.MODIFIED)
- Side-by-side comparison of previous and proposed versions
- Field-level highlighting showing exactly what changed
- Changes highlighted in red (previous) and green (proposed)

### 2. **Field-Level Comparison**
- Primitive fields (question text, section name, etc.)
- Array fields (countries, review types, participant types)
- Complex fields (response options, dynamic attributes)
- Visual indicators for all changed fields

### 3. **Approval Workflow**
- **Pending** → Approve with optional notes
- **Pending** → Reject with required rejection reason
- Confirmation dialog for rejections
- Optimistic UI updates with loading indicators
- Status tracking (PENDING, APPROVED, REJECTED)

### 4. **Dynamic Attributes Support**
- Multi-select attributes (HBR, COUNTRY_RATINGS)
- Radio button attributes (PCI_DUE_DATE)
- Extensible design for future attributes
- Proper comparison and highlighting of attribute changes

## Project Structure

### Type Definitions

**File:** `src/types/pendingChanges.ts`

```typescript
// Enums
enum ChangeType { NEW, MODIFIED }
enum ResponseType { SINGLE_SELECT, MULTI_SELECT, TEXT, TITLE, PARAGRAPH }
enum AttributeName { HBR, COUNTRY_RATINGS, PCI_DUE_DATE }
enum AttributeControlType { MULTI_SELECT, RADIO }
enum PciDueDateValue { LESS_THAN_12_MONTHS, GREATER_THAN_12_MONTHS }

// Core Types
interface QuestionDetail { /* all question fields */ }
interface PendingQuestionChange { /* change metadata + questions */ }
interface ChangedFieldSummary { /* field-level changes */ }

// Discriminated Unions
type DynamicAttribute = MultiSelectAttribute | RadioAttribute
```

### Utility Functions

**File:** `src/utils/comparisonUtils.ts`

#### Available Functions:

- `isPrimitiveFieldChanged()` - Detect primitive value changes
- `areStringArraysDifferent()` - Compare arrays (order-insensitive)
- `areResponseOptionsDifferent()` - Compare response options
- `compareAttributesByName()` - Compare dynamic attributes
- `getChangedFields()` - Get array of ChangedFieldSummary objects
- `areQuestionsIdentical()` - Check if two questions are identical
- `normalizeAttributesForComparison()` - Ensure consistent attribute ordering

### Display Components

#### ReadOnlyField
**File:** `src/components/questionBank/ReadOnlyField.tsx`

Displays a single labeled field value with optional highlighting.

```tsx
<ReadOnlyField 
  label="Question Text" 
  value="What is React?"
  isHighlighted={hasChanged}
  isPrevious={true}
/>
```

#### ReadOnlyChipList
**File:** `src/components/questionBank/ReadOnlyChipList.tsx`

Displays array values as Material UI Chips.

```tsx
<ReadOnlyChipList 
  label="Countries" 
  items={['US', 'UK', 'India']}
  isHighlighted={hasChanged}
/>
```

#### ReadOnlyOptionsGroup
**File:** `src/components/questionBank/ReadOnlyOptionsGroup.tsx`

Displays response options as radio buttons or checkboxes based on ResponseType.

```tsx
<ReadOnlyOptionsGroup 
  label="Response Options" 
  options={responseOptions}
  responseType={ResponseType.MULTI_SELECT}
/>
```

#### DynamicAttributeReadOnlyRenderer
**File:** `src/components/questionBank/DynamicAttributeReadOnlyRenderer.tsx`

Smart rendering for dynamic attributes. Handles MultiSelect and Radio control types.

```tsx
<DynamicAttributeReadOnlyRenderer 
  attribute={attribute}
  isHighlighted={hasChanged}
/>
```

#### QuestionReadOnlyView
**File:** `src/components/questionBank/QuestionReadOnlyView.tsx`

Full question display in read-only mode. Used for NEW pending changes.

```tsx
<QuestionReadOnlyView 
  question={questionDetail}
  title="Proposed Question"
/>
```

Displays:
- Question text
- Response type
- Response options
- Section name
- Review/Participant types
- Countries
- Dynamic attributes (if any)

#### QuestionComparisonView
**File:** `src/components/questionBank/QuestionComparisonView.tsx`

Side-by-side comparison of previous and proposed versions. Used for MODIFIED pending changes.

```tsx
<QuestionComparisonView 
  previous={previousQuestion}
  proposed={proposedQuestion}
/>
```

Features:
- Left panel: Original version
- Right panel: Proposed version
- Field-level highlighting (red=previous, green=proposed)
- Summary of changed fields below

#### PendingChangeCard
**File:** `src/components/questionBank/PendingChangeCard.tsx`

Expandable card component for displaying a single pending change.

```tsx
<PendingChangeCard 
  change={pendingChange}
  onApprove={handleApprove}
  onReject={handleReject}
/>
```

Features:
- Expandable/collapsible design
- Header shows change type, status, metadata
- Dynamic content based on ChangeType
- Inlined ApprovalActionSection for PENDING status
- Displays approval notes for completed actions

### Page Component

**File:** `src/pages/questionBank/PendingChangesPage.tsx`

Main page for viewing and managing pending changes.

#### Tabs:
1. **Pending Changes** - Shows all pending changes with approval actions
2. **Approved Changes** - Read-only view of approved changes
3. **Rejected Changes** - Read-only view of rejected changes

#### Features:
- Status summary cards (Pending, New Questions, Modified Questions, Approved)
- Full state management for approve/reject operations
- Optimistic UI updates
- Loading indicators during operations
- Empty state handling for each tab

```tsx
export const PendingChangesPage: React.FC = () => {
  // Manages pending changes state
  // Handles approve/reject actions
  // Displays tabbed interface
}
```

### Mock Data

**File:** `src/mocks/pendingChangesData.ts`

Contains realistic mock pending changes for development and testing.

#### Exported Data:
```typescript
// Individual scenarios
export const mockNewQuestionChange: PendingQuestionChange
export const mockModifiedQuestionChange: PendingQuestionChange
export const mockNewCSSQuestion: PendingQuestionChange
export const mockApprovedChange: PendingQuestionChange

// Collection
export const MOCK_PENDING_CHANGES: PendingQuestionChange[]

// Helper functions
export function getMockPendingChanges(page: number, pageSize: number)
export function getMockPendingChangesByStatus(status: string, page: number, pageSize: number)
```

## Usage Examples

### Display a Pending Change

```tsx
import { PendingChangeCard } from '@/components/questionBank/PendingChangeCard';
import { MOCK_PENDING_CHANGES } from '@/mocks/pendingChangesData';

export function MyComponent() {
  const change = MOCK_PENDING_CHANGES[0];
  
  return (
    <PendingChangeCard 
      change={change}
      onApprove={(changeId, notes) => {
        console.log(`Approved: ${changeId}`, notes);
      }}
      onReject={(changeId, reason) => {
        console.log(`Rejected: ${changeId}`, reason);
      }}
    />
  );
}
```

### Compare Two Questions

```tsx
import { QuestionComparisonView } from '@/components/questionBank/QuestionComparisonView';
import { getChangedFields } from '@/utils/comparisonUtils';

export function ComparisonExample() {
  const previousQuestion = { /* ... */ };
  const proposedQuestion = { /* ... */ };
  const changedFields = getChangedFields(previousQuestion, proposedQuestion);
  
  return (
    <>
      <QuestionComparisonView 
        previous={previousQuestion}
        proposed={proposedQuestion}
      />
      <p>Changed fields: {changedFields.length}</p>
    </>
  );
}
```

### Access the Full Page

```tsx
import { PendingChangesPage } from '@/pages/questionBank/PendingChangesPage';

// In your router configuration
{
  path: '/question-bank/pending-changes',
  element: <PendingChangesPage />
}
```

## Data Contract Examples

### New Question Change

```json
{
  "changeId": "change_001",
  "changeType": "NEW",
  "changedBy": "John Doe",
  "changedDate": "2025-03-15",
  "status": "PENDING",
  "proposed": {
    "questionText": "What is React?",
    "responseType": "SINGLE_SELECT",
    "responseOptions": {
      "options": [
        {
          "id": "opt1",
          "label": "A JavaScript library",
          "value": "react_lib",
          "isCorrect": true
        }
      ]
    },
    "sectionName": "Frontend Development",
    "reviewTypes": ["Technical Assessment"],
    "participantTypes": ["Developer"],
    "countries": ["US", "UK", "India"],
    "dynamicAttributes": [
      {
        "name": "HBR",
        "controlType": "MULTI_SELECT",
        "selectedValues": ["Heritage", "Burden"]
      }
    ]
  }
}
```

### Modified Question Change

```json
{
  "changeId": "change_002",
  "changeType": "MODIFIED",
  "changedBy": "Jane Smith",
  "changedDate": "2025-03-14",
  "status": "PENDING",
  "previous": {
    "questionId": "q_002",
    "questionText": "Old question text",
    "responseType": "MULTI_SELECT",
    "sectionName": "Old Section"
    // ... more fields
  },
  "proposed": {
    "questionId": "q_002",
    "questionText": "Updated question text",
    "responseType": "MULTI_SELECT",
    "sectionName": "Updated Section"
    // ... more fields
  }
}
```

## Component Hierarchy

```
PendingChangesPage (Page)
├── QuestionBankTabs (Navigation)
├── Status Summary Cards
├── Tab Container
  ├── Pending Tab
  │  └── PendingChangeCard[] (List)
  │     ├── CardHeader (Clickable)
  │     └── CardContent (Collapse)
  │        ├── QuestionReadOnlyView (for NEW)
  │        │  ├── ReadOnlyField
  │        │  ├── ReadOnlyChipList
  │        │  ├── ReadOnlyOptionsGroup
  │        │  └── DynamicAttributeReadOnlyRenderer[]
  │        │
  │        ├── QuestionComparisonView (for MODIFIED)
  │        │  ├── QuestionReadOnlyView (Previous)
  │        │  └── QuestionReadOnlyView (Proposed)
  │        │
  │        ├── Change Comments (if available)
  │        └── ApprovalActionSection (if PENDING)
  │           ├── Notes TextField
  │           ├── Approve Button
  │           ├── Reject Button
  │           └── Rejection Dialog
  │
  ├── Approved Tab
  │  └── PendingChangeCard[] (Read-only)
  │
  └── Rejected Tab
     └── PendingChangeCard[] (Read-only)
```

## Type System

### Key Interfaces

```typescript
interface QuestionDetail {
  questionId?: string;
  questionText: string;
  responseType: ResponseType;
  responseOptions?: ResponseOptionsSet;
  sectionName: string;
  reviewTypes: string[];
  participantTypes: string[];
  countries: string[];
  dynamicAttributes: DynamicAttribute[];
}

interface PendingQuestionChange {
  changeId: string;
  changeType: ChangeType;
  changedBy: string;
  changedDate: string;
  comments?: string;
  proposed: QuestionDetail;
  previous?: QuestionDetail; // Only for MODIFIED
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  approvalNotes?: string;
}

interface ChangedFieldSummary {
  fieldName: string;
  fieldLabel: string;
  hasChanged: boolean;
  previousValue?: unknown;
  proposedValue?: unknown;
}
```

### Discriminated Unions

```typescript
type DynamicAttribute = MultiSelectAttribute | RadioAttribute;

interface MultiSelectAttribute {
  name: AttributeName;
  controlType: AttributeControlType.MULTI_SELECT;
  selectedValues: string[];
}

interface RadioAttribute {
  name: AttributeName;
  controlType: AttributeControlType.RADIO;
  selectedValue: string;
}
```

## Styling & Theme

- Uses Material-UI v7 components
- Consistent color scheme:
  - Success (green) for NEW changes
  - Info (blue) for MODIFIED changes
  - Warning (orange) for PENDING status
  - Green highlights for proposed changes
  - Red highlights for previous changes
- Smooth transitions and hover effects
- Responsive grid layouts

## Future Enhancements

1. **Bulk Operations**
   - Approve/Reject multiple changes at once
   - Bulk comment addition

2. **Advanced Filtering**
   - Filter by change type (NEW/MODIFIED)
   - Filter by status (PENDING/APPROVED/REJECTED)
   - Filter by date range
   - Search by question text or submitter

3. **Workflow Improvements**
   - Email notifications on approval/rejection
   - Change history and audit log
   - Revision comments/thread discussion
   - Time estimates for review

4. **API Integration**
   - Connect to real backend endpoints
   - Implement pagination
   - Real-time updates using WebSockets
   - Export changes as PDF or CSV

5. **Additional Attributes**
   - Extend AttributeName enum
   - Add new control types
   - Custom attribute rendering

## API Endpoints (To Be Implemented)

```
GET    /api/pending-changes?page=1&pageSize=10
GET    /api/pending-changes/:changeId
POST   /api/pending-changes/:changeId/approve
POST   /api/pending-changes/:changeId/reject
GET    /api/pending-changes/status/:status
DELETE /api/pending-changes/:changeId
```

## Testing

### Mock Data Scenarios

1. **NEW Question with Attributes** - Tests new question display
2. **MODIFIED Question with Multiple Changes** - Tests comparison view
3. **APPROVED Question** - Tests read-only approved state
4. **Various Attribute Combinations** - Tests attribute rendering

### E2E Test Cases

1. Expand/collapse card
2. Approve with comments
3. Reject with reason
4. Tab navigation
5. Mock data loading

## Notes

- All components use TypeScript with strict mode enabled
- No `any` types in type definitions
- Discriminated unions ensure type safety
- Mock data includes realistic scenarios
- Comparison logic handles null/undefined values safely
- UI is fully responsive and accessible

## Files Modified/Created

### New Files Created:
- `src/types/pendingChanges.ts`
- `src/utils/comparisonUtils.ts`
- `src/mocks/pendingChangesData.ts`
- `src/components/questionBank/ReadOnlyField.tsx`
- `src/components/questionBank/ReadOnlyChipList.tsx`
- `src/components/questionBank/ReadOnlyOptionsGroup.tsx`
- `src/components/questionBank/DynamicAttributeReadOnlyRenderer.tsx`
- `src/components/questionBank/QuestionReadOnlyView.tsx`
- `src/components/questionBank/QuestionComparisonView.tsx`
- `src/components/questionBank/PendingChangeCard.tsx`

### Files Modified:
- `src/pages/questionBank/PendingChangesPage.tsx` - Complete rewrite with tabbed interface

## Support

For questions or issues related to the Pending Changes feature, refer to the type definitions, component comments, and mock data examples provided in the codebase.
