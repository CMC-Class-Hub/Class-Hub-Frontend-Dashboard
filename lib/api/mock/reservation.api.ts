import type { ReservationResponse } from '../generated';
import { ReservationApi } from '../generated';
import { getApplications, setApplications, getStudents, setStudents, delay } from './storage';

export const reservationApiMock = {
    async getReservations(requestParameters: { sessionId: number }): Promise<ReservationResponse[]> {
        await delay();
        const applications = getApplications();
        const students = getStudents();

        // Filter by sessionId (string vs number)
        const filtered = applications.filter((a: any) => a.classId === String(requestParameters.sessionId) || a.classId === requestParameters.sessionId);

        return filtered.map(app => {
            const possibleStudentId = (app as any).studentId || app.studentId;
            const student = students.find(s => s.id === possibleStudentId);
            const resId = (app as any).reservationId || (app as any).id;

            return {
                ...app,
                reservationId: resId ? Number(resId) : undefined,
                studentId: possibleStudentId ? Number(possibleStudentId) : undefined,
                applicantName: app.applicantName || student?.name,
                phoneNumber: app.phoneNumber || student?.phone,
                appliedAt: app.appliedAt ? new Date(app.appliedAt) : undefined,
                // reservationStatus, sentD3Notification... handled by spread if present
            };
        });
    },

} as unknown as ReservationApi;
