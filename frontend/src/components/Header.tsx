import {
  ActionIcon,
  AppShell,
  Avatar,
  Badge,
  Burger,
  Button,
  Flex,
  Group,
  Menu,
  Text,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconMessage, IconPlant2 } from '@tabler/icons-react';
import { Link, useNavigate } from 'react-router-dom';
import { authService } from '../service/AuthService';
import { SearchTutor } from './SearchTutor';

interface HeaderProps {
  as?: React.ElementType;
}

const UNREAD_MESSAGE_COUNT = 3;

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

            {!authService.isLoggedIn() && (
              <>
                <Button variant='outline' onClick={() => navigate('/register')}>
                  Register
                </Button>
                <Button onClick={() => navigate('/login')}>Login</Button>
              </>
            )}

            {authService.isLoggedIn() && (
              <>
                <Group className='relative'>
                  <ActionIcon
                    onClick={() => navigate('/messages')}
                    size='lg'
                    variant='transparent'
                  >
                    <IconMessage size={24} />
                  </ActionIcon>
                  {UNREAD_MESSAGE_COUNT > 0 && (
                    <Badge
                      color='red'
                      variant='filled'
                      size='xs'
                      className='absolute -top-1 -right-1'
                    >
                      {UNREAD_MESSAGE_COUNT}
                    </Badge>
                  )}
                </Group>
                <Menu
                  width={200}
                  shadow='md'
                  openDelay={100}
                  closeDelay={200}
                  withinPortal
                >
                  <Menu.Target>
                    <Avatar src={null} alt='Profile' color='#52228d' />
                  </Menu.Target>
                  <Menu.Dropdown>
                    <Menu.Label>{authService.user?.name}</Menu.Label>
                    <Menu.Item
                      color='red'
                      onClick={() => {
                        authService.logout();
                        navigate('/');
                      }}
                    >
                      Logout
                    </Menu.Item>
                  </Menu.Dropdown>
                </Menu>
              </>
            )}
          </Group>
        </Flex>
      </Flex>
    </Component>
  );
}
