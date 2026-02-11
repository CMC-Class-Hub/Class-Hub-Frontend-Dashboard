'use client';

import { useEffect, useState } from 'react';
import { HelpCircle } from 'lucide-react';
import { useCoachmark } from './hooks/useCoachmark';
import { useCoachmarkStorage } from './hooks/useCoachmarkStorage';
import type { PageId } from './data/steps';

interface FloatingGuideButtonProps {
    pageId: PageId;
}

export function FloatingGuideButton({ pageId }: FloatingGuideButtonProps) {
    const { startForPage, isActive } = useCoachmark();
    const { hasCompletedGuide } = useCoachmarkStorage();
    const [hasAutoStarted, setHasAutoStarted] = useState(false);

    // 첫 방문 시 자동으로 가이드 시작
    useEffect(() => {
        // 이미 자동 시작했거나, 가이드가 실행 중이면 건너뛰기
        if (hasAutoStarted || isActive) return;

        // 짧은 딜레이 후 체크 (페이지 렌더링 완료 대기)
        const timer = setTimeout(() => {
            if (!hasCompletedGuide(pageId)) {
                startForPage(pageId);
                setHasAutoStarted(true);
            }
        }, 500);

        return () => clearTimeout(timer);
    }, [pageId, hasCompletedGuide, startForPage, isActive, hasAutoStarted]);

    // 가이드 실행 중에는 버튼 숨기기
    if (isActive) return null;

    return (
        <button
            onClick={() => startForPage(pageId)}
            className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-3 bg-[#3182F6] text-white rounded-full shadow-lg hover:bg-[#1B64DA] transition-all duration-200 hover:scale-105 active:scale-95"
            aria-label="가이드 보기"
        >
            <HelpCircle className="w-5 h-5" />
            <span className="font-medium text-sm">가이드 보기</span>
        </button>
    );
}
