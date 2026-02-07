"use client";

import { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { ChevronDown, ChevronRight } from "lucide-react";
import { messageTemplateApi, type MessageTemplateType, type MessageTemplateListItem } from "@/lib/api";

export default function MessagesPage() {
    const [templates, setTemplates] = useState<MessageTemplateListItem[]>([]);
    const [expandedTitle, setExpandedTitle] = useState<string | null>(null);
    const [detailsCache, setDetailsCache] = useState<Record<string, { type: string, body: string }>>({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTemplates = async () => {
            try {
                const list = await messageTemplateApi.getTitles();
                setTemplates(list);
            } catch (error) {
                console.error("Failed to fetch templates", error);
            } finally {
                setLoading(false);
            }
        };
        fetchTemplates();
    }, []);

    const handleExpand = async (title: string) => {
        if (expandedTitle === title) {
            setExpandedTitle(null);
            return;
        }

        setExpandedTitle(title);

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

    if (loading) return <div className="p-8 text-center text-[#8B95A1]">로딩 중...</div>;

    return (
        <div className="space-y-5 md:space-y-6">
            <div>
                <h1 className="text-xl md:text-2xl font-bold text-[#191F28]">메시지 템플릿</h1>
                <p className="text-sm md:text-base text-[#8B95A1] mt-1">자동 발송 메시지를 확인하세요</p>
            </div>

            <div className="space-y-4">
                {templates.length === 0 ? (
                    <div className="text-center py-12 bg-gray-50 rounded-lg border border-dashed border-gray-200">
                        <p className="text-[#8B95A1]">등록된 메시지 템플릿이 없습니다.</p>
                    </div>
                ) : (
                    templates.map((template) => {
                        const isExpanded = expandedTitle === template.title;
                        const detail = detailsCache[template.title];

                        return (
                            <Card key={template.title} className="hover:shadow-md transition-shadow">
                                <CardHeader
                                    className="cursor-pointer p-5 md:p-6"
                                    onClick={() => handleExpand(template.title)}
                                >
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <CardTitle className="text-base md:text-lg flex items-center gap-2">
                                                {isExpanded ? <ChevronDown className="h-4 w-4 md:h-5 md:w-5 text-[#3182F6]" /> : <ChevronRight className="h-4 w-4 md:h-5 md:w-5 text-[#8B95A1]" />}
                                                {template.title}
                                            </CardTitle>
                                            <CardDescription className="ml-6 md:ml-7 text-xs md:text-sm">
                                                {template.description}
                                            </CardDescription>
                                        </div>
                                    </div>
                                </CardHeader>

                                {isExpanded && (
                                    <CardContent className="pt-0 p-5 md:p-6 md:pt-0">
                                        {detail ? (
                                            <Textarea
                                                value={detail.body}
                                                readOnly
                                                rows={12}
                                                className="mb-4 text-sm bg-[#F9FAFB]"
                                            />
                                        ) : (
                                            <div className="text-sm text-gray-500 py-4">불러오는 중...</div>
                                        )}
                                    </CardContent>
                                )}
                            </Card>
                        );
                    })
                )}
            </div>
        </div>
    );
}
