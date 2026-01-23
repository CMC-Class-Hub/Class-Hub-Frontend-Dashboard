"use client";

import { useState, useEffect } from 'react';

/**
 * 서버 상태 표시 컴포넌트 (개발용)
 *
 * 삭제 방법:
 * 1. 이 파일 삭제: components/ServerStatus.tsx
 * 2. InstructorDashboard.tsx에서 import 및 사용 부분 삭제
 */
export function ServerStatus() {
  const [isOnline, setIsOnline] = useState<boolean | null>(null);

  useEffect(() => {
    const checkServerHealth = async () => {
      try {
        const response = await fetch('https://api.classhub.site/health', {
          method: 'GET',
          mode: 'cors',
        });
        setIsOnline(response.status === 200);
      } catch {
        setIsOnline(false);
      }
    };

    // 초기 체크
    checkServerHealth();

    // 30초마다 체크
    const interval = setInterval(checkServerHealth, 30000);

    return () => clearInterval(interval);
  }, []);

  if (isOnline === null) {
    return (
      <div className="fixed bottom-4 right-4 z-50 px-3 py-1.5 rounded-full bg-gray-100 text-gray-500 text-xs font-medium shadow-sm">
        Server: Checking...
      </div>
    );
  }

  return (
    <div
      className={`fixed bottom-4 right-4 z-50 px-3 py-1.5 rounded-full text-xs font-medium shadow-sm ${
        isOnline
          ? 'bg-green-100 text-green-700'
          : 'bg-red-100 text-red-700'
      }`}
    >
      Server: {isOnline ? 'Online' : 'Offline'}
    </div>
  );
}
