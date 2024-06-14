import { Auth } from '../components/auth/AuthContext';

export function getUserInfoFromLocalStorage(): Auth | null {
  const user = localStorage.getItem('user');
  if (user) {
    return JSON.parse(user);
  }
  return null;
}

export function setUserInfoToLocalStorage(user: Auth | null) {
  if (user) {
    localStorage.setItem('user', JSON.stringify(user));
  }
}
