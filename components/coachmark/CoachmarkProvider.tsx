'use client';

import React, { createContext, useState, useCallback, useEffect, useMemo } from 'react';
import { CoachmarkOverlay } from './CoachmarkOverlay';
import { getStepsForPage, type PageId, type CoachmarkAction } from './data/steps';
import { useCoachmarkStorage } from './hooks/useCoachmarkStorage';

export interface CoachmarkContextValue {
    isActive: boolean;
    isDemoMode: boolean; // 가이드 실행 중 가짜 데이터 표시 플래그
    currentStep: number;
    currentPageId: PageId | null;
    currentAction: CoachmarkAction | undefined; // 현재 스텝의 액션
    startForPage: (pageId: PageId) => void;
    next: () => void;
    prev: () => void;
    skip: () => void;
    stop: () => void;
    reset: () => void;
}

export const CoachmarkContext = createContext<CoachmarkContextValue | undefined>(undefined);

export function CoachmarkProvider({ children }: { children: React.ReactNode }) {
    const [isActive, setIsActive] = useState(false);
    const [currentStep, setCurrentStep] = useState(0);
    const [currentPageId, setCurrentPageId] = useState<PageId | null>(null);
    const [isMounted, setIsMounted] = useState(false);
    const { markGuideCompleted } = useCoachmarkStorage();

    useEffect(() => {
        setIsMounted(true);
    }, []);

    // 가이드 종료 시 완료 표시하는 헬퍼 함수
    const endGuide = useCallback(() => {
        if (currentPageId) {
            markGuideCompleted(currentPageId);
        }
        setIsActive(false);
    }, [currentPageId, markGuideCompleted]);

    const startForPage = useCallback((pageId: PageId) => {
        if (!isMounted) return;
        const steps = getStepsForPage(pageId);
        if (steps.length > 0) {
            setCurrentPageId(pageId);
            setCurrentStep(0);
            setIsActive(true);
        }
    }, [isMounted]);

    const next = useCallback(() => {
        if (!currentPageId) return;
        const pageSteps = getStepsForPage(currentPageId);
        if (currentStep < pageSteps.length - 1) {
            setCurrentStep(currentStep + 1);
        } else {
            endGuide();
        }
    }, [currentPageId, currentStep, endGuide]);

    const prev = useCallback(() => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1);
        }
    }, [currentStep]);

    const skip = useCallback(() => {
        endGuide();
    }, [endGuide]);

    const stop = useCallback(() => {
        endGuide();
    }, [endGuide]);

    const reset = useCallback(() => {
        setCurrentStep(0);
        setCurrentPageId(null);
        setIsActive(false);
    }, []);

    // 현재 스텝의 액션 계산
    const currentAction = useMemo(() => {
        if (!currentPageId || !isActive) return undefined;
        const steps = getStepsForPage(currentPageId);
        return steps[currentStep]?.action;
    }, [currentPageId, currentStep, isActive]);

    const value: CoachmarkContextValue = {
        isActive,
        isDemoMode: isActive, // 가이드 활성화 시 자동으로 데모 모드로 전환
        currentStep,
        currentPageId,
        currentAction,
        startForPage,
        next,
        prev,
        skip,
        stop,
        reset,
    };

    return (
        <CoachmarkContext.Provider value={value}>
            {children}
            {isActive && currentPageId && <CoachmarkOverlay />}
        </CoachmarkContext.Provider>
    );
}
