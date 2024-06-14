import { UserInfo } from '../model';

export function getUserInfoFromLocalStorage(): UserInfo | null {
  const user = localStorage.getItem('user');
  if (user) {
    return JSON.parse(user);
  }
  return null;
}

export function setUserInfoToLocalStorage(user: UserInfo | null) {
  if (user) {
    localStorage.setItem('user', JSON.stringify(user));
  }
}
