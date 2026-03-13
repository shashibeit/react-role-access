# Auth System - Quick Start Guide

## 🎯 Get Started in 2 Minutes

### 1. Import useAuth Hook

```typescript
import { useAuth } from '@/hooks/useAuth';
```

### 2. Use in Your Component

```typescript
export function MyComponent() {
  const { 
    isAuthenticated, 
    user, 
    login, 
    logout,
    hasPermission 
  } = useAuth();

  return (
    <>
      {!isAuthenticated ? (
        <button onClick={() => login({ 
          email: 'developer@example.com', 
          password: 'password' 
        })}>
          Login
        </button>
      ) : (
        <>
          <p>Welcome {user?.name}</p>
          {hasPermission('createNewQuestion') && (
            <button>Create Question</button>
          )}
          <button onClick={logout}>Logout</button>
        </>
      )}
    </>
  );
}
```

## 🧪 Test the Full Example

Add to your App or any route:

```typescript
import ExampleAuthComponent from '@/components/ExampleAuthComponent';

export function AppPage() {
  return <ExampleAuthComponent />;
}
```

This shows:
- ✅ Login/Logout
- ✅ User Info Display
- ✅ All Permissions Table
- ✅ Quick Permission Checks
- ✅ Full Role Information

## 📝 Mock Login Credentials

```
Email: developer@example.com
Password: password
```

(Any credentials work with mock API)

## 🔑 Permission Keys Cheat Sheet

```typescript
const { hasPermission } = useAuth();

// View permissions
hasPermission('viewAllQuestions')                    // true
hasPermission('viewParticipantInfo')                 // true
hasPermission('viewParticipantQuestionnaire')        // true
hasPermission('viewQuestionSectionOrder')            // null (false)

// Create/Edit permissions
hasPermission('createNewQuestion')                   // true
hasPermission('editQuestion')                        // true
hasPermission('createQuestionnaire')                 // true
hasPermission('editEmail')                           // true

// Workflow & Message permissions
hasPermission('viewWorkflowTask')                    // null (false)
hasPermission('viewPendingChanges')                  // null (false)
hasPermission('viewMessage')                         // true
hasPermission('editSendMessage')                     // true
```

## 🏗️ Component Structure Pattern

```typescript
import { useAuth, usePermissions } from '@/hooks';
import { Box, Button } from '@mui/material';

interface MyComponentProps {
  // Your props
}

export const MyComponent: React.FC<MyComponentProps> = (props) => {
  // Get auth state
  const { 
    isAuthenticated, 
    user, 
    permissions,
    hasPermission 
  } = useAuth();

  // Handle guard
  if (!isAuthenticated) {
    return <div>Please log in</div>;
  }

  // Check permissions for features
  if (!hasPermission('viewAllQuestions')) {
    return <div>Access denied</div>;
  }

  return (
    <Box>
      <h1>Hello {user?.name}</h1>
      <p>Role: {permissions?.roleName}</p>
      
      {hasPermission('createNewQuestion') && (
        <Button>Create Question</Button>
      )}
    </Box>
  );
};
```

## 🔄 Complete Hook API

```typescript
const {
  // State
  isAuthenticated,      // boolean - is user logged in?
  user,                 // User obj or null
  permissions,          // Permissions obj or null
  loading,              // boolean - is loading?
  error,                // string or null - error message
  
  // Actions
  login,                // (credentials) => Promise
  logout,               // () => Promise
  getCurrentUser,       // () => Promise
  clearError,           // () => void
  
  // Utilities
  hasPermission,        // (key) => boolean
} = useAuth();
```

## 💾 Data Persistence

Token is automatically saved in localStorage:
- Key: `authToken`
- Loaded on app startup
- Cleared on logout

## 🔑 Direct Redux Access

If you need to access Redux state directly:

```typescript
import { useSelector } from 'react-redux';
import { selectUser, selectPermissions } from '@/store/authSlice';

export function MyComponent() {
  const user = useSelector(selectUser);
  const permissions = useSelector(selectPermissions);
  
  return <div>{user?.email}</div>;
}
```

## 🚀 Production Setup

To use real API instead of Mirage mock:

1. Update endpoints in `src/mocks/handlers.ts` or create real API client
2. Set environment variable: `VITE_USE_MOCK_API=false`
3. Update API URL in `.env`

```env
VITE_API_URL=https://your-api.com
VITE_USE_MOCK_API=false
```

## 🐛 Debugging

### Check Redux State
```javascript
// Browser Console
const state = document.querySelector('[data-redux-state]');
// or use Redux DevTools extension
```

### Check Local Storage
```javascript
// Browser Console
localStorage.getItem('authToken')
```

### Check Mirage Requests
```javascript
// Browser Console
// Look for [Mirage] logs
```

## 📚 Files Reference

| File | Purpose |
|------|---------|
| `src/store/authSlice.ts` | Redux slice with auth logic |
| `src/store/store.ts` | Redux store configuration |
| `src/hooks/useAuth.ts` | Custom hook for components |
| `src/components/ExampleAuthComponent.tsx` | Full working example |
| `src/types/api.ts` | TypeScript types |
| `src/mocks/handlers.ts` | Mock API endpoints |
| `AUTH_SETUP.md` | Detailed documentation |
| `AUTH_IMPLEMENTATION.md` | Implementation details |

## ✅ Checklist

- [x] Redux Toolkit installed
- [x] Redux store configured
- [x] Auth slice created
- [x] Custom hooks created
- [x] Mock API endpoints created
- [x] Types defined
- [x] Provider setup in main.tsx
- [x] Example component created
- [x] Documentation complete

## 🎓 Learning Path

1. **Start**: Read this file (you are here!)
2. **Try**: Use `ExampleAuthComponent` in your app
3. **Build**: Add `useAuth()` to your pages
4. **Check**: Use `hasPermission()` for features
5. **Integrate**: Replace mock API with real backend

---

**You're all set! Happy coding! 🚀**

For more details, see `AUTH_SETUP.md` and `AUTH_IMPLEMENTATION.md`
