import { MessageTemplate } from '@/types/message-template';

const STORAGE_KEY = 'ops_message_templates';

export const getMessageTemplates = (): MessageTemplate[] => {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
};

export const saveMessageTemplate = (template: MessageTemplate): void => {
  const templates = getMessageTemplates();
  const index = templates.findIndex(t => t.id === template.id);
  if (index >= 0) {
    templates[index] = template;
  } else {
    templates.push(template);
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(templates));
};

export const getMessageTemplatesByTemplateId = (templateId: string): MessageTemplate[] => {
  const templates = getMessageTemplates();
  return templates.filter(t => t.templateId === templateId);
};

export const getDefaultMessageTemplate = (type: 'D-3' | 'D-1', _className?: string): string => {
  if (type === 'D-3') {
    return `안녕하세요!

'{클래스명}' 클래스가 3일 후에 있습니다.

일정: {날짜} {시간}
장소: {장소}

계획에 넣으셔서 여유있게 이동하시길 바랍니다.`;
  } else {
    return `내일 '{클래스명}' 클래스가 진행됩니다.

일정: {날짜} {시간}
장소: {장소}
준비물: {준비물}

취소는 불가하며, 취소 시 패널티가 부과됩니다.

필요한 정보는 아래 링크로 확인해주세요.`;
  }
};
