
import React, { useState, useEffect } from "react";
import { CheckCircle, AlertCircle } from "lucide-react";
import { useAuth } from "./context/AuthContext";
import AuthModal from "./components/AuthModal";
import Dashboard from "./components/Dashboard";
import AdminPanel from "./components/AdminPanel";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Features from "./components/Features";
import Pricing from "./components/Pricing";
import WasteForm from "./components/WasteForm";
import Impact from "./components/Impact";
import Testimonials from "./components/Testimonials";
import CTA from "./components/CTA";
import Footer from "./components/Footer";

export default function ModernWasteFoodExchange() {
  const { user, logout, refreshUser } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authModalTab, setAuthModalTab] = useState('login');
  const [dashboardOpen, setDashboardOpen] = useState(false);
  const [adminPanelOpen, setAdminPanelOpen] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [notificationType, setNotificationType] = useState("success");
  const [animateStats, setAnimateStats] = useState(false);

  // Scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Animate stats on mount
  useEffect(() => {
    setTimeout(() => setAnimateStats(true), 500);
  }, []);

  // Refresh user data when dashboard is opened
  useEffect(() => {
    if (dashboardOpen) {
      refreshUser();
    }
  }, [dashboardOpen, refreshUser]);

  const handleNotification = (type, message) => {
    setNotificationType(type);
    setNotificationMessage(message);
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 5000);
  };

  const handleOpenAuth = (tab) => {
    setAuthModalTab(tab);
    setAuthModalOpen(true);
  };

  const scrollToForm = () => {
    const formElement = document.getElementById("submit-form");
    if (formElement) {
      formElement.scrollIntoView({ behavior: "smooth" });
    } else {
      // If form is not rendered (e.g. admin user), maybe show a message or redirect
      if (!user) {
        handleOpenAuth('login');
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white overflow-x-hidden">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;600;700;800&family=Space+Mono:wght@400;700&display=swap');
        
        * {
          font-family: 'Sora', sans-serif;
        }
        
        .font-mono {
          font-family: 'Space Mono', monospace;
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 20px rgba(16, 185, 129, 0.5); }
          50% { box-shadow: 0 0 40px rgba(16, 185, 129, 0.8); }
        }
        
        @keyframes slide-in {
          from { transform: translateX(-100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        
        @keyframes fade-in-up {
          from { transform: translateY(30px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        
        @keyframes gradient-shift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        .animate-pulse-glow {
          animation: pulse-glow 2s ease-in-out infinite;
        }
        
        .animate-slide-in {
          animation: slide-in 0.6s ease-out;
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out;
        }
        
        .gradient-animate {
          background-size: 200% 200%;
          animation: gradient-shift 8s ease infinite;
        }
        
        .glass-effect {
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }
        
        .noise-bg {
          background-image: 
            linear-gradient(rgba(16, 185, 129, 0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(16, 185, 129, 0.05) 1px, transparent 1px);
          background-size: 20px 20px;
        }
        
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(16, 185, 129, 0.5);
          border-radius: 4px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(16, 185, 129, 0.8);
        }

        .stagger-1 { animation-delay: 0.1s; }
        .stagger-2 { animation-delay: 0.2s; }
        .stagger-3 { animation-delay: 0.3s; }
        .stagger-4 { animation-delay: 0.4s; }
        .animate-scroll {
          animation: scroll 40s linear infinite;
        }
        .animate-scroll:hover {
          animation-play-state: paused;
        }
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>

      {/* Notification Toast */}
      {showNotification && (
        <div className={`fixed top-4 right-4 z-50 glass-effect border ${notificationType === 'success' ? 'border-emerald-500/50' : 'border-red-500/50'} rounded-2xl p-4 shadow-2xl animate-slide-in`}>
          <div className="flex items-center space-x-3">
            <div className={`${notificationType === 'success' ? 'bg-emerald-500/20' : 'bg-red-500/20'} p-2 rounded-lg`}>
              {notificationType === 'success' ? (
                <CheckCircle className="w-5 h-5 text-emerald-400" />
              ) : (
                <AlertCircle className="w-5 h-5 text-red-400" />
              )}
            </div>
            <div>
              <p className="font-semibold text-sm">
                {notificationType === 'success' ? 'Success!' : 'Error'}
              </p>
              <p className="text-xs text-gray-400">{notificationMessage}</p>
            </div>
          </div>
        </div>
      )}

      {/* Auth Modal */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        initialTab={authModalTab}
      />

      {/* Dashboard */}
      <Dashboard isOpen={dashboardOpen} onClose={() => setDashboardOpen(false)} />

      {/* Admin Panel */}
      <AdminPanel isOpen={adminPanelOpen} onClose={() => setAdminPanelOpen(false)} />

      {/* Navigation */}
      <Navbar
        user={user}
        scrolled={scrolled}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
        setDashboardOpen={setDashboardOpen}
        setAdminPanelOpen={setAdminPanelOpen}
        onLogout={logout}
        onOpenAuth={handleOpenAuth}
      />

      {/* Hero Section */}
      <Hero onScrollToForm={scrollToForm} />

      {/* Features Section */}
      <Features />

      {/* Pricing Grid */}
      <Pricing />

      {/* Advanced Submission Form - Hidden for Admins */}
      <WasteForm user={user} onSuccess={handleNotification} />

      {/* Impact Dashboard */}
      <Impact animateStats={animateStats} />

      {/* Testimonials */}
      <Testimonials />

      {/* CTA Section */}
      <CTA onScrollToForm={scrollToForm} />

      {/* Footer */}
      <Footer />
    </div>
  );
}
