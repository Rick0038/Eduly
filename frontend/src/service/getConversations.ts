import { Conversations } from '../model';
import client from '../util/network';

export const getConversations = async () => {
  const url = '/api/v1/conversations';
  const response = await client.get<Conversations>(url);
  return response.data;
};
