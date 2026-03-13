/**
 * QuestionListPage
 * Displays the list of questions in the question bank
 * Includes secondary tabs for Question Bank navigation
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
import { useNavigate } from 'react-router-dom';
import QuestionBankTabs from '../../components/questionBank/QuestionBankTabs';
import { ROUTE_PATHS } from '../../routes/routePaths';
import { useAuth } from '../../hooks/useAuth';

interface QuestionListPageProps {
  // Reserved for future props
}

/**
 * QuestionListPage displays all questions in the question bank
 * Users can create new questions or manage existing ones
 */
export const QuestionListPage: React.FC<QuestionListPageProps> = () => {
  const navigate = useNavigate();
  const { hasPermission } = useAuth();

  // TODO: Replace with actual API integration for fetching questions
  // TODO: Integrate with DataGrid for better table management
  // TODO: Add filtering by category, difficulty, status
  // TODO: Add search functionality
  // TODO: Add bulk operations (delete, export, etc.)
  // TODO: Add pagination and sorting

  const mockQuestions = [
    {
      id: 1,
      title: 'What is React?',
      category: 'Frontend',
      difficulty: 'Beginner',
      status: 'Published',
    },
    {
      id: 2,
      title: 'Explain state management patterns',
      category: 'Frontend',
      difficulty: 'Intermediate',
      status: 'Draft',
    },
    {
      id: 3,
      title: 'TypeScript generics explained',
      category: 'TypeScript',
      difficulty: 'Advanced',
      status: 'Published',
    },
  ];

  const handleCreateNewQuestion = (): void => {
    // Navigate to create question page
    navigate(ROUTE_PATHS.QUESTION_BANK_CREATE);
  };

  const handleEditQuestion = (questionId: number): void => {
    // TODO: Implement edit functionality
    console.log(`Edit question ${questionId}`);
  };

  const handleDeleteQuestion = (questionId: number): void => {
    // TODO: Implement delete functionality with confirmation dialog
    console.log(`Delete question ${questionId}`);
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
          Question List
        </Typography>
        {hasPermission('createNewQuestion') && (
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleCreateNewQuestion}
            sx={{
              backgroundColor: '#1976d2',
              '&:hover': {
                backgroundColor: '#1565c0',
              },
            }}
          >
            Create New Question
          </Button>
        )}
      </Box>

      {/* Questions Table Card */}
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
                  <TableCell sx={{ fontWeight: 600 }}>Category</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Difficulty</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Status</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {mockQuestions.map((question) => (
                  <TableRow
                    key={question.id}
                    sx={{
                      '&:hover': {
                        backgroundColor: '#f9f9f9',
                      },
                    }}
                  >
                    <TableCell>{question.id}</TableCell>
                    <TableCell>{question.title}</TableCell>
                    <TableCell>{question.category}</TableCell>
                    <TableCell>
                      <Box
                        sx={{
                          display: 'inline-block',
                          px: 1.5,
                          py: 0.5,
                          backgroundColor:
                            question.difficulty === 'Beginner'
                              ? '#c8e6c9'
                              : question.difficulty === 'Intermediate'
                                ? '#ffe0b2'
                                : '#ffccbc',
                          color: '#333',
                          borderRadius: '4px',
                          fontSize: '0.85rem',
                          fontWeight: 600,
                        }}
                      >
                        {question.difficulty}
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Box
                        sx={{
                          display: 'inline-block',
                          px: 1.5,
                          py: 0.5,
                          backgroundColor:
                            question.status === 'Published'
                              ? '#e8f5e9'
                              : '#fff3e0',
                          color:
                            question.status === 'Published'
                              ? '#2e7d32'
                              : '#e65100',
                          borderRadius: '4px',
                          fontSize: '0.85rem',
                          fontWeight: 600,
                        }}
                      >
                        {question.status}
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        <Button
                          size="small"
                          variant="text"
                          onClick={() => handleEditQuestion(question.id)}
                        >
                          Edit
                        </Button>
                        <Button
                          size="small"
                          variant="text"
                          color="error"
                          onClick={() => handleDeleteQuestion(question.id)}
                        >
                          Delete
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
            ℹ️ Question Bank
          </Typography>
          <Typography variant="body2" color="textSecondary">
            This is your question repository. Use the tabs above to reorder questions
            or review pending changes. Create new questions using the button above.
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default QuestionListPage;
