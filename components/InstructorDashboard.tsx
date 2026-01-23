"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Plus, Calendar, ArrowLeft, Link2, Users, Trash2, MessageSquare, LogOut, ChevronDown, ChevronRight, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { getCurrentUser, logout } from '@/utils/auth';
import { generateId, generateLinkId, getApplicationsByClassId, getStudentById, saveStudent, saveApplication } from '@/utils/storage';
import { getTemplates as getTemplatesFromStorage, saveTemplate as saveTemplateToStorage, getSessionsByTemplateId as getSessionsFromStorage, saveSession as saveSessionToStorage, deleteSession as deleteSessionFromStorage } from '@/utils/template-storage';
import { getMessageTemplatesByTemplateId, saveMessageTemplate, getDefaultMessageTemplate } from '@/utils/message-template-storage';
import { ClassTemplate, ClassSession } from '@/types/template';
import { ServerStatus } from '@/components/ServerStatus';
import { MessageTemplate } from '@/types/message-template';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';

type NavItem = 'classes' | 'messages';

// 클래스 생성 폼 컴포넌트 (별도 분리하여 포커스 문제 해결)
function CreateClassForm({ onSubmit, onCancel }: {
  onSubmit: (data: {
    name: string;
    description: string;
    location: string;
    locationDetails: string;
    preparation: string;
    instructions: string;
    notes: string;
    capacity: number;
  }) => void;
  onCancel: () => void;
}) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [locationDetails, setLocationDetails] = useState('');
  const [preparation, setPreparation] = useState('');
  const [instructions, setInstructions] = useState('');
  const [notes, setNotes] = useState('');
  const [capacity, setCapacity] = useState(10);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      name,
      description,
      location,
      locationDetails,
      preparation,
      instructions,
      notes,
      capacity,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="className">클래스명 *</Label>
        <Input
          id="className"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="예: 요가 초급 클래스"
          required
          autoFocus
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="classDescription">소개글</Label>
        <Textarea
          id="classDescription"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="클래스에 대한 간단한 설명"
          rows={3}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="classLocation">장소 *</Label>
        <Input
          id="classLocation"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="예: 서울시 강남구 테헤란로 123"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="classLocationDetails">위치 안내</Label>
        <Textarea
          id="classLocationDetails"
          value={locationDetails}
          onChange={(e) => setLocationDetails(e.target.value)}
          placeholder="건물 입구, 주차 정보 등"
          rows={2}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="classCapacity">정원 *</Label>
        <Input
          id="classCapacity"
          type="number"
          min="1"
          value={capacity}
          onChange={(e) => setCapacity(parseInt(e.target.value) || 1)}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="classPreparation">준비물</Label>
        <Textarea
          id="classPreparation"
          value={preparation}
          onChange={(e) => setPreparation(e.target.value)}
          placeholder="예: 요가매트, 운동복, 물"
          rows={2}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="classInstructions">주의사항</Label>
        <Textarea
          id="classInstructions"
          value={instructions}
          onChange={(e) => setInstructions(e.target.value)}
          placeholder="수강생에게 전달할 주의사항"
          rows={3}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="classNotes">추가 안내</Label>
        <Textarea
          id="classNotes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="기타 안내사항"
          rows={2}
        />
      </div>

      <Button type="submit" className="w-full">
        클래스 생성
      </Button>
    </form>
  );
}

// 클래스 수정 폼 컴포넌트
function EditClassForm({ template, onSubmit, onCancel }: {
  template: ClassTemplate;
  onSubmit: (data: {
    name: string;
    description: string;
    location: string;
    locationDetails: string;
    preparation: string;
    instructions: string;
    notes: string;
    capacity: number;
  }) => void;
  onCancel: () => void;
}) {
  const [name, setName] = useState(template.name);
  const [description, setDescription] = useState(template.description || '');
  const [location, setLocation] = useState(template.location);
  const [locationDetails, setLocationDetails] = useState(template.locationDetails || '');
  const [preparation, setPreparation] = useState(template.preparation || '');
  const [instructions, setInstructions] = useState(template.instructions || '');
  const [notes, setNotes] = useState(template.notes || '');
  const [capacity, setCapacity] = useState(template.capacity);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      name,
      description,
      location,
      locationDetails,
      preparation,
      instructions,
      notes,
      capacity,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="editClassName">클래스명 *</Label>
        <Input
          id="editClassName"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="예: 요가 초급 클래스"
          required
          autoFocus
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="editClassDescription">소개글</Label>
        <Textarea
          id="editClassDescription"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="클래스에 대한 간단한 설명"
          rows={3}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="editClassLocation">장소 *</Label>
        <Input
          id="editClassLocation"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="예: 서울시 강남구 테헤란로 123"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="editClassLocationDetails">위치 안내</Label>
        <Textarea
          id="editClassLocationDetails"
          value={locationDetails}
          onChange={(e) => setLocationDetails(e.target.value)}
          placeholder="건물 입구, 주차 정보 등"
          rows={2}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="editClassCapacity">정원 *</Label>
        <Input
          id="editClassCapacity"
          type="number"
          min="1"
          value={capacity}
          onChange={(e) => setCapacity(parseInt(e.target.value) || 1)}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="editClassPreparation">준비물</Label>
        <Textarea
          id="editClassPreparation"
          value={preparation}
          onChange={(e) => setPreparation(e.target.value)}
          placeholder="예: 요가매트, 운동복, 물"
          rows={2}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="editClassInstructions">주의사항</Label>
        <Textarea
          id="editClassInstructions"
          value={instructions}
          onChange={(e) => setInstructions(e.target.value)}
          placeholder="수강생에게 전달할 주의사항"
          rows={3}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="editClassNotes">추가 안내</Label>
        <Textarea
          id="editClassNotes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="기타 안내사항"
          rows={2}
        />
      </div>

      <Button type="submit" className="w-full">
        클래스 수정
      </Button>
    </form>
  );
}

// 세션 추가 폼 컴포넌트
function AddSessionForm({ onSubmit }: {
  onSubmit: (data: { date: string; startTime: string; endTime: string }) => void;
}) {
  const [date, setDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ date, startTime, endTime });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label>날짜 *</Label>
        <Input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>시작 시간 *</Label>
          <Input
            type="time"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            required
          />
        </div>

        <div className="space-y-2">
          <Label>종료 시간 *</Label>
          <Input
            type="time"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            required
          />
        </div>
      </div>

      <Button type="submit" className="w-full">세션 생성</Button>
    </form>
  );
}

// 예시 데이터 초기화 함수
function initializeDemoData(instructorId: string) {
  const templates = getTemplatesFromStorage();
  const hasDemo = templates.some(t => t.instructorId === instructorId);

  if (hasDemo) return;

  // 예시 클래스 생성
  const demoClass: ClassTemplate = {
    id: generateId('template'),
    instructorId,
    name: '요가 입문 클래스',
    description: '초보자를 위한 기초 요가 수업입니다. 호흡법부터 기본 자세까지 차근차근 배워봅니다.',
    location: '서울시 강남구 테헤란로 123, 2층 요가 스튜디오',
    locationDetails: '건물 입구에서 엘리베이터 이용, 주차 2시간 무료',
    preparation: '요가매트, 편안한 운동복, 물',
    instructions: '수업 10분 전까지 도착해주세요.',
    notes: '처음 오시는 분들은 미리 말씀해주시면 기초부터 알려드립니다.',
    capacity: 12,
    depositAmount: 15000,
    cancellationPolicy: '24시간 전 취소 시 전액 환급',
    noShowPolicy: '노쇼 시 보증금 환급 불가',
    status: 'ACTIVE',
    createdAt: new Date().toISOString(),
  };
  saveTemplateToStorage(demoClass);

  // 예시 세션 생성
  const session1: ClassSession = {
    id: generateId('session'),
    templateId: demoClass.id,
    instructorId,
    date: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    startTime: '10:00',
    endTime: '11:30',
    status: 'RECRUITING',
    linkId: generateLinkId(),
    createdAt: new Date().toISOString(),
  };
  saveSessionToStorage(session1);

  const session2: ClassSession = {
    id: generateId('session'),
    templateId: demoClass.id,
    instructorId,
    date: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    startTime: '14:00',
    endTime: '15:30',
    status: 'RECRUITING',
    linkId: generateLinkId(),
    createdAt: new Date().toISOString(),
  };
  saveSessionToStorage(session2);

  // 예시 학생 및 신청자 생성
  const student1 = {
    id: generateId('student'),
    name: '김민지',
    email: 'minji@example.com',
    phone: '010-1234-5678',
    applicationCount: 3,
    cancellationCount: 0,
    noResponseCount: 0,
    noShowCount: 0,
    attendedCount: 2,
    trustLevel: 'NORMAL' as const,
    createdAt: new Date().toISOString(),
  };
  saveStudent(student1);

  const student2 = {
    id: generateId('student'),
    name: '이수현',
    email: 'suhyun@example.com',
    phone: '010-2345-6789',
    applicationCount: 5,
    cancellationCount: 1,
    noResponseCount: 0,
    noShowCount: 0,
    attendedCount: 4,
    trustLevel: 'NORMAL' as const,
    createdAt: new Date().toISOString(),
  };
  saveStudent(student2);

  const student3 = {
    id: generateId('student'),
    name: '박서준',
    email: 'seojun@example.com',
    phone: '010-3456-7890',
    applicationCount: 2,
    cancellationCount: 0,
    noResponseCount: 0,
    noShowCount: 0,
    attendedCount: 1,
    trustLevel: 'NORMAL' as const,
    createdAt: new Date().toISOString(),
  };
  saveStudent(student3);

  // 신청 데이터 생성
  saveApplication({
    id: generateId('app'),
    classId: session1.id,
    studentId: student1.id,
    status: 'CONFIRMED',
    paymentStatus: 'COMPLETED',
    depositAmount: 15000,
    refundEligible: true,
    appliedAt: new Date().toISOString(),
  });

  saveApplication({
    id: generateId('app'),
    classId: session1.id,
    studentId: student2.id,
    status: 'CONFIRMED',
    paymentStatus: 'COMPLETED',
    depositAmount: 15000,
    refundEligible: true,
    appliedAt: new Date().toISOString(),
  });

  saveApplication({
    id: generateId('app'),
    classId: session1.id,
    studentId: student3.id,
    status: 'PENDING',
    paymentStatus: 'PENDING',
    depositAmount: 15000,
    refundEligible: true,
    appliedAt: new Date().toISOString(),
  });

  saveApplication({
    id: generateId('app'),
    classId: session2.id,
    studentId: student1.id,
    status: 'CONFIRMED',
    paymentStatus: 'COMPLETED',
    depositAmount: 15000,
    refundEligible: true,
    appliedAt: new Date().toISOString(),
  });
}

export function InstructorDashboard() {
  const router = useRouter();
  const [currentNav, setCurrentNav] = useState<NavItem>('classes');
  const [templates, setTemplates] = useState<ClassTemplate[]>([]);
  const [selectedTemplate, setSelectedTemplate] = useState<ClassTemplate | null>(null);
  const [selectedSession, setSelectedSession] = useState<ClassSession | null>(null);
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [addSessionDialogOpen, setAddSessionDialogOpen] = useState(false);
  const [sessions, setSessions] = useState<ClassSession[]>([]);
  const [user, setUser] = useState<{ id: string; name: string; email: string } | null>(null);

  const [messageTemplates, setMessageTemplates] = useState<MessageTemplate[]>([]);
  const [d3Template, setD3Template] = useState('');
  const [d1Template, setD1Template] = useState('');
  const [expandedTemplate, setExpandedTemplate] = useState<string | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const currentUser = getCurrentUser();
    if (!currentUser) {
      router.push('/login');
      return;
    }
    setUser(currentUser);

    // 예시 데이터 초기화
    initializeDemoData(currentUser.id);

    loadTemplates(currentUser.id);
    loadGlobalMessageTemplates();
  }, [router]);

  useEffect(() => {
    if (selectedTemplate) {
      loadSessions(selectedTemplate.id);
      loadMessageTemplates(selectedTemplate.id);
    }
  }, [selectedTemplate]);

  const loadTemplates = (instructorId: string) => {
    const allTemplates = getTemplatesFromStorage();
    const myTemplates = allTemplates.filter(t => t.instructorId === instructorId);
    setTemplates(myTemplates);
  };

  const loadSessions = (templateId: string) => {
    const templateSessions = getSessionsFromStorage(templateId);
    setSessions(templateSessions);
  };

  const loadMessageTemplates = (templateId: string) => {
    const templates = getMessageTemplatesByTemplateId(templateId);
    setMessageTemplates(templates);

    const d3 = templates.find(t => t.type === 'D-3');
    const d1 = templates.find(t => t.type === 'D-1');

    setD3Template(d3?.content || getDefaultMessageTemplate('D-3', '{클래스명}'));
    setD1Template(d1?.content || getDefaultMessageTemplate('D-1', '{클래스명}'));
  };

  const loadGlobalMessageTemplates = () => {
    const templates = getMessageTemplatesByTemplateId('global');
    setMessageTemplates(templates);

    const d3 = templates.find(t => t.type === 'D-3');
    const d1 = templates.find(t => t.type === 'D-1');

    setD3Template(d3?.content || getDefaultMessageTemplate('D-3', '{클래스명}'));
    setD1Template(d1?.content || getDefaultMessageTemplate('D-1', '{클래스명}'));
  };

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  const handleCreateTemplate = (data: {
    name: string;
    description: string;
    location: string;
    locationDetails: string;
    preparation: string;
    instructions: string;
    notes: string;
    capacity: number;
  }) => {
    if (!user) return;

    const template: ClassTemplate = {
      id: generateId('template'),
      instructorId: user.id,
      name: data.name,
      description: data.description,
      location: data.location,
      locationDetails: data.locationDetails,
      preparation: data.preparation,
      instructions: data.instructions,
      notes: data.notes,
      capacity: data.capacity,
      depositAmount: 0,
      cancellationPolicy: '',
      noShowPolicy: '',
      status: 'ACTIVE',
      createdAt: new Date().toISOString(),
    };

    saveTemplateToStorage(template);
    setCreateDialogOpen(false);
    loadTemplates(user.id);
  };

  const handleEditTemplate = (data: {
    name: string;
    description: string;
    location: string;
    locationDetails: string;
    preparation: string;
    instructions: string;
    notes: string;
    capacity: number;
  }) => {
    if (!user || !selectedTemplate) return;

    const updatedTemplate: ClassTemplate = {
      ...selectedTemplate,
      name: data.name,
      description: data.description,
      location: data.location,
      locationDetails: data.locationDetails,
      preparation: data.preparation,
      instructions: data.instructions,
      notes: data.notes,
      capacity: data.capacity,
    };

    saveTemplateToStorage(updatedTemplate);
    setEditDialogOpen(false);
    setSelectedTemplate(updatedTemplate);
    loadTemplates(user.id);
  };

  const handleAddSession = (data: { date: string; startTime: string; endTime: string }) => {
    if (!selectedTemplate || !user) return;

    const session: ClassSession = {
      id: generateId('session'),
      templateId: selectedTemplate.id,
      instructorId: user.id,
      date: data.date,
      startTime: data.startTime,
      endTime: data.endTime,
      status: 'RECRUITING',
      linkId: generateLinkId(),
      createdAt: new Date().toISOString(),
    };

    saveSessionToStorage(session);
    setAddSessionDialogOpen(false);
    loadSessions(selectedTemplate.id);
  };

  const handleDeleteSession = (sessionId: string) => {
    if (confirm('이 세션을 삭제하시겠습니까?')) {
      deleteSessionFromStorage(sessionId);
      if (selectedTemplate) {
        loadSessions(selectedTemplate.id);
      }
    }
  };

  const handleSaveMessageTemplate = (type: 'D-3' | 'D-1') => {
    const content = type === 'D-3' ? d3Template : d1Template;
    const existing = messageTemplates.find(t => t.type === type);

    const messageTemplate: MessageTemplate = {
      id: existing?.id || generateId('msg-template'),
      templateId: 'global', // 전역 템플릿으로 저장
      type,
      content,
      createdAt: existing?.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    saveMessageTemplate(messageTemplate);
    loadGlobalMessageTemplates();
    alert(`${type} 메시지 템플릿이 저장되었습니다.`);
  };

  const copyLink = (linkId: string) => {
    const url = `${window.location.origin}?session=${linkId}`;
    navigator.clipboard.writeText(url);
    alert('링크가 복사되었습니다!');
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>로딩 중...</p>
      </div>
    );
  }

  // 사이드바
  const Sidebar = () => (
    <>
      {/* 모바일 오버레이 배경 */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* 사이드바 */}
      <div className={`
        w-64 bg-white border-r h-screen fixed left-0 top-0 flex flex-col z-50
        transform transition-transform duration-300 ease-in-out
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        md:translate-x-0
      `}>
        <div className="p-6 border-b flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Class Hub</h2>
            <p className="text-sm text-gray-500 mt-1">{user.name}님</p>
          </div>
          {/* 모바일 닫기 버튼 */}
          <button
            onClick={() => setSidebarOpen(false)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="flex-1 p-4">
          <div className="space-y-1">
            <button
              onClick={() => {
                setCurrentNav('classes');
                setSelectedTemplate(null);
                setSelectedSession(null);
                setSidebarOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                currentNav === 'classes'
                  ? 'bg-blue-50 text-blue-600'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <Calendar className="h-5 w-5" />
              <span className="font-medium">클래스 관리</span>
            </button>

            <button
              onClick={() => {
                setCurrentNav('messages');
                setSidebarOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                currentNav === 'messages'
                  ? 'bg-blue-50 text-blue-600'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <MessageSquare className="h-5 w-5" />
              <span className="font-medium">메시지 템플릿</span>
            </button>
          </div>
        </nav>

        <div className="p-4 border-t">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
          >
            <LogOut className="h-5 w-5" />
            <span className="font-medium">로그아웃</span>
          </button>
        </div>
      </div>
    </>
  );

  // 모바일 헤더
  const MobileHeader = () => (
    <div className="md:hidden fixed top-0 left-0 right-0 h-14 bg-white border-b z-30 flex items-center px-4">
      <button
        onClick={() => setSidebarOpen(true)}
        className="p-2 rounded-lg hover:bg-gray-100"
      >
        <Menu className="h-6 w-6" />
      </button>
      <h1 className="ml-3 font-bold text-gray-900">Class Hub</h1>
    </div>
  );

  // 클래스 관리 뷰
  const ClassesView = () => {
    // 세션 상세 (신청자 목록)
    if (selectedSession && selectedTemplate) {
      const applications = getApplicationsByClassId(selectedSession.id);

      return (
        <div className="space-y-4 md:space-y-6">
          <Button variant="ghost" onClick={() => setSelectedSession(null)} className="px-2">
            <ArrowLeft className="mr-2 h-4 w-4" />
            세션 목록으로
          </Button>

          <Card>
            <CardHeader className="p-4 md:p-6">
              <div>
                <CardTitle className="text-lg md:text-xl">{selectedTemplate.name}</CardTitle>
                <CardDescription className="mt-2 text-sm">
                  {format(new Date(selectedSession.date), 'PPP (EEE)', { locale: ko })} {selectedSession.startTime} - {selectedSession.endTime}
                </CardDescription>
              </div>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader className="p-4 md:p-6">
              <CardTitle className="text-base md:text-lg">신청자 목록</CardTitle>
              <CardDescription className="text-sm">총 {applications.length}명 / 정원 {selectedTemplate.capacity}명</CardDescription>
            </CardHeader>
            <CardContent className="p-4 md:p-6 pt-0 md:pt-0">
              {applications.length === 0 ? (
                <div className="text-center py-6 md:py-8 text-gray-500">
                  <Users className="h-10 w-10 md:h-12 md:w-12 mx-auto mb-3 text-gray-400" />
                  <p className="text-sm md:text-base">아직 신청자가 없습니다</p>
                </div>
              ) : (
                <div className="space-y-2">
                  {applications.map((app) => {
                    const student = getStudentById(app.studentId);
                    if (!student) return null;

                    return (
                      <div key={app.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="min-w-0 flex-1">
                          <p className="font-medium text-sm md:text-base">{student.name}</p>
                          <p className="text-xs md:text-sm text-gray-500 truncate">{student.email}</p>
                        </div>
                        <Badge variant={app.status === 'CONFIRMED' ? 'default' : 'outline'} className="ml-2 text-xs">
                          {app.status === 'CONFIRMED' ? '확정' : app.status === 'PENDING' ? '대기' : '취소'}
                        </Badge>
                      </div>
                    );
                  })}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      );
    }

    // 클래스 세션 목록
    if (selectedTemplate) {
      return (
        <div className="space-y-4 md:space-y-6">
          <Button variant="ghost" onClick={() => setSelectedTemplate(null)} className="px-2">
            <ArrowLeft className="mr-2 h-4 w-4" />
            클래스 목록으로
          </Button>

          {/* 클래스 정보 카드 */}
          <Card>
            <CardHeader className="p-4 md:p-6">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                <div className="flex-1">
                  <CardTitle className="text-lg md:text-xl">{selectedTemplate.name}</CardTitle>
                  <CardDescription className="mt-2 text-sm">{selectedTemplate.description}</CardDescription>
                  <div className="mt-4 space-y-1 text-sm text-gray-600">
                    <p><span className="font-medium">장소:</span> {selectedTemplate.location}</p>
                    <p><span className="font-medium">정원:</span> {selectedTemplate.capacity}명</p>
                    {selectedTemplate.preparation && (
                      <p><span className="font-medium">준비물:</span> {selectedTemplate.preparation}</p>
                    )}
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-2">
                  <Button variant="outline" onClick={() => copyLink(selectedTemplate.id)} className="w-full sm:w-auto">
                    <Link2 className="h-4 w-4 mr-2" />
                    클래스 링크
                  </Button>
                  <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
                    <DialogTrigger asChild>
                      <Button variant="outline" className="w-full sm:w-auto">
                        수정
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto mx-4 md:mx-auto">
                      <DialogHeader>
                        <DialogTitle>클래스 수정</DialogTitle>
                      </DialogHeader>
                      <EditClassForm
                        template={selectedTemplate}
                        onSubmit={handleEditTemplate}
                        onCancel={() => setEditDialogOpen(false)}
                      />
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            </CardHeader>
          </Card>

          {/* 세션 추가 버튼 */}
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
            <h2 className="text-base md:text-lg font-semibold text-gray-900">세션 목록</h2>
            <Dialog open={addSessionDialogOpen} onOpenChange={setAddSessionDialogOpen}>
              <DialogTrigger asChild>
                <Button className="w-full sm:w-auto">
                  <Plus className="mr-2 h-4 w-4" />
                  세션 추가
                </Button>
              </DialogTrigger>
              <DialogContent className="mx-4 md:mx-auto">
                <DialogHeader>
                  <DialogTitle>새 세션 추가</DialogTitle>
                </DialogHeader>
                <AddSessionForm onSubmit={handleAddSession} />
              </DialogContent>
            </Dialog>
          </div>

          {/* 세션 목록 */}
          {sessions.length === 0 ? (
            <Card>
              <CardContent className="p-8 md:p-12 text-center">
                <Calendar className="h-10 w-10 md:h-12 md:w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-2">
                  아직 세션이 없습니다
                </h3>
                <p className="text-sm md:text-base text-gray-500">
                  시간대별 세션을 추가하세요
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-3">
              {sessions.map((session) => {
                const applications = getApplicationsByClassId(session.id);
                const confirmedCount = applications.filter(a => a.status === 'CONFIRMED').length;

                return (
                  <Card key={session.id}>
                    <CardContent className="p-3 md:p-4">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                        <div className="flex-1">
                          <div className="flex flex-wrap items-center gap-2 mb-2">
                            <h3 className="font-semibold text-sm md:text-base">
                              {format(new Date(session.date), 'M월 d일 (EEE)', { locale: ko })}
                            </h3>
                            <Badge variant="outline" className="text-xs">
                              {session.startTime} - {session.endTime}
                            </Badge>
                          </div>
                          <p className="text-xs md:text-sm text-gray-600">
                            신청 {confirmedCount}명 / 정원 {selectedTemplate.capacity}명
                          </p>
                        </div>

                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setSelectedSession(session)}
                            className="flex-1 sm:flex-none text-xs md:text-sm"
                          >
                            신청자 보기
                          </Button>

                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDeleteSession(session.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </div>
      );
    }

    // 클래스 목록
    return (
      <div className="space-y-4 md:space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-xl md:text-2xl font-bold text-gray-900">클래스 관리</h1>
            <p className="text-sm md:text-base text-gray-500 mt-1">클래스와 세션을 관리하세요</p>
          </div>

          <Dialog open={createDialogOpen} onOpenChange={setCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button className="w-full sm:w-auto">
                <Plus className="mr-2 h-5 w-5" />
                클래스 만들기
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto mx-4 md:mx-auto">
              <DialogHeader>
                <DialogTitle>새 클래스 만들기</DialogTitle>
              </DialogHeader>
              <CreateClassForm
                onSubmit={handleCreateTemplate}
                onCancel={() => setCreateDialogOpen(false)}
              />
            </DialogContent>
          </Dialog>
        </div>

        {templates.length === 0 ? (
          <Card>
            <CardContent className="p-8 md:p-12 text-center">
              <Calendar className="h-10 w-10 md:h-12 md:w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-2">
                아직 클래스가 없습니다
              </h3>
              <p className="text-sm md:text-base text-gray-500 mb-6">
                클래스를 만들어보세요
              </p>
              <Button onClick={() => setCreateDialogOpen(true)} className="w-full sm:w-auto">
                <Plus className="mr-2 h-4 w-4" />
                클래스 만들기
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-3 md:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {templates.map((template) => {
              const templateSessions = getSessionsFromStorage(template.id);

              return (
                <Card key={template.id} className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => setSelectedTemplate(template)}>
                  <CardHeader className="p-4 md:p-6">
                    <CardTitle className="text-base md:text-lg">{template.name}</CardTitle>
                    <CardDescription className="text-sm line-clamp-2">{template.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="p-4 md:p-6 pt-0 md:pt-0">
                    <p className="text-xs md:text-sm text-gray-600 mb-2 truncate">{template.location}</p>
                    <p className="text-xs md:text-sm text-gray-500">세션 {templateSessions.length}개</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    );
  };

  // 메시지 템플릿 뷰
  const MessagesView = () => {
    const templateTypes = [
      { type: 'D-3' as const, title: 'D-3 메시지', description: '수업 3일 전에 자동 발송됩니다' },
      { type: 'D-1' as const, title: 'D-1 메시지', description: '수업 1일 전에 자동 발송됩니다' },
    ];

    return (
      <div className="space-y-4 md:space-y-6">
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-gray-900">메시지 템플릿</h1>
          <p className="text-sm md:text-base text-gray-500 mt-1">자동 발송 메시지를 설정하세요</p>
        </div>

        {/* 변수 안내 */}
        <Card>
          <CardHeader className="pb-3 p-4 md:p-6 md:pb-3">
            <CardTitle className="text-sm md:text-base">사용 가능한 변수</CardTitle>
          </CardHeader>
          <CardContent className="p-4 md:p-6 pt-0 md:pt-0">
            <div className="flex flex-wrap gap-1.5 md:gap-2 text-xs md:text-sm">
              <Badge variant="outline">{'{클래스명}'}</Badge>
              <Badge variant="outline">{'{날짜}'}</Badge>
              <Badge variant="outline">{'{시간}'}</Badge>
              <Badge variant="outline">{'{장소}'}</Badge>
              <Badge variant="outline">{'{준비물}'}</Badge>
            </div>
            <p className="text-xs text-gray-500 mt-2">위 변수들은 메시지 발송 시 실제 값으로 자동 대체됩니다.</p>
          </CardContent>
        </Card>

        {/* D-3, D-1 템플릿 목록 */}
        <div className="space-y-3">
          {templateTypes.map(({ type, title, description }) => {
            const isExpanded = expandedTemplate === type;
            const content = type === 'D-3' ? d3Template : d1Template;
            const setContent = type === 'D-3' ? setD3Template : setD1Template;

            return (
              <Card key={type}>
                <CardHeader
                  className="cursor-pointer p-4 md:p-6"
                  onClick={() => setExpandedTemplate(isExpanded ? null : type)}
                >
                  <div>
                    <CardTitle className="text-base md:text-lg flex items-center gap-2">
                      {isExpanded ? <ChevronDown className="h-4 w-4 md:h-5 md:w-5" /> : <ChevronRight className="h-4 w-4 md:h-5 md:w-5" />}
                      {title}
                    </CardTitle>
                    <CardDescription className="ml-6 md:ml-7 text-xs md:text-sm">{description}</CardDescription>
                  </div>
                </CardHeader>

                {isExpanded && (
                  <CardContent className="pt-0 p-4 md:p-6 md:pt-0">
                    <Textarea
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                      rows={6}
                      placeholder={`${title} 내용을 입력하세요. {클래스명}, {날짜}, {시간} 등의 변수를 사용할 수 있습니다.`}
                      className="mb-4 text-sm"
                    />
                    <Button onClick={() => handleSaveMessageTemplate(type)} className="w-full">
                      {title} 저장
                    </Button>
                  </CardContent>
                )}
              </Card>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <MobileHeader />
      <Sidebar />

      <div className="flex-1 md:ml-64 overflow-y-auto">
        <div className="p-4 pt-18 md:p-8 md:pt-8">
          {currentNav === 'classes' && <ClassesView />}
          {currentNav === 'messages' && <MessagesView />}
        </div>
      </div>

      {/* 서버 상태 표시 (개발용) - 삭제 시 이 줄과 ServerStatus import 제거 */}
      <ServerStatus />
    </div>
  );
}
