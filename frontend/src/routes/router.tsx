import { createBrowserRouter } from 'react-router-dom';
import { HomeLayout, HomePage, NotFound, SearchPage } from '../components';
import { Unauthorized } from '../components/Unauthorized/Unauthorized';
import { GuardedRoute } from '../components/auth/GuardedRoute';
import { Login } from '../components/auth/Login';
import { SignUp } from '../components/auth/SignUp';
import { ROLE } from '../constant';

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
        path: '/test',
        element: (
          <GuardedRoute allowedRoles={[ROLE.STUDENT]}>
            <p>I am guarded!!</p>
          </GuardedRoute>
        ),
      },
      {
        path: '/unauthorized',
        element: <Unauthorized />,
      },
      {
        path: '*',
        element: <NotFound />,
      },
    ],
  },
]);
