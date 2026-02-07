import type { IMessageTemplateApi, MessageTemplateListItem } from '../types';
import { fetchClient } from '../fetch-client';

// Real API implementation
export const messageTemplateApiReal: IMessageTemplateApi = {
  async getTitles(): Promise<MessageTemplateListItem[]> {
    const response = await fetchClient('/api/messages/templates');

    if (!response.ok) {
      throw new Error('Failed to fetch template list');
    }
    return response.json();
  },

  async getDetails(title: string): Promise<any> {
    const response = await fetchClient(`/api/messages/templates/${encodeURIComponent(title)}`);

    if (!response.ok) {
      throw new Error(`Failed to fetch template details for ${title}`);
    }
    return response.json();
  }
};
