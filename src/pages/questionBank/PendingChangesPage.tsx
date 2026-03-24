/**
 * PendingChangesPage
 * Displays pending changes to questions that need approval or review
 * 
 * Features:
 * - View new proposed questions
 * - Side-by-side comparison of modified questions
 * - Field-level change highlighting
 * - Approve/Reject workflow with comments
 * - Status tracking and filtering
 */

import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Stack,
  Tabs,
  Tab,
  Alert,
  CircularProgress,
} from '@mui/material';
import QuestionBankTabs from '../../components/questionBank/QuestionBankTabs';
import PendingChangeCard from '../../components/questionBank/PendingChangeCard';
import {
  PendingQuestionChange,
  ChangeType,
} from '../../types/pendingChanges';
import { MOCK_PENDING_CHANGES } from '../../mocks/pendingChangesData';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

/**
 * TabPanel component for displaying tab content
 */
function TabPanel(props: TabPanelProps) {
  const { children, value, index } = props;

  return (
    <div hidden={value !== index}>
      {value === index && <Box sx={{ pt: 2 }}>{children}</Box>}
    </div>
  );
}

/**
 * PendingChangesPage displays all pending changes/modifications
 * Users can review and approve/reject changes with detailed comparison views
 */
export const PendingChangesPage: React.FC = () => {
  const [tabValue, setTabValue] = useState(0);
  const [pendingChanges, setPendingChanges] = useState<PendingQuestionChange[]>(MOCK_PENDING_CHANGES);
  const [loadingChangeId, setLoadingChangeId] = useState<string | null>(null);

  // Get changes by status
  const pendingOnlyChanges = pendingChanges.filter((c) => c.status === 'PENDING');
  const approvedChanges = pendingChanges.filter((c) => c.status === 'APPROVED');
  const rejectedChanges = pendingChanges.filter((c) => c.status === 'REJECTED');

  // Handle tab change
  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  // Handle approve action
  const handleApprove = (changeId: string, notes?: string) => {
    setLoadingChangeId(changeId);

    // Simulate API delay
    setTimeout(() => {
      setPendingChanges((prevChanges) =>
        prevChanges.map((change) =>
          change.changeId === changeId
            ? {
                ...change,
                status: 'APPROVED',
                approvalNotes: notes || 'Approved',
              }
            : change
        )
      );
      setLoadingChangeId(null);
    }, 500);
  };

  // Handle reject action
  const handleReject = (changeId: string, reason?: string) => {
    setLoadingChangeId(changeId);

    // Simulate API delay
    setTimeout(() => {
      setPendingChanges((prevChanges) =>
        prevChanges.map((change) =>
          change.changeId === changeId
            ? {
                ...change,
                status: 'REJECTED',
                approvalNotes: reason || 'Rejected',
              }
            : change
        )
      );
      setLoadingChangeId(null);
    }, 500);
  };

  // Count by change type
  const newQuestionsCount = pendingOnlyChanges.filter(
    (c) => c.changeType === ChangeType.NEW
  ).length;
  const modifiedQuestionsCount = pendingOnlyChanges.filter(
    (c) => c.changeType === ChangeType.MODIFIED
  ).length;

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
          Pending Changes Review
        </Typography>
      </Box>

      {/* Status Summary Cards */}
      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 2 }}>
        <Card sx={{ boxShadow: 1 }}>
          <CardContent sx={{ textAlign: 'center', pb: '16px !important' }}>
            <Typography color="textSecondary" gutterBottom variant="body2">
              Pending Changes
            </Typography>
            <Typography variant="h4" sx={{ fontWeight: 600, color: '#ff9800' }}>
              {pendingOnlyChanges.length}
            </Typography>
          </CardContent>
        </Card>

        <Card sx={{ boxShadow: 1 }}>
          <CardContent sx={{ textAlign: 'center', pb: '16px !important' }}>
            <Typography color="textSecondary" gutterBottom variant="body2">
              New Questions
            </Typography>
            <Typography variant="h4" sx={{ fontWeight: 600, color: '#4caf50' }}>
              {newQuestionsCount}
            </Typography>
          </CardContent>
        </Card>

        <Card sx={{ boxShadow: 1 }}>
          <CardContent sx={{ textAlign: 'center', pb: '16px !important' }}>
            <Typography color="textSecondary" gutterBottom variant="body2">
              Modified Questions
            </Typography>
            <Typography variant="h4" sx={{ fontWeight: 600, color: '#1976d2' }}>
              {modifiedQuestionsCount}
            </Typography>
          </CardContent>
        </Card>

        <Card sx={{ boxShadow: 1 }}>
          <CardContent sx={{ textAlign: 'center', pb: '16px !important' }}>
            <Typography color="textSecondary" gutterBottom variant="body2">
              Approved
            </Typography>
            <Typography variant="h4" sx={{ fontWeight: 600, color: '#66bb6a' }}>
              {approvedChanges.length}
            </Typography>
          </CardContent>
        </Card>
      </Box>

      {/* Tab Navigation */}
      <Card sx={{ boxShadow: 1 }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={tabValue} onChange={handleTabChange} aria-label="pending changes tabs">
            <Tab label={`Pending (${pendingOnlyChanges.length})`} />
            <Tab label={`Approved (${approvedChanges.length})`} />
            <Tab label={`Rejected (${rejectedChanges.length})`} />
          </Tabs>
        </Box>

        {/* Pending Changes Tab */}
        <TabPanel value={tabValue} index={0}>
          {pendingOnlyChanges.length === 0 ? (
            <Box sx={{ py: 4, textAlign: 'center' }}>
              <Typography color="textSecondary">
                No pending changes at the moment
              </Typography>
            </Box>
          ) : (
            <Stack spacing={2} sx={{ p: 2 }}>
              {pendingOnlyChanges.map((change) => (
                <Box key={change.changeId} sx={{ position: 'relative' }}>
                  {loadingChangeId === change.changeId && (
                    <Box
                      sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: 'rgba(255, 255, 255, 0.7)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        zIndex: 1,
                        borderRadius: 1,
                      }}
                    >
                      <CircularProgress size={40} />
                    </Box>
                  )}
                  <PendingChangeCard
                    change={change}
                    onApprove={handleApprove}
                    onReject={handleReject}
                  />
                </Box>
              ))}
            </Stack>
          )}
        </TabPanel>

        {/* Approved Changes Tab */}
        <TabPanel value={tabValue} index={1}>
          {approvedChanges.length === 0 ? (
            <Box sx={{ py: 4, textAlign: 'center' }}>
              <Typography color="textSecondary">
                No approved changes yet
              </Typography>
            </Box>
          ) : (
            <Stack spacing={2} sx={{ p: 2 }}>
              {approvedChanges.map((change) => (
                <PendingChangeCard key={change.changeId} change={change} />
              ))}
            </Stack>
          )}
        </TabPanel>

        {/* Rejected Changes Tab */}
        <TabPanel value={tabValue} index={2}>
          {rejectedChanges.length === 0 ? (
            <Box sx={{ py: 4, textAlign: 'center' }}>
              <Typography color="textSecondary">
                No rejected changes
              </Typography>
            </Box>
          ) : (
            <Stack spacing={2} sx={{ p: 2 }}>
              {rejectedChanges.map((change) => (
                <PendingChangeCard key={change.changeId} change={change} />
              ))}
            </Stack>
          )}
        </TabPanel>
      </Card>

      {/* Info Card */}
      <Alert severity="info">
        <Typography variant="body2" sx={{ fontWeight: 500 }}>
          Review Pending Changes. Click on each card to expand and review details, compare versions, and approve or reject.
        </Typography>
      </Alert>
    </Box>
  );
};

export default PendingChangesPage;
