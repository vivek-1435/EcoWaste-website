
import React from 'react';
import { Leaf, Phone, Mail, MapPin } from 'lucide-react';

export default function Footer() {
  return (
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
              <li>
                <a href="#home" className="hover:text-emerald-400 transition">
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#features"
                  className="hover:text-emerald-400 transition"
                >
                  Features
                </a>
              </li>
              <li>
                <a
                  href="#pricing"
                  className="hover:text-emerald-400 transition"
                >
                  Pricing
                </a>
              </li>
              <li>
                <a
                  href="#impact"
                  className="hover:text-emerald-400 transition"
                >
                  Impact
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Services</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li>
                <button className="hover:text-emerald-400 transition text-left">
                  Waste Collection
                </button>
              </li>
              <li>
                <button className="hover:text-emerald-400 transition text-left">
                  Recycling
                </button>
              </li>
              <li>
                <button className="hover:text-emerald-400 transition text-left">
                  Composting
                </button>
              </li>
              <li>
                <button className="hover:text-emerald-400 transition text-left">
                  Consultation
                </button>
              </li>
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
          <p>&copy; 2026 EcoWaste. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <button className="hover:text-emerald-400 transition text-sm">
              Privacy
            </button>
            <button className="hover:text-emerald-400 transition text-sm">
              Terms
            </button>
            <button className="hover:text-emerald-400 transition text-sm">
              Cookies
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
