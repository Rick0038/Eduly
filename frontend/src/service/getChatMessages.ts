import { Chats } from '../model';
import client from '../util/network';

export const getChatMessages = async (id: string) => {
  const url = `/api/v1/chat/${id}`;
  const response = await client.get<Chats>(url);
  return response.data;
};
