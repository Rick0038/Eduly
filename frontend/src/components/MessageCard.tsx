import { Avatar, Card, Flex, Text } from '@mantine/core';
import { Message } from '../model';

interface MessageCardProps {
  message: Message;
}

export const MessageCard = (props: MessageCardProps) => {
  const { message } = props;

  return (
    <Card className='mb-2' shadow='sm'>
      <Flex align='center' mb='xs'>
        <Avatar
          size='sm'
          color={message.sender.toLowerCase() === 'you' ? 'green' : 'blue'}
        />
        <div className='ml-2'>
          <span className='font-bold'>{message.sender}</span>
          <span className='text-gray-500 ml-2 text-sm'>
            {message.timestamp}
          </span>
        </div>
      </Flex>
      <Text>{message.message}</Text>
    </Card>
  );
};
