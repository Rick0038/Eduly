import { MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BasicAppShell } from './components/BasicAppShell';
import { theme } from './theme';

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <MantineProvider theme={theme}>
        <BasicAppShell />
      </MantineProvider>
    </QueryClientProvider>
  );
}

export default App;
