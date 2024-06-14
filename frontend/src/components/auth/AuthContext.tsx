// AuthContext.tsx
import { ReactNode, createContext, useState } from 'react';
import { ROLE } from '../../constant';
import {
  getUserInfoFromLocalStorage,
  setUserInfoToLocalStorage,
} from '../../util/userInfo';

export interface Auth {
  id: number;
  name: string;
  token: string;
  role: ROLE;
  profileImgLink: string;
}

export interface AuthContextType {
  auth: Auth | null;
  setAuth: (auth: Auth) => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [auth, setAuthInfo] = useState(() => getUserInfoFromLocalStorage());

  const setAuth = (auth: Auth | null) => {
    setAuthInfo(auth);
    setUserInfoToLocalStorage(auth);
  };

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};
