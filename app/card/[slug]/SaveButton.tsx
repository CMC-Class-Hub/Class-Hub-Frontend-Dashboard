"use client";

import { useState } from "react";
import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface SaveButtonProps {
    slug: string;
    imageUrl: string;
}

export default function SaveButton({ slug, imageUrl }: SaveButtonProps) {
    const [isLoading, setIsLoading] = useState(false);

    const handleSave = async () => {
        setIsLoading(true);

        try {
            const response = await fetch(imageUrl);
            const blob = await response.blob();
            const fileName = `ClassHub_${slug}.png`;
            const file = new File([blob], fileName, { type: blob.type });

            // iOS Safari doesn't typically auto-save images via <a download> cleanly into the Photos app 
            // without opening a new tab or prompting saving manually.
            // Instead, we use the Web Share API (navigator.share) which is the standard way on iOS 
            // to open the Share Sheet. From there, the user can easily tap "Save Image".
            if (navigator.canShare && navigator.canShare({ files: [file] })) {
                await navigator.share({
                    files: [file],
                    title: "Class Hub 모바일 명함",
                });
                toast.success("명함 공유 화면을 열었습니다.");
            } else {
                // Fallback for desktop or non-iOS browsers
                const downloadUrl = URL.createObjectURL(blob);
                const link = document.createElement("a");
                link.href = downloadUrl;
                link.download = fileName;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                URL.revokeObjectURL(downloadUrl);
                toast.success("명함 이미지를 다운로드했습니다.");
            }
        } catch (error) {
            console.error("Error sharing or downloading the image:", error);
            toast.error("명함 저장 중 오류가 발생했습니다.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Button
            onClick={handleSave}
            disabled={isLoading}
            className="w-full h-14 rounded-xl text-[17px] font-bold bg-[#3182F6] hover:bg-[#1b64da] text-white shadow-md transition-all flex items-center justify-center gap-2"
        >
            <Download className="w-5 h-5" />
            {isLoading ? "처리 중..." : "사진으로 저장"}
        </Button>
    );
}
