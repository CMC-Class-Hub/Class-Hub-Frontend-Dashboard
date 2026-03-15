# 🚀 Class Hub (클래스 허브) - Instructor Dashboard

## 📖 프로젝트 소개
**Class Hub Dashboard**는 강사가 원데이 클래스와 예약 내역을 효율적으로 관리할 수 있도록 돕는 웹 기반 관리자 페이지입니다.
수강생 관리부터 일정 생성, 출석 체크, 그리고 매출 통계까지 클래스 운영에 필요한 모든 것을 하나의 대시보드에서 직관적으로 제어할 수 있습니다.

본 프론트엔드 시스템은 빠르고 반응성 높은 사용자 경험과, 서버 의존성을 낮춘 효율적인 개발 경험에 중점을 두어 설계되었습니다.

### 📌 프로젝트 개요
- **진행 기간:** 2026.01 ~ 2026.02
- **참여 인원:** 총 3명 (기획 1명, 개발 2명)
- **담당 직무:** Frontend, Backend, Infrastructure 전반 담당

---

## ✨ 서비스 주요 기능 (Features)

### 🧑‍🏫 강사 센터 도메인
- **종합 대시보드:** 당일 클래스 일정, 누적 수익, 신규 예약 요청 건수를 한눈에 파악할 수 있는 위젯 보드
- **클래스 및 일정 관리:** 다가오는 클래스의 세션(날짜, 시간, 정원) 개설 및 수정
- **예약 내역 통합 관리:** 신청, 입금 대기, 예약 확정 등 상태별 예약건 핸들링 및 취소/환불 기능
- **수강생 출석부:** 오프라인 클래스 현장에서 직관적으로 사용할 수 있는 참석 여부 토글
- **통계 및 데이터 시각화:** 클래스별 모객 현황 및 주간/월간 매출 그래프 제공

---

## 🛠 주요 기술 스택

### Frontend
- **Framework**: Next.js 16 (App Router), React 19
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4, shadcn/ui (Radix UI)
- **State & Form**: React Hook Form, Zod (Schema Validation)
- **Data Fetching**: OpenAPI Generator 기반 Typed Fetch Client
- **Charts & Animations**: Recharts, Framer Motion

### DevOps
- **Deployment**: Vercel

---

## 💡 핵심 아키텍처 및 구현 포인트

### 1. 섬 아키텍처 (Island Architecture) 적용으로 로딩 최적화
강사 대시보드는 SEO(검색 엔진 최적화)보다는 **빠른 초기 로딩과 원활한 인터랙션**이 더 중요한 B2B 성격의 프로덕트입니다.
- **SSR + CSR 분리:** `app/layout.tsx`나 기본 뷰 페이지 같은 정적 뼈대(껍데기)는 **Server Component**로 구성하여 클라이언트로 넘어가는 자바스크립트 번들 사이즈를 대폭 줄였습니다. 반면, 폼 입력이나 모달, 그래프 같은 동적 상호작용 요소만 꼼꼼하게 분리하여 **Client Component**(`"use client"`)로 배치함으로써 성능 최적화의 정석을 따랐습니다.

### 2. 백엔드 의존성을 끊어낸 Mock API 시스템 (MSW 패턴 적용)
백엔드 API 개발 일정에 수동적으로 끌려가지 않기 위해 **독자적인 Mocking 시스템**을 내장했습니다.
- `.env.local`의 `NEXT_PUBLIC_USE_MOCK` 환경변수 플래그 하나만으로, 로컬의 `localStorage`를 활용하는 가짜(Mock) API와 실제 네트워크 통신(Real) API 사이를 자유롭게 스위칭합니다. 이 덕분에 백엔드 API가 미완성이더라도 UI/UX 개발과 기능 테스트를 병렬로 진행할 수 있었습니다.

### 3. OpenAPI 기반 자동 생성 클라이언트 통신
백엔드(Spring)와 프론트엔드 간의 DTO 타입 불일치로 인한 런타임 에러를 방지했습니다.
- 백엔드에서 제공하는 Swagger (OpenAPI 3.0) 문서를 기반으로, 프론트엔드에서 `openapi-generator-cli`를 사용해 TypeScript 타입과 Fetch 함수들을 100% 자동 생성(`lib/api/generated`)합니다. 이로써 완벽한 **Type-Safe API 통신**을 달성했습니다.



---

## 📂 디렉토리 구조 (Directory Structure)

```text
com.classhub.dashboard
 ┣ 📂 app            # Next.js App Router (페이지 및 레이아웃 라우팅)
 ┣ 📂 components     # 도메인별 분리된 응집도 높은 UI 컴포넌트
 ┃  ┣ 📂 ui          # shadcn/ui 기반의 재사용 가능한 원자 단위 컴포넌트
 ┃  ┗ 📂 coachmark   # 사용자 온보딩을 위한 인터랙티브 코치마크 로직
 ┣ 📂 lib            
 ┃  ┗ 📂 api         # 서버 통신 로직
 ┃      ┣ 📂 generated  # OpenAPI 기반 자동 생성 타입 및 Fetcher
 ┃      ┣ 📂 mock       # localStorage 기반 가상 API 구현체
 ┃      ┗ 📂 real       # 실제 백엔드 연동 구현체
 ┣ 📂 public         # 폰트, 로고(og-image), 아이콘 등 정적 에셋 라이브러리
 ┗ 📂 utils          # 날짜 포맷팅, 유효성 검증 공통 유틸 함수
```

---

<div align="center">
  <p><b>Class Hub Dashboard</b> - Making Your Classes Simple and Smart</p>
</div>
