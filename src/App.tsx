import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { AuthProvider } from "@/contexts/AuthContext";
import { CartProvider } from "@/contexts/CartContext";
import { OrderProvider } from "@/contexts/OrderContext";
import { AnimatePresence } from "framer-motion";
import PageTransition from "@/components/PageTransition";
import Index from "./pages/Index";
import OrderTracker from "./components/OrderTracker";
import MenuPage from "./pages/MenuPage";
import CandyShopPage from "./pages/CandyShopPage";
import AboutPage from "./pages/AboutPage";
import LoginPage from "./pages/LoginPage";
import AdminDashboard from "./pages/AdminDashboard";
import ChefDashboard from "./pages/ChefDashboard";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const AnimatedRoutes = () => {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageTransition><Index /></PageTransition>} />
        <Route path="/menu" element={<PageTransition><MenuPage /></PageTransition>} />
        <Route path="/candy-shop" element={<PageTransition><CandyShopPage /></PageTransition>} />
        <Route path="/about" element={<PageTransition><AboutPage /></PageTransition>} />
        <Route path="/login" element={<PageTransition><LoginPage /></PageTransition>} />
        <Route path="/admin" element={<PageTransition><AdminDashboard /></PageTransition>} />
        <Route path="/chef" element={<PageTransition><ChefDashboard /></PageTransition>} />
        <Route path="*" element={<PageTransition><NotFound /></PageTransition>} />
      </Routes>
    </AnimatePresence>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
      <CartProvider>
        <OrderProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <AuthProvider>
                <AnimatedRoutes />
                <OrderTracker />
              </AuthProvider>
            </BrowserRouter>
          </TooltipProvider>
        </OrderProvider>
      </CartProvider>
    </LanguageProvider>
  </QueryClientProvider>
);

export default App;
