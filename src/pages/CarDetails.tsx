import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getCar, Car } from '../api/cars';
import { ChevronLeft, ChevronRight, ArrowLeft, Settings, Gauge, Fuel } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const CarDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [car, setCar] = useState<Car | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const fetchCar = async () => {
      if (id) {
        try {
          const fetchedCar = await getCar(id);
          setCar(fetchedCar);
        } catch (error) {
          console.error("Error fetching car:", error);
        } finally {
          setLoading(false);
        }
      }
    };
    fetchCar();
  }, [id]);

  const nextImage = () => {
    if (car?.images) {
      setCurrentImageIndex((prev) => (prev + 1) % car.images.length);
    }
  };

  const prevImage = () => {
    if (car?.images) {
      setCurrentImageIndex((prev) => (prev - 1 + car.images.length) % car.images.length);
    }
  };

  if (loading) {
    return (
      <div className="flex-1 flex justify-center items-center bg-[#050505]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600"></div>
      </div>
    );
  }

  if (!car) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center bg-[#050505]">
        <h2 className="text-2xl font-bold uppercase tracking-widest text-white mb-4">Vehicle Not Found</h2>
        <Link to="/categories" className="text-red-600 hover:text-red-500 font-bold uppercase tracking-widest text-xs flex items-center">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Catalog
        </Link>
      </div>
    );
  }

  const images = car.images && car.images.length > 0 ? car.images : ['https://images.unsplash.com/photo-1550310237-7724a1795e1e?q=80&w=600&auto=format&fit=crop'];

  return (
    <div className="flex-1 bg-[#050505] py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link to="/categories" className="inline-flex items-center text-white/40 hover:text-white uppercase tracking-widest text-xs font-bold mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Vehicles
        </Link>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image Gallery */}
          <div>
            <div className="relative aspect-[4/3] bg-[#1a1a1a] mb-4 group border border-white/5 overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.img 
                  key={currentImageIndex}
                  src={images[currentImageIndex]} 
                  alt={`${car.make} ${car.model}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </AnimatePresence>
              {images.length > 1 && (
                <>
                  <button 
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-3 hover:bg-red-600 transition-colors opacity-0 group-hover:opacity-100 z-10"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <button 
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-3 hover:bg-red-600 transition-colors opacity-0 group-hover:opacity-100 z-10"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </>
              )}
              <div className="absolute top-4 left-4 z-10">
                <span className="bg-red-600 text-white text-[10px] font-black px-3 py-1 uppercase tracking-widest">
                  {car.category}
                </span>
              </div>
            </div>
            
            {images.length > 1 && (
              <div className="flex gap-4 overflow-x-auto pb-4 hide-scrollbar">
                {images.map((img, idx) => (
                  <button 
                    key={idx}
                    onClick={() => setCurrentImageIndex(idx)}
                    className={`flex-shrink-0 w-24 h-18 border-2 transition-all ${currentImageIndex === idx ? 'border-red-600' : 'border-transparent opacity-50 hover:opacity-100'}`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Car Info */}
          <div>
            <div className="border-b border-white/10 pb-6 mb-6">
              <h1 className="text-4xl md:text-5xl font-black uppercase italic tracking-tighter text-white mb-2">
                {car.make} <span className="text-red-600">{car.model}</span>
              </h1>
              <div className="text-3xl font-bold text-white mb-4">
                €{car.price.toLocaleString()}
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-10">
              <div className="bg-[#121212] border border-white/5 p-4 flex flex-col items-center justify-center">
                <Gauge className="w-6 h-6 text-red-600 mb-2" />
                <span className="text-[10px] text-white/40 uppercase tracking-widest mb-1">Mileage</span>
                <span className="text-sm font-bold text-white">{car.mileage.toLocaleString()} km</span>
              </div>
              <div className="bg-[#121212] border border-white/5 p-4 flex flex-col items-center justify-center">
                <Fuel className="w-6 h-6 text-red-600 mb-2" />
                <span className="text-[10px] text-white/40 uppercase tracking-widest mb-1">Fuel Type</span>
                <span className="text-sm font-bold text-white">{car.fuelType}</span>
              </div>
              <div className="bg-[#121212] border border-white/5 p-4 flex flex-col items-center justify-center">
                <Settings className="w-6 h-6 text-red-600 mb-2" />
                <span className="text-[10px] text-white/40 uppercase tracking-widest mb-1">Transmission</span>
                <span className="text-sm font-bold text-white">{car.transmission}</span>
              </div>
              <div className="bg-[#121212] border border-white/5 p-4 flex flex-col items-center justify-center">
                <span className="text-[10px] text-white/40 uppercase tracking-widest mb-1">Year</span>
                <span className="text-sm font-bold text-white">{car.year}</span>
              </div>
            </div>

            <div className="mb-10">
              <h3 className="text-lg font-bold uppercase tracking-widest text-white mb-4">Vehicle Description</h3>
              <p className="text-white/60 leading-relaxed text-sm whitespace-pre-wrap">
                {car.description}
              </p>
            </div>

            <div className="flex gap-4">
              <Link to="/contact" className="flex-1 bg-red-600 text-white text-center hover:bg-red-700 uppercase tracking-widest text-xs font-bold py-5 transition-colors">
                Contact Dealer
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarDetails;
