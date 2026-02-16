
import React from 'react';
import { Sparkles, ArrowRight, TrendingUp, CheckCircle } from 'lucide-react';

export default function Hero({ onScrollToForm }) {
  return (
    <section
      id="home"
      className="relative pt-32 pb-20 overflow-hidden noise-bg"
    >
      {/* Animated Background Elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-emerald-500/20 rounded-full blur-3xl animate-float"></div>
      <div
        className="absolute bottom-20 right-10 w-96 h-96 bg-teal-500/20 rounded-full blur-3xl animate-float"
        style={{ animationDelay: "2s" }}
      ></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div className="inline-flex glass-effect px-4 py-2 rounded-full text-sm animate-fade-in-up">
              <span className="text-emerald-400 mr-2">✨</span>
              <span className="text-gray-300">Join 500+ waste warriors</span>
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight animate-fade-in-up stagger-1">
              Transform
              <br />
              <span className="bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent gradient-animate">
                Waste into Wealth
              </span>
            </h1>

            <p className="text-xl text-gray-400 leading-relaxed animate-fade-in-up stagger-2">
              Turn your organic food waste into instant cash. Track pickups in
              real-time, get paid instantly, and contribute to a greener
              planet.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up stagger-3">
              <button
                onClick={onScrollToForm}
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

                <div
                  className="absolute -bottom-4 -right-4 glass-effect p-4 rounded-xl shadow-xl animate-float"
                  style={{ animationDelay: "1s" }}
                >
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
  );
}
