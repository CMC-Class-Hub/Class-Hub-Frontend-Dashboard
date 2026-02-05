import type { ClassSession, ISessionApi, CreateSessionRequest, UpdateSessionRequest } from '../types';
import { getSessions, setSessions, generateId, generateLinkId, delay } from './storage';

export const sessionApiMock: ISessionApi = {
  async getByTemplateId(templateId: string): Promise<ClassSession[]> {
    await delay();
    const sessions = getSessions();
    return sessions.filter(s => s.templateId === templateId);
  },

  async getById(id: string): Promise<ClassSession | null> {
    await delay();
    const sessions = getSessions();
    return sessions.find(s => s.id === id) || null;
  },

  async create(instructorId: string, data: CreateSessionRequest): Promise<ClassSession> {
    await delay();
    const session: ClassSession = {
      id: generateId('session'),
      templateId: data.templateId,
      instructorId,
      date: data.date,
      startTime: data.startTime,
      endTime: data.endTime,
      currentNum: 0,
      capacity: data.capacity,
      price: data.price,
      status: 'RECRUITING',
      linkId: generateLinkId(),
      createdAt: new Date().toISOString(),
    };

    const sessions = getSessions();
    sessions.push(session);
    setSessions(sessions);

    return session;
  },

  async update(id: string, data: UpdateSessionRequest): Promise<ClassSession> {
    await delay();
    const sessions = getSessions();
    const index = sessions.findIndex(s => s.id === id);

    if (index === -1) {
      throw new Error('Session not found');
    }

    const updated = { ...sessions[index], ...data };
    sessions[index] = updated;
    setSessions(sessions);

    return updated;
  },

  async updateStatus(id: string, status: 'RECRUITING' | 'CLOSED' | 'FULL'): Promise<ClassSession> {
    await delay();
    const sessions = getSessions();
    const index = sessions.findIndex(s => s.id === id);

    if (index === -1) {
      throw new Error('Session not found');
    }

    const updated: ClassSession = { ...sessions[index], status };
    sessions[index] = updated;
    setSessions(sessions);

    return updated;
  },

  async delete(id: string): Promise<void> {
    await delay();
    const sessions = getSessions();
    const filtered = sessions.filter(s => s.id !== id);
    setSessions(filtered);
  },
};
