import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { UserRole, useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { User, ChefHat, Shield } from 'lucide-react';

const roles: { role: UserRole; icon: React.ReactNode; labelEn: string; labelEs: string; descEn: string; descEs: string }[] = [
  { role: 'customer', icon: <User size={28} />, labelEn: 'Customer', labelEs: 'Cliente', descEn: 'Browse & order food', descEs: 'Explorar y ordenar comida' },
  { role: 'admin', icon: <Shield size={28} />, labelEn: 'Admin', labelEs: 'Administrador', descEn: 'Manage store & orders', descEs: 'Gestionar tienda y pedidos' },
  { role: 'chef', icon: <ChefHat size={28} />, labelEn: 'Chef', labelEs: 'Chef', descEn: 'View & prepare orders', descEs: 'Ver y preparar pedidos' },
];

const LoginPage = () => {
  const [selectedRole, setSelectedRole] = useState<UserRole>('customer');
  const { login } = useAuth();
  const { lang } = useLanguage();
  const navigate = useNavigate();

  const handleLogin = () => {
    login(selectedRole);
    navigate('/');
  };

  const handleGoogleLogin = () => {
    // Mock Google sign-in — just logs in with selected role
    login(selectedRole);
    navigate('/');
  };

  return (
    <div className="min-h-screen">
      <Navbar cartCount={0} onCartClick={() => {}} />
      <div className="pt-28 pb-20 px-4 flex justify-center">
        <motion.div
          className="w-full max-w-md bg-card rounded-2xl border border-border shadow-elevated p-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-2xl text-center mb-2 text-gradient-fiesta inline-block w-full">
            🪅 {lang === 'en' ? 'Sign In' : 'Iniciar Sesión'}
          </h1>
          <p className="text-center text-muted-foreground text-sm mb-8">
            {lang === 'en' ? 'Choose your role to continue' : 'Elige tu rol para continuar'}
          </p>

          {/* Role selector */}
          <div className="grid grid-cols-3 gap-3 mb-8">
            {roles.map(({ role, icon, labelEn, labelEs, descEn, descEs }) => (
              <motion.button
                key={role}
                onClick={() => setSelectedRole(role)}
                className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all text-center ${
                  selectedRole === role
                    ? 'border-primary bg-primary/5 text-primary'
                    : 'border-border text-muted-foreground hover:border-primary/30'
                }`}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                {icon}
                <span className="font-bold text-sm">{lang === 'en' ? labelEn : labelEs}</span>
                <span className="text-xs opacity-70">{lang === 'en' ? descEn : descEs}</span>
              </motion.button>
            ))}
          </div>

          {/* Google Sign In */}
          <motion.button
            onClick={handleGoogleLogin}
            className="w-full flex items-center justify-center gap-3 py-3 px-4 rounded-xl border-2 border-border bg-card hover:bg-muted/50 font-bold transition-all mb-4"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <svg width="20" height="20" viewBox="0 0 48 48">
              <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
              <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
              <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
              <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
            </svg>
            {lang === 'en' ? 'Sign in with Google' : 'Iniciar con Google'}
          </motion.button>

          {/* Divider */}
          <div className="flex items-center gap-3 mb-4">
            <div className="flex-1 h-px bg-border" />
            <span className="text-xs text-muted-foreground">{lang === 'en' ? 'or' : 'o'}</span>
            <div className="flex-1 h-px bg-border" />
          </div>

          {/* Regular Sign In */}
          <motion.button
            onClick={handleLogin}
            className="w-full bg-gradient-fiesta text-primary-foreground py-3 rounded-xl font-bold shadow-fiesta hover:shadow-fiesta-lg transition-shadow"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {lang === 'en' ? `Sign in as ${selectedRole.charAt(0).toUpperCase() + selectedRole.slice(1)}` : `Entrar como ${roles.find(r => r.role === selectedRole)?.[lang === 'es' ? 'labelEs' : 'labelEn']}`}
          </motion.button>

          <p className="text-center text-xs text-muted-foreground mt-6">
            🔒 {lang === 'en' ? 'Demo mode — no real authentication' : 'Modo demo — sin autenticación real'}
          </p>
        </motion.div>
      </div>
      <Footer />
    </div>
  );
};

export default LoginPage;
