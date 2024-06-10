import { createBrowserRouter } from 'react-router-dom';
import {
  HomeLayout,
  HomePage,
  DemoPage,
  SearchPage,
  NotFound,
} from '../components';

export const router = createBrowserRouter([
  {
    element: <HomeLayout />,
    children: [
      {
        path: '/',
        element: <HomePage />,
      },
      {
        path: '/home',
        element: <DemoPage />,
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
