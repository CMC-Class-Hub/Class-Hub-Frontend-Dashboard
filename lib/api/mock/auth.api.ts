import type { IAuthApi, LoginRequest, SignUpRequest, AuthResponse, User } from '../types';
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
    async login({ email, password }: LoginRequest): Promise<AuthResponse> {
        await delay(500); // Simulate network latency

        // 데모 계정 자동 생성 로직
        if (email === 'demo@classhub.com' && password === '1234') {
            const users = getUsers();
            let demoUser = users.find(u => u.email === email);

            if (!demoUser) {
                demoUser = {
                    id: 'demo-instructor',
                    email: 'demo@classhub.com',
                    name: '데모 강사',
                    phoneNumber: '010-1234-5678',
                    role: 'instructor',
                    createdAt: new Date().toISOString(),
                };
                users.push(demoUser);
                saveUsers(users);
                localStorage.setItem(`password_${email}`, password);
            }

            // 세션 저장
            localStorage.setItem(AUTH_KEY, JSON.stringify(demoUser));
            return { user: demoUser, token: 'mock-jwt-token' };
        }

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

        return { user, token: 'mock-jwt-token' };
    },

    async signUp({ email, name, password, phoneNumber }: SignUpRequest): Promise<AuthResponse> {
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

        return { user: newUser };
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
    }
};
