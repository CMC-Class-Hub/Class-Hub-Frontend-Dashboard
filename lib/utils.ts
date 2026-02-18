import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatTime12h(time: string) {
  if (!time) return '';
  const [h, m] = time.split(':');
  const hour = parseInt(h, 10);
  const meridiem = hour < 12 ? '오전' : '오후';
  const hour12 = hour % 12 || 12; // 0시는 12시로 표시
  return `${meridiem} ${String(hour12).padStart(2, '0')}:${m}`;
}
