/**
 * ReadOnlyChipList Component
 * Displays an array of values as chips in read-only mode
 */

import React from 'react';
import { Box, Typography, Chip, Stack } from '@mui/material';

interface ReadOnlyChipListProps {
  /**
   * The label for the field
   */
  label: string;

  /**
   * The array of chip values
   */
  items: string[];

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
 * ReadOnlyChipList displays an array of values as chips
 */
export const ReadOnlyChipList: React.FC<ReadOnlyChipListProps> = ({
  label,
  items,
  isHighlighted = false,
  isPrevious = false,
  className,
}) => {
  const isEmpty = !items || items.length === 0;

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
          No items selected
        </Typography>
      ) : (
        <Stack direction="row" spacing={1} sx={{ mt: 1, flexWrap: 'wrap', gap: 1 }}>
          {items.map((item, idx) => (
            <Chip
              key={`${item}-${idx}`}
              label={item}
              size="small"
              variant="outlined"
              sx={{
                backgroundColor: isHighlighted ? 'rgba(102, 187, 106, 0.1)' : 'transparent',
              }}
            />
          ))}
        </Stack>
      )}
    </Box>
  );
};

export default ReadOnlyChipList;
