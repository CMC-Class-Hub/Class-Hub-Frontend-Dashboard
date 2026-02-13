import type { IInstructorApi, InstructorUpdateRequest } from '../types';
import { fetchClient } from '../fetch-client';

export const instructorApiReal: IInstructorApi = {
    async updateProfile(instructorId: string, data: InstructorUpdateRequest): Promise<void> {
        const response = await fetchClient(`/api/instructors/${instructorId}`, {
            method: 'PUT',
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || '정보 수정에 실패했습니다.');
        }
    },

    async withdraw(instructorId: string): Promise<void> {
        const response = await fetchClient(`/api/instructors/${instructorId}`, {
            method: 'DELETE',
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || '회원 탈퇴에 실패했습니다.');
        }
    },
};