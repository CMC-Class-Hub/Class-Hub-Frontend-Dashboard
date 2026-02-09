import type { ClassTemplate, ITemplateApi, CreateTemplateRequest, UpdateTemplateRequest } from '../types';
import { fetchClient } from '../fetch-client';

export const templateApiReal: ITemplateApi = {
  async getAll(instructorId: string): Promise<ClassTemplate[]> {
    const response = await fetchClient(`/api/classes?instructorId=${instructorId}`);
    if (!response.ok) throw new Error('Failed to fetch templates');
    const data = await response.json();
    return data;
  },

  async getById(id: string, instructorId: string): Promise<ClassTemplate | null> {
    const response = await fetchClient(`/api/classes/${id}?instructorId=${instructorId}`);
    if (!response.ok) return null;
    const data = await response.json();
    return data;
  },

  async create(instructorId: string, data: CreateTemplateRequest): Promise<ClassTemplate> {
    const response = await fetchClient(`/api/classes?instructorId=${instructorId}`, {
      method: 'POST',
      body: JSON.stringify({ ...data, instructorId }),
    });
    if (!response.ok) throw new Error('Failed to create template');
    const result = await response.json();
    return result;
  },

  async update(id: string, data: UpdateTemplateRequest): Promise<ClassTemplate> {
    const response = await fetchClient(`/api/classes/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
    
    const result = await response.json();
    return result;
  },

  async delete(id: string): Promise<void> {
    const response = await fetchClient(`/api/classes/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      const errorBody = await response.json();
      throw new Error(errorBody.message);
    }
  },

  async updateLinkShareStatus(templateId: string, status: 'ENABLED' | 'DISABLED'): Promise<ClassTemplate> {
    const response = await fetchClient(`/api/classes/${templateId}/link-share-status`, {
      method: 'PATCH',
      body: JSON.stringify({ linkShareStatus: status })
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || '링크 공유 상태 변경에 실패했습니다.');
    }

    return response.json();
  }
};
