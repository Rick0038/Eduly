import { Topic, Tutors } from '../model';
import { httpService } from './HTTPService';

class TutorService {
  async getTutors(query?: URLSearchParams) {
    const url = query?.toString()?.length
      ? `/tutor/search?${query}`
      : '/tutor/search';
    const response = await httpService.get<Tutors>(url);
    return response;
  }

  async getTopics() {
    const url = '/topics';
    const response = await httpService.get<Topic>(url);
    return response;
  }
}

const tutorService = new TutorService();
export { TutorService, tutorService };
