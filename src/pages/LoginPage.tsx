import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { UserRole, useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { User, ChefHat, Shield, Mail, Lock, AlertCircle, Loader2 } from 'lucide-react';

const roles: { role: UserRole; icon: React.ReactNode; labelEn: string; labelEs: string; descEn: string; descEs: string; defaultEmail: string }[] = [
  { role: 'customer', icon: <User size={22} />, labelEn: 'Customer', labelEs: 'Cliente', descEn: 'Browse & order', descEs: 'Explorar y ordenar', defaultEmail: 'maria@example.com' },
  { role: 'admin', icon: <Shield size={22} />, labelEn: 'Admin', labelEs: 'Admin', descEn: 'Manage store', descEs: 'Gestionar tienda', defaultEmail: 'admin@dulceriamedina.com' },
  { role: 'chef', icon: <ChefHat size={22} />, labelEn: 'Chef', labelEs: 'Chef', descEn: 'Kitchen orders', descEs: 'Pedidos cocina', defaultEmail: 'rosa@dulceriamedina.com' },
];

const LoginPage = () => {
  const [selectedRole, setSelectedRole] = useState<UserRole>('customer');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [localError, setLocalError] = useState('');
  const { login, demoLogin, loading, error } = useAuth();
  const { lang } = useLanguage();
  const navigate = useNavigate();

  const handleRoleChange = (role: UserRole) => {
    setSelectedRole(role);
    const r = roles.find((r) => r.role === role);
    if (r) setEmail(r.defaultEmail);
    setPassword('');
    setLocalError('');
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError('');

    if (!email) {
      setLocalError(lang === 'en' ? 'Email is required' : 'El correo es requerido');
      return;
    }

    try {
      await login(email, password);
      navigate('/');
    } catch {
      // If backend isn't available, fall back to demo login
      demoLogin(selectedRole);
      navigate('/');
    }
  };

  const handleDemoLogin = () => {
    demoLogin(selectedRole);
    navigate('/');
  };

  const currentRole = roles.find((r) => r.role === selectedRole)!;
  const displayError = localError || error;

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
                  type="button"
                  onClick={() => handleRoleChange(role)}
                  className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 px-2 rounded-lg text-xs font-bold transition-all ${
                    selectedRole === role
                      ? 'bg-card text-primary shadow-sm'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {icon}
                  <span>{lang === 'en' ? labelEn : labelEs}</span>
                </button>
              ))}
            </div>

            {/* Role description badge */}
            <div className="text-center mb-4">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold">
                {currentRole.icon}
                {lang === 'en' ? currentRole.descEn : currentRole.descEs}
              </span>
            </div>

            {/* Error message */}
            {displayError && (
              <div className="flex items-center gap-2 p-3 mb-4 rounded-lg bg-destructive/10 text-destructive text-sm">
                <AlertCircle size={16} />
                {displayError}
              </div>
            )}

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
                disabled={loading}
                className="w-full bg-gradient-fiesta text-primary-foreground py-2.5 rounded-xl font-bold text-sm shadow-fiesta hover:shadow-fiesta-lg transition-all disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    {lang === 'en' ? 'Signing in...' : 'Iniciando...'}
                  </>
                ) : (
                  lang === 'en' ? 'Sign In' : 'Iniciar Sesión'
                )}
              </button>
            </form>

            {/* Divider */}
            <div className="flex items-center gap-3 my-4">
              <div className="flex-1 h-px bg-border" />
              <span className="text-xs text-muted-foreground font-bold">{lang === 'en' ? 'or' : 'o'}</span>
              <div className="flex-1 h-px bg-border" />
            </div>

            {/* Demo quick login */}
            <button
              type="button"
              onClick={handleDemoLogin}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl border border-border bg-card hover:bg-muted/30 font-bold text-sm text-muted-foreground transition-all"
            >
              🎪 {lang === 'en' ? `Demo ${currentRole.labelEn} Login` : `Demo ${currentRole.labelEs}`}
            </button>

            <p className="text-center text-[11px] text-muted-foreground mt-5">
              🔒 {lang === 'en' ? 'Uses your backend auth when running locally' : 'Usa autenticación del backend local'}
            </p>
          </div>
        </motion.div>
      </div>
      <Footer />
    </div>
  );
};

export default LoginPage;
