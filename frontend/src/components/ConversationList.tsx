import { Avatar, Text, Flex, Loader, Button, Group } from '@mantine/core';
import { useQuery } from '@tanstack/react-query';
import { getConversations } from '../service/getConversations';
import { Conversation } from '../model';

interface ConversationListProps {
  onSelect?: (conversation: Conversation) => void;
  selectedId?: string;
}

export function ConversationList(props?: ConversationListProps) {
  const { onSelect, selectedId } = props || {};
  const { data, isLoading, isError } = useQuery({
    queryKey: ['getConversations'],
    queryFn: getConversations,
  });

  if (isLoading) {
    return (
      <Flex align='center' justify='center' pt={'sm'}>
        <Loader size='sm' />
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
      {data.conversations.map((conversation: Conversation) => (
        <Button
          key={conversation.id}
          fullWidth
          variant={selectedId === conversation.id ? 'filled' : 'subtle'}
          color={selectedId === conversation.id ? '#7d3ec9' : 'black'}
          justify='left'
          size='xs'
          className='p-0 border m-0'
          onClick={() => onSelect?.(conversation)}
          leftSection={
            <Avatar
              size='sm'
              color={selectedId === conversation.id ? 'white' : '#7d3ec9'}
            />
          }
        >
          <Text>{conversation.user}</Text>
        </Button>
      ))}
    </Group>
  );
}
