import { Avatar, Button, Flex, Group, Loader, Text } from '@mantine/core';
import { useQuery } from '@tanstack/react-query';
import { Conversation } from '../model';
import { chatService } from '../service/ChatService';

interface ConversationListProps {
  onSelect?: (conversation: Conversation) => void;
  selectedId?: string;
}

export function ConversationList(props?: ConversationListProps) {
  const { onSelect, selectedId } = props || {};
  const { data, isLoading, isError } = useQuery({
    queryKey: ['getConversations'],
    queryFn: chatService.getConversations,
  });

  if (isLoading) {
    return (
      <Flex align='center' justify='center' pt={'sm'}>
        <Loader type='bars' size='sm' />
      </Flex>
    );
  }

  if (isError) {
    return <Text c='red'>Error loading conversations!</Text>;
  }

  if (!data?.conversations?.length) {
    return <Text c='gray'>No conversations found!</Text>;
  }

  return (
    <Group className='w-full'>
      {data.conversations.map((conversation: Conversation) => {
        const isSelected =
          selectedId?.toString() === conversation.chatId?.toString();
        return (
          <Button
            key={conversation.chatId}
            fullWidth
            variant={isSelected ? 'filled' : 'subtle'}
            color={isSelected ? '#7d3ec9' : 'black'}
            justify='left'
            size='xs'
            className='p-0 border m-0'
            onClick={() => onSelect?.(conversation)}
            leftSection={
              <Avatar size='sm' color={isSelected ? 'white' : '#7d3ec9'} />
            }
          >
            <Text>{conversation.name}</Text>
          </Button>
        );
      })}
    </Group>
  );
}
