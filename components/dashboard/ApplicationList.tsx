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
        console.log('Looking for studentId:', applications);
        return students.find(s => s.id === studentId) || null;
    };

    return (
        <Card className="hover:shadow-md">
            <CardHeader className="p-5 md:p-6">
                <CardTitle className="text-base md:text-lg">신청자 목록</CardTitle>
                <CardDescription className="text-sm">
                    총 <span className="font-semibold text-[#3182F6]">{students.length}명</span> / 정원 {capacity}명
                </CardDescription>
            </CardHeader>
            <CardContent className="p-5 md:p-6 pt-0 md:pt-0">
                {students.length === 0 ? (
                    <div className="text-center py-10 md:py-12">
                        <div className="w-14 h-14 md:w-16 md:h-16 bg-[#F2F4F6] rounded-full flex items-center justify-center mx-auto mb-4">
                            <Users className="h-7 w-7 md:h-8 md:w-8 text-[#8B95A1]" />
                        </div>
                        <p className="text-sm md:text-base text-[#8B95A1]">아직 신청자가 없습니다</p>
                    </div>
                ) : (
                    <div className="space-y-3">
                        {applications.map((app) => {
                            const student = getStudentById(app.studentId);
                            if (!student) return null;
                            // 메시지 상태 확인
                            const d3Msg = sessionMessages.find(m => m.studentId === student.id && m.type === 'D-3');
                            const d1Msg = sessionMessages.find(m => m.studentId === student.id && m.type === 'D-1');

                            return (
                                <div key={app.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 md:p-5 bg-[#F9FAFB] rounded-2xl gap-4 hover:bg-[#F2F4F6] transition-colors">
                                    <div className="min-w-0 flex-1">
                                        <div className="flex items-center gap-2 mb-1">
                                            <p className="font-bold text-base text-[#191F28]">{student.name}</p>
                                            <Badge variant={app.status === 'CONFIRMED' ? 'default' : 'outline'} className="text-xs">
                                                {app.status === 'CONFIRMED' ? '확정' : app.status === 'PENDING' ? '대기' : '취소'}
                                            </Badge>
                                        </div>
                                        <div className="text-sm text-[#6B7684] space-y-0.5">
                                            <p>{student.phone || '전화번호 없음'}</p>
                                            <p className="text-xs text-[#8B95A1]">신청: {format(new Date(app.appliedAt), 'yyyy.MM.dd HH:mm')}</p>
                                        </div>
                                    </div>

                                    <div className="flex gap-2 text-xs">
                                        <div className={`px-3 py-2 rounded-xl ${d3Msg ? 'bg-[#E8F3FF] text-[#3182F6]' : 'bg-[#F2F4F6] text-[#8B95A1]'}`}>
                                            <p className="font-bold mb-0.5">D-3</p>
                                            <p className="text-xs">{d3Msg ? (d3Msg.status === 'SENT' ? '전송완료' : '전송예정') : '미발송'}</p>
                                        </div>
                                        <div className={`px-3 py-2 rounded-xl ${d1Msg ? 'bg-[#E8F3FF] text-[#3182F6]' : 'bg-[#F2F4F6] text-[#8B95A1]'}`}>
                                            <p className="font-bold mb-0.5">D-1</p>
                                            <p className="text-xs">{d1Msg ? (d1Msg.status === 'SENT' ? '전송완료' : '전송예정') : '미발송'}</p>
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
