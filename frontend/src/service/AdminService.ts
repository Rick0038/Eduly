import { httpService } from './HTTPService';

export interface TutorContents {
  content: TutorContent[];
}

export interface TutorContent {
  id: number;
  type: string;
  link: string;
  status: string;
  uploadTimestamp: string;
  tutorName: string;
  tutorId: number;
}

export interface StudentContents {
  content: StudentContent[];
}

export interface StudentContent {
  id: number;
  type: string;
  link: string;
  status: string;
  uploadTimestamp: string;
  studentId: number;
  studentName: string;
}

export interface BannedUsers {
  users: BannedUser[];
}

export interface BannedUser {
  id: number;
  name: string;
  status: string;
  role: string;
}

class AdminService {
  async getTutorContent() {
    const url = '/api/v1/admin/tutor-content';
    const response = await httpService.get<TutorContents>(url);
    return response;
  }

  async approveTutorContent(contentId: number) {
    const url = `api/v1/admin/content/approve/${contentId}`;
    const response = await httpService.put(url, tutorRole);
    return response;
  }

  async rejectTutorContent(contentId: number) {
    const url = `api/v1/admin/content/${contentId}?role=${tutorRole.role}`;
    const response = await httpService.delete(url);
    return response;
  }

  async banTutor(userId: number) {
    const url = `/api/v1/admin/ban/${userId}`;
    const response = await httpService.put(url, tutorRole);
    return response;
  }

  async getStudentContent() {
    const url = '/api/v1/admin/student-content';
    const response = await httpService.get<StudentContents>(url);
    return response;
  }

  async approveStudentContent(contentId: number) {
    const url = `api/v1/admin/content/approve/${contentId}`;
    const response = await httpService.put(url, studentRole);
    return response;
  }

  async rejectStudentContent(contentId: number) {
    const url = `api/v1/admin/content/${contentId}?role=${studentRole.role}`;
    const response = await httpService.delete(url);
    return response;
  }

  async banStudent(userId: number) {
    const url = `/api/v1/admin/ban/${userId}`;
    const response = await httpService.put(url, studentRole);
    return response;
  }

  async getBannedUsers() {
    const url = '/api/v1/admin/banned/users';
    const response = await httpService.get<BannedUsers>(url);
    return response;
  }

  async unbanTutor(userId: number) {
    const url = `/api/v1/admin/unban/${userId}`;
    const response = await httpService.put(url, tutorRole);
    return response;
  }
  async unbanStudent(userId: number) {
    const url = `/api/v1/admin/unban/${userId}`;
    const response = await httpService.put(url, studentRole);
    return response;
  }
}

const tutorRole = {
  role: 'TUTOR',
};

const studentRole = {
  role: 'STUDENT',
};

const adminService = new AdminService();
export { AdminService, adminService };
