import type { IMessageHistoryApi, Message } from '../types';
import { getMessages, saveMessage, delay } from './storage';

export const messageHistoryApiMock: IMessageHistoryApi = {
    async getBySessionId(sessionId: string): Promise<Message[]> {
        await delay(); // Simulate network latency
        return getMessages().filter(m => m.sessionId === sessionId);
    },

    async save(message: Message): Promise<void> {
        await delay();
        saveMessage(message);
    }
};
