/**
 * CreateQuestionPage
 * Form page for creating a new question
 * Does not show the secondary Question Bank tabs
 */

import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Select,
  MenuItem,
  Button,
  Grid,
  FormControl,
  InputLabel,
  SelectChangeEvent,
} from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import { useNavigate } from 'react-router-dom';
import { ROUTE_PATHS } from '../../routes/routePaths';

interface CreateQuestionPageProps {
  // Reserved for future props
}

interface QuestionFormData {
  title: string;
  category: string;
  difficulty: string;
  questionText: string;
  optionA: string;
  optionB: string;
  optionC: string;
  optionD: string;
  correctAnswer: string;
  explanation: string;
}

/**
 * CreateQuestionPage provides a form for creating new questions
 * Includes validation and submission handling
 */
export const CreateQuestionPage: React.FC<CreateQuestionPageProps> = () => {
  const navigate = useNavigate();

  // TODO: Add form validation using react-hook-form or similar
  // TODO: Add API integration for question submission
  // TODO: Add file upload for question attachments
  // TODO: Add rich text editor for question descriptions
  // TODO: Implement state management for unsaved changes warning
  // TODO: Add autosave functionality

  const [formData, setFormData] = useState<QuestionFormData>({
    title: '',
    category: 'Frontend',
    difficulty: 'Intermediate',
    questionText: '',
    optionA: '',
    optionB: '',
    optionC: '',
    optionD: '',
    correctAnswer: 'A',
    explanation: '',
  });

  const [errors, setErrors] = useState<Partial<QuestionFormData>>({});

  const validateForm = (): boolean => {
    const newErrors: Partial<QuestionFormData> = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }
    if (!formData.questionText.trim()) {
      newErrors.questionText = 'Question text is required';
    }
    if (!formData.optionA.trim()) {
      newErrors.optionA = 'Option A is required';
    }
    if (!formData.optionB.trim()) {
      newErrors.optionB = 'Option B is required';
    }
    if (!formData.optionC.trim()) {
      newErrors.optionC = 'Option C is required';
    }
    if (!formData.optionD.trim()) {
      newErrors.optionD = 'Option D is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error for this field when user starts typing
    if (errors[name as keyof QuestionFormData]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const handleSelectChange = (
    event: SelectChangeEvent<string>
  ): void => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (): void => {
    if (!validateForm()) {
      return;
    }

    // TODO: Call API to submit question
    console.log('Submit form data:', formData);

    // Navigate back to question list after successful submission
    navigate(ROUTE_PATHS.QUESTION_BANK_LIST);
  };

  const handleCancel = (): void => {
    // TODO: Show unsaved changes warning if form has data
    navigate(ROUTE_PATHS.QUESTION_BANK_LIST);
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
          Create New Question
        </Typography>
      </Box>

      {/* Main Form */}
      <Card sx={{ boxShadow: 1 }}>
        <CardContent sx={{ p: 3 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            {/* Basic Info Section */}
            <Box>
              <Typography
                variant="h6"
                sx={{ fontWeight: 600, mb: 2, color: '#333' }}
              >
                Question Information
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Question Title"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    error={!!errors.title}
                    helperText={errors.title}
                    placeholder="Enter a descriptive title for the question"
                    variant="outlined"
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel>Category</InputLabel>
                    <Select
                      name="category"
                      value={formData.category}
                      label="Category"
                      onChange={handleSelectChange}
                    >
                      <MenuItem value="Frontend">Frontend</MenuItem>
                      <MenuItem value="Backend">Backend</MenuItem>
                      <MenuItem value="TypeScript">TypeScript</MenuItem>
                      <MenuItem value="React">React</MenuItem>
                      <MenuItem value="Other">Other</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel>Difficulty Level</InputLabel>
                    <Select
                      name="difficulty"
                      value={formData.difficulty}
                      label="Difficulty Level"
                      onChange={handleSelectChange}
                    >
                      <MenuItem value="Beginner">Beginner</MenuItem>
                      <MenuItem value="Intermediate">Intermediate</MenuItem>
                      <MenuItem value="Advanced">Advanced</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            </Box>

            {/* Question Content Section */}
            <Box>
              <Typography
                variant="h6"
                sx={{ fontWeight: 600, mb: 2, color: '#333' }}
              >
                Question Content
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Question Text"
                    name="questionText"
                    value={formData.questionText}
                    onChange={handleInputChange}
                    error={!!errors.questionText}
                    helperText={errors.questionText}
                    multiline
                    rows={4}
                    placeholder="Enter the question text"
                    variant="outlined"
                  />
                </Grid>
              </Grid>
            </Box>

            {/* Answer Options Section */}
            <Box>
              <Typography
                variant="h6"
                sx={{ fontWeight: 600, mb: 2, color: '#333' }}
              >
                Answer Options
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Option A"
                    name="optionA"
                    value={formData.optionA}
                    onChange={handleInputChange}
                    error={!!errors.optionA}
                    helperText={errors.optionA}
                    variant="outlined"
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Option B"
                    name="optionB"
                    value={formData.optionB}
                    onChange={handleInputChange}
                    error={!!errors.optionB}
                    helperText={errors.optionB}
                    variant="outlined"
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Option C"
                    name="optionC"
                    value={formData.optionC}
                    onChange={handleInputChange}
                    error={!!errors.optionC}
                    helperText={errors.optionC}
                    variant="outlined"
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Option D"
                    name="optionD"
                    value={formData.optionD}
                    onChange={handleInputChange}
                    error={!!errors.optionD}
                    helperText={errors.optionD}
                    variant="outlined"
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel>Correct Answer</InputLabel>
                    <Select
                      name="correctAnswer"
                      value={formData.correctAnswer}
                      label="Correct Answer"
                      onChange={handleSelectChange}
                    >
                      <MenuItem value="A">Option A</MenuItem>
                      <MenuItem value="B">Option B</MenuItem>
                      <MenuItem value="C">Option C</MenuItem>
                      <MenuItem value="D">Option D</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            </Box>

            {/* Explanation Section */}
            <Box>
              <Typography
                variant="h6"
                sx={{ fontWeight: 600, mb: 2, color: '#333' }}
              >
                Explanation (Optional)
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Answer Explanation"
                    name="explanation"
                    value={formData.explanation}
                    onChange={handleInputChange}
                    multiline
                    rows={3}
                    placeholder="Provide an explanation for the correct answer"
                    variant="outlined"
                  />
                </Grid>
              </Grid>
            </Box>

            {/* Form Actions */}
            <Box
              sx={{
                display: 'flex',
                gap: 2,
                justifyContent: 'flex-end',
                pt: 2,
                borderTop: '1px solid #e0e0e0',
              }}
            >
              <Button
                variant="outlined"
                startIcon={<CancelIcon />}
                onClick={handleCancel}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                startIcon={<SaveIcon />}
                onClick={handleSubmit}
                sx={{
                  backgroundColor: '#4caf50',
                  '&:hover': {
                    backgroundColor: '#45a049',
                  },
                }}
              >
                Create Question
              </Button>
            </Box>
          </Box>
        </CardContent>
      </Card>

      {/* Tips Card */}
      <Card sx={{ backgroundColor: '#e1f5fe', border: 'none', boxShadow: 0 }}>
        <CardContent>
          <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
            💡 Tips for Writing Great Questions
          </Typography>
          <Typography variant="body2" color="textSecondary" component="div">
            <ul style={{ margin: 0, paddingLeft: '20px' }}>
              <li>Be clear and concise in your question</li>
              <li>Make sure all options are plausible</li>
              <li>Avoid trick questions</li>
              <li>Provide a helpful explanation</li>
            </ul>
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default CreateQuestionPage;
