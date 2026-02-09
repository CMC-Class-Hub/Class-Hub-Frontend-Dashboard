import type { Student, IStudentApi, CreateStudentRequest, UpdateStudentRequest } from '../types';
import { fetchClient } from '../fetch-client';

export const studentApiReal: IStudentApi = {
  async getAll(): Promise<Student[]> {
    const response = await fetchClient('/api/members');
    if (!response.ok) throw new Error('Failed to fetch members');
    const data = await response.json();
    return data.data;
  },

  async getById(id: string): Promise<Student | null> {
    const response = await fetchClient(`/api/members/${id}`);
    if (!response.ok) return null;
    const data = await response.json();
    return data;
  },

  async getByEmail(email: string): Promise<Student | null> {
    const response = await fetchClient(`/api/members?email=${encodeURIComponent(email)}`);
    if (!response.ok) return null;
    const data = await response.json();

    return Array.isArray(data) ? data[0] : (data.data ? data.data[0] : null);

  },

  async create(data: CreateStudentRequest): Promise<Student> {
    const response = await fetchClient('/api/members', {
      method: 'POST',
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Failed to create member');
    const result = await response.json();
    return result;
  },

  async update(id: string, data: UpdateStudentRequest): Promise<Student> {
    const response = await fetchClient(`/api/members/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Failed to update member');
    const result = await response.json();
    return result;
  },
};
