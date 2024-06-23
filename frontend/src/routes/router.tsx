import { createBrowserRouter } from 'react-router-dom';
import {
  HomeLayout,
  HomePage,
  MessageLayout,
  MessagePage,
  NotFound,
  SearchPage,
} from '../components';
import { Unauthorized } from '../components/Unauthorized/Unauthorized';
import { GuardedRoute } from '../components/auth/GuardedRoute';
import { Login } from '../components/auth/Login';
import { SignUp } from '../components/auth/SignUp';
import { ROLE } from '../constant';
import { ProfilePage } from '../components/Pages/ProfilePage';

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
        path: '/profile',
        element: (
          <GuardedRoute allowedRoles={[ROLE.STUDENT, ROLE.TUTOR]}>
            <ProfilePage />
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
  {
    path: '/messages',
    element: (
      <GuardedRoute allowedRoles={[ROLE.STUDENT, ROLE.TUTOR]}>
        <MessageLayout />
      </GuardedRoute>
    ),
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
