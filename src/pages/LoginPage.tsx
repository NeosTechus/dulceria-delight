import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { UserRole, useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { User, ChefHat, Shield, Mail, Lock } from 'lucide-react';

const roles: { role: UserRole; icon: React.ReactNode; labelEn: string; labelEs: string; descEn: string; descEs: string }[] = [
  { role: 'customer', icon: <User size={22} />, labelEn: 'Customer', labelEs: 'Cliente', descEn: 'Browse & order', descEs: 'Explorar y ordenar' },
  { role: 'admin', icon: <Shield size={22} />, labelEn: 'Admin', labelEs: 'Admin', descEn: 'Manage store', descEs: 'Gestionar tienda' },
  { role: 'chef', icon: <ChefHat size={22} />, labelEn: 'Chef', labelEs: 'Chef', descEn: 'Prepare orders', descEs: 'Preparar pedidos' },
];

const LoginPage = () => {
  const [selectedRole, setSelectedRole] = useState<UserRole>('customer');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const { lang } = useLanguage();
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    login(selectedRole, undefined, email || undefined);
    navigate('/');
  };

  const handleGoogleLogin = () => {
    login(selectedRole);
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar cartCount={0} onCartClick={() => {}} />
      <div className="pt-24 pb-20 px-4 flex justify-center items-start min-h-[80vh]">
        <motion.div
          className="w-full max-w-sm"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl mb-1">🪅</h1>
            <h2 className="text-xl font-bold text-foreground">
              {lang === 'en' ? 'Welcome back' : 'Bienvenido'}
            </h2>
            <p className="text-sm text-muted-foreground mt-1">
              {lang === 'en' ? 'Sign in to your account' : 'Inicia sesión en tu cuenta'}
            </p>
          </div>

          <div className="bg-card rounded-2xl border border-border shadow-elevated p-6">
            {/* Role selector - horizontal pills */}
            <div className="flex gap-1 p-1 bg-muted/50 rounded-xl mb-6">
              {roles.map(({ role, icon, labelEn, labelEs }) => (
                <button
                  key={role}
                  onClick={() => setSelectedRole(role)}
                  className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-2 rounded-lg text-xs font-bold transition-all ${
                    selectedRole === role
                      ? 'bg-card text-primary shadow-sm'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {icon}
                  <span className="hidden sm:inline">{lang === 'en' ? labelEn : labelEs}</span>
                </button>
              ))}
            </div>

            {/* Google Sign In */}
            <button
              onClick={handleGoogleLogin}
              className="w-full flex items-center justify-center gap-3 py-2.5 px-4 rounded-xl border border-border bg-card hover:bg-muted/30 font-bold text-sm transition-all mb-5"
            >
              <svg width="18" height="18" viewBox="0 0 48 48">
                <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
                <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
                <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
                <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
              </svg>
              {lang === 'en' ? 'Continue with Google' : 'Continuar con Google'}
            </button>

            {/* Divider */}
            <div className="flex items-center gap-3 mb-5">
              <div className="flex-1 h-px bg-border" />
              <span className="text-xs text-muted-foreground font-bold">{lang === 'en' ? 'or' : 'o'}</span>
              <div className="flex-1 h-px bg-border" />
            </div>

            {/* Email/Password form */}
            <form onSubmit={handleLogin} className="space-y-3">
              <div className="relative">
                <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="email"
                  placeholder={lang === 'en' ? 'Email address' : 'Correo electrónico'}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                />
              </div>
              <div className="relative">
                <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="password"
                  placeholder={lang === 'en' ? 'Password' : 'Contraseña'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-fiesta text-primary-foreground py-2.5 rounded-xl font-bold text-sm shadow-fiesta hover:shadow-fiesta-lg transition-all"
              >
                {lang === 'en' ? 'Sign In' : 'Iniciar Sesión'}
              </button>
            </form>

            <p className="text-center text-[11px] text-muted-foreground mt-5">
              🔒 {lang === 'en' ? 'Demo mode — no real authentication' : 'Modo demo — sin autenticación real'}
            </p>
          </div>
        </motion.div>
      </div>
      <Footer />
    </div>
  );
};

export default LoginPage;
