"use client";

import { Button } from "@/components/ui/button";
import { Download, Share2, Copy, Check, Smartphone, Heart } from 'lucide-react';
import { useState } from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

export function GrowthLoops() {
    const [copied, setCopied] = useState(false);

    const handleShare = () => {
        const url = window.location.origin;
        navigator.clipboard.writeText(url).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        });
    };

    return (
        <section className="py-24 bg-white border-t border-gray-100">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-[#191F28] mb-4">
                        Class Hub를 더 스마트하게
                    </h2>
                    <p className="text-[#6B7684]">
                        홈 화면 추가로 더 편하게 접속하고, 링크로 간편하게 공유하세요.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8">

                    {/* 1. Retention Loop: Add to Home Screen (PWA Guide) */}
                    <div className="bg-[#F9FAFB] rounded-[32px] p-8 sm:p-10 border border-gray-100 flex flex-col items-center text-center transition-transform hover:scale-[1.01]">
                        <div className="w-16 h-16 bg-white rounded-2xl shadow-sm text-[#3182F6] flex items-center justify-center mb-6">
                            <Smartphone className="w-8 h-8" />
                        </div>
                        <h3 className="text-xl font-bold text-[#191F28] mb-2">
                            홈 화면에 추가하기
                        </h3>
                        <p className="text-[#6B7684] mb-8 text-sm leading-relaxed">
                            매번 검색해서 들어오지 마세요.<br />
                            1초 만에 홈 화면에 아이콘을 만들 수 있어요.
                        </p>

                        <Dialog>
                            <DialogTrigger asChild>
                                <Button className="h-12 px-8 rounded-full bg-[#3182F6] hover:bg-[#1B64DA] font-bold text-white shadow-lg shadow-blue-100">
                                    아이콘 추가 방법 보기 <Download className="w-4 h-4 ml-2" />
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-md rounded-[24px]">
                                <DialogHeader>
                                    <DialogTitle>홈 화면에 추가하는 법</DialogTitle>
                                    <DialogDescription>
                                        사용하고 계신 기기에 맞춰 따라해보세요.
                                    </DialogDescription>
                                </DialogHeader>
                                <div className="grid grid-cols-2 gap-4 pt-4">
                                    <div className="bg-gray-50 p-4 rounded-xl text-center">
                                        <div className="font-bold text-[#191F28] mb-2">iPhone (Safari)</div>
                                        <p className="text-xs text-gray-500 leading-relaxed">
                                            하단 <span className="font-bold">공유 버튼</span> 누르기 <br />
                                            ↓ <br />
                                            <span className="font-bold">'홈 화면에 추가'</span> 선택
                                        </p>
                                    </div>
                                    <div className="bg-gray-50 p-4 rounded-xl text-center">
                                        <div className="font-bold text-[#191F28] mb-2">Android (Chrome)</div>
                                        <p className="text-xs text-gray-500 leading-relaxed">
                                            상단 <span className="font-bold">메뉴(⋮) 버튼</span> 누르기 <br />
                                            ↓ <br />
                                            <span className="font-bold">'앱 설치'</span> 또는 <br /> <span className="font-bold">'홈 화면에 추가'</span> 선택
                                        </p>
                                    </div>
                                </div>
                            </DialogContent>
                        </Dialog>
                    </div>

                    {/* 2. Viral Loop: Share */}
                    <div className="bg-[#FFF8F8] rounded-[32px] p-8 sm:p-10 border border-pink-50 flex flex-col items-center text-center transition-transform hover:scale-[1.01]">
                        <div className="w-16 h-16 bg-white rounded-2xl shadow-sm text-pink-500 flex items-center justify-center mb-6">
                            <Heart className="w-8 h-8 fill-current" />
                        </div>
                        <h3 className="text-xl font-bold text-[#191F28] mb-2">
                            동료 강사님께 알려주기
                        </h3>
                        <p className="text-[#6B7684] mb-8 text-sm leading-relaxed">
                            좋은 건 함께 써야죠.<br />
                            클래스 관리가 필요한 동료에게 선물하세요.
                        </p>

                        <Button
                            onClick={handleShare}
                            className={`h-12 px-8 rounded-full font-bold shadow-lg transition-all duration-300 ${copied
                                ? 'bg-green-500 hover:bg-green-600 text-white shadow-green-200'
                                : 'bg-pink-500 hover:bg-pink-600 text-white shadow-pink-200'
                                }`}
                        >
                            {copied ? (
                                <>링크 복사 완료! <Check className="w-4 h-4 ml-2" /></>
                            ) : (
                                <>친구에게 공유하기 <Share2 className="w-4 h-4 ml-2" /></>
                            )}
                        </Button>
                        <p className="mt-4 text-xs text-pink-400 font-medium">
                            공유를 통해 Class Hub를 응원해주세요! 🙌
                        </p>
                    </div>

                </div>
            </div>
        </section>
    );
}
