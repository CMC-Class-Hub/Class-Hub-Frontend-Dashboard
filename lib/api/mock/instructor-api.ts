import type { UpdateInstructorRequest, WithdrawRequest } from '../generated';
import { delay } from './storage';

export const instructorApiMock = {
    async updateInstructor(requestParameters: UpdateInstructorRequest): Promise<void> {
        await delay(500);
        console.log('[Mock] Instructor updated:', requestParameters);
        // In a real mock, we might update localStorage user data here
        // For now, just simulate success
    },

    async withdraw(requestParameters: WithdrawRequest): Promise<void> {
        await delay(500);
        console.log('[Mock] Instructor withdrawn:', requestParameters);
    }
};
