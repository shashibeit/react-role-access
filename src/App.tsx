/**
 * App Component
 * Main application component that sets up routing
 * Initializes auth from redirect cookies or mock data
 */

import React, { useEffect } from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { routes } from './routes/routes';
import { initializeAuthFromCookies } from './store/authSlice';
import { AppDispatch } from './store/store';

/**
 * Create browser router with configured routes
 */
const router = createBrowserRouter(routes);

/**
 * App component renders the router provider
 * Calls auth handlers on mount to initialize user session
 */
export const App: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  /**
   * Initialize auth on app mount
   * Priority:
   * 1. Try to initialize from redirect cookies (if coming from auth portal)
   * 2. If no cookies found, app uses mock data
   */
  useEffect(() => {
    dispatch(initializeAuthFromCookies());
  }, [dispatch]);

  return <RouterProvider router={router} />;
};

export default App;
