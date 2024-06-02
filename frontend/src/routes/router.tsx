import { Navigate } from 'react-router';
import { createHashRouter } from 'react-router-dom';
import { BasicAppShell } from '../components/BasicAppShell';
import Demo from '../components/Demo';
import NotFound from '../components/NotFound/NotFound';

/* Using HashRouter for routing to work in production!!! */
export const router = createHashRouter([
  {
    element: <BasicAppShell />,
    children: [
      {
        path: '/',
        element: <Navigate replace to='/home' />,
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
