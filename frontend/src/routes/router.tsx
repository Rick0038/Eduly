import { createBrowserRouter } from 'react-router-dom';
import {
  HomeLayout,
  HomePage,
  MessageLayout,
  MessagePage,
  NotFound,
  SearchPage,
} from '../components';
import { ForumPage } from '../components/Pages/ForumPage';
import { ProfilePage } from '../components/Pages/ProfilePage';
import { Unauthorized } from '../components/Unauthorized/Unauthorized';
import { GuardedRoute } from '../components/auth/GuardedRoute';
import { Login } from '../components/auth/Login';
import { SignUp } from '../components/auth/SignUp';
import QuestionDetails from '../components/forum/QuestionDetail';
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
        path: '/profile',
        element: (
          <GuardedRoute allowedRoles={[ROLE.STUDENT, ROLE.TUTOR]}>
            <ProfilePage />
          </GuardedRoute>
        ),
      },
      {
        path: '/forum',
        children: [
          {
            path: '',
            element: <ForumPage />,
          },
          {
            path: ':questionId',
            element: <QuestionDetails />,
          },
        ],
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
