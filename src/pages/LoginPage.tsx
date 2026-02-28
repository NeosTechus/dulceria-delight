import { useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { GOOGLE_CLIENT_ID } from '@/config/api';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Mail, Lock, AlertCircle, Loader2 } from 'lucide-react';

declare global {
  interface Window {
    google?: {
      accounts: {
        id: {
          initialize: (config: any) => void;
          renderButton: (element: HTMLElement, config: any) => void;
        };
      };
    };
  }
}

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [localError, setLocalError] = useState('');
  const { login, staffLogin, googleLogin, demoLogin, loading, error } = useAuth();
  const { lang } = useLanguage();
  const navigate = useNavigate();
  const googleBtnRef = useRef<HTMLDivElement>(null);

  const handleGoogleResponse = useCallback(async (response: any) => {
    try {
      await googleLogin(response.credential);
      navigate('/');
    } catch {
      demoLogin('customer');
      navigate('/');
    }
  }, [googleLogin, demoLogin, navigate]);

  useEffect(() => {
    if (!GOOGLE_CLIENT_ID) return;
    const initGoogle = () => {
      if (!window.google || !googleBtnRef.current) return;
      window.google.accounts.id.initialize({
        client_id: GOOGLE_CLIENT_ID,
        callback: handleGoogleResponse,
      });
      window.google.accounts.id.renderButton(googleBtnRef.current, {
        theme: 'outline',
        size: 'large',
        width: googleBtnRef.current.offsetWidth,
        text: 'signin_with',
        shape: 'pill',
      });
    };
    if (window.google) {
      initGoogle();
    } else {
      const interval = setInterval(() => {
        if (window.google) { clearInterval(interval); initGoogle(); }
      }, 100);
      return () => clearInterval(interval);
    }
  }, [handleGoogleResponse]);

  const handleLogin = async (e: React.FormEvent) => {
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

    // Check staff credentials first (admin, then chef)
    const isAdmin = staffLogin(email, password, 'admin');
    if (isAdmin) { navigate('/admin'); return; }

    const isChef = staffLogin(email, password, 'chef');
    if (isChef) { navigate('/chef'); return; }

    // Otherwise try customer login
    try {
      await login(email, password);
      navigate('/');
    } catch {
      setLocalError(lang === 'en' ? 'Invalid email or password' : 'Correo o contraseña inválidos');
    }
  };

  const displayError = localError || error;

  return (
    <div className="min-h-screen bg-background">
      <Navbar cartCount={0} onCartClick={() => {}} />
      <div className="pt-[140px] pb-20 px-4 flex justify-center items-start min-h-[80vh]">
        <motion.div
          className="w-full max-w-sm"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
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
            {displayError && (
              <div className="flex items-center gap-2 p-3 mb-4 rounded-lg bg-destructive/10 text-destructive text-sm">
                <AlertCircle size={16} />
                {displayError}
              </div>
            )}

            {/* Google Sign-In */}
            {GOOGLE_CLIENT_ID ? (
              <div ref={googleBtnRef} className="w-full mb-4" />
            ) : (
              <button
                type="button"
                onClick={() => { demoLogin('customer'); navigate('/'); }}
                className="w-full flex items-center justify-center gap-3 py-2.5 px-4 rounded-xl border border-border bg-card hover:bg-muted/30 font-bold text-sm transition-all mb-4"
              >
                <svg width="18" height="18" viewBox="0 0 48 48">
                  <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
                  <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
                  <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
                  <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
                </svg>
                {lang === 'en' ? 'Sign in with Google' : 'Iniciar con Google'}
              </button>
            )}

            <div className="flex items-center gap-3 mb-4">
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
              🔒 {lang === 'en' ? 'Customers & staff use the same login' : 'Clientes y staff usan el mismo inicio de sesión'}
            </p>
          </div>
        </motion.div>
      </div>
      <Footer />
    </div>
  );
};

export default LoginPage;
