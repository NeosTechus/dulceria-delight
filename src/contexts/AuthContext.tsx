import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { authApi } from '@/services/auth';
import { API_BASE_URL } from '@/config/api';

export type UserRole = 'customer' | 'admin' | 'chef';

interface User {
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  demoLogin: (role: UserRole) => void;
  logout: () => void;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);



const defaultUsers: Record<UserRole, User> = {
  customer: { name: 'Maria Garcia', email: 'maria@example.com', role: 'customer' },
  admin: { name: 'Carlos Medina', email: 'admin@dulceriamedina.com', role: 'admin' },
  chef: { name: 'Chef Rosa', email: 'rosa@dulceriamedina.com', role: 'chef' },
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Restore session from localStorage
  useEffect(() => {
    const saved = authApi.getSavedUser();
    if (saved) setUser(saved);
  }, []);

  const login = async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    try {
      const { user: authUser } = await authApi.login(email, password);
      setUser(authUser);
    } catch (err: any) {
      setError(err.message || 'Login failed');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const demoLogin = (role: UserRole) => {
    setUser(defaultUsers[role]);
    setError(null);
  };

  const logout = () => {
    authApi.logout();
    setUser(null);
    setError(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, demoLogin, logout, isAuthenticated: !!user, loading, error }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};
