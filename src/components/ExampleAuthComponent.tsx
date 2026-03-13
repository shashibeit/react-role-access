/**
 * Example Auth Component
 * Demonstrates how to use the useAuth hook
 * Shows user info and permissions with built-in mock authentication
 */

import React from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  Container,
  Grid,
} from '@mui/material';
import { useAuth } from '../hooks/useAuth';

/**
 * ExampleAuthComponent
 * Shows how to:
 * - Display user info
 * - Show permissions
 * - Check specific permissions
 */
export const ExampleAuthComponent: React.FC = () => {
  const {
    isAuthenticated,
    user,
    permissions,
  } = useAuth();

  if (!isAuthenticated || !user || !permissions) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography variant="h6" color="error">
          User not authenticated
        </Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Grid container spacing={3}>
        {/* User Info Card */}
        <Grid item xs={12} md={6}>
          <Card sx={{ boxShadow: 2, backgroundColor: '#e1f5fe' }}>
            <CardContent>
              <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>
                👤 User Information
              </Typography>

              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                  Name:
                </Typography>
                <Typography variant="body2">{user.name}</Typography>
              </Box>

              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                  Email:
                </Typography>
                <Typography variant="body2">{user.email}</Typography>
              </Box>

              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                  User ID:
                </Typography>
                <Typography variant="body2">{user.id}</Typography>
              </Box>

              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                  Role:
                </Typography>
                <Typography variant="body2">
                  {permissions.roleName}
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Permissions Table */}
        <Grid item xs={12}>
          <Card sx={{ boxShadow: 2 }}>
            <CardContent>
              <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>
                🔐 User Permissions
              </Typography>

              <Paper elevation={0}>
                <Table sx={{ minWidth: 650 }}>
                  <TableHead>
                    <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                      <TableCell sx={{ fontWeight: 600 }}>
                        Permission
                      </TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>Status</TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>
                        Has Access
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {Object.entries(permissions).map(([key, value]) => (
                      <TableRow
                        key={key}
                        sx={{
                          '&:hover': {
                            backgroundColor: '#f9f9f9',
                          },
                        }}
                      >
                        <TableCell>
                          <Typography variant="body2">
                            {key
                              .replace(/([A-Z])/g, ' $1')
                              .replace(/^./, (str) => str.toUpperCase())}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          {value === null ? (
                            <Typography
                              variant="body2"
                              sx={{ color: '#999' }}
                            >
                              N/A
                            </Typography>
                          ) : (
                            <Typography variant="body2">{value}</Typography>
                          )}
                        </TableCell>
                        <TableCell>
                          {value === null ? (
                            <Typography
                              variant="body2"
                              sx={{ color: '#999' }}
                            >
                              —
                            </Typography>
                          ) : value === 'true' ? (
                            <Box
                              sx={{
                                display: 'inline-block',
                                px: 1.5,
                                py: 0.5,
                                backgroundColor: '#e8f5e9',
                                color: '#2e7d32',
                                borderRadius: '4px',
                                fontSize: '0.85rem',
                                fontWeight: 600,
                              }}
                            >
                              ✓ Allowed
                            </Box>
                          ) : (
                            <Box
                              sx={{
                                display: 'inline-block',
                                px: 1.5,
                                py: 0.5,
                                backgroundColor: '#fce4ec',
                                color: '#c2185b',
                                borderRadius: '4px',
                                fontSize: '0.85rem',
                                fontWeight: 600,
                              }}
                            >
                              ✗ Denied
                            </Box>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Paper>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ExampleAuthComponent;
