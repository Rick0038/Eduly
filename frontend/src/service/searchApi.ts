import { Tutors } from '../model';
import client from '../util/network';

export const getTutors = async () => {
  const response = await client.get<Tutors>('/tutors/api/v1/search');
  return response.data;
};
