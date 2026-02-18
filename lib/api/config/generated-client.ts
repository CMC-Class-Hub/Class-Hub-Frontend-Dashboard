import { Configuration } from '../generated';
import { API_URL } from './api-config';
import { fetchClient } from './fetch-client';

/**
 * 자동 생성된 API 클라이언트가 사용할 공통 설정입니다.
 * 기존 fetchClient를 주입하여 인증 토큰 처리 및 401 재시도 로직을 재사용합니다.
 */
export const apiConfig = new Configuration({
    basePath: API_URL,
    fetchApi: async (input, init) => {
        let endpoint = input.toString();

        // API_URL (http://localhost:8080)이 붙어있다면 제거하여 상대 경로로 변환
        // 이유: fetchClient 내부에서 다시 API_URL을 붙이기 때문 (중복 방지)
        if (endpoint.startsWith(API_URL)) {
            endpoint = endpoint.replace(API_URL, '');
        }

        // 기존 fetchClient에 위임하여 토큰 갱신 로직 태우기
        return fetchClient(endpoint, init);
    }
});
