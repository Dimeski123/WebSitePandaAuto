import React, { createContext, useContext, useEffect, useState } from 'react';

export interface User {
  email: string | null;
}

interface AuthContextType {
  user: User | null;
  isAdmin: boolean;
  loading: boolean;
  login: (email: string, pw: string) => Promise<boolean>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // Mocking persistent login with localStorage
    const savedSession = localStorage.getItem('panda_auth');
    if (savedSession === 'admin') {
      setUser({ email: 'panda-auto@gmail.com' });
      setIsAdmin(true);
    }
    setLoading(false);
  }, []);

  const login = async (email: string, pw: string) => {
    if (email === 'panda-auto@gmail.com' && pw === '123456789') {
      setUser({ email });
      setIsAdmin(true);
      localStorage.setItem('panda_auth', 'admin');
      return true;
    }
    return false;
  };

  const logout = async () => {
    setUser(null);
    setIsAdmin(false);
    localStorage.removeItem('panda_auth');
  };

  return (
    <AuthContext.Provider value={{ user, isAdmin, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
