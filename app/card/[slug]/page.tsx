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
        <main className="flex flex-col items-center justify-center min-h-screen bg-white text-gray-900 px-4">
            {/* Mobile-optimized container */}
            <div className="w-full max-w-[420px] flex flex-col items-center">

                {/* Business Card Image with shadow & rounded corners */}
                <div className="relative w-full aspect-[900/500] mb-8 mt-4 rounded-2xl shadow-lg border border-gray-100 overflow-hidden bg-white">
                    <Image
                        src={imageUrl}
                        alt={`${slug} 명함`}
                        fill
                        sizes="(max-width: 420px) 100vw, 420px"
                        className="object-contain"
                        priority
                    />
                </div>

                {/* Action Button & Instructions */}
                <div className="w-full flex flex-col gap-3">
                    <SaveButton slug={slug} imageUrl={imageUrl} />
                    <p className="text-[13px] text-center text-gray-500 font-medium">
                        iPhone: 버튼 → 공유 → '이미지 저장'
                    </p>
                </div>

            </div>
        </main>
    );
}
