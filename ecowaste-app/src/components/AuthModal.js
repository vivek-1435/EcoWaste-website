import React, { useState } from 'react';
import { X, Mail, Lock, User as UserIcon, Phone, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function AuthModal({ isOpen, onClose, initialTab = 'login' }) {
  const [activeTab, setActiveTab] = useState(initialTab);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { login, signup } = useAuth();

  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });

  const [signupData, setSignupData] = useState({
    name: '',
    email: '',
    phone: '',
    password: ''
  });

  const handleLoginChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSignupChange = (e) => {
    setSignupData({ ...signupData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const result = await login(loginData);
    
    if (result.success) {
      onClose();
      setLoginData({ email: '', password: '' });
    } else {
      setError(result.message);
    }
    
    setLoading(false);
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const result = await signup(signupData);
    
    if (result.success) {
      onClose();
      setSignupData({ name: '', email: '', phone: '', password: '' });
    } else {
      setError(result.message);
    }
    
    setLoading(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="glass-effect border border-emerald-500/20 rounded-3xl p-8 max-w-md w-full relative animate-fade-in-up">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 glass-effect p-2 rounded-lg hover:bg-white/10 transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-2">
            <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
              {activeTab === 'login' ? 'Welcome Back' : 'Join EcoWaste'}
            </span>
          </h2>
          <p className="text-gray-400 text-sm">
            {activeTab === 'login'
              ? 'Sign in to track your earnings'
              : 'Start earning from your waste today'}
          </p>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 glass-effect p-1 rounded-xl">
          <button
            onClick={() => {
              setActiveTab('login');
              setError('');
            }}
            className={`flex-1 py-2 rounded-lg transition ${
              activeTab === 'login'
                ? 'bg-gradient-to-r from-emerald-500 to-teal-500'
                : 'hover:bg-white/5'
            }`}
          >
            Login
          </button>
          <button
            onClick={() => {
              setActiveTab('signup');
              setError('');
            }}
            className={`flex-1 py-2 rounded-lg transition ${
              activeTab === 'signup'
                ? 'bg-gradient-to-r from-emerald-500 to-teal-500'
                : 'hover:bg-white/5'
            }`}
          >
            Sign Up
          </button>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-4 p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm">
            {error}
          </div>
        )}

        {/* Login Form */}
        {activeTab === 'login' && (
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm text-gray-400 mb-2">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  name="email"
                  value={loginData.email}
                  onChange={handleLoginChange}
                  className="w-full glass-effect pl-12 pr-4 py-3 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none border border-white/10"
                  placeholder="your.email@example.com"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={loginData.password}
                  onChange={handleLoginChange}
                  className="w-full glass-effect pl-12 pr-12 py-3 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none border border-white/10"
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full bg-gradient-to-r from-emerald-500 to-teal-500 py-3 rounded-xl font-semibold transition ${
                loading ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-lg hover:shadow-emerald-500/50'
              }`}
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>
        )}

        {/* Signup Form */}
        {activeTab === 'signup' && (
          <form onSubmit={handleSignup} className="space-y-4">
            <div>
              <label className="block text-sm text-gray-400 mb-2">Full Name</label>
              <div className="relative">
                <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  name="name"
                  value={signupData.name}
                  onChange={handleSignupChange}
                  className="w-full glass-effect pl-12 pr-4 py-3 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none border border-white/10"
                  placeholder="John Doe"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-2">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  name="email"
                  value={signupData.email}
                  onChange={handleSignupChange}
                  className="w-full glass-effect pl-12 pr-4 py-3 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none border border-white/10"
                  placeholder="your.email@example.com"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-2">Phone</label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="tel"
                  name="phone"
                  value={signupData.phone}
                  onChange={handleSignupChange}
                  className="w-full glass-effect pl-12 pr-4 py-3 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none border border-white/10"
                  placeholder="+91 98765 43210"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={signupData.password}
                  onChange={handleSignupChange}
                  className="w-full glass-effect pl-12 pr-12 py-3 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none border border-white/10"
                  placeholder="Create a password"
                  required
                  minLength="6"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full bg-gradient-to-r from-emerald-500 to-teal-500 py-3 rounded-xl font-semibold transition ${
                loading ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-lg hover:shadow-emerald-500/50'
              }`}
            >
              {loading ? 'Creating account...' : 'Create Account'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
