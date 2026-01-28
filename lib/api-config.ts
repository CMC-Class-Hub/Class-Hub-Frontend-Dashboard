// API 설정 - 백엔드 주소를 한 곳에서 관리

export const API_URL = process.env.BACKEND_API_URL || 'https://classhub.site';

export const API_ENDPOINTS = {
  health: `${API_URL}/health`,
  // 추후 API 엔드포인트 추가
  // auth: {
  //   login: `${API_URL}/auth/login`,
  //   signup: `${API_URL}/auth/signup`,
  // },
} as const;
