"use client";

import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import { api, sessionApi, templateApi, applicationApi, studentApi, type ClassSession, type ClassTemplate, type Application, type Student, type Message } from "@/lib/api";
import { ApplicationList } from "@/components/dashboard/ApplicationList";

export default function SessionDetailPage({ params }: { params: Promise<{ classId: string; sessionId: string }> }) {
    const router = useRouter();
    const { classId, sessionId } = use(params);
    const [session, setSession] = useState<ClassSession | null>(null);
    const [template, setTemplate] = useState<ClassTemplate | null>(null);
    const [applications, setApplications] = useState<Application[]>([]);
    const [students, setStudents] = useState<Student[]>([]);
    const [sessionMessages, setSessionMessages] = useState<Message[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            // Since we are mocking, we fetch everything individually
            // In real API, we might get expanded session info

            // 1. Fetch Session
            // sessionApi.getById is missing in mock in previous view, let's assume getById exists or use getAll logic
            // Actually I should verify sessionApi has getById. If not, use getByTemplateId and find.
            // Based on `templateMock`, `getById` was there. Let's assume `sessionMock` has it too or we use `getByTemplateId`.

            const allSessions = await sessionApi.getByTemplateId(classId);
            const foundSession = allSessions.find(s => String(s.id) === sessionId);

            if (foundSession) {
                setSession(foundSession);

                // 2. Fetch Template
                // We can use getById if available, or fetch all.
                // Let's assume fetch all again for safety in mock
                const currentUser = await api.auth.getCurrentUser();
                if (currentUser) {
                    const templates = await templateApi.getAll(currentUser.id);
                    const foundTemplate = templates.find(t => String(t.id) === classId);
                    setTemplate(foundTemplate || null);
                }

                // 3. Fetch Applications
                const apps = await applicationApi.getBySessionId(foundSession.id);                
                setApplications(apps);
                console.log('Fetched applications:', apps);
                // 4. Fetch Students
                const studentIds = [...new Set(apps.map(a => a.studentId))];
                const studentPromises = studentIds.map(id => studentApi.getById(id));
                const studentResults = await Promise.all(studentPromises);
                setStudents(studentResults.filter((s): s is Student => s !== null));
               
                // 5. Fetch Messages
                //const msgs = await api.messageHistory.getBySessionId(foundSession.id);
                //setSessionMessages(msgs);
            } else {
                router.push(`/dashboard/classes/${classId}`);
            }
        };
        fetchData();
    }, [classId, sessionId, router]);
    if (!session || !template) {
        return <div className="p-8 text-center text-[#8B95A1]">로딩 중...</div>;
    }

    return (
        <div className="space-y-6">
            <Button variant="ghost" onClick={() => router.push(`/dashboard/classes/${classId}`)} className="px-3 text-[#6B7684] hover:text-[#191F28] -ml-2 mb-4 w-fit">
                <ArrowLeft className="mr-2 h-4 w-4" />
                세션 목록으로
            </Button>

            <Card className="hover:shadow-md">
                <CardHeader className="p-5 md:p-6">
                    <div>
                        <CardTitle className="text-lg md:text-xl">{template.name}</CardTitle>
                        <CardDescription className="mt-2 text-sm">
                            {format(new Date(session.date), 'PPP (EEE)', { locale: ko })} {session.startTime} - {session.endTime}
                        </CardDescription>
                        <div className="mt-4 text-sm text-[#4E5968]">
                            <p><span className="font-semibold text-[#191F28]">장소:</span> {template.location}</p>
                        </div>
                    </div>
                </CardHeader>
            </Card>

            <ApplicationList
                applications={applications}
                students={students}
                sessionMessages={sessionMessages}
                capacity={session.capacity}
            />
        </div>
    );
}
