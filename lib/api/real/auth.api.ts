import type { IAuthApi, LoginRequest, SignUpRequest, AuthResponse, User } from '../types';
import { API_URL } from '../api-config';

export const authApiReal: IAuthApi = {
    async login(data: LoginRequest): Promise<AuthResponse> {
        const response = await fetch(`${API_URL}/api/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || '로그인에 실패했습니다.');
        }

        const result = await response.json();
        return result.data;
    },

    async signUp(data: SignUpRequest): Promise<AuthResponse> {
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
        return result.data;
    },

    async logout(): Promise<void> {
        const response = await fetch(`${API_URL}/api/auth/logout`, {
            method: 'POST',
        });

        if (!response.ok) {
            throw new Error('로그아웃에 실패했습니다.');
        }
    },

    async getCurrentUser(): Promise<User | null> {
        const response = await fetch(`${API_URL}/api/auth/me`);
        if (!response.ok) return null;

        const result = await response.json();
        return result.data;
    },

    async isLoggedIn(): Promise<boolean> {
        const user = await this.getCurrentUser();
        return user !== null;
    }
};
