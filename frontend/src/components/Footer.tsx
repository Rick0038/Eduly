import { AppShell, Text } from '@mantine/core';

export function Footer() {
  return (
    <AppShell.Footer className='p-2 sm:p-3 text-center border-t'>
      <Text ta='center' c='gray' className='text-xs sm:text-base'>
        Fulda University Software Engineering Project Summer 2024. For
        demonstration purposes only. Env: <span className='text-slate-600 font-bold'>{import.meta.env.MODE}</span>
      </Text>
    </AppShell.Footer>
  );
}
