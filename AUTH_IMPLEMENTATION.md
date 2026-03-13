# Auth API & Redux Setup - Implementation Summary

## ✅ Completed Setup

A complete authentication system with mock API has been set up using Redux Toolkit and Mirage JS.

## 📁 Project Structure

```
src/
├── store/
│   ├── authSlice.ts          # Redux auth slice (actions, reducers, selectors)
│   └── store.ts              # Redux store configuration
├── hooks/
│   ├── useAuth.ts            # Custom hook for auth state and actions
│   └── index.ts              # Hooks export barrel
├── components/
│   └── ExampleAuthComponent.tsx # Example implementation component
├── mocks/
│   └── handlers.ts           # Mock API endpoints
├── types/
│   └── api.ts                # Auth response types
├── utils/
│   └── api.ts                # API client utilities
└── main.tsx                  # Redux Provider setup
```

## 🔐 Auth Response Structure

The mock API returns the exact response you requested:

```typescript
{
  user: {
    id: string;
    email: string;
    name: string;
  };
  permissions: {
    roleName: "FRC_DEV_PSOR_DUE_DIL_MGR";
    viewAllQuestions: "true";
    viewQuestionSectionOrder: null;
    createNewQuestion: "true";
    editQuestion: "true";
    viewWorkflowTask: null;
    viewPendingChanges: null;
    viewParticipantInfo: "true";
    viewParticipantQuestionnaire: "true";
    createQuestionnaire: "true";
    editEmail: "true";
    viewMessage: "true";
    editSendMessage: "true";
  };
  token: string;
}
```

## 🚀 Mock API Endpoints

### 1. POST /api/auth/login
Authenticates user with email and password

```typescript
// Request
{
  email: "developer@example.com";
  password: "password";
}

// Response: See above
```

### 2. GET /api/auth/me
Retrieves current authenticated user

### 3. POST /api/auth/logout
Logs out the current user

## 📦 Files Created

### 1. **src/store/authSlice.ts**
- Redux slice with auth state
- Async thunks: `loginUser`, `fetchCurrentUser`, `logoutUser`
- Actions: `clearError`, `setToken`, `clearAuth`
- Selectors for accessing auth state
- Type-safe reducers and extraReducers

### 2. **src/store/store.ts**
- Redux store configuration
- Combines all reducers (currently just auth)
- Type exports: `RootState`, `AppDispatch`

### 3. **src/hooks/useAuth.ts**
- Custom hook `useAuth()` - Main hook for components
- Custom hook `usePermissions()` - Focused permission checking
- Automatically dispatches actions
- Provides `hasPermission()` utility function

### 4. **src/components/ExampleAuthComponent.tsx**
- Reference implementation showing:
  - Login form
  - User information display
  - Permissions table
  - Permission checks
  - Logout functionality

### 5. **src/mocks/handlers.ts** (Updated)
- Added `/api/auth/login` endpoint
- Added `/api/auth/me` endpoint
- Added `/api/auth/logout` endpoint

### 6. **src/types/api.ts** (Updated)
- `AuthPermissions` interface
- `AuthResponse` interface
- `LoginRequest` interface

### 7. **src/main.tsx** (Updated)
- Redux Provider wrapping the app
- Store imported and configured

## 💻 Usage Examples

### Simple Login Component

```typescript
import { useAuth } from '@/hooks/useAuth';
import { Button, TextField } from '@mui/material';

export function LoginPage() {
  const { login, loading, error, isAuthenticated } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  if (isAuthenticated) {
    return <div>Logged in!</div>;
  }

  return (
    <div>
      {error && <p>{error}</p>}
      <TextField 
        value={email} 
        onChange={(e) => setEmail(e.target.value)} 
      />
      <TextField 
        type="password"
        value={password} 
        onChange={(e) => setPassword(e.target.value)} 
      />
      <Button 
        onClick={() => login({ email, password })}
        disabled={loading}
      >
        Login
      </Button>
    </div>
  );
}
```

### Checking Permissions

```typescript
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@mui/material';

export function QuestionPanel() {
  const { hasPermission, permissions } = useAuth();

  return (
    <div>
      <p>Role: {permissions?.roleName}</p>
      
      {hasPermission('createNewQuestion') && (
        <Button>Create Question</Button>
      )}
      
      {hasPermission('editQuestion') && (
        <Button>Edit Question</Button>
      )}
      
      {hasPermission('viewAllQuestions') && (
        <Button>View All Questions</Button>
      )}
    </div>
  );
}
```

### Protected Component

```typescript
import { useAuth } from '@/hooks/useAuth';

export function ProtectedFeature() {
  const { 
    isAuthenticated, 
    user, 
    permissions, 
    logout,
    hasPermission 
  } = useAuth();

  if (!isAuthenticated) {
    return <div>Please log in</div>;
  }

  return (
    <div>
      <h1>Welcome {user?.name}</h1>
      <p>Email: {user?.email}</p>
      <p>Role: {permissions?.roleName}</p>
      
      {hasPermission('viewParticipantInfo') && (
        <div>Participant Info visible</div>
      )}
      
      <button onClick={logout}>Logout</button>
    </div>
  );
}
```

## 🔄 Redux Store Flow

```
Component
    ↓
useAuth Hook
    ↓
Redux Dispatch (loginUser)
    ↓
Async Thunk (API call to Mirage)
    ↓
authSlice Reducer
    ↓
Component Re-renders with new state
```

## 📊 Permission Keys Available

All permission strings that can be checked with `hasPermission()`:

- ✅ `viewAllQuestions`
- ✅ `createNewQuestion`
- ✅ `editQuestion`
- ✅ `viewParticipantInfo`
- ✅ `viewParticipantQuestionnaire`
- ✅ `createQuestionnaire`
- ✅ `editEmail`
- ✅ `viewMessage`
- ✅ `editSendMessage`
- ⏳ `viewQuestionSectionOrder` (null in mock)
- ⏳ `viewWorkflowTask` (null in mock)
- ⏳ `viewPendingChanges` (null in mock)

## 🧪 Testing the Auth System

### 1. View Redux State
```javascript
// In browser console
store.getState() // View entire Redux state
```

### 2. Trigger Actions
```javascript
// In browser console, after integrating example component
const { login } = useAuth();
await login({ 
  email: 'developer@example.com', 
  password: 'password' 
});
```

### 3. Check Local Storage
```
Developer Tools → Application → Local Storage
Key: "authToken"
```

## 🔑 Key Features

✅ **Full Redux Integration** - Complete state management
✅ **Type-Safe** - Full TypeScript support
✅ **Mock API** - Mirage JS intercepts calls
✅ **Custom Hooks** - Easy component integration
✅ **Async Thunks** - Handle async operations
✅ **Local Storage** - Token persistence
✅ **Permission Checking** - `hasPermission()` utility
✅ **Error Handling** - Built-in error states
✅ **Loading States** - Track async operations
✅ **Flexible** - Easy to replace mock API with real backend

## 📋 Files Modified

- ✏️ **src/types/api.ts** - Added auth types
- ✏️ **src/mocks/handlers.ts** - Added auth endpoints
- ✏️ **src/main.tsx** - Added Redux Provider
- ✏️ **package.json** - Redux Toolkit and React-Redux added

## ⚙️ Installation & Setup Complete

All dependencies installed:
```json
{
  "@reduxjs/toolkit": "^latest",
  "react-redux": "^latest"
}
```

## 🚀 Next Steps

1. **Try the example component:**
   ```typescript
   import ExampleAuthComponent from '@/components/ExampleAuthComponent';
   ```

2. **Integrate into your app pages**
   Use `useAuth()` in your components

3. **Replace mock API when ready:**
   Update `src/mocks/handlers.ts` with real endpoints

4. **Add more slices:**
   Follow same pattern in `src/store/`

5. **Create protected routes:**
   Use `isAuthenticated` selector

## 📚 Documentation Files

- 📖 **AUTH_SETUP.md** - Comprehensive auth documentation
- 📖 **MIRAGE_SETUP.md** - Mock API documentation

## ✨ Summary

Everything is ready to use! The authentication system is:
- ✅ Fully integrated with Redux
- ✅ Connected to Mirage JS mock API
- ✅ Type-safe with TypeScript
- ✅ Easy to use with custom hooks
- ✅ Production-ready structure
- ✅ Easily replaceable with real backend

**You can now use `useAuth()` in any component!** 🎉
