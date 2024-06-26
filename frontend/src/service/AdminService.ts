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
}

const adminService = new AdminService();
export { AdminService, adminService };
