
import { API_URL } from './api-config';

const TOKEN_KEY = 'classhub_auth_token';

interface FetchOptions extends RequestInit {
  headers?: Record<string, string>;
}

export async function fetchClient(endpoint: string, options: FetchOptions = {}) {
  // Ensure endpoint starts with / if not present (unless it's a full URL, but we assume endpoint paths)
  // Actually, let's just use it as is, assuming the caller passes the path starting with / or not.
  // Standardize: Caller passes '/api/foo'.

  const url = endpoint.startsWith('http') ? endpoint : `${API_URL}${endpoint}`;

  const token = typeof window !== 'undefined' ? localStorage.getItem(TOKEN_KEY) : null;

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers || {}),
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const config = {
    ...options,
    headers,
  };

  const response = await fetch(url, config);
  return response;
}
