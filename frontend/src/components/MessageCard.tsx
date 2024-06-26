import { Avatar, Card, Flex, Text } from '@mantine/core';
import clsx from 'clsx';
import { Message } from '../model';
import { formatDate } from '../util/helpers';
import { authService } from '../service';

interface MessageCardProps {
  message: Message;
  isCurrentUser?: boolean;
}

export const MessageCard = (props: MessageCardProps) => {
  const { message, isCurrentUser = false } = props;

  return (
    <Card
      className={clsx('mb-2 w-3/4', {
        'bg-purple-100': isCurrentUser,
        'bg-gray-100': !isCurrentUser,
      })}
      shadow='sm'
    >
      <Flex align='center' mb='xs'>
        <Avatar
          size='sm'
          color={message.senderId === authService.user?.id ? 'purple' : 'blue'}
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
