import { createBrowserRouter } from 'react-router-dom';
import { HomeLayout, HomePage, NotFound, SearchPage } from '../components';

export const router = createBrowserRouter([
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
