import type { IMessageHistoryApi, Message } from '../types';
import { fetchClient } from '../fetch-client';

export const messageHistoryApiReal: IMessageHistoryApi = {
    async getBySessionId(sessionId: string): Promise<Message[]> {
        const response = await fetchClient(`/api/messages?sessionId=${sessionId}`);
        if (!response.ok) throw new Error('Failed to fetch messages');
        const data = await response.json();
        return data.data;
    },

    async save(message: Message): Promise<void> {
        const response = await fetchClient('/api/messages', {
            method: 'POST',
            body: JSON.stringify(message),
        });
        if (!response.ok) throw new Error('Failed to save message');
    }
};
