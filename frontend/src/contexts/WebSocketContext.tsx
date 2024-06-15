import React, {
  createContext,
  useState,
  useEffect,
  ReactNode,
  useCallback,
} from 'react';
import { webSocketService, MessageOut } from '../service';
import { Message } from '../model';

export interface WebSocketContextProps {
  messages: Map<string, Message[]>;
  sendMessage: (destination: string, message: MessageOut) => void;
  subscribeToTopic: (topic: string) => void;
  unsubscribeFromTopic: (topic: string) => void;
  getAllMessages: () => Message[];
}

export const WebSocketContext = createContext<
  WebSocketContextProps | undefined
>(undefined);

export const WebSocketProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [messages, setMessages] = useState<Map<string, Message[]>>(new Map());

  useEffect(() => {
    const onConnect = () => {
      console.debug('Connected to WebSocket');
    };

    const onError = (error: string) => {
      console.error('WebSocket error:', error);
    };

    webSocketService.connect(onConnect, onError);

    return () => {
      webSocketService.disconnect();
    };
  }, []);

  const subscribeToTopic = useCallback((topic: string) => {
    webSocketService.subscribe(topic, (message: Message) => {
      const chatId = topic.split('/')[2];
      setMessages((prevMessages) => {
        const newMessages = new Map(prevMessages);
        if (!newMessages.has(chatId)) {
          newMessages.set(chatId, []);
        }
        newMessages.get(chatId)!.push(message);
        return newMessages;
      });
    });
  }, []);

  const unsubscribeFromTopic = useCallback((topic: string) => {
    webSocketService.unsubscribe(topic);
  }, []);

  const sendMessage = useCallback(
    (destination: string, message: MessageOut) => {
      webSocketService.sendMessage(destination, message);
    },
    []
  );

  const getAllMessages = useCallback(() => {
    const allMessages: Message[] = [];
    messages.forEach((msgs) => {
      allMessages.push(...msgs);
    });
    return allMessages;
  }, [messages]);

  return (
    <WebSocketContext.Provider
      value={{
        messages,
        sendMessage,
        subscribeToTopic,
        unsubscribeFromTopic,
        getAllMessages,
      }}
    >
      {children}
    </WebSocketContext.Provider>
  );
};
