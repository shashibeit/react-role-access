/**
 * QuestionOrderPage
 * Allows reordering questions in the question bank
 */

import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Paper,
} from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import QuestionBankTabs from '../../components/questionBank/QuestionBankTabs';

interface QuestionOrderPageProps {
  // Reserved for future props
}

interface Question {
  id: number;
  title: string;
  order: number;
}

/**
 * QuestionOrderPage allows users to reorder questions in the bank
 * Provides drag-and-drop or arrow-based ordering
 */
export const QuestionOrderPage: React.FC<QuestionOrderPageProps> = () => {
  // TODO: Replace with actual API integration
  // TODO: Implement drag-and-drop reordering
  // TODO: Add save/persist functionality
  // TODO: Add undo/redo for order changes
  // TODO: Implement bulk order operations

  const [questions, setQuestions] = useState<Question[]>([
    { id: 1, title: 'What is React?', order: 1 },
    { id: 2, title: 'Explain state management patterns', order: 2 },
    { id: 3, title: 'TypeScript generics explained', order: 3 },
  ]);

  const handleMoveUp = (index: number): void => {
    if (index === 0) return;

    const newQuestions = [...questions];
    [newQuestions[index - 1], newQuestions[index]] = [
      newQuestions[index],
      newQuestions[index - 1],
    ];

    newQuestions.forEach((q, i) => {
      q.order = i + 1;
    });

    setQuestions(newQuestions);
    // TODO: Call API to persist order
  };

  const handleMoveDown = (index: number): void => {
    if (index === questions.length - 1) return;

    const newQuestions = [...questions];
    [newQuestions[index], newQuestions[index + 1]] = [
      newQuestions[index + 1],
      newQuestions[index],
    ];

    newQuestions.forEach((q, i) => {
      q.order = i + 1;
    });

    setQuestions(newQuestions);
    // TODO: Call API to persist order
  };

  const handleSaveOrder = (): void => {
    // TODO: Implement save functionality with API call
    console.log('Save order:', questions);
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
          Question Order
        </Typography>
        <Button
          variant="contained"
          onClick={handleSaveOrder}
          sx={{
            backgroundColor: '#4caf50',
            '&:hover': {
              backgroundColor: '#45a049',
            },
          }}
        >
          Save Order
        </Button>
      </Box>

      {/* Reordering Instructions */}
      <Card sx={{ backgroundColor: '#fff8e1', border: 'none', boxShadow: 0 }}>
        <CardContent>
          <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
            ⚠️ Reorder Questions
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Use the arrow buttons to reorder questions. Changes are not saved until
            you click the "Save Order" button.
          </Typography>
        </CardContent>
      </Card>

      {/* Questions Reorder List */}
      <Paper elevation={1}>
        <List sx={{ width: '100%' }}>
          {questions.map((question, index) => (
            <ListItem
              key={question.id}
              sx={{
                backgroundColor: index % 2 === 0 ? '#fafafa' : 'white',
                borderBottom: '1px solid #e0e0e0',
                '&:last-child': {
                  borderBottom: 'none',
                },
              }}
              secondaryAction={
                <Box sx={{ display: 'flex', gap: 0.5 }}>
                  <IconButton
                    edge="end"
                    aria-label="move up"
                    onClick={() => handleMoveUp(index)}
                    disabled={index === 0}
                    size="small"
                    sx={{ color: index === 0 ? '#ccc' : '#1976d2' }}
                  >
                    <ArrowUpwardIcon />
                  </IconButton>
                  <IconButton
                    edge="end"
                    aria-label="move down"
                    onClick={() => handleMoveDown(index)}
                    disabled={index === questions.length - 1}
                    size="small"
                    sx={{
                      color:
                        index === questions.length - 1 ? '#ccc' : '#1976d2',
                    }}
                  >
                    <ArrowDownwardIcon />
                  </IconButton>
                </Box>
              }
            >
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 2,
                  flex: 1,
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '32px',
                    height: '32px',
                    backgroundColor: '#1976d2',
                    color: 'white',
                    borderRadius: '4px',
                    fontWeight: 600,
                    fontSize: '0.9rem',
                  }}
                >
                  {question.order}
                </Box>
                <ListItemText
                  primary={question.title}
                  primaryTypographyProps={{
                    variant: 'body1',
                    fontWeight: 500,
                  }}
                />
              </Box>
            </ListItem>
          ))}
        </List>
      </Paper>

      {/* Info about drag-and-drop future feature */}
      <Card sx={{ backgroundColor: '#e3f2fd', border: 'none', boxShadow: 0 }}>
        <CardContent>
          <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
            🎯 Future Enhancement
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Drag-and-drop reordering will be implemented in a future release for
            better user experience.
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default QuestionOrderPage;
