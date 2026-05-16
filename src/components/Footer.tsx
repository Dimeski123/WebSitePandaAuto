import React from 'react';
import { Car, MapPin, Phone, Mail } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#0a0a0a] text-white pt-12 pb-8 border-t border-white/10 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <img 
                src="/Images/LogoFinalPNG.png" 
                alt="Panda Auto Logo" 
                className="h-24 md:h-32 w-auto object-contain drop-shadow-xl transition-all duration-500 hover:scale-110" 
              />
              <span className="font-bold text-2xl md:text-3xl tracking-tighter uppercase text-white">
                Panda Auto
              </span>
            </div>
            <p className="text-white/40 text-sm mb-4 leading-relaxed">
              Your trusted partner for premium used cars in Germany. Quality, reliability, and excellent customer service.
            </p>
          </div>
          <div>
            <h3 className="text-xs font-semibold text-white/40 uppercase tracking-widest mb-4 border-b border-white/10 pb-2 inline-block">Quick Links</h3>
            <ul className="space-y-2 text-white/60 text-sm uppercase tracking-widest text-xs font-medium">
              <li><a href="/" className="hover:text-red-500 transition-colors">Home</a></li>
              <li><a href="/categories" className="hover:text-red-500 transition-colors">Categories</a></li>
              <li><a href="/about" className="hover:text-red-500 transition-colors">About Us</a></li>
              <li><a href="/contact" className="hover:text-red-500 transition-colors">Contact</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-xs font-semibold text-white/40 uppercase tracking-widest mb-4 border-b border-white/10 pb-2 inline-block">Contact Info</h3>
            <ul className="space-y-3 text-white/60 text-sm uppercase tracking-widest text-xs">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-red-600 shrink-0" />
                <span>Karl Mantel Straße 65, Krumbach 86381</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-red-600 shrink-0" />
                <span>+49 1729029816</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-red-600 shrink-0" />
                <span>info@pan-da-auto.com</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-white/30 text-xs uppercase tracking-widest text-center md:text-left mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} Panda Auto Germany. All rights reserved.
          </p>
          <div className="flex space-x-4">
            {/* Social icons can go here */}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
