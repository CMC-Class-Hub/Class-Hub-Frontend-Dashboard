import type { ClassSession, ISessionApi, CreateSessionRequest, UpdateSessionRequest } from '../types';
import { API_URL } from '../api-config';

export const sessionApiReal: ISessionApi = {
  async getByTemplateId(templateId: string): Promise<ClassSession[]> {
    const response = await fetch(`${API_URL}/api/templates/${templateId}/sessions`);
    if (!response.ok) throw new Error('Failed to fetch sessions');
    const data = await response.json();
    return data;
  },

  async getById(id: string): Promise<ClassSession | null> {
    const response = await fetch(`${API_URL}/api/sessions/${id}`);
    if (!response.ok) return null;
    const data = await response.json();
    return data;
  },

  async create(instructorId: string, data: CreateSessionRequest): Promise<ClassSession> {
    const response = await fetch(`${API_URL}/api/sessions`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...data, instructorId }),
    });
    if (!response.ok) throw new Error('Failed to create session');
    const result = await response.json();
    return result;
  },

  async update(id: string, data: UpdateSessionRequest): Promise<ClassSession> {
      console.log('Updating session with data:', data);
      const response = await fetch(`${API_URL}/api/sessions/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
    if (!response.ok) throw new Error('Failed to update session');
    const result = await response.json();
    return result;
  },
  async updateStatus(id: string, status: 'RECRUITING' | 'CLOSED' | 'FULL'): Promise<ClassSession> {
  const response = await fetch(`${API_URL}/api/sessions/${id}/status?status=${encodeURIComponent(status)}`, {
    method: 'PATCH',
  });
  if (!response.ok) throw new Error('Failed to update session status');
  return await response.json();
  },
  async delete(id: string): Promise<void> {
    const response = await fetch(`${API_URL}/api/sessions/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed to delete session');
  },
};
