"use client";

import { useState, useEffect, use } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { ArrowLeft, Link2, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { api, templateApi, sessionApi, applicationApi, type ClassTemplate, type ClassSession } from "@/lib/api";
import { EditClassForm } from "@/components/dashboard/EditClassForm";
import { AddSessionForm } from "@/components/dashboard/AddSessionForm";
import { SessionList } from "@/components/dashboard/SessionList";
import { EditSessionForm } from "@/components/dashboard/EditSessionForm";

export default function ClassDetailPage({ params }: { params: Promise<{ classId: string }> }) {
    const router = useRouter();
    const { classId } = use(params);
    const [template, setTemplate] = useState<ClassTemplate | null>(null);
    const [sessions, setSessions] = useState<ClassSession[]>([]);
    const [editDialogOpen, setEditDialogOpen] = useState(false);
    const [addSessionDialogOpen, setAddSessionDialogOpen] = useState(false);
    const [editingSession, setEditingSession] = useState<ClassSession | null>(null);
    const [sessionApplicationCounts, setSessionApplicationCounts] = useState<Record<string, number>>({});
    const [user, setUser] = useState<any>(null);

    useEffect(() => {
        const fetchData = async () => {
            const currentUser = await api.auth.getCurrentUser();
            if (currentUser) {
                setUser(currentUser);
                // Fetch template details
                // Since we don't have getById, we fetch all and find (Mock limitations)
                // In real API, we should have getById
                const templates = await templateApi.getAll(currentUser.id);
                const found = templates.find(t => String(t.id) === classId);
                console.log(found);
                if (found) {
                    setTemplate(found);
                    loadSessions(found.id);
                } else {
                    // Handle not found
                    router.push('/dashboard/classes');
                }
            }
        };
        fetchData();
    }, [classId, router]);

    const loadSessions = async (templateId: string) => {
        const templateSessions = await sessionApi.getByTemplateId(templateId);
        setSessions(templateSessions);
    };

    // 세션 목록의 신청자 수 로드
    useEffect(() => {
        const loadApplicationCounts = async () => {
            if (sessions.length > 0) {
                const counts: Record<string, number> = {};
                for (const session of sessions) {
                    const apps = await applicationApi.getBySessionId(session.id);
                    counts[session.id] = apps.filter(app => 
                        (app as any).reservationStatus === 'CONFIRMED'
                    ).length;
                }
                setSessionApplicationCounts(counts);
            }
        };

        loadApplicationCounts();
    }, [sessions]);


    const handleEditTemplate = async (data: any) => {
        if (!template || !user) return;

        const updatedTemplate = await templateApi.update(template.id, data);
        setTemplate(updatedTemplate);
        setEditDialogOpen(false);
    };

    const handleAddSession = async (data: any) => {
        if (!template || !user) return;

        await sessionApi.create(user.id, {
            templateId: template.id,
            ...data
        });

        setAddSessionDialogOpen(false);
        await loadSessions(template.id);
    };

    const handleEditSession = async (data: any) => {
        if (!editingSession || !template) return;

        await sessionApi.update(editingSession.id, data);
        setEditingSession(null);
        await loadSessions(template.id);
    };

    const handleStatusChange = async (sessionId: string, newStatus: 'RECRUITING' | 'CLOSED' | 'FULL') => {
        if (!template) return;
        await sessionApi.updateStatus(sessionId, newStatus);
        await loadSessions(template.id);
    };

    const handleDeleteSession = async (sessionId: string) => {
        if (!confirm('이 세션을 삭제하시겠습니까?')) return;

        try {
            await sessionApi.delete(sessionId);

            if (template) {
                await loadSessions(template.id);
            }

            alert('세션이 삭제되었습니다.');
        } catch (error) {
            if (error instanceof Error) {
                alert(error.message); // 👈 백엔드 메시지 그대로 출력
            } else {
                alert('세션 삭제 중 알 수 없는 오류가 발생했습니다.');
            }
    }
    };

    const copyLink = () => {
        const url = `http://localhost:3001/class/${template?.classCode}`;
       // const url = 'https://classhub-link.vercel.app/class/${template?.classCode}';
        navigator.clipboard.writeText(url);
        toast.success("링크가 복사되었습니다", {
            description: "수강생들에게 이 링크를 공유하여 신청을 받을 수 있어요."
        });
    };

    if (!template) {
        return <div className="p-8 text-center text-[#8B95A1]">로딩 중...</div>;
    }

    return (
        <div className="space-y-6">
            <Button variant="ghost" onClick={() => router.push('/dashboard/classes')} className="px-3 text-[#6B7684] hover:text-[#191F28] -ml-2 mb-4 w-fit">
                <ArrowLeft className="mr-2 h-4 w-4" />
                클래스 목록으로
            </Button>

            {/* 클래스 정보 카드 */}
            <Card>
                <CardHeader className="p-5 md:p-6">
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                        <div className="space-y-1 flex-1">
                            <CardTitle className="text-lg md:text-xl">{template.name}</CardTitle>
                            <CardDescription className="text-sm mt-2">
                                {template.description}
                            </CardDescription>

                            <div className="mt-4 space-y-2 text-sm text-[#4E5968]">
                                <p><span className="font-semibold text-[#191F28]">장소:</span> {template.location}</p>
                                {template.preparation && (
                                    <p><span className="font-semibold text-[#191F28]">준비물:</span> {template.preparation}</p>
                                )}
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-2 min-w-fit">
                            <Button variant="outline" onClick={copyLink} className="w-full sm:w-auto">
                                <Link2 className="h-4 w-4 mr-2" />
                                클래스 링크
                            </Button>
                            <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
                                <DialogTrigger asChild>
                                    <Button variant="outline" className="w-full sm:w-auto">
                                        수정
                                    </Button>
                                </DialogTrigger>
                                <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto mx-4 md:mx-auto rounded-3xl">
                                    <DialogHeader>
                                        <DialogTitle className="text-xl font-bold text-[#191F28]">클래스 수정</DialogTitle>
                                    </DialogHeader>
                                    <EditClassForm
                                        template={template}
                                        onSubmit={handleEditTemplate}
                                        onCancel={() => setEditDialogOpen(false)}
                                    />
                                </DialogContent>
                            </Dialog>
                        </div>
                    </div>
                </CardHeader>
            </Card>

            {/* 세션 목록 섹션 */}
            <div className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
                    <h2 className="text-lg md:text-xl font-bold text-[#191F28]">세션 목록</h2>
                    <Dialog open={addSessionDialogOpen} onOpenChange={setAddSessionDialogOpen}>
                        <DialogTrigger asChild>
                            <Button className="w-full sm:w-auto">
                                <Plus className="mr-2 h-4 w-4" />
                                세션 추가
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="mx-4 md:mx-auto rounded-3xl">
                            <DialogHeader>
                                <DialogTitle className="text-xl font-bold text-[#191F28]">세션 추가</DialogTitle>
                            </DialogHeader>
                            <AddSessionForm onSubmit={handleAddSession} />
                        </DialogContent>
                    </Dialog>
                </div>

                <SessionList
                    sessions={sessions}
                    sessionApplicationCounts={sessionApplicationCounts}
                    onDeleteSession={handleDeleteSession}
                    onEditSession={setEditingSession}
                    onStatusChange={handleStatusChange}
                    classId={classId}
                />

                {/* 세션 수정 다이얼로그 */}
                <Dialog open={!!editingSession} onOpenChange={(open) => !open && setEditingSession(null)}>
                    <DialogContent className="mx-4 md:mx-auto rounded-3xl">
                        <DialogHeader>
                            <DialogTitle className="text-xl font-bold text-[#191F28]">세션 수정</DialogTitle>
                        </DialogHeader>
                        {editingSession && (
                            <EditSessionForm
                                session={editingSession}
                                onSubmit={handleEditSession}
                                onCancel={() => setEditingSession(null)}
                            />
                        )}
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    );
}
