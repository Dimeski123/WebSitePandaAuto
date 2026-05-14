import React from 'react';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

const Contact: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 flex-1 w-full bg-[#050505]">
      <div className="flex flex-col md:flex-row gap-16">
        <div className="w-full md:w-1/2">
          <h1 className="text-3xl font-bold uppercase italic tracking-tighter text-white mb-8 border-b border-white/10 pb-4">
            <span className="text-red-600">Contact</span> Us
          </h1>
          <p className="text-lg text-white/60 mb-8">
            Have a question about a vehicle or want to schedule a test drive? We're here to help. Reach out to us using the form or contact details below.
          </p>
          
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="bg-red-600/10 p-3 rounded-none">
                <MapPin className="w-5 h-5 text-red-600" />
              </div>
              <div>
                <h3 className="font-bold text-white uppercase tracking-widest text-xs">Our Location</h3>
                <p className="text-white/60 text-sm mt-1">Alexanderplatz 1, 10178 Berlin, Germany</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="bg-red-600/10 p-3 rounded-none">
                <Phone className="w-5 h-5 text-red-600" />
              </div>
              <div>
                <h3 className="font-bold text-white uppercase tracking-widest text-xs">Phone Number</h3>
                <p className="text-white/60 text-sm mt-1">+49 30 1234 5678</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="bg-red-600/10 p-3 rounded-none">
                <Mail className="w-5 h-5 text-red-600" />
              </div>
              <div>
                <h3 className="font-bold text-white uppercase tracking-widest text-xs">Email Address</h3>
                <p className="text-white/60 text-sm mt-1">info@pandaauto.de</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="bg-red-600/10 p-3 rounded-none">
                <Clock className="w-5 h-5 text-red-600" />
              </div>
              <div>
                <h3 className="font-bold text-white uppercase tracking-widest text-xs">Business Hours</h3>
                <p className="text-white/60 text-sm mt-1">Mon-Fri: 9:00 AM - 6:00 PM<br/>Sat: 10:00 AM - 4:00 PM<br/>Sun: Closed</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="w-full md:w-1/2 bg-[#121212] p-8 border border-white/5">
          <h2 className="text-xl font-bold uppercase tracking-widest text-white mb-6">Send us a message</h2>
          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div>
              <label className="block text-xs font-semibold text-white/40 uppercase tracking-widest mb-2">Full Name</label>
              <input type="text" className="w-full px-4 py-3 bg-[#1a1a1a] border border-white/10 text-white focus:ring-1 focus:ring-red-600 focus:border-red-600 outline-none transition-colors" placeholder="John Doe" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-white/40 uppercase tracking-widest mb-2">Email</label>
              <input type="email" className="w-full px-4 py-3 bg-[#1a1a1a] border border-white/10 text-white focus:ring-1 focus:ring-red-600 focus:border-red-600 outline-none transition-colors" placeholder="john@example.com" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-white/40 uppercase tracking-widest mb-2">Message</label>
              <textarea rows={5} className="w-full px-4 py-3 bg-[#1a1a1a] border border-white/10 text-white focus:ring-1 focus:ring-red-600 focus:border-red-600 outline-none transition-colors" placeholder="I'm interested in..."></textarea>
            </div>
            <button className="w-full bg-red-600 text-white hover:bg-red-700 tracking-widest uppercase text-xs font-bold py-4 transition-colors">
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
