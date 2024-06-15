import { Fragment, useCallback, useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import {
  Text,
  Flex,
  Loader,
  Card,
  Avatar,
  Textarea,
  Button,
} from '@mantine/core';
import { MessageOut, getChatMessages } from '../service';
import { useWebSocket } from '../hooks';

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

  const scrollToBottom = useCallback(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [data?.messages, messages, scrollToBottom]);

  useEffect(() => {
    if (id) {
      subscribeToTopic(`/topic/conversations/${id}`);
    }

    return () => {
      if (id) {
        unsubscribeFromTopic(`/topic/conversations/${id}`);
      }
    };
  }, [id, subscribeToTopic, unsubscribeFromTopic]);

  const handleSend = useCallback(() => {
    if (id && input) {
      const message: MessageOut = { content: input };
      sendMessage(`/app/conversations/${id}`, message);
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
            <Card key={`${msg.id}-${index}`} className='mb-2' shadow='sm'>
              <Flex align='center' mb='xs'>
                <Avatar
                  size='sm'
                  color={msg.sender === 'You' ? 'green' : 'blue'}
                />
                <div className='ml-2'>
                  <span className='font-bold'>{msg.sender}</span>
                  <span className='text-gray-500 ml-2 text-sm'>
                    {msg.timestamp}
                  </span>
                </div>
              </Flex>
              <Text>{msg.content}</Text>
            </Card>
          ))}
          {/* Socket Messages */}
          {messages
            .filter((msg) => msg.chatId === id)
            .map((msg, index) => (
              <Card
                key={`realtime-${msg.id}-${index}`}
                className='mb-2'
                shadow='sm'
              >
                <Flex align='center' mb='xs'>
                  <Avatar
                    size='sm'
                    color={msg.sender === 'You' ? 'green' : 'blue'}
                  />
                  <div className='ml-2'>
                    <span className='font-bold'>{msg.sender}</span>
                    <span className='text-gray-500 ml-2 text-sm'>
                      {msg.timestamp}
                    </span>
                  </div>
                </Flex>
                <Text>{msg.content}</Text>
              </Card>
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
