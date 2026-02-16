
import React from 'react';
import { wasteCategories } from '../constants/data';

export default function Pricing() {
  return (
    <section id="pricing" className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-emerald-950/20 to-transparent"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
              Instant Pricing
            </span>
          </h2>
          <p className="text-xl text-gray-400">
            Transparent rates for every waste type
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {wasteCategories.map((category, index) => (
            <div
              key={index}
              className="glass-effect p-6 rounded-2xl border border-white/5 hover:border-emerald-500/30 transition-all group cursor-pointer"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-4xl">{category.icon}</span>
                <div
                  className={`bg-gradient-to-br ${category.color} px-4 py-2 rounded-full font-bold text-sm`}
                >
                  {category.rate}/kg
                </div>
              </div>
              <h3 className="text-xl font-bold mb-2">{category.name}</h3>
              <p className="text-gray-400 text-sm mb-4">
                Fresh, quality waste preferred
              </p>
              <button className="w-full glass-effect py-2 rounded-lg hover:bg-emerald-500/10 transition text-sm font-semibold">
                Select Category
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
