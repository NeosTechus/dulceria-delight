import { useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { GOOGLE_CLIENT_ID } from '@/config/api';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Mail, Lock, AlertCircle, Loader2, LogIn, UserPlus, Eye, EyeOff } from 'lucide-react';

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
  const [mode, setMode] = useState<'signin' | 'signup'>('signin');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [localError, setLocalError] = useState('');
  const { login, register, staffLogin, googleLogin, demoLogin, loading, error } = useAuth();
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError('');

    if (mode === 'signup' && !name.trim()) {
      setLocalError(lang === 'en' ? 'Name is required' : 'El nombre es requerido');
      return;
    }
    if (!email) {
      setLocalError(lang === 'en' ? 'Email is required' : 'El correo es requerido');
      return;
    }
    if (!password) {
      setLocalError(lang === 'en' ? 'Password is required' : 'La contraseña es requerida');
      return;
    }

    if (mode === 'signin') {
      const isAdmin = staffLogin(email, password, 'admin');
      if (isAdmin) { navigate('/admin'); return; }
      const isChef = staffLogin(email, password, 'chef');
      if (isChef) { navigate('/chef'); return; }

      try {
        await login(email, password);
        navigate('/');
      } catch {
        setLocalError(lang === 'en' ? 'Invalid email or password' : 'Correo o contraseña inválidos');
      }
    } else {
      try {
        await register(name.trim(), email, password);
        navigate('/');
      } catch {
        setLocalError(lang === 'en' ? 'Registration failed. Try again.' : 'Error al registrarse. Intenta de nuevo.');
      }
    }
  };

  const displayError = localError || error;

  return (
    <div className="min-h-screen bg-background">
      <Navbar cartCount={0} onCartClick={() => {}} />
      <div className="pt-[140px] pb-20 px-4 flex justify-center items-start min-h-[80vh]">
        <motion.div
          className="w-full max-w-md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="bg-card rounded-2xl border border-border shadow-elevated p-8">
            {/* Header */}
            <div className="text-center mb-6">
              <h2 className="text-2xl font-fredoka text-foreground">
                {lang === 'en' ? 'Welcome' : 'Bienvenido'}
              </h2>
              <p className="text-sm text-muted-foreground mt-1">
                {lang === 'en' ? 'Sign in to track orders and enjoy faster checkout' : 'Inicia sesión para rastrear pedidos y pagar más rápido'}
              </p>
            </div>

            {/* Sign In / Sign Up Toggle */}
            <div className="flex p-1 bg-muted/50 rounded-xl mb-6">
              <button
                type="button"
                onClick={() => { setMode('signin'); setLocalError(''); }}
                className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-bold transition-all ${
                  mode === 'signin'
                    ? 'bg-card text-foreground shadow-sm'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <LogIn size={16} />
                {lang === 'en' ? 'Sign In' : 'Iniciar Sesión'}
              </button>
              <button
                type="button"
                onClick={() => { setMode('signup'); setLocalError(''); }}
                className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-bold transition-all ${
                  mode === 'signup'
                    ? 'bg-card text-foreground shadow-sm'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <UserPlus size={16} />
                {lang === 'en' ? 'Sign Up' : 'Registrarse'}
              </button>
            </div>

            {/* Error */}
            {displayError && (
              <div className="flex items-center gap-2 p-3 mb-4 rounded-lg bg-destructive/10 text-destructive text-sm">
                <AlertCircle size={16} />
                {displayError}
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              {mode === 'signup' && (
                <div>
                  <label className="block text-sm font-bold text-foreground mb-2">
                    {lang === 'en' ? 'Name' : 'Nombre'}
                  </label>
                  <div className="relative">
                    <UserPlus size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                    <input
                      type="text"
                      placeholder={lang === 'en' ? 'Your name' : 'Tu nombre'}
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-border bg-muted/30 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                    />
                  </div>
                </div>
              )}
              <div>
                <label className="block text-sm font-bold text-foreground mb-2">
                  {lang === 'en' ? 'Email' : 'Correo'}
                </label>
                <div className="relative">
                  <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <input
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-border bg-muted/30 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-foreground mb-2">
                  {lang === 'en' ? 'Password' : 'Contraseña'}
                </label>
                <div className="relative">
                  <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-12 py-3 rounded-xl border border-border bg-muted/30 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-fiesta-orange text-white py-3 rounded-xl font-bold text-sm hover:bg-fiesta-orange/90 transition-all disabled:opacity-50 flex items-center justify-center gap-2 shadow-fiesta-orange"
              >
                {loading ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    {lang === 'en' ? 'Please wait...' : 'Espera...'}
                  </>
                ) : (
                  mode === 'signin'
                    ? (lang === 'en' ? 'Sign In' : 'Iniciar Sesión')
                    : (lang === 'en' ? 'Create Account' : 'Crear Cuenta')
                )}
              </button>
            </form>

            {/* Divider */}
            <div className="flex items-center gap-3 my-6">
              <div className="flex-1 h-px bg-border" />
              <span className="text-xs text-muted-foreground font-bold uppercase tracking-wider">
                {lang === 'en' ? 'or continue with' : 'o continuar con'}
              </span>
              <div className="flex-1 h-px bg-border" />
            </div>

            {/* Google Sign-In */}
            {GOOGLE_CLIENT_ID ? (
              <div ref={googleBtnRef} className="w-full" />
            ) : (
              <button
                type="button"
                onClick={() => { demoLogin('customer'); navigate('/'); }}
                className="w-full flex items-center justify-center gap-3 py-3 px-4 rounded-xl border border-border bg-card hover:bg-muted/30 font-bold text-sm transition-all"
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
          </div>

          {/* Guest checkout note */}
          <p className="text-center text-sm text-muted-foreground mt-5">
            {lang === 'en'
              ? 'You can also checkout as a guest and create an account later'
              : 'También puedes comprar como invitado y crear una cuenta después'}
          </p>
        </motion.div>
      </div>
      <Footer />
    </div>
  );
};

export default LoginPage;
