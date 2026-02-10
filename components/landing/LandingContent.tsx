"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { AddressSearchInput } from '@/components/ui/AddressSearchInput';
import { ArrowRight, ChevronRight, Info, RefreshCw, Plus, Calendar, Clock, DollarSign, Users, MapPin, Image as ImageIcon, ArrowLeft, ArrowUp, ChevronsRight } from 'lucide-react';
import Link from 'next/link';

import { StudentPagePreview } from './simulator/StudentPagePreview';
import { InstagramPreview } from './simulator/InstagramPreview';
import { KakaoPreview } from './simulator/KakaoPreview';
import { DashboardPreview } from './simulator/DashboardPreview';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { useRouter } from 'next/navigation';

const STEPS = [
    { id: 0, title: "클래스 개설", label: "Step 1" },
    { id: 1, title: "신청 링크 공유", label: "Step 2" },
    { id: 2, title: "자동 알림 발송", label: "Step 3" },
    { id: 3, title: "수강생 통합 관리", label: "Step 4" },
];

export function LandingContent() {
    // Shared State
    const [className, setClassName] = useState('');
    const [location, setLocation] = useState('');
    const [date, setDate] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [price, setPrice] = useState('');
    const [capacity, setCapacity] = useState('');
    const [description, setDescription] = useState('');
    // Removed unused fields

    const [currentStep, setCurrentStep] = useState(0);
    const [showSignupDialog, setShowSignupDialog] = useState(false);
    const [errors, setErrors] = useState<{ className?: string; location?: string; description?: string }>({});
    const router = useRouter();

    // Signup with Class Data Logic
    const handleSignupWithClass = () => {
        const classData = {
            name: className,
            location,
            description,
            // Session Data
            date,
            startTime,
            endTime,
            price,
            capacity,
        };
        localStorage.setItem('onboarding_class_data', JSON.stringify(classData));
        router.push('/signup?ref=landing');
    };

    // Auto-fill Logic
    // Auto-fill Logic
    // Auto-fill Logic
    const [showCopyToast, setShowCopyToast] = useState(false);

    const handleCopyLink = () => {
        // Just purely educational feedback, no actual copy
        setShowCopyToast(true);
        setTimeout(() => setShowCopyToast(false), 3000);
    };

    const fillExampleData = () => {
        // 오늘 기준 일주일 뒤 날짜 계산
        const nextWeek = new Date();
        nextWeek.setDate(nextWeek.getDate() + 7);
        const dateStr = nextWeek.toISOString().split('T')[0]; // "YYYY-MM-DD" 형식

        setClassName('힐링 요가 원데이 클래스');
        setLocation('강남역 7번 출구 요가스튜디오 3층');
        setDate(dateStr);
        setStartTime('14:00');
        setEndTime('15:00');
        setPrice('20000');
        setCapacity('8');
        setDescription('지친 몸과 마음을 치유하는 시간입니다. \n\n- 워밍업/호흡 (10분)\n- 기본 동작 플로우 (40분)\n- 쿨다운/이완 (10분)\n\n초보자도 무리 없이 따라올 수 있어요.');
    };

    const nextStep = () => {
        // Validate required fields only on Step 0
        if (currentStep === 0) {
            const newErrors: { className?: string; location?: string; description?: string } = {};

            if (!className.trim()) {
                newErrors.className = '클래스명을 입력해주세요.';
            }
            if (!location.trim()) {
                newErrors.location = '장소를 입력해주세요.';
            }
            if (!description.trim()) {
                newErrors.description = '클래스 소개를 입력해주세요.';
            }

            setErrors(newErrors);

            // If there are errors, don't proceed
            if (Object.keys(newErrors).length > 0) {
                return;
            }
        }

        if (currentStep < STEPS.length - 1) setCurrentStep(prev => prev + 1);
    };

    return (
        <div className="bg-[#F8F9FA] py-12 sm:py-20 font-sans">

            {/* Section Header */}
            {/* Section Header */}
            <div id="features" className="max-w-5xl mx-auto px-4 mb-16 text-center">
                <h2 className="text-3xl sm:text-4xl font-bold text-[#191F28] mb-4 tracking-tight">
                    지금 바로 <span className="text-[#3182F6]">클래스를 운영해보세요.</span>
                </h2>
                <p className="text-xl text-[#6B7684] font-medium">
                    복잡한 설명보다, 한 번의 경험이 더 확실하니까요.
                </p>
            </div>

            {/* 1. Navigation */}
            <div className="max-w-5xl mx-auto px-4 mb-10">
                <div className="flex justify-center items-center gap-2 sm:gap-4 flex-wrap">
                    {STEPS.map((step, index) => {
                        const isActive = index === currentStep;
                        return (
                            <div key={step.id} className="flex items-center">
                                <button
                                    onClick={() => setCurrentStep(index)}
                                    className={`
                                        flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold transition-all shadow-sm
                                        ${isActive
                                            ? 'bg-[#3182F6] text-white hover:bg-[#2c72d9] scale-105'
                                            : 'bg-white text-gray-500 hover:bg-gray-50 border border-gray-200'
                                        }
                                    `}
                                >
                                    <span className={`
                                        flex items-center justify-center w-5 h-5 rounded-full text-[10px] 
                                        ${isActive ? 'bg-white text-[#3182F6]' : 'bg-gray-200 text-gray-500'}
                                    `}>
                                        {index + 1}
                                    </span>
                                    {step.title}
                                </button>
                                {index !== STEPS.length - 1 && (
                                    <ChevronRight className="w-4 h-4 text-gray-300 ml-2 sm:ml-4" />
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* 2. Main Split Layout */}
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid lg:grid-cols-2 gap-6 h-auto lg:h-[640px] relative">
                    {/* Arrow Indicator (Desktop Only) */}
                    <div className="hidden lg:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-lg border border-gray-100 z-10 items-center justify-center text-[#3182F6]">
                        <ArrowRight className="w-5 h-5" />
                    </div>

                    {/* LEFT PANEL */}
                    <div className="bg-white rounded-[24px] border border-gray-100 shadow-xl p-6 sm:p-8 flex flex-col h-full relative overflow-hidden">

                        {/* Header */}
                        <div className="flex justify-between items-center mb-6 flex-shrink-0">
                            <h2 className="text-xl font-bold text-gray-900">
                                {currentStep === 0 && "클래스 정보 입력"}
                                {currentStep === 1 && "클래스 신청 링크 생성 완료"}
                                {currentStep === 2 && "자동 알림 설정"}
                                {currentStep === 3 && "수강생 통합 관리"}
                            </h2>
                            {currentStep === 0 && (
                                <button
                                    onClick={fillExampleData}
                                    className="text-xs font-bold text-gray-500 hover:text-[#3182F6] flex items-center gap-1.5 transition-colors bg-gray-50 px-2.5 py-1.5 rounded-lg border border-gray-200"
                                >
                                    <RefreshCw className="w-3 h-3" />
                                    예시 채우기
                                </button>
                            )}
                        </div>

                        {/* Content Area */}
                        <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
                            <div className={`space-y-6 pb-4 ${currentStep === 1 ? 'h-full flex flex-col justify-center' : ''}`}>
                                {currentStep === 0 && (
                                    <>
                                        {/* Basic Info Section */}
                                        <div className="space-y-4">
                                            <h3 className="text-sm font-bold text-gray-900 flex items-center gap-1.5">
                                                <Info className="w-4 h-4 text-[#3182F6]" /> 기본 정보
                                            </h3>

                                            <div className="space-y-1.5 px-0.5">
                                                <Label className="text-[13px] font-bold text-gray-600">클래스명 *</Label>
                                                <Input
                                                    value={className}
                                                    onChange={(e) => {
                                                        setClassName(e.target.value);
                                                        if (errors.className) setErrors({ ...errors, className: undefined });
                                                    }}
                                                    className="h-10 bg-gray-50 border-0 focus:ring-2 focus:ring-[#3182F6] focus:bg-white transition-all rounded-xl text-sm"
                                                    placeholder="예: 나만의 도자기 만들기"
                                                />
                                                {errors.className && (
                                                    <p className="text-xs text-[#F04452] font-medium">{errors.className}</p>
                                                )}
                                            </div>

                                            <div className="space-y-1.5 px-0.5">
                                                <Label className="text-[13px] font-bold text-gray-600">장소 *</Label>
                                                <AddressSearchInput
                                                    value={location}
                                                    onChange={(newLocation) => {
                                                        setLocation(newLocation);
                                                        if (errors.location) setErrors({ ...errors, location: undefined });
                                                    }}
                                                    placeholder="주소 검색"
                                                    className="h-10 bg-gray-50 border-0 focus:ring-2 focus:ring-[#3182F6] focus:bg-white transition-all rounded-xl text-sm"
                                                />
                                                {errors.location && (
                                                    <p className="text-xs text-[#F04452] font-medium">{errors.location}</p>
                                                )}
                                            </div>

                                            <div className="space-y-1.5 px-0.5">
                                                <Label className="text-[13px] font-bold text-gray-600">클래스 소개 *</Label>
                                                <Textarea
                                                    value={description}
                                                    onChange={(e) => {
                                                        setDescription(e.target.value);
                                                        if (errors.description) setErrors({ ...errors, description: undefined });
                                                    }}
                                                    className="min-h-[80px] bg-gray-50 border-0 focus:ring-2 focus:ring-[#3182F6] focus:bg-white transition-all rounded-xl resize-none p-3 text-sm"
                                                    placeholder="어떤 수업인지 수강생들에게 알려주세요."
                                                />
                                                {errors.description && (
                                                    <p className="text-xs text-[#F04452] font-medium">{errors.description}</p>
                                                )}
                                            </div>

                                            <div className="bg-blue-50/50 p-3 rounded-xl border border-blue-100/50 flex items-start gap-2 mt-2">
                                                <span className="text-blue-500 mt-0.5 text-xs">💡</span>
                                                <p className="text-xs text-slate-600 leading-snug">
                                                    <span className="font-bold text-slate-800">Tip:</span> 회원가입 후 더 많은 정보를 입력할 수 있어요.
                                                </p>
                                            </div>


                                        </div>

                                        <div className="h-px bg-gray-100 w-full" />

                                        {/* Session Info Section */}
                                        <div className="space-y-4">
                                            <h3 className="text-sm font-bold text-gray-900 flex items-center gap-1.5">
                                                <Calendar className="w-4 h-4 text-[#3182F6]" /> 세션 목록
                                            </h3>

                                            <div className="space-y-3">
                                                <div className="space-y-1.5 px-0.5">
                                                    <Label className="text-[13px] font-bold text-gray-600">날짜</Label>
                                                    <Input
                                                        type="date"
                                                        value={date}
                                                        onChange={(e) => setDate(e.target.value)}
                                                        className="h-10 bg-gray-50 border-0 focus:ring-2 focus:ring-[#3182F6] focus:bg-white transition-all rounded-xl text-sm"
                                                    />
                                                </div>

                                                <div className="grid grid-cols-2 gap-3">
                                                    <div className="space-y-1.5 px-0.5">
                                                        <Label className="text-[13px] font-bold text-gray-600">시작 시간</Label>
                                                        <Input
                                                            type="time"
                                                            value={startTime}
                                                            onChange={(e) => setStartTime(e.target.value)}
                                                            className="h-10 bg-gray-50 border-0 focus:ring-2 focus:ring-[#3182F6] focus:bg-white transition-all rounded-xl text-sm"
                                                        />
                                                    </div>
                                                    <div className="space-y-1.5 px-0.5">
                                                        <Label className="text-[13px] font-bold text-gray-600">종료 시간</Label>
                                                        <Input
                                                            type="time"
                                                            value={endTime}
                                                            onChange={(e) => setEndTime(e.target.value)}
                                                            className="h-10 bg-gray-50 border-0 focus:ring-2 focus:ring-[#3182F6] focus:bg-white transition-all rounded-xl text-sm"
                                                        />
                                                    </div>
                                                </div>

                                                <div className="grid grid-cols-2 gap-3">
                                                    <div className="space-y-1.5 px-0.5">
                                                        <Label className="text-[13px] font-bold text-gray-600">정원</Label>
                                                        <Input
                                                            type="number"
                                                            value={capacity}
                                                            onChange={(e) => {
                                                                const val = parseInt(e.target.value);
                                                                if (!isNaN(val) && val < 0) return;
                                                                setCapacity(e.target.value);
                                                            }}
                                                            className="h-10 bg-gray-50 border-0 focus:ring-2 focus:ring-[#3182F6] focus:bg-white transition-all rounded-xl text-sm"
                                                            placeholder="10"
                                                        />
                                                    </div>
                                                    <div className="space-y-1.5 px-0.5">
                                                        <Label className="text-[13px] font-bold text-gray-600">가격</Label>
                                                        <Input
                                                            type="number"
                                                            value={price}
                                                            onChange={(e) => {
                                                                const val = parseInt(e.target.value);
                                                                if (!isNaN(val) && val < 0) return;
                                                                setPrice(e.target.value);
                                                            }}
                                                            className="h-10 bg-gray-50 border-0 focus:ring-2 focus:ring-[#3182F6] focus:bg-white transition-all rounded-xl text-sm"
                                                            placeholder="50000"
                                                        />
                                                    </div>
                                                </div>

                                                <div className="bg-blue-50/50 p-3 rounded-xl border border-blue-100/50 flex items-start gap-2 mt-2">
                                                    <span className="text-blue-500 mt-0.5 text-xs">💡</span>
                                                    <p className="text-xs text-slate-600 leading-snug">
                                                        <span className="font-bold text-slate-800">Tip:</span> 회원가입 후 여러 세션을 추가할 수 있어요.
                                                    </p>
                                                </div>


                                            </div>
                                        </div>
                                    </>
                                )}

                                {currentStep === 1 && (
                                    <div className="text-center space-y-6 w-full">
                                        <p className="text-base text-gray-600 leading-relaxed">
                                            클래스가 생성되었어요.<br />
                                            <span className="font-bold text-gray-800">클래스 신청 링크</span>를 공유해보세요!
                                        </p>
                                        <div className="bg-gray-50 p-4 rounded-2xl flex items-center justify-between gap-3 border border-gray-200 w-full shadow-sm">
                                            <span className="text-sm font-medium text-gray-600 truncate flex-1 text-left">
                                                https://classhub-link.vercel.app/class/abc
                                            </span>
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                className="shrink-0 h-8 rounded-lg px-3 text-[#3182F6] border-[#3182F6] hover:bg-blue-50 font-bold text-xs"
                                                onClick={handleCopyLink}
                                            >
                                                복사
                                            </Button>
                                        </div>

                                        {/* Educational Feedback */}
                                        <div className={`transition-all duration-300 ${showCopyToast ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 pointer-events-none'}`}>
                                            <span className="bg-gray-800/90 text-white text-[11px] px-4 py-2 rounded-full shadow-lg leading-snug inline-block break-keep">
                                                체험용입니다 :) 실제 서비스에서 신청 링크를 공유해 보세요! 🚀
                                            </span>
                                        </div>
                                    </div>
                                )}


                                {currentStep === 2 && (
                                    <div className="space-y-5">
                                        <p className="text-sm text-gray-600 leading-relaxed">
                                            신청자가 발생하면<br />
                                            아래와 같은 <strong>알림톡이 자동 발송</strong>됩니다.
                                        </p>
                                        <div className="gap-3 grid grid-cols-1">
                                            <div className="p-4 bg-white border border-gray-100 rounded-xl shadow-sm text-sm text-gray-600 flex items-center gap-3 hover:border-blue-100 transition-colors">
                                                <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-lg">🔔</div>
                                                <div>
                                                    <p className="font-bold text-gray-900">신청 완료 즉시 발송</p>
                                                    <p className="text-xs text-gray-400 mt-1">예약 확정 및 입금 안내</p>
                                                </div>
                                            </div>
                                            <div className="p-4 bg-white border border-gray-100 rounded-xl shadow-sm text-sm text-gray-600 flex items-center gap-3 hover:border-blue-100 transition-colors">
                                                <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-lg">⏰</div>
                                                <div>
                                                    <p className="font-bold text-gray-900">수업 3일 전 안내</p>
                                                    <p className="text-xs text-gray-400 mt-1">준비물 및 장소 리마인더</p>
                                                </div>
                                            </div>
                                            <div className="p-4 bg-white border border-gray-100 rounded-xl shadow-sm text-sm text-gray-600 flex items-center gap-3 hover:border-blue-100 transition-colors">
                                                <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-lg">🚀</div>
                                                <div>
                                                    <p className="font-bold text-gray-900">수업 1일 전 안내</p>
                                                    <p className="text-xs text-gray-400 mt-1">최종 확인 및 주차 정보 안내</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {currentStep === 3 && (
                                    <div className="space-y-5">
                                        <p className="text-sm text-gray-600 leading-relaxed">
                                            모든 신청 내역이 <strong>자동으로 정리</strong>됩니다.<br />
                                            더 이상 엑셀을 붙들고 있을 필요가 없어요.
                                        </p>
                                        <ul className="list-disc list-inside text-sm text-gray-500 space-y-2 bg-gray-50 p-4 rounded-xl">
                                            <li>신청자 명단 및 신청 상태 실시간 확인</li>
                                            <li>알림 발송 여부 한눈에 파악</li>
                                            <li>수강생 연락처 일괄 관리</li>
                                        </ul>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Bottom Action Button */}
                        <div className="mt-4 pt-4 border-t border-gray-100 flex-shrink-0">
                            {currentStep < 3 ? (
                                <Button
                                    onClick={nextStep}
                                    className="w-full h-12 bg-[#3182F6] hover:bg-[#2C72D9] text-white text-base font-bold rounded-xl shadow-lg shadow-blue-100 transition-all hover:translate-y-[-2px]"
                                >
                                    다음 단계 <ArrowRight className="ml-2 w-5 h-5" />
                                </Button>
                            ) : (
                                <>
                                    <Button
                                        onClick={() => setShowSignupDialog(true)}
                                        className="w-full h-12 bg-[#191F28] hover:bg-black text-white text-base font-bold rounded-xl shadow-lg transition-all hover:translate-y-[-2px]"
                                    >
                                        입력한 정보로 바로 시작하기
                                    </Button>

                                    <Dialog open={showSignupDialog} onOpenChange={setShowSignupDialog}>
                                        <DialogContent className="sm:max-w-[480px] max-w-[90vw] p-6 gap-0 !fixed !left-[50%] !top-[50%] !translate-x-[-50%] !translate-y-[-50%] overflow-x-hidden">
                                            <DialogHeader className="space-y-3 text-left pb-4">
                                                <DialogTitle className="text-gray-900 font-bold text-lg pr-6">
                                                    입력하신 정보로 클래스를 개설할까요?
                                                </DialogTitle>
                                                <DialogDescription className="text-gray-600 text-sm leading-relaxed">
                                                    회원가입 후, 작성하신 클래스 정보가
                                                    <br />
                                                    자동으로 등록됩니다.
                                                </DialogDescription>
                                            </DialogHeader>

                                            <div className="bg-gray-50 p-4 rounded-lg text-sm space-y-2.5">
                                                <div className="flex justify-between items-start gap-4">
                                                    <span className="text-gray-600 flex-shrink-0 min-w-[70px]">클래스명</span>
                                                    <span className="font-medium text-gray-900 text-right break-words flex-1">
                                                        {className || "미입력"}
                                                    </span>
                                                </div>
                                                <div className="flex justify-between items-center gap-4">
                                                    <span className="text-gray-600 flex-shrink-0 min-w-[70px]">일정</span>
                                                    <span className="font-medium text-gray-900 text-right whitespace-nowrap">
                                                        {date && startTime ? `${date} ${startTime}` : "미입력"}
                                                    </span>
                                                </div>
                                            </div>

                                            <div className="mt-6 flex flex-col sm:flex-row gap-2 min-w-0">
                                                <Button
                                                    type="button"
                                                    variant="ghost"
                                                    onClick={() => router.push('/signup')}
                                                    className="flex-1 h-11min-w-0 overflow-hidden text-gray-600 hover:text-gray-900 hover:bg-gray-50 font-medium rounded-lg text-sm"
                                                >
                                                    클래스 정보 없이 시작할래요
                                                </Button>

                                                <Button
                                                    type="button"
                                                    onClick={handleSignupWithClass}
                                                    className="flex-1 h-11min-w-0 overflow-hidden bg-[#3182F6] hover:bg-[#2c72d9] text-white font-bold rounded-lg text-[15px]"
                                                >
                                                    네, 이 정보로 시작할게요
                                                </Button>
                                            </div>
                                        </DialogContent>
                                    </Dialog>
                                </>
                            )}
                        </div>
                    </div>

                    {/* RIGHT PANEL: Preview */}
                    <div className="bg-[#E8F3FF] rounded-[24px] border border-blue-100 p-6 sm:p-8 flex flex-col h-full relative overflow-hidden">

                        <div className="flex flex-col mb-6 flex-shrink-0">
                            <h3 className="text-lg font-bold text-[#191F28] mb-1.5 flex items-center gap-2">
                                <span className="bg-[#3182F6] text-white text-[10px] px-2 py-0.5 rounded-full">미리보기</span>
                                {currentStep === 0 && "정보를 입력하면 신청 화면이 자동 생성돼요"}
                                {currentStep === 1 && "링크를 공유해 수강생을 간편하게 모을 수 있어요"}
                                {currentStep === 2 && "신청이 완료되면 알림톡이 자동으로 발송돼요"}
                                {currentStep === 3 && "신청자 명단이 자동으로 정리되고 관리돼요"}
                            </h3>
                        </div>

                        <div className="flex-1 flex items-center justify-center relative min-h-[400px]">
                            {/* Device Frame */}
                            <div className="relative w-[280px] h-[540px] bg-white rounded-[36px] shadow-2xl border-[7px] border-white overflow-hidden transform hover:scale-[1.02] transition-transform duration-500">
                                <div className="w-full h-full bg-gray-50 relative overflow-y-auto no-scrollbar">

                                    {/* Dynamic Content */}
                                    <div className={`absolute inset-0 transition-opacity duration-500 ${currentStep === 0 ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}>
                                        <StudentPagePreview
                                            className={className || "클래스명을 입력하세요"}
                                            location={location}
                                            date={date}
                                            startTime={startTime}
                                            endTime={endTime}
                                            price={price}
                                            capacity={capacity}
                                            description={description}
                                        />
                                    </div>

                                    <div className={`absolute inset-0 transition-opacity duration-500 ${currentStep === 1 ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}>
                                        <InstagramPreview className={className} />
                                    </div>

                                    <div className={`absolute inset-0 transition-opacity duration-500 ${currentStep === 2 ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}>
                                        <KakaoPreview
                                            className={className}
                                            location={location}
                                            date={date}
                                            startTime={startTime}
                                            studentName="김철수"
                                        />
                                    </div>

                                    <div className={`absolute inset-0 transition-opacity duration-500 ${currentStep === 3 ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}>
                                        <DashboardPreview
                                            className={className}
                                            location={location}
                                            date={date}
                                            startTime={startTime}
                                        />
                                    </div>

                                </div>
                            </div>
                        </div>

                    </div>

                </div>

            </div >
        </div >
    );
}