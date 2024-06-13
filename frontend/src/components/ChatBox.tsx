import {
  Text,
  Flex,
  Loader,
  Card,
  Avatar,
  Textarea,
  Button,
} from '@mantine/core';
import { useQuery } from '@tanstack/react-query';
import { getChatMessages } from '../service/getChatMessages';
import { useParams } from 'react-router';
import { Fragment, useEffect, useRef } from 'react';

interface ChatBoxProps {
  chatId?: string;
}

export function ChatBox(props?: ChatBoxProps) {
  const { chatId } = props || {};
  const { id } = useParams();
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const key = chatId ?? id!;
  const { data, isLoading, isError } = useQuery({
    queryKey: ['getChatMessages', key],
    queryFn: () => getChatMessages(key),
  });

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [data?.messages]);

  return (
    <Fragment>
      {isLoading ? (
        <Flex align='center' justify='center' pt={'sm'} className='h-full'>
          <Loader size='sm' />
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
        />
        <Button disabled={isLoading}>Send</Button>
      </div>
    </Fragment>
  );
}
