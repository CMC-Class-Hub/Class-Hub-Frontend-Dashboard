import { ClassTemplate, ClassSession } from '@/types/template';
import { ClassStatus } from '@/types';

const STORAGE_KEYS = {
  TEMPLATES: 'ops_templates',
  SESSIONS: 'ops_sessions',
} as const;

// Templates
export const getTemplates = (): ClassTemplate[] => {
  const data = localStorage.getItem(STORAGE_KEYS.TEMPLATES);
  return data ? JSON.parse(data) : [];
};

export const saveTemplate = (template: ClassTemplate): void => {
  const templates = getTemplates();
  const index = templates.findIndex(t => t.id === template.id);
  if (index >= 0) {
    templates[index] = template;
  } else {
    templates.push(template);
  }
  localStorage.setItem(STORAGE_KEYS.TEMPLATES, JSON.stringify(templates));
};

export const getTemplateById = (id: string): ClassTemplate | null => {
  const templates = getTemplates();
  return templates.find(t => t.id === id) || null;
};

// Sessions
export const getSessions = (): ClassSession[] => {
  const data = localStorage.getItem(STORAGE_KEYS.SESSIONS);
  return data ? JSON.parse(data) : [];
};

export const saveSession = (session: ClassSession): void => {
  const sessions = getSessions();
  const index = sessions.findIndex(s => s.id === session.id);
  if (index >= 0) {
    sessions[index] = session;
  } else {
    sessions.push(session);
  }
  localStorage.setItem(STORAGE_KEYS.SESSIONS, JSON.stringify(sessions));
};

export const getSessionById = (id: string): ClassSession | null => {
  const sessions = getSessions();
  return sessions.find(s => s.id === id) || null;
};

export const getSessionByLinkId = (linkId: string): ClassSession | null => {
  const sessions = getSessions();
  return sessions.find(s => s.linkId === linkId) || null;
};

export const getSessionsByTemplateId = (templateId: string): ClassSession[] => {
  const sessions = getSessions();
  return sessions.filter(s => s.templateId === templateId);
};

export const deleteSession = (sessionId: string): void => {
  const sessions = getSessions();
  const filtered = sessions.filter(s => s.id !== sessionId);
  localStorage.setItem(STORAGE_KEYS.SESSIONS, JSON.stringify(filtered));
};
