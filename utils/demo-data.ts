import { ClassInfo } from '@/types';
import { ClassTemplate, ClassSession } from '@/types/template';

export const DEMO_CLASS: ClassInfo = {
  id: 'demo-class-1',
  instructorId: 'demo-instructor',
  name: '요가 입문 클래스',
  date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 7일 후
  startTime: '10:00',
  endTime: '11:30',
  location: '서울시 강남구 테헤란로 123, 2층 요가 스튜디오',
  capacity: 12,
  depositAmount: 15000,
  preparation: '요가매트, 편안한 운동복, 물',
  instructions: '수업 10분 전까지 도착해주세요. 처음 오시는 분들은 미리 말씀해주시면 기초부터 차근차근 알려드립니다.',
  cancellationPolicy: '수업 24시간 전까지 취소 시 전액 환급, 이후 취소 시 환급 불가',
  noShowPolicy: '노쇼 시 보증금 환급 불가 및 신뢰도 하락',
  status: 'RECRUITING',
  autoClose: true,
  linkId: 'demo-yoga-class',
  createdAt: new Date().toISOString(),
};

export const DEMO_TEMPLATE: ClassTemplate = {
  id: 'demo-template-1',
  instructorId: 'demo-instructor',
  name: '필라테스 그룹 레슨',
  location: '서울시 서초구 강남대로 456, 3층 필라테스 스튜디오',
  preparation: '필라테스 매트, 운동복, 수건',
  instructions: '첫 수업 전 간단한 상담이 진행됩니다. 부상이나 특이사항이 있으시면 미리 알려주세요.',
  capacity: 8,
  depositAmount: 20000,
  cancellationPolicy: '수업 48시간 전까지 취소 시 전액 환급, 24시간 전까지 50% 환급, 이후 환급 불가',
  noShowPolicy: '노쇼 2회 시 향후 신청 제한',
  status: 'ACTIVE',
  createdAt: new Date().toISOString(),
};

export const DEMO_SESSIONS: ClassSession[] = [
  {
    id: 'demo-session-1',
    templateId: 'demo-template-1',
    instructorId: 'demo-instructor',
    date: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 3일 후
    startTime: '09:00',
    endTime: '10:00',
    status: 'RECRUITING',
    linkId: 'demo-pilates-morning',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'demo-session-2',
    templateId: 'demo-template-1',
    instructorId: 'demo-instructor',
    date: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 3일 후
    startTime: '14:00',
    endTime: '15:00',
    status: 'RECRUITING',
    linkId: 'demo-pilates-afternoon',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'demo-session-3',
    templateId: 'demo-template-1',
    instructorId: 'demo-instructor',
    date: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 5일 후
    startTime: '19:00',
    endTime: '20:00',
    status: 'RECRUITING',
    linkId: 'demo-pilates-evening',
    createdAt: new Date().toISOString(),
  },
];

export function ensureDemoDataExists() {
  // V1 데모 클래스 확인
  const classes = localStorage.getItem('ops_classes');
  if (!classes || !JSON.parse(classes).find((c: ClassInfo) => c.id === DEMO_CLASS.id)) {
    const existing = classes ? JSON.parse(classes) : [];
    existing.push(DEMO_CLASS);
    localStorage.setItem('ops_classes', JSON.stringify(existing));
  }

  // V2 데모 템플릿 확인
  const templates = localStorage.getItem('ops_templates');
  if (!templates || !JSON.parse(templates).find((t: ClassTemplate) => t.id === DEMO_TEMPLATE.id)) {
    const existing = templates ? JSON.parse(templates) : [];
    existing.push(DEMO_TEMPLATE);
    localStorage.setItem('ops_templates', JSON.stringify(existing));
  }

  // V2 데모 세션 확인
  const sessions = localStorage.getItem('ops_sessions');
  if (!sessions || JSON.parse(sessions).length === 0) {
    localStorage.setItem('ops_sessions', JSON.stringify(DEMO_SESSIONS));
  }
}
