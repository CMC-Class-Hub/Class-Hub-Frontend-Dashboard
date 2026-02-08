"use client";

import { ChevronLeft, MoreHorizontal, Calendar, MapPin, Phone, CheckCircle2 } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface DashboardPreviewProps {
    className?: string;
    date?: string;
    startTime?: string;
    location?: string;
}

export const DashboardPreview = ({
    className = "",
    date = "",
    startTime = "",
    location = "",
}: DashboardPreviewProps) => {
    // Basic date formatting
    const formatDate = (dateStr: string) => {
        if (!dateStr) return undefined;
        try {
            const d = new Date(dateStr);
            const month = d.getMonth() + 1;
            const day = d.getDate();
            const days = ['일', '월', '화', '수', '목', '금', '토'];
            const dayName = days[d.getDay()];
            return `${month}월 ${day}일 (${dayName})`;
        } catch (e) {
            return dateStr;
        }
    };

    const formattedDate = formatDate(date);
    const displayTime = startTime;
    const displayLocation = location;

    // Mock Applicant Data based on real service structure
    const applicants = [
        {
            id: 1,
            name: "김철수",
            phone: "010-1234-5678",
            status: "CONFIRMED",
            appliedAt: "24.03.10",
            d3Status: "SENT",
            d1Status: "PENDING"
        },
        {
            id: 2,
            name: "이영희",
            phone: "010-9876-5432",
            status: "CONFIRMED",
            appliedAt: "24.03.11",
            d3Status: "SENT",
            d1Status: "PENDING"
        },
        {
            id: 3,
            name: "박지민",
            phone: "010-3333-2222",
            status: "CONFIRMED",
            appliedAt: "24.03.11",
            d3Status: "SENT",
            d1Status: "PENDING"
        },
        {
            id: 4,
            name: "홍길동",
            phone: "010-5555-4444",
            status: "CANCELED",
            appliedAt: "24.03.12",
            d3Status: "PENDING",
            d1Status: "PENDING"
        },
    ];

    return (
        <div className="w-full h-full bg-[#F2F4F6] flex flex-col font-sans relative overflow-hidden">
            {/* Status Bar */}
            <div className="w-full h-7 bg-white flex justify-between items-center px-6 text-[10px] font-bold text-black z-30 shrink-0 sticky top-0">
                <span>9:42</span>
                <div className="flex gap-1.5 items-center mb-0.5">
                    <div className="w-3.5 h-2.5 bg-black rounded-[1px]"></div>
                    <div className="w-3.5 h-2.5 bg-black rounded-[1px]"></div>
                </div>
            </div>

            {/* Header (Sticky) */}
            <div className="bg-white px-4 py-3 border-b border-gray-100 z-20 shrink-0 sticky top-7">
                <div className="flex items-center gap-1 mb-3">
                    <ChevronLeft className="w-5 h-5 text-[#333D4B] -ml-1.5" />
                    <span className="text-sm font-bold text-[#191F28]">세션 관리</span>
                </div>

                {/* Session Summary Card */}
                <div className="bg-gray-50 rounded-xl p-3 border border-gray-100">
                    <h2 className="text-sm font-bold text-[#191F28] mb-1 line-clamp-1">{className || "클래스명"}</h2>
                    <div className="text-[11px] text-[#6B7684] space-y-0.5">
                        <div className="flex items-center gap-1.5">
                            <Calendar className="w-3 h-3 text-[#9FA6B2]" />
                            <span>{formattedDate || "날짜"} {displayTime || "시간"}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <MapPin className="w-3 h-3 text-[#9FA6B2]" />
                            <span className="line-clamp-1">{displayLocation || "장소"}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Scrollable Content Area */}
            <div className="flex-1 overflow-y-auto scrollbar-hide bg-white">
                {/* Applicant List Header */}
                <div className="px-4 py-3 bg-white border-b border-gray-50 flex justify-between items-center sticky top-0 z-10">
                    <span className="text-xs font-bold text-[#191F28]">신청자 <span className="text-[#3182F6]">{applicants.filter(a => a.status === 'CONFIRMED').length}</span></span>
                </div>

                {/* List Items */}
                <div className="px-4 py-2 space-y-3 pb-2">
                    {applicants.map((member) => (
                        <div key={member.id} className="py-3 border-b border-gray-50 last:border-0 flex flex-col gap-2.5">
                            {/* Top Row: Info */}
                            <div className="flex justify-between items-start">
                                <div className="flex items-center gap-2.5">
                                    {/* Avatar removed as requested */}
                                    <div>
                                        <div className="flex items-center gap-1.5">
                                            <span className="text-sm font-bold text-[#191F28]">{member.name}</span>
                                            <span className={`text-[9px] px-1.5 py-0.5 rounded-sm font-medium 
                                                ${member.status === 'CONFIRMED' ? 'bg-blue-50 text-blue-600' : ''}
                                                ${member.status === 'PENDING' ? 'bg-gray-100 text-gray-500' : ''}
                                                ${member.status === 'CANCELED' ? 'bg-red-50 text-red-500' : ''}
                                            `}>
                                                {member.status === 'CONFIRMED' && '확정'}
                                                {member.status === 'PENDING' && '대기'}
                                                {member.status === 'CANCELED' && '취소'}
                                            </span>
                                        </div>
                                        <p className="text-[11px] text-[#8B95A1] mt-0.5">{member.phone}</p>
                                    </div>
                                </div>
                                <span className="text-[10px] text-[#C1C7CD] font-medium">{member.appliedAt}</span>
                            </div>

                            {/* Bottom Row: Message Automation Status */}
                            <div className="flex gap-2">
                                <div className={`flex items-center gap-1.5 px-2 py-1 rounded-md text-[10px] w-fit ${member.d3Status === 'SENT' ? 'bg-[#E8F3FF] text-[#3182F6]' : 'bg-[#F2F4F6] text-[#8B95A1]'}`}>
                                    <span className="font-bold">D-3</span>
                                    <span>{member.d3Status === 'SENT' ? '발송완료' : '미발송'}</span>
                                </div>
                                <div className={`flex items-center gap-1.5 px-2 py-1 rounded-md text-[10px] w-fit ${member.d1Status === 'SENT' ? 'bg-[#E8F3FF] text-[#3182F6]' : 'bg-[#F2F4F6] text-[#8B95A1]'}`}>
                                    <span className="font-bold">D-1</span>
                                    <span>{member.d1Status === 'SENT' ? '발송완료' : '예정'}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Home Indicator */}
            <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-1/3 h-1 bg-black/20 rounded-full z-20"></div>
        </div>
    );
};
