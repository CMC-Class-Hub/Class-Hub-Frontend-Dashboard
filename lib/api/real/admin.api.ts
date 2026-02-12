import type { IAdminApi, InstructorAdminResponse } from '../types';
import { fetchClient } from '../fetch-client';

export const adminApiReal: IAdminApi = {
  async getAllInstructors(): Promise<InstructorAdminResponse[]> {
    const response = await fetchClient('/api/admin/instructors', {
      method: 'GET',
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || '강사 목록을 가져오는 데 실패했습니다.');
    }

    return await response.json();
  },
};
