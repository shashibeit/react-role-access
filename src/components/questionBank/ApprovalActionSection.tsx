/**
 * ApprovalActionSection Component
 * Section for approving or rejecting a pending change
 * Includes comment/reason field and action buttons
 */

import React, { useState } from 'react';
import {
  Box,
  Button,
  TextField,
  Stack,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';

interface ApprovalActionSectionProps {
  /**
   * The ID of the pending change
   */
  changeId: string;

  /**
   * Callback when user approves
   */
  onApprove?: (changeId: string, notes?: string) => void;

  /**
   * Callback when user rejects
   */
  onReject?: (changeId: string, reason?: string) => void;

  /**
   * Optional CSS classes for styling
   */
  className?: string;
}

/**
 * ApprovalActionSection allows users to approve or reject pending changes
 */
export const ApprovalActionSection: React.FC<ApprovalActionSectionProps> = ({
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
        {/* Notes/Comments Field */}
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

        {/* Action Buttons */}
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

      {/* Rejection Confirmation Dialog */}
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

export default ApprovalActionSection;
