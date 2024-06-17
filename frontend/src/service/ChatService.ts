import { Chats, Conversations, Message } from '../model';
import { httpService } from './HTTPService';

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

  async sendMessage(payload: Record<string, string>) {
    const url = '/api/v1/chat/message';
    const response = await httpService.post<Message>(url, payload);
    return response;
  }
}

const chatService = new ChatService();
export { ChatService, chatService };
