"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ArrowRight, ChevronRight, Info, RefreshCw, Plus, Calendar, Clock, DollarSign, Users, MapPin, Image as ImageIcon } from 'lucide-react';
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
    const [category, setCategory] = useState('');
    const [location, setLocation] = useState('');
    const [date, setDate] = useState('');
    const [startTime, setStartTime] = useState('');
    const [price, setPrice] = useState('');
    const [capacity, setCapacity] = useState('');
    const [description, setDescription] = useState('');
    const [materials, setMaterials] = useState('');
    const [parking, setParking] = useState('');


    const [currentStep, setCurrentStep] = useState(0);
    const [showSignupDialog, setShowSignupDialog] = useState(false);
    const router = useRouter();

    // Signup with Class Data Logic
    const handleSignupWithClass = () => {
        const classData = {
            name: className,
            category,
            location,
            description,
            materials,
            parking,
            // Session Data
            date,
            startTime,
            price,
            capacity,
        };
        localStorage.setItem('onboarding_class_data', JSON.stringify(classData));
        router.push('/signup?ref=landing');
    };

    // Auto-fill Logic
    const fillExampleData = () => {
        setClassName('힐링 요가 원데이 클래스');
        setCategory('운동/스포츠');
        setLocation('강남역 7번 출구 요가스튜디오 3층');
        setDate('2024.03.15 (토)');
        setStartTime('14:00');
        setPrice('50,000');
        setCapacity('8');
        setDescription('지친 몸과 마음을 치유하는 시간입니다. 초보자도 환영합니다.');
        setMaterials('편안한 복장, 텀블러');
        setParking('건물 내 무료 주차 가능');
    };

    const nextStep = () => {
        if (currentStep < STEPS.length - 1) setCurrentStep(prev => prev + 1);
    };

    return (
        <div className="bg-[#F8F9FA] py-12 sm:py-20 font-sans">

            {/* Section Header */}
            {/* Section Header */}
            <div className="max-w-5xl mx-auto px-4 mb-16 text-center">
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
                <div className="grid lg:grid-cols-2 gap-6 h-auto lg:h-[640px]">

                    {/* LEFT PANEL */}
                    <div className="bg-white rounded-[24px] border border-gray-100 shadow-xl p-6 sm:p-8 flex flex-col h-full relative overflow-hidden">

                        {/* Header */}
                        <div className="flex justify-between items-center mb-6 flex-shrink-0">
                            <h2 className="text-xl font-bold text-gray-900">
                                {currentStep === 0 && "클래스 정보 입력"}
                                {currentStep === 1 && "공유 링크 생성 완료"}
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
                            <div className="space-y-6 pb-4">
                                {currentStep === 0 && (
                                    <>
                                        {/* Basic Info Section */}
                                        <div className="space-y-4">
                                            <h3 className="text-sm font-bold text-gray-900 flex items-center gap-1.5">
                                                <Info className="w-4 h-4 text-[#3182F6]" /> 기본 정보
                                            </h3>

                                            <div className="space-y-1.5">
                                                <Label className="text-[13px] font-bold text-gray-600">클래스명</Label>
                                                <Input
                                                    value={className}
                                                    onChange={(e) => setClassName(e.target.value)}
                                                    className="h-10 bg-gray-50 border-0 focus:ring-2 focus:ring-[#3182F6] focus:bg-white transition-all rounded-xl text-sm"
                                                    placeholder="예: 나만의 도자기 만들기"
                                                />
                                            </div>

                                            <div className="space-y-1.5">
                                                <Label className="text-[13px] font-bold text-gray-600">카테고리</Label>
                                                <Input
                                                    value={category}
                                                    onChange={(e) => setCategory(e.target.value)}
                                                    className="h-10 bg-gray-50 border-0 focus:ring-2 focus:ring-[#3182F6] focus:bg-white transition-all rounded-xl text-sm"
                                                    placeholder="예: 공예 / DIY"
                                                />
                                            </div>

                                            <div className="space-y-1.5">
                                                <Label className="text-[13px] font-bold text-gray-600">대표 이미지</Label>
                                                <div className="w-full h-24 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center text-gray-400 gap-1 hover:bg-gray-100 transition-colors cursor-pointer">
                                                    <ImageIcon className="w-5 h-5" />
                                                    <span className="text-xs">이미지 업로드</span>
                                                </div>
                                            </div>

                                            <div className="space-y-1.5">
                                                <Label className="text-[13px] font-bold text-gray-600">장소</Label>
                                                <div className="relative">
                                                    <MapPin className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
                                                    <Input
                                                        value={location}
                                                        onChange={(e) => setLocation(e.target.value)}
                                                        className="h-10 pl-9 bg-gray-50 border-0 focus:ring-2 focus:ring-[#3182F6] focus:bg-white transition-all rounded-xl text-sm"
                                                        placeholder="주소 검색"
                                                    />
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-2 gap-3">
                                                <div className="space-y-1.5">
                                                    <Label className="text-[13px] font-bold text-gray-600">준비물</Label>
                                                    <Input
                                                        value={materials}
                                                        onChange={(e) => setMaterials(e.target.value)}
                                                        className="h-10 bg-gray-50 border-0 focus:ring-2 focus:ring-[#3182F6] focus:bg-white transition-all rounded-xl text-sm"
                                                        placeholder="예: 편한 복장"
                                                    />
                                                </div>
                                                <div className="space-y-1.5">
                                                    <Label className="text-[13px] font-bold text-gray-600">주차 정보</Label>
                                                    <Input
                                                        value={parking}
                                                        onChange={(e) => setParking(e.target.value)}
                                                        className="h-10 bg-gray-50 border-0 focus:ring-2 focus:ring-[#3182F6] focus:bg-white transition-all rounded-xl text-sm"
                                                        placeholder="예: 가능, 불가"
                                                    />
                                                </div>
                                            </div>

                                            <div className="space-y-1.5">
                                                <Label className="text-[13px] font-bold text-gray-600">상세 설명 / 공지사항</Label>
                                                <Textarea
                                                    value={description}
                                                    onChange={(e) => setDescription(e.target.value)}
                                                    className="min-h-[80px] bg-gray-50 border-0 focus:ring-2 focus:ring-[#3182F6] focus:bg-white transition-all rounded-xl resize-none p-3 text-sm"
                                                    placeholder="커리큘럼이나 유의사항을 입력해주세요."
                                                />
                                            </div>
                                        </div>

                                        <div className="h-px bg-gray-100 w-full" />

                                        {/* Session Info Section */}
                                        <div className="space-y-4">
                                            <h3 className="text-sm font-bold text-gray-900 flex items-center gap-1.5">
                                                <Calendar className="w-4 h-4 text-[#3182F6]" /> 세션(일정) 추가
                                            </h3>

                                            <div className="bg-blue-50/50 rounded-xl p-4 border border-blue-100 space-y-3">
                                                <div className="grid grid-cols-2 gap-3">
                                                    <div className="space-y-1.5">
                                                        <Label className="text-[11px] font-bold text-gray-600">날짜</Label>
                                                        <Input
                                                            value={date}
                                                            onChange={(e) => setDate(e.target.value)}
                                                            className="h-9 bg-white border border-gray-200 rounded-lg text-xs"
                                                            placeholder="YYYY-MM-DD"
                                                        />
                                                    </div>
                                                    <div className="space-y-1.5">
                                                        <Label className="text-[11px] font-bold text-gray-600">시간</Label>
                                                        <Input
                                                            value={startTime}
                                                            onChange={(e) => setStartTime(e.target.value)}
                                                            className="h-9 bg-white border border-gray-200 rounded-lg text-xs"
                                                            placeholder="HH:MM"
                                                        />
                                                    </div>
                                                </div>

                                                <div className="grid grid-cols-2 gap-3">
                                                    <div className="space-y-1.5">
                                                        <Label className="text-[11px] font-bold text-gray-600">가격</Label>
                                                        <div className="relative">
                                                            <DollarSign className="absolute left-2.5 top-2 w-3.5 h-3.5 text-gray-400" />
                                                            <Input
                                                                value={price}
                                                                onChange={(e) => setPrice(e.target.value)}
                                                                className="h-9 pl-8 bg-white border border-gray-200 rounded-lg text-xs"
                                                                placeholder="0"
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="space-y-1.5">
                                                        <Label className="text-[11px] font-bold text-gray-600">정원</Label>
                                                        <div className="relative">
                                                            <Users className="absolute left-2.5 top-2 w-3.5 h-3.5 text-gray-400" />
                                                            <Input
                                                                value={capacity}
                                                                onChange={(e) => setCapacity(e.target.value)}
                                                                className="h-9 pl-8 bg-white border border-gray-200 rounded-lg text-xs"
                                                                placeholder="명"
                                                            />
                                                        </div>
                                                    </div>
                                                </div>

                                                <Button size="sm" variant="outline" className="w-full h-8 text-xs bg-white text-blue-600 border-blue-200 hover:bg-blue-50">
                                                    <Plus className="w-3 h-3 mr-1" /> 세션 목록에 추가
                                                </Button>
                                            </div>
                                        </div>
                                    </>
                                )}

                                {currentStep === 1 && (
                                    <div className="text-center py-10 space-y-6">
                                        <p className="text-base text-gray-600 leading-relaxed">
                                            클래스가 생성되었습니다.<br />
                                            <span className="font-bold text-gray-800">나만의 신청 링크</span>가 준비되었어요.
                                        </p>
                                        <div className="bg-gray-50 p-5 rounded-2xl flex flex-col items-center gap-3 border border-gray-200 w-full">
                                            <div className="font-bold text-[#3182F6] text-lg">classhub.kr/yoga-class</div>
                                            <Button variant="outline" size="sm" className="h-9 rounded-full px-5 border-[#3182F6] text-[#3182F6] hover:bg-blue-50 font-bold">
                                                링크 복사하기
                                            </Button>
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
                                        <DialogContent className="sm:max-w-md">
                                            <DialogHeader>
                                                <DialogTitle>입력하신 정보로 클래스를 개설할까요?</DialogTitle>
                                                <DialogDescription>
                                                    회원가입 후, 작성하신 클래스 정보가<br />
                                                    자동으로 등록됩니다.
                                                </DialogDescription>
                                            </DialogHeader>
                                            <div className="bg-gray-50 p-4 rounded-lg text-sm space-y-2 mb-2">
                                                <div className="flex justify-between">
                                                    <span className="text-gray-500">클래스명</span>
                                                    <span className="font-medium text-gray-900 line-clamp-1 text-right ml-4">{className || "미입력"}</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span className="text-gray-500">일정</span>
                                                    <span className="font-medium text-gray-900">{date} {startTime}</span>
                                                </div>
                                            </div>
                                            <DialogFooter className="flex flex-col-reverse sm:flex-row gap-2 sm:justify-end items-center mt-2">
                                                <Button
                                                    type="button"
                                                    variant="secondary"
                                                    onClick={() => router.push('/signup')}
                                                    className="w-full sm:w-auto bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-900 sm:mr-auto"
                                                >
                                                    클래스 정보 없이 시작할래요
                                                </Button>
                                                <Button type="button" onClick={handleSignupWithClass} className="w-full sm:w-auto bg-[#3182F6] hover:bg-[#2c72d9]">
                                                    네, 이 정보로 시작할게요
                                                </Button>
                                            </DialogFooter>
                                        </DialogContent>
                                    </Dialog>
                                </>
                            )}
                        </div>
                    </div>

                    {/* RIGHT PANEL: Preview */}
                    <div className="bg-[#E8F3FF] rounded-[24px] border border-blue-100 p-6 sm:p-8 flex flex-col h-full relative overflow-hidden">

                        <div className="flex justify-between items-center mb-6 flex-shrink-0">
                            <h3 className="text-base font-bold text-[#191F28]">수강생 화면 미리보기</h3>
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
                                            endTime=""
                                            description={description}
                                        />
                                    </div>

                                    <div className={`absolute inset-0 transition-opacity duration-500 ${currentStep === 1 ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}>
                                        <InstagramPreview className={className || "클래스 이름"} />
                                    </div>

                                    <div className={`absolute inset-0 transition-opacity duration-500 ${currentStep === 2 ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}>
                                        <KakaoPreview
                                            className={className || "클래스 이름"}
                                            location={location}
                                            date={date}
                                            startTime={startTime}
                                            studentName="김철수"
                                            materials={materials}
                                            parking={parking}
                                        />
                                    </div>

                                    <div className={`absolute inset-0 transition-opacity duration-500 bg-[#F9FAFB] p-3 ${currentStep === 3 ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}>
                                        <DashboardPreview />
                                    </div>

                                </div>
                            </div>
                        </div>

                    </div>

                </div>

            </div>
        </div>
    );
}
