# Mirage JS Mock API Setup

## Overview

Mirage JS is configured to intercept all API calls and return mock data during development. This allows frontend development to proceed independently of backend API completion.

## Project Structure

```
src/
├── mocks/
│   ├── server.ts          # Mirage server configuration
│   └── handlers.ts        # API route handlers
├── utils/
│   └── api.ts            # API client utilities
├── types/
│   └── api.ts            # API response types
└── main.tsx              # Server initialization
```

## Current Setup

### 1. **Mirage Server** (`src/mocks/server.ts`)
- Creates and configures the mock server
- Defines data models (to be added)
- Seeds initial mock data (to be added)

### 2. **API Handlers** (`src/mocks/handlers.ts`)
- Defines all mock API endpoint routes
- Namespace: `/api`
- Organized by feature/module

### 3. **API Client** (`src/utils/api.ts`)
- Helper functions for making API calls
- Methods: `apiGet()`, `apiPost()`, `apiPut()`, `apiDelete()`
- All calls automatically prefix with `/api`

### 4. **Type Definitions** (`src/types/api.ts`)
- TypeScript interfaces for all API responses
- Request body types
- Common types (pagination, errors, etc.)

### 5. **Server Initialization** (`src/main.tsx`)
- Starts Mirage server in development mode
- Automatically disabled in production builds

## How to Add New API Endpoints

### Step 1: Define Types

Add to `src/types/api.ts`:

```typescript
export interface YourEntityResponse {
  id: number;
  name: string;
  // ... other fields
}

export interface YourEntityListResponse {
  entities: YourEntityResponse[];
  total: number;
}

export interface CreateYourEntityRequest {
  name: string;
  // ... fields
}
```

### Step 2: Add Mirage Routes

Update `src/mocks/handlers.ts`:

```typescript
// In setupRoutes function:
server.get('/your-entities', () => {
  return {
    entities: [
      { id: 1, name: 'Entity 1' },
      { id: 2, name: 'Entity 2' },
    ],
    total: 2,
  };
});

server.get('/your-entities/:id', (schema, request) => {
  const id = request.params.id;
  // Return specific entity
  return { id, name: 'Entity 1' };
});

server.post('/your-entities', (schema, request) => {
  const body = JSON.parse(request.requestBody);
  // Create and return new entity
  return { id: 3, ...body };
});

server.put('/your-entities/:id', (schema, request) => {
  const { id } = request.params;
  const body = JSON.parse(request.requestBody);
  // Update and return entity
  return { id, ...body };
});

server.delete('/your-entities/:id', (schema, request) => {
  const { id } = request.params;
  return { success: true, deletedId: id };
});
```

### Step 3: Use in Components

```typescript
import { apiGet, apiPost } from '@/utils/api';
import { YourEntityListResponse } from '@/types/api';

// In your component:
const fetchEntities = async () => {
  const response = await apiGet<YourEntityListResponse>('/your-entities');
  console.log(response.entities);
};

const createEntity = async (data: CreateYourEntityRequest) => {
  const response = await apiPost('/your-entities', data);
  console.log(response);
};
```

## API Namespace

All API endpoints use the `/api` prefix:

```
/api/participants
/api/questions
/api/workflows
etc.
```

## Current Planned Endpoints

### Participants
- `GET /api/participants` - List all participants
- `POST /api/participants` - Create participant
- `GET /api/participants/:id` - Get participant
- `PUT /api/participants/:id` - Update participant
- `DELETE /api/participants/:id` - Delete participant

### Questions
- `GET /api/questions` - List all questions
- `POST /api/questions` - Create question
- `GET /api/questions/:id` - Get question
- `PUT /api/questions/:id` - Update question
- `DELETE /api/questions/:id` - Delete question
- `PUT /api/questions/:id/order` - Update question order
- `GET /api/questions/pending-changes` - Get pending changes
- `POST /api/questions/:id/approve` - Approve changes
- `POST /api/questions/:id/reject` - Reject changes

### Workflows
- `GET /api/workflows` - List all workflows
- `POST /api/workflows` - Create workflow
- `GET /api/workflows/:id` - Get workflow
- `POST /api/workflows/:id/start` - Start workflow
- `POST /api/workflows/:id/pause` - Pause workflow
- `POST /api/workflows/:id/retry` - Retry workflow
- `GET /api/workflows/:id/logs` - Get workflow logs

## Development vs Production

- **Development**: Mirage server active, all API calls intercepted
- **Production**: Mirage disabled, real API calls go to backend

Toggle in `src/main.tsx`:

```typescript
if (process.env.NODE_ENV === 'development') {
  // Mirage server starts only in development
}
```

## Debugging

### Browser Console
- Check for `[Mirage]` logs showing server initialization
- Check for `[Development]` logs confirming mock server started

### Example Console Output
```
[Mirage] API routes configured
[Development] Mirage JS mock server started
```

### Network Tab
- API calls to `/api/*` are intercepted by Mirage
- No actual network requests are made in development

## Advanced Features to Add Later

- [ ] Model persistence with Mirage Models/Factory
- [ ] Database simulation with relationships
- [ ] GraphQL support (if needed)
- [ ] Middleware for request/response logging
- [ ] Delay simulation for realistic UX testing
- [ ] Error response scenarios for testing error handling
- [ ] Authentication flow mocking

## References

- [Mirage JS Documentation](https://miragejs.com/)
- [Getting Started Guide](https://miragejs.com/docs/getting-started/overview/)
- [API Reference](https://miragejs.com/docs/api/)

## Next Steps

Ready to add APIs! Tell me which endpoints you'd like to implement first and I'll:
1. Add the route handlers in `handlers.ts`
2. Add mock data/responses
3. Create any additional types needed
4. Update components to use new endpoints
