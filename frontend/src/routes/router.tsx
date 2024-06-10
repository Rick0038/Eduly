import { createHashRouter } from 'react-router-dom';
import { HomeLayout, HomePage, SearchPage, NotFound } from '../components';

/* Using HashRouter for routing to work in production!!! */
export const router = createHashRouter([
  {
    element: <HomeLayout />,
    children: [
      {
        path: '/',
        element: <HomePage />,
      },
      {
        path: '/search',
        element: <SearchPage />,
      },
      {
        path: '*',
        element: <NotFound />,
      },
    ],
  },
]);
