/**
 * API 서비스 진입점
 * - USE_MOCK 설정에 따라 Mock/Real API 자동 선택
 * - 컴포넌트에서는 이 파일에서만 import
 */

import { USE_MOCK } from './api-config';

// Mock APIs
import {
  templateApiMock,
  sessionApiMock,
  studentApiMock,
  applicationApiMock,
  messageTemplateApiMock,
  messageHistoryApiMock,
  authApiMock,
  initializeDemoData as initializeDemoDataMock,
} from './mock';

// Real APIs
import {
  templateApiReal,
  sessionApiReal,
  studentApiReal,
  applicationApiReal,
  messageTemplateApiReal,
  messageHistoryApiReal,
  authApiReal,
} from './real';

// Types
import type {
  ITemplateApi,
  ISessionApi,
  IStudentApi,
  IApplicationApi,
  IMessageTemplateApi,
  IAuthApi,
  IMessageHistoryApi,
} from './types';

// ============================================================
// API 스위칭 (이 파일에서만!)
// ============================================================

export const templateApi: ITemplateApi = USE_MOCK ? templateApiMock : templateApiReal;
export const sessionApi: ISessionApi = USE_MOCK ? sessionApiMock : sessionApiReal;
export const studentApi: IStudentApi = USE_MOCK ? studentApiMock : studentApiReal;
export const applicationApi: IApplicationApi = USE_MOCK ? applicationApiMock : applicationApiReal;
export const messageTemplateApi: IMessageTemplateApi = USE_MOCK ? messageTemplateApiMock : messageTemplateApiReal;
export const messageHistoryApi: IMessageHistoryApi = USE_MOCK ? messageHistoryApiMock : messageHistoryApiReal;
export const authApi: IAuthApi = USE_MOCK ? authApiMock : authApiReal;

// 데모 데이터 초기화 (Mock 모드에서만 동작)
export const initializeDemoData = async (instructorId: string): Promise<void> => {
  if (USE_MOCK) {
    await initializeDemoDataMock(instructorId);
  }
};

// ============================================================
// Re-exports (컴포넌트에서 타입도 여기서 import)
// ============================================================

// Types
export type {
  // Domain types
  ClassTemplate,
  ClassSession,
  ClassInfo,
  Application,
  Student,
  MessageTemplate,
  Notification,
  // Status types
  ClassStatus,
  ClassTemplateStatus,
  ApplicationStatus,
  PaymentMethod,
  PaymentStatus,
  AttendanceResponse,
  TrustLevel,
  NotificationType,
  MessageTemplateType,
  // Request types
  CreateTemplateRequest,
  UpdateTemplateRequest,
  CreateSessionRequest,
  UpdateSessionRequest,
  CreateStudentRequest,
  UpdateStudentRequest,
  CreateApplicationRequest,
  UpdateApplicationRequest,
  // Response types
  ApiResponse,
  ApiError,
  // API interfaces
  // API interfaces
  ITemplateApi,
  ISessionApi,
  IStudentApi,
  IApplicationApi,
  IMessageTemplateApi,
  IMessageHistoryApi,
  // Message extension
  Message,
  MessageType,
  MessageStatus,
  InstructorSettings,
  // Auth types
  User,
  LoginRequest,
  SignUpRequest,
  AuthResponse,
  IAuthApi,
} from './types';

// Config
export { API_URL, USE_MOCK } from './api-config';

// API 객체 (편의용)
export const api = {
  templates: templateApi,
  sessions: sessionApi,
  students: studentApi,
  applications: applicationApi,
  messageTemplates: messageTemplateApi,
  messageHistory: messageHistoryApi,
  auth: authApi,
  initializeDemoData,
};

export default api;
