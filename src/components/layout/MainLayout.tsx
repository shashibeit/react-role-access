/**
 * MainLayout Component
 * Application shell containing top navigation and main content area
 * Used as wrapper for all routes
 */

import React from 'react';
import { Outlet } from 'react-router-dom';
import { Box, AppBar, Toolbar, Container, Paper } from '@mui/material';
import TopNav from './TopNav';

interface MainLayoutProps {
  // Reserved for future props if needed
}

/**
 * MainLayout serves as the root layout for the application
 * Handles:
 * - AppBar with branding
 * - TopNav for main navigation
 * - Main content area with Outlet for nested routes
 */
export const MainLayout: React.FC<MainLayoutProps> = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        backgroundColor: '#f5f5f5',
      }}
    >
      {/* Header / AppBar */}
      <AppBar position="static" sx={{ backgroundColor: '#1976d2' }}>
        <Toolbar>
          <Box sx={{ fontWeight: 'bold', fontSize: '1.25rem', color: 'white' }}>
            Questionnaire Generation System
          </Box>
        </Toolbar>
      </AppBar>

      {/* Top Navigation Menu */}
      <TopNav />

      {/* Main Content Area */}
      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <Container maxWidth="lg" sx={{ py: 3, flex: 1 }}>
          {/* TODO: Consider adding breadcrumb navigation here for deeper route context */}
          <Outlet />
        </Container>
      </Box>

      {/* Footer (optional) */}
      <Paper
        sx={{
          py: 2,
          px: 3,
          backgroundColor: '#f0f0f0',
          borderTop: '1px solid #e0e0e0',
          textAlign: 'center',
          color: '#666',
          fontSize: '0.875rem',
          marginTop: 'auto',
        }}
      >
        © 2026 Questionnaire Generation System. All rights reserved.
      </Paper>
    </Box>
  );
};

export default MainLayout;
