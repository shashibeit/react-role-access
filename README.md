# Questionnaire Generation System

A professional React 19 application for managing questionnaires, built with TypeScript, Material UI v7, and React Router v6.

## 🎯 Overview

This is an enterprise-ready boilerplate application for a Questionnaire Generation System with the following key modules:

- **Participant List** - Manage system participants
- **Question Bank** - Create, organize, and manage questions with multiple organizational views
- **Workflow Queue** - Monitor and manage workflow execution tasks

## 🛠 Tech Stack

- **React 19** - Latest React framework
- **TypeScript** - Strong typing for JavaScript
- **Material UI v7** - Professional UI component library
- **React Router v6** - Client-side routing
- **Vite** - Fast build tool and dev server
- **Emotion** - CSS-in-JS styling library

## 📁 Project Structure

```
src/
├── components/
│   ├── layout/
│   │   ├── MainLayout.tsx       # App shell with navigation
│   │   └── TopNav.tsx           # Main navigation tabs
│   └── questionBank/
│       └── QuestionBankTabs.tsx # Secondary navigation for Question Bank
├── pages/
│   ├── participants/
│   │   └── ParticipantListPage.tsx
│   ├── questionBank/
│   │   ├── QuestionListPage.tsx
│   │   ├── QuestionOrderPage.tsx
│   │   ├── PendingChangesPage.tsx
│   │   └── CreateQuestionPage.tsx
│   └── workflowQueue/
│       └── WorkflowQueuePage.tsx
├── routes/
│   ├── routePaths.ts            # Route constants
│   └── routes.tsx               # Route configuration
├── App.tsx                       # Main app component
├── main.tsx                      # Entry point
└── index.css                     # Global styles
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn/pnpm

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

The application will open at `http://localhost:3000`

## 📍 Route Structure

```
/                                    → Redirects to /participants
/participants                        → Participant List page
/question-bank                       → Redirects to /question-bank/question-list
/question-bank/question-list         → Question List Table page
/question-bank/question-order        → Question Order page
/question-bank/pending-changes       → Pending Changes page
/question-bank/create                → Create Question page
/workflow-queue                      → Workflow Queue page
```

## 🎨 Features

### 1. Modular Architecture
- Reusable components for layout and navigation
- Separate route configuration for scalability
- Clean folder structure organized by feature

### 2. Strong TypeScript Typing
- Explicit prop types for all components
- Interface definitions for state and data structures
- Avoid `any` types throughout codebase

### 3. Material UI Components
- Professional AppBar and navigation
- Responsive grid layouts
- Data tables with hover effects
- Cards and typography for consistent design

### 4. Navigation
- Top-level navigation for main modules
- Secondary tabs for Question Bank module
- Active route highlighting
- Type-safe route navigation

### 5. Placeholder Pages
- Question List Table with mock data
- Question reordering interface
- Pending changes review workflow
- Question creation form with validation
- Participant list with status indicators
- Workflow queue with progress tracking

## 🔮 Future Enhancements

### TODO Items Throughout Code

The codebase includes multiple TODO comments for planned features:

1. **API Integration**
   - Replace mock data with real API calls
   - Implement data fetching with loading states
   - Add error handling and retry logic

2. **State Management**
   - Integrate Redux or Zustand for global state
   - Implement context providers for authentication
   - Add local storage persistence

3. **Advanced UI Components**
   - DataGrid integration for better table management
   - Drag-and-drop for question reordering
   - Rich text editor for question descriptions
   - File upload for attachments

4. **Forms & Validation**
   - Implement react-hook-form
   - Add form validation schemas
   - Implement auto-save functionality
   - Add unsaved changes warnings

5. **Workflow Features**
   - WebSocket integration for real-time updates
   - Workflow state machine implementation
   - Retry mechanism for failed workflows
   - Execution logs and monitoring

6. **UX Enhancements**
   - Dark mode support
   - Custom Material-UI theme
   - Advanced filtering and search
   - Bulk operations
   - Export/import functionality

## 💡 Key Design Decisions

### Component Organization
- **Layout components** in `components/layout/` for shared UI structure
- **Feature components** in `components/[feature]/` for feature-specific UI
- **Pages** in `pages/` for route-level containers

### Routing
- Centralized route definitions in `routes/routes.tsx`
- Route paths as constants in `routePaths.ts` for type safety
- Nested routes for Question Bank secondary navigation

### Styling
- Material UI `sx` prop for component-level styling
- Global styles in `index.css`
- Responsive design with MUI Grid and Box components

### TypeScript
- Interface definitions for all data structures
- Explicit prop typing for components
- Using React.FC<PropsType> for functional components

## 📝 Naming Conventions

- **Components**: PascalCase (e.g., `MainLayout.tsx`)
- **Files**: PascalCase for components, camelCase for utilities
- **Functions**: camelCase
- **Types/Interfaces**: PascalCase
- **Constants**: UPPER_SNAKE_CASE

## 🧪 Development Practices

### Type Safety
- Enable strict mode in TypeScript
- Use explicit types instead of `any`
- React component props must be typed

### Code Organization
- One main component per file
- Helper functions in separate utility files
- Related components grouped in folders

### Scalability
- Comment blocks for future API integration
- Placeholder for state management
- Ready for DataGrid and advanced components

## 📚 Available Scripts

```bash
# Start development server with hot reload
npm run dev

# Type check without emitting files
npm run type-check

# Build production bundle
npm run build

# Preview production build locally
npm run preview

# Run ESLint (when configured)
npm run lint
```

## 🔗 Dependencies

### Core
- `react` - UI framework
- `react-dom` - React DOM rendering
- `react-router-dom` - Client-side routing

### UI & Styling
- `@mui/material` - Material Design components
- `@mui/icons-material` - Material Design icons
- `@emotion/react` - CSS-in-JS library
- `@emotion/styled` - Styled component support

### Development
- `typescript` - Type checking
- `vite` - Build tool
- `@vitejs/plugin-react` - React support for Vite

## 🤝 Contributing

When extending this application:

1. Follow the existing folder structure
2. Use TypeScript for all components
3. Add TODO comments for future enhancements
4. Keep components focused and reusable
5. Use Material UI components for consistency

## 📄 License

This project is part of the Questionnaire Generation System.

---

**Ready to develop?** Start with `npm run dev` and navigate through the application to explore the structure!
