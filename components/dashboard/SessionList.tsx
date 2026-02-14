"use client";

import React, { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Users, Clock, CreditCard } from "lucide-react";
import { formatTime12h } from "@/lib/utils";

// 세션 타입 정의
interface ClassSession {
    id: string;
    date: string;
    startTime: string;
    endTime: string;
    capacity: number;
    currentNum?: number;
    price: number;
    status: 'RECRUITING' | 'FULL' | 'CLOSED';
}

interface SessionListProps {
    sessions: ClassSession[];
    sessionApplicationCounts: Record<string, number>;
    onDeleteSession: (sessionId: string) => void;
    onEditSession: (session: ClassSession) => void;
    onStatusChange?: (sessionId: string, newStatus: 'RECRUITING' | 'FULL' | 'CLOSED') => void;
    onAddSession?: () => void;
    classId: string;
}

// 날짜 포맷 함수
const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const days = ['일', '월', '화', '수', '목', '금', '토'];
    const dayOfWeek = days[date.getDay()];
    return `${month}월${day}일 (${dayOfWeek})`;
};

export function SessionList({ sessions, sessionApplicationCounts, onDeleteSession, onEditSession, onStatusChange, onAddSession, classId }: SessionListProps) {
    const router = useRouter();
    const [selectedMonth, setSelectedMonth] = useState(() => {
        const now = new Date();
        return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
    });
    const [openDropdown, setOpenDropdown] = useState<string | null>(null);

    // 월별로 그룹화된 세션 날짜 목록
    const sessionsByMonth = useMemo(() => {
        const grouped: Record<string, Record<string, ClassSession[]>> = {};

        sessions.forEach((session) => {
            const date = new Date(session.date);
            const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
            const dateKey = session.date;

            if (!grouped[monthKey]) {
                grouped[monthKey] = {};
            }
            if (!grouped[monthKey][dateKey]) {
                grouped[monthKey][dateKey] = [];
            }
            grouped[monthKey][dateKey].push(session);
        });

        // 각 월의 날짜들을 정렬하고, 각 날짜 내에서 시간순으로 정렬
        Object.keys(grouped).forEach(month => {
            const sortedDates = Object.keys(grouped[month]).sort();
            const sortedMonth: Record<string, ClassSession[]> = {};

            sortedDates.forEach(date => {
                sortedMonth[date] = grouped[month][date].sort((a, b) =>
                    a.startTime.localeCompare(b.startTime)
                );
            });

            grouped[month] = sortedMonth;
        });

        return grouped;
    }, [sessions]);

    // 현재 선택된 월의 세션들
    const currentMonthSessions = sessionsByMonth[selectedMonth] || {};

    const changeMonth = (direction: 'prev' | 'next') => {
        const [year, month] = selectedMonth.split('-').map(Number);
        let newYear = year;
        let newMonth = month;

        if (direction === 'prev') {
            newMonth -= 1;
            if (newMonth < 1) {
                newMonth = 12;
                newYear -= 1;
            }
        } else {
            newMonth += 1;
            if (newMonth > 12) {
                newMonth = 1;
                newYear += 1;
            }
        }

        setSelectedMonth(`${newYear}-${String(newMonth).padStart(2, '0')}`);
    };

    if (sessions.length === 0) {
        return (
            <div className="space-y-4">
                {/* 월 선택 */}
                <div className="flex items-center justify-center gap-4 pb-2">
                    <button
                        onClick={() => changeMonth('prev')}
                        className="h-8 w-8 p-0 inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors hover:bg-gray-100"
                    >
                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <polyline points="15 18 9 12 15 6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>
                    <div className="font-bold text-lg text-[#191F28] min-w-[100px] text-center">
                        {selectedMonth.split('-')[0]}년 {parseInt(selectedMonth.split('-')[1])}월
                    </div>
                    <button
                        onClick={() => changeMonth('next')}
                        className="h-8 w-8 p-0 inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors hover:bg-gray-100"
                    >
                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <polyline points="9 18 15 12 9 6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>
                </div>

                <div className="rounded-lg border bg-white shadow-sm hover:shadow-md transition-shadow">
                    <div className="p-8 md:p-10 text-center">
                        <div className="w-14 h-14 md:w-16 md:h-16 bg-[#E8F3FF] rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg className="h-7 w-7 md:h-8 md:w-8 text-[#3182F6]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                <line x1="16" y1="2" x2="16" y2="6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                <line x1="8" y1="2" x2="8" y2="6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                <line x1="3" y1="10" x2="21" y2="10" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>
                        <h3 className="text-base md:text-lg font-bold text-[#191F28] mb-2">
                            생성된 세션이 없습니다
                        </h3>
                        <p className="text-sm md:text-base text-[#8B95A1] mb-6">
                            시간대별 세션을 추가하세요
                        </p>
                        {onAddSession && (
                            <button
                                onClick={onAddSession}
                                className="inline-flex items-center justify-center rounded-lg bg-[#3182F6] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#1B64DA] transition-colors shadow-sm hover:shadow-md"
                            >
                                <svg className="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                </svg>
                                세션 추가
                            </button>
                        )}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {/* 월 선택 */}
            <div className="flex items-center justify-center gap-4 pb-2">
                <button
                    onClick={() => changeMonth('prev')}
                    className="h-8 w-8 p-0 inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors hover:bg-gray-100"
                >
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <polyline points="15 18 9 12 15 6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </button>
                <div className="font-bold text-lg text-[#191F28] min-w-[100px] text-center">
                    {selectedMonth.split('-')[0]}년 {parseInt(selectedMonth.split('-')[1])}월
                </div>
                <button
                    onClick={() => changeMonth('next')}
                    className="h-8 w-8 p-0 inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors hover:bg-gray-100"
                >
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <polyline points="9 18 15 12 9 6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </button>
            </div>

            {/* 날짜별 세션 목록 또는 빈 상태 */}
            {Object.keys(currentMonthSessions).length === 0 ? (
                <div className="rounded-lg border bg-white shadow-sm hover:shadow-md transition-shadow">
                    <div className="p-8 md:p-10 text-center">
                        <div className="w-14 h-14 md:w-16 md:h-16 bg-[#E8F3FF] rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg className="h-7 w-7 md:h-8 md:w-8 text-[#3182F6]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                <line x1="16" y1="2" x2="16" y2="6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                <line x1="8" y1="2" x2="8" y2="6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                <line x1="3" y1="10" x2="21" y2="10" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>
                        <h3 className="text-base md:text-lg font-bold text-[#191F28] mb-2">
                            생성된 세션이 없습니다
                        </h3>
                        <p className="text-sm md:text-base text-[#8B95A1] mb-6">
                            이 달에는 세션이 없습니다
                        </p>
                        {onAddSession && (
                            <button
                                onClick={onAddSession}
                                className="inline-flex items-center justify-center rounded-lg bg-[#3182F6] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#1B64DA] transition-colors shadow-sm hover:shadow-md"
                            >
                                <svg className="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                </svg>
                                세션 추가
                            </button>
                        )}
                    </div>
                </div>
            ) : (
                <div className="space-y-4">
                    {Object.entries(currentMonthSessions).map(([date, dateSessions]) => (
                        <div key={date} className="space-y-3">
                            {/* 날짜 헤더 - 깔끔한 디자인 */}
                            <div className="flex items-center gap-3 px-1">
                                <h3 className="text-base font-bold text-[#191F28] whitespace-nowrap">
                                    {formatDate(date)}
                                </h3>
                                <div className="flex-1 h-[1.5px] bg-gray-200"></div>
                            </div>

                            {/* 해당 날짜의 세션들 */}
                            <div className="space-y-2.5">
                                {dateSessions.map((session, sessionIndex) => {
                                    const confirmedCount = sessionApplicationCounts[session.id] || 0;
                                    const isDropdownOpen = openDropdown === session.id;
                                    const isFirstSession = sessionIndex === 0 && date === Object.keys(currentMonthSessions)[0];

                                    return (
                                        <div key={session.id} className="rounded-lg border bg-white shadow-sm hover:shadow-md hover:border-[#3182F6]/30 transition-all duration-200">
                                            <div className="p-4 md:p-5">
                                                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                                                    <div className="flex-1">
                                                        <div className="flex flex-wrap items-center gap-3 mb-2">
                                                            <div className="inline-flex items-center text-[#191F28]">
                                                                <Clock className="w-4 h-4 mr-2 text-[#3182F6]" />
                                                                <span className="text-base font-bold tracking-tight text-[#191F28]">
                                                                    {formatTime12h(session.startTime)} - {formatTime12h(session.endTime)}
                                                                </span>
                                                            </div>

                                                            {onStatusChange ? (
                                                                <div className="relative" {...(isFirstSession && { 'data-coachmark': 'session-status' })}>
                                                                    <button
                                                                        onClick={() => setOpenDropdown(isDropdownOpen ? null : session.id)}
                                                                        className={`inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium cursor-pointer hover:opacity-80 transition-opacity min-w-[60px] justify-center ${session.status === 'RECRUITING'
                                                                            ? 'bg-[#E8F3FF] text-[#3182F6]'
                                                                            : 'bg-[#F2F4F6] text-[#4E5968]'
                                                                            }`}
                                                                    >
                                                                        {session.status === 'RECRUITING' ? '모집중' : session.status === 'FULL' ? '마감' : '종료'} ▾
                                                                    </button>
                                                                    {isDropdownOpen && (
                                                                        <div className="absolute z-10 mt-1 w-32 rounded-lg border bg-white shadow-lg p-1">
                                                                            <button
                                                                                onClick={() => {
                                                                                    onStatusChange(session.id, 'RECRUITING');
                                                                                    setOpenDropdown(null);
                                                                                }}
                                                                                className="block w-full px-3 py-2 text-left text-sm rounded-md hover:bg-[#F2F4F6] transition-colors text-[#333D4B]"
                                                                            >
                                                                                모집중
                                                                            </button>
                                                                            <button
                                                                                onClick={() => {
                                                                                    onStatusChange(session.id, 'FULL');
                                                                                    setOpenDropdown(null);
                                                                                }}
                                                                                className="block w-full px-3 py-2 text-left text-sm rounded-md hover:bg-[#F2F4F6] transition-colors text-[#333D4B]"
                                                                            >
                                                                                마감
                                                                            </button>
                                                                            <button
                                                                                onClick={() => {
                                                                                    onStatusChange(session.id, 'CLOSED');
                                                                                    setOpenDropdown(null);
                                                                                }}
                                                                                className="block w-full px-3 py-2 text-left text-sm rounded-md hover:bg-[#F2F4F6] transition-colors text-[#333D4B]"
                                                                            >
                                                                                종료
                                                                            </button>
                                                                        </div>
                                                                    )}
                                                                </div>
                                                            ) : (
                                                                <span className={`inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium ${session.status === 'RECRUITING'
                                                                    ? 'bg-[#E8F3FF] text-[#3182F6]'
                                                                    : 'bg-[#F2F4F6] text-[#4E5968]'
                                                                    }`}>
                                                                    {session.status === 'RECRUITING' ? '모집중' : session.status === 'CLOSED' ? '마감' : '종료'}
                                                                </span>
                                                            )}
                                                        </div>
                                                        <div className="flex items-center gap-3 text-sm text-[#4E5968] mt-3">
                                                            <div className="flex items-center gap-1.5">
                                                                <Users className="w-4 h-4 text-[#8B95A1]" />
                                                                <span>
                                                                    <span className="font-semibold text-[#191F28]">{confirmedCount}</span>
                                                                    <span className="text-[#8B95A1]"> / {session.capacity}명</span>
                                                                </span>
                                                            </div>
                                                            <div className="w-[1px] h-3 bg-[#E5E8EB]" />
                                                            <div className="flex items-center gap-1.5">
                                                                <CreditCard className="w-4 h-4 text-[#8B95A1]" />
                                                                <span className="font-medium text-[#191F28]">{session.price.toLocaleString()}원</span>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="flex gap-2">
                                                        <button
                                                            onClick={() => router.push(`/dashboard/classes/${classId}/sessions/${session.id}`)}
                                                            className="flex-1 sm:flex-none inline-flex items-center justify-center rounded-md border border-gray-300 bg-white px-3 py-2 text-xs md:text-sm font-medium hover:bg-gray-50 transition-colors"
                                                            {...(isFirstSession && { 'data-coachmark': 'view-applications-btn' })}
                                                        >
                                                            신청자 보기
                                                        </button>

                                                        <button
                                                            onClick={() => onEditSession(session)}
                                                            className="inline-flex items-center justify-center rounded-md p-2 text-[#B0B8C1] hover:text-[#3182F6] hover:bg-[#E8F3FF] transition-colors"
                                                        >
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                                <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
                                                                <path d="m15 5 4 4" />
                                                            </svg>
                                                        </button>

                                                        <button
                                                            onClick={() => onDeleteSession(session.id)}
                                                            className="inline-flex items-center justify-center rounded-md p-2 text-[#B0B8C1] hover:text-[#F04452] hover:bg-[#FFEBEE] transition-colors"
                                                        >
                                                            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <polyline points="3 6 5 6 21 6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                            </svg>
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}