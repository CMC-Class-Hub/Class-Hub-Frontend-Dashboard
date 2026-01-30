"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Trash2, Calendar } from "lucide-react";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import type { ClassSession } from "@/lib/api";
import { useRouter } from "next/navigation";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface SessionListProps {
    sessions: ClassSession[];
    sessionApplicationCounts: Record<string, number>;
    onDeleteSession: (sessionId: string) => void;
    onEditSession: (session: ClassSession) => void;
    onStatusChange?: (sessionId: string, newStatus: 'RECRUITING' | 'CLOSED' | 'FINISHED') => void;
    classId: string;
}

export function SessionList({ sessions, sessionApplicationCounts, onDeleteSession, onEditSession, onStatusChange, classId }: SessionListProps) {
    const router = useRouter();

    if (sessions.length === 0) {
        // ... (unchanged)
        return (
            <Card className="hover:shadow-md">
                <CardContent className="p-10 md:p-14 text-center">
                    <div className="w-14 h-14 md:w-16 md:h-16 bg-[#E8F3FF] rounded-full flex items-center justify-center mx-auto mb-4">
                        <Calendar className="h-7 w-7 md:h-8 md:w-8 text-[#3182F6]" />
                    </div>
                    <h3 className="text-base md:text-lg font-bold text-[#191F28] mb-2">
                        아직 세션이 없습니다
                    </h3>
                    <p className="text-sm md:text-base text-[#8B95A1]">
                        시간대별 세션을 추가하세요
                    </p>
                </CardContent>
            </Card>
        );
    }

    return (
        <div className="space-y-3">
            {sessions.map((session) => {
                const confirmedCount = sessionApplicationCounts[session.id] || 0;

                return (
                    <Card key={session.id} className="hover:shadow-md hover:border-[#3182F6]/30 transition-all duration-200">
                        <CardContent className="p-4 md:p-5">
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                                <div className="flex-1">
                                    <div className="flex flex-wrap items-center gap-2 mb-2">
                                        <h3 className="font-bold text-sm md:text-base text-[#191F28]">
                                            {format(new Date(session.date), 'M월 d일 (EEE)', { locale: ko })}
                                        </h3>
                                        <Badge variant="outline" className="text-xs">
                                            {session.startTime} - {session.endTime}
                                        </Badge>

                                        {onStatusChange ? (
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Badge
                                                        variant={session.status === 'RECRUITING' ? 'default' : 'secondary'}
                                                        className={`text-xs cursor-pointer hover:opacity-80 transition-opacity min-w-[60px] justify-center ${session.status !== 'RECRUITING' ? 'bg-[#E5E8EB] text-[#4E5968] hover:bg-[#D1D6DB]' : ''
                                                            }`}
                                                    >
                                                        {session.status === 'RECRUITING' ? '모집중' : session.status === 'CLOSED' ? '마감' : '종료'} ▾
                                                    </Badge>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="start">
                                                    <DropdownMenuItem onClick={() => onStatusChange(session.id, 'RECRUITING')}>
                                                        모집중
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem onClick={() => onStatusChange(session.id, 'CLOSED')}>
                                                        마감
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem onClick={() => onStatusChange(session.id, 'FINISHED')}>
                                                        종료
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        ) : (
                                            <Badge variant={session.status === 'RECRUITING' ? 'default' : 'secondary'} className="text-xs">
                                                {session.status === 'RECRUITING' ? '모집중' : session.status === 'CLOSED' ? '마감' : '종료'}
                                            </Badge>
                                        )}
                                    </div>
                                    <p className="text-xs md:text-sm text-[#6B7684]">
                                        신청 <span className="font-semibold text-[#3182F6]">{confirmedCount}명</span> / 정원 {session.capacity}명
                                    </p>
                                </div>

                                <div className="flex gap-2">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => router.push(`/dashboard/classes/${classId}/sessions/${session.id}`)}
                                        className="flex-1 sm:flex-none text-xs md:text-sm"
                                    >
                                        신청자 보기
                                    </Button>

                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => onEditSession(session)}
                                        className="text-[#B0B8C1] hover:text-[#3182F6] hover:bg-[#E8F3FF]"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-pencil"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" /><path d="m15 5 4 4" /></svg>
                                    </Button>

                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => onDeleteSession(session.id)}
                                        className="text-[#B0B8C1] hover:text-[#F04452] hover:bg-[#FFEBEE]"
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
    );
}
