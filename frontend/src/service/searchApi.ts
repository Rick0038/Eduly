import { Tutors } from '../model';
import client from '../util/network';

export const getTutors = async (query?: URLSearchParams) => {
  const url = query ? `/tutor/search?${query}` : '/tutor/search';
  const response = await client.get<Tutors>(url);
  return response.data;
};
