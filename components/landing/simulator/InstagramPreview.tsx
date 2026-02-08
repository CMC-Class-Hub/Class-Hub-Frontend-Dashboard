"use client";

import { useState } from 'react';
import { MoreHorizontal, ChevronLeft, ChevronRight, X } from 'lucide-react';

interface InstagramPreviewProps {
    className: string;
}

export const InstagramPreview = ({
    className = "",
}: InstagramPreviewProps) => {
    const [view, setView] = useState<'profile' | 'story'>('profile');

    return (
        <div className="w-full h-full bg-white flex flex-col items-center overflow-hidden relative font-sans">
            {/* Status Bar Area - Dynamic based on view */}
            <div className={`w-full h-7 flex justify-between items-center px-6 text-[10px] font-bold z-30 transition-colors duration-300 ${view === 'story' ? 'text-white absolute top-0 bg-transparent' : 'text-black bg-white'}`}>
                <span>9:41</span>
                <div className="flex gap-1.5 items-center mb-0.5">
                    <div className={`w-3.5 h-2.5 rounded-[1px] transition-colors duration-300 ${view === 'story' ? 'bg-white' : 'bg-black'}`}></div>
                    <div className={`w-3.5 h-2.5 rounded-[1px] transition-colors duration-300 ${view === 'story' ? 'bg-white' : 'bg-black'}`}></div>
                </div>
            </div>

            {/* Profile View */}
            <div className={`w-full h-full flex flex-col ${view === 'story' ? 'hidden' : 'flex'}`}>
                {/* Header */}
                <div className="w-full px-4 h-11 flex items-center justify-between z-20 bg-white border-b border-gray-50">
                    <ChevronLeft className="w-6 h-6 -ml-2 text-black" />
                    <span className="text-sm font-bold truncate flex-1 mx-2 text-center text-black">{className ? `class_${className}` : "class_hub_official"}</span>
                    <MoreHorizontal className="w-6 h-6 -mr-1 text-black" />
                </div>

                {/* Content Scroll Area */}
                <div className="w-full flex-1 overflow-y-auto scrollbar-hide bg-white pt-4 pb-6">

                    {/* Profile Info */}
                    <div className="px-4 pb-4">
                        <div className="flex items-center justify-between mb-4">
                            {/* Avatar - Clickable */}
                            <div className="relative group cursor-pointer" onClick={() => setView('story')}>
                                <div className="absolute -inset-0.5 bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 rounded-full blur-sm opacity-70 group-hover:opacity-100 transition duration-200"></div>
                                <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 p-[2.5px] relative z-10">
                                    <div className="w-full h-full bg-white rounded-full p-[2.5px]">
                                        <div className="w-full h-full bg-gray-100 rounded-full flex items-center justify-center overflow-hidden">
                                            <svg className="w-full h-full text-gray-300 translate-y-2" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                                <div className="absolute bottom-0 right-0 z-20 bg-blue-500 text-white rounded-full p-1 border-2 border-white">
                                    <div className="w-2.5 h-2.5 flex items-center justify-center font-bold text-[10px]">+</div>
                                </div>
                            </div>

                            {/* Stats */}
                            <div className="flex-1 flex justify-around items-center ml-4">
                                <div className="flex flex-col items-center">
                                    <span className="font-bold text-lg leading-tight">12</span>
                                    <span className="text-xs text-gray-500">게시물</span>
                                </div>
                                <div className="flex flex-col items-center">
                                    <span className="font-bold text-lg leading-tight">1.2k</span>
                                    <span className="text-xs text-gray-500">팔로워</span>
                                </div>
                                <div className="flex flex-col items-center">
                                    <span className="font-bold text-lg leading-tight">340</span>
                                    <span className="text-xs text-gray-500">팔로잉</span>
                                </div>
                            </div>
                        </div>

                        {/* Bio */}
                        <div className="space-y-1 mb-4">
                            <div className="font-bold text-sm">{className || "클래스 허브"} | 원데이 클래스</div>
                            <div className="text-xs text-gray-500">교육</div>
                            <div className="text-xs text-gray-900 whitespace-pre-wrap leading-snug">
                                ✨ 새로운 클래스 오픈! <br />
                                👇 지금 바로 신청하기
                            </div>

                            {/* Link */}
                            <div className="flex items-center gap-1.5 pt-1.5">
                                <div className="bg-gray-100 p-1 rounded-full -rotate-45">
                                    <div className="w-2.5 h-2.5 border-2 border-gray-400 rounded-full"></div>
                                </div>
                                <span className="text-xs font-semibold text-[#00376B] hover:underline cursor-pointer">
                                    classhub-link.vercel.app/class/abc
                                </span>
                            </div>
                        </div>

                        {/* Buttons */}
                        <div className="flex gap-2 mb-2">
                            <button className="flex-1 bg-gray-100 py-1.5 rounded-lg text-xs font-semibold hover:bg-gray-200 transition-colors">
                                프로필 편집
                            </button>
                            <button className="flex-1 bg-gray-100 py-1.5 rounded-lg text-xs font-semibold hover:bg-gray-200 transition-colors">
                                공유하기
                            </button>
                        </div>
                    </div>

                    {/* Highlights Mock - Clickable */}
                    <div className="flex gap-4 px-4 overflow-x-auto scrollbar-hide mb-4 pb-2">
                        {[1, 2, 3].map((_, i) => (
                            <div key={i} className="flex flex-col items-center gap-1 shrink-0 cursor-pointer" onClick={() => setView('story')}>
                                <div className="w-14 h-14 rounded-full border border-gray-200 p-[2px]">
                                    <div className="w-full h-full bg-gray-50 rounded-full"></div>
                                </div>
                                <span className="text-[10px] text-gray-500">Highlight</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Story View Overlay */}
            {view === 'story' && (
                <div className="absolute inset-0 z-40 bg-gradient-to-tr from-purple-500 via-pink-500 to-orange-500 text-white flex flex-col animate-in fade-in duration-200">
                    {/* Top Bar spacing for Status Bar */}
                    <div className="h-7 w-full shrink-0"></div>

                    {/* Progress Bar */}
                    <div className="px-2 flex gap-1 pt-2 pb-2 shrink-0">
                        <div className="h-0.5 flex-1 bg-white/40 rounded-full overflow-hidden">
                            <div className="h-full w-2/3 bg-white"></div>
                        </div>
                        <div className="h-0.5 flex-1 bg-white/40 rounded-full"></div>
                        <div className="h-0.5 flex-1 bg-white/40 rounded-full"></div>
                    </div>

                    {/* Story Header */}
                    <div className="px-3 flex justify-between items-center mb-4 shrink-0">
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-gray-200 overflow-hidden border border-white/20">
                                <svg className="w-full h-full text-gray-400 translate-y-1" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                                </svg>
                            </div>
                            <div className="flex flex-col">
                                <div className="flex items-center gap-1">
                                    <span className="text-xs font-bold">{className ? `class_${className}` : "class_hub_official"}</span>
                                    <span className="text-[10px] text-white/80">12h</span>
                                </div>
                                <span className="text-[10px] opacity-80">Sponsored</span>
                            </div>
                        </div>
                        <button onClick={() => setView('profile')} className="p-1 hover:opacity-70">
                            <X className="w-6 h-6 text-white" />
                        </button>
                    </div>

                    {/* Story Content Area */}
                    <div className="flex-1 flex flex-col items-center justify-center relative px-8 pb-10 gap-6">
                        {/* Placeholder Content */}
                        <div className="text-center space-y-3">
                            <div className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-yellow-200 via-white to-pink-200 drop-shadow-lg">
                                New Class Open!
                            </div>
                            <div className="bg-white/10 backdrop-blur-md px-5 py-2.5 rounded-xl border border-white/20 shadow-xl inline-block">
                                <p className="text-sm font-medium"> ✨ 원데이 클래스 오픈! </p>
                                <p className="text-xs opacity-80 mt-0.5">지금 바로 신청하세요</p>
                            </div>
                        </div>

                        {/* Custom Link Sticker based on user photos */}
                        <div className="flex flex-col items-center gap-2">
                            <div className="bg-white rounded-full py-2 px-4 flex items-center justify-center gap-2 shadow-xl cursor-pointer hover:scale-105 transition-transform w-auto min-w-[140px]">
                                <span className="text-blue-600 font-bold text-xs">신청하러 가기</span>
                                <ChevronRight className="w-3 h-3 text-gray-400 shrink-0" />
                            </div>

                            <div className="bg-black/60 backdrop-blur-md text-white px-3 py-1 rounded-full text-[10px] font-medium shadow-lg flex items-center gap-1">
                                <span>👆</span> 위 링크를 눌러주세요!
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Home Indicator */}
            <div className={`absolute bottom-1 left-1/2 transform -translate-x-1/2 w-1/3 h-1 rounded-full z-50 transition-colors duration-300 ${view === 'story' ? 'bg-white/30' : 'bg-black/20'}`}></div>
        </div>
    );
};
