# Development Auto-Authentication Setup

## Overview

The application now automatically authenticates a mock user in development mode. This allows you to:
- ✅ Skip login screen entirely
- ✅ Test with authenticated user from app startup
- ✅ Persist auth state across page reloads
- ✅ Access all permissions immediately

## How It Works

### 1. **On App Startup** (`src/main.tsx`)
```typescript
// Starts Mirage mock server
makeServer({ environment: 'development' });

// Auto-fills localStorage with mock user
initializeDevelopmentAuth();
```

### 2. **Redux State Initialize** (`src/store/authSlice.ts`)
```typescript
// authSlice reads from localStorage on init
const initialState = getInitialState(); // Restores user data
```

### 3. **App Component** (`src/App.tsx`)
```typescript
// On mount, fetches current user if token exists
useEffect(() => {
  if (token) {
    dispatch(fetchCurrentUser());
  }
}, []);
```

### 4. **Result**
User is automatically authenticated when app loads! 🚀

## Mock User Details

**Email**: `developer@example.com`  
**Name**: `Developer User`  
**Role**: `FRC_DEV_PSOR_DUE_DIL_MGR`  
**ID**: `1`

## Permissions

All these are set to `true` (allowed):
- ✅ `viewAllQuestions`
- ✅ `createNewQuestion`
- ✅ `editQuestion`
- ✅ `viewParticipantInfo`
- ✅ `viewParticipantQuestionnaire`
- ✅ `createQuestionnaire`
- ✅ `editEmail`
- ✅ `viewMessage`
- ✅ `editSendMessage`

These are `null` (not visible):
- ⏳ `viewQuestionSectionOrder`
- ⏳ `viewWorkflowTask`
- ⏳ `viewPendingChanges`

## localStorage Data

When app starts, these keys are automatically set:

```javascript
localStorage.getItem('authToken')         // "dev-mock-token-..."
localStorage.getItem('authUser')          // {"id":"1","email":"developer@example.com",...}
localStorage.getItem('authPermissions')   // {"roleName":"FRC_DEV_PSOR_DUE_DIL_MGR",...}
```

## Using in Components

### Access Auth State

```typescript
import { useAuth } from '@/hooks/useAuth';

export function MyComponent() {
  const { isAuthenticated, user, permissions } = useAuth();

  // You're already authenticated!
  console.log(isAuthenticated); // true
  console.log(user?.name);      // "Developer User"
}
```

### Check Permissions

```typescript
const { hasPermission } = useAuth();

{hasPermission('createNewQuestion') && (
  <Button>Create Question</Button>
)}
```

## Production Build

In production, auto-authentication is **disabled**:

```typescript
if (process.env.NODE_ENV === 'development') {
  // Only runs in development
  initializeDevelopmentAuth();
}
```

## Files Modified

- ✏️ **src/main.tsx** - Added devAuth initialization
- ✏️ **src/store/authSlice.ts** - Added localStorage persistence for user/permissions
- ✏️ **src/App.tsx** - Added useEffect to fetch current user on mount
- ✏️ **src/mocks/handlers.ts** - Extracted mock data to constants
- ✨ **src/mocks/devAuth.ts** - New file for development auth

## Flow Diagram

```
App Startup
    ↓
[main.tsx]
    ↓
Start Mirage Server
    ↓
Call initializeDevelopmentAuth()
    ↓
Set localStorage (token, user, permissions)
    ↓
Dispatch Redux setToken
    ↓
[App.tsx] renders
    ↓
useEffect checks token
    ↓
Dispatch fetchCurrentUser()
    ↓
API call to /auth/me (Mirage intercepts)
    ↓
Redux state updated with user data
    ↓
Component renders with authenticated user
    ↓
✅ User is authenticated!
```

## Testing

### 1. Open App
App loads with authenticated user automatically

### 2. Check Redux State
```javascript
// Browser Console
store.getState().auth
```

Output:
```javascript
{
  user: {
    id: "1",
    email: "developer@example.com",
    name: "Developer User"
  },
  permissions: {
    roleName: "FRC_DEV_PSOR_DUE_DIL_MGR",
    viewAllQuestions: "true",
    ...
  },
  token: "dev-mock-token-...",
  loading: false,
  error: null,
  isAuthenticated: true
}
```

### 3. Check localStorage
```javascript
// Browser Console
localStorage.getItem('authToken')
localStorage.getItem('authUser')
localStorage.getItem('authPermissions')
```

### 4. Verify in Components
```typescript
const { user, isAuthenticated } = useAuth();
console.log(user?.name);       // "Developer User"
console.log(isAuthenticated);  // true
```

## Manual Logout

Even with auto-authentication, users can still logout:

```typescript
const { logout } = useAuth();

<button onClick={logout}>Logout</button>
```

This will:
- Clear Redux state
- Clear localStorage
- Redirect to login

## Disable Auto-Auth

If you want to disable auto-authentication temporarily:

**Option 1**: Comment out in `src/main.tsx`
```typescript
// initializeDevelopmentAuth();
```

**Option 2**: Edit `src/mocks/devAuth.ts`
```typescript
if (process.env.NODE_ENV !== 'development') {
  return; // Add this check
}
```

## Switching Between Dev Modes

### Development (Auto-auth)
```bash
npm run dev
```
✅ User auto-authenticated

### Manual Auth Testing
Edit `src/mocks/devAuth.ts`:
```typescript
export function initializeDevelopmentAuth(): void {
  if (process.env.NODE_ENV !== 'development') {
    return;
  }

  // Comment out to disable auto-auth
  // return;

  // Rest of function...
}
```

Then restart dev server:
```bash
npm run dev
```

## Benefits

✅ **Faster Development** - No login screen delay  
✅ **Persistent Auth** - Survives page reloads  
✅ **Consistent Data** - Same user across sessions  
✅ **Permission Testing** - All permissions pre-configured  
✅ **Production Safe** - Disabled in production builds  

## Next Steps

1. ✅ Auto-authentication is ready
2. ✅ localStorage persistence working
3. ✅ Redux state managing auth
4. ✅ Mock API endpoints returning user data

Start building features with authenticated user! 🚀
