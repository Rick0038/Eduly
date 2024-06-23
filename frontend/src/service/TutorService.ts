import { Topic, Tutor, Tutors } from '../model';
import { httpService } from './HTTPService';

class TutorService {
  async getTutors(query?: URLSearchParams) {
    const url = query?.toString()?.length
      ? `/tutor/search?${query}`
      : '/tutor/search';
    const response = await httpService.get<Tutors>(url);
    return response;
  }

  async getProfile() {
    const url = '/api/v1/tutor';
    const response = await httpService.get<Tutor>(url);
    return response;
  }

  async getTopics() {
    const url = '/topics';
    const response = await httpService.get<Topic>(url);
    return response;
  }

  async updateProfile(data: Record<string, unknown>) {
    const url = '/api/v1/tutor/profile';
    const response = await httpService.put<Tutor>(url, data);
    return response;
  }

  async updateProfileImage(data: FormData) {
    const url = '/api/v1/tutor/profileImage';
    const response = await httpService.put<Record<string, string>>(url, data);
    return response;
  }

  async updateCV(data: FormData) {
    const url = '/api/v1/tutor/cv';
    const response = await httpService.put<Record<string, string>>(url, data);
    return response;
  }

  async updateVideo(data: FormData) {
    const url = '/api/v1/tutor/video';
    const response = await httpService.put<Record<string, string>>(url, data);
    return response;
  }
}

const tutorService = new TutorService();
export { TutorService, tutorService };
