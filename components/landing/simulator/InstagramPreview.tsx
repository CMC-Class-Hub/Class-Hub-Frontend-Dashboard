"use client";

import { Instagram } from 'lucide-react';

interface InstagramPreviewProps {
    className: string;
}

export const InstagramPreview = ({
    className = "",
}: InstagramPreviewProps) => {
    return (
        <div className="w-full h-full bg-black flex flex-col items-center overflow-hidden relative">
            {/* Fake Status Bar */}
            <div className="w-full h-7 flex justify-between items-center px-6 text-[10px] font-bold text-white z-20">
                <span>9:41</span>
                <div className="flex gap-1.5">
                    <div className="w-3.5 h-2.5 bg-white rounded-[1px]"></div>
                    <div className="w-3.5 h-2.5 bg-white rounded-[1px]"></div>
                </div>
            </div>

            {/* Instagram Story UI */}
            <div className="relative w-full h-full bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400">
                {/* Header */}
                <div className="absolute top-4 left-4 flex items-center gap-2 z-10">
                    <div className="w-8 h-8 rounded-full bg-gray-200 border-2 border-white overflow-hidden">
                        <div className="w-full h-full bg-gray-300 flex items-center justify-center text-[10px]">Me</div>
                    </div>
                    <span className="text-white text-sm font-semibold shadow-black drop-shadow-md">내 스토리</span>
                    <span className="text-white/70 text-xs font-medium">12시간</span>
                </div>

                {/* Content */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full px-6 text-center">
                    <h1 className="text-3xl font-black text-white italic drop-shadow-lg mb-8 transform -rotate-2">
                        {className || "곧 만나요!"}
                        <br />
                        <span className="text-2xl not-italic">✨오픈했습니다✨</span>
                    </h1>

                    {/* Link Sticker Mockup */}
                    <div className="bg-white rounded-xl py-3 px-6 inline-flex items-center gap-2 shadow-xl transform rotate-3 active:scale-95 transition-transform cursor-pointer">
                        <div className="bg-blue-500 p-1 rounded-full">
                            <Instagram className="w-3 h-3 text-white" />
                        </div>
                        <span className="text-[#3182F6] font-bold text-sm">신청하러 가기</span>
                        <div className="w-4 h-4 rounded-full bg-gray-100 flex items-center justify-center text-[10px] text-gray-500">
                            &gt;
                        </div>
                    </div>

                    <div className="mt-4 pointer-events-none">
                        <span className="inline-block bg-black/50 text-white text-xs px-3 py-1 rounded-full backdrop-blur-md">
                            👆 위 링크를 눌러주세요!
                        </span>
                    </div>
                </div>
            </div>

            {/* Home Indicator */}
            <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-1/3 h-1 bg-white/20 rounded-full z-20"></div>
        </div>
    );
};
