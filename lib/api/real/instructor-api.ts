import type { IInstructorApi, InstructorUpdateRequest } from '../types';
import { API_URL } from '../api-config';

export const instructorApiReal: IInstructorApi = {
    async updateProfile(instructorId: string, data: InstructorUpdateRequest): Promise<void> {
        const token = localStorage.getItem('classhub_auth_token');

        const response = await fetch(`${API_URL}/api/instructors/${instructorId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || '정보 수정에 실패했습니다.');
        }
    },

    async withdraw(instructorId: string): Promise<void> {
        const token = localStorage.getItem('classhub_auth_token');

        const response = await fetch(`${API_URL}/api/instructors/${instructorId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || '회원 탈퇴에 실패했습니다.');
        }
    },
};