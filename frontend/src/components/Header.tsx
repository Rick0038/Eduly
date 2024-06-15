import {
  AppShell,
  Burger,
  Button,
  Flex,
  Group,
  Menu,
  Text,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconPlant2 } from '@tabler/icons-react';
import { Link, useNavigate } from 'react-router-dom';
import { SearchTutor } from './SearchTutor';

interface HeaderProps {
  as?: React.ElementType;
}

export function Header(props: HeaderProps) {
  const { as: Component = AppShell.Header } = props;
  const [opened, { toggle }] = useDisclosure(false);
  const navigate = useNavigate();

  return (
    <Component className='h-[48px] sm:h-[60px] border-b'>
      <Flex justify='space-between' align='center' h='100%' px='md'>
        <Flex justify='flex-start' align='center' gap={5}>
          <Group>
            <Burger
              opened={opened}
              onClick={toggle}
              size='sm'
              hiddenFrom='sm'
            />
            <Link to='/' className='flex items-center gap-2'>
              <IconPlant2 color='#52228d' />
              <Text size='lg' fw={700}>
                eduly
              </Text>
            </Link>
          </Group>
        </Flex>

        <Flex justify='flex-end' align='center' gap={10}>
          <SearchTutor />
          <Group visibleFrom='sm'>
            <Button variant='outline'>Forum</Button>
            <Menu trigger='click-hover' withinPortal>
              <Menu.Target>
                <Button variant='outline' onClick={() => navigate('/register')}>
                  Register
                </Button>
              </Menu.Target>
            </Menu>
            <Button onClick={() => navigate('/login')}>Login</Button>
          </Group>
        </Flex>
      </Flex>
    </Component>
  );
}
