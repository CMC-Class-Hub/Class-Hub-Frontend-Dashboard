import type { MessageTemplate, IMessageTemplateApi, MessageTemplateType } from '../types';
import { API_URL } from '../api-config';

// 기본 메시지 템플릿 (Real API에서도 동일하게 사용)
const DEFAULT_TEMPLATES: Record<MessageTemplateType, string> = {
  'D-3': `안녕하세요!

'{클래스명}' 클래스가 3일 후에 있습니다.

일정: {날짜} {시간}
장소: {장소}

계획에 넣으셔서 여유있게 이동하시길 바랍니다.`,

  'D-1': `내일 '{클래스명}' 클래스가 진행됩니다.

일정: {날짜} {시간}
장소: {장소}
준비물: {준비물}

취소는 불가하며, 취소 시 패널티가 부과됩니다.

필요한 정보는 아래 링크로 확인해주세요.`,
};

export const messageTemplateApiReal: IMessageTemplateApi = {
  async getByTemplateId(templateId: string): Promise<MessageTemplate[]> {
    const response = await fetch(`${API_URL}/api/templates/${templateId}/message-templates`);
    if (!response.ok) throw new Error('Failed to fetch message templates');
    const data = await response.json();
    return data.data;
  },

  async save(templateId: string, type: MessageTemplateType, content: string): Promise<MessageTemplate> {
    const response = await fetch(`${API_URL}/api/message-templates`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ templateId, type, content }),
    });
    if (!response.ok) throw new Error('Failed to save message template');
    const result = await response.json();
    return result.data;
  },

  getDefault(type: MessageTemplateType): string {
    return DEFAULT_TEMPLATES[type];
  },
};
