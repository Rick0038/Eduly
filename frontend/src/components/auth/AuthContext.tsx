// AuthContext.tsx
import { ReactNode, createContext, useState } from 'react';

export interface AuthContextType {
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(() =>
    localStorage.getItem('token') ? true : false
  );

  // todo implement proper login and sign up
  const login = () => {
    localStorage.setItem('token', 'yo');
    setIsAuthenticated(true);
  };
  const logout = () => {
    localStorage.clear();
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
