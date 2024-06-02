import { MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Navigate, RouterProvider, createHashRouter } from 'react-router-dom';
import { BasicAppShell } from './components/BasicAppShell';
import Demo from './components/Demo';
import NotFound from './components/NotFound/NotFound';
import { theme } from './theme';

/* Using HashRouter for routing to work in production!!! */
const router = createHashRouter([
  {
    element: <BasicAppShell />,
    children: [
      {
        path: '/',
        element: <Navigate to='/home' />,
      },
      {
        path: '/home',
        element: <Demo />,
      },
      {
        path: '*',
        element: <NotFound />,
      },
    ],
  },
]);

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <MantineProvider theme={theme}>
        <RouterProvider router={router} />
      </MantineProvider>
    </QueryClientProvider>
  );
}

export default App;
