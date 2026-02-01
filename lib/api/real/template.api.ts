import type { ClassTemplate, ITemplateApi, CreateTemplateRequest, UpdateTemplateRequest } from '../types';
import { API_URL } from '../api-config';

export const templateApiReal: ITemplateApi = {
  async getAll(instructorId: string): Promise<ClassTemplate[]> {
    const response = await fetch(`${API_URL}/api/templates?instructorId=${instructorId}`);
    if (!response.ok) throw new Error('Failed to fetch templates');
    const data = await response.json();
    return data;
  },

  async getById(id: string, instructorId: string): Promise<ClassTemplate | null> {
    const response = await fetch(`${API_URL}/api/templates/${id}?instructorId=${instructorId}`);
    if (!response.ok) return null;
    const data = await response.json();
    return data;
  },

  async create(instructorId: string, data: CreateTemplateRequest): Promise<ClassTemplate> {
    const response = await fetch(`${API_URL}/api/templates?instructorId=${instructorId}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...data, instructorId }),
    });
    if (!response.ok) throw new Error('Failed to create template');
    const result = await response.json();
    return result;
  },

  async update(id: string, data: UpdateTemplateRequest): Promise<ClassTemplate> {
    const response = await fetch(`${API_URL}/api/templates/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Failed to update template');
    const result = await response.json();
    return result;
  },

  async delete(id: string): Promise<void> {
    const response = await fetch(`${API_URL}/api/templates/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed to delete template');
  },
};
