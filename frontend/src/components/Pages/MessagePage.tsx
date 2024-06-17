import { useNavigate, useParams } from 'react-router';
import { Text, Flex, Group, Box } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import clsx from 'clsx';
import { Conversation } from '../../model';
import { ConversationList } from '../ConversationList';
import { ChatBox } from '../ChatBox';

export function MessagePage() {
  const navigate = useNavigate();
  const { id: selectedConvoId } = useParams();
  const isSmallScreen = useMediaQuery('(max-width: 640px)'); // Tailwind's 'sm' breakpoint

  const handleSelect = (convo: Conversation) => {
    // Replace on bigger screen
    if (isSmallScreen) {
      navigate(`/messages/${convo.chatId}`);
    } else {
      navigate(`/messages/${convo.chatId}`, { replace: true });
    }
  };

  return (
    <Flex className='h-screen overflow-hidden'>
      <Box
        bg='#f1f3f5'
        className={clsx(
          'p-4 overflow-y-auto h-full sm:w-1/4',
          selectedConvoId ? 'hidden sm:block' : 'w-full'
        )}
      >
        <Group mb='md'>
          <Text size='lg' w={500}>
            Messages
          </Text>
        </Group>
        <ConversationList
          onSelect={handleSelect}
          selectedId={selectedConvoId}
        />
      </Box>
      <Box
        className={clsx(
          'flex-col overflow-y-auto h-full sm:w-3/4',
          selectedConvoId ? 'flex w-full' : 'hidden sm:flex'
        )}
      >
        {selectedConvoId ? (
          <ChatBox />
        ) : (
          <Flex justify='center' align='center' h='100%'>
            <Text c='gray'>Select a conversation to start messaging...</Text>
          </Flex>
        )}
      </Box>
    </Flex>
  );
}
