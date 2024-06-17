import { Chats, Conversations, Message } from '../model';
import { httpService } from './HTTPService';

interface StartChatParams {
  id: string;
  payload: Record<string, string>;
}

class ChatService {
  async getChatMessages(id: string) {
    const url = `/api/v1/chat/${id}`;
    const response = await httpService.get<Chats>(url);
    return response;
  }

  async getConversations() {
    const url = '/api/v1/chat/conversations';
    const response = await httpService.get<Conversations>(url);
    return response;
  }

  async startChat(params: StartChatParams) {
    const url = `/api/v1/chat/start/${params.id}`;
    const response = await httpService.post<Message>(url, params.payload);
    return response;
  }
}

const chatService = new ChatService();
export { ChatService, chatService };
