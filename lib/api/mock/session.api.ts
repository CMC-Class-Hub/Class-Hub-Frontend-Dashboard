import type { SessionResponse } from '../generated';
import { getSessions, setSessions, generateLinkId, delay } from './storage';

export const sessionApiMock = {
  async getByTemplateId(templateId: string): Promise<SessionResponse[]> {
    return [];
  },

  async getClassSessions1(requestParameters: { classId: number }): Promise<SessionResponse[]> {
    await delay();
    const sessions = getSessions();
    // Filter by classId (templateId)
    // Cast 's' to any to access templateId
    const filtered = sessions.filter(s => String((s as any).templateId) === String(requestParameters.classId));
    return filtered;
  },

  async getSession(requestParameters: { sessionId: number }): Promise<SessionResponse> {
    await delay();
    const sessions = getSessions();
    const session = sessions.find(s => s.id === requestParameters.sessionId);
    if (!session) throw new Error('Session not found');
    return session;
  },

  async createSession(requestParameters: { sessionCreateRequest: any }): Promise<SessionResponse> {
    await delay();
    const data = requestParameters.sessionCreateRequest;

    const newSession: SessionResponse = {
      id: 1,
      date: new Date('2024-03-25'),
      startTime: "14:00:00",
      endTime: "16:00:00",
      currentNum: 0,
      capacity: 8,
      price: data.price,
      status: 'RECRUITING',
    };
    // Store templateId implicitly
    (newSession as any).templateId = data.templateId;
    (newSession as any).instructorId = 999;
    (newSession as any).linkId = generateLinkId();
    (newSession as any).createdAt = new Date().toISOString();

    const sessions = getSessions();
    sessions.push(newSession);
    setSessions(sessions);

    return newSession;
  },

  async updateSession(requestParameters: { sessionId: number, sessionUpdateRequest: any }): Promise<SessionResponse> {
    await delay();
    const sessions = getSessions();
    const index = sessions.findIndex(s => s.id === requestParameters.sessionId);
    if (index === -1) throw new Error('Session not found');

    const data = requestParameters.sessionUpdateRequest;
    const updated = { ...sessions[index], ...data };

    // Ensure Date object if filtered/updated
    if (data.date) updated.date = new Date(data.date);

    sessions[index] = updated;
    setSessions(sessions);
    return updated;
  },

  async updateSessionStatus(requestParameters: { sessionId: number, status: string }): Promise<SessionResponse> {
    await delay();
    const sessions = getSessions();
    const index = sessions.findIndex(s => s.id === requestParameters.sessionId);
    if (index === -1) throw new Error('Session not found');

    const updated = { ...sessions[index], status: requestParameters.status };
    sessions[index] = updated;
    setSessions(sessions);
    return updated;
  },

  async deleteSession(requestParameters: { sessionId: number }): Promise<void> {
    await delay();
    const sessions = getSessions();
    const filtered = sessions.filter(s => s.id !== requestParameters.sessionId);
    setSessions(filtered);
  },

  async getSessionApplications(requestParameters: { sessionId: number }): Promise<any[]> {
    await delay();
    // Mock implementation for applications if needed
    // For now just return empty or use storage if I migrated Application storage.
    // Application storage uses string ID for classId?
    // session.id is now number.
    // So application.classId should be string(number).
    // Let's import getApplications from storage.
    return [];
  }

} as unknown as any; // Cast to any or SessionApi to avoid strict type checks on missing methods not used
