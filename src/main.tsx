/**
 * main.tsx
 * Entry point for the React 19 application
 * Renders App component to the DOM
 */

import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './App';
import { store } from './store/store';
import './index.css';

/**
 * Initialize Mirage JS mock server for development
 * This intercepts API calls and returns mock data
 * TODO: Disable in production build
 */
if (process.env.NODE_ENV === 'development') {
  const { makeServer } = await import('./mocks/server');

  makeServer({ environment: 'development' });
  console.log('[Development] Mirage JS mock server started');
}

/**
 * Mount React application to the root element
 * TODO: Consider adding error boundary for global error handling
 * TODO: Add performance monitoring tools
 * TODO: Add analytics tracking
 */
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
