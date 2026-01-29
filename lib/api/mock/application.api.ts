import type { Application, IApplicationApi, CreateApplicationRequest, UpdateApplicationRequest } from '../types';
import { getApplications, setApplications, generateId, delay } from './storage';

export const applicationApiMock: IApplicationApi = {
  async getAll(): Promise<Application[]> {
    await delay();
    return getApplications();
  },

  async getBySessionId(sessionId: string): Promise<Application[]> {
    await delay();
    const applications = getApplications();
    return applications.filter(a => a.classId === sessionId);
  },

  async getById(id: string): Promise<Application | null> {
    await delay();
    const applications = getApplications();
    return applications.find(a => a.id === id) || null;
  },

  async create(data: CreateApplicationRequest): Promise<Application> {
    await delay();
    const application: Application = {
      id: generateId('app'),
      classId: data.sessionId,
      studentId: data.studentId,
      status: 'PENDING',
      paymentStatus: 'PENDING',
      depositAmount: data.depositAmount,
      refundEligible: true,
      appliedAt: new Date().toISOString(),
    };

    const applications = getApplications();
    applications.push(application);
    setApplications(applications);

    return application;
  },

  async update(id: string, data: UpdateApplicationRequest): Promise<Application> {
    await delay();
    const applications = getApplications();
    const index = applications.findIndex(a => a.id === id);

    if (index === -1) {
      throw new Error('Application not found');
    }

    const updated = { ...applications[index], ...data };
    applications[index] = updated;
    setApplications(applications);

    return updated;
  },
};
