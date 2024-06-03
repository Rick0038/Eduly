import { AppShell, Text } from '@mantine/core';

export function Footer() {
  return (
    <AppShell.Footer p='xs' h='50'>
      <Text ta='center' c='gray'>
        Fulda University Software Engineering Project Summer 2024. For
        demonstration purposes only.
      </Text>
    </AppShell.Footer>
  );
}
