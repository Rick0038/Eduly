import { Tutors } from '../model';
import client from '../util/network';

export const getTutors = async (query?: URLSearchParams) => {
  const url = query ? `/api/v1/tutor/search?${query}` : '/api/v1/tutor/search';
  const response = await client.get<Tutors>(url);
  return response.data;
};
