import type { ClassTemplate, ITemplateApi, CreateTemplateRequest, UpdateTemplateRequest } from '../types';
import { getTemplates, setTemplates, getSessions, setSessions, generateId, delay } from './storage';

export const templateApiMock: ITemplateApi = {
  async getAll(instructorId: string): Promise<ClassTemplate[]> {
    await delay();
    const templates = getTemplates();
    return templates.filter(t => t.instructorId === instructorId);
  },

  async getById(id: string): Promise<ClassTemplate | null> {
    await delay();
    const templates = getTemplates();
    return templates.find(t => t.id === id) || null;
  },

  async create(instructorId: string, data: CreateTemplateRequest): Promise<ClassTemplate> {
    await delay();
    const template: ClassTemplate = {
      id: generateId('template'),
      instructorId,
      name: data.name,
      description: data.description,
      location: data.location,
      locationDetails: data.locationDetails,
      preparation: data.preparation,
      instructions: data.instructions,
      notes: data.notes,
      depositAmount: data.depositAmount || 0,
      cancellationPolicy: data.cancellationPolicy || '',
      noShowPolicy: data.noShowPolicy || '',
      images: data.images || [],
      parkingInfo: data.parkingInfo || '',
      status: 'ACTIVE',
      createdAt: new Date().toISOString(),
    };

    const templates = getTemplates();
    templates.push(template);
    setTemplates(templates); // Save to storage
    return template;
  },

  async update(id: string, data: UpdateTemplateRequest): Promise<ClassTemplate> {
    await delay();
    const templates = getTemplates();
    const index = templates.findIndex(t => t.id === id);

    if (index === -1) {
      throw new Error('Template not found');
    }

    const updated = { ...templates[index], ...data };
    templates[index] = updated;
    setTemplates(templates);

    return updated;
  },

  async delete(id: string): Promise<void> {
    await delay();
    const templates = getTemplates();
    const filtered = templates.filter(t => t.id !== id);
    setTemplates(filtered);

    // 관련 세션도 삭제
    const sessions = getSessions();
    const filteredSessions = sessions.filter(s => s.templateId !== id);
    setSessions(filteredSessions);
  },
};
