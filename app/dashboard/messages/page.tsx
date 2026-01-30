"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { ChevronDown, ChevronRight } from "lucide-react";
import { messageTemplateApi, type MessageTemplateType } from "@/lib/api";
import { EditMessageTemplateForm } from "@/components/dashboard/EditMessageTemplateForm";

export default function MessagesPage() {
    const [d3Template, setD3Template] = useState('');
    const [d1Template, setD1Template] = useState('');
    const [confirmedTemplate, setConfirmedTemplate] = useState('');
    const [expandedTemplate, setExpandedTemplate] = useState<MessageTemplateType | null>(null);
    const [editingTemplate, setEditingTemplate] = useState<MessageTemplateType | null>(null);

    useEffect(() => {
        loadGlobalMessageTemplates();
    }, []);

    const loadGlobalMessageTemplates = async () => {
        const templates = await messageTemplateApi.getByTemplateId('global');

        const d3 = templates.find(t => t.type === 'D-3');
        const d1 = templates.find(t => t.type === 'D-1');
        const confirmed = templates.find(t => t.type === 'APPLY_CONFIRMED');

        setD3Template(d3?.content || messageTemplateApi.getDefault('D-3', '{클래스명}'));
        setD1Template(d1?.content || messageTemplateApi.getDefault('D-1', '{클래스명}'));
        setConfirmedTemplate(confirmed?.content || messageTemplateApi.getDefault('APPLY_CONFIRMED', '{클래스명}'));
    };

    const templateTypes = [
        { type: 'APPLY_CONFIRMED' as const, title: '신청 완료 안내', description: '수업 신청 직후 자동으로 발송됩니다' },
        { type: 'D-3' as const, title: 'D-3 리마인더', description: '수업 3일 전에 자동으로 발송됩니다' },
        { type: 'D-1' as const, title: 'D-1 리마인더', description: '수업 1일 전에 자동으로 발송됩니다' },
    ];

    return (
        <div className="space-y-5 md:space-y-6">
            <div>
                <h1 className="text-xl md:text-2xl font-bold text-[#191F28]">메시지 템플릿</h1>
                <p className="text-sm md:text-base text-[#8B95A1] mt-1">자동 발송 메시지를 확인하세요</p>
            </div>

            <div className="space-y-4">
                {templateTypes.map(({ type, title, description }) => {
                    const isExpanded = expandedTemplate === type;
                    let content = '';
                    let setContent: (val: string) => void = () => { };

                    switch (type) {
                        case 'APPLY_CONFIRMED':
                            content = confirmedTemplate;
                            setContent = setConfirmedTemplate;
                            break;
                        case 'D-3':
                            content = d3Template;
                            setContent = setD3Template;
                            break;
                        case 'D-1':
                            content = d1Template;
                            setContent = setD1Template;
                            break;
                    }

                    return (
                        <Card key={type} className="hover:shadow-md transition-shadow">
                            <CardHeader
                                className="cursor-pointer p-5 md:p-6"
                                onClick={() => setExpandedTemplate(isExpanded ? null : type)}
                            >
                                <div className="flex justify-between items-start">
                                    <div>
                                        <CardTitle className="text-base md:text-lg flex items-center gap-2">
                                            {isExpanded ? <ChevronDown className="h-4 w-4 md:h-5 md:w-5 text-[#3182F6]" /> : <ChevronRight className="h-4 w-4 md:h-5 md:w-5 text-[#8B95A1]" />}
                                            {title}
                                        </CardTitle>
                                        <CardDescription className="ml-6 md:ml-7 text-xs md:text-sm">{description}</CardDescription>
                                    </div>
                                    {isExpanded && editingTemplate !== type && (
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setEditingTemplate(type);
                                            }}
                                        >
                                            수정하기
                                        </Button>
                                    )}
                                </div>
                            </CardHeader>

                            {isExpanded && (
                                <CardContent className="pt-0 p-5 md:p-6 md:pt-0">
                                    {editingTemplate === type ? (
                                        <EditMessageTemplateForm
                                            type={type}
                                            initialContent={content}
                                            onSave={async (newContent) => {
                                                setContent(newContent);
                                                await messageTemplateApi.save('global', type, newContent);
                                                await loadGlobalMessageTemplates();
                                                alert(`${type} 메시지 템플릿이 저장되었습니다.`);
                                                setEditingTemplate(null);
                                            }}
                                            onCancel={() => setEditingTemplate(null)}
                                        />
                                    ) : (
                                        <Textarea
                                            value={content}
                                            readOnly
                                            rows={6}
                                            className="mb-4 text-sm bg-[#F9FAFB]"
                                        />
                                    )}
                                </CardContent>
                            )}
                        </Card>
                    );
                })}
            </div>
        </div>
    );
}
