// API 설정 - 환경변수 기반

export const API_URL =
  process.env.NEXT_PUBLIC_BACKEND_API_URL ?? 'http://localhost:8080';

export const CLASS_LINK_URL =
  process.env.NEXT_PUBLIC_CLASS_LINK_URL ?? 'http://localhost:3001';

export const USE_MOCK = false; // 필요할 때 true로 변경