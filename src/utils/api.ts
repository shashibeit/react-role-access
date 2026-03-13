/**
 * API Client Utility
 * Helper functions for making API calls to Mirage mock server
 */

/**
 * Generic API request function
 * Wraps fetch calls with error handling and JSON serialization
 */
async function apiRequest<T>(
  url: string,
  options?: RequestInit
): Promise<T> {
  const response = await fetch(`/api${url}`, {
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
    ...options,
  });

  if (!response.ok) {
    throw new Error(`API Error: ${response.status} ${response.statusText}`);
  }

  return response.json() as Promise<T>;
}

/**
 * GET request helper
 */
export async function apiGet<T>(url: string): Promise<T> {
  return apiRequest<T>(url, { method: 'GET' });
}

/**
 * POST request helper
 */
export async function apiPost<T>(url: string, data?: unknown): Promise<T> {
  return apiRequest<T>(url, {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

/**
 * PUT request helper
 */
export async function apiPut<T>(url: string, data?: unknown): Promise<T> {
  return apiRequest<T>(url, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
}

/**
 * DELETE request helper
 */
export async function apiDelete<T>(url: string): Promise<T> {
  return apiRequest<T>(url, { method: 'DELETE' });
}

/**
 * TODO: Add error handling utilities
 * TODO: Add request/response interceptors
 * TODO: Add retry logic
 * TODO: Add caching strategy
 */
