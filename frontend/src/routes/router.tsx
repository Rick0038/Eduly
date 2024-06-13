import { createBrowserRouter } from 'react-router-dom';
import { HomeLayout, HomePage, NotFound, SearchPage } from '../components';
import { Login } from '../components/auth/Login';
import { SignUp } from '../components/auth/SignUp';

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
        path: '/login',
        element: <Login />,
      },
      {
        path: '/register',
        element: <SignUp />,
      },
      {
        path: '*',
        element: <NotFound />,
      },
    ],
  },
]);
