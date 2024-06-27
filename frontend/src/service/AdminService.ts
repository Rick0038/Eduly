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
}

const tutorRole = {
  role: 'TUTOR',
};

const adminService = new AdminService();
export { AdminService, adminService };
