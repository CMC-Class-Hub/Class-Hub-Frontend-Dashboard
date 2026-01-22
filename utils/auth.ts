// 간단한 임의 인증 시스템 (localStorage 기반)

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'instructor';
  createdAt: string;
}

const AUTH_KEY = 'classhub_auth_user';
const USERS_KEY = 'classhub_users';

// 사용자 목록 가져오기
export const getUsers = (): User[] => {
  if (typeof window === 'undefined') return [];
  const data = localStorage.getItem(USERS_KEY);
  return data ? JSON.parse(data) : [];
};

// 사용자 저장
const saveUsers = (users: User[]): void => {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
};

// 회원가입
export const signUp = (email: string, name: string, password: string): { success: boolean; error?: string; user?: User } => {
  const users = getUsers();

  // 이메일 중복 체크
  if (users.find(u => u.email === email)) {
    return { success: false, error: '이미 가입된 이메일입니다.' };
  }

  const newUser: User = {
    id: `instructor_${Date.now()}`,
    email,
    name,
    role: 'instructor',
    createdAt: new Date().toISOString(),
  };

  users.push(newUser);
  saveUsers(users);

  // 비밀번호 저장 (간단한 구현)
  localStorage.setItem(`password_${email}`, password);

  return { success: true, user: newUser };
};

// 로그인
export const login = (email: string, password: string): { success: boolean; error?: string; user?: User } => {
  const users = getUsers();
  const user = users.find(u => u.email === email);

  if (!user) {
    return { success: false, error: '등록되지 않은 이메일입니다.' };
  }

  const savedPassword = localStorage.getItem(`password_${email}`);
  if (savedPassword !== password) {
    return { success: false, error: '비밀번호가 일치하지 않습니다.' };
  }

  // 로그인 상태 저장
  localStorage.setItem(AUTH_KEY, JSON.stringify(user));

  // instructor ID도 저장 (기존 시스템과 호환)
  localStorage.setItem('ops_current_instructor', user.id);

  return { success: true, user };
};

// 로그아웃
export const logout = (): void => {
  localStorage.removeItem(AUTH_KEY);
};

// 현재 로그인된 사용자 가져오기
export const getCurrentUser = (): User | null => {
  if (typeof window === 'undefined') return null;
  const data = localStorage.getItem(AUTH_KEY);
  return data ? JSON.parse(data) : null;
};

// 로그인 상태 확인
export const isLoggedIn = (): boolean => {
  return getCurrentUser() !== null;
};
