import { notFound } from "next/navigation";
import Image from "next/image";
import SaveButton from "./SaveButton";

const validSlugs = ["bjy", "lce", "mci"];

export const metadata = {
    title: "Class Hub 모바일 명함",
    description: "Class Hub 팀원의 모바일 명함입니다.",
};

interface CardPageProps {
    params: Promise<{ slug: string }>;
}

export default async function CardPage({ params }: CardPageProps) {
    const { slug } = await params;

    if (!validSlugs.includes(slug)) {
        notFound();
    }

    const imageUrl = `/cards/${slug}.png`;

    return (
        <main className="flex flex-col items-center justify-start min-h-[100dvh] bg-white text-slate-900 relative">
            {/* Full Screen Image */}
            <div className="relative w-full max-w-md h-[100dvh] mx-auto bg-slate-50/50">
                <Image
                    src={imageUrl}
                    alt={`${slug} 명함`}
                    fill
                    sizes="(max-width: 480px) 100vw, 480px"
                    className="object-contain"
                    priority
                />
            </div>

            {/* Floating Action Button */}
            <div className="fixed bottom-8 left-0 w-full px-6 flex flex-col items-center gap-3 z-10 max-w-md mx-auto right-0">
                <SaveButton slug={slug} imageUrl={imageUrl} />
                <p className="text-xs text-center text-slate-500 font-medium bg-white/80 px-3 py-1 rounded-full backdrop-blur-sm shadow-sm">
                    iPhone: 내보내기 아이콘 → '이미지 저장'
                </p>
            </div>
        </main>
    );
}
