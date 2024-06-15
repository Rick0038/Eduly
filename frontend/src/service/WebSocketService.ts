import { Client, StompSubscription } from '@stomp/stompjs';

export interface MessageIn {
  id: string;
  chatId: string;
  sender: string;
  content: string;
  timestamp: string;
}

export interface MessageOut {
  content: string;
}

const WSS_URL = 'ws://localhost:8080/ws';

class WebSocketService {
  private client: Client;
  private subscriptions: Map<string, StompSubscription>;

  constructor() {
    this.client = new Client({
      brokerURL: WSS_URL,
      reconnectDelay: 5000,
      debug: (str) => {
        console.log(new Date(), str);
      },
    });
    this.subscriptions = new Map<string, StompSubscription>();
  }

  connect(
    onConnectCallback?: () => void,
    onErrorCallback?: (error: string) => void
  ) {
    this.client.onConnect = (frame) => {
      console.debug('Connected: ', frame);
      onConnectCallback?.();
    };

    this.client.onStompError = (frame) => {
      const error = `Broker reported error: ${frame.headers['message']}. Additional details: ${frame.body}`;
      console.error(error);
      onErrorCallback?.(error);
    };

    this.client.activate();
  }

  subscribe(topic: string, onMessageCallback: (message: MessageIn) => void) {
    if (this.client.connected) {
      const subscription = this.client.subscribe(topic, (message) => {
        onMessageCallback(JSON.parse(message.body));
      });
      this.subscriptions.set(topic, subscription);
    } else {
      console.error('Client is not connected. Cannot subscribe to topic.');
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
    this.subscriptions.clear();
    this.client.deactivate();
  }

  sendMessage(destination: string, message: MessageOut) {
    this.client.publish({
      destination,
      body: JSON.stringify(message),
    });
  }
}

const webSocketService = new WebSocketService();
export { webSocketService, WebSocketService };
