import type { MessageTemplate, IMessageTemplateApi, MessageTemplateType } from '../types';
import { API_URL } from '../api-config';

// 기본 메시지 템플릿 (Real API에서도 동일하게 사용)
const DEFAULT_TEMPLATES: Record<MessageTemplateType, string> = {
  'APPLY_CONFIRMED': `[Class Hub] 신청 완료 안내

안녕하세요, {수강생명}님!
{클래스명} 수업 신청이 완료되었습니다.

▶ 일시: {날짜} {시간}
▶ 장소: {장소}

자세한 내용은 아래 링크를 이용해주세요.
{클래스 링크}

감사합니다.`,

  'D-3': `[Class Hub] 수업 3일 전 안내

안녕하세요, {수강생명}님!
신청하신 수업이 3일 후에 진행됩니다.

▶ 수업명: {클래스명}
▶ 일시: {날짜} {시간}
▶ 장소: {장소}

자세한 내용은 아래 링크를 이용해주세요.
{클래스 링크}

감사합니다.`,

  'D-1': `[Class Hub] 수업 하루 전 안내

안녕하세요, {수강생명}님!
신청하신 수업이 내일 진행됩니다.

▶ 수업명: {클래스명}
▶ 일시: {날짜} {시간}
▶ 장소: {장소}
▶ 준비물: {준비물}
▶ 주차: {주차}

자세한 내용은 아래 링크를 이용해주세요.
{클래스 링크}

감사합니다.`,
};

export const messageTemplateApiReal: IMessageTemplateApi = {
  async getTitles(): Promise<string[]> {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_URL}/api/messages/templates`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    if (!response.ok) throw new Error('Failed to fetch message templates');
    return response.json();
  },

  async getDetail(title: string): Promise<MessageTemplate> {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_URL}/api/messages/templates/${encodeURIComponent(title)}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    if (!response.ok) throw new Error('Failed to fetch message template detail');
    return response.json(); // Direct return based on spec
  },



  getDefault(type: MessageTemplateType): string {
    return DEFAULT_TEMPLATES[type];
  },
};
