"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ChevronDown, MapPin } from 'lucide-react';

interface StudentPagePreviewProps {
    className: string;
    description: string;
    location: string;
    date: string;
    startTime: string;
    endTime: string;
    image?: string;
}

export const StudentPagePreview = ({
    className = "",
    description = "",
    location = "",
    date = "",
    startTime = "",
    endTime = "",
}: StudentPagePreviewProps) => {
    const [step, setStep] = useState<'SELECTION' | 'INPUT'>('SELECTION');
    const [selectedSessionId, setSelectedSessionId] = useState<number | null>(null);

    return (
        <div className="w-full h-full bg-[#F2F4F6] flex flex-col items-center overflow-hidden relative">
            {/* Fake Status Bar */}
            <div className="w-full h-7 bg-white flex justify-between items-center px-6 text-[10px] font-bold text-black z-20">
                <span>9:41</span>
                <div className="flex gap-1.5">
                    <div className="w-3.5 h-2.5 bg-black rounded-[1px]"></div>
                    <div className="w-3.5 h-2.5 bg-black rounded-[1px]"></div>
                </div>
            </div>

            {/* App Header */}
            <div className="w-full bg-white/80 backdrop-blur-md z-10 border-b border-gray-100 px-4 py-3 flex items-center relative shrink-0">
                {step === 'INPUT' && (
                    <button onClick={() => setStep('SELECTION')} className="text-xl text-[#191F28] absolute left-4">←</button>
                )}
                <span className="font-bold text-[#191F28] text-sm mx-auto">클래스 예약</span>
                <button className="absolute right-4 text-[10px] font-bold text-[#8B95A1] bg-gray-50 px-2 py-1 rounded-md border border-gray-100">
                    내역
                </button>
            </div>

            <div className="w-full flex-1 overflow-y-auto bg-white scrollbar-hide pb-20">
                {/* Image */}
                <div className="w-full h-48 relative bg-gray-100">
                    <div className="w-full h-full bg-blue-100 flex items-center justify-center text-blue-300 font-bold text-3xl">
                        CLASS IMAGE
                    </div>
                </div>

                <div className="p-5">
                    {/* Class Info */}
                    <div className="space-y-4">
                        <span className="inline-block px-2 py-0.5 bg-[#E8F3FF] text-[#3182F6] text-[10px] font-bold rounded-sm">
                            원데이
                        </span>
                        <h1 className="text-xl font-bold text-[#191F28] leading-tight break-keep">
                            {className || "클래스 이름을 입력해보세요"}
                        </h1>
                        <p className="text-[#4E5968] text-sm flex items-start gap-1.5 font-medium break-keep">
                            <span className="text-base shrink-0">📍</span> {location || "장소를 입력하세요"}
                        </p>
                    </div>

                    {/* Description */}
                    <div className="mt-6">
                        <h3 className="font-bold text-[#191F28] text-sm mb-2">💡 클래스 소개</h3>
                        <p className="text-xs text-[#4E5968] leading-relaxed whitespace-pre-wrap">
                            {description || "어떤 수업인지 수강생들에게 알려주세요."}
                        </p>
                    </div>

                    <div className="h-px bg-gray-100 my-6"></div>

                    {step === 'SELECTION' && (
                        /* Session Selection */
                        <section>
                            <h3 className="font-bold text-[#191F28] mb-3 text-sm">📅 일정 선택</h3>
                            <button
                                onClick={() => setSelectedSessionId(1)}
                                className={`w-full p-3 rounded-xl border text-left transition-all flex justify-between items-center mb-2 ${selectedSessionId === 1
                                    ? 'border-[#3182F6] bg-[#E8F3FF] ring-1 ring-[#3182F6]'
                                    : 'border-gray-200 bg-white hover:bg-gray-50'
                                    }`}
                            >
                                <div>
                                    <div className={`font-bold text-sm ${selectedSessionId === 1 ? 'text-[#1B64DA]' : 'text-[#333D4B]'}`}>
                                        {date || "2024.03.15 (토)"}
                                    </div>
                                    <div className="text-[10px] text-[#8B95A1] mt-0.5">
                                        {startTime || "14:00"} ~ {endTime || "16:00"}
                                    </div>
                                    <div className={`text-[10px] font-bold mt-1 ${selectedSessionId === 1 ? 'text-[#3182F6]' : 'text-[#191F28]'}`}>
                                        50,000원
                                    </div>
                                </div>
                                <div className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${selectedSessionId === 1 ? 'bg-[#3182F6] text-white' : 'bg-[#F2F4F6] text-[#6B7684]'}`}>
                                    3/8명
                                </div>
                            </button>
                        </section>
                    )}

                    {step === 'INPUT' && (
                        /* Input Form */
                        <section className="animate-in fade-in slide-in-from-bottom-2 duration-300">
                            <div className="bg-blue-50 p-3 rounded-xl mb-4 border border-blue-100">
                                <h3 className="text-[10px] font-bold text-blue-500 mb-0.5">선택한 일정</h3>
                                <p className="text-xs font-bold text-[#191F28]">
                                    {date} {startTime}
                                </p>
                            </div>

                            <h3 className="font-bold text-[#191F28] mb-3 text-sm">📝 예약자 정보</h3>
                            <div className="space-y-3">
                                <div className="space-y-1">
                                    <label className="text-[10px] font-medium text-gray-500">이름</label>
                                    <Input placeholder="홍길동" className="h-9 text-sm" />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-[10px] font-medium text-gray-500">연락처</label>
                                    <Input placeholder="010-1234-5678" className="h-9 text-sm" />
                                </div>
                            </div>
                        </section>
                    )}
                </div>
            </div>

            {/* Bottom Button */}
            <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-[#F2F4F6] p-4 safe-area-bottom z-10 rounded-b-[32px]">
                {step === 'SELECTION' ? (
                    <Button
                        className="w-full h-10 text-sm font-bold bg-[#3182F6] hover:bg-[#1B64DA]"
                        disabled={!selectedSessionId}
                        onClick={() => setStep('INPUT')}
                    >
                        예약하기
                    </Button>
                ) : (
                    <Button
                        className="w-full h-10 text-sm font-bold bg-[#3182F6] hover:bg-[#1B64DA]"
                        onClick={() => alert("이것은 체험 화면입니다!")}
                    >
                        제출하기
                    </Button>
                )}
            </div>

            {/* Home Indicator */}
            <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-1/3 h-1 bg-black/20 rounded-full z-20"></div>
        </div>
    );
};
