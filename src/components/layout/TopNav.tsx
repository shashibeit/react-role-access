/**
 * TopNav Component
 * Main navigation menu with top-level routes:
 * - Participant List
 * - Question Bank
 * - Workflow Queue
 */

import React, { useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Tabs, Tab, Box, Paper } from '@mui/material';
import { ROUTE_PATHS } from '../../routes/routePaths';

interface TopNavProps {
  // Reserved for future props
}

interface NavItem {
  label: string;
  path: string;
  value: string;
}

/**
 * TopNav renders the main navigation tabs
 * Active tab is highlighted based on current route
 */
export const TopNav: React.FC<TopNavProps> = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Define navigation items
  const navItems: NavItem[] = useMemo(
    () => [
      {
        label: 'Participant List',
        path: ROUTE_PATHS.PARTICIPANTS,
        value: 'participants',
      },
      {
        label: 'Question Bank',
        path: ROUTE_PATHS.QUESTION_BANK,
        value: 'question-bank',
      },
      {
        label: 'Workflow Queue',
        path: ROUTE_PATHS.WORKFLOW_QUEUE,
        value: 'workflow-queue',
      },
    ],
    []
  );

  /**
   * Determine current active tab based on route
   */
  const getCurrentTab = (): string => {
    const currentPath = location.pathname;

    if (currentPath.startsWith('/question-bank')) {
      return 'question-bank';
    } else if (currentPath.startsWith('/workflow-queue')) {
      return 'workflow-queue';
    } else if (currentPath.startsWith('/participants')) {
      return 'participants';
    }

    return 'participants';
  };

  /**
   * Handle tab change navigation
   */
  const handleTabChange = (_event: React.SyntheticEvent, newValue: string) => {
    const selectedItem = navItems.find((item) => item.value === newValue);
    if (selectedItem) {
      navigate(selectedItem.path);
    }
  };

  const currentTab = getCurrentTab();

  return (
    <Paper
      elevation={0}
      sx={{
        backgroundColor: 'white',
        borderBottom: '1px solid #e0e0e0',
      }}
    >
      <Box sx={{ px: 3 }}>
        <Tabs
          value={currentTab}
          onChange={handleTabChange}
          aria-label="Main navigation"
          TabIndicatorProps={{
            sx: {
              backgroundColor: '#1976d2',
              height: '4px',
            },
          }}
        >
          {navItems.map((item) => (
            <Tab
              key={item.value}
              label={item.label}
              value={item.value}
              sx={{
                textTransform: 'none',
                fontSize: '1rem',
                fontWeight: 500,
                color: '#666',
                '&.Mui-selected': {
                  color: '#1976d2',
                  fontWeight: 600,
                },
                '&:hover': {
                  backgroundColor: '#f5f5f5',
                },
              }}
            />
          ))}
        </Tabs>
      </Box>
    </Paper>
  );
};

export default TopNav;
