import { Tutors } from '../model';
import { httpService } from './HTTPService';

export const getTutors = async (query?: URLSearchParams) => {
  const url = query ? `/tutor/search?${query}` : '/tutor/search';
  const response = await httpService.get<Tutors>(url);
  return response;
};
