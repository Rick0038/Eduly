import { MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import { BasicAppShell } from './components/BasicAppShell';
import { theme } from './theme';

function App() {
  return (
    <MantineProvider theme={theme}>
      <BasicAppShell />
    </MantineProvider>
  );
}

export default App;
