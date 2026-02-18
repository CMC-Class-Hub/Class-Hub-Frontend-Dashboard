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
