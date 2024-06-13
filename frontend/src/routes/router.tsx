import { createBrowserRouter } from 'react-router-dom';
import {
  HomeLayout,
  HomePage,
  NotFound,
  SearchPage,
  MessagePage,
  MessageLayout,
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
        path: '/search',
        element: <SearchPage />,
      },
      {
        path: '*',
        element: <NotFound />,
      },
    ],
  },
  {
    path: '/messages',
    element: <MessageLayout />,
    children: [
      {
        path: '',
        element: <MessagePage />,
      },
      {
        path: ':id',
        element: <MessagePage />,
      },
    ],
  },
]);
