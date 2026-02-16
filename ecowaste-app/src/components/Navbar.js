
import React from 'react';
import { Leaf, User, Sparkles, X, Menu, Shield, LogOut } from 'lucide-react';

export default function Navbar({ 
  user, 
  scrolled, 
  mobileMenuOpen, 
  setMobileMenuOpen, 
  setDashboardOpen, 
  setAdminPanelOpen, 
  onLogout,
  onOpenAuth 
}) {
  return (
    <nav
      className={`fixed top-0 w-full z-40 transition-all duration-300 ${
        scrolled ? "glass-effect shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-br from-emerald-400 to-teal-600 p-2.5 rounded-xl animate-pulse-glow">
              <Leaf className="w-7 h-7 text-white" />
            </div>
            <div>
              <span className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                EcoWaste
              </span>
              <p className="text-xs text-gray-400 font-mono">v2.0</p>
            </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <a
              href="#home"
              className="text-gray-300 hover:text-emerald-400 transition"
            >
              Home
            </a>
            <a
              href="#features"
              className="text-gray-300 hover:text-emerald-400 transition"
            >
              Features
            </a>
            <a
              href="#pricing"
              className="text-gray-300 hover:text-emerald-400 transition"
            >
              Pricing
            </a>
            <a
              href="#impact"
              className="text-gray-300 hover:text-emerald-400 transition"
            >
              Impact
            </a>
            
            {user ? (
              <div className="flex items-center space-x-4">
                {user.role === 'admin' ? (
                  // Admin view - only show Admin Panel button
                  <button
                    onClick={() => setAdminPanelOpen(true)}
                    className="bg-gradient-to-r from-purple-500 to-pink-500 px-6 py-2 rounded-xl hover:shadow-lg hover:shadow-purple-500/50 transition flex items-center space-x-2"
                  >
                    <Shield className="w-4 h-4" />
                    <span>Admin Panel</span>
                  </button>
                ) : (
                  // Regular user view - show profile button
                  <button
                    onClick={() => setDashboardOpen(true)}
                    className="glass-effect px-4 py-2 rounded-xl flex items-center space-x-3 hover:bg-emerald-500/10 transition"
                  >
                    <div className="bg-emerald-500/20 p-2 rounded-lg">
                      <User className="w-4 h-4 text-emerald-400" />
                    </div>
                    <div className="text-left">
                      <p className="text-sm font-semibold">{user.name}</p>
                      <p className="text-xs text-gray-400">₹{user.totalEarnings || 0}</p>
                    </div>
                  </button>
                )}
                
                <button
                  onClick={onLogout}
                  className="glass-effect px-4 py-2 rounded-xl hover:bg-red-500/10 transition flex items-center space-x-2 text-red-400"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <>
                <button
                  onClick={() => onOpenAuth('login')}
                  className="glass-effect px-6 py-2.5 rounded-xl hover:bg-emerald-500/10 transition flex items-center space-x-2"
                >
                  <User className="w-4 h-4" />
                  <span>Login</span>
                </button>
                <button
                  onClick={() => onOpenAuth('signup')}
                  className="bg-gradient-to-r from-emerald-500 to-teal-500 px-6 py-2.5 rounded-xl hover:shadow-lg hover:shadow-emerald-500/50 transition flex items-center space-x-2"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Sign Up</span>
                </button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden glass-effect p-2 rounded-lg"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 glass-effect rounded-2xl mt-2 mb-4 animate-fade-in-up">
            <a
              href="#home"
              className="block py-3 px-4 text-gray-300 hover:text-emerald-400 hover:bg-emerald-500/10 rounded-lg transition"
            >
              Home
            </a>
            <a
              href="#features"
              className="block py-3 px-4 text-gray-300 hover:text-emerald-400 hover:bg-emerald-500/10 rounded-lg transition"
            >
              Features
            </a>
            <a
              href="#pricing"
              className="block py-3 px-4 text-gray-300 hover:text-emerald-400 hover:bg-emerald-500/10 rounded-lg transition"
            >
              Pricing
            </a>
            <a
              href="#impact"
              className="block py-3 px-4 text-gray-300 hover:text-emerald-400 hover:bg-emerald-500/10 rounded-lg transition"
            >
              Impact
            </a>
            <div className="flex flex-col space-y-2 px-4 mt-4">
              {user ? (
                <>
                  {user.role === 'admin' ? (
                    // Admin view - only show Admin Panel button
                    <button
                      onClick={() => {
                        setAdminPanelOpen(true);
                        setMobileMenuOpen(false);
                      }}
                      className="bg-gradient-to-r from-purple-500 to-pink-500 px-6 py-3 rounded-xl hover:shadow-lg transition flex items-center justify-center space-x-2 mb-2 w-full"
                    >
                      <Shield className="w-4 h-4" />
                      <span>Admin Panel</span>
                    </button>
                  ) : (
                    // Regular user view - show profile button
                    <button
                      onClick={() => {
                        setDashboardOpen(true);
                        setMobileMenuOpen(false);
                      }}
                      className="glass-effect px-4 py-3 rounded-xl flex items-center space-x-3 mb-2 w-full hover:bg-emerald-500/10 transition"
                    >
                      <div className="bg-emerald-500/20 p-2 rounded-lg">
                        <User className="w-4 h-4 text-emerald-400" />
                      </div>
                      <div className="text-left">
                        <p className="text-sm font-semibold">{user.name}</p>
                        <p className="text-xs text-gray-400">₹{user.totalEarnings || 0} • View Dashboard</p>
                      </div>
                    </button>
                  )}
                  <button
                    onClick={onLogout}
                    className="glass-effect px-6 py-2.5 rounded-xl hover:bg-red-500/10 transition text-red-400 flex items-center justify-center space-x-2"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Logout</span>
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => {
                      onOpenAuth('login');
                      setMobileMenuOpen(false);
                    }}
                    className="glass-effect px-6 py-2.5 rounded-xl hover:bg-emerald-500/10 transition"
                  >
                    Login
                  </button>
                  <button
                    onClick={() => {
                      onOpenAuth('signup');
                      setMobileMenuOpen(false);
                    }}
                    className="bg-gradient-to-r from-emerald-500 to-teal-500 px-6 py-2.5 rounded-xl"
                  >
                    Sign Up
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
