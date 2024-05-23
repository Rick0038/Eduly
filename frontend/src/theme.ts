import { MantineColorsTuple, createTheme } from '@mantine/core';

const purpleScheme: MantineColorsTuple = [
  '#f6eeff',
  '#e7daf7',
  '#cab1ea',
  '#ad86dd',
  '#9562d2',
  '#854bcb',
  '#7d3ec9',
  '#6b31b2',
  '#5f2aa0',
  '#52228d'
];

export const theme = createTheme({
  colors: {
    purpleScheme,
  },
  primaryColor: 'purpleScheme'
});
