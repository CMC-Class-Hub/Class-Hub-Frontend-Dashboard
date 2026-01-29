import type { IMessageHistoryApi, Message } from '../types';
import { API_URL } from '../api-config';

export const messageHistoryApiReal: IMessageHistoryApi = {
    async getBySessionId(sessionId: string): Promise<Message[]> {
        const response = await fetch(`${API_URL}/api/messages?sessionId=${sessionId}`);
        if (!response.ok) throw new Error('Failed to fetch messages');
        const data = await response.json();
        return data.data;
    },

    async save(message: Message): Promise<void> {
        const response = await fetch(`${API_URL}/api/messages`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(message),
        });
        if (!response.ok) throw new Error('Failed to save message');
    }
};
