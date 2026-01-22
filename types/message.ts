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
