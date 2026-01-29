import type { MessageTemplate, IMessageTemplateApi, MessageTemplateType } from '../types';
import { getMessageTemplates, setMessageTemplates, generateId, delay } from './storage';

// 기본 메시지 템플릿
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

export const messageTemplateApiMock: IMessageTemplateApi = {
  async getByTemplateId(templateId: string): Promise<MessageTemplate[]> {
    await delay();
    const templates = getMessageTemplates();
    return templates.filter(t => t.templateId === templateId);
  },

  async save(templateId: string, type: MessageTemplateType, content: string): Promise<MessageTemplate> {
    await delay();
    const templates = getMessageTemplates();
    const existing = templates.find(t => t.templateId === templateId && t.type === type);

    const messageTemplate: MessageTemplate = {
      id: existing?.id || generateId('msg-template'),
      templateId,
      type,
      content,
      createdAt: existing?.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    if (existing) {
      const index = templates.findIndex(t => t.id === existing.id);
      templates[index] = messageTemplate;
    } else {
      templates.push(messageTemplate);
    }

    setMessageTemplates(templates);
    return messageTemplate;
  },

  getDefault(type: MessageTemplateType): string {
    return DEFAULT_TEMPLATES[type];
  },
};
