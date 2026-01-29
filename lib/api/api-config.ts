// API 설정 - 백엔드 주소를 한 곳에서 관리

// 백엔드 API URL
export const API_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL || 'https://classhub.site';

// Mock 모드 설정 (환경변수로 제어, 기본값: false)
// .env.local에서 NEXT_PUBLIC_USE_MOCK=true 로 설정하면 Mock 모드 활성화
export const USE_MOCK = (process.env.NEXT_PUBLIC_USE_MOCK ?? 'true') === 'true';
