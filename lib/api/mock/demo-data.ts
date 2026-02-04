/**
 * 데모 데이터 초기화
 * - Mock 모드에서만 사용
 * - UI에서 직접 import 금지
 */

import type { ClassTemplate, ClassSession, Student, Application } from '../types';
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
  generateLinkId,
} from './storage';

// 데모 데이터가 이미 존재하는지 확인
export const hasDemoData = (instructorId: string): boolean => {
  const templates = getTemplates();
  return templates.some(t => t.instructorId === instructorId);
};

// 데모 데이터 초기화
export const initializeDemoData = async (instructorId: string): Promise<void> => {
  if (hasDemoData(instructorId)) return;

  // 1. 예시 클래스 템플릿 생성
  const demoTemplate: ClassTemplate = {
    id: generateId('template'),
    instructorId,
    name: '요가 입문 클래스',
    description: '초보자를 위한 기초 요가 수업입니다. 호흡법부터 기본 자세까지 차근차근 배워봅니다.',
    location: '서울시 강남구 테헤란로 123, 2층 요가 스튜디오',
    locationDetails: '건물 입구에서 엘리베이터 이용, 주차 2시간 무료',
    preparation: '요가매트, 편안한 운동복, 물',
    instructions: '수업 10분 전까지 도착해주세요.',
    notes: '처음 오시는 분들은 미리 말씀해주시면 기초부터 알려드립니다.',
    depositAmount: 15000,
    cancellationPolicy: '24시간 전 취소 시 전액 환급',
    noShowPolicy: '노쇼 시 보증금 환급 불가',
    status: 'ACTIVE',
    createdAt: new Date().toISOString(),
  };

  // 2. 예시 세션 생성
  const session1: ClassSession = {
    id: generateId('session'),
    templateId: demoTemplate.id,
    instructorId,
    date: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    startTime: '10:00',
    endTime: '11:30',
    status: 'RECRUITING',
    currentNum: 0,
    capacity: 12,
    linkId: generateLinkId(),
    createdAt: new Date().toISOString(),
  };

  const session2: ClassSession = {
    id: generateId('session'),
    templateId: demoTemplate.id,
    instructorId,
    date: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    startTime: '14:00',
    endTime: '15:30',
    status: 'RECRUITING',
    currentNum: 0,
    capacity: 12,
    linkId: generateLinkId(),
    createdAt: new Date().toISOString(),
  };

  // 3. 예시 학생 생성
  const student1: Student = {
    id: generateId('student'),
    name: '김민지',
    email: 'minji@example.com',
    phone: '010-1234-5678',
    applicationCount: 3,
    cancellationCount: 0,
    noResponseCount: 0,
    noShowCount: 0,
    attendedCount: 2,
    trustLevel: 'NORMAL',
    createdAt: new Date().toISOString(),
  };

  const student2: Student = {
    id: generateId('student'),
    name: '이수현',
    email: 'suhyun@example.com',
    phone: '010-2345-6789',
    applicationCount: 5,
    cancellationCount: 1,
    noResponseCount: 0,
    noShowCount: 0,
    attendedCount: 4,
    trustLevel: 'NORMAL',
    createdAt: new Date().toISOString(),
  };

  const student3: Student = {
    id: generateId('student'),
    name: '박서준',
    email: 'seojun@example.com',
    phone: '010-3456-7890',
    applicationCount: 2,
    cancellationCount: 0,
    noResponseCount: 0,
    noShowCount: 0,
    attendedCount: 1,
    trustLevel: 'NORMAL',
    createdAt: new Date().toISOString(),
  };

  // 4. 예시 신청 데이터 생성
  const applications: Application[] = [
    {
      id: generateId('app'),
      classId: session1.id,
      studentId: student1.id,
      status: 'CONFIRMED',
      paymentStatus: 'COMPLETED',
      depositAmount: 15000,
      refundEligible: true,
      appliedAt: new Date().toISOString(),
    },
    {
      id: generateId('app'),
      classId: session1.id,
      studentId: student2.id,
      status: 'CONFIRMED',
      paymentStatus: 'COMPLETED',
      depositAmount: 15000,
      refundEligible: true,
      appliedAt: new Date().toISOString(),
    },
    {
      id: generateId('app'),
      classId: session1.id,
      studentId: student3.id,
      status: 'PENDING',
      paymentStatus: 'PENDING',
      depositAmount: 15000,
      refundEligible: true,
      appliedAt: new Date().toISOString(),
    },
    {
      id: generateId('app'),
      classId: session2.id,
      studentId: student1.id,
      status: 'CONFIRMED',
      paymentStatus: 'COMPLETED',
      depositAmount: 15000,
      refundEligible: true,
      appliedAt: new Date().toISOString(),
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
