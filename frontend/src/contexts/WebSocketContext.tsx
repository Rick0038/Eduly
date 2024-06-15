import React, {
  createContext,
  useState,
  useEffect,
  ReactNode,
  useCallback,
} from 'react';
import { webSocketService, MessageIn, MessageOut } from '../service';

export interface WebSocketContextProps {
  messages: MessageIn[];
  sendMessage: (destination: string, message: MessageOut) => void;
  subscribeToTopic: (topic: string) => void;
  unsubscribeFromTopic: (topic: string) => void;
}

export const WebSocketContext = createContext<
  WebSocketContextProps | undefined
>(undefined);

export const WebSocketProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [messages, setMessages] = useState<MessageIn[]>([]);

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
    webSocketService.subscribe(topic, (message: MessageIn) => {
      setMessages((prevMessages) => [...prevMessages, message]);
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

  return (
    <WebSocketContext.Provider
      value={{ messages, sendMessage, subscribeToTopic, unsubscribeFromTopic }}
    >
      {children}
    </WebSocketContext.Provider>
  );
};
