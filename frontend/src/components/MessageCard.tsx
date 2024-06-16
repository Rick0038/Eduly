import { Avatar, Card, Flex, Text } from '@mantine/core';
import { Message } from '../model';
import { useMemo } from 'react';
import { getUserInfoFromLocalStorage } from '../util/userInfo';
import { formatDate } from '../util/helpers';

interface MessageCardProps {
  message: Message;
}

export const MessageCard = (props: MessageCardProps) => {
  const { message } = props;
  const user = useMemo(() => getUserInfoFromLocalStorage(), [])!;

  return (
    <Card className='mb-2' shadow='sm'>
      <Flex align='center' mb='xs'>
        <Avatar
          size='sm'
          color={message.senderId === user.id ? 'green' : 'blue'}
        />
        <div className='ml-2'>
          <span className='font-bold'>{message.senderName}</span>
          <span className='text-gray-500 ml-2 text-sm'>
            {formatDate(new Date(message.timestamp), { skipSeconds: true })}
          </span>
        </div>
      </Flex>
      <Text>{message.content}</Text>
    </Card>
  );
};
