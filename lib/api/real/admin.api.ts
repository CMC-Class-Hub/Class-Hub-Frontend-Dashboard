import type { IAdminApi, InstructorAdminResponse } from '../types';
import { API_URL } from '../api-config';

const TOKEN_KEY = 'classhub_auth_token';

export const adminApiReal: IAdminApi = {
  async getAllInstructors(): Promise<InstructorAdminResponse[]> {
    const token = localStorage.getItem(TOKEN_KEY);
    const response = await fetch(`${API_URL}/api/admin/instructors`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || '강사 목록을 가져오는 데 실패했습니다.');
    }

    return await response.json();
  },
};
