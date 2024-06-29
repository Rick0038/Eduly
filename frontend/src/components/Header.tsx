import {
  ActionIcon,
  AppShell,
  Avatar,
  Badge,
  Burger,
  Button,
  Drawer,
  Flex,
  Group,
  Menu,
  Text,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import {
  IconBuildingCommunity,
  IconDoorEnter,
  IconLogin,
  IconLogout,
  IconMessage,
  IconPlant2,
  IconUser,
} from '@tabler/icons-react';
import { Link, useNavigate } from 'react-router-dom';
import { authService } from '../service/AuthService';
import { SearchTutor } from './SearchTutor';

interface HeaderProps {
  as?: React.ElementType;
}

const UNREAD_MESSAGE_COUNT = 0;

export function Header(props: HeaderProps) {
  const { as: Component = AppShell.Header } = props;
  const [opened, { open, close }] = useDisclosure(false);
  const navigate = useNavigate();

  return (
    <>
      <Component className='h-[48px] sm:h-[60px] border-b'>
        <Flex justify='space-between' align='center' h='100%' px='md'>
          <Flex justify='flex-start' align='center' gap={5}>
            <Group>
              <Burger
                opened={opened}
                onClick={open}
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
              <Button variant='outline' onClick={() => navigate('/forum')}>
                Forum
              </Button>

              {!authService.isLoggedIn() && (
                <>
                  <Button
                    variant='outline'
                    onClick={() => navigate('/register')}
                  >
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
                      <Avatar
                        src={authService.user?.profileImgLink}
                        alt='Profile'
                        color='#52228d'
                      />
                    </Menu.Target>
                    <Menu.Dropdown>
                      <Menu.Label>
                        <Text size='sm'>{authService.user?.name}</Text>
                        <Badge size='xs'>{authService.user?.role}</Badge>
                      </Menu.Label>
                      {!authService.isAdmin && (
                        <Menu.Item
                          onClick={() => {
                            navigate('/profile');
                          }}
                        >
                          Profile
                        </Menu.Item>
                      )}
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

      <HeaderDrawer opened={opened} open={open} close={close} />
    </>
  );
}

interface HeaderDrawerProps {
  opened: boolean;
  open: () => void;
  close: () => void;
}

function HeaderDrawer(props: HeaderDrawerProps) {
  const { opened, close } = props;
  const navigate = useNavigate();

  return (
    <Drawer opened={opened} onClose={close} title='Menu' padding='md' size='md'>
      <Group dir='column' p='sm'>
        {authService.isLoggedIn() && (
          <div className='flex flex-col items-center justify-center w-full text-center'>
            <Avatar
              src={authService.user?.profileImgLink}
              alt='Profile'
              color='#52228d'
              size='lg'
            />
            <Text className='text-center'>{authService.user?.name}</Text>
            <Badge size='xs'>{authService.user?.role}</Badge>
          </div>
        )}
        <Button
          variant='outline'
          fullWidth
          onClick={() => {
            navigate('/forum');
            close();
          }}
          leftSection={<IconBuildingCommunity />}
        >
          Forum
        </Button>
        {!authService.isLoggedIn() && (
          <>
            <Button
              variant='outline'
              fullWidth
              onClick={() => {
                navigate('/register');
                close();
              }}
              leftSection={<IconDoorEnter />}
            >
              Register
            </Button>
            <Button
              fullWidth
              onClick={() => {
                navigate('/login');
                close();
              }}
              leftSection={<IconLogin />}
            >
              Login
            </Button>
          </>
        )}
        {authService.isLoggedIn() && (
          <>
            <Button
              fullWidth
              onClick={() => {
                navigate('/messages');
                close();
              }}
              variant='outline'
              leftSection={<IconMessage />}
            >
              Messages
              {UNREAD_MESSAGE_COUNT > 0 && (
                <Badge color='red' variant='filled' size='xs' className='ml-2'>
                  {UNREAD_MESSAGE_COUNT}
                </Badge>
              )}
            </Button>
            <Button
              fullWidth
              onClick={() => {
                navigate('/profile');
                close();
              }}
              variant='outline'
              leftSection={<IconUser />}
            >
              Profile
            </Button>
            <Button
              color='red'
              fullWidth
              onClick={() => {
                authService.logout();
                navigate('/');
                close();
              }}
              leftSection={<IconLogout />}
            >
              Logout
            </Button>
          </>
        )}
      </Group>
    </Drawer>
  );
}
