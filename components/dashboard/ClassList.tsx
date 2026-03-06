import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Trash2 } from "lucide-react";
import type { OnedayClassResponse } from "@/lib/api";
import { useRouter } from "next/navigation";

interface ClassListProps {
    templates: OnedayClassResponse[];
    templateSessionCounts: Record<string, number>;
    onDelete: (e: React.MouseEvent, templateId: string) => void;
}

export function ClassList({ templates, templateSessionCounts, onDelete }: ClassListProps) {
    const router = useRouter();

    if (templates.length === 0) {
        return null; // Handle empty state in the parent or a separate EmptyState component
    }

    return (
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {templates.map((template, index) => {
                const templateId = String(template.id);
                const sessionCount = templateSessionCounts[templateId] || 0;

                return (
                    <Card
                        key={template.id}
                        className="cursor-pointer hover:shadow-lg hover:border-[#3182F6]/30 transition-all duration-200 active:scale-[0.98]"
                        onClick={() => router.push(`/dashboard/classes/${templateId}`)}
                        {...(index === 0 && { 'data-coachmark': 'class-card' })}
                    >
                        <CardHeader className="p-5 md:p-6">
                            <div className="flex justify-between items-start">
                                <CardTitle className="text-base md:text-lg">{template.name}</CardTitle>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="h-8 w-8 p-0 text-[#B0B8C1] hover:text-[#F04452] hover:bg-[#FFEBEE]"
                                    onClick={(e) => onDelete(e, templateId)}
                                >
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                            </div>
                            <CardDescription className="text-sm line-clamp-2 mt-1">{template.description}</CardDescription>
                        </CardHeader>
                        <CardContent className="p-5 md:p-6 pt-0 md:pt-0">
                            <p className="text-xs md:text-sm text-[#6B7684] mb-2 truncate">{template.location}</p>
                            <Badge variant="secondary" className="text-xs">세션 {sessionCount}개</Badge>
                        </CardContent>
                    </Card>
                );
            })}
        </div>
    );
}

