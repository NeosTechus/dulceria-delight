import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { authApi } from '@/services/auth';

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
  register: (name: string, email: string, password: string) => Promise<void>;
  staffLogin: (email: string, password: string, role: 'admin' | 'chef') => Promise<boolean>;
  googleLogin: (idToken: string) => Promise<void>;
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

// Staff credentials from environment variables
// Set these in your .env file:
// VITE_ADMIN_EMAIL, VITE_ADMIN_PASSWORD
// VITE_CHEF_EMAIL, VITE_CHEF_PASSWORD
const staffCredentials = {
  admin: {
    email: import.meta.env.VITE_ADMIN_EMAIL || 'admin@dulceriamedina.com',
    password: import.meta.env.VITE_ADMIN_PASSWORD || 'admin123',
  },
  chef: {
    email: import.meta.env.VITE_CHEF_EMAIL || 'chef@dulceriamedina.com',
    password: import.meta.env.VITE_CHEF_PASSWORD || 'chef123',
  },
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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

  const register = async (name: string, email: string, password: string) => {
    setLoading(true);
    setError(null);
    try {
      const { user: authUser } = await authApi.register(name, email, password, 'customer');
      setUser(authUser);
    } catch (err: any) {
      setError(err.message || 'Registration failed');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const staffLogin = async (email: string, password: string, role: 'admin' | 'chef'): Promise<boolean> => {
    const creds = staffCredentials[role];
    if (email !== creds.email || password !== creds.password) {
      setError('Invalid email or password');
      return false;
    }

    // Try API login first (gets a JWT for authenticated API calls)
    try {
      const { user: authUser } = await authApi.login(email, password);
      setUser(authUser);
      setError(null);
      return true;
    } catch {
      // API login failed — fall back to local-only login (no JWT, limited API access)
      const staffUser: User = {
        name: role === 'admin' ? 'Admin' : 'Chef',
        email,
        role,
      };
      setUser(staffUser);
      setError(null);
      return true;
    }
  };

  const googleLogin = async (idToken: string) => {
    setLoading(true);
    setError(null);
    try {
      const { user: authUser } = await authApi.googleLogin(idToken);
      setUser(authUser);
    } catch (err: any) {
      setError(err.message || 'Google login failed');
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
    window.location.href = '/login';
  };

  return (
    <AuthContext.Provider value={{ user, login, register, staffLogin, googleLogin, demoLogin, logout, isAuthenticated: !!user, loading, error }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};
