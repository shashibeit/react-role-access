/**
 * ParticipantListPage
 * Displays the list of participants in the system
 */

import React from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

interface ParticipantListPageProps {
  // Reserved for future props
}

/**
 * ParticipantListPage renders the participant list view
 * Placeholder UI with mock data structure for future DataGrid integration
 */
export const ParticipantListPage: React.FC<ParticipantListPageProps> = () => {
  // TODO: Replace with actual API integration
  // TODO: Integrate with DataGrid component for better table management
  // TODO: Add filtering, sorting, and pagination
  // TODO: Add state management (Redux/Zustand) for participant data

  const mockParticipants = [
    {
      id: 1,
      name: 'John Doe',
      email: 'john.doe@example.com',
      status: 'Active',
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane.smith@example.com',
      status: 'Active',
    },
    {
      id: 3,
      name: 'Bob Johnson',
      email: 'bob.johnson@example.com',
      status: 'Inactive',
    },
  ];

  const handleAddParticipant = (): void => {
    // TODO: Implement add participant logic
    console.log('Add participant clicked');
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      {/* Page Header */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Typography variant="h4" component="h1" sx={{ fontWeight: 600 }}>
          Participant List
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleAddParticipant}
          sx={{
            backgroundColor: '#1976d2',
            '&:hover': {
              backgroundColor: '#1565c0',
            },
          }}
        >
          Add Participant
        </Button>
      </Box>

      {/* Participants Table Card */}
      <Card sx={{ boxShadow: 1 }}>
        <CardContent sx={{ p: 0 }}>
          <TableContainer component={Paper} elevation={0}>
            <Table
              sx={{
                minWidth: 650,
                '& .MuiTableHead-root': {
                  backgroundColor: '#f5f5f5',
                },
              }}
            >
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: 600 }}>ID</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Name</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Email</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Status</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {mockParticipants.map((participant) => (
                  <TableRow
                    key={participant.id}
                    sx={{
                      '&:hover': {
                        backgroundColor: '#f9f9f9',
                      },
                    }}
                  >
                    <TableCell>{participant.id}</TableCell>
                    <TableCell>{participant.name}</TableCell>
                    <TableCell>{participant.email}</TableCell>
                    <TableCell>
                      <Box
                        sx={{
                          display: 'inline-block',
                          px: 1.5,
                          py: 0.5,
                          backgroundColor:
                            participant.status === 'Active'
                              ? '#e8f5e9'
                              : '#fce4ec',
                          color:
                            participant.status === 'Active'
                              ? '#2e7d32'
                              : '#c2185b',
                          borderRadius: '4px',
                          fontSize: '0.85rem',
                          fontWeight: 600,
                        }}
                      >
                        {participant.status}
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Button size="small" variant="text">
                        Edit
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>

      {/* Info Card - Placeholder for future features */}
      <Card sx={{ backgroundColor: '#e3f2fd', border: 'none', boxShadow: 0 }}>
        <CardContent>
          <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
            💡 Tip
          </Typography>
          <Typography variant="body2" color="textSecondary">
            This is a placeholder participant list. Features like batch operations,
            advanced filtering, and export functionality will be added in future
            iterations.
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default ParticipantListPage;
