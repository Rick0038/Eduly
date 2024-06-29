import { createBrowserRouter } from 'react-router-dom';
import {
  HomeLayout,
  HomePage,
  MessageLayout,
  MessagePage,
  NotFound,
  SearchPage,
} from '../components';
import { AdminPage } from '../components/Pages/AdminPage';
import { ForumPage } from '../components/Pages/ForumPage';
import { ProfilePage } from '../components/Pages/ProfilePage';
import { TutorDetail } from '../components/TutorDetail/TutorDetail';
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
        path: '/admin',
        element: (
          <GuardedRoute allowedRoles={[ROLE.ADMIN]}>
            <AdminPage />
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
        path: '/tutor/:tutorId',
        element: <TutorDetail />,
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
