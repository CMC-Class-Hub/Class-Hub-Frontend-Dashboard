import { ClassInfo, Application, Student, Notification } from '@/types';

const STORAGE_KEYS = {
  CLASSES: 'ops_classes',
  APPLICATIONS: 'ops_applications',
  STUDENTS: 'ops_students',
  NOTIFICATIONS: 'ops_notifications',
  CURRENT_INSTRUCTOR: 'ops_current_instructor',
} as const;

// Classes
export const getClasses = (): ClassInfo[] => {
  const data = localStorage.getItem(STORAGE_KEYS.CLASSES);
  return data ? JSON.parse(data) : [];
};

export const saveClass = (classInfo: ClassInfo): void => {
  const classes = getClasses();
  const index = classes.findIndex(c => c.id === classInfo.id);
  if (index >= 0) {
    classes[index] = classInfo;
  } else {
    classes.push(classInfo);
  }
  localStorage.setItem(STORAGE_KEYS.CLASSES, JSON.stringify(classes));
};

export const getClassById = (id: string): ClassInfo | null => {
  const classes = getClasses();
  return classes.find(c => c.id === id) || null;
};

export const getClassByLinkId = (linkId: string): ClassInfo | null => {
  const classes = getClasses();
  return classes.find(c => c.linkId === linkId) || null;
};

// Applications
export const getApplications = (): Application[] => {
  const data = localStorage.getItem(STORAGE_KEYS.APPLICATIONS);
  return data ? JSON.parse(data) : [];
};

export const saveApplication = (application: Application): void => {
  const applications = getApplications();
  const index = applications.findIndex(a => a.id === application.id);
  if (index >= 0) {
    applications[index] = application;
  } else {
    applications.push(application);
  }
  localStorage.setItem(STORAGE_KEYS.APPLICATIONS, JSON.stringify(applications));
};

export const getApplicationsByClassId = (classId: string): Application[] => {
  const applications = getApplications();
  return applications.filter(a => a.classId === classId);
};

export const getApplicationById = (id: string): Application | null => {
  const applications = getApplications();
  return applications.find(a => a.id === id) || null;
};

export const getAllApplications = (): Application[] => {
  return getApplications();
};

// Students
export const getStudents = (): Student[] => {
  const data = localStorage.getItem(STORAGE_KEYS.STUDENTS);
  return data ? JSON.parse(data) : [];
};

export const saveStudent = (student: Student): void => {
  const students = getStudents();
  const index = students.findIndex(s => s.id === student.id);
  if (index >= 0) {
    students[index] = student;
  } else {
    students.push(student);
  }
  localStorage.setItem(STORAGE_KEYS.STUDENTS, JSON.stringify(students));
};

export const getStudentById = (id: string): Student | null => {
  const students = getStudents();
  return students.find(s => s.id === id) || null;
};

export const getStudentByEmail = (email: string): Student | null => {
  const students = getStudents();
  return students.find(s => s.email === email) || null;
};

export const getAllStudents = (): Student[] => {
  return getStudents();
};

// Notifications
export const getNotifications = (): Notification[] => {
  const data = localStorage.getItem(STORAGE_KEYS.NOTIFICATIONS);
  return data ? JSON.parse(data) : [];
};

export const saveNotification = (notification: Notification): void => {
  const notifications = getNotifications();
  notifications.push(notification);
  localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(notifications));
};

export const getNotificationsByApplicationId = (applicationId: string): Notification[] => {
  const notifications = getNotifications();
  return notifications.filter(n => n.applicationId === applicationId);
};

// Instructor
export const getCurrentInstructorId = (): string => {
  let id = localStorage.getItem(STORAGE_KEYS.CURRENT_INSTRUCTOR);
  if (!id) {
    id = `instructor_${Date.now()}`;
    localStorage.setItem(STORAGE_KEYS.CURRENT_INSTRUCTOR, id);
  }
  return id;
};

// Helper functions
export const generateId = (prefix: string): string => {
  return `${prefix}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

export const generateLinkId = (): string => {
  return Math.random().toString(36).substr(2, 12);
};
