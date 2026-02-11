'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
import { useCoachmark } from './hooks/useCoachmark';
import type { CoachmarkStep } from './data/steps';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

interface CoachmarkTooltipProps {
    step: CoachmarkStep;
    targetElement: HTMLElement | null;
    currentIndex: number;
    totalSteps: number;
    isVisible: boolean;
}

export function CoachmarkTooltip({
    step,
    targetElement,
    currentIndex,
    totalSteps,
    isVisible
}: CoachmarkTooltipProps) {
    const { next, prev, skip } = useCoachmark();
    const tooltipRef = useRef<HTMLDivElement>(null);
    const [position, setPosition] = useState({ top: 0, left: 0 });

    const calculatePosition = useCallback(() => {
        if (step.placement === 'center' || !targetElement) {
            // 중앙 배치
            setPosition({
                top: window.innerHeight / 2,
                left: window.innerWidth / 2,
            });
            return;
        }

        const rect = targetElement.getBoundingClientRect();
        const tooltipEl = tooltipRef.current;
        const tooltipWidth = tooltipEl?.offsetWidth || 320;
        const tooltipHeight = tooltipEl?.offsetHeight || 200;
        const gap = 16; // 대상과 툴팁 사이 간격
        const padding = 16; // 화면 가장자리 여백

        let top = 0;
        let left = 0;

        switch (step.placement) {
            case 'top':
                top = rect.top - tooltipHeight - gap;
                left = rect.left + rect.width / 2 - tooltipWidth / 2;
                break;
            case 'bottom':
                top = rect.bottom + gap;
                left = rect.left + rect.width / 2 - tooltipWidth / 2;
                break;
            case 'left':
                top = rect.top + rect.height / 2 - tooltipHeight / 2;
                left = rect.left - tooltipWidth - gap;
                break;
            case 'right':
                top = rect.top + rect.height / 2 - tooltipHeight / 2;
                left = rect.right + gap;
                break;
        }

        // 화면 밖으로 나가지 않도록 조정
        if (left < padding) left = padding;
        if (left + tooltipWidth > window.innerWidth - padding) {
            left = window.innerWidth - tooltipWidth - padding;
        }
        if (top < padding) top = padding;
        if (top + tooltipHeight > window.innerHeight - padding) {
            top = window.innerHeight - tooltipHeight - padding;
        }

        setPosition({ top, left });
    }, [step, targetElement]);

    // 초기 위치 계산 및 스크롤/리사이즈 시 업데이트
    useEffect(() => {
        calculatePosition();

        window.addEventListener('resize', calculatePosition);
        window.addEventListener('scroll', calculatePosition, true);

        return () => {
            window.removeEventListener('resize', calculatePosition);
            window.removeEventListener('scroll', calculatePosition, true);
        };
    }, [calculatePosition]);

    // 툴팁 크기가 변경되면 위치 재계산
    useEffect(() => {
        if (tooltipRef.current) {
            const observer = new ResizeObserver(calculatePosition);
            observer.observe(tooltipRef.current);
            return () => observer.disconnect();
        }
    }, [calculatePosition]);

    const isCenter = step.placement === 'center' || !targetElement;
    const hasAction = !!step.action; // 액션이 있는 단계는 애니메이션 없이

    return (
        <div
            ref={tooltipRef}
            className={`fixed z-[10000] pointer-events-auto ${
                hasAction
                    ? `transition-opacity duration-200 ${isVisible ? 'opacity-100' : 'opacity-0'}`
                    : `transition-all duration-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`
            }`}
            style={{
                top: isCenter ? '50%' : `${position.top}px`,
                left: isCenter ? '50%' : `${position.left}px`,
                transform: isCenter ? 'translate(-50%, -50%)' : 'none',
            }}
        >
            <div className={`bg-white rounded-2xl shadow-2xl p-6 max-w-sm w-80 ${hasAction ? '' : 'animate-in fade-in-0 slide-in-from-bottom-2'}`}>
                {/* 헤더 */}
                <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                        <h3 className="text-lg font-bold text-[#191F28] mb-1">
                            {step.title}
                        </h3>
                        <div className="flex items-center gap-2 text-xs text-[#8B95A1]">
                            <span>{currentIndex + 1} / {totalSteps}</span>
                            <div className="flex gap-1">
                                {Array.from({ length: totalSteps }).map((_, i) => (
                                    <div
                                        key={i}
                                        className={`w-1.5 h-1.5 rounded-full transition-colors duration-200 ${i === currentIndex ? 'bg-[#3182F6]' : 'bg-[#E5E8EB]'
                                            }`}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                    <button
                        onClick={skip}
                        className="p-1.5 hover:bg-[#F2F4F6] rounded-lg transition-colors"
                        aria-label="닫기"
                    >
                        <X className="w-4 h-4 text-[#8B95A1]" />
                    </button>
                </div>

                {/* 본문 */}
                <p className="text-sm text-[#4E5968] leading-relaxed mb-6">
                    {step.description}
                </p>

                {/* 버튼 */}
                <div className="flex items-center justify-between gap-3">
                    <button
                        onClick={prev}
                        disabled={currentIndex === 0}
                        className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-[#8B95A1] hover:text-[#191F28] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                    >
                        <ChevronLeft className="w-4 h-4" />
                        이전
                    </button>


                    <button
                        onClick={next}
                        className="flex items-center gap-1 px-4 py-2 text-sm font-semibold text-white bg-[#3182F6] hover:bg-[#1B64DA] rounded-lg transition-colors shadow-sm"
                    >
                        {currentIndex === totalSteps - 1 ? '완료' : '다음'}
                        {currentIndex < totalSteps - 1 && <ChevronRight className="w-4 h-4" />}
                    </button>
                </div>
            </div>
        </div>
    );
}
