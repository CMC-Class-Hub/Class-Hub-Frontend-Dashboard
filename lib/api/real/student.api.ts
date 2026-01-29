import type { Student, IStudentApi, CreateStudentRequest, UpdateStudentRequest } from '../types';
import { API_URL } from '../api-config';

export const studentApiReal: IStudentApi = {
  async getAll(): Promise<Student[]> {
    const response = await fetch(`${API_URL}/api/students`);
    if (!response.ok) throw new Error('Failed to fetch students');
    const data = await response.json();
    return data.data;
  },

  async getById(id: string): Promise<Student | null> {
    const response = await fetch(`${API_URL}/api/students/${id}`);
    if (!response.ok) return null;
    const data = await response.json();
    return data.data;
  },

  async getByEmail(email: string): Promise<Student | null> {
    const response = await fetch(`${API_URL}/api/students?email=${encodeURIComponent(email)}`);
    if (!response.ok) return null;
    const data = await response.json();
    return data.data?.[0] || null;
  },

  async create(data: CreateStudentRequest): Promise<Student> {
    const response = await fetch(`${API_URL}/api/students`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Failed to create student');
    const result = await response.json();
    return result.data;
  },

  async update(id: string, data: UpdateStudentRequest): Promise<Student> {
    const response = await fetch(`${API_URL}/api/students/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Failed to update student');
    const result = await response.json();
    return result.data;
  },
};
