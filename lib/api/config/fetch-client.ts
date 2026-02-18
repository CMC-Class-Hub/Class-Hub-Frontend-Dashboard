import { API_URL } from './api-config';

// 토큰 갱신 중임을 나타내는 변수 및 큐
let isRefreshing = false;
let refreshSubscribers: (() => void)[] = [];

// 토큰 갱신 완료 시 대기 중인 요청들에게 알림
const onRefreshed = () => {
  refreshSubscribers.forEach(cb => cb());
  refreshSubscribers = [];
};

// 토큰 갱신 실패 시
const onRefreshFailed = () => {
  refreshSubscribers.forEach(cb => cb());
  refreshSubscribers = [];
};

export async function fetchClient(
  endpoint: string,
  options: RequestInit = {}
) {
  const url = endpoint.startsWith('http')
    ? endpoint
    : `${API_URL}${endpoint}`;

  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string> || {}),
  };

  const makeRequest = () => fetch(url, {
    ...options,
    headers,
    credentials: 'include'
  });

  try {
    let response = await makeRequest();

    // 401 Unauthorized 발생 시
    if (response.status === 401) {
      
      // 이미 갱신 중이라면 대기 리스트에 추가
      if (isRefreshing) {
        return new Promise<Response>((resolve) => {
          refreshSubscribers.push(() => {
            resolve(makeRequest());
          });
        });
      }

      isRefreshing = true;

      try {
        // 토큰 갱신 API 호출
        const refreshResponse = await fetch(`${API_URL}/api/auth/refresh`, {
          method: 'POST',
          credentials: 'include'
        });

        if (refreshResponse.ok) {
          isRefreshing = false;
          onRefreshed();
          return await makeRequest();
        } else {
          console.error('[fetchClient] Token refresh failed (refresh token expired?).');
          isRefreshing = false;
          onRefreshFailed();
          handleUnauthorized();
          return response;
        }
      } catch (error) {
        console.error('[fetchClient] Token refresh failed due to network error:', error);
        isRefreshing = false;
        onRefreshFailed();
        handleUnauthorized();
        throw error;
      }
    }

    return response;
  } catch (error) {
    console.error(`[fetchClient] Network error for ${endpoint}:`, error);
    throw error;
  }
}

function handleUnauthorized() {
  if (typeof window !== 'undefined') {
    console.warn('[fetchClient] Unauthorized access. Redirecting to login.');
    localStorage.removeItem('classhub_auth_user');

    if (!window.location.pathname.startsWith('/login')) {
      window.location.href = '/login';
    }
  }
}
