import { useContext } from 'react';
import {
  WebSocketContext,
  WebSocketContextProps,
} from '../contexts/WebSocketContext';

export const useWebSocket = (): WebSocketContextProps => {
  const context = useContext(WebSocketContext);
  if (!context) {
    throw new Error('useWebSocket must be used within a WebSocketProvider');
  }
  return context;
};
