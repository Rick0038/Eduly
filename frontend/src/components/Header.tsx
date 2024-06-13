import {
  AppShell,
  Burger,
  Button,
  Flex,
  Group,
  Menu,
  Text,
} from '@mantine/core';
import { IconChevronDown, IconPlant2 } from '@tabler/icons-react';
import { SearchTutor } from './SearchTutor';
import { Link } from 'react-router-dom';
import { useDisclosure } from '@mantine/hooks';

interface HeaderProps {
  as?: React.ElementType;
}

export function Header(props: HeaderProps) {
  const { as: Component = AppShell.Header } = props;
  const [opened, { toggle }] = useDisclosure(false);

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
                <Button
                  variant='outline'
                  onClick={(event) => event.preventDefault()}
                  rightSection={<IconChevronDown size='0.9rem' stroke={1.5} />}
                >
                  Register
                </Button>
              </Menu.Target>
              <Menu.Dropdown>
                <Menu.Item>As a student</Menu.Item>
                <Menu.Item>As a tutor</Menu.Item>
              </Menu.Dropdown>
            </Menu>
            <Button>Login</Button>
          </Group>
        </Flex>
      </Flex>
    </Component>
  );
}
