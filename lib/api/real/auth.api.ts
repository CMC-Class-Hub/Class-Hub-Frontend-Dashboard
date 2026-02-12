import type { IAuthApi, LoginRequest, SignUpRequest, AuthResponse, LoginResponse, User } from '../types';
import { API_URL } from '../api-config';

const TOKEN_KEY = 'classhub_auth_token';
const AUTH_KEY = 'classhub_auth_user';

export const authApiReal: IAuthApi = {
    async login(data: LoginRequest): Promise<LoginResponse> {
        const response = await fetch(`${API_URL}/api/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || '로그인에 실패했습니다.');
        }

        const result: LoginResponse = await response.json();

        // ✅ 토큰과 사용자 정보를 localStorage에 저장!
        if (result.accessToken) {
            localStorage.setItem(TOKEN_KEY, result.accessToken);
            // 사용자 정보 저장
            const user: User = {
                id: result.userId.toString(),
                email: data.email,
                name: result.name,
                phoneNumber: result.PhoneNumber,
                role: data.email === 'admin@admin.admin' ? 'admin' : 'instructor',
                createdAt: new Date().toISOString(),
            };
            localStorage.setItem(AUTH_KEY, JSON.stringify(user));
        }

        return result;
    },

    async signUp(data: SignUpRequest): Promise<LoginResponse> {
        const response = await fetch(`${API_URL}/api/auth/signup`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || '회원가입에 실패했습니다.');
        }

        const result = await response.json();
        return result;
    },

    async logout(): Promise<void> {
        try {
            localStorage.removeItem(TOKEN_KEY);
            localStorage.removeItem(AUTH_KEY);
        } catch (error) {
        }
    },

    async getCurrentUser(): Promise<User | null> {
        // ✅ localStorage에서 사용자 정보 가져오기
        if (typeof window === 'undefined') return null;

        const token = localStorage.getItem(TOKEN_KEY);
        const userData = localStorage.getItem(AUTH_KEY);
        // 토큰이 없으면 로그아웃 상태
        if (!token) {
            localStorage.removeItem(AUTH_KEY);
            return null;
        }

        return userData ? JSON.parse(userData) : null;
    },

    async isLoggedIn(): Promise<boolean> {
        try {
            const token = localStorage.getItem(TOKEN_KEY);

            if (!token) {
                return false;
            }

            const response = await fetch(`${API_URL}/api/auth/status`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            });

            if (!response.ok) {
                return false;
            }

            const data = await response.json();
            return data.loggedIn;
        } catch (error) {
            return false;
        }
    }
};