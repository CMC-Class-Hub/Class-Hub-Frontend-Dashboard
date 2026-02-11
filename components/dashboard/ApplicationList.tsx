"use client";

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users } from "lucide-react";
import { format } from "date-fns";
import type { Application, Student, Message } from "@/lib/api";

interface ApplicationListProps {
    applications: Application[];
    students: Student[];
    sessionMessages: Message[];
    capacity: number;
}

export function ApplicationList({ applications, students, sessionMessages, capacity }: ApplicationListProps) {
    const getStudentById = (studentId: string): Student | null => {
        return students.find(s => s.id === studentId) || null;
    };

    const validApplications = applications.filter(app => !!getStudentById(app.studentId));

    // reservationStatus 필드를 사용하여 CONFIRMED만 카운트
    const confirmedCount = validApplications.filter(app =>
        (app as any).reservationStatus === 'CONFIRMED'
    ).length;
    return (
        <Card className="hover:shadow-md" data-coachmark="application-list">
            <CardHeader className="p-5 md:p-6">
                <CardTitle className="text-base md:text-lg">신청자 목록</CardTitle>
                <CardDescription className="text-sm">
                    총 <span className="font-semibold text-[#3182F6]">{confirmedCount}명</span> / 정원 {capacity}명
                </CardDescription>
            </CardHeader>
            <CardContent className="p-5 md:p-6 pt-0 md:pt-0">
                {validApplications.length === 0 ? (
                    <div className="text-center py-6 md:py-8">
                        <div className="w-12 h-12 md:w-14 md:h-14 bg-[#F2F4F6] rounded-full flex items-center justify-center mx-auto mb-3">
                            <Users className="h-6 w-6 md:h-7 md:w-7 text-[#8B95A1]" />
                        </div>
                        <p className="text-sm md:text-base text-[#8B95A1]">아직 신청자가 없습니다</p>
                    </div>
                ) : (
                    <div className="space-y-3">
                        {validApplications.map((app, index) => {
                            const student = getStudentById(app.studentId)!;
                            const appStatus = (app as any).reservationStatus || app.status;
                            const isFirstApp = index === 0;

                            // 메시지 상태 확인 (API에서 직접 제공하는 상태 사용)
                            const isD3Sent = app.sentD3Notification;
                            const isD1Sent = app.sentD1Notification;

                            return (
                                <div
                                    key={`app-${app.reservationId}`}
                                    className="flex flex-col sm:flex-row sm:items-center justify-between p-4 md:p-5 bg-[#F9FAFB] rounded-2xl gap-4 hover:bg-[#F2F4F6] transition-colors"
                                >
                                    <div className="min-w-0 flex-1">
                                        <div className="flex items-center gap-2 mb-1">
                                            <p className="font-bold text-base text-[#191F28]">{student.name}</p>
                                            <Badge variant={appStatus === 'CONFIRMED' ? 'default' : 'outline'} className="text-xs">
                                                {appStatus === 'CONFIRMED' ? '확정' : appStatus === 'PENDING' ? '대기' : '취소'}
                                            </Badge>
                                        </div>
                                        <div className="text-sm text-[#6B7684] space-y-0.5">
                                            <p>{student.phone || '전화번호 없음'}</p>
                                            <p className="text-xs text-[#8B95A1]">신청: {format(new Date(app.appliedAt), 'yyyy.MM.dd HH:mm')}</p>
                                        </div>
                                    </div>

                                    <div className="flex gap-2 text-xs" {...(isFirstApp && { 'data-coachmark': 'message-status' })}>
                                        <div className={`px-3 py-2 rounded-xl ${isD3Sent ? 'bg-[#E8F3FF] text-[#3182F6]' : 'bg-[#F2F4F6] text-[#8B95A1]'}`}>
                                            <p className="font-bold mb-0.5">D-3</p>
                                            <p className="text-xs">{isD3Sent ? '발송됨' : '미발송'}</p>
                                        </div>
                                        <div className={`px-3 py-2 rounded-xl ${isD1Sent ? 'bg-[#E8F3FF] text-[#3182F6]' : 'bg-[#F2F4F6] text-[#8B95A1]'}`}>
                                            <p className="font-bold mb-0.5">D-1</p>
                                            <p className="text-xs">{isD1Sent ? '발송됨' : '미발송'}</p>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </CardContent>
        </Card>
    );
}   