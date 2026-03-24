/**
 * ReadOnlyField Component
 * Displays a single question field value in read-only mode
 */

import React from 'react';
import { Box, Typography } from '@mui/material';

interface ReadOnlyFieldProps {
  /**
   * The label for the field (e.g., "Question Text", "Section Name")
   */
  label: string;

  /**
   * The value to display
   */
  value: unknown;

  /**
   * Optional CSS classes for styling
   */
  className?: string;

  /**
   * Whether to highlight this field (for comparison view)
   */
  isHighlighted?: boolean;

  /**
   * Whether this is a previous/old value (for comparison)
   */
  isPrevious?: boolean;
}

/**
 * ReadOnlyField displays a labeled value
 */
export const ReadOnlyField: React.FC<ReadOnlyFieldProps> = ({
  label,
  value,
  className,
  isHighlighted = false,
  isPrevious = false,
}) => {
  // Convert value to string for display
  const displayValue = value === null || value === undefined ? 'Not set' : String(value);

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
      <Typography
        variant="body2"
        sx={{
          mt: 0.5,
          color: '#333',
          wordBreak: 'break-word',
        }}
      >
        {displayValue}
      </Typography>
    </Box>
  );
};

export default ReadOnlyField;
