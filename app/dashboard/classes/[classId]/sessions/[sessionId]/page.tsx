"use client";

import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import { api, sessionApi, templateApi, applicationApi, studentApi, type ClassSession, type ClassTemplate, type Application, type Student, type Message } from "@/lib/api";
import { ApplicationList } from "@/components/dashboard/ApplicationList";
import { FloatingGuideButton } from "@/components/coachmark";
import { useCoachmark } from "@/components/coachmark/hooks/useCoachmark";

export default function SessionDetailPage({ params }: { params: Promise<{ classId: string; sessionId: string }> }) {
    const router = useRouter();
    const { classId, sessionId } = use(params);
    const [session, setSession] = useState<ClassSession | null>(null);
    const [template, setTemplate] = useState<ClassTemplate | null>(null);
    const [applications, setApplications] = useState<Application[]>([]);
    const [students, setStudents] = useState<Student[]>([]);
    const [sessionMessages, setSessionMessages] = useState<Message[]>([]);

    const { isDemoMode } = useCoachmark();

    // 데모 모드용 가짜 신청자 데이터
    const demoStudents: Student[] = [
        {
            id: 'demo-student-1',
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
        },
        {
            id: 'demo-student-2',
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
        },
        {
            id: 'demo-student-3',
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
        },
    ];

    const demoApplications: Application[] = [
        {
            id: 'demo-app-1',
            reservationId: 99901,
            classId: sessionId,
            studentId: 'demo-student-1',
            applicantName: '김민지',
            phoneNumber: '010-1234-5678',
            status: 'CONFIRMED',
            paymentStatus: 'COMPLETED',
            depositAmount: 15000,
            refundEligible: true,
            appliedAt: new Date().toISOString(),
            sentD3Notification: true,
            sentD1Notification: false,
        },
        {
            id: 'demo-app-2',
            reservationId: 99902,
            classId: sessionId,
            studentId: 'demo-student-2',
            applicantName: '이수현',
            phoneNumber: '010-2345-6789',
            status: 'CONFIRMED',
            paymentStatus: 'COMPLETED',
            depositAmount: 15000,
            refundEligible: true,
            appliedAt: new Date().toISOString(),
            sentD3Notification: true,
            sentD1Notification: false,
        },
        {
            id: 'demo-app-3',
            reservationId: 99903,
            classId: sessionId,
            studentId: 'demo-student-3',
            applicantName: '박서준',
            phoneNumber: '010-3456-7890',
            status: 'CANCELLED',
            paymentStatus: 'PENDING',
            depositAmount: 15000,
            refundEligible: true,
            appliedAt: new Date().toISOString(),
            sentD3Notification: false,
            sentD1Notification: false,
        },
    ];

    // 데모 모드용 가짜 세션/템플릿 데이터 (데모 세션 ID로 접근 시)
    const demoSession: ClassSession = {
        id: sessionId,
        templateId: classId,
        instructorId: 'demo-user',
        date: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        startTime: '10:00',
        endTime: '12:00',
        capacity: 10,
        currentNum: 3,
        status: 'RECRUITING',
        price: 50000,
        linkId: 'demo-link',
        createdAt: new Date().toISOString(),
    };

    const demoTemplate: ClassTemplate = {
        id: classId,
        instructorId: 'demo-user',
        classCode: 'DEMO001',
        name: '웹 개발 기초 강의',
        description: '프론트엔드 개발의 기초를 배우는 강의입니다',
        location: '강남역 인근 스터디룸',
        locationDetails: '2층 세미나실',
        preparation: '노트북, 필기구',
        createdAt: new Date().toISOString(),
    };

    // 실제 데이터와 데모 데이터 결합 (가이드 활성화 중이고 실제 데이터가 없을 때만 데모 데이터 표시)
    const displayApplications = isDemoMode ? (applications.length === 0 ? demoApplications : applications) : applications;
    const displayStudents = isDemoMode ? (students.length === 0 ? demoStudents : students) : students;

    // 데모 세션인지 확인
    const isDemoSession = sessionId.startsWith('demo-');

    useEffect(() => {
        const fetchData = async () => {
            // 데모 세션인 경우 가짜 데이터 사용
            if (isDemoSession && isDemoMode) {
                setSession(demoSession);
                setTemplate(demoTemplate);
                return;
            }

            const allSessions = await sessionApi.getByTemplateId(classId);
            const foundSession = allSessions.find(s => String(s.id) === sessionId);

            if (foundSession) {
                setSession(foundSession);

                const currentUser = await api.auth.getCurrentUser();
                if (currentUser) {
                    const templates = await templateApi.getAll(currentUser.id);
                    const foundTemplate = templates.find(t => String(t.id) === classId);
                    setTemplate(foundTemplate || null);
                }

                const apps = await applicationApi.getBySessionId(foundSession.id);
                setApplications(apps);

                const studentIds = [...new Set(apps.map(a => a.studentId))];
                const studentPromises = studentIds.map(id => studentApi.getById(id));
                const studentResults = await Promise.all(studentPromises);
                setStudents(studentResults.filter((s): s is Student => s !== null));
            } else if (isDemoMode) {
                // 데모 모드에서 세션을 못 찾으면 데모 데이터 사용
                setSession(demoSession);
                setTemplate(demoTemplate);
            } else {
                router.push(`/dashboard/classes/${classId}`);
            }
        };
        fetchData();
    }, [classId, sessionId, router, isDemoMode, isDemoSession]);
    if (!session || !template) {
        return <div className="p-8 text-center text-[#8B95A1]">로딩 중...</div>;
    }

    return (
        <div className="space-y-6">
            <Button variant="ghost" onClick={() => router.push(`/dashboard/classes/${classId}`)} className="px-3 text-[#6B7684] hover:text-[#191F28] -ml-2 mb-4 w-fit">
                <ArrowLeft className="mr-2 h-4 w-4" />
                세션 목록으로
            </Button>

            <Card className="hover:shadow-md">
                <CardHeader className="p-5 md:p-6">
                    <div>
                        <CardTitle className="text-lg md:text-xl">{template.name}</CardTitle>
                        <CardDescription className="mt-2 text-sm">
                            {format(new Date(session.date), 'PPP (EEE)', { locale: ko })} {session.startTime} - {session.endTime}
                        </CardDescription>
                        <div className="mt-4 text-sm text-[#4E5968]">
                            <p><span className="font-semibold text-[#191F28]">장소:</span> {template.location}</p>
                        </div>
                    </div>
                </CardHeader>
            </Card>

            <ApplicationList
                key={`app-list-${isDemoMode}`}
                applications={displayApplications}
                students={displayStudents}
                sessionMessages={sessionMessages}
                capacity={session.capacity}
            />

            <FloatingGuideButton pageId="applications" />
        </div>
    );
}
