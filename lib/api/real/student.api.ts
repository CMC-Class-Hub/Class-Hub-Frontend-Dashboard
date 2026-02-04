import type { Student, IStudentApi, CreateStudentRequest, UpdateStudentRequest } from '../types';
import { fetchClient } from '../fetch-client';

export const studentApiReal: IStudentApi = {
  async getAll(): Promise<Student[]> {
    const response = await fetchClient('/api/students');
    if (!response.ok) throw new Error('Failed to fetch students');
    const data = await response.json();
    return data.data;  },

  async getById(id: string): Promise<Student | null> {
    const response = await fetchClient(`/api/students/${id}`);
    if (!response.ok) return null;
    const data = await response.json();
    console.log('Fetched student by ID:', data);
    return data;
  },

  async getByEmail(email: string): Promise<Student | null> {
    const response = await fetchClient(`/api/students?email=${encodeURIComponent(email)}`);
    if (!response.ok) return null;
    const data = await response.json();
  
    return Array.isArray(data) ? data[0] : (data.data ? data.data[0] : null);

  },

  async create(data: CreateStudentRequest): Promise<Student> {
    const response = await fetchClient('/api/students', {
      method: 'POST',
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Failed to create student');
    const result = await response.json();
    return result;
  },

  async update(id: string, data: UpdateStudentRequest): Promise<Student> {
    const response = await fetchClient(`/api/students/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Failed to update student');
    const result = await response.json();
    return result;
  },
};
