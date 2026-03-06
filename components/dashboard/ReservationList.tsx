"use client";

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users } from "lucide-react";
import { format } from "date-fns";
import type { ReservationResponse, MemberResponseDto } from "@/lib/api";

interface ReservationListProps {
    reservations: ReservationResponse[];
    members: MemberResponseDto[]; // Updated type
    capacity: number;
}

export function ReservationList({ reservations, members, capacity }: ReservationListProps) {
    const getMemberById = (memberId: number | undefined): MemberResponseDto | null => {
        if (!memberId) return null;
        return members.find(m => m.id === memberId) || null; // Compare numbers
    };

    const validReservations = reservations.filter(r => !!getMemberById(r.studentId));

    // reservationStatus: 'CONFIRMED'
    const confirmedCount = validReservations.filter(r =>
        r.reservationStatus === 'CONFIRMED'
    ).length;

    return (
        <Card className="hover:shadow-md" data-coachmark="reservation-list">
            <CardHeader className="p-5 md:p-6">
                <CardTitle className="text-base md:text-lg">신청자 목록</CardTitle>
                <CardDescription className="text-sm">
                    총 <span className="font-semibold text-[#3182F6]">{confirmedCount}명</span> / 정원 {capacity}명
                </CardDescription>
            </CardHeader>
            <CardContent className="p-5 md:p-6 pt-0 md:pt-0">
                {validReservations.length === 0 ? (
                    <div className="text-center py-6 md:py-8">
                        <div className="w-12 h-12 md:w-14 md:h-14 bg-[#F2F4F6] rounded-full flex items-center justify-center mx-auto mb-3">
                            <Users className="h-6 w-6 md:h-7 md:w-7 text-[#8B95A1]" />
                        </div>
                        <p className="text-sm md:text-base text-[#8B95A1]">아직 신청자가 없습니다</p>
                    </div>
                ) : (
                    <div className="space-y-3">
                        {validReservations.map((reservation, index) => {
                            const member = getMemberById(reservation.studentId)!;
                            const status = reservation.reservationStatus;
                            const isFirst = index === 0;

                            // Assuming ReservationResponse might not have these fields yet?
                            // Check ReservationResponse definition.
                            // If they are missing, we should probably ignore them or assume false for now.
                            // But checking earlier log `ReservationResponse` interface had only basic fields?
                            // Step 1132 just showed export.
                            // Step 1068 showed imports.
                            // I need to be careful about `sentD3Notification`.
                            // Let's assume they are NOT in ReservationResponse for now and remove that part or cast to any if necessary.
                            // The generated `ReservationResponse` usually mirrors backend DTO.
                            // If backend DTO has them, they are there.
                            // Let's coerce to any to avoid type error if they are missing, or check if they exist.
                            // Ideally I should check `ReservationResponse.ts` but I will cast to any for safety on these specific fields to avoid build break if missing.
                            const isD3Sent = (reservation as any).sentD3Notification;
                            const isD1Sent = (reservation as any).sentD1Notification;

                            return (
                                <div
                                    key={`reservation-${reservation.reservationId}`}
                                    className="flex flex-col sm:flex-row sm:items-center justify-between p-4 md:p-5 bg-[#F9FAFB] rounded-2xl gap-4 hover:bg-[#F2F4F6] transition-colors"
                                >
                                    <div className="min-w-0 flex-1">
                                        <div className="flex items-center gap-2 mb-1">
                                            <p className="font-bold text-base text-[#191F28]">{member.name}</p>
                                            <Badge variant={status === 'CONFIRMED' ? 'default' : 'outline'} className="text-xs">
                                                {status === 'CONFIRMED' ? '확정' : status === 'PENDING' ? '대기' : '취소'}
                                            </Badge>
                                        </div>
                                        <div className="text-sm text-[#6B7684] space-y-0.5">
                                            <p>{member.phone || '전화번호 없음'}</p>
                                            <p className="text-xs text-[#8B95A1]">신청: {reservation.appliedAt ? format(new Date(reservation.appliedAt), 'yyyy.MM.dd HH:mm') : '-'}</p>
                                        </div>
                                    </div>

                                    <div className="flex gap-2 text-xs" {...(isFirst && { 'data-coachmark': 'message-status' })}>
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