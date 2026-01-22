// 기존 타입에 추가
export type ClassTemplateStatus = 'ACTIVE' | 'INACTIVE';
export type ClassStatus = 'RECRUITING' | 'CLOSED' | 'FINISHED';

export interface ClassTemplate {
  id: string;
  instructorId: string;
  name: string;
  description?: string;
  location: string;
  locationDetails?: string;
  preparation?: string;
  instructions?: string;
  notes?: string;
  capacity: number;
  depositAmount?: number;
  cancellationPolicy?: string;
  noShowPolicy?: string;
  status: ClassTemplateStatus;
  createdAt: string;
}

export interface ClassSession {
  id: string;
  templateId: string;
  instructorId: string;
  date: string;
  startTime: string;
  endTime: string;
  status: ClassStatus;
  linkId: string;
  createdAt: string;
}