"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { ChevronDown, ChevronRight } from "lucide-react";
import { messageTemplateApi, type MessageTemplateType, type MessageTemplate } from "@/lib/api";


export default function MessagesPage() {
    const [templates, setTemplates] = useState<MessageTemplate[]>([]);
    const [expandedTemplate, setExpandedTemplate] = useState<string | null>(null);

    useEffect(() => {
        loadGlobalMessageTemplates();
    }, []);

    const loadGlobalMessageTemplates = async () => {
        try {
            const titles = await messageTemplateApi.getTitles();
            const templatePromises = titles.map(title => messageTemplateApi.getDetail(title));
            const fetchedTemplates = await Promise.all(templatePromises);
            setTemplates(fetchedTemplates);
        } catch (error) {
            console.error('Failed to load templates:', error);
        }
    };

    return (
        <div className="space-y-5 md:space-y-6">
            <div>
                <h1 className="text-xl md:text-2xl font-bold text-[#191F28]">메시지 템플릿</h1>
                <p className="text-sm md:text-base text-[#8B95A1] mt-1">자동 발송 메시지를 확인하세요</p>
            </div>

            <div className="space-y-4">
                {templates.map((template) => {
                    const isExpanded = expandedTemplate === template.title;

                    return (
                        <Card key={template.title} className="hover:shadow-md transition-shadow">
                            <CardHeader
                                className="cursor-pointer p-5 md:p-6"
                                onClick={() => setExpandedTemplate(isExpanded ? null : template.title)}
                            >
                                <div className="flex justify-between items-start">
                                    <div>
                                        <CardTitle className="text-base md:text-lg flex items-center gap-2">
                                            {isExpanded ? <ChevronDown className="h-4 w-4 md:h-5 md:w-5 text-[#3182F6]" /> : <ChevronRight className="h-4 w-4 md:h-5 md:w-5 text-[#8B95A1]" />}
                                            {template.title}
                                        </CardTitle>
                                        <CardDescription className="ml-6 md:ml-7 text-xs md:text-sm">
                                            {/* Assuming description isn't available in simplified API, showing type or leaving blank */}
                                            {template.type}
                                        </CardDescription>
                                    </div>
                                </div>
                            </CardHeader>

                            {isExpanded && (
                                <CardContent className="pt-0 p-5 md:p-6 md:pt-0">
                                    <Textarea
                                        value={template.body}
                                        readOnly
                                        rows={6}
                                        className="mb-4 text-sm bg-[#F9FAFB]"
                                    />
                                </CardContent>
                            )}
                        </Card>
                    );
                })}
            </div>
        </div>
    );
}
