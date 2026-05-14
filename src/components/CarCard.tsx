import React from 'react';
import { Link } from 'react-router-dom';
import { Car as CarType } from '../firebase/cars';
import { Settings, Gauge, Fuel } from 'lucide-react';

const CarCard: React.FC<{ car: CarType }> = ({ car }) => {
  const mainImage = car.images && car.images.length > 0 ? car.images[0] : 'https://images.unsplash.com/photo-1550310237-7724a1795e1e?q=80&w=600&auto=format&fit=crop';
  
  return (
    <div className="group bg-[#121212] border border-white/5 overflow-hidden hover:border-red-600/50 transition-colors flex flex-col cursor-pointer">
      <Link to={`/car/${car.id}`} className="contents">
        <div className="relative h-48 overflow-hidden bg-[#1a1a1a]">
          <img 
            src={mainImage} 
            alt={`${car.make} ${car.model}`}
            className="w-full h-full object-cover opacity-80 group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute top-4 left-4">
            <span className="bg-red-600 text-white text-[10px] font-black px-2 py-1 uppercase tracking-widest">
              {car.category}
            </span>
          </div>
        </div>
      </Link>
      <div className="p-5 flex-1 flex flex-col">
        <Link to={`/car/${car.id}`} className="contents">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-lg font-bold uppercase tracking-tight text-white group-hover:text-red-500 transition-colors">
              {car.make} {car.model}
            </h3>
            <div className="text-red-600 font-bold ml-2">
              €{car.price.toLocaleString()}
            </div>
          </div>
          
          <p className="text-white/40 text-xs mb-4 line-clamp-2 flex-1">
            {car.description}
          </p>
        </Link>

        <div className="grid grid-cols-3 gap-2 py-4 border-t border-white/10 mt-auto">
          <div className="flex flex-col items-center">
            <span className="text-[10px] text-white/40 uppercase tracking-widest">{car.mileage.toLocaleString()} km</span>
          </div>
          <div className="flex flex-col items-center border-x border-white/10">
            <span className="text-[10px] text-white/40 uppercase tracking-widest">{car.fuelType}</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-[10px] text-white/40 uppercase tracking-widest">{car.transmission}</span>
          </div>
        </div>
        
        <Link to={`/car/${car.id}`} className="w-full text-center mt-4 bg-white/5 hover:bg-red-600 text-white text-xs font-bold uppercase tracking-widest py-3 transition-colors duration-300 block">
          View Details
        </Link>
      </div>
    </div>
  );
};

export default CarCard;
