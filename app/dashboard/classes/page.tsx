"use client";

import { useState, useEffect } from "react";
import { Plus, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { api, templateApi, sessionApi, type ClassTemplate, type User } from "@/lib/api";
import { CreateClassForm } from "@/components/dashboard/CreateClassForm";
import { ClassList } from "@/components/dashboard/ClassList";

export default function ClassesPage() {
    const [templates, setTemplates] = useState<ClassTemplate[]>([]);
    const [createDialogOpen, setCreateDialogOpen] = useState(false);
    const [user, setUser] = useState<User | null>(null);
    const [templateSessionCounts, setTemplateSessionCounts] = useState<Record<string, number>>({});

    useEffect(() => {
        const checkAuth = async () => {
            const currentUser = await api.auth.getCurrentUser();
            if (currentUser) {
                await api.initializeDemoData(currentUser.id);
                setUser(currentUser);
                loadTemplates(currentUser.id);
            }
        };
        checkAuth();
    }, []);

    const loadTemplates = async (instructorId: string) => {
        const myTemplates = await templateApi.getAll(instructorId);
        setTemplates(myTemplates);
    };

    // 템플릿별 세션 수 로드
    useEffect(() => {
        const loadTemplateSessionCounts = async () => {
            if (templates.length > 0) {
                const counts: Record<string, number> = {};
                for (const template of templates) {
                    const templateSessions = await sessionApi.getByTemplateId(template.id);
                    counts[template.id] = templateSessions.length;
                }
                setTemplateSessionCounts(counts);
            }
        };

        loadTemplateSessionCounts();
    }, [templates]);

    const handleCreateTemplate = async (data: any) => {
        if (!user) return;

        try {
            await templateApi.create(user.id, data);
            setCreateDialogOpen(false);
            await loadTemplates(user.id);
        } catch (error) {
            console.error('Failed to create class:', error);
            alert('클래스 생성 중 오류가 발생했습니다. 이미지가 너무 크거나 저장 공간이 부족할 수 있습니다.');
        }
    };

    const handleDeleteTemplate = async (e: React.MouseEvent, templateId: string) => {
        e.stopPropagation();
        if (confirm('정말로 이 클래스를 삭제하시겠습니까? 관련된 모든 세션도 함께 삭제됩니다.')) {
            await templateApi.delete(templateId);
            if (user) await loadTemplates(user.id);
        }
    };

    return (
        <div className="space-y-5 md:space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-xl md:text-2xl font-bold text-[#191F28]">클래스 관리</h1>
                    <p className="text-sm md:text-base text-[#8B95A1] mt-1">클래스와 세션을 관리하세요</p>
                </div>

                <Dialog open={createDialogOpen} onOpenChange={setCreateDialogOpen}>
                    <DialogTrigger asChild>
                        <Button className="w-full sm:w-auto">
                            <Plus className="mr-2 h-5 w-5" />
                            클래스 만들기
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto mx-4 md:mx-auto rounded-3xl">
                        <DialogHeader>
                            <DialogTitle className="text-xl font-bold text-[#191F28]">새 클래스 만들기</DialogTitle>
                        </DialogHeader>
                        <CreateClassForm
                            onSubmit={handleCreateTemplate}
                            onCancel={() => setCreateDialogOpen(false)}
                        />
                    </DialogContent>
                </Dialog>
            </div>

            {templates.length === 0 ? (
                <Card className="hover:shadow-md">
                    <CardContent className="p-10 md:p-16 text-center">
                        <div className="w-16 h-16 md:w-20 md:h-20 bg-[#E8F3FF] rounded-full flex items-center justify-center mx-auto mb-5">
                            <Calendar className="h-8 w-8 md:h-10 md:w-10 text-[#3182F6]" />
                        </div>
                        <h3 className="text-lg md:text-xl font-bold text-[#191F28] mb-2">
                            아직 클래스가 없습니다
                        </h3>
                        <p className="text-sm md:text-base text-[#8B95A1] mb-6">
                            첫 번째 클래스를 만들어보세요
                        </p>
                        <Button onClick={() => setCreateDialogOpen(true)} className="w-full sm:w-auto">
                            <Plus className="mr-2 h-4 w-4" />
                            클래스 만들기
                        </Button>
                    </CardContent>
                </Card>
            ) : (
                <ClassList
                    templates={templates}
                    templateSessionCounts={templateSessionCounts}
                    onDelete={handleDeleteTemplate}
                />
            )}
        </div>
    );
}
