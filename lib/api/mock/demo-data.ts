/**
 * 데모 데이터 초기화
 * - Mock 모드에서만 사용
 * - UI에서 직접 import 금지
 */

import type { OnedayClassResponse, SessionResponse } from '../generated';
import {
  getTemplates,
  setTemplates,
  getSessions,
  setSessions,
  getStudents,
  setStudents,
  getApplications,
  setApplications,
  generateId,
} from './storage';

// 데모 데이터가 이미 존재하는지 확인
export const hasDemoData = (instructorId: string): boolean => {
  const templates = getTemplates();
  return templates.some(t => String(t.instructorId) === instructorId);
};

// 데모 데이터 초기화
export const initializeDemoData = async (instructorId: string): Promise<void> => {
  if (hasDemoData(instructorId)) return;

  const numericInstructorId = Number(instructorId) || 999;

  // 1. 예시 클래스 템플릿 생성
  const demoTemplate: OnedayClassResponse = {
    id: Number(generateId('template')),
    instructorId: numericInstructorId,
    name: '요가 입문 클래스',
    description: '초보자를 위한 기초 요가 수업입니다. 호흡법부터 기본 자세까지 차근차근 배워봅니다.',
    location: '서울시 강남구 테헤란로 123, 2층 요가 스튜디오',
    locationDetails: '건물 입구에서 엘리베이터 이용, 주차 2시간 무료',
    preparation: '요가매트, 편안한 운동복, 물',
    instructions: '수업 10분 전까지 도착해주세요.',
    cancellationPolicy: '24시간 전 취소 시 전액 환급',
    parkingInfo: '건물 내 주차 가능',
    classCode: 'DEMO' + Math.random().toString(36).substring(7).toUpperCase(),
    linkShareStatus: 'ENABLED',
    imageUrls: ['/demo/yoga.jpg']
  };

  // 2. 예시 세션 생성
  const session1: SessionResponse = {
    id: Number(generateId('session')),
    date: new Date('2024-03-25'),
    startTime: "10:00:00",
    endTime: "11:30:00",
    status: 'RECRUITING',
    currentNum: 4,
    capacity: 8,
    price: 50000,
  };
  (session1 as any).templateId = demoTemplate.id;


  const session2: SessionResponse = {
    id: Number(generateId('session')),
    date: new Date('2024-03-26'),
    startTime: "14:00:00",
    endTime: "15:30:00",
    status: 'RECRUITING',
    currentNum: 8,
    capacity: 12,
    price: 35000,
  };
  (session2 as any).templateId = demoTemplate.id;

  // 3. 예시 학생 생성
  const student1: any = {
    id: 1001,
    name: '김민지',
    phone: '010-1234-5678',
    createdAt: new Date(),
  };

  const student2: any = {
    id: 1002,
    name: '이수현',
    phone: '010-2345-6789',
    createdAt: new Date(),
  };

  const student3: any = {
    id: 1003,
    name: '박서준',
    phone: '010-3456-7890',
    createdAt: new Date(),
  };

  // 4. 예시 신청 데이터 생성
  const applications: any[] = [
    {
      reservationId: 5001,
      classId: String(session1.id),
      studentId: student1.id,
      reservationStatus: 'CONFIRMED',
      appliedAt: new Date(),
      sentD3Notification: true,
      sentD1Notification: false,
      applicantName: student1.name,
      phoneNumber: student1.phone,
    },
    {
      reservationId: 5002,
      classId: String(session1.id),
      studentId: student2.id,
      reservationStatus: 'CONFIRMED',
      appliedAt: new Date(),
      sentD3Notification: true,
      sentD1Notification: true,
      applicantName: student2.name,
      phoneNumber: student2.phone,
    },
    {
      reservationId: 5003,
      classId: String(session1.id),
      studentId: student3.id,
      reservationStatus: 'PENDING',
      appliedAt: new Date(),
      sentD3Notification: false,
      sentD1Notification: false,
      applicantName: student3.name,
      phoneNumber: student3.phone,
    },
    {
      reservationId: 5004,
      classId: String(session2.id),
      studentId: student1.id,
      reservationStatus: 'CONFIRMED',
      appliedAt: new Date(),
      sentD3Notification: false,
      sentD1Notification: false,
      applicantName: student1.name,
      phoneNumber: student1.phone,
    },
  ];

  // localStorage에 저장
  const existingTemplates = getTemplates();
  const existingSessions = getSessions();
  const existingStudents = getStudents();
  const existingApplications = getApplications();

  setTemplates([...existingTemplates, demoTemplate]);
  setSessions([...existingSessions, session1, session2]);
  setStudents([...existingStudents, student1, student2, student3]);
  setApplications([...existingApplications, ...applications]);
};
