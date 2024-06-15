import { Conversations } from '../model';
import { httpService } from './HTTPService';

export const getConversations = async () => {
  const url = '/api/v1/conversations';
  const response = await httpService.get<Conversations>(url);
  return response;
};
