import { MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import { BasicAppShell } from './components/BasicAppShell';
import { APP_API_URL } from './constant';
import { theme } from './theme';


function App() {

  console.log(APP_API_URL)

  return (<MantineProvider theme={theme}> <BasicAppShell /> </MantineProvider>)

}

export default App
