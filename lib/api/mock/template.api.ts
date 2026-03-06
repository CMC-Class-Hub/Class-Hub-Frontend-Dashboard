import {
  OnedayClassApi,
  OnedayClassResponse,
  CreateClassRequest,
  UpdateClassRequest,
  DeleteClassRequest,
  GetClassRequest,
  UpdateLinkShareStatusRequest,
  LinkShareStatusUpdateRequestLinkShareStatusEnum
} from '../generated';
import { getTemplates, setTemplates, getSessions, setSessions, generateId, delay } from './storage';

// Storage definitions for OnedayClassResponse
// We can reuse the existing storage but map it to the new type
// or just use the new type directly if we clear storage.
// For now, let's assume we map or use as is if compatible.

// We need to implement the public methods of OnedayClassApi
// valid mocked methods: getMyClasses, createClass, getClass, updateClass, deleteClass, updateLinkShareStatus

export const templateApiMock = {
  async getMyClasses(): Promise<OnedayClassResponse[]> {
    await delay();
    // In mock, we assume generic storage returns items that can be cast/mapped to OnedayClassResponse
    // For simplicity in this refactor, we rely on the storage returning compatible objects
    // or we might need to migrate storage data.
    // Let's assume storage holds objects that define OnedayClassResponse properties.
    const templates = getTemplates() as any as OnedayClassResponse[];
    // Filter by generic instructor? The original mock filtered by instructorId arg,
    // but the generated API doesn't take instructorId for getMyClasses (it uses token).
    // We'll just return all for the mock or assume single user context.
    return templates;
  },

  async getClass(requestParameters: GetClassRequest): Promise<OnedayClassResponse> {
    await delay();
    const templates = getTemplates() as any as OnedayClassResponse[];
    const template = templates.find(t => String(t.id) === String(requestParameters.classId));
    if (!template) throw new Error('Template not found');
    return template;
  },

  async createClass(requestParameters: CreateClassRequest): Promise<OnedayClassResponse> {
    await delay();
    const req = requestParameters.onedayClassCreateRequest;

    const newTemplate: OnedayClassResponse = {
      id: Number(generateId('template')),
      instructorId: 1, // Mock generated ID
      name: req.name,
      description: req.description,
      location: req.location,
      locationDetails: req.locationDetails,
      preparation: req.preparation,
      instructions: req.instructions,
      cancellationPolicy: req.cancellationPolicy,
      parkingInfo: req.parkingInfo,
      imageUrls: req.images,
      classCode: Math.random().toString(36).substring(7).toUpperCase(),
      linkShareStatus: 'DISABLED'
    };

    const templates = getTemplates() as any[];
    templates.push(newTemplate);
    setTemplates(templates);
    return newTemplate;
  },

  async updateClass(requestParameters: UpdateClassRequest): Promise<OnedayClassResponse> {
    await delay();
    const templates = getTemplates() as any as OnedayClassResponse[];
    const index = templates.findIndex(t => String(t.id) === String(requestParameters.classId));

    if (index === -1) throw new Error('Template not found');

    const req = requestParameters.onedayClassCreateRequest;
    const current = templates[index];

    const updated: OnedayClassResponse = {
      ...current,
      name: req.name,
      description: req.description,
      location: req.location,
      locationDetails: req.locationDetails,
      preparation: req.preparation,
      instructions: req.instructions,
      cancellationPolicy: req.cancellationPolicy,
      parkingInfo: req.parkingInfo,
      imageUrls: req.images,
    };

    templates[index] = updated;
    setTemplates(templates);
    return updated;
  },

  async deleteClass(requestParameters: DeleteClassRequest): Promise<void> {
    await delay();
    let templates = getTemplates() as any as OnedayClassResponse[];
    templates = templates.filter(t => String(t.id) !== String(requestParameters.classId));
    setTemplates(templates);

    // Also clean up sessions
    // const sessions = getSessions();
    // const filteredSessions = sessions.filter(s => s.templateId !== String(requestParameters.classId));
    // setSessions(filteredSessions);
  },

  async updateLinkShareStatus(requestParameters: UpdateLinkShareStatusRequest): Promise<OnedayClassResponse> {
    await delay();
    const templates = getTemplates() as any as OnedayClassResponse[];
    const index = templates.findIndex(t => String(t.id) === String(requestParameters.classId));

    if (index === -1) throw new Error('Template not found');

    const statusEnum = requestParameters.linkShareStatusUpdateRequest.linkShareStatus;
    // Map enum to string if necessary, or keep as string. 
    // The generated model says linkShareStatus is string, but enum is available.
    // 'ENABLED' | 'DISABLED'

    const updated = {
      ...templates[index],
      linkShareStatus: statusEnum === LinkShareStatusUpdateRequestLinkShareStatusEnum.Enabled ? 'ENABLED' : 'DISABLED'
    };

    templates[index] = updated;
    setTemplates(templates);
    return updated;
  }
} as unknown as OnedayClassApi; // Cast to match stricter class interface if needed
