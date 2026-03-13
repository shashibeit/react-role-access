/**
 * App Component
 * Main application component that sets up routing
 */

import React, { useEffect } from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { routes } from './routes/routes';
import { fetchCurrentUser, selectAuthToken } from './store/authSlice';
import { AppDispatch } from './store/store';

/**
 * Create browser router with configured routes
 */
const router = createBrowserRouter(routes);

/**
 * App component renders the router provider
 */
export const App: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const token = useSelector(selectAuthToken);

  /**
   * Fetch current user on app mount if token exists
   * This hydrates auth state from localStorage
   */
  useEffect(() => {
    if (token) {
      dispatch(fetchCurrentUser());
    }
  }, []);

  return <RouterProvider router={router} />;
};

export default App;
