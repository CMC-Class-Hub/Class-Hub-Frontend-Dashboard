"use client";

import { ChevronLeft, MoreHorizontal, Calendar, MapPin, Phone, CheckCircle2, XCircle } from 'lucide-react';

export const DashboardPreview = () => {
    // Mock Applicant Data
    const applicants = [
        { id: 1, name: "김철수", phone: "010-1234-5678", status: "확정", date: "2024.03.01" },
        { id: 2, name: "이영희", phone: "010-9876-5432", status: "확정", date: "2024.03.02" },
        { id: 3, name: "박지성", phone: "010-5555-4444", status: "대기", date: "2024.03.05" },
        { id: 4, name: "손흥민", phone: "010-7777-8888", status: "취소", date: "2024.03.06" },
    ];

    return (
        <div className="w-full h-full bg-white flex flex-col font-sans">
            {/* Header Mock - Mimicking deeply nested page header */}
            <div className="bg-white border-b border-gray-100 p-4 sticky top-0 z-10">
                <div className="flex items-center gap-3 mb-4">
                    <button className="p-1 -ml-1 text-gray-400">
                        <ChevronLeft className="w-5 h-5" />
                    </button>
                    <h2 className="font-bold text-[#191F28] text-base">세션 관리</h2>
                </div>

                {/* Session Info Card */}
                <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                    <h3 className="font-bold text-[#333D4B] text-sm mb-2">힐링 요가 원데이 클래스</h3>
                    <div className="space-y-1.5">
                        <div className="flex items-center gap-2 text-xs text-[#6B7684]">
                            <Calendar className="w-3.5 h-3.5" />
                            <span className="font-medium text-[#4E5968]">2024.03.15 (토) 14:00</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-[#6B7684]">
                            <MapPin className="w-3.5 h-3.5" />
                            <span>강남역 7번 출구 요가스튜디오</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Applicant List */}
            <div className="flex-1 overflow-y-auto bg-white">
                <div className="px-4 py-3 bg-white border-b border-gray-50 flex justify-between items-center sticky top-0 z-10">
                    <span className="text-xs font-bold text-[#191F28]">신청자 <span className="text-[#3182F6]">{applicants.length}</span></span>
                    <button className="text-[10px] text-gray-500 bg-gray-100 px-2 py-1 rounded-md font-medium hover:bg-gray-200">
                        엑셀 다운로드
                    </button>
                </div>

                <div className="divide-y divide-gray-50">
                    {applicants.map((member) => (
                        <div key={member.id} className="p-4 hover:bg-gray-50 transition-colors flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-9 h-9 rounded-full bg-blue-50 text-[#3182F6] flex items-center justify-center font-bold text-xs">
                                    {member.name.charAt(0)}
                                </div>
                                <div>
                                    <div className="text-sm font-bold text-[#333D4B]">{member.name}</div>
                                    <div className="flex items-center gap-1 text-[11px] text-[#8B95A1] mt-0.5">
                                        <Phone className="w-3 h-3" />
                                        {member.phone}
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col items-end gap-1">
                                <span className={`
                                    text-[10px] font-bold px-2 py-0.5 rounded-full
                                    ${member.status === '확정' ? 'bg-green-100 text-green-600' : ''}
                                    ${member.status === '대기' ? 'bg-yellow-100 text-yellow-600' : ''}
                                    ${member.status === '취소' ? 'bg-red-100 text-red-500' : ''}
                                `}>
                                    {member.status}
                                </span>
                                <span className="text-[10px] text-gray-400">{member.date}</span>
                            </div>
                        </div>
                    ))}
                    {/* Ghost Items for scrolling effect */}
                    {[1, 2, 3].map((i) => (
                        <div key={`ghost-${i}`} className="p-4 flex items-center justify-between opacity-30">
                            <div className="flex items-center gap-3">
                                <div className="w-9 h-9 rounded-full bg-gray-100"></div>
                                <div className="space-y-1.5">
                                    <div className="w-16 h-4 bg-gray-100 rounded"></div>
                                    <div className="w-24 h-3 bg-gray-100 rounded"></div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
