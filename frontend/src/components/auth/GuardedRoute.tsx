import { FC } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { ROLE } from '../../constant';
import { getUserInfoFromLocalStorage } from '../../util/userInfo';

export const GuardedRoute: FC<{
  children: React.JSX.Element;
  allowedRoles?: ROLE[];
}> = ({ children, allowedRoles = [ROLE.ADMIN, ROLE.STUDENT, ROLE.TUTOR] }) => {
  const auth = getUserInfoFromLocalStorage();
  const location = useLocation();

  // if user is logged in
  if (auth) {
    if (allowedRoles.includes(auth.role)) {
      return children;
    } else return <Navigate to='/unauthorized' replace />;
  } else {
    return <Navigate to='/login' state={{ from: location }} replace />;
  }
};
