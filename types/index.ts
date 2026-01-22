export type ClassStatus = 'RECRUITING' | 'CLOSED' | 'FINISHED';
export type ApplicationStatus = 'PENDING' | 'CONFIRMED' | 'CANCELLED' | 'TIMEOUT' | 'NO_SHOW' | 'ATTENDED';
export type PaymentMethod = 'CARD' | 'ACCOUNT';
export type PaymentStatus = 'PENDING' | 'COMPLETED' | 'FAILED';
export type AttendanceResponse = 'ATTENDING' | 'CANCELLED' | 'NO_RESPONSE';
export type TrustLevel = 'NORMAL' | 'CAUTION' | 'WARNING';
export type NotificationType = 'D-3' | 'D-1' | 'PAYMENT_REMINDER' | 'CONFIRMATION' | 'CANCELLATION';

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

export interface Application {
  id: string;
  classId: string;
  studentId: string;
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
}

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
