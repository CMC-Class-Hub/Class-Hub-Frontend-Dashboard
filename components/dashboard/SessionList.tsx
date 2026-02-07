"use client";

import React, { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

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

export function SessionList({ sessions, sessionApplicationCounts, onDeleteSession, onEditSession, onStatusChange, classId }: SessionListProps) {
    const router = useRouter();
    const [selectedMonth, setSelectedMonth] = useState(() => {
        if (sessions.length > 0) {
            const firstDate = new Date(sessions[0].date);
            return `${firstDate.getFullYear()}-${String(firstDate.getMonth() + 1).padStart(2, '0')}`;
        }
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

    // 사용 가능한 월 목록
    const availableMonths = useMemo(() => {
        return Object.keys(sessionsByMonth).sort();
    }, [sessionsByMonth]);

    // 현재 선택된 월의 세션들
    const currentMonthSessions = sessionsByMonth[selectedMonth] || {};

    const changeMonth = (direction: 'prev' | 'next') => {
        const currentIndex = availableMonths.indexOf(selectedMonth);
        if (direction === 'prev' && currentIndex > 0) {
            setSelectedMonth(availableMonths[currentIndex - 1]);
        } else if (direction === 'next' && currentIndex < availableMonths.length - 1) {
            setSelectedMonth(availableMonths[currentIndex + 1]);
        }
    };

    if (sessions.length === 0) {
        return (
            <div className="rounded-lg border bg-white shadow-sm hover:shadow-md transition-shadow">
                <div className="p-10 md:p-14 text-center">
                    <div className="w-14 h-14 md:w-16 md:h-16 bg-[#E8F3FF] rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="h-7 w-7 md:h-8 md:w-8 text-[#3182F6]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <rect x="3" y="4" width="18" height="18" rx="2" ry="2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <line x1="16" y1="2" x2="16" y2="6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <line x1="8" y1="2" x2="8" y2="6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <line x1="3" y1="10" x2="21" y2="10" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </div>
                    <h3 className="text-base md:text-lg font-bold text-[#191F28] mb-2">
                        아직 세션이 없습니다
                    </h3>
                    <p className="text-sm md:text-base text-[#8B95A1]">
                        시간대별 세션을 추가하세요
                    </p>
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
                    disabled={availableMonths.indexOf(selectedMonth) === 0}
                    className="h-8 w-8 p-0 inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none"
                >
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <polyline points="15 18 9 12 15 6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </button>
                <div className="font-bold text-lg text-[#191F28] min-w-[100px] text-center">
                    {selectedMonth.split('-')[0]}년 {parseInt(selectedMonth.split('-')[1])}월
                </div>
                <button
                    onClick={() => changeMonth('next')}
                    disabled={availableMonths.indexOf(selectedMonth) === availableMonths.length - 1}
                    className="h-8 w-8 p-0 inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none"
                >
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <polyline points="9 18 15 12 9 6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </button>
            </div>

            {/* 날짜별 세션 목록 */}
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
                            {dateSessions.map((session) => {
                                const confirmedCount = sessionApplicationCounts[session.id] || 0;
                                const isDropdownOpen = openDropdown === session.id;

                                return (
                                    <div key={session.id} className="rounded-lg border bg-white shadow-sm hover:shadow-md hover:border-[#3182F6]/30 transition-all duration-200">
                                        <div className="p-4 md:p-5">
                                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                                                <div className="flex-1">
                                                    <div className="flex flex-wrap items-center gap-2 mb-2">
                                                        <span className="inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-normal">
                                                            {session.startTime.slice(0, 5)} - {session.endTime.slice(0, 5)}
                                                        </span>

                                                        {onStatusChange ? (
                                                            <div className="relative">
                                                                <button
                                                                    onClick={() => setOpenDropdown(isDropdownOpen ? null : session.id)}
                                                                    className={`inline-flex items-center rounded-md px-2.5 py-0.5 text-xs cursor-pointer hover:opacity-80 transition-opacity min-w-[60px] justify-center ${
                                                                        session.status === 'RECRUITING' 
                                                                            ? 'bg-blue-600 text-white' 
                                                                            : 'bg-[#E5E8EB] text-[#4E5968]'
                                                                    }`}
                                                                >
                                                                    {session.status === 'RECRUITING' ? '모집중' : session.status === 'FULL' ? '마감' : '종료'} ▾
                                                                </button>
                                                                {isDropdownOpen && (
                                                                    <div className="absolute z-10 mt-1 w-32 rounded-md border bg-white shadow-lg">
                                                                        <div className="py-1">
                                                                            <button
                                                                                onClick={() => {
                                                                                    onStatusChange(session.id, 'RECRUITING');
                                                                                    setOpenDropdown(null);
                                                                                }}
                                                                                className="block w-full px-4 py-2 text-left text-sm hover:bg-gray-100"
                                                                            >
                                                                                모집중
                                                                            </button>
                                                                            <button
                                                                                onClick={() => {
                                                                                    onStatusChange(session.id, 'FULL');
                                                                                    setOpenDropdown(null);
                                                                                }}
                                                                                className="block w-full px-4 py-2 text-left text-sm hover:bg-gray-100"
                                                                            >
                                                                                마감
                                                                            </button>
                                                                            <button
                                                                                onClick={() => {
                                                                                    onStatusChange(session.id, 'CLOSED');
                                                                                    setOpenDropdown(null);
                                                                                }}
                                                                                className="block w-full px-4 py-2 text-left text-sm hover:bg-gray-100"
                                                                            >
                                                                                종료
                                                                            </button>
                                                                        </div>
                                                                    </div>
                                                                )}
                                                            </div>
                                                        ) : (
                                                            <span className={`inline-flex items-center rounded-md px-2.5 py-0.5 text-xs ${
                                                                session.status === 'RECRUITING' 
                                                                    ? 'bg-blue-600 text-white' 
                                                                    : 'bg-gray-200 text-gray-700'
                                                            }`}>
                                                                {session.status === 'RECRUITING' ? '모집중' : session.status === 'CLOSED' ? '마감' : '종료'}
                                                            </span>
                                                        )}
                                                    </div>
                                                    <div className="space-y-1">
                                                        <p className="text-xs md:text-sm text-[#6B7684]">
                                                            신청 <span className="font-semibold text-[#3182F6]">{confirmedCount}명</span> / 정원 {session.capacity}명
                                                        </p>
                                                        <p className="text-xs md:text-sm text-[#6B7684]">
                                                            가격 <span className="font-semibold text-[#191F28]">{session.price.toLocaleString()}원</span>
                                                        </p>
                                                    </div>
                                                </div>

                                                <div className="flex gap-2">
                                                    <button
                                                        onClick={() => router.push(`/dashboard/classes/${classId}/sessions/${session.id}`)}
                                                        className="flex-1 sm:flex-none inline-flex items-center justify-center rounded-md border border-gray-300 bg-white px-3 py-2 text-xs md:text-sm font-medium hover:bg-gray-50 transition-colors"
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
                                                            <polyline points="3 6 5 6 21 6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
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
        </div>
    );
}