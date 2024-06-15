import { Chats } from '../model';
import { httpService } from './HTTPService';

export const getChatMessages = async (id: string) => {
  const url = `/api/v1/chat/${id}`;
  const response = await httpService.get<Chats>(url);
  return response;
};
