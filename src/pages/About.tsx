import React from 'react';

const About: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 flex-1 w-full bg-[#050505]">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold uppercase italic tracking-tighter text-white mb-8 border-b border-white/10 pb-4">
          <span className="text-red-600">About</span> Panda Auto
        </h1>
        
        <div className="prose prose-lg text-white/60">
          <p className="text-lg mb-6 leading-relaxed">
            Welcome to Panda Auto, Germany's premier destination for high-quality used vehicles. Located in the heart of Berlin, we've built our reputation on trust, transparency, and a genuine passion for cars.
          </p>
          
          <img 
            src="https://i.pinimg.com/originals/11/b7/d5/11b7d5bdae11a711cacf206bc19ff829.jpg" 
            alt="Dealership Showroom" 
            className="w-full h-80 object-cover my-8 grayscale hover:grayscale-0 transition-all duration-500"
          />
          
          <h2 className="text-xl font-bold uppercase tracking-widest text-white mb-4 mt-8">Our Mission</h2>
          <p className="mb-6 text-sm">
            We believe that buying a used car shouldn't be stressful. Our mission is to provide a seamless, enjoyable customer experience from the moment you step onto our lot to the day you drive your new car home. Every vehicle we sell undergoes a rigorous inspection to ensure it meets our strict standards for quality and safety.
          </p>
          
          <h2 className="text-xl font-bold uppercase tracking-widest text-white mb-4 mt-8">Why Choose Us?</h2>
          <ul className="list-disc pl-6 mb-6 space-y-2 text-sm">
            <li><strong className="text-white">Premium Selection:</strong> Hand-picked vehicles from trusted sources.</li>
            <li><strong className="text-white">Transparent History:</strong> Full vehicle history reports available for every car.</li>
            <li><strong className="text-white">Fair Pricing:</strong> No haggle, competitive pricing right upfront.</li>
            <li><strong className="text-white">Financing Options:</strong> We work with top lenders to get you the best rates.</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default About;
