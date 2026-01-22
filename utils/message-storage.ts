import { Message, InstructorSettings } from '@/types/message';

const STORAGE_KEYS = {
  MESSAGES: 'ops_messages',
  INSTRUCTOR_SETTINGS: 'ops_instructor_settings',
} as const;

// Messages
export const getMessages = (): Message[] => {
  const data = localStorage.getItem(STORAGE_KEYS.MESSAGES);
  return data ? JSON.parse(data) : [];
};

export const saveMessage = (message: Message): void => {
  const messages = getMessages();
  const index = messages.findIndex(m => m.id === message.id);
  if (index >= 0) {
    messages[index] = message;
  } else {
    messages.push(message);
  }
  localStorage.setItem(STORAGE_KEYS.MESSAGES, JSON.stringify(messages));
};

export const getMessagesBySessionId = (sessionId: string): Message[] => {
  const messages = getMessages();
  return messages.filter(m => m.sessionId === sessionId);
};

export const getMessagesByStudentId = (studentId: string): Message[] => {
  const messages = getMessages();
  return messages.filter(m => m.studentId === studentId);
};

// Instructor Settings
export const getInstructorSettings = (instructorId: string): InstructorSettings | null => {
  const data = localStorage.getItem(STORAGE_KEYS.INSTRUCTOR_SETTINGS);
  if (!data) return null;
  
  const allSettings: InstructorSettings[] = JSON.parse(data);
  return allSettings.find(s => s.instructorId === instructorId) || null;
};

export const saveInstructorSettings = (settings: InstructorSettings): void => {
  const data = localStorage.getItem(STORAGE_KEYS.INSTRUCTOR_SETTINGS);
  const allSettings: InstructorSettings[] = data ? JSON.parse(data) : [];
  
  const index = allSettings.findIndex(s => s.instructorId === settings.instructorId);
  if (index >= 0) {
    allSettings[index] = settings;
  } else {
    allSettings.push(settings);
  }
  
  localStorage.setItem(STORAGE_KEYS.INSTRUCTOR_SETTINGS, JSON.stringify(allSettings));
};
