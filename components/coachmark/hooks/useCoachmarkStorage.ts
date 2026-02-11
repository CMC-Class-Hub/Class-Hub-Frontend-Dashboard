'use client';

import { useCallback } from 'react';
import type { PageId } from '../data/steps';

const STORAGE_PREFIX = 'classhub_coachmark_';

export function useCoachmarkStorage() {
    // 페이지 가이드 완료 여부 확인
    const hasCompletedGuide = useCallback((pageId: PageId): boolean => {
        if (typeof window === 'undefined') return true; // SSR에서는 완료된 것으로 처리
        return localStorage.getItem(`${STORAGE_PREFIX}completed_${pageId}`) === 'true';
    }, []);

    // 페이지 가이드 완료 표시
    const markGuideCompleted = useCallback((pageId: PageId) => {
        if (typeof window === 'undefined') return;
        localStorage.setItem(`${STORAGE_PREFIX}completed_${pageId}`, 'true');
    }, []);

    // 모든 가이드 완료 상태 초기화 (다시 보기용)
    const resetAllGuides = useCallback(() => {
        if (typeof window === 'undefined') return;
        const keysToRemove: string[] = [];
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key?.startsWith(`${STORAGE_PREFIX}completed_`)) {
                keysToRemove.push(key);
            }
        }
        keysToRemove.forEach(key => localStorage.removeItem(key));
    }, []);

    // 특정 페이지 가이드 초기화
    const resetGuide = useCallback((pageId: PageId) => {
        if (typeof window === 'undefined') return;
        localStorage.removeItem(`${STORAGE_PREFIX}completed_${pageId}`);
    }, []);

    return {
        hasCompletedGuide,
        markGuideCompleted,
        resetAllGuides,
        resetGuide,
    };
}
