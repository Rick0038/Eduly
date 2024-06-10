import { Text } from '@mantine/core';

export function Footer() {
  return (
    <footer className='p-2 sm:p-3 text-center border-t'>
      <Text ta='center' c='gray' className='text-xs sm:text-base'>
        Fulda University Software Engineering Project Summer 2024. For
        demonstration purposes only.
      </Text>
    </footer>
  );
}
