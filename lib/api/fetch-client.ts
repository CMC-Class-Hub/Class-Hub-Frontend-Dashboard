import { API_URL } from './api-config';

const TOKEN_KEY = 'classhub_auth_token';

interface FetchOptions extends RequestInit {
  headers?: Record<string, string>;
}

export async function fetchClient(
  endpoint: string,
  options: FetchOptions = {}
) {
  const url = endpoint.startsWith('http')
    ? endpoint
    : `${API_URL}${endpoint}`;

  const token =
    typeof window !== 'undefined'
      ? localStorage.getItem(TOKEN_KEY)
      : null;

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers || {}),
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(url, {
    ...options,
    headers,
  });

  // 🔥 여기서 전역 401 처리
  if (response.status === 401) {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(TOKEN_KEY);

      alert('로그인이 만료되었습니다. 다시 로그인해주세요.');
      window.location.href = '/login';
    }

    throw new Error('UNAUTHORIZED');
  }

  return response;
}
