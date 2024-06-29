import { FetchLanguages, FetchTopics, Tutor, Tutors } from '../model';
import { httpService } from './HTTPService';

class TutorService {
  constructor() {
    this.addScheduleBulk = this.addScheduleBulk.bind(this);
  }

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
    const response = await httpService.get<FetchTopics>(url);
    return response;
  }

  async getLanguages() {
    const url = '/languages';
    const response = await httpService.get<FetchLanguages>(url);
    return response;
  }

  async updateProfile(data: Record<string, unknown>) {
    const url = '/api/v1/tutor/profile';
    const response = await httpService.put<Tutor>(url, data);
    return response;
  }

  async updateProfileImage(data: FormData) {
    const url = '/api/v1/tutor/profileImage';
    const response = await httpService.put<Record<string, string>>(url, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response;
  }

  async updateCV(data: FormData) {
    const url = '/api/v1/tutor/cv';
    const response = await httpService.put<Record<string, string>>(url, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response;
  }

  async updateVideo(data: FormData) {
    const url = '/api/v1/tutor/video';
    const response = await httpService.put<Record<string, string>>(url, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response;
  }

  async addSchedule(data: Record<string, string>) {
    const url = '/api/v1/tutor/schedule/session';
    const response = await httpService.post<Record<string, string>>(url, data);
    return response;
  }

  async addScheduleBulk(data: Record<string, string>[]) {
    const results = { success: 0, failure: 0 };
    for (const schedule of data) {
      try {
        await this.addSchedule(schedule);
        results.success += 1;
      } catch (err) {
        console.log('Error bulk schedule save', err);
        results.failure += 1;
      }
    }
    return results;
  }
}

const tutorService = new TutorService();
export { TutorService, tutorService };
