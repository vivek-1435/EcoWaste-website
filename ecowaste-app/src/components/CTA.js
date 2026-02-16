
import React from 'react';
import { Sparkles } from 'lucide-react';

export default function CTA({ onScrollToForm }) {
  return (
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
          onClick={onScrollToForm}
          className="bg-gradient-to-r from-emerald-500 to-teal-500 px-12 py-5 rounded-xl hover:shadow-2xl hover:shadow-emerald-500/50 transition-all font-semibold text-lg inline-flex items-center space-x-3"
        >
          <span>Get Started Today</span>
          <Sparkles className="w-5 h-5" />
        </button>
      </div>
    </section>
  );
}
