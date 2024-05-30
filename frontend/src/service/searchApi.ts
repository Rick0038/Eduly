import { Tutors } from '../model';
import edulyApiClient from '../util/network';

export const getTutors = async () => {
  const response = await edulyApiClient.get<Tutors>('/tutors/api/v1/search');
  return response.data;
};
