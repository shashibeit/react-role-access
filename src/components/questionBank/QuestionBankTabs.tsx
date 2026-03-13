/**
 * QuestionBankTabs Component
 * Secondary navigation tabs specific to Question Bank module
 * Shows tabs for:
 * - Question List Table
 * - Question Order
 * - Pending Changes
 *
 * This component should be used within Question Bank pages (except Create page)
 * to provide secondary navigation between Question Bank sections
 */

import React, { useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Tabs, Tab, Box, Paper } from '@mui/material';
import { ROUTE_PATHS } from '../../routes/routePaths';

interface QuestionBankTabsProps {
  // Reserved for future props such as tabCount, loading state, etc.
}

interface TabItem {
  label: string;
  path: string;
  value: string;
}

/**
 * QuestionBankTabs renders secondary navigation within Question Bank module
 * Active tab is highlighted based on current route
 */
export const QuestionBankTabs: React.FC<QuestionBankTabsProps> = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Define Question Bank tabs
  const tabItems: TabItem[] = useMemo(
    () => [
      {
        label: 'Question List',
        path: ROUTE_PATHS.QUESTION_BANK_LIST,
        value: 'question-list',
      },
      {
        label: 'Question Order',
        path: ROUTE_PATHS.QUESTION_BANK_ORDER,
        value: 'question-order',
      },
      {
        label: 'Pending Changes',
        path: ROUTE_PATHS.QUESTION_BANK_PENDING,
        value: 'pending-changes',
      },
    ],
    []
  );

  /**
   * Determine current active tab based on route
   */
  const getCurrentTab = (): string => {
    const currentPath = location.pathname;

    if (currentPath.includes('question-order')) {
      return 'question-order';
    } else if (currentPath.includes('pending-changes')) {
      return 'pending-changes';
    } else if (currentPath.includes('question-list')) {
      return 'question-list';
    }

    return 'question-list';
  };

  /**
   * Handle tab change navigation
   */
  const handleTabChange = (_event: React.SyntheticEvent, newValue: string) => {
    const selectedTab = tabItems.find((item) => item.value === newValue);
    if (selectedTab) {
      navigate(selectedTab.path);
    }
  };

  const currentTab = getCurrentTab();

  return (
    <Paper
      elevation={0}
      sx={{
        backgroundColor: '#fafafa',
        borderBottom: '1px solid #e0e0e0',
        marginBottom: 3,
      }}
    >
      <Box sx={{ px: 3 }}>
        <Tabs
          value={currentTab}
          onChange={handleTabChange}
          aria-label="Question Bank navigation"
          TabIndicatorProps={{
            sx: {
              backgroundColor: '#0066cc',
              height: '3px',
            },
          }}
        >
          {tabItems.map((tab) => (
            <Tab
              key={tab.value}
              label={tab.label}
              value={tab.value}
              sx={{
                textTransform: 'none',
                fontSize: '0.95rem',
                fontWeight: 500,
                color: '#999',
                '&.Mui-selected': {
                  color: '#0066cc',
                  fontWeight: 600,
                },
                '&:hover': {
                  backgroundColor: '#f0f0f0',
                },
              }}
            />
          ))}
        </Tabs>
      </Box>
    </Paper>
  );
};

export default QuestionBankTabs;
