/**
 * QuestionComparisonView Component
 * Displays two questions side-by-side for comparison
 * Used for MODIFIED pending changes where previous and proposed versions need to be shown
 */

import React from 'react';
import { Box, Typography, Divider, Stack, Grid } from '@mui/material';
import { QuestionDetail, ChangedFieldSummary } from '../../types/pendingChanges';
import { getChangedFields } from '../../utils/comparisonUtils';
import ReadOnlyField from './ReadOnlyField';
import ReadOnlyChipList from './ReadOnlyChipList';
import ReadOnlyOptionsGroup from './ReadOnlyOptionsGroup';
import DynamicAttributeReadOnlyRenderer from './DynamicAttributeReadOnlyRenderer';

interface QuestionComparisonViewProps {
  /**
   * The previous/original question
   */
  previous: QuestionDetail;

  /**
   * The proposed/new version of the question
   */
  proposed: QuestionDetail;

  /**
   * Optional CSS classes for styling
   */
  className?: string;
}

/**
 * Helper: Check if a field has changed based on changed fields array
 */
const isFieldChanged = (
  fieldName: string,
  changedFields: ChangedFieldSummary[]
): boolean => {
  return changedFields.some((cf) => cf.fieldName === fieldName);
};

/**
 * QuestionComparisonView displays two questions side-by-side for comparison
 */
export const QuestionComparisonView: React.FC<QuestionComparisonViewProps> = ({
  previous,
  proposed,
  className,
}) => {
  // Get list of changed fields
  const changedFields = getChangedFields(previous, proposed);

  return (
    <Box className={className}>
      <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
        Question Comparison
      </Typography>
      <Divider sx={{ mb: 2 }} />

      <Grid container spacing={2}>
        {/* Previous/Original Question */}
        <Grid item xs={12} md={6}>
          <Box
            sx={{
              p: 2,
              backgroundColor: '#fafafa',
              borderRadius: 1,
              border: '1px solid #e0e0e0',
            }}
          >
            <Typography
              variant="subtitle2"
              sx={{
                fontWeight: 600,
                mb: 2,
                color: 'textSecondary',
              }}
            >
              Original Version
            </Typography>

            <Stack spacing={1.5}>
              {/* Question Text */}
              <ReadOnlyField
                label="Question Text"
                value={previous.questionText}
                isHighlighted={isFieldChanged('questionText', changedFields)}
                isPrevious
              />

              {/* Response Type */}
              <ReadOnlyField
                label="Response Type"
                value={previous.responseType}
                isHighlighted={isFieldChanged('responseType', changedFields)}
                isPrevious
              />

              {/* Response Options */}
              {previous.responseOptions && (
                <ReadOnlyOptionsGroup
                  label="Response Options"
                  options={previous.responseOptions.options}
                  responseType={previous.responseType}
                  isHighlighted={isFieldChanged('responseOptions', changedFields)}
                  isPrevious
                />
              )}

              {/* Section Name */}
              <ReadOnlyField
                label="Section Name"
                value={previous.sectionName}
                isHighlighted={isFieldChanged('sectionName', changedFields)}
                isPrevious
              />

              {/* Review Types */}
              <ReadOnlyChipList
                label="Review Types"
                items={previous.reviewTypes || []}
                isHighlighted={isFieldChanged('reviewTypes', changedFields)}
                isPrevious
              />

              {/* Participant Types */}
              <ReadOnlyChipList
                label="Participant Types"
                items={previous.participantTypes || []}
                isHighlighted={isFieldChanged('participantTypes', changedFields)}
                isPrevious
              />

              {/* Countries */}
              <ReadOnlyChipList
                label="Countries"
                items={previous.countries || []}
                isHighlighted={isFieldChanged('countries', changedFields)}
                isPrevious
              />

              {/* Dynamic Attributes */}
              {previous.dynamicAttributes && previous.dynamicAttributes.length > 0 && (
                <>
                  <Divider sx={{ my: 1 }} />
                  <Typography variant="caption" sx={{ color: 'textSecondary', fontWeight: 500 }}>
                    Attributes
                  </Typography>
                  <Stack spacing={1.5}>
                    {previous.dynamicAttributes.map((attr) => (
                      <DynamicAttributeReadOnlyRenderer
                        key={attr.name}
                        attribute={attr}
                        isHighlighted={isFieldChanged(`attribute_${attr.name}`, changedFields)}
                        isPrevious
                      />
                    ))}
                  </Stack>
                </>
              )}
            </Stack>
          </Box>
        </Grid>

        {/* Proposed/New Question */}
        <Grid item xs={12} md={6}>
          <Box
            sx={{
              p: 2,
              backgroundColor: '#fafafa',
              borderRadius: 1,
              border: '1px solid #e0e0e0',
            }}
          >
            <Typography
              variant="subtitle2"
              sx={{
                fontWeight: 600,
                mb: 2,
                color: 'textSecondary',
              }}
            >
              Proposed Version
            </Typography>

            <Stack spacing={1.5}>
              {/* Question Text */}
              <ReadOnlyField
                label="Question Text"
                value={proposed.questionText}
                isHighlighted={isFieldChanged('questionText', changedFields)}
              />

              {/* Response Type */}
              <ReadOnlyField
                label="Response Type"
                value={proposed.responseType}
                isHighlighted={isFieldChanged('responseType', changedFields)}
              />

              {/* Response Options */}
              {proposed.responseOptions && (
                <ReadOnlyOptionsGroup
                  label="Response Options"
                  options={proposed.responseOptions.options}
                  responseType={proposed.responseType}
                  isHighlighted={isFieldChanged('responseOptions', changedFields)}
                />
              )}

              {/* Section Name */}
              <ReadOnlyField
                label="Section Name"
                value={proposed.sectionName}
                isHighlighted={isFieldChanged('sectionName', changedFields)}
              />

              {/* Review Types */}
              <ReadOnlyChipList
                label="Review Types"
                items={proposed.reviewTypes || []}
                isHighlighted={isFieldChanged('reviewTypes', changedFields)}
              />

              {/* Participant Types */}
              <ReadOnlyChipList
                label="Participant Types"
                items={proposed.participantTypes || []}
                isHighlighted={isFieldChanged('participantTypes', changedFields)}
              />

              {/* Countries */}
              <ReadOnlyChipList
                label="Countries"
                items={proposed.countries || []}
                isHighlighted={isFieldChanged('countries', changedFields)}
              />

              {/* Dynamic Attributes */}
              {proposed.dynamicAttributes && proposed.dynamicAttributes.length > 0 && (
                <>
                  <Divider sx={{ my: 1 }} />
                  <Typography variant="caption" sx={{ color: 'textSecondary', fontWeight: 500 }}>
                    Attributes
                  </Typography>
                  <Stack spacing={1.5}>
                    {proposed.dynamicAttributes.map((attr) => (
                      <DynamicAttributeReadOnlyRenderer
                        key={attr.name}
                        attribute={attr}
                        isHighlighted={isFieldChanged(`attribute_${attr.name}`, changedFields)}
                      />
                    ))}
                  </Stack>
                </>
              )}
            </Stack>
          </Box>
        </Grid>
      </Grid>

      {/* Summary of Changes */}
      {changedFields.length > 0 && (
        <Box sx={{ mt: 3, p: 2, backgroundColor: '#fff3e0', borderRadius: 1 }}>
          <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
            Fields Modified ({changedFields.length})
          </Typography>
          <Stack spacing={0.5}>
            {changedFields.map((field) => (
              <Typography key={field.fieldName} variant="body2">
                • {field.fieldLabel}
              </Typography>
            ))}
          </Stack>
        </Box>
      )}
    </Box>
  );
};

export default QuestionComparisonView;
