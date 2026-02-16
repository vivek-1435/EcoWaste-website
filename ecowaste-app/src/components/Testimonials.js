
import React, { useState, useEffect } from 'react';
import { Star } from 'lucide-react';
import { wasteAPI } from '../services/api';

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState([
    {
      name: "Priya Sharma",
      role: "Home Baker",
      image: "👩‍🍳",
      rating: 5,
      text: "Earned ₹5000+ in just 2 months! The pickup is always on time and the process is super smooth.",
    },
    {
      name: "Rajesh Kumar",
      role: "Restaurant Owner",
      image: "👨‍🍳",
      rating: 5,
      text: "Finally a sustainable solution for our food waste. Great rates and professional service.",
    },
    {
      name: "Anita Patel",
      role: "Grocery Store",
      image: "👩‍💼",
      rating: 5,
      text: "Love the real-time tracking feature. Makes waste management so much easier and profitable!",
    },
  ]);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await wasteAPI.getTestimonials();
        if (response.success && response.data.length > 0) {
          const formattedTestimonials = response.data.map((t) => ({
            name: t.user?.name || 'Anonymous Eco Warrior',
            role: 'Verified User',
            image: '👤', // Could use random emoji or user avatar if available
            rating: t.feedback.rating,
            text: t.feedback.comment,
          }));
          setTestimonials(formattedTestimonials);
        }
      } catch (error) {
        console.error('Failed to fetch testimonials');
      }
    };
    fetchTestimonials();
  }, []);

  return (
    <section className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
              What People Say
            </span>
          </h2>
          <p className="text-xl text-gray-400">
            Real stories from our community
          </p>
        </div>

        <div className="relative w-full overflow-hidden">
          {/* Gradient Masks for fading effect */}
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-gray-900 to-transparent z-10"></div>
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-gray-900 to-transparent z-10"></div>

          <div className="flex space-x-4 md:space-x-6 animate-scroll w-max">
            {[...testimonials, ...testimonials].map((testimonial, index) => (
              <div
                key={index}
                className="w-72 md:w-96 flex-shrink-0 glass-effect p-6 rounded-2xl border border-white/5 hover:border-emerald-500/30 transition-all"
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
                    <Star
                      key={i}
                      className="w-4 h-4 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>
                <p className="text-gray-300 text-sm italic">
                  "{testimonial.text}"
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
