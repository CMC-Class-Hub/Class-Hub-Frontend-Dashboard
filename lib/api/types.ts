// ============================================================
// Domain Types (DTO)
// ============================================================

// Status Types
export type ClassStatus = 'RECRUITING' | 'CLOSED' | 'FULL';
export type ClassTemplateStatus = 'ACTIVE' | 'INACTIVE';
export type ApplicationStatus = 'PENDING' | 'CONFIRMED' | 'CANCELLED' | 'TIMEOUT' | 'NO_SHOW' | 'ATTENDED';
export type PaymentMethod = 'CARD' | 'ACCOUNT';
export type PaymentStatus = 'PENDING' | 'COMPLETED' | 'FAILED';
export type AttendanceResponse = 'ATTENDING' | 'CANCELLED' | 'NO_RESPONSE';
export type TrustLevel = 'NORMAL' | 'CAUTION' | 'WARNING';
export type NotificationType = 'D-3' | 'D-1' | 'PAYMENT_REMINDER' | 'CONFIRMATION' | 'CANCELLATION';
export type MessageTemplateType = 'D-3' | 'D-1' | 'APPLY_CONFIRMED';

// Class Template
export interface ClassTemplate {
  id: string;
  name: string;
  description?: string;
  location: string;
  locationDetails?: string;
  preparation?: string;
  instructions?: string;
  notes?: string;
  depositAmount?: number;
  cancellationPolicy?: string;
  noShowPolicy?: string;
  images?: string[];
  parkingInfo?: string;
  classCode?: string;
  instructorId: string;
  status?: ClassTemplateStatus;
  createdAt?: string;
  guidelines?: string;
  linkShareStatus?: string;
  imageUrls?: string[];
}

// Class Session
export interface ClassSession {
  id: string;
  templateId: string;
  instructorId: string;
  date: string;
  startTime: string;
  endTime: string;
  status: ClassStatus;
  currentNum: number;
  capacity: number;
  price: number;
  linkId: string;
  createdAt: string;
}

// Legacy ClassInfo (for backward compatibility)
export interface ClassInfo {
  id: string;
  instructorId: string;
  name: string;
  date: string;
  startTime: string;
  endTime: string;
  location: string;
  preparation: string;
  instructions: string;
  capacity: number;
  depositAmount: number;
  cancellationPolicy: string;
  noShowPolicy: string;
  status: ClassStatus;
  autoClose: boolean;
  createdAt: string;
  linkId: string;
}

// Application
export interface Application {
  id: string;
  classId: string;
  studentId: string;
  applicantName?: string;
  phoneNumber?: string;
  reservationId?: number;
  status: ApplicationStatus;
  paymentMethod?: PaymentMethod;
  paymentStatus: PaymentStatus;
  depositAmount: number;
  paymentTime?: string;
  refundEligible: boolean;
  refundTime?: string;
  confirmedAt?: string;
  attendanceResponse?: AttendanceResponse;
  responseTime?: string;
  appliedAt: string;
  sentD3Notification?: boolean;
  sentD1Notification?: boolean;
}

// Student
export interface Student {
  id: string;
  name: string;
  email: string;
  phone: string;
  applicationCount: number;
  cancellationCount: number;
  noResponseCount: number;
  noShowCount: number;
  attendedCount: number;
  trustLevel: TrustLevel;
  lastAttendedAt?: string;
  createdAt: string;
}



// Notification
export interface Notification {
  id: string;
  type: NotificationType;
  applicationId: string;
  studentId: string;
  classId: string;
  sentAt: string;
  success: boolean;
  message: string;
}

// ============================================================
// Message Types
// ============================================================

export type MessageType = 'D-3' | 'D-1' | 'CONFIRMED' | 'CANCELLED';
export type MessageStatus = 'PENDING' | 'SENT' | 'FAILED';

export interface Message {
  id: string;
  sessionId: string;
  studentId: string;
  type: MessageType;
  status: MessageStatus;
  scheduledAt: string;
  sentAt?: string;
  content: string;
}

export interface InstructorSettings {
  instructorId: string;
  bankName: string;
  accountNumber: string;
  accountHolder: string;
  autoMessageEnabled: boolean;
  createdAt: string;
  updatedAt: string;
}

// ============================================================
// Auth Types
// ============================================================

export interface User {
  id: string;
  email: string;
  name?: string;
  phoneNumber?: string;
  role: 'instructor';
  createdAt: string;
}

export interface LoginRequest {
  email: string;
  password: string;
  name?: string; // Optional for login, but might be used if unified
}

export interface SignUpRequest {
  email: string;
  password: string;
  name: string;
  phoneNumber: string;
}

export interface LoginResponse {
  userId: number;
  accessToken?: string;
  name?: string;
  PhoneNumber?: string;
}

export interface AuthResponse {
  user: User;
  token?: string;
}

export interface InstructorUpdateRequest {
  name?: string;
  email?: string;
  phoneNumber?: string;
  password?: string;
}

export interface IInstructorApi {
  updateProfile(instructorId: string, data: InstructorUpdateRequest): Promise<void>;
}

// ============================================================
// API Request Types
// ============================================================

export interface CreateTemplateRequest {
  name: string;
  description?: string;
  location: string;
  locationDetails?: string;
  preparation?: string;
  instructions?: string;
  notes?: string;

  depositAmount?: number;
  cancellationPolicy?: string;
  noShowPolicy?: string;
  images?: string[];
  parkingInfo?: string;
}

export interface UpdateTemplateRequest extends Partial<CreateTemplateRequest> {
  status?: ClassTemplateStatus;
}

export interface CreateSessionRequest {
  templateId: string;
  date: string;
  startTime: string;

  endTime: string;
  capacity: number;
  price: number;
}

export interface UpdateSessionRequest {
  date?: string;
  startTime?: string;
  endTime?: string;
  capacity?: number;
  price?: number;
  status?: ClassStatus;
}

export interface CreateStudentRequest {
  name: string;
  email: string;
  phone: string;
}

export interface UpdateStudentRequest extends Partial<CreateStudentRequest> {
  trustLevel?: TrustLevel;
}

export interface CreateApplicationRequest {
  sessionId: string;
  studentId: string;
  depositAmount: number;
}

export interface UpdateApplicationRequest {
  status?: ApplicationStatus;
  paymentStatus?: PaymentStatus;
}

// ============================================================
// API Response Types
// ============================================================

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

export interface ApiError {
  success: false;
  message: string;
  code?: string;
}

// ============================================================
// API Service Interfaces
// ============================================================

export interface ITemplateApi {
  getAll(instructorId: string): Promise<ClassTemplate[]>;
  getById(id: string, instructorId: string): Promise<ClassTemplate | null>;
  create(instructorId: string, data: CreateTemplateRequest): Promise<ClassTemplate>;
  update(id: string, data: UpdateTemplateRequest): Promise<ClassTemplate>;
  delete(id: string): Promise<void>;
  updateLinkShareStatus(templateId: string, status: 'ENABLED' | 'DISABLED'): Promise<ClassTemplate>;
}

export interface ISessionApi {
  getByTemplateId(templateId: string): Promise<ClassSession[]>;
  getById(id: string): Promise<ClassSession | null>;
  create(instructorId: string, data: CreateSessionRequest): Promise<ClassSession>;
  update(id: string, data: UpdateSessionRequest): Promise<ClassSession>;
  delete(id: string): Promise<void>;
  updateStatus(id: string, status: 'RECRUITING' | 'CLOSED' | 'FULL'): Promise<ClassSession>;
}

export interface IStudentApi {
  getAll(): Promise<Student[]>;
  getById(id: string): Promise<Student | null>;
  getByEmail(email: string): Promise<Student | null>;
  create(data: CreateStudentRequest): Promise<Student>;
  update(id: string, data: UpdateStudentRequest): Promise<Student>;
}

export interface IApplicationApi {
  getAll(): Promise<Application[]>;
  getBySessionId(sessionId: string): Promise<Application[]>;
  getById(id: string): Promise<Application | null>;
  create(data: CreateApplicationRequest): Promise<Application>;
  update(id: string, data: UpdateApplicationRequest): Promise<Application>;
}

// Message Template List Item
export interface MessageTemplateListItem {
  title: string;
  description: string;
}

// Message Template Detail
export interface MessageTemplateDetail {
  type: MessageTemplateType;
  title: string;
  description: string;
  body: string;
}

export interface IMessageTemplateApi {
  getTitles(): Promise<MessageTemplateListItem[]>; // Returns list of templates with metadata
  getDetails(title: string): Promise<MessageTemplateDetail>; // Returns details for a title
}

export interface IMessageHistoryApi {
  getBySessionId(sessionId: string): Promise<Message[]>;
  save(message: Message): Promise<void>;
}

export interface IAuthApi {
  login(data: LoginRequest): Promise<LoginResponse>;
  signUp(data: SignUpRequest): Promise<LoginResponse>;
  logout(): Promise<void>;
  getCurrentUser(): Promise<User | null>;
  isLoggedIn(): Promise<boolean>;
}
