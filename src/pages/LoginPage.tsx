import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Mail, Lock, AlertCircle, Loader2 } from 'lucide-react';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [localError, setLocalError] = useState('');
  const { staffLogin, loading, error } = useAuth();
  const { lang } = useLanguage();
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError('');

    if (!email) {
      setLocalError(lang === 'en' ? 'Email is required' : 'El correo es requerido');
      return;
    }
    if (!password) {
      setLocalError(lang === 'en' ? 'Password is required' : 'La contraseña es requerida');
      return;
    }

    // Try admin first, then chef
    const isAdmin = staffLogin(email, password, 'admin');
    if (isAdmin) {
      navigate('/admin');
      return;
    }

    const isChef = staffLogin(email, password, 'chef');
    if (isChef) {
      navigate('/chef');
      return;
    }

    setLocalError(lang === 'en' ? 'Invalid email or password' : 'Correo o contraseña inválidos');
  };

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
          <div className="text-center mb-8">
            <h1 className="text-3xl mb-1">🪅</h1>
            <h2 className="text-xl font-bold text-foreground">
              {lang === 'en' ? 'Staff Sign In' : 'Inicio de Sesión'}
            </h2>
            <p className="text-sm text-muted-foreground mt-1">
              {lang === 'en' ? 'Enter your credentials to continue' : 'Ingresa tus credenciales para continuar'}
            </p>
          </div>

          <div className="bg-card rounded-2xl border border-border shadow-elevated p-6">
            {displayError && (
              <div className="flex items-center gap-2 p-3 mb-4 rounded-lg bg-destructive/10 text-destructive text-sm">
                <AlertCircle size={16} />
                {displayError}
              </div>
            )}

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

            <p className="text-center text-[11px] text-muted-foreground mt-5">
              🔒 {lang === 'en' ? 'Admin & Chef access only' : 'Solo acceso Admin y Chef'}
            </p>
          </div>
        </motion.div>
      </div>
      <Footer />
    </div>
  );
};

export default LoginPage;
