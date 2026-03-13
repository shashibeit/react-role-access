/**
 * WorkflowQueuePage
 * Displays the workflow queue and task management
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
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';

interface WorkflowQueuePageProps {
  // Reserved for future props
}

interface WorkflowTask {
  id: number;
  name: string;
  status: 'Pending' | 'Running' | 'Completed' | 'Failed';
  createdDate: string;
  progress: number;
}

/**
 * WorkflowQueuePage displays all workflow tasks and their status
 * Allows starting, pausing, and monitoring workflows
 */
export const WorkflowQueuePage: React.FC<WorkflowQueuePageProps> = () => {
  // TODO: Implement WebSocket connection for real-time updates
  // TODO: Add workflow execution monitoring dashboard
  // TODO: Implement workflow state machine
  // TODO: Add retry mechanism for failed workflows
  // TODO: Add workflow history and logs
  // TODO: Implement bulk workflow operations
  // TODO: Add workflow templates

  const mockWorkflows: WorkflowTask[] = [
    {
      id: 1,
      name: 'Question Validation Workflow',
      status: 'Running',
      createdDate: '2026-03-11 10:30 AM',
      progress: 65,
    },
    {
      id: 2,
      name: 'Participant Assignment Workflow',
      status: 'Pending',
      createdDate: '2026-03-11 09:15 AM',
      progress: 0,
    },
    {
      id: 3,
      name: 'Report Generation Workflow',
      status: 'Completed',
      createdDate: '2026-03-10 02:00 PM',
      progress: 100,
    },
    {
      id: 4,
      name: 'Data Import Workflow',
      status: 'Failed',
      createdDate: '2026-03-10 11:00 AM',
      progress: 45,
    },
  ];

  const handleStartWorkflow = (taskId: number): void => {
    // TODO: Implement start workflow logic with API call
    console.log(`Start workflow ${taskId}`);
  };

  const handlePauseWorkflow = (taskId: number): void => {
    // TODO: Implement pause workflow logic with API call
    console.log(`Pause workflow ${taskId}`);
  };

  const handleRetryWorkflow = (taskId: number): void => {
    // TODO: Implement retry workflow logic
    console.log(`Retry workflow ${taskId}`);
  };

  const getStatusColor = (
    status: 'Pending' | 'Running' | 'Completed' | 'Failed'
  ): 'default' | 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success' => {
    switch (status) {
      case 'Pending':
        return 'warning';
      case 'Running':
        return 'info';
      case 'Completed':
        return 'success';
      case 'Failed':
        return 'error';
      default:
        return 'default';
    }
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
          Workflow Queue
        </Typography>
        <Button variant="contained" sx={{ backgroundColor: '#1976d2' }}>
          New Workflow
        </Button>
      </Box>

      {/* Status Summary Cards */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: 2,
        }}
      >
        <Card sx={{ boxShadow: 1 }}>
          <CardContent sx={{ textAlign: 'center' }}>
            <Typography color="textSecondary" gutterBottom>
              Total Workflows
            </Typography>
            <Typography variant="h4" sx={{ fontWeight: 600 }}>
              {mockWorkflows.length}
            </Typography>
          </CardContent>
        </Card>
        <Card sx={{ boxShadow: 1 }}>
          <CardContent sx={{ textAlign: 'center' }}>
            <Typography color="textSecondary" gutterBottom>
              Running
            </Typography>
            <Typography variant="h4" sx={{ fontWeight: 600, color: '#1976d2' }}>
              {mockWorkflows.filter((w) => w.status === 'Running').length}
            </Typography>
          </CardContent>
        </Card>
        <Card sx={{ boxShadow: 1 }}>
          <CardContent sx={{ textAlign: 'center' }}>
            <Typography color="textSecondary" gutterBottom>
              Pending
            </Typography>
            <Typography variant="h4" sx={{ fontWeight: 600, color: '#ff9800' }}>
              {mockWorkflows.filter((w) => w.status === 'Pending').length}
            </Typography>
          </CardContent>
        </Card>
        <Card sx={{ boxShadow: 1 }}>
          <CardContent sx={{ textAlign: 'center' }}>
            <Typography color="textSecondary" gutterBottom>
              Failed
            </Typography>
            <Typography variant="h4" sx={{ fontWeight: 600, color: '#f44336' }}>
              {mockWorkflows.filter((w) => w.status === 'Failed').length}
            </Typography>
          </CardContent>
        </Card>
      </Box>

      {/* Workflow Table */}
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
                  <TableCell sx={{ fontWeight: 600 }}>Workflow Name</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Status</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Progress</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Created</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {mockWorkflows.map((workflow) => (
                  <TableRow
                    key={workflow.id}
                    sx={{
                      '&:hover': {
                        backgroundColor: '#f9f9f9',
                      },
                    }}
                  >
                    <TableCell>{workflow.id}</TableCell>
                    <TableCell sx={{ fontWeight: 500 }}>
                      {workflow.name}
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={workflow.status}
                        color={getStatusColor(workflow.status)}
                        size="small"
                        variant="outlined"
                      />
                    </TableCell>
                    <TableCell>
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 1,
                        }}
                      >
                        <Box
                          sx={{
                            width: '60px',
                            height: '6px',
                            backgroundColor: '#e0e0e0',
                            borderRadius: '3px',
                            overflow: 'hidden',
                          }}
                        >
                          <Box
                            sx={{
                              width: `${workflow.progress}%`,
                              height: '100%',
                              backgroundColor:
                                workflow.progress === 100
                                  ? '#4caf50'
                                  : '#1976d2',
                              transition: 'width 0.3s ease',
                            }}
                          />
                        </Box>
                        <Typography variant="caption" sx={{ minWidth: '35px' }}>
                          {workflow.progress}%
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>{workflow.createdDate}</TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        {workflow.status === 'Pending' && (
                          <Button
                            size="small"
                            variant="text"
                            startIcon={<PlayArrowIcon />}
                            onClick={() => handleStartWorkflow(workflow.id)}
                            sx={{ color: '#4caf50' }}
                          >
                            Start
                          </Button>
                        )}
                        {workflow.status === 'Running' && (
                          <Button
                            size="small"
                            variant="text"
                            startIcon={<PauseIcon />}
                            onClick={() => handlePauseWorkflow(workflow.id)}
                            sx={{ color: '#ff9800' }}
                          >
                            Pause
                          </Button>
                        )}
                        {workflow.status === 'Failed' && (
                          <Button
                            size="small"
                            variant="text"
                            onClick={() => handleRetryWorkflow(workflow.id)}
                            sx={{ color: '#1976d2' }}
                          >
                            Retry
                          </Button>
                        )}
                        <Button size="small" variant="text">
                          View
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
            ℹ️ Workflow Management
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Monitor and manage all workflow execution tasks here. Click "View" to
            see detailed logs and execution details.
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default WorkflowQueuePage;
