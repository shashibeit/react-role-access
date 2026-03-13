# Authentication & Authorization System

## Overview

A complete authentication and authorization system built with:
- **Redux Toolkit** for state management
- **Mirage JS** for mock API endpoints
- **TypeScript** for strong typing
- **React Hooks** for easy integration

## File Structure

```
src/
├── store/
│   ├── authSlice.ts      # Redux auth slice with actions and selectors
│   └── store.ts          # Redux store configuration
├── hooks/
│   └── useAuth.ts        # Custom hook for auth state and actions
├── mocks/
│   └── handlers.ts       # Mock API endpoint for /auth/login
├── types/
│   └── api.ts            # Auth response types
└── main.tsx              # Redux Provider setup
```

## Auth API Endpoints

### 1. Login
**Endpoint**: `POST /api/auth/login`

**Request**:
```typescript
{
  email: string;
  password: string;
}
```

**Response**:
```typescript
{
  user: {
    id: string;
    email: string;
    name: string;
  };
  permissions: {
    roleName: string;
    viewAllQuestions: string;
    viewQuestionSectionOrder: string | null;
    createNewQuestion: string;
    editQuestion: string;
    viewWorkflowTask: string | null;
    viewPendingChanges: string | null;
    viewParticipantInfo: string;
    viewParticipantQuestionnaire: string;
    createQuestionnaire: string;
    editEmail: string;
    viewMessage: string;
    editSendMessage: string;
  };
  token: string;
}
```

### 2. Get Current User
**Endpoint**: `GET /api/auth/me`

**Response**: Same as login response

### 3. Logout
**Endpoint**: `POST /api/auth/logout`

**Response**:
```typescript
{
  success: boolean;
  message: string;
}
```

## Using in Components

### Basic Usage with useAuth Hook

```typescript
import React from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Box, Button, CircularProgress, Alert } from '@mui/material';

export const LoginComponent: React.FC = () => {
  const { login, loading, error, user, isAuthenticated } = useAuth();

  const handleLogin = async () => {
    await login({
      email: 'developer@example.com',
      password: 'password',
    });
  };

  if (loading) return <CircularProgress />;

  if (isAuthenticated && user) {
    return <Box>Welcome, {user.name}!</Box>;
  }

  return (
    <Box>
      {error && <Alert severity="error">{error}</Alert>}
      <Button onClick={handleLogin} variant="contained">
        Login
      </Button>
    </Box>
  );
};
```

### Using Permissions

```typescript
import React from 'react';
import { usePermissions } from '@/hooks/useAuth';
import { Button } from '@mui/material';

export const QuestionActions: React.FC = () => {
  const { hasPermission, permissions } = usePermissions();

  return (
    <Box>
      <p>Role: {permissions?.roleName}</p>

      {hasPermission('createNewQuestion') && (
        <Button variant="contained">Create New Question</Button>
      )}

      {hasPermission('editQuestion') && (
        <Button variant="contained">Edit Question</Button>
      )}

      {hasPermission('viewAllQuestions') && (
        <Button variant="contained">View All Questions</Button>
      )}
    </Box>
  );
};
```

### Advanced Usage

```typescript
import React, { useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';

export const ProtectedComponent: React.FC = () => {
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

  useEffect(() => {
    // Fetch current user on component mount
    if (!isAuthenticated) {
      getCurrentUser();
    }
  }, []);

  if (loading) return <div>Loading...</div>;

  if (!isAuthenticated) {
    return (
      <button onClick={() => login({ 
        email: 'dev@example.com', 
        password: 'pass' 
      })}>
        Login
      </button>
    );
  }

  return (
    <div>
      <h1>Welcome {user?.name}</h1>
      <p>Email: {user?.email}</p>
      <p>Role: {permissions?.roleName}</p>

      <h2>Permissions:</h2>
      <ul>
        <li>View All Questions: {hasPermission('viewAllQuestions') ? '✓' : '✗'}</li>
        <li>Create Question: {hasPermission('createNewQuestion') ? '✓' : '✗'}</li>
        <li>Edit Question: {hasPermission('editQuestion') ? '✓' : '✗'}</li>
      </ul>

      <button onClick={() => logout()}>Logout</button>
    </div>
  );
};
```

## Redux Store Structure

```typescript
// Accessing auth state directly from Redux
import { useSelector } from 'react-redux';
import { selectUser, selectPermissions } from '@/store/authSlice';

export const MyComponent = () => {
  const user = useSelector(selectUser);
  const permissions = useSelector(selectPermissions);

  return (
    <div>
      <p>User: {user?.email}</p>
      <p>Role: {permissions?.roleName}</p>
    </div>
  );
};
```

## Permission Keys

All available permission keys for `hasPermission()`:

- `viewAllQuestions` - View all questions in the bank
- `viewQuestionSectionOrder` - View question section ordering
- `createNewQuestion` - Create new questions
- `editQuestion` - Edit existing questions
- `viewWorkflowTask` - View workflow tasks
- `viewPendingChanges` - View pending changes
- `viewParticipantInfo` - View participant information
- `viewParticipantQuestionnaire` - View participant questionnaires
- `createQuestionnaire` - Create new questionnaires
- `editEmail` - Edit email addresses
- `viewMessage` - View messages
- `editSendMessage` - Send and edit messages

## Local Storage

Authentication tokens are automatically persisted in localStorage:
- Key: `authToken`
- Auto-loaded on app startup
- Cleared on logout

## Async Thunks

### loginUser
Logs in a user with email and password.

```typescript
dispatch(loginUser({ email: 'user@example.com', password: 'pass' }))
```

### fetchCurrentUser
Fetches the current authenticated user's data.

```typescript
dispatch(fetchCurrentUser())
```

### logoutUser
Logs out the current user and clears auth state.

```typescript
dispatch(logoutUser())
```

## Mock API Responses

The mock API is configured to return the following:

### Success (Login)
```json
{
  "user": {
    "id": "1",
    "email": "developer@example.com",
    "name": "Developer User"
  },
  "permissions": {
    "roleName": "FRC_DEV_PSOR_DUE_DIL_MGR",
    "viewAllQuestions": "true",
    "createNewQuestion": "true",
    "editQuestion": "true",
    "viewParticipantInfo": "true",
    "viewParticipantQuestionnaire": "true",
    "createQuestionnaire": "true",
    "editEmail": "true",
    "viewMessage": "true",
    "editSendMessage": "true",
    "viewQuestionSectionOrder": null,
    "viewWorkflowTask": null,
    "viewPendingChanges": null
  },
  "token": "mock-jwt-token-1678987654321"
}
```

## TODO Items

- [ ] Replace mock API with real backend authentication
- [ ] Add JWT token refresh logic
- [ ] Implement protected routes
- [ ] Add remember me functionality
- [ ] Add two-factor authentication
- [ ] Add role-based route guards
- [ ] Add session timeout
- [ ] Add password reset flow
- [ ] Add social login integration

## Protecting Routes Example

```typescript
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) return <div>Loading...</div>;

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};
```

## Testing the Auth System

### 1. Open Console
Open browser DevTools → Console

### 2. Trigger Login
```typescript
// This will be logged if you call login
const { login } = useAuth();
await login({ email: 'dev@example.com', password: 'password' });
```

### 3. Check Redux DevTools
Install [Redux DevTools Extension](https://github.com/reduxjs/redux-devtools-extension) to:
- Inspect auth state
- Time-travel debug auth actions
- Monitor all dispatched actions

### 4. Check Local Storage
```
Developer Tools → Application → Local Storage
Look for key: "authToken"
```

## Environment Variables

Create `.env` file for production:
```
VITE_API_URL=https://api.example.com
VITE_USE_MOCK_API=false
```

Update `src/mocks/server.ts` to respect environment:
```typescript
if (import.meta.env.VITE_USE_MOCK_API !== 'false' && process.env.NODE_ENV === 'development') {
  makeServer();
}
```

---

**Ready to integrate real authentication?** Let me know the backend API details and I'll update the endpoints!
