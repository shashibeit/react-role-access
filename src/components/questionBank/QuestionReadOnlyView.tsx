/**
 * QuestionReadOnlyView Component
 * Displays a complete question in read-only mode
 * Used for NEW pending changes where only proposed question needs to be shown
 */

import React from 'react';
import { Box, Typography, Divider, Stack } from '@mui/material';
import { QuestionDetail } from '../../types/pendingChanges';
import ReadOnlyField from './ReadOnlyField';
import ReadOnlyChipList from './ReadOnlyChipList';
import ReadOnlyOptionsGroup from './ReadOnlyOptionsGroup';
import DynamicAttributeReadOnlyRenderer from './DynamicAttributeReadOnlyRenderer';

interface QuestionReadOnlyViewProps {
  /**
   * The question to display
   */
  question: QuestionDetail;

  /**
   * Optional title/heading for the section
   */
  title?: string;

  /**
   * Optional CSS classes for styling
   */
  className?: string;
}

/**
 * QuestionReadOnlyView displays a complete question in read-only mode
 */
export const QuestionReadOnlyView: React.FC<QuestionReadOnlyViewProps> = ({
  question,
  title = 'Question Details',
  className,
}) => {
  return (
    <Box className={className}>
      {title && (
        <>
          <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
            {title}
          </Typography>
          <Divider sx={{ mb: 2 }} />
        </>
      )}

      <Stack spacing={1.5}>
        {/* Question Text */}
        <ReadOnlyField label="Question Text" value={question.questionText} />

        {/* Response Type */}
        <ReadOnlyField label="Response Type" value={question.responseType} />

        {/* Response Options */}
        {question.responseOptions && (
          <ReadOnlyOptionsGroup
            label="Response Options"
            options={question.responseOptions.options}
            responseType={question.responseType}
          />
        )}

        {/* Section Name */}
        <ReadOnlyField label="Section Name" value={question.sectionName} />

        {/* Review Types */}
        <ReadOnlyChipList label="Review Types" items={question.reviewTypes || []} />

        {/* Participant Types */}
        <ReadOnlyChipList label="Participant Types" items={question.participantTypes || []} />

        {/* Countries */}
        <ReadOnlyChipList label="Countries" items={question.countries || []} />

        {/* Dynamic Attributes Section */}
        {question.dynamicAttributes && question.dynamicAttributes.length > 0 && (
          <>
            <Divider sx={{ my: 2 }} />
            <Typography variant="subtitle2" sx={{ fontWeight: 600, color: 'textSecondary' }}>
              Attributes
            </Typography>
            <Stack spacing={1.5}>
              {question.dynamicAttributes.map((attr) => (
                <DynamicAttributeReadOnlyRenderer key={attr.name} attribute={attr} />
              ))}
            </Stack>
          </>
        )}
      </Stack>
    </Box>
  );
};

export default QuestionReadOnlyView;
