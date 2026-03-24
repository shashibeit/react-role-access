/**
 * ReadOnlyOptionsGroup Component
 * Displays response options in read-only mode
 * Supports both single-select (radio) and multi-select (checkboxes) display modes
 */

import React from 'react';
import { Box, Typography, FormControlLabel, Radio, Checkbox, FormGroup, Stack } from '@mui/material';
import { ResponseOption, ResponseType } from '../../types/pendingChanges';

interface ReadOnlyOptionsGroupProps {
  /**
   * The label for the field
   */
  label: string;

  /**
   * Array of response options
   */
  options: ResponseOption[];

  /**
   * The response type (determines display mode)
   */
  responseType: ResponseType;

  /**
   * Whether to highlight this field (for comparison view)
   */
  isHighlighted?: boolean;

  /**
   * Whether this is a previous/old value (for comparison)
   */
  isPrevious?: boolean;

  /**
   * Optional CSS classes for styling
   */
  className?: string;
}

/**
 * ReadOnlyOptionsGroup displays response options in read-only mode
 * Renders as radio buttons for SINGLE_SELECT or checkboxes for MULTI_SELECT
 */
export const ReadOnlyOptionsGroup: React.FC<ReadOnlyOptionsGroupProps> = ({
  label,
  options,
  responseType,
  isHighlighted = false,
  isPrevious = false,
  className,
}) => {
  const isEmpty = !options || options.length === 0;
  const isSingleSelect =
    responseType === ResponseType.SINGLE_SELECT ||
    responseType === ResponseType.TITLE ||
    responseType === ResponseType.PARAGRAPH;

  return (
    <Box
      sx={{
        py: 1.5,
        px: 2,
        backgroundColor: isHighlighted ? (isPrevious ? '#ffebee' : '#e8f5e9') : 'transparent',
        borderRadius: 1,
        border: isHighlighted ? `1px solid ${isPrevious ? '#ef5350' : '#66bb6a'}` : 'none',
        transition: 'background-color 0.2s',
      }}
      className={className}
    >
      <Typography variant="caption" sx={{ color: 'textSecondary', fontWeight: 500 }}>
        {label}
      </Typography>

      {isEmpty ? (
        <Typography
          variant="body2"
          sx={{
            mt: 0.5,
            color: 'textSecondary',
            fontStyle: 'italic',
          }}
        >
          No options available
        </Typography>
      ) : (
        <FormGroup sx={{ mt: 1 }}>
          <Stack spacing={0.5}>
            {options.map((option) => (
              <div key={option.id}>
                {isSingleSelect ? (
                  <FormControlLabel
                    control={
                      <Radio
                        checked={option.isCorrect === true}
                        disabled
                        size="small"
                      />
                    }
                    label={<Typography variant="body2">{option.label}</Typography>}
                  />
                ) : (
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={option.isCorrect === true}
                        disabled
                        size="small"
                      />
                    }
                    label={<Typography variant="body2">{option.label}</Typography>}
                  />
                )}
              </div>
            ))}
          </Stack>
        </FormGroup>
      )}
    </Box>
  );
};

export default ReadOnlyOptionsGroup;
