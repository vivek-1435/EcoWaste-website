
import React from 'react';
import { impactMetrics } from '../constants/data';

export default function Impact({ animateStats }) {
  return (
    <section id="impact" className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-emerald-950/20 via-transparent to-emerald-950/20"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
              Our Environmental Impact
            </span>
          </h2>
          <p className="text-xl text-gray-400">
            Making a real difference, together
          </p>
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
                <span className="text-emerald-400 text-sm font-semibold">
                  {metric.change}
                </span>
              </div>
              <p
                className={`text-4xl font-bold mb-2 ${animateStats ? "animate-fade-in-up" : "opacity-0"}`}
              >
                {metric.value}
              </p>
              <p className="text-gray-400 text-sm">{metric.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
