import type { ClassTemplate, ITemplateApi, CreateTemplateRequest, UpdateTemplateRequest } from '../types';
import { API_URL } from '../api-config';

export const templateApiReal: ITemplateApi = {
  async getAll(instructorId: string): Promise<ClassTemplate[]> {
    const response = await fetch(`${API_URL}/api/templates?instructorId=${instructorId}`);
    if (!response.ok) throw new Error('Failed to fetch templates');
    const data = await response.json();
    return data.data;
  },

  async getById(id: string): Promise<ClassTemplate | null> {
    const response = await fetch(`${API_URL}/api/templates/${id}`);
    if (!response.ok) return null;
    const data = await response.json();
    return data.data;
  },

  async create(instructorId: string, data: CreateTemplateRequest): Promise<ClassTemplate> {
    const response = await fetch(`${API_URL}/api/templates`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...data, instructorId }),
    });
    if (!response.ok) throw new Error('Failed to create template');
    const result = await response.json();
    return result.data;
  },

  async update(id: string, data: UpdateTemplateRequest): Promise<ClassTemplate> {
    const response = await fetch(`${API_URL}/api/templates/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Failed to update template');
    const result = await response.json();
    return result.data;
  },

  async delete(id: string): Promise<void> {
    const response = await fetch(`${API_URL}/api/templates/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed to delete template');
  },
};
