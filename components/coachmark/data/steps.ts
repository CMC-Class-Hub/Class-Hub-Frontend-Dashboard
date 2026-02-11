/**
 * 페이지별 코치마크 단계 정의
 * 각 페이지에서 독립적으로 실행되는 가이드
 */

export type TooltipPlacement = 'top' | 'bottom' | 'left' | 'right' | 'center';
export type PageId = 'classes' | 'class-detail' | 'applications';
export type CoachmarkAction = 'open-create-class-dialog' | 'close-create-class-dialog';

export interface CoachmarkStep {
    id: string;
    pageId: PageId;
    target: string | null; // CSS selector, null이면 center modal
    title: string;
    description: string;
    placement: TooltipPlacement;
    highlightPadding?: number;
    action?: CoachmarkAction; // 단계 시작 시 실행할 액션
}

// 전체 코치마크 단계
export const COACHMARK_STEPS: CoachmarkStep[] = [
    // 📋 클래스 관리 페이지 (/dashboard/classes) - 4단계
    {
        id: 'classes-intro',
        pageId: 'classes',
        target: null,
        title: '클래스 관리 시작하기',
        description: '클래스 생성부터 운영까지, 여기서 한 번에 관리할 수 있어요.',
        placement: 'center',
    },
    {
        id: 'create-class-btn',
        pageId: 'classes',
        target: '[data-coachmark="create-class-btn"]',
        title: '새 클래스 만들기',
        description: '클래스 정보를 입력해 새 클래스를 생성할 수 있어요.',
        placement: 'bottom',
        highlightPadding: 4,
    },
    {
        id: 'preview-btn',
        pageId: 'classes',
        target: '[data-coachmark="preview-btn"]',
        title: '클래스 신청화면 미리보기',
        description: '신청 화면 미리보기를 통해 수강생에게 보여질 화면을 먼저 확인할 수 있어요.',
        placement: 'top',
        highlightPadding: 4,
        action: 'open-create-class-dialog',
    },
    {
        id: 'class-card-click',
        pageId: 'classes',
        target: '[data-coachmark="class-card"]',
        title: '클래스 운영하기',
        description: '생성한 클래스에서 세션(회차)을 추가하고 일정 운영을 시작할 수 있어요.',
        placement: 'bottom',
        highlightPadding: 4,
        action: 'close-create-class-dialog',
    },

    // 📝 클래스 상세 페이지 (/dashboard/classes/[id]) - 6단계
    {
        id: 'detail-intro',
        pageId: 'class-detail',
        target: null,
        title: '클래스 상세 관리',
        description: '클래스 운영 정보와 세션(회차) 정보를 한 곳에서 관리할 수 있어요.',
        placement: 'center',
    },
    {
        id: 'visibility-setting',
        pageId: 'class-detail',
        target: '[data-coachmark="visibility-toggle"]',
        title: '클래스 공개/비공개 전환하기',
        description: '공개 중일 때만 수강생이 신청할 수 있어요. 필요하면 비공개로 전환해 신청을 잠시 멈출 수 있어요.',
        placement: 'left',
        highlightPadding: 8,
    },
    {
        id: 'share-link',
        pageId: 'class-detail',
        target: '[data-coachmark="copy-link-btn"]',
        title: '클래스 링크 복사하기',
        description: '클래스 링크를 복사해 인스타/카톡/네이버 등 다양한 채널에 공유하면 바로 신청을 받을 수 있어요.',
        placement: 'bottom',
        highlightPadding: 4,
    },
    {
        id: 'add-session',
        pageId: 'class-detail',
        target: '[data-coachmark="add-session-btn"]',
        title: '세션(회차) 추가하기',
        description: '날짜·시간을 등록해 세션을 만들 수 있어요. 세션별로 가격과 정원을 설정해 신청을 받을 수 있어요.',
        placement: 'bottom',
        highlightPadding: 4,
    },
    {
        id: 'session-status',
        pageId: 'class-detail',
        target: '[data-coachmark="session-status"]',
        title: '세션 별 상태 관리',
        description: '세션별 신청 상태를 확인하고 관리할 수 있어요. 정원이 차면 자동으로 마감되고, 세션이 지나면 종료돼요. 필요하면 상태를 직접 변경할 수도 있어요.',
        placement: 'left',
        highlightPadding: 8,
    },
    {
        id: 'view-applicants',
        pageId: 'class-detail',
        target: '[data-coachmark="view-applications-btn"]',
        title: '신청자 보기',
        description: '세션별 신청자 목록을 확인할 수 있어요.',
        placement: 'bottom',
        highlightPadding: 4,
    },

    // 👥 신청자 목록 페이지 (/dashboard/classes/[id]/sessions/[sessionId]) - 2단계
    {
        id: 'applications-intro',
        pageId: 'applications',
        target: '[data-coachmark="application-list"]',
        title: '신청자 관리하기',
        description: '이 세션에 신청한 신청자 목록을 확인하고, 연락처와 신청 상태를 한눈에 볼 수 있어요.',
        placement: 'top',
        highlightPadding: 8,
    },
    {
        id: 'message-status',
        pageId: 'applications',
        target: '[data-coachmark="message-status"]',
        title: '자동 알림 전송 여부 확인',
        description: '신청자별 자동 안내 메시지 전송 여부를 확인할 수 있어요.',
        placement: 'left',
        highlightPadding: 4,
    },
];

// 페이지별 단계 필터링 헬퍼
export function getStepsForPage(pageId: PageId): CoachmarkStep[] {
    return COACHMARK_STEPS.filter(step => step.pageId === pageId);
}

// 페이지별 총 단계 수
export function getTotalStepsForPage(pageId: PageId): number {
    return getStepsForPage(pageId).length;
}

export const TOTAL_STEPS = COACHMARK_STEPS.length;
