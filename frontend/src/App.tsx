import { MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import { useEffect } from 'react';
import { BasicAppShell } from './components/BasicAppShell';


function App() {

  useEffect(() => {
    console.log(import.meta.env)
  })

  return (<MantineProvider> <BasicAppShell /> </MantineProvider>)

}

export default App
