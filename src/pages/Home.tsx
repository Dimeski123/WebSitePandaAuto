import React, { useEffect, useState } from 'react';
import { getPopularCars, Car } from '../firebase/cars';
import CarCard from '../components/CarCard';
import { ArrowRight, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  const [popularCars, setPopularCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPopular = async () => {
      try {
        const cars = await getPopularCars();
        setPopularCars(cars);
      } catch (error) {
        console.error("Error fetching popular cars:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPopular();
  }, []);

  return (
    <div className="flex-1 bg-[#050505]">
      {/* Hero Banner */}
      <div className="relative bg-[#050505] h-[80vh] flex items-center mb-16 px-4">
        <div className="absolute inset-0 z-0 opacity-40 bg-[url('https://images.unsplash.com/photo-1549399542-7e3f8b79c341?q=80&w=2600&auto=format&fit=crop')] bg-cover bg-center"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] to-transparent z-0"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-[#050505]/80 to-transparent z-0"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto w-full">
          <div className="max-w-3xl">
            <div className="inline-block bg-red-600 text-white text-xs font-black px-3 py-1 mb-4 uppercase tracking-tighter">Established in Germany</div>
            <h1 className="text-6xl md:text-8xl font-black italic uppercase leading-none tracking-tighter mb-6">
              Engineered<br/><span className="text-red-600">Prestige.</span>
            </h1>
            <p className="text-white/60 max-w-lg text-lg leading-tight mb-10">
              Experience the pinnacle of German automotive excellence. From autobahn classics to bespoke imports. Unmatched quality.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/categories" className="bg-red-600 text-white hover:bg-red-700 uppercase tracking-widest text-xs font-bold px-8 py-4 flex items-center justify-center transition-colors">
                Browse Collection
              </Link>
              <Link to="/contact" className="bg-white/5 text-white hover:bg-white/10 uppercase tracking-widest text-xs font-bold px-8 py-4 flex items-center justify-center transition-colors">
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Most Popular Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24 bg-[#050505]">
        <div className="flex justify-between items-end mb-8">
          <h2 className="text-3xl font-bold uppercase italic tracking-tighter text-white"><span className="text-red-600">Most</span> Popular</h2>
          <div className="h-px flex-1 mx-8 bg-white/10 mb-2 hidden md:block"></div>
          <Link to="/categories" className="text-xs font-bold uppercase tracking-widest text-white/40 hover:text-red-500 transition-colors">
            View Catalog
          </Link>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600"></div>
          </div>
        ) : popularCars.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {popularCars.map(car => (
              <CarCard key={car.id} car={car} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-[#121212] border border-white/5">
            <h3 className="text-white font-bold uppercase tracking-widest mb-2">No popular cars listed yet.</h3>
            <p className="text-white/40 text-sm">Check back later or browse our categories.</p>
          </div>
        )}
      </div>
      
      {/* Features Section */}
      <div className="bg-[#0a0a0a] border-t border-white/5 border-b py-24 mb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-12 text-center">
            <div>
              <div className="text-6xl font-black italic text-red-600 mb-4 opacity-50 tracking-tighter">01</div>
              <h3 className="text-lg font-bold uppercase tracking-widest mb-3 text-white">Premium Quality</h3>
              <p className="text-white/60 text-sm">Every vehicle undergoes a rigorous 150-point inspection.</p>
            </div>
            <div>
              <div className="text-6xl font-black italic text-white/10 mb-4 tracking-tighter">02</div>
              <h3 className="text-lg font-bold uppercase tracking-widest mb-3 text-white">Bespoke Imports</h3>
              <p className="text-white/60 text-sm">We find exactly what you're looking for, no compromises.</p>
            </div>
            <div>
              <div className="text-6xl font-black italic text-white/10 mb-4 tracking-tighter">03</div>
              <h3 className="text-lg font-bold uppercase tracking-widest mb-3 text-white">Lifetime Support</h3>
              <p className="text-white/60 text-sm">Our customer service doesn't end when you drive off the lot.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
