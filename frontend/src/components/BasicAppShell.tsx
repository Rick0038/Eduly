import { AppShell, Burger, Group, Skeleton, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconPlant2 } from '@tabler/icons-react';
import RouteSwitcher from './RouteSwitcher';

export function BasicAppShell() {
  const [opened, { toggle }] = useDisclosure();

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{ width: 300, breakpoint: 'sm', collapsed: { mobile: !opened } }}
      padding='md'
      footer={{ height: 60 }}
    >
      <AppShell.Header>
        <Group h='100%' px='md'>
          <Burger opened={opened} onClick={toggle} hiddenFrom='sm' size='sm' />

          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '5px',
            }}
          >
            <IconPlant2 color='#52228d' /> <h3>eduly</h3>
          </div>
        </Group>
      </AppShell.Header>
      <AppShell.Navbar p='md'>
        Navbar
        {Array(15)
          .fill(0)
          .map((_, index) => (
            <Skeleton key={index} h={28} mt='sm' animate={false} />
          ))}
      </AppShell.Navbar>
      <AppShell.Main>
        <RouteSwitcher />
      </AppShell.Main>

      <AppShell.Footer p={'md'}>
        <Text ta='center'>
          Fulda University Software Engineering Project Summer 2024. For
          demonstration purposes only.
        </Text>
      </AppShell.Footer>
    </AppShell>
  );
}
