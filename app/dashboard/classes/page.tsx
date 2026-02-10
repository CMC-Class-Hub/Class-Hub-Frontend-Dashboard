"use client";

import { useEffect, useState } from "react";
import { Plus, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { api, templateApi, sessionApi, type ClassTemplate, type User } from "@/lib/api";
import { ClassList } from "@/components/dashboard/ClassList";
import { CreateClassForm } from "@/components/dashboard/CreateClassForm";
import { PreviewDialog } from "@/components/dialog/PreviewDialog";
import { ClassDetailResponse } from "@/components/preview/ClassPreview";

export default function ClassesPage() {
    const [templates, setTemplates] = useState<ClassTemplate[]>([]);
    const [createDialogOpen, setCreateDialogOpen] = useState(false);
    const [previewDialogOpen, setPreviewDialogOpen] = useState(false);
    const [previewData, setPreviewData] = useState<ClassDetailResponse | null>(null);
    const [user, setUser] = useState<User | null>(null);
    const [templateSessionCounts, setTemplateSessionCounts] = useState<Record<string, number>>({});
    const [hasFormData, setHasFormData] = useState(false);
    const [showCloseConfirm, setShowCloseConfirm] = useState(false);

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
            setPreviewDialogOpen(false);
            await loadTemplates(user.id);
        } catch (error) {
            alert('클래스 생성 중 오류가 발생했습니다. 이미지가 너무 크거나 저장 공간이 부족할 수 있습니다.');
            console.error('Failed to create template:', error);
        }
    };

    const handlePreview = (data: {
        name: string;
        description: string;
        location: string;
        locationDetails: string;
        preparation: string;
        instructions: string;
        imageUrls: string[];
        parkingInfo: string;
        cancellationPolicy: string;
    }) => {
        // Track if form has any data
        const hasData = !!(
            data.name ||
            data.description ||
            data.location ||
            data.locationDetails ||
            data.preparation ||
            data.instructions ||
            data.imageUrls.length > 0 ||
            data.parkingInfo ||
            data.cancellationPolicy
        );
        setHasFormData(hasData);

        setPreviewData({
            id: 'preview',
            name: data.name,
            description: data.description,
            location: data.location,
            locationDetails: data.locationDetails,
            preparation: data.preparation,
            instructions: data.instructions,
            imageUrls: data.imageUrls,
            parkingInfo: data.parkingInfo,
            cancellationPolicy: data.cancellationPolicy,
        });
        // Note: Dialog opening is now handled in CreateClassForm button click
    };
    const handleDeleteTemplate = async (
        e: React.MouseEvent,
        templateId: string
    ) => {
        e.stopPropagation();

        if (!confirm('정말로 이 클래스를 삭제하시겠습니까? 관련된 모든 세션도 함께 삭제됩니다.')) {
            return;
        }

        try {
            await templateApi.delete(templateId);
            if (user) await loadTemplates(user.id);
        } catch (err: any) {
            alert(err.message ?? '클래스 삭제에 실패했습니다.');
        }
    };

    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    return (
        <div className="space-y-5 md:space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-xl md:text-2xl font-bold text-[#191F28]">클래스 관리</h1>
                    <p className="text-sm md:text-base text-[#8B95A1] mt-1">클래스와 세션을 관리하세요</p>
                </div>

                <Button
                    className="w-full sm:w-auto"
                    onClick={() => setCreateDialogOpen(true)}
                >
                    <Plus className="mr-2 h-5 w-5" />
                    클래스 만들기
                </Button>
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
                    onDelete={handleDeleteTemplate}
                    templateSessionCounts={templateSessionCounts}
                />
            )}

            {/* Create Class Dialog */}
            <Dialog open={createDialogOpen} onOpenChange={(open) => {
                if (!open && hasFormData) {
                    // Show confirmation dialog if form has data
                    setShowCloseConfirm(true);
                } else {
                    setCreateDialogOpen(open);
                    if (!open) {
                        setPreviewDialogOpen(false);
                        setHasFormData(false);
                    }
                }
            }}>
                <DialogTrigger asChild>
                    <button className="hidden" />
                </DialogTrigger>
                <DialogContent
                    className="max-w-2xl w-[92vw] md:w-full max-h-[90vh] overflow-hidden rounded-3xl p-0 border-none"
                    style={{
                        left: !isMobile && previewDialogOpen ? 'calc(50% - 260px)' : '50%',
                        transition: 'left 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                    }}
                    onInteractOutside={(e) => {
                        // Prevent closing when clicking on preview dialog
                        e.preventDefault();
                    }}
                >
                    <DialogHeader className="px-6 pt-6 shrink-0 bg-white">
                        <DialogTitle className="text-xl font-bold text-[#191F28]">새 클래스 만들기</DialogTitle>
                    </DialogHeader>
                    <div className="overflow-y-auto max-h-[calc(90vh-80px)] px-6 pb-6">
                        <CreateClassForm
                            onSubmit={handleCreateTemplate}
                            onCancel={() => {
                                setCreateDialogOpen(false);
                                setPreviewDialogOpen(false);
                            }}
                            onPreview={handlePreview}
                            onOpenPreview={() => setPreviewDialogOpen(true)}
                        />
                    </div>
                </DialogContent>
            </Dialog>

            {/* Preview Dialog */}
            {previewData && (
                <PreviewDialog
                    isOpen={previewDialogOpen}
                    onClose={() => setPreviewDialogOpen(false)}
                    previewData={previewData}
                />
            )}

            {/* Close Confirmation Dialog */}
            <AlertDialog open={showCloseConfirm} onOpenChange={setShowCloseConfirm}>
                <AlertDialogContent className="!max-w-[360px] z-[9999]">
                    <AlertDialogHeader>
                        <AlertDialogTitle>작성 중인 내용이 있어요</AlertDialogTitle>
                        <AlertDialogDescription>
                            지금 닫으면 입력한 내용이 사라져요. 닫으시겠어요?
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>계속 작성하기</AlertDialogCancel>
                        <AlertDialogAction
                            className="bg-[#3182F6] hover:bg-[#1B64DA]"
                            onClick={() => {
                                setCreateDialogOpen(false);
                                setPreviewDialogOpen(false);
                                setHasFormData(false);
                                setShowCloseConfirm(false);
                            }}
                        >
                            네, 닫을게요
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
}
