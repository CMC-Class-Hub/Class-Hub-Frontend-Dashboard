import type { Student, IStudentApi, CreateStudentRequest, UpdateStudentRequest } from '../types';
import { getStudents, setStudents, generateId, delay } from './storage';

export const studentApiMock: IStudentApi = {
  async getAll(): Promise<Student[]> {
    await delay();
    return getStudents();
  },

  async getById(id: string): Promise<Student | null> {
    await delay();
    const students = getStudents();
    return students.find(s => s.id === id) || null;
  },

  async getByEmail(email: string): Promise<Student | null> {
    await delay();
    const students = getStudents();
    return students.find(s => s.email === email) || null;
  },

  async create(data: CreateStudentRequest): Promise<Student> {
    await delay();
    const student: Student = {
      id: generateId('student'),
      name: data.name,
      email: data.email,
      phone: data.phone,
      applicationCount: 0,
      cancellationCount: 0,
      noResponseCount: 0,
      noShowCount: 0,
      attendedCount: 0,
      trustLevel: 'NORMAL',
      createdAt: new Date().toISOString(),
    };

    const students = getStudents();
    students.push(student);
    setStudents(students);

    return student;
  },

  async update(id: string, data: UpdateStudentRequest): Promise<Student> {
    await delay();
    const students = getStudents();
    const index = students.findIndex(s => s.id === id);

    if (index === -1) {
      throw new Error('Student not found');
    }

    const updated = { ...students[index], ...data };
    students[index] = updated;
    setStudents(students);

    return updated;
  },
};
