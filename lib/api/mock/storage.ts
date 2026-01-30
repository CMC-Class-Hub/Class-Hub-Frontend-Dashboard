/**
 * Mock 전용 localStorage 헬퍼
 * - 모든 Mock API에서 이 파일만 사용
 * - UI에서 직접 import 금지
 */

import type {
  ClassTemplate,
  ClassSession,
  Student,
  Application,
  MessageTemplate,
  Message,
} from '../types';

// ============================================================
// Storage Keys
// ============================================================

export const STORAGE_KEYS = {
  TEMPLATES: 'ops_templates',
  SESSIONS: 'ops_sessions',
  STUDENTS: 'ops_students',
  APPLICATIONS: 'ops_applications',
  MESSAGE_TEMPLATES: 'ops_message_templates',
  MESSAGES: 'ops_messages',
  CURRENT_INSTRUCTOR: 'ops_current_instructor',
} as const;

// ============================================================
// Generic Storage Helpers
// ============================================================

const isClient = typeof window !== 'undefined';

export function getItem<T>(key: string, defaultValue: T[] = []): T[] {
  if (!isClient) return defaultValue;
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : defaultValue;
  } catch {
    return defaultValue;
  }
}

export function setItem<T>(key: string, value: T[]): void {
  if (!isClient) return;
  localStorage.setItem(key, JSON.stringify(value));
}

export function removeItem(key: string): void {
  if (!isClient) return;
  localStorage.removeItem(key);
}

// ============================================================
// Typed Storage Accessors
// ============================================================

// Templates
export const getTemplates = (): ClassTemplate[] =>
  getItem<ClassTemplate>(STORAGE_KEYS.TEMPLATES);

export const setTemplates = (templates: ClassTemplate[]): void =>
  setItem(STORAGE_KEYS.TEMPLATES, templates);

// Sessions
export const getSessions = (): ClassSession[] =>
  getItem<ClassSession>(STORAGE_KEYS.SESSIONS);

export const setSessions = (sessions: ClassSession[]): void =>
  setItem(STORAGE_KEYS.SESSIONS, sessions);

// Students
export const getStudents = (): Student[] =>
  getItem<Student>(STORAGE_KEYS.STUDENTS);

export const setStudents = (students: Student[]): void =>
  setItem(STORAGE_KEYS.STUDENTS, students);

// Applications
export const getApplications = (): Application[] =>
  getItem<Application>(STORAGE_KEYS.APPLICATIONS);

export const setApplications = (applications: Application[]): void =>
  setItem(STORAGE_KEYS.APPLICATIONS, applications);

// Message Templates
export const getMessageTemplates = (): MessageTemplate[] =>
  getItem<MessageTemplate>(STORAGE_KEYS.MESSAGE_TEMPLATES);

export const setMessageTemplates = (templates: MessageTemplate[]): void =>
  setItem(STORAGE_KEYS.MESSAGE_TEMPLATES, templates);

// ============================================================
// Utility Functions
// ============================================================

// Simple sequential ID generator
export const generateId = (prefix: string): string => {
  if (typeof window === 'undefined') {
    return `${prefix}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  const countersKey = 'ops_id_counters';
  const countersStr = localStorage.getItem(countersKey);
  const counters = countersStr ? JSON.parse(countersStr) : {};

  const currentCount = counters[prefix] || 0;
  const nextCount = currentCount + 1;

  counters[prefix] = nextCount;
  localStorage.setItem(countersKey, JSON.stringify(counters));

  return String(nextCount);
};

export const generateLinkId = (): string => {
  return Math.random().toString(36).substr(2, 12);
};

export const delay = (ms: number = 100): Promise<void> =>
  new Promise(resolve => setTimeout(resolve, ms));

// Messages
export const getMessages = (): Message[] => {
  if (typeof window === 'undefined') return [];
  const data = localStorage.getItem('ops_messages');
  return data ? JSON.parse(data) : [];
};

export const saveMessage = (message: Message): void => {
  const messages = getMessages();
  const index = messages.findIndex(m => m.id === message.id);
  if (index >= 0) {
    messages[index] = message;
  } else {
    messages.push(message);
  }
  localStorage.setItem('ops_messages', JSON.stringify(messages));
};
