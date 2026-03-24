/**
 * DynamicAttributeReadOnlyRenderer Component
 * Renders dynamic attributes in read-only mode
 * Handles different attribute types (MultiSelect, Radio)
 */

import React from 'react';
import { Box, Typography, Stack, Chip, FormControlLabel, Radio, FormGroup } from '@mui/material';
import {
  DynamicAttribute,
  AttributeControlType,
  AttributeName,
  MultiSelectAttribute,
  RadioAttribute,
} from '../../types/pendingChanges';

interface DynamicAttributeReadOnlyRendererProps {
  /**
   * The dynamic attribute to render
   */
  attribute?: DynamicAttribute;

  /**
   * Whether to highlight this attribute (for comparison view)
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
 * Helper: Get human-readable label for attribute name
 */
const getAttributeLabel = (name: AttributeName): string => {
  const labels: Record<AttributeName, string> = {
    [AttributeName.HBR]: 'HBR (Heritage/Burden/Risk)',
    [AttributeName.COUNTRY_RATINGS]: 'Country Ratings',
    [AttributeName.PCI_DUE_DATE]: 'PCI Due Date',
  };
  return labels[name] || name;
};

/**
 * DynamicAttributeReadOnlyRenderer renders a single dynamic attribute
 */
export const DynamicAttributeReadOnlyRenderer: React.FC<DynamicAttributeReadOnlyRendererProps> = ({
  attribute,
  isHighlighted = false,
  isPrevious = false,
  className,
}) => {
  if (!attribute) {
    return (
      <Box
        sx={{
          py: 1.5,
          px: 2,
          backgroundColor: 'transparent',
          borderRadius: 1,
        }}
      >
        <Typography variant="body2" sx={{ color: 'textSecondary', fontStyle: 'italic' }}>
          No attribute data
        </Typography>
      </Box>
    );
  }

  const label = getAttributeLabel(attribute.name);

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

      {attribute.controlType === AttributeControlType.MULTI_SELECT ? (
        <MultiSelectAttributeRenderer
          attribute={attribute as MultiSelectAttribute}
        />
      ) : attribute.controlType === AttributeControlType.RADIO ? (
        <RadioAttributeRenderer
          attribute={attribute as RadioAttribute}
          attributeName={attribute.name}
        />
      ) : (
        <Typography variant="body2" sx={{ mt: 0.5, color: 'textSecondary' }}>
          Unknown attribute type
        </Typography>
      )}
    </Box>
  );
};

/**
 * Helper component: Render multi-select attribute
 */
interface MultiSelectAttributeRendererProps {
  attribute: MultiSelectAttribute;
}

const MultiSelectAttributeRenderer: React.FC<MultiSelectAttributeRendererProps> = ({
  attribute,
}) => {
  const isEmpty = !attribute.selectedValues || attribute.selectedValues.length === 0;

  if (isEmpty) {
    return (
      <Typography variant="body2" sx={{ mt: 0.5, color: 'textSecondary', fontStyle: 'italic' }}>
        No values selected
      </Typography>
    );
  }

  return (
    <Stack direction="row" spacing={1} sx={{ mt: 1, flexWrap: 'wrap', gap: 1 }}>
      {attribute.selectedValues.map((value, idx) => (
        <Chip
          key={`${value}-${idx}`}
          label={value}
          size="small"
          variant="outlined"
          sx={{
            backgroundColor: 'rgba(102, 187, 106, 0.1)',
          }}
        />
      ))}
    </Stack>
  );
};

/**
 * Helper component: Render radio attribute
 */
interface RadioAttributeRendererProps {
  attribute: RadioAttribute;
  attributeName: AttributeName;
}

const RadioAttributeRenderer: React.FC<RadioAttributeRendererProps> = ({
  attribute,
  attributeName,
}) => {
  // Get available options for this attribute
  const getOptionsForAttribute = (name: AttributeName): string[] => {
    const optionMap: Record<AttributeName, string[]> = {
      [AttributeName.HBR]: [],
      [AttributeName.COUNTRY_RATINGS]: [],
      [AttributeName.PCI_DUE_DATE]: [
        'LESS_THAN_12_MONTHS',
        'GREATER_THAN_12_MONTHS',
      ],
    };
    return optionMap[name] || [];
  };

  const options = getOptionsForAttribute(attributeName);

  if (options.length === 0) {
    return (
      <Typography variant="body2" sx={{ mt: 0.5, color: '#333' }}>
        {attribute.selectedValue || 'Not set'}
      </Typography>
    );
  }

  return (
    <FormGroup sx={{ mt: 1 }}>
      <Stack spacing={0.5}>
        {options.map((option) => (
          <FormControlLabel
            key={option}
            control={
              <Radio
                checked={attribute.selectedValue === option}
                disabled
                size="small"
              />
            }
            label={<Typography variant="body2">{option}</Typography>}
          />
        ))}
      </Stack>
    </FormGroup>
  );
};

export default DynamicAttributeReadOnlyRenderer;
