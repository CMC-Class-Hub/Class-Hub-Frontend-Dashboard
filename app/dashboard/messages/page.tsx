"use client";

import { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { ChevronDown, ChevronRight } from "lucide-react";
import { messageTemplateApi, type MessageTemplateType, type MessageTemplateListItem } from "@/lib/api";
import { KakaoTemplatePreview } from "@/components/dashboard/KakaoTemplatePreview";

export default function MessagesPage() {
    const [templates, setTemplates] = useState<MessageTemplateListItem[]>([]);
    const [selectedTitle, setSelectedTitle] = useState<string | null>(null);
    const [detailsCache, setDetailsCache] = useState<Record<string, { type: string, body: string }>>({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTemplates = async () => {
            try {
                const list = await messageTemplateApi.getTitles();
                setTemplates(list);
                if (list.length > 0) {
                    setSelectedTitle(list[0].title);
                    handleFetchDetails(list[0].title);
                }
            } catch (error) {
                console.error("Failed to fetch templates", error);
            } finally {
                setLoading(false);
            }
        };
        fetchTemplates();
    }, []);

    const handleFetchDetails = async (title: string) => {
        if (!detailsCache[title]) {
            try {
                const data = await messageTemplateApi.getDetails(title);
                setDetailsCache(prev => ({
                    ...prev,
                    [title]: { type: data.type, body: data.body }
                }));
            } catch (error) {
                console.error(`Failed to fetch details for ${title}`, error);
            }
        }
    };

    const handleSelect = (title: string) => {
        setSelectedTitle(title);
        handleFetchDetails(title);
    };

    if (loading) return (
        <div className="flex flex-col items-center justify-center p-20 space-y-4">
            <div className="w-10 h-10 border-4 border-[#3182F6]/20 border-t-[#3182F6] rounded-full animate-spin" />
            <p className="text-[#8B95A1] font-medium">로딩 중...</p>
        </div>
    );

    const activeDetail = selectedTitle ? detailsCache[selectedTitle] : null;

    // Helper to get icons based on title/type
    const getIcon = (title: string) => {
        if (title.includes('즉시') || title.includes('확정')) return '🔔';
        if (title.includes('3일')) return '⏰';
        if (title.includes('1일')) return '🚀';
        return '✉️';
    };

    return (
        <div className="max-w-[1400px] mx-auto space-y-6 pb-10">
            {/* Top Header & Stats Bar */}
            <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 px-2">
                <div className="space-y-1.5 px-2">
                    <h1 className="text-3xl font-black text-[#191F28] tracking-tight">메시지 센터</h1>
                    <p className="text-[#8B95A1] font-medium">알림 메시지 발송 시나리오를 한눈에 관리하세요.</p>
                </div>

                <div className="flex items-center gap-4 bg-white border border-gray-100 p-2 rounded-2xl shadow-sm">
                    <div className="px-4 py-2 flex flex-col items-center border-r border-gray-100">
                        <span className="text-[10px] font-bold text-[#8B95A1]">운영 상태</span>
                        <div className="flex items-center gap-1.5">
                            <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
                            <span className="text-sm font-bold text-[#191F28]">자동 발송 중</span>
                        </div>
                    </div>
                    <div className="px-4 py-2 flex flex-col items-center">
                        <span className="text-[10px] font-bold text-[#8B95A1]">활성 템플릿</span>
                        <span className="text-sm font-bold text-[#3182F6]">{templates.length}개</span>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                {/* Left Side: Management Section (6 columns) - Aligned Top */}
                <div className="lg:col-span-12 xl:col-span-6 flex flex-col pt-2 min-h-[550px] space-y-4">
                    {/* 1. Template List */}
                    <section className="space-y-3">
                        <div className="flex items-center justify-between px-2">
                            <h2 className="text-base font-bold text-[#191F28] flex items-center gap-2">
                                <span className="text-blue-500">Selection</span> 알림 시나리오 선택
                            </h2>
                            <span className="text-[10px] font-medium text-[#8B95A1]">클릭하여 미리보기를 확인하세요</span>
                        </div>

                        <div className="grid grid-cols-1 gap-3">
                            {templates.map((template) => {
                                const isSelected = selectedTitle === template.title;
                                return (
                                    <button
                                        key={template.title}
                                        onClick={() => handleSelect(template.title)}
                                        className={`
                                            w-full p-4 rounded-[20px] flex items-center gap-4 transition-all text-left group border
                                            ${isSelected
                                                ? 'bg-white border-[#3182F6]/20 shadow-[0_8px_16px_-4px_rgba(49,130,246,0.1)] ring-1 ring-[#3182F6]/5'
                                                : 'bg-white border-transparent hover:border-gray-200 hover:bg-gray-50/50'
                                            }
                                        `}
                                    >
                                        <div className={`
                                            w-12 h-12 rounded-xl flex items-center justify-center text-xl shrink-0 transition-all duration-500
                                            ${isSelected ? 'bg-[#3182F6] text-white rotate-6 scale-110 shadow-lg shadow-blue-100' : 'bg-[#F2F4F6] text-gray-400'}
                                        `}>
                                            {getIcon(template.title)}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-2 mb-0.5">
                                                <p className={`text-[16px] font-bold transition-colors ${isSelected ? 'text-[#191F28]' : 'text-[#4E5968]'}`}>
                                                    {template.title}
                                                </p>
                                                {isSelected && (
                                                    <span className="bg-blue-50 text-[#3182F6] text-[9px] font-black px-1.2 py-0.5 rounded uppercase tracking-tighter">Selected</span>
                                                )}
                                            </div>
                                            <p className={`text-xs font-medium transition-colors ${isSelected ? 'text-[#4E5968]' : 'text-[#8B95A1]'}`}>
                                                {template.description}
                                            </p>
                                        </div>
                                        <ChevronRight className={`w-5 h-5 transition-all ${isSelected ? 'text-[#3182F6] translate-x-1' : 'text-gray-200 group-hover:text-gray-400'}`} />
                                    </button>
                                );
                            })}
                        </div>
                    </section>
                </div>

                {/* Right Side: Preview Workbench (6 columns) */}
                <div className="lg:col-span-12 xl:col-span-6 h-full">
                    <div className="bg-[#F8F9FA] rounded-[32px] border border-gray-100 p-6 lg:sticky lg:top-8 flex flex-col items-center justify-center min-h-[550px] shadow-inner relative overflow-hidden">
                        {/* Workbench minimal label */}
                        <div className="absolute top-6 left-6 flex items-center gap-4">
                            <div className="flex -space-x-2">
                                {[1, 2, 3].map(i => (
                                    <div key={i} className="w-5 h-5 rounded-full border-2 border-[#F8F9FA] bg-gray-200 overflow-hidden">
                                        <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-300"></div>
                                    </div>
                                ))}
                            </div>
                            <span className="text-[10px] font-bold text-[#8B95A1] uppercase tracking-widest"></span>
                        </div>

                        {/* White Device Frame - Matching landing page style */}
                        <div className="relative w-[310px] h-[580px] bg-white rounded-[48px] shadow-[0_45px_100px_-25px_rgba(0,0,0,0.12)] border-[8px] border-white overflow-hidden">
                            {/* Inner Screen */}
                            <div className="w-full h-full bg-[#ABC1D1] rounded-[36px] overflow-hidden relative border border-black/5 flex flex-col no-scrollbar">
                                {/* Status Bar Mock */}
                                <div className="w-full h-11 flex justify-between items-end px-7 pb-2 text-[11px] font-bold text-black z-40">
                                    <span>9:42</span>
                                    <div className="flex gap-1.5 items-center">
                                        <div className="w-4 h-2.5 bg-black rounded-[2px] relative after:content-[''] after:absolute after:right-[-2px] after:top-0.5 after:w-1 after:h-1.5 after:bg-black after:rounded-r-full"></div>
                                    </div>
                                </div>

                                {/* Content Scroll Area */}
                                <div className="flex-1 overflow-y-auto no-scrollbar relative">
                                    {activeDetail ? (
                                        <div key={selectedTitle} className="w-full animate-in fade-in zoom-in slide-in-from-bottom-4 duration-700 h-full">
                                            <KakaoTemplatePreview body={activeDetail.body} />
                                        </div>
                                    ) : (
                                        <div className="h-full flex flex-col items-center justify-center space-y-4 px-8 text-center bg-[#ABC1D1]">
                                            <div className="w-10 h-10 border-[4px] border-black/10 border-t-black/40 rounded-full animate-spin" />
                                            <p className="text-xs text-black/50 font-bold">메시지 데이터를<br />구성하는 중입니다</p>
                                        </div>
                                    )}
                                </div>

                                {/* Bottom Home Bar Area */}
                                <div className="w-full h-8 flex items-center justify-center pb-2 bg-white shrink-0">
                                    <div className="w-1/3 h-1.5 bg-black/10 rounded-full"></div>
                                </div>
                            </div>
                        </div>

                        <div className="absolute bottom-6 right-8 flex flex-col items-end gap-1 opacity-40">
                            <span className="text-[9px] font-black text-blue-300">HUB SIMULATOR</span>
                            <span className="text-[9px] font-bold text-gray-300 tracking-tighter">ENGINE v1.2.4</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
