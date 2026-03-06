"use client";

import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import { api, sessionApi, onedayClassApi, type SessionResponse, type OnedayClassResponse, type ReservationResponse, type MemberResponseDto } from "@/lib/api";
import { ReservationList } from "@/components/dashboard/ReservationList";
import { FloatingGuideButton } from "@/components/coachmark";
import { useCoachmark } from "@/components/coachmark/hooks/useCoachmark";
import { formatTime12h } from "@/lib/utils";

export default function SessionDetailPage({ params }: { params: Promise<{ classId: string; sessionId: string }> }) {
    const router = useRouter();
    const { classId, sessionId } = use(params);
    const [session, setSession] = useState<SessionResponse | null>(null);
    const [template, setTemplate] = useState<OnedayClassResponse | null>(null);
    const [reservations, setReservations] = useState<ReservationResponse[]>([]);
    const [members, setMembers] = useState<MemberResponseDto[]>([]);
    const { isDemoMode } = useCoachmark();

    // 데모 데이터 (가이드 실행 중에만 표시)
    const demoTemplate: OnedayClassResponse = {
        id: Number(classId) || 999,
        classCode: 'demo-class',
        name: '도자기 원데이 클래스',
        description: '나만의 도자기를 만들어보세요',
        imageUrls: ['/demo/class.jpg'],
        // price, status removed as they are not in OnedayClassResponse
        instructorId: 999,
        location: '서울시 강남구',
        // creatorId, createdAt, updatedAt removed as they are not in OnedayClassResponse
        // optional properties handling
    };

    const demoSession: SessionResponse = {
        id: Number(sessionId) || 99999,
        date: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // Date object
        startTime: "10:00:00",
        endTime: "12:00:00",
        capacity: 10,
        currentNum: 3,
        status: 'RECRUITING',
        price: 50000,
    };

    const demoReservations: ReservationResponse[] = [
        {
            reservationId: 5001,
            studentId: 1001,
            reservationStatus: 'CONFIRMED',
            appliedAt: new Date(),
        },
        {
            reservationId: 5002,
            studentId: 1002,
            reservationStatus: 'PENDING',
            appliedAt: new Date(),
        },
        {
            reservationId: 5003,
            studentId: 1003,
            reservationStatus: 'CANCELLED',
            appliedAt: new Date(),
        }
    ];

    const demoMembers: MemberResponseDto[] = [
        {
            id: 1001,
            name: '김민지',
            phone: '010-1234-5678',
        },
        {
            id: 1002,
            name: '이수현',
            phone: '010-2345-6789',
        },
        {
            id: 1003,
            name: '박서준',
            phone: '010-3456-7890',
        }
    ];

    const isDemoSession = sessionId.startsWith('demo-') || ['101', '102'].includes(sessionId);

    useEffect(() => {
        const fetchData = async () => {
            if (isDemoSession && isDemoMode) {
                setSession(demoSession);
                setTemplate(demoTemplate);
                return;
            }

            try {
                // sessionId param in URL is string, API expects number. 
                // However, our sessionId might be string from routing.
                const sessionIdNum = Number(sessionId);
                if (isNaN(sessionIdNum)) {
                    // Handle non-numeric session ID if necessary (e.g. demo)
                    if (!isDemoSession) {
                        router.push(`/dashboard/classes/${classId}`);
                        return;
                    }
                }

                const foundSession = await sessionApi.getSession({ sessionId: sessionIdNum });
                setSession(foundSession);

                // template lookup
                const classIdNum = Number(classId);
                const currentUser = await api.auth.getCurrentUser();
                if (currentUser) {
                    const templates = await onedayClassApi.getMyClasses();
                    const foundTemplate = templates.find((t: any) => t.id === classIdNum);
                    setTemplate(foundTemplate || null);
                }

                const resList = await api.reservation.getReservations({ sessionId: sessionIdNum });
                setReservations(resList);

                // Member fetching logic
                const memberIds = [...new Set(resList.map((r: any) => r.studentId).filter((id: any): id is number => id !== undefined))];

                // memberApi.getById expects number ID
                const memberPromises = memberIds.map(id => api.member.getById({ id }));
                const memberResults = await Promise.all(memberPromises);
                setMembers(memberResults); // assuming MemberResponseDto is compatible or strict
            } catch (e) {
                console.error("Error fetching session details", e);
                router.push(`/dashboard/classes/${classId}`);
            }
        };
        fetchData();
    }, [classId, sessionId, router, isDemoMode, isDemoSession]);

    // Derived state
    // 데모 모드일 때와 아닐 때 보여줄 데이터 구분
    // 가이드 모드이면서 실제 데이터가 없을 때만 예시 데이터를 보여줌
    const displayReservations = isDemoMode && reservations.length === 0 ? demoReservations : reservations;
    const displayMembers = isDemoMode && reservations.length === 0 ? demoMembers : members;

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
                            {format(new Date(session.date || new Date()), 'PPP (EEE)', { locale: ko })} {formatTime12h(session.startTime)} - {formatTime12h(session.endTime)}
                        </CardDescription>
                        <div className="mt-4 text-sm text-[#4E5968]">
                            <p><span className="font-semibold text-[#191F28]">장소:</span> {template.location}</p>
                        </div>
                    </div>
                </CardHeader>
            </Card>

            <ReservationList
                key={`res-list-${isDemoMode}`}
                reservations={displayReservations}
                members={displayMembers}
                capacity={session.capacity || 0}
            />

            <FloatingGuideButton pageId="applications" />
        </div>
    );
}
