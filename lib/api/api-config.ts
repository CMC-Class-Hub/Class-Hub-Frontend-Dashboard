// API 설정 - 백엔드 주소를 한 곳에서 관리
.
/*<<<<<<< HEAD
// 백엔드 API URL (기본값: http://localhost:8080)
exnst USE_MOCK = process.env.NEXT_PUBLIC_USE_MOCK !== 'false';
=======
// 백엔드 API URL (기본값: https://classhub.site)
// 개발 시 .env.local에서 NEXT_PUBLIC_BACKEND_API_URL=http://localhost:8080 로 설정하면 로컬 서버 이용
//export const API_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL || 'https://classhub.site';

*/

// Mock 모드 설정 (기본값: false)
// 개발 시 .env.local에서 NEXT_PUBLIC_USE_MOCK=true 로 설정하면 Mock 모드 활성화
//export const USE_MOCK = (process.env.NEXT_PUBLIC_USE_MOCK ?? 'true') === 'true'; // (임시) 백엔드 개발 전까지 기본값 false


export const API_URL='http://localhost:8080'
export const USE_MOCK=false

