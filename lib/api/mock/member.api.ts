import type { MemberResponseDto } from '../generated';
import { MemberApi } from '../generated';
import { getStudents, setStudents, generateId, delay } from './storage';

export const memberApiMock = {
    async getAll(): Promise<MemberResponseDto[]> {
        await delay();
        const students = getStudents();
        return students.map(s => ({
            ...s,
            createdAt: s.createdAt ? new Date(s.createdAt) : undefined
        }));
    },

    async getById(requestParameters: { id: number }): Promise<MemberResponseDto> {
        await delay();
        const students = getStudents();
        const student = students.find(s => Number(s.id) === requestParameters.id || s.id === requestParameters.id);
        if (!student) throw new Error('Member not found');
        return {
            ...student,
            createdAt: student.createdAt ? new Date(student.createdAt) : undefined
        };
    },

    async create(requestParameters: { createMemberRequest: any }): Promise<MemberResponseDto> {
        await delay();
        const data = requestParameters.createMemberRequest;
        const newId = Date.now();
        const newStudent: MemberResponseDto = {
            id: newId,
            name: data.name,
            phone: data.phone,
            createdAt: new Date(),
        };
        const students = getStudents();
        students.push(newStudent);
        setStudents(students);

        return newStudent;
    }

} as unknown as MemberApi;
