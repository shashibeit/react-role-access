/**
 * Comparison Utilities for Pending Changes
 * Functions to compare questions and identify changed fields
 */

import {
  QuestionDetail,
  DynamicAttribute,
  ResponseOption,
  ChangedFieldSummary,
  AttributeName,
  AttributeControlType,
} from '../types/pendingChanges';

/**
 * Check if two primitive values are different
 * Handles null/undefined safely
 */
export const isPrimitiveFieldChanged = (
  previous: unknown,
  proposed: unknown
): boolean => {
  // Handle null/undefined cases
  if (previous === null || previous === undefined) {
    return proposed !== null && proposed !== undefined;
  }
  if (proposed === null || proposed === undefined) {
    return previous !== null && previous !== undefined;
  }

  return previous !== proposed;
};

/**
 * Compare two string arrays for equality
 * Handles order-insensitive comparison
 */
export const areStringArraysDifferent = (
  previous: string[],
  proposed: string[]
): boolean => {
  if (previous.length !== proposed.length) {
    return true;
  }

  const sortedPrevious = [...previous].sort();
  const sortedProposed = [...proposed].sort();

  return sortedPrevious.some((val, idx) => val !== sortedProposed[idx]);
};

/**
 * Compare two response option sets
 */
export const areResponseOptionsDifferent = (
  previous: { options: ResponseOption[] } | undefined,
  proposed: { options: ResponseOption[] } | undefined
): boolean => {
  // Handle missing options
  if (!previous?.options && !proposed?.options) {
    return false;
  }
  if (!previous?.options || !proposed?.options) {
    return true;
  }

  // Compare lengths
  if (previous.options.length !== proposed.options.length) {
    return true;
  }

  // Compare each option
  return previous.options.some((prevOption, idx) => {
    const propOption = proposed.options[idx];
    if (!propOption) return true;

    return (
      prevOption.id !== propOption.id ||
      prevOption.label !== propOption.label ||
      prevOption.value !== propOption.value ||
      prevOption.isCorrect !== propOption.isCorrect
    );
  });
};

/**
 * Compare two dynamic attributes by name
 */
export const compareAttributesByName = (
  previous: DynamicAttribute | undefined,
  proposed: DynamicAttribute | undefined,
  _attributeName: AttributeName
): boolean => {
  if (!previous && !proposed) {
    return false; // No change
  }
  if (!previous || !proposed) {
    return true; // One exists, one doesn't
  }

  // Both exist - compare by control type
  if (previous.controlType !== proposed.controlType) {
    return true;
  }

  if (previous.controlType === AttributeControlType.MULTI_SELECT) {
    const prevMulti = previous as any;
    const propMulti = proposed as any;
    return areStringArraysDifferent(
      prevMulti.selectedValues || [],
      propMulti.selectedValues || []
    );
  }

  if (previous.controlType === AttributeControlType.RADIO) {
    const prevRadio = previous as any;
    const propRadio = proposed as any;
    return prevRadio.selectedValue !== propRadio.selectedValue;
  }

  return false;
};

/**
 * Get all attributes from a question, indexed by name
 * This creates a map for easier comparison
 */
const getAttributesMap = (
  attributes: DynamicAttribute[]
): Map<AttributeName, DynamicAttribute> => {
  const map = new Map<AttributeName, DynamicAttribute>();
  attributes.forEach((attr) => {
    map.set(attr.name, attr);
  });
  return map;
};

/**
 * Find which dynamic attributes have changed
 */
const findChangedAttributeNames = (
  previous: DynamicAttribute[],
  proposed: DynamicAttribute[]
): AttributeName[] => {
  const changedNames: AttributeName[] = [];
  const prevMap = getAttributesMap(previous);
  const propMap = getAttributesMap(proposed);

  // Check all attributes from previous
  prevMap.forEach((prevAttr, attrName) => {
    const propAttr = propMap.get(attrName);
    if (compareAttributesByName(prevAttr, propAttr, attrName)) {
      changedNames.push(attrName);
    }
  });

  // Check if new attributes were added
  propMap.forEach((_propAttr, attrName) => {
    if (!prevMap.has(attrName)) {
      changedNames.push(attrName);
    }
  });

  return changedNames;
};

/**
 * Get human-readable field label from field name
 */
const getFieldLabel = (fieldName: string): string => {
  const labels: Record<string, string> = {
    questionText: 'Question Text',
    responseType: 'Response Type',
    responseOptions: 'Response Options',
    sectionName: 'Section Name',
    reviewTypes: 'Review Types',
    participantTypes: 'Participant Types',
    countries: 'Countries',
    dynamicAttributes: 'Dynamic Attributes',
  };

  return labels[fieldName] || fieldName;
};

/**
 * Compare two QuestionDetail objects and identify changed fields
 * Returns an array of ChangedFieldSummary objects
 */
export const getChangedFields = (
  previous: QuestionDetail,
  proposed: QuestionDetail
): ChangedFieldSummary[] => {
  const changes: ChangedFieldSummary[] = [];

  // Compare questionText
  if (isPrimitiveFieldChanged(previous.questionText, proposed.questionText)) {
    changes.push({
      fieldName: 'questionText',
      fieldLabel: getFieldLabel('questionText'),
      hasChanged: true,
      previousValue: previous.questionText,
      proposedValue: proposed.questionText,
    });
  }

  // Compare responseType
  if (isPrimitiveFieldChanged(previous.responseType, proposed.responseType)) {
    changes.push({
      fieldName: 'responseType',
      fieldLabel: getFieldLabel('responseType'),
      hasChanged: true,
      previousValue: previous.responseType,
      proposedValue: proposed.responseType,
    });
  }

  // Compare responseOptions
  if (areResponseOptionsDifferent(previous.responseOptions, proposed.responseOptions)) {
    changes.push({
      fieldName: 'responseOptions',
      fieldLabel: getFieldLabel('responseOptions'),
      hasChanged: true,
      previousValue: previous.responseOptions,
      proposedValue: proposed.responseOptions,
    });
  }

  // Compare sectionName
  if (isPrimitiveFieldChanged(previous.sectionName, proposed.sectionName)) {
    changes.push({
      fieldName: 'sectionName',
      fieldLabel: getFieldLabel('sectionName'),
      hasChanged: true,
      previousValue: previous.sectionName,
      proposedValue: proposed.sectionName,
    });
  }

  // Compare reviewTypes
  if (areStringArraysDifferent(previous.reviewTypes, proposed.reviewTypes)) {
    changes.push({
      fieldName: 'reviewTypes',
      fieldLabel: getFieldLabel('reviewTypes'),
      hasChanged: true,
      previousValue: previous.reviewTypes,
      proposedValue: proposed.reviewTypes,
    });
  }

  // Compare participantTypes
  if (areStringArraysDifferent(previous.participantTypes, proposed.participantTypes)) {
    changes.push({
      fieldName: 'participantTypes',
      fieldLabel: getFieldLabel('participantTypes'),
      hasChanged: true,
      previousValue: previous.participantTypes,
      proposedValue: proposed.participantTypes,
    });
  }

  // Compare countries
  if (areStringArraysDifferent(previous.countries, proposed.countries)) {
    changes.push({
      fieldName: 'countries',
      fieldLabel: getFieldLabel('countries'),
      hasChanged: true,
      previousValue: previous.countries,
      proposedValue: proposed.countries,
    });
  }

  // Compare dynamic attributes
  const changedAttrNames = findChangedAttributeNames(
    previous.dynamicAttributes,
    proposed.dynamicAttributes
  );

  if (changedAttrNames.length > 0) {
    const prevAttrMap = getAttributesMap(previous.dynamicAttributes);
    const propAttrMap = getAttributesMap(proposed.dynamicAttributes);

    changedAttrNames.forEach((attrName) => {
      const prevAttr = prevAttrMap.get(attrName);
      const propAttr = propAttrMap.get(attrName);

      changes.push({
        fieldName: `attribute_${attrName}`,
        fieldLabel: attrName,
        hasChanged: true,
        previousValue: prevAttr,
        proposedValue: propAttr,
      });
    });
  }

  return changes;
};

/**
 * Check if two questions are identical
 */
export const areQuestionsIdentical = (
  previous: QuestionDetail,
  proposed: QuestionDetail
): boolean => {
  return getChangedFields(previous, proposed).length === 0;
};

/**
 * Normalize attributes for display/comparison
 * Ensures consistent ordering and structure
 */
export const normalizeAttributesForComparison = (
  attributes: DynamicAttribute[]
): DynamicAttribute[] => {
  // Create a map and rebuild to ensure consistent structure
  const map = getAttributesMap(attributes);
  const result: DynamicAttribute[] = [];

  // Iterate in a consistent order (by enum value)
  Object.values(AttributeName).forEach((attrName) => {
    const attr = map.get(attrName as AttributeName);
    if (attr) {
      result.push(attr);
    }
  });

  return result;
};
