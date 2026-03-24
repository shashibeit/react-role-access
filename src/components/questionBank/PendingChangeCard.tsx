/**
 * PendingChangeCard Component
 * Expandable card component for displaying a single pending change
 * Shows header with summary and content area with full comparison or read-only view
 */

import React, { useState } from 'react';
import {
  Card,
  CardHeader,
  CardContent,
  Collapse,
  Box,
  Stack,
  Chip,
  Typography,
  IconButton,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import { styled } from '@mui/material/styles';
import { PendingQuestionChange, ChangeType } from '../../types/pendingChanges';
import QuestionReadOnlyView from './QuestionReadOnlyView';
import QuestionComparisonView from './QuestionComparisonView';

/**
 * ApprovalActionSection Component
 * Inlined here to avoid module resolution issues
 */
interface ApprovalActionSectionProps {
  changeId: string;
  onApprove?: (changeId: string, notes?: string) => void;
  onReject?: (changeId: string, reason?: string) => void;
  className?: string;
}

const ApprovalActionSection: React.FC<ApprovalActionSectionProps> = ({
  changeId,
  onApprove,
  onReject,
  className,
}) => {
  const [notes, setNotes] = useState('');
  const [rejectDialogOpen, setRejectDialogOpen] = useState(false);
  const [rejectionReason, setRejectionReason] = useState('');

  const handleApproveClick = () => {
    onApprove?.(changeId, notes || undefined);
  };

  const handleRejectClick = () => {
    setRejectDialogOpen(true);
  };

  const handleRejectConfirm = () => {
    onReject?.(changeId, rejectionReason || undefined);
    setRejectDialogOpen(false);
    setRejectionReason('');
  };

  const handleRejectCancel = () => {
    setRejectDialogOpen(false);
    setRejectionReason('');
  };

  return (
    <Box
      sx={{
        p: 2,
        backgroundColor: '#fafafa',
        borderRadius: 1,
        border: '1px solid #e0e0e0',
        mt: 2,
      }}
      className={className}
    >
      <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1.5 }}>
        Approval Actions
      </Typography>

      <Stack spacing={1.5}>
        <TextField
          fullWidth
          multiline
          rows={2}
          placeholder="Add optional comments or notes for approval..."
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          size="small"
          variant="outlined"
        />

        <Stack direction="row" spacing={1.5}>
          <Button
            variant="contained"
            color="success"
            startIcon={<CheckCircleIcon />}
            onClick={handleApproveClick}
          >
            Approve
          </Button>
          <Button
            variant="outlined"
            color="error"
            startIcon={<CancelIcon />}
            onClick={handleRejectClick}
          >
            Reject
          </Button>
        </Stack>
      </Stack>

      <Dialog
        open={rejectDialogOpen}
        onClose={handleRejectCancel}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Reject Change</DialogTitle>
        <DialogContent sx={{ pt: 2 }}>
          <Typography variant="body2" sx={{ mb: 2 }}>
            Please provide a reason for rejecting this change. This reason will be visible to the requester.
          </Typography>
          <TextField
            fullWidth
            multiline
            rows={3}
            placeholder="Reason for rejection..."
            value={rejectionReason}
            onChange={(e) => setRejectionReason(e.target.value)}
            variant="outlined"
            required
          />
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={handleRejectCancel} variant="outlined">
            Cancel
          </Button>
          <Button
            onClick={handleRejectConfirm}
            variant="contained"
            color="error"
            disabled={!rejectionReason.trim()}
          >
            Confirm Rejection
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

interface PendingChangeCardProps {
  /**
   * The pending change to display
   */
  change: PendingQuestionChange;

  /**
   * Callback when user approves the change
   */
  onApprove?: (changeId: string, notes?: string) => void;

  /**
   * Callback when user rejects the change
   */
  onReject?: (changeId: string, reason?: string) => void;

  /**
   * Optional CSS classes for styling
   */
  className?: string;
}

/**
 * Styled expand button for card
 */
const ExpandMore = styled(IconButton, {
  shouldForwardProp: (prop: string) => prop !== 'expand',
})<{ expand: boolean }>(({ theme, expand }: any) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

/**
 * Get color for change type chip
 */
const getChangeTypeColor = (
  changeType: ChangeType
): 'default' | 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success' => {
  switch (changeType) {
    case ChangeType.NEW:
      return 'success';
    case ChangeType.MODIFIED:
      return 'info';
    default:
      return 'default';
  }
};

/**
 * Get label for change type
 */
const getChangeTypeLabel = (changeType: ChangeType): string => {
  switch (changeType) {
    case ChangeType.NEW:
      return 'New Question';
    case ChangeType.MODIFIED:
      return 'Modified Question';
    default:
      return 'Unknown';
  }
};

/**
 * Get color for status chip
 */
const getStatusColor = (
  status: 'PENDING' | 'APPROVED' | 'REJECTED'
): 'default' | 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success' => {
  switch (status) {
    case 'PENDING':
      return 'warning';
    case 'APPROVED':
      return 'success';
    case 'REJECTED':
      return 'error';
    default:
      return 'default';
  }
};

/**
 * PendingChangeCard displays a single pending change with expand/collapse functionality
 */
export const PendingChangeCard: React.FC<PendingChangeCardProps> = ({
  change,
  onApprove,
  onReject,
  className,
}) => {
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const isNewChange = change.changeType === ChangeType.NEW;

  return (
    <Card
      sx={{
        boxShadow: 1,
        transition: 'box-shadow 0.3s',
        '&:hover': {
          boxShadow: 2,
        },
      }}
      className={className}
    >
      <CardHeader
        avatar={
          <Stack direction="row" spacing={1}>
            <Chip
              label={getChangeTypeLabel(change.changeType)}
              size="small"
              color={getChangeTypeColor(change.changeType)}
              variant="outlined"
            />
            <Chip
              label={change.status}
              size="small"
              color={getStatusColor(change.status)}
              variant="filled"
            />
          </Stack>
        }
        title={
          <Stack spacing={0.5}>
            <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
              {isNewChange ? change.proposed.questionText : 'Question Modified'}
            </Typography>
            <Typography variant="caption" sx={{ color: 'textSecondary' }}>
              Changed by {change.changedBy} on {change.changedDate}
            </Typography>
          </Stack>
        }
        action={
          <ExpandMore 
            expand={expanded} 
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
            sx={{ cursor: 'pointer' }}
          />
        }
        onClick={handleExpandClick}
        sx={{
          backgroundColor: expanded ? '#fafafa' : 'transparent',
          transition: 'background-color 0.2s',
          cursor: 'pointer',
          '&:hover': {
            backgroundColor: expanded ? '#f0f0f0' : '#f9f9f9',
          },
        }}
      />

      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent sx={{ pt: 0 }}>
          {/* Render comparison view or read-only view based on change type */}
          {isNewChange ? (
            <QuestionReadOnlyView
              question={change.proposed}
              title="Proposed Question"
            />
          ) : (
            change.previous && (
              <QuestionComparisonView
                previous={change.previous}
                proposed={change.proposed}
              />
            )
          )}

          {/* Change comments if available */}
          {change.comments && (
            <Box sx={{ my: 2, p: 2, backgroundColor: '#f5f5f5', borderRadius: 1 }}>
              <Typography variant="caption" sx={{ color: 'textSecondary', fontWeight: 500 }}>
                Change Comments
              </Typography>
              <Typography variant="body2" sx={{ mt: 0.5, color: '#333' }}>
                {change.comments}
              </Typography>
            </Box>
          )}

          {/* Approval actions (only show if status is PENDING) */}
          {change.status === 'PENDING' && (
            <ApprovalActionSection
              changeId={change.changeId}
              onApprove={onApprove}
              onReject={onReject}
            />
          )}

          {/* Approval notes if already approved/rejected */}
          {change.status !== 'PENDING' && change.approvalNotes && (
            <Box sx={{ mt: 2, p: 2, backgroundColor: '#f5f5f5', borderRadius: 1 }}>
              <Typography variant="caption" sx={{ color: 'textSecondary', fontWeight: 500 }}>
                {change.status === 'APPROVED' ? 'Approval Notes' : 'Rejection Reason'}
              </Typography>
              <Typography variant="body2" sx={{ mt: 0.5, color: '#333' }}>
                {change.approvalNotes}
              </Typography>
            </Box>
          )}
        </CardContent>
      </Collapse>
    </Card>
  );
};

export default PendingChangeCard;
