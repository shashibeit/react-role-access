/**
 * PendingChangesPage
 * Displays pending changes to questions that need approval or review
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
  Chip,
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import QuestionBankTabs from '../../components/questionBank/QuestionBankTabs';

interface QuestionBankTabsProps {
  // Reserved for future props
}

interface PendingChange {
  id: number;
  questionId: number;
  title: string;
  changeType: 'Modified' | 'Deleted' | 'Added';
  changedBy: string;
  changedDate: string;
}

/**
 * PendingChangesPage displays all pending changes/modifications
 * Users can review and approve/reject changes
 */
export const PendingChangesPage: React.FC<QuestionBankTabsProps> = () => {
  // TODO: Replace with actual API integration
  // TODO: Implement approval workflow
  // TODO: Add difference/comparison view for modified questions
  // TODO: Add bulk approve/reject functionality
  // TODO: Add filters by change type and status
  // TODO: Integrate with state management for change tracking

  const mockPendingChanges: PendingChange[] = [
    {
      id: 1,
      questionId: 1,
      title: 'What is React? (Updated)',
      changeType: 'Modified',
      changedBy: 'John Doe',
      changedDate: '2026-03-09',
    },
    {
      id: 2,
      questionId: 5,
      title: 'New Question: Vue.js Basics',
      changeType: 'Added',
      changedBy: 'Jane Smith',
      changedDate: '2026-03-10',
    },
    {
      id: 3,
      questionId: 3,
      title: 'TypeScript generics explained',
      changeType: 'Deleted',
      changedBy: 'Bob Johnson',
      changedDate: '2026-03-08',
    },
  ];

  const handleApprove = (changeId: number): void => {
    // TODO: Implement approve functionality with API call
    console.log(`Approve change ${changeId}`);
  };

  const handleReject = (changeId: number): void => {
    // TODO: Implement reject functionality with confirmation dialog
    console.log(`Reject change ${changeId}`);
  };

  const getChangeTypeColor = (
    changeType: 'Modified' | 'Deleted' | 'Added'
  ): 'default' | 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success' => {
    switch (changeType) {
      case 'Added':
        return 'success';
      case 'Modified':
        return 'info';
      case 'Deleted':
        return 'error';
      default:
        return 'default';
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      {/* Secondary Navigation Tabs */}
      <QuestionBankTabs />

      {/* Page Header */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Typography variant="h4" component="h1" sx={{ fontWeight: 600 }}>
          Pending Changes
        </Typography>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button
            variant="outlined"
            color="error"
            onClick={() => console.log('Reject all')}
          >
            Reject All
          </Button>
          <Button
            variant="contained"
            sx={{
              backgroundColor: '#4caf50',
              '&:hover': {
                backgroundColor: '#45a049',
              },
            }}
            onClick={() => console.log('Approve all')}
          >
            Approve All
          </Button>
        </Box>
      </Box>

      {/* Status Summary Cards */}
      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 2 }}>
        <Card sx={{ boxShadow: 1 }}>
          <CardContent sx={{ textAlign: 'center' }}>
            <Typography color="textSecondary" gutterBottom>
              Total Pending
            </Typography>
            <Typography variant="h4" sx={{ fontWeight: 600 }}>
              {mockPendingChanges.length}
            </Typography>
          </CardContent>
        </Card>
        <Card sx={{ boxShadow: 1 }}>
          <CardContent sx={{ textAlign: 'center' }}>
            <Typography color="textSecondary" gutterBottom>
              Modifications
            </Typography>
            <Typography variant="h4" sx={{ fontWeight: 600, color: '#1976d2' }}>
              {mockPendingChanges.filter((c) => c.changeType === 'Modified')
                .length}
            </Typography>
          </CardContent>
        </Card>
        <Card sx={{ boxShadow: 1 }}>
          <CardContent sx={{ textAlign: 'center' }}>
            <Typography color="textSecondary" gutterBottom>
              New Questions
            </Typography>
            <Typography variant="h4" sx={{ fontWeight: 600, color: '#4caf50' }}>
              {mockPendingChanges.filter((c) => c.changeType === 'Added').length}
            </Typography>
          </CardContent>
        </Card>
      </Box>

      {/* Pending Changes Table */}
      <Card sx={{ boxShadow: 1 }}>
        <CardContent sx={{ p: 0 }}>
          <TableContainer component={Paper} elevation={0}>
            <Table
              sx={{
                minWidth: 700,
                '& .MuiTableHead-root': {
                  backgroundColor: '#f5f5f5',
                },
              }}
            >
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: 600 }}>ID</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Title</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Type</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Changed By</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Date</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {mockPendingChanges.map((change) => (
                  <TableRow
                    key={change.id}
                    sx={{
                      '&:hover': {
                        backgroundColor: '#f9f9f9',
                      },
                    }}
                  >
                    <TableCell>{change.id}</TableCell>
                    <TableCell>{change.title}</TableCell>
                    <TableCell>
                      <Chip
                        label={change.changeType}
                        color={getChangeTypeColor(change.changeType)}
                        size="small"
                        variant="outlined"
                      />
                    </TableCell>
                    <TableCell>{change.changedBy}</TableCell>
                    <TableCell>{change.changedDate}</TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        <Button
                          size="small"
                          variant="text"
                          startIcon={<CheckCircleIcon />}
                          onClick={() => handleApprove(change.id)}
                          sx={{ color: '#4caf50' }}
                        >
                          Approve
                        </Button>
                        <Button
                          size="small"
                          variant="text"
                          startIcon={<CancelIcon />}
                          onClick={() => handleReject(change.id)}
                          sx={{ color: '#f44336' }}
                        >
                          Reject
                        </Button>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>

      {/* Info Card */}
      <Card sx={{ backgroundColor: '#e3f2fd', border: 'none', boxShadow: 0 }}>
        <CardContent>
          <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
            ℹ️ Pending Changes Review
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Review and approve/reject pending changes to questions. This helps
            maintain quality control over the question bank.
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default PendingChangesPage;
