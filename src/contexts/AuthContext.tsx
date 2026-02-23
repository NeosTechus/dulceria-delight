import { createContext, useContext, useState, ReactNode } from 'react';

export type UserRole = 'customer' | 'admin' | 'chef';

interface User {
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  login: (role: UserRole, name?: string, email?: string) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const defaultUsers: Record<UserRole, User> = {
  customer: { name: 'Maria Garcia', email: 'maria@example.com', role: 'customer' },
  admin: { name: 'Carlos Medina', email: 'admin@dulceriamedina.com', role: 'admin' },
  chef: { name: 'Chef Rosa', email: 'rosa@dulceriamedina.com', role: 'chef' },
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = (role: UserRole, name?: string, email?: string) => {
    const base = defaultUsers[role];
    setUser({ ...base, ...(name && { name }), ...(email && { email }) });
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};
