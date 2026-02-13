import type { IAuthApi, LoginRequest, SignUpRequest, LoginResponse, User } from '../types';
import { delay, generateId } from './storage';

const AUTH_KEY = 'classhub_auth_user';
const USERS_KEY = 'classhub_users';

// Helper to get users from localStorage
const getUsers = (): User[] => {
    if (typeof window === 'undefined') return [];
    const data = localStorage.getItem(USERS_KEY);
    return data ? JSON.parse(data) : [];
};

// Helper to save users to localStorage
const saveUsers = (users: User[]): void => {
    if (typeof window === 'undefined') return;
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
};

export const authApiMock: IAuthApi = {
    async login({ email, password }: LoginRequest): Promise<LoginResponse> {
        await delay(500); // Simulate network latency



        const users = getUsers();
        const user = users.find(u => u.email === email);

        if (!user) {
            throw new Error('등록되지 않은 이메일입니다.');
        }

        const savedPassword = localStorage.getItem(`password_${email}`);
        if (savedPassword !== password) {
            throw new Error('비밀번호가 일치하지 않습니다.');
        }

        // Save session
        localStorage.setItem(AUTH_KEY, JSON.stringify(user));

        return { userId: parseInt(user.id.split('_')[1]) || 1, accessToken: 'mock-jwt-token' };
    },

    async signUp({ email, name, password, phoneNumber }: SignUpRequest): Promise<LoginResponse> {
        await delay(500);
        const users = getUsers();

        if (users.find(u => u.email === email)) {
            throw new Error('이미 가입된 이메일입니다.');
        }

        const newUser: User = {
            id: `instructor_${Date.now()}`,
            email,
            name,
            phoneNumber,
            role: 'instructor',
            createdAt: new Date().toISOString(),
        };

        users.push(newUser);
        saveUsers(users);

        // Save password separately (simple imitation)
        localStorage.setItem(`password_${email}`, password);

        return { userId: parseInt(newUser.id.split('_')[1]), accessToken: 'mock-jwt-token' };
    },

    async logout(): Promise<void> {
        await delay(200);
        localStorage.removeItem(AUTH_KEY);
    },

    async getCurrentUser(): Promise<User | null> {
        // Check localStorage immediately but simulate async return
        if (typeof window === 'undefined') return null;
        const data = localStorage.getItem(AUTH_KEY);
        return data ? JSON.parse(data) : null;
    },

    async isLoggedIn(): Promise<boolean> {
        const user = await this.getCurrentUser();
        return user !== null;
    },

    async refresh(): Promise<void> {
        await delay(200);
        // Mock refresh always succeeds if we are here
    }
};
