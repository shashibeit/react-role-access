/**
 * App Component
 * Main application component that sets up routing
 */

import React from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { routes } from './routes/routes';

/**
 * Create browser router with configured routes
 */
const router = createBrowserRouter(routes);

/**
 * App component renders the router provider
 */
export const App: React.FC = () => {
  return <RouterProvider router={router} />;
};

export default App;
