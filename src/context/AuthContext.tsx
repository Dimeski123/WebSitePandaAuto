import React, { createContext, useContext, useEffect, useState } from 'react';

export interface User {
  email: string | null;
  token?: string;
}

interface AuthContextType {
  user: User | null;
  isAdmin: boolean;
  loading: boolean;
  login: (email: string, pw: string) => Promise<boolean>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

const API_BASE_URL = '/api';

export const AuthProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // Check for existing token
    const savedToken = localStorage.getItem('panda_auth_token');
    if (savedToken) {
      setUser({ email: 'panda-auto@gmail.com', token: savedToken });
      setIsAdmin(true);
    }
    setLoading(false);
  }, []);

  const login = async (email: string, pw: string): Promise<boolean> => {
    try {
      const response = await fetch(`${API_BASE_URL}/login.php`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password: pw }),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success && data.token) {
          setUser({ email, token: data.token });
          setIsAdmin(true);
          localStorage.setItem('panda_auth_token', data.token);
          return true;
        }
      }
    } catch (error) {
      console.error('Login error:', error);
    }
    return false;
  };

  const logout = async () => {
    setUser(null);
    setIsAdmin(false);
    localStorage.removeItem('panda_auth_token');
  };

  return (
    <AuthContext.Provider value={{ user, isAdmin, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
