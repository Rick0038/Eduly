import { Chats, Conversations } from '../model';
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
}

const chatService = new ChatService();
export { ChatService, chatService };
