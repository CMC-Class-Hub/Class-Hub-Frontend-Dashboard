import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatTime12h(time: string | { hour?: number; minute?: number } | undefined) {
  if (!time) return '';

  let h: number, m: number;

  if (typeof time === 'string') {
    const parts = time.split(':');
    h = parseInt(parts[0], 10);
    m = parseInt(parts[1], 10);
  } else {
    h = time.hour ?? 0;
    m = time.minute ?? 0;
  }

  const meridiem = h < 12 ? '오전' : '오후';
  const hour12 = h % 12 || 12; // 0시는 12시로 표시
  return `${meridiem} ${String(hour12).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
}

/**
 * API 에러 응답에서 메시지를 추출합니다.
 * ResponseError인 경우 body를 파싱하여 message 또는 error 필드를 반환합니다.
 */
export async function getErrorMessage(error: any, defaultMessage: string = '알 수 없는 오류가 발생했습니다.'): Promise<string> {
  if (error?.response) {
    try {
      const body = await error.response.json();
      if (body?.message) return body.message;
      if (body?.error) return body.error;
    } catch (e) {
      // JSON 파싱 실패 시 기본 메시지 혹은 주어진 defaultMessage 반환
    }
  }
  return error?.message || defaultMessage;
}

/**
 * 이메일 형식을 검증합니다.
 */
export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}
