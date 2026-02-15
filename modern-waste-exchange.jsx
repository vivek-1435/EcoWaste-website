import React, { useState, useEffect } from 'react';
import { Camera, MapPin, DollarSign, Trash2, TrendingUp, Award, Phone, Mail, Menu, X, ChevronRight, Clock, CheckCircle, Package, Upload, Image as ImageIcon, User, Calendar, Weight, Leaf, Sparkles, ArrowRight, Bell, Search, Filter, Star, MapPinned, CreditCard, Zap, Globe, Shield, Users } from 'lucide-react';

export default function ModernWasteFoodExchange() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeTab, setActiveTab] = useState('submit');
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [showNotification, setShowNotification] = useState(false);
  const [animateStats, setAnimateStats] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    wasteType: '',
    estimatedWeight: '',
    description: '',
    preferredPickup: '',
    frequency: 'one-time',
    paymentMethod: 'bank'
  });

  // Scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Animate stats on mount
  useEffect(() => {
    setTimeout(() => setAnimateStats(true), 500);
  }, []);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 4000);
    console.log('Form data:', formData);
    console.log('Image:', selectedImage);
  };

  const wasteCategories = [
    { name: 'Vegetable Waste', icon: '🥬', rate: '₹5-8', color: 'from-green-400 to-emerald-600' },
    { name: 'Fruit Waste', icon: '🍎', rate: '₹6-10', color: 'from-orange-400 to-red-500' },
    { name: 'Cooked Food', icon: '🍲', rate: '₹3-5', color: 'from-yellow-400 to-orange-500' },
    { name: 'Bakery Items', icon: '🍞', rate: '₹4-7', color: 'from-amber-400 to-yellow-600' },
    { name: 'Dairy Products', icon: '🥛', rate: '₹8-12', color: 'from-blue-400 to-indigo-500' },
    { name: 'Mixed Organic', icon: '♻️', rate: '₹4-6', color: 'from-teal-400 to-cyan-600' }
  ];

  const features = [
    {
      icon: <Zap className="w-6 h-6" />,
      title: 'Instant Verification',
      description: 'AI-powered waste quality check in seconds',
      color: 'from-yellow-400 to-orange-500'
    },
    {
      icon: <MapPinned className="w-6 h-6" />,
      title: 'Real-time Tracking',
      description: 'Track your pickup live on the map',
      color: 'from-blue-400 to-cyan-500'
    },
    {
      icon: <CreditCard className="w-6 h-6" />,
      title: 'Quick Payments',
      description: 'Instant UPI/Bank transfer on collection',
      color: 'from-green-400 to-emerald-500'
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: 'Secure & Verified',
      description: 'All transactions are encrypted & safe',
      color: 'from-purple-400 to-pink-500'
    }
  ];

  const testimonials = [
    {
      name: 'Priya Sharma',
      role: 'Home Baker',
      image: '👩‍🍳',
      rating: 5,
      text: 'Earned ₹5000+ in just 2 months! The pickup is always on time and the process is super smooth.'
    },
    {
      name: 'Rajesh Kumar',
      role: 'Restaurant Owner',
      image: '👨‍🍳',
      rating: 5,
      text: 'Finally a sustainable solution for our food waste. Great rates and professional service.'
    },
    {
      name: 'Anita Patel',
      role: 'Grocery Store',
      image: '👩‍💼',
      rating: 5,
      text: 'Love the real-time tracking feature. Makes waste management so much easier and profitable!'
    }
  ];

  const impactMetrics = [
    { label: 'CO₂ Emissions Reduced', value: '2.5 Tons', icon: <Leaf className="w-5 h-5" />, change: '+12%' },
    { label: 'Trees Equivalent', value: '125', icon: <Globe className="w-5 h-5" />, change: '+8%' },
    { label: 'Water Saved', value: '10K L', icon: <Sparkles className="w-5 h-5" />, change: '+15%' },
    { label: 'Happy Contributors', value: '500+', icon: <Users className="w-5 h-5" />, change: '+20%' }
  ];

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
      `}</style>

      {/* Notification Toast */}
      {showNotification && (
        <div className="fixed top-4 right-4 z-50 glass-effect border border-emerald-500/50 rounded-2xl p-4 shadow-2xl animate-slide-in">
          <div className="flex items-center space-x-3">
            <div className="bg-emerald-500/20 p-2 rounded-lg">
              <CheckCircle className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <p className="font-semibold text-sm">Request Submitted!</p>
              <p className="text-xs text-gray-400">We'll contact you shortly</p>
            </div>
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-40 transition-all duration-300 ${
        scrolled ? 'glass-effect shadow-lg' : 'bg-transparent'
      }`}>
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
              <a href="#home" className="text-gray-300 hover:text-emerald-400 transition">Home</a>
              <a href="#features" className="text-gray-300 hover:text-emerald-400 transition">Features</a>
              <a href="#pricing" className="text-gray-300 hover:text-emerald-400 transition">Pricing</a>
              <a href="#impact" className="text-gray-300 hover:text-emerald-400 transition">Impact</a>
              <button className="glass-effect px-6 py-2.5 rounded-xl hover:bg-emerald-500/10 transition flex items-center space-x-2">
                <User className="w-4 h-4" />
                <span>Login</span>
              </button>
              <button className="bg-gradient-to-r from-emerald-500 to-teal-500 px-6 py-2.5 rounded-xl hover:shadow-lg hover:shadow-emerald-500/50 transition flex items-center space-x-2">
                <Sparkles className="w-4 h-4" />
                <span>Sign Up</span>
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden glass-effect p-2 rounded-lg"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden py-4 glass-effect rounded-2xl mt-2 mb-4 animate-fade-in-up">
              <a href="#home" className="block py-3 px-4 text-gray-300 hover:text-emerald-400 hover:bg-emerald-500/10 rounded-lg transition">Home</a>
              <a href="#features" className="block py-3 px-4 text-gray-300 hover:text-emerald-400 hover:bg-emerald-500/10 rounded-lg transition">Features</a>
              <a href="#pricing" className="block py-3 px-4 text-gray-300 hover:text-emerald-400 hover:bg-emerald-500/10 rounded-lg transition">Pricing</a>
              <a href="#impact" className="block py-3 px-4 text-gray-300 hover:text-emerald-400 hover:bg-emerald-500/10 rounded-lg transition">Impact</a>
              <div className="flex flex-col space-y-2 px-4 mt-4">
                <button className="glass-effect px-6 py-2.5 rounded-xl hover:bg-emerald-500/10 transition">
                  Login
                </button>
                <button className="bg-gradient-to-r from-emerald-500 to-teal-500 px-6 py-2.5 rounded-xl">
                  Sign Up
                </button>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative pt-32 pb-20 overflow-hidden noise-bg">
        {/* Animated Background Elements */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-emerald-500/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-teal-500/20 rounded-full blur-3xl animate-float" style={{animationDelay: '2s'}}></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="inline-flex glass-effect px-4 py-2 rounded-full text-sm animate-fade-in-up">
                <span className="text-emerald-400 mr-2">✨</span>
                <span className="text-gray-300">Join 500+ waste warriors</span>
              </div>
              
              <h1 className="text-6xl lg:text-7xl font-bold leading-tight animate-fade-in-up stagger-1">
                Transform
                <br />
                <span className="bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent gradient-animate">
                  Waste into Wealth
                </span>
              </h1>
              
              <p className="text-xl text-gray-400 leading-relaxed animate-fade-in-up stagger-2">
                Turn your organic food waste into instant cash. Track pickups in real-time, get paid instantly, and contribute to a greener planet.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up stagger-3">
                <button 
                  onClick={() => document.getElementById('submit-form').scrollIntoView({ behavior: 'smooth' })}
                  className="group bg-gradient-to-r from-emerald-500 to-teal-500 px-8 py-4 rounded-xl hover:shadow-2xl hover:shadow-emerald-500/50 transition-all flex items-center justify-center space-x-2 font-semibold"
                >
                  <span>Start Earning Now</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
                <button className="glass-effect px-8 py-4 rounded-xl hover:bg-white/10 transition flex items-center justify-center space-x-2">
                  <span>Watch Demo</span>
                  <Sparkles className="w-5 h-5" />
                </button>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-3 gap-4 pt-8 animate-fade-in-up stagger-4">
                <div className="glass-effect p-4 rounded-xl text-center">
                  <p className="text-3xl font-bold text-emerald-400">₹50K+</p>
                  <p className="text-xs text-gray-400 mt-1">Paid Out</p>
                </div>
                <div className="glass-effect p-4 rounded-xl text-center">
                  <p className="text-3xl font-bold text-teal-400">5000+</p>
                  <p className="text-xs text-gray-400 mt-1">Kg Collected</p>
                </div>
                <div className="glass-effect p-4 rounded-xl text-center">
                  <p className="text-3xl font-bold text-cyan-400">500+</p>
                  <p className="text-xs text-gray-400 mt-1">Users</p>
                </div>
              </div>
            </div>

            {/* Hero Visual */}
            <div className="relative animate-fade-in-up stagger-2">
              <div className="glass-effect rounded-3xl p-8 border-2 border-emerald-500/20">
                <div className="relative">
                  <img 
                    src="/api/placeholder/600/500" 
                    alt="Waste Collection" 
                    className="rounded-2xl w-full h-auto"
                  />
                  
                  {/* Floating Cards */}
                  <div className="absolute -top-4 -left-4 glass-effect p-4 rounded-xl shadow-xl animate-float">
                    <div className="flex items-center space-x-3">
                      <div className="bg-emerald-500/20 p-2 rounded-lg">
                        <TrendingUp className="w-5 h-5 text-emerald-400" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-400">This Month</p>
                        <p className="text-lg font-bold">₹2,450</p>
                      </div>
                    </div>
                  </div>

                  <div className="absolute -bottom-4 -right-4 glass-effect p-4 rounded-xl shadow-xl animate-float" style={{animationDelay: '1s'}}>
                    <div className="flex items-center space-x-3">
                      <div className="bg-teal-500/20 p-2 rounded-lg">
                        <CheckCircle className="w-5 h-5 text-teal-400" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-400">Verified</p>
                        <p className="text-lg font-bold">15 Pickups</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                Powerful Features
              </span>
            </h2>
            <p className="text-xl text-gray-400">Everything you need to manage waste efficiently</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="glass-effect p-6 rounded-2xl hover:bg-white/10 transition-all group cursor-pointer border border-white/5 hover:border-emerald-500/30"
              >
                <div className={`bg-gradient-to-br ${feature.color} p-3 rounded-xl w-fit mb-4 group-hover:scale-110 transition-transform`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-400 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Grid */}
      <section id="pricing" className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-emerald-950/20 to-transparent"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                Instant Pricing
              </span>
            </h2>
            <p className="text-xl text-gray-400">Transparent rates for every waste type</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {wasteCategories.map((category, index) => (
              <div 
                key={index}
                className="glass-effect p-6 rounded-2xl border border-white/5 hover:border-emerald-500/30 transition-all group cursor-pointer"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-4xl">{category.icon}</span>
                  <div className={`bg-gradient-to-br ${category.color} px-4 py-2 rounded-full font-bold text-sm`}>
                    {category.rate}/kg
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-2">{category.name}</h3>
                <p className="text-gray-400 text-sm mb-4">Fresh, quality waste preferred</p>
                <button className="w-full glass-effect py-2 rounded-lg hover:bg-emerald-500/10 transition text-sm font-semibold">
                  Select Category
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Advanced Submission Form */}
      <section id="submit-form" className="py-20 relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="glass-effect rounded-3xl p-8 border border-emerald-500/20">
            <div className="text-center mb-10">
              <h2 className="text-4xl font-bold mb-3">
                <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                  Submit Your Waste
                </span>
              </h2>
              <p className="text-gray-400">Fill in the details and get instant verification</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Personal Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold flex items-center space-x-2">
                  <User className="w-5 h-5 text-emerald-400" />
                  <span>Personal Information</span>
                </h3>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Full Name *</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full glass-effect px-4 py-3 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none border border-white/10"
                      placeholder="Enter your name"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Phone Number *</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full glass-effect px-4 py-3 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none border border-white/10"
                      placeholder="+91 98765 43210"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-gray-400 mb-2">Email Address *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full glass-effect px-4 py-3 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none border border-white/10"
                    placeholder="your.email@example.com"
                    required
                  />
                </div>
              </div>

              {/* Location Details */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold flex items-center space-x-2">
                  <MapPin className="w-5 h-5 text-emerald-400" />
                  <span>Location Details</span>
                </h3>
                
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Pickup Address *</label>
                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    className="w-full glass-effect px-4 py-3 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none border border-white/10 custom-scrollbar"
                    placeholder="Complete address with landmarks"
                    rows="3"
                    required
                  />
                </div>
              </div>

              {/* Waste Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold flex items-center space-x-2">
                  <Package className="w-5 h-5 text-emerald-400" />
                  <span>Waste Information</span>
                </h3>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Waste Type *</label>
                    <select
                      name="wasteType"
                      value={formData.wasteType}
                      onChange={handleInputChange}
                      className="w-full glass-effect px-4 py-3 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none border border-white/10"
                      required
                    >
                      <option value="">Select type</option>
                      {wasteCategories.map((cat, i) => (
                        <option key={i} value={cat.name}>{cat.icon} {cat.name}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Weight (kg) *</label>
                    <div className="relative">
                      <Weight className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="number"
                        name="estimatedWeight"
                        value={formData.estimatedWeight}
                        onChange={handleInputChange}
                        className="w-full glass-effect pl-12 pr-4 py-3 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none border border-white/10"
                        placeholder="0"
                        min="1"
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Frequency</label>
                    <select
                      name="frequency"
                      value={formData.frequency}
                      onChange={handleInputChange}
                      className="w-full glass-effect px-4 py-3 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none border border-white/10"
                    >
                      <option value="one-time">One-time Pickup</option>
                      <option value="weekly">Weekly</option>
                      <option value="bi-weekly">Bi-weekly</option>
                      <option value="monthly">Monthly</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Preferred Pickup</label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="datetime-local"
                        name="preferredPickup"
                        value={formData.preferredPickup}
                        onChange={handleInputChange}
                        className="w-full glass-effect pl-12 pr-4 py-3 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none border border-white/10"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Image Upload */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold flex items-center space-x-2">
                  <Camera className="w-5 h-5 text-emerald-400" />
                  <span>Upload Image (Optional)</span>
                </h3>
                
                <div className="border-2 border-dashed border-white/10 rounded-xl p-8 text-center hover:border-emerald-500/30 transition cursor-pointer">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    id="image-upload"
                  />
                  <label htmlFor="image-upload" className="cursor-pointer">
                    {imagePreview ? (
                      <div className="space-y-4">
                        <img src={imagePreview} alt="Preview" className="max-h-48 mx-auto rounded-lg" />
                        <button 
                          type="button"
                          onClick={() => {setImagePreview(null); setSelectedImage(null);}}
                          className="text-sm text-red-400 hover:text-red-300"
                        >
                          Remove Image
                        </button>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        <div className="bg-emerald-500/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto">
                          <ImageIcon className="w-8 h-8 text-emerald-400" />
                        </div>
                        <div>
                          <p className="text-white font-medium">Click to upload image</p>
                          <p className="text-sm text-gray-400">PNG, JPG up to 5MB</p>
                        </div>
                      </div>
                    )}
                  </label>
                </div>
              </div>

              {/* Payment Method */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold flex items-center space-x-2">
                  <CreditCard className="w-5 h-5 text-emerald-400" />
                  <span>Payment Method</span>
                </h3>
                
                <div className="grid grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={() => setFormData({...formData, paymentMethod: 'bank'})}
                    className={`glass-effect p-4 rounded-xl border-2 transition ${
                      formData.paymentMethod === 'bank' 
                        ? 'border-emerald-500 bg-emerald-500/10' 
                        : 'border-white/10'
                    }`}
                  >
                    <p className="font-semibold">Bank Transfer</p>
                    <p className="text-xs text-gray-400 mt-1">Direct to account</p>
                  </button>

                  <button
                    type="button"
                    onClick={() => setFormData({...formData, paymentMethod: 'upi'})}
                    className={`glass-effect p-4 rounded-xl border-2 transition ${
                      formData.paymentMethod === 'upi' 
                        ? 'border-emerald-500 bg-emerald-500/10' 
                        : 'border-white/10'
                    }`}
                  >
                    <p className="font-semibold">UPI</p>
                    <p className="text-xs text-gray-400 mt-1">Instant payment</p>
                  </button>
                </div>
              </div>

              {/* Additional Notes */}
              <div>
                <label className="block text-sm text-gray-400 mb-2">Additional Notes</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  className="w-full glass-effect px-4 py-3 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none border border-white/10 custom-scrollbar"
                  placeholder="Any special instructions or details..."
                  rows="3"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 py-4 rounded-xl hover:shadow-2xl hover:shadow-emerald-500/50 transition-all font-semibold text-lg flex items-center justify-center space-x-2 group"
              >
                <span>Submit Request</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>

              <p className="text-center text-sm text-gray-400">
                By submitting, you agree to our Terms of Service and Privacy Policy
              </p>
            </form>
          </div>
        </div>
      </section>

      {/* Impact Dashboard */}
      <section id="impact" className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-emerald-950/20 via-transparent to-emerald-950/20"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                Our Environmental Impact
              </span>
            </h2>
            <p className="text-xl text-gray-400">Making a real difference, together</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {impactMetrics.map((metric, index) => (
              <div 
                key={index}
                className="glass-effect p-6 rounded-2xl border border-white/5 hover:border-emerald-500/30 transition-all"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="bg-emerald-500/10 p-3 rounded-xl text-emerald-400">
                    {metric.icon}
                  </div>
                  <span className="text-emerald-400 text-sm font-semibold">{metric.change}</span>
                </div>
                <p className={`text-4xl font-bold mb-2 ${animateStats ? 'animate-fade-in-up' : 'opacity-0'}`}>
                  {metric.value}
                </p>
                <p className="text-gray-400 text-sm">{metric.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                What People Say
              </span>
            </h2>
            <p className="text-xl text-gray-400">Real stories from our community</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <div 
                key={index}
                className="glass-effect p-6 rounded-2xl border border-white/5 hover:border-emerald-500/30 transition-all"
              >
                <div className="flex items-center space-x-3 mb-4">
                  <div className="text-4xl">{testimonial.image}</div>
                  <div>
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-sm text-gray-400">{testimonial.role}</p>
                  </div>
                </div>
                <div className="flex space-x-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-300 text-sm italic">"{testimonial.text}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-600/20 to-teal-600/20 backdrop-blur-3xl"></div>
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <h2 className="text-5xl font-bold mb-6">
            Ready to Make a
            <br />
            <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
              Positive Impact?
            </span>
          </h2>
          <p className="text-xl text-gray-400 mb-8">
            Join thousands of waste warriors turning trash into treasure
          </p>
          <button 
            onClick={() => document.getElementById('submit-form').scrollIntoView({ behavior: 'smooth' })}
            className="bg-gradient-to-r from-emerald-500 to-teal-500 px-12 py-5 rounded-xl hover:shadow-2xl hover:shadow-emerald-500/50 transition-all font-semibold text-lg inline-flex items-center space-x-3"
          >
            <span>Get Started Today</span>
            <Sparkles className="w-5 h-5" />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-12 mb-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="bg-gradient-to-br from-emerald-400 to-teal-600 p-2 rounded-xl">
                  <Leaf className="w-6 h-6 text-white" />
                </div>
                <span className="text-xl font-bold">EcoWaste</span>
              </div>
              <p className="text-gray-400 text-sm">
                Transforming waste into wealth, one pickup at a time.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="#home" className="hover:text-emerald-400 transition">Home</a></li>
                <li><a href="#features" className="hover:text-emerald-400 transition">Features</a></li>
                <li><a href="#pricing" className="hover:text-emerald-400 transition">Pricing</a></li>
                <li><a href="#impact" className="hover:text-emerald-400 transition">Impact</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Services</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="#" className="hover:text-emerald-400 transition">Waste Collection</a></li>
                <li><a href="#" className="hover:text-emerald-400 transition">Recycling</a></li>
                <li><a href="#" className="hover:text-emerald-400 transition">Composting</a></li>
                <li><a href="#" className="hover:text-emerald-400 transition">Consultation</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <ul className="space-y-3 text-gray-400 text-sm">
                <li className="flex items-center space-x-2">
                  <Phone className="w-4 h-4" />
                  <span>+91 98765 43210</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Mail className="w-4 h-4" />
                  <span>hello@ecowaste.com</span>
                </li>
                <li className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4" />
                  <span>Green Street, Eco City</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
            <p>&copy; 2024 EcoWaste. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="hover:text-emerald-400 transition">Privacy</a>
              <a href="#" className="hover:text-emerald-400 transition">Terms</a>
              <a href="#" className="hover:text-emerald-400 transition">Cookies</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
