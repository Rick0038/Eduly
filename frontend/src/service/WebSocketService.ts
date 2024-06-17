import { Client, StompSubscription } from '@stomp/stompjs';
import { APP_WS_URL } from '../constant';
import { formatDate } from '../util/helpers';
import { Message } from '../model';
import { authService } from './AuthService';

export interface MessageOut {
  chatId: number;
  senderId: number;
  content: string;
}

const WSS_URL = `${APP_WS_URL}/ws`;

class WebSocketService {
  private client: Client;
  private messages: Map<number, Message[]>;
  private subscriptions: Map<string, StompSubscription>;
  private subscriptionQueue: {
    topic: string;
    callback: (message: Message) => void;
  }[];

  constructor() {
    this.client = new Client({
      brokerURL: WSS_URL,
      reconnectDelay: 5000,
      debug: (str) => {
        const now = new Date();
        const formattedDate = formatDate(now);
        console.log(`[${formattedDate}]`, str);
      },
    });
    this.messages = new Map<number, Message[]>();
    this.subscriptions = new Map<string, StompSubscription>();
    this.subscriptionQueue = [];
  }

  private processSubscriptionQueue() {
    while (this.subscriptionQueue.length > 0) {
      const { topic, callback } = this.subscriptionQueue.shift()!;
      this.subscribe(topic, callback);
    }
  }

  private addMessage(message: Message) {
    const { chatId } = message;
    if (!this.messages.has(chatId)) {
      this.messages.set(chatId, []);
    }
    const chatMessages = this.messages.get(chatId)!;
    chatMessages.push(message);
    this.messages.set(chatId, chatMessages);
  }

  getMessages(chatId: number) {
    return this.messages.get(chatId) || [];
  }

  getAllMessages() {
    let allMessages: Message[] = [];
    this.messages.forEach((chatMessages) => {
      allMessages = allMessages.concat(chatMessages);
    });
    return allMessages;
  }

  connect(
    onConnectCallback?: () => void,
    onErrorCallback?: (error: string) => void
  ) {
    this.client.onConnect = (frame) => {
      console.debug('Connected: ', frame);
      this.processSubscriptionQueue();
      onConnectCallback?.();
    };

    this.client.onStompError = (frame) => {
      const error = `Broker reported error: ${frame.headers['message']}. Additional details: ${frame.body}`;
      console.error(error);
      onErrorCallback?.(error);
    };

    this.client.activate();
  }

  subscribe(topic: string, callback: (message: Message) => void) {
    if (this.client.connected) {
      try {
        if (this.subscriptions.has(topic)) {
          console.log(`Already subscribed to topic: ${topic}`);
          return;
        }
        const subscription = this.client.subscribe(topic, (message) => {
          const parsedMessage = JSON.parse(message.body);
          callback(parsedMessage);
          this.addMessage(parsedMessage);
        });
        this.subscriptions.set(topic, subscription);
      } catch (error) {
        console.error('Unable to subscribe', error);
      }
    } else {
      console.log(`Queueing subscription for topic: ${topic}`);
      this.subscriptionQueue.push({ topic, callback });
    }
  }

  unsubscribe(topic: string) {
    const subscription = this.subscriptions.get(topic);
    if (subscription) {
      subscription.unsubscribe();
      this.subscriptions.delete(topic);
    }
  }

  disconnect() {
    this.subscriptions.forEach((subscription) => {
      subscription.unsubscribe();
    });
    this.messages.clear();
    this.subscriptions.clear();
    this.subscriptionQueue = [];
    this.client.deactivate();
  }

  sendMessage(destination: string, payload: MessageOut) {
    const payloadWithRole = {
      ...payload,
      senderRole: authService.user?.role,
    };
    if (this.client.connected) {
      this.client.publish({
        destination,
        body: JSON.stringify(payloadWithRole),
      });
    } else {
      console.error('Unable to send message: WebSocket is not connected.');
    }
  }
}

const webSocketService = new WebSocketService();
export { webSocketService, WebSocketService };
