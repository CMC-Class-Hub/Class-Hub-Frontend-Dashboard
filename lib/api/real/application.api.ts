import type { Application, IApplicationApi, CreateApplicationRequest, UpdateApplicationRequest } from '../types';
import { fetchClient } from '../fetch-client';

export const applicationApiReal: IApplicationApi = {
  async getAll(): Promise<Application[]> {
    const response = await fetchClient('/api/applications');
    if (!response.ok) throw new Error('Failed to fetch applications');
    const data = await response.json();
    return data;
  },

  async getBySessionId(sessionId: string): Promise<Application[]> {
    const response = await fetchClient(`/api/sessions/${sessionId}/applications`);
    if (!response.ok) throw new Error('Failed to fetch applications');
    const data = await response.json();
    console.log('API fetched applications:', data);
    return data;
  },

  async getById(id: string): Promise<Application | null> {
    const response = await fetchClient(`/api/applications/${id}`);
    if (!response.ok) return null;
    const data = await response.json();
    return data;
  },

  async create(data: CreateApplicationRequest): Promise<Application> {
    const response = await fetchClient('/api/applications', {
      method: 'POST',
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Failed to create application');
    const result = await response.json();
    return result;
  },

  async update(id: string, data: UpdateApplicationRequest): Promise<Application> {
    const response = await fetchClient(`/api/applications/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Failed to update application');
    const result = await response.json();
    return result;
  },
};
