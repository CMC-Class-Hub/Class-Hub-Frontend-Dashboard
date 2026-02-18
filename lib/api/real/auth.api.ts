import type { IAuthApi, LoginRequest, SignUpRequest, LoginResponse, User } from '../types';
import { API_URL } from '../api-config';
import { fetchClient } from '../fetch-client';

const AUTH_KEY = 'classhub_auth_user';

export const authApiReal: IAuthApi = {
    async login(data: LoginRequest): Promise<LoginResponse> {
        const loginData = {
            email: data.email,
            password: data.password
        };

        const response = await fetch(`${API_URL}/api/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(loginData),
            credentials: 'include'
        });

        if (!response.ok) {
            let errorMessage = '로그인에 실패했습니다.';
            try {
                const error = await response.json();
                errorMessage = error.message || errorMessage;
            } catch (e) { }
            throw new Error(errorMessage);
        }

        const result: LoginResponse = await response.json();
        // 사용자 정보 저장
        const user: User = {
            id: result.userId.toString(),
            email: data.email,
            name: result.name,
            phoneNumber: result.phoneNumber || result.phone || result.PhoneNumber,
            role: result.role?.toLowerCase(),
            createdAt: new Date().toISOString(),
        };
        localStorage.setItem(AUTH_KEY, JSON.stringify(user));

        return result;
    },

    async signUp(data: SignUpRequest): Promise<any> {
        const response = await fetch(`${API_URL}/api/auth/signup`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
            credentials: 'include'
        });

        if (!response.ok) {
            let errorMessage = '회원가입에 실패했습니다.';
            try {
                const error = await response.json();
                errorMessage = error.message || errorMessage;
            } catch (e) { }
            throw new Error(errorMessage);
        }

        return await response.json();
    },

    async logout(): Promise<void> {
        try {
            await fetch(`${API_URL}/api/auth/logout`, {
                method: 'POST',
                credentials: 'include'
            });
        } catch (error) {
            console.error('Logout request failed', error);
        } finally {
            localStorage.removeItem(AUTH_KEY);
        }
    },

    async getCurrentUser(): Promise<User | null> {
        if (typeof window === 'undefined') return null;

        const userData = localStorage.getItem(AUTH_KEY);
        if (!userData) return null;

        try {
            // 1. 현재 상태 확인
            let response = await fetchClient('/api/auth/status', {
                method: 'GET',
            });

            if (response.ok) {
                let data = await response.json();
                let loggedIn = data.isLoggedIn ?? data.loggedIn;

                // 2. 만약 로그인이 안 되어 있다고 나오는데 로컬 데이터는 있다면, 토큰 갱신 시도
                if (!loggedIn) {
                    try {
                        await this.refresh();
                        // 갱신 성공 후 다시 상태 확인
                        response = await fetchClient('/api/auth/status', { method: 'GET' });
                        if (response.ok) {
                            data = await response.json();
                            loggedIn = data.isLoggedIn ?? data.loggedIn;
                        }
                    } catch (refreshError) {
                        console.error('[authApi] Manual refresh failed:', refreshError);
                    }
                }

                if (loggedIn) {
                    return JSON.parse(userData);
                }
            }
        } catch (error) {
            console.error('[authApi] Error during getCurrentUser status check:', error);
            // 에러 발생 시 일단 로컬 데이터 반환 (다음 API 요청에서 401 뜨면 처리됨)
            return JSON.parse(userData);
        }

        console.warn('[authApi] User session invalid. Clearing local data.');
        localStorage.removeItem(AUTH_KEY);
        return null;
    },

    async isLoggedIn(): Promise<boolean> {
        if (typeof window === 'undefined') return false;
        const user = await this.getCurrentUser();
        return !!user;
    },

    async refresh(): Promise<void> {
        const response = await fetch(`${API_URL}/api/auth/refresh`, {
            method: 'POST',
            credentials: 'include'
        });

        if (!response.ok) {
            throw new Error('토큰 갱신에 실패했습니다.');
        }
    }
};