/**
 * Example Auth Component
 * Demonstrates how to use the useAuth hook and authentication system
 * This is a reference implementation - can be used as a login page
 */

import React, { useEffect, useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  CircularProgress,
  Alert,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  Container,
  Grid,
} from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import { useAuth, usePermissions } from '../hooks/useAuth';

/**
 * ExampleAuthComponent
 * Shows how to:
 * - Login a user
 * - Display user info
 * - Show permissions
 * - Check specific permissions
 * - Logout
 */
export const ExampleAuthComponent: React.FC = () => {
  const {
    isAuthenticated,
    user,
    permissions,
    loading,
    error,
    login,
    logout,
    getCurrentUser,
    hasPermission,
    clearError,
  } = useAuth();

  usePermissions(); // Available for permission checks if needed

  const [email, setEmail] = useState('developer@example.com');
  const [password, setPassword] = useState('password');

  useEffect(() => {
    // Try to get current user on mount if already authenticated
    if (isAuthenticated) {
      getCurrentUser();
    }
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    await login({ email, password });
  };

  const handleLogout = async () => {
    await logout();
  };

  if (loading && !isAuthenticated) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Grid container spacing={3}>
        {/* Login Card */}
        {!isAuthenticated && (
          <Grid item xs={12} md={6}>
            <Card sx={{ boxShadow: 2 }}>
              <CardContent>
                <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>
                  Login to System
                </Typography>

                {error && (
                  <Alert
                    severity="error"
                    onClose={clearError}
                    sx={{ mb: 2 }}
                  >
                    {error}
                  </Alert>
                )}

                <Box component="form" onSubmit={handleLogin} sx={{ mt: 2 }}>
                  <TextField
                    fullWidth
                    label="Email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    margin="normal"
                    placeholder="developer@example.com"
                  />

                  <TextField
                    fullWidth
                    label="Password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    margin="normal"
                    placeholder="password"
                  />

                  <Box sx={{ display: 'flex', gap: 2, mt: 3 }}>
                    <Button
                      type="submit"
                      variant="contained"
                      startIcon={<LoginIcon />}
                      disabled={loading}
                      sx={{
                        backgroundColor: '#4caf50',
                        '&:hover': {
                          backgroundColor: '#45a049',
                        },
                      }}
                    >
                      {loading ? 'Logging in...' : 'Login'}
                    </Button>
                  </Box>

                  <Alert severity="info" sx={{ mt: 2 }}>
                    <strong>Demo Credentials:</strong>
                    <br />
                    Email: developer@example.com
                    <br />
                    Password: password
                  </Alert>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        )}

        {/* User Info Card */}
        {isAuthenticated && user && (
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
                    {permissions?.roleName}
                  </Typography>
                </Box>

                <Button
                  variant="contained"
                  color="error"
                  startIcon={<LogoutIcon />}
                  onClick={handleLogout}
                  disabled={loading}
                  fullWidth
                >
                  {loading ? 'Logging out...' : 'Logout'}
                </Button>
              </CardContent>
            </Card>
          </Grid>
        )}

        {/* Permissions Table */}
        {isAuthenticated && permissions && (
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
        )}

        {/* Quick Permission Checks */}
        {isAuthenticated && (
          <Grid item xs={12}>
            <Card sx={{ boxShadow: 2, backgroundColor: '#fff3e0' }}>
              <CardContent>
                <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>
                  🎯 Quick Permission Checks
                </Typography>

                <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 600 }}>
                  Example of using hasPermission() utility:
                </Typography>

                <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 2 }}>
                  {[
                    'viewAllQuestions',
                    'createNewQuestion',
                    'editQuestion',
                    'viewParticipantInfo',
                    'createQuestionnaire',
                    'editEmail',
                  ].map((permission) => (
                    <Box
                      key={permission}
                      sx={{
                        p: 1.5,
                        backgroundColor: 'white',
                        borderRadius: '4px',
                        border: '1px solid #e0e0e0',
                      }}
                    >
                      <Typography variant="subtitle2">
                        {permission
                          .replace(/([A-Z])/g, ' $1')
                          .replace(/^./, (str) => str.toUpperCase())}
                      </Typography>
                      <Box
                        sx={{
                          mt: 1,
                          display: 'inline-block',
                          px: 1.5,
                          py: 0.5,
                          backgroundColor: hasPermission(
                            permission as keyof typeof permissions
                          )
                            ? '#e8f5e9'
                            : '#fce4ec',
                          color: hasPermission(
                            permission as keyof typeof permissions
                          )
                            ? '#2e7d32'
                            : '#c2185b',
                          borderRadius: '4px',
                          fontSize: '0.85rem',
                          fontWeight: 600,
                        }}
                      >
                        {hasPermission(
                          permission as keyof typeof permissions
                        )
                          ? '✓ Allowed'
                          : '✗ Denied'}
                      </Box>
                    </Box>
                  ))}
                </Box>

                <Alert severity="info" sx={{ mt: 3 }}>
                  <strong>Code Example:</strong>
                  <pre
                    style={{
                      backgroundColor: '#f5f5f5',
                      padding: '8px',
                      borderRadius: '4px',
                      fontSize: '12px',
                      marginTop: '8px',
                    }}
                  >
{`const { hasPermission } = useAuth();

if (hasPermission('createNewQuestion')) {
  // Show create button
}

if (hasPermission('editQuestion')) {
  // Show edit button
}`}
                  </pre>
                </Alert>
              </CardContent>
            </Card>
          </Grid>
        )}
      </Grid>
    </Container>
  );
};

export default ExampleAuthComponent;
