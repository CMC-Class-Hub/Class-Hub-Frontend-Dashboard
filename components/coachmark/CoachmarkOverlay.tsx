'use client';

import { useEffect, useState } from 'react';
import { useCoachmark } from './hooks/useCoachmark';
import { CoachmarkTooltip } from './CoachmarkTooltip';
import { getStepsForPage } from './data/steps';

export function CoachmarkOverlay() {
    const { currentStep, currentPageId, isActive } = useCoachmark();
    const [targetElement, setTargetElement] = useState<HTMLElement | null>(null);
    const [targetRect, setTargetRect] = useState<DOMRect | null>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        if (!currentPageId || !isActive) {
            setIsVisible(false);
            return;
        }

        // 페이드인 효과를 위한 딜레이
        setIsVisible(false);
        const fadeInTimer = setTimeout(() => setIsVisible(true), 50);

        const steps = getStepsForPage(currentPageId);
        const step = steps[currentStep];

        if (!step) {
            return () => clearTimeout(fadeInTimer);
        }

        // 타겟이 없는 경우 (center 모달)
        if (!step.target) {
            setTargetElement(null);
            setTargetRect(null);
            return () => clearTimeout(fadeInTimer);
        }

        // 요소 찾기 및 설정
        const setupElement = (element: HTMLElement) => {
            setTargetElement(element);
            setTargetRect(element.getBoundingClientRect());
            element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        };

        // 바로 찾아보기
        const element = document.querySelector(step.target) as HTMLElement;
        if (element) {
            setupElement(element);
            return () => clearTimeout(fadeInTimer);
        }

        // 못 찾으면 MutationObserver로 DOM 변화 감지
        const observer = new MutationObserver(() => {
            const el = document.querySelector(step.target!) as HTMLElement;
            if (el) {
                setupElement(el);
                observer.disconnect();
            }
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true,
        });

        return () => {
            clearTimeout(fadeInTimer);
            observer.disconnect();
        };
    }, [currentStep, currentPageId, isActive]);

    // 스크롤/리사이즈 시 위치 업데이트
    useEffect(() => {
        if (!targetElement) return;

        const updateRect = () => {
            setTargetRect(targetElement.getBoundingClientRect());
        };

        window.addEventListener('resize', updateRect);
        window.addEventListener('scroll', updateRect, true);

        return () => {
            window.removeEventListener('resize', updateRect);
            window.removeEventListener('scroll', updateRect, true);
        };
    }, [targetElement]);

    if (!currentPageId) return null;

    const steps = getStepsForPage(currentPageId);
    const currentStepData = steps[currentStep];

    if (!currentStepData) return null;

    const padding = currentStepData.highlightPadding || 8;

    return (
        <>
            {/* 오버레이 컷아웃 + 하이라이트 */}
            {targetRect ? (
                <HighlightCutout
                    rect={targetRect}
                    padding={padding}
                    isVisible={isVisible}
                />
            ) : (
                // 타겟이 없을 때 (center 모달)는 전체 오버레이만
                <div
                    className={`fixed inset-0 bg-black/60 z-[9998] transition-opacity duration-300 pointer-events-none ${
                        isVisible ? 'opacity-100' : 'opacity-0'
                    }`}
                />
            )}

            {/* 툴팁 */}
            <CoachmarkTooltip
                step={currentStepData}
                targetElement={targetElement}
                currentIndex={currentStep}
                totalSteps={steps.length}
                isVisible={isVisible}
            />
        </>
    );
}

// 오버레이 컷아웃 컴포넌트 (대상만 원래 상태로 보이게)
function HighlightCutout({
    rect,
    padding,
    isVisible
}: {
    rect: DOMRect;
    padding: number;
    isVisible: boolean;
}) {
    return (
        <div
            className={`fixed z-[9998] rounded-xl pointer-events-none transition-opacity duration-200 ${
                isVisible ? 'opacity-100' : 'opacity-0'
            }`}
            style={{
                left: rect.left - padding,
                top: rect.top - padding,
                width: rect.width + padding * 2,
                height: rect.height + padding * 2,
                boxShadow: '0 0 0 9999px rgba(0, 0, 0, 0.6)',
            }}
        />
    );
}
