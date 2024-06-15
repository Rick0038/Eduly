import {
  Fragment,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useParams } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import { Text, Flex, Loader, Textarea, Button } from '@mantine/core';
import { getChatMessages } from '../service';
import { useWebSocket } from '../hooks';
import { MessageCard } from './MessageCard';

export function ChatBox() {
  const { id } = useParams();
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const [input, setInput] = useState('');
  const { messages, sendMessage, subscribeToTopic, unsubscribeFromTopic } =
    useWebSocket();

  const key = id!;
  const { data, isLoading, isError } = useQuery({
    queryKey: ['getChatMessages', key],
    queryFn: () => getChatMessages(key),
  });

  const chatMessages = useMemo(() => messages.get(id!) || [], [id, messages]);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [data?.messages, chatMessages, scrollToBottom]);

  useEffect(() => {
    if (id) {
      subscribeToTopic(`/topic/${id}`);

      // TODO: Should we unsubscribe?
      // return () => {
      //   unsubscribeFromTopic(`/topic/${id}`);
      // };
    }
  }, [id, subscribeToTopic, unsubscribeFromTopic]);

  const handleSend = useCallback(() => {
    if (id && input) {
      const message = {
        sender: 'sender1',
        message: input,
        chatId: id,
      };
      sendMessage('/app/hello', message);
      setInput('');
    }
  }, [id, input, sendMessage]);

  return (
    <Fragment>
      {isLoading ? (
        <Flex align='center' justify='center' pt={'sm'} className='h-full'>
          <Loader type='bars' size='sm' />
        </Flex>
      ) : isError ? (
        <Flex align='center' justify='center' pt={'sm'} className='h-full'>
          <Text color='red'>Error loading conversations!</Text>
        </Flex>
      ) : !data?.messages?.length ? (
        <Flex align='center' justify='center' pt={'sm'} className='h-full'>
          <Text color='gray'>No messages found!</Text>
        </Flex>
      ) : (
        <div className='flex-1 overflow-y-auto p-4'>
          {/* REST API messages */}
          {data.messages.map((msg, index) => (
            <MessageCard key={`${msg.id}-${index}`} message={msg} />
          ))}
          {/* Socket Messages */}
          {chatMessages.map((msg, index) => (
            <MessageCard key={`${msg.id}-${index}`} message={msg} />
          ))}
          <div ref={messagesEndRef} />
        </div>
      )}
      {/* Message input */}
      <div className='p-4 border-t border-gray-200'>
        <Textarea
          placeholder='Type your message...'
          autosize
          minRows={2}
          className='mb-2'
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <Button onClick={handleSend} disabled={isLoading}>
          Send
        </Button>
      </div>
    </Fragment>
  );
}
