"use client";

import React, { useState } from "react";
import { ArrowLeft, Clock, CheckCircle2, XCircle, ChevronDown } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

const MOCK_HISTORY = [
    {
        id: "h1", date: "오늘 14:30", type: "장소 변경", recipients: "홍길동 외 2명", status: "success",
        preview: "오늘 진행되는 초보자를 위한...",
        fullText: "[긴급 안내]\n\n오늘 진행되는 초보자를 위한 베이킹 클래스 수업 장소가 변경되었습니다.\n\n-변경 전: **서울특별시 강남구 서초동 123-45 (아트타워 3층)**\n-변경 후: **서울특별시 마포구 연남동 456-78 (베이킹 스튜디오 2층)**\n\n자세한 위치는 클래스 링크에서 확인해주세요."
    },
    {
        id: "h2", date: "오늘 09:00", type: "자동 알림", recipients: "전체(4명)", status: "success",
        preview: "결제가 완료되었습니다. 클래스...",
        fullText: "[Class Hub]\n결제가 완료되었습니다.\n\n클래스명: 초보자를 위한 베이킹 클래스\n결제금액: 50,000원\n\n클래스 링크를 통해 상세 정보를 확인하세요."
    },
    {
        id: "h3", date: "어제 18:15", type: "시간 변경", recipients: "홍기삼", status: "fail",
        preview: "10:00 수업 시작 시간이 변경...",
        fullText: "[긴급 안내]\n\n프랑스 자수 원데이 클래스 수업 시작 시간이 변경되었습니다.\n\n-기존: **10:00**\n-변경: **11:00**\n\n참고 부탁드립니다."
    },
    {
        id: "h4", date: "어제 10:00", type: "D-1 리마인더", recipients: "전체(4명)", status: "success",
        preview: "내일 클래스가 시작됩니다! 준...",
        fullText: "[리마인더]\n내일 클래스가 시작됩니다!\n\n준비물: 앞치마, 필기도구\n지각 시 입장이 제한될 수 있으니 10분 전까지 도착 부탁드립니다."
    },
];

export default function MessageHistoryPage() {
    const router = useRouter();
    const [expandedId, setExpandedId] = useState<string | null>(null);

    const toggleExpand = (id: string) => {
        setExpandedId(expandedId === id ? null : id);
    };

    return (
        <div className="max-w-[1400px] mx-auto space-y-6 pb-10 animate-in fade-in duration-300">
            {/* Header - Aligned with the main Messages Page */}
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 border-b border-gray-100 pb-6 mb-6">
                <div className="flex items-start gap-4">
                    <Button
                        variant="ghost"
                        size="icon"
                        className="rounded-xl hover:bg-gray-100 text-gray-500 shrink-0 mt-0.5"
                        onClick={() => router.back()}
                    >
                        <ArrowLeft className="w-5 h-5" />
                    </Button>
                    <div>
                        <h1 className="text-xl md:text-2xl font-bold text-[#191F28] flex items-center gap-2">
                            알림 발송 이력
                        </h1>
                        <p className="text-sm md:text-base text-[#8B95A1] mt-1">
                            최근 30일 동안 발송된 메시지 내역입니다.
                        </p>
                    </div>
                </div>
            </div>

            {/* List Content - Compact & Horizontal */}
            <div className="space-y-3">
                {MOCK_HISTORY.map((item) => {
                    const isExpanded = expandedId === item.id;

                    return (
                        <div
                            key={item.id}
                            onClick={() => toggleExpand(item.id)}
                            className={`py-4 px-5 rounded-xl border transition-all cursor-pointer group flex flex-col gap-2 ${isExpanded ? 'border-[#3182F6]/40 bg-[#F9FAFB] shadow-sm' : 'border-gray-100 bg-white hover:border-[#3182F6]/30 hover:shadow-sm'
                                }`}
                        >
                            {/* Collapsed Header Line */}
                            <div className="flex items-center justify-between gap-4">
                                <div className="flex items-center gap-3 md:gap-4 overflow-hidden flex-1">
                                    {/* Type */}
                                    <span className="shrink-0 px-2.5 py-1 bg-[#F2F4F6] text-[#4E5968] text-[12px] font-semibold rounded-md">
                                        {item.type}
                                    </span>

                                    {/* Recipient */}
                                    <span className="shrink-0 text-[#191F28] text-[14px] font-bold">
                                        {item.recipients}
                                    </span>

                                    {/* Preview text */}
                                    <span className="truncate text-[#8B95A1] text-[14px] leading-snug">
                                        {item.preview}
                                    </span>
                                </div>

                                {/* Right side information */}
                                <div className="flex items-center gap-4 shrink-0">
                                    {/* Date */}
                                    <span className="text-[#8B95A1] text-[13px] font-medium hidden sm:block">
                                        {item.date}
                                    </span>

                                    {/* Status */}
                                    <div className="w-[60px] flex justify-end">
                                        {item.status === 'success' ? (
                                            <span className="text-[#3182F6] font-semibold text-[13px]">발송성공</span>
                                        ) : (
                                            <span className="text-[#F04452] font-semibold text-[13px]">발송실패</span>
                                        )}
                                    </div>

                                    {/* Chevron */}
                                    <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`} />
                                </div>
                            </div>

                            {/* Expanded Body */}
                            {isExpanded && (
                                <div className="mt-3 pt-3 border-t border-gray-100/60 animate-in fade-in slide-in-from-top-2 duration-200">
                                    <div className="whitespace-pre-wrap bg-gray-50 p-5 rounded-xl border border-gray-100/50 shadow-inner text-[14px] leading-relaxed text-[#4E5968]">
                                        {item.fullText}
                                    </div>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
