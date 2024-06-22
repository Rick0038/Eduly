import { Tutors } from '../model';
import { httpService } from './HTTPService';

class TutorService {
  async getTutors(query?: URLSearchParams) {
    const url = query ? `/tutor/search?${query}` : '/tutor/search';
    const response = await httpService.get<Tutors>(url);
    return response;
  }

  async getProfile() {
    const url = '/tutor';
    const response = await httpService.get<Tutors>(url);
    return response;
  }
}

const tutorService = new TutorService();
export { TutorService, tutorService };
