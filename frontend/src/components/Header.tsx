import { AppShell, Button, Flex, Text } from '@mantine/core';
import { IconPlant2 } from '@tabler/icons-react';
import { SearchTutor } from './SearchTutor';
import { Link } from 'react-router-dom';

export function Header() {
  return (
    <AppShell.Header>
      <Flex justify='space-between' align='center' h='100%' px='md'>
        <Flex justify='flex-start' align='center' gap={5}>
          <Link to='/' className='flex items-center gap-2'>
            <IconPlant2 color='#52228d' />
            <Text size='lg' fw={700}>
              eduly
            </Text>
          </Link>
        </Flex>

        <Flex justify='flex-end' align='center' gap={10}>
          <SearchTutor />
          <Button variant='outline'>Forum</Button>
          <Button variant='outline'>Register</Button>
          <Button>Login</Button>
        </Flex>
      </Flex>
    </AppShell.Header>
  );
}
