import React, { useEffect, useState } from 'react';
import { getCars, Car } from '../api/cars';
import CarCard from '../components/CarCard';
import { Filter } from 'lucide-react';

const Categories: React.FC = () => {
  const [cars, setCars] = useState<Car[]>([]);
  const [filteredCars, setFilteredCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  
  const categories = ['All', 'Sedan', 'SUV', 'Coupe', 'Hatchback', 'Convertible', 'Wagon'];

  useEffect(() => {
    const fetchAllCars = async () => {
      try {
        const fetchedCars = await getCars();
        setCars(fetchedCars);
        setFilteredCars(fetchedCars);
      } catch (error) {
        console.error("Error fetching cars:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchAllCars();
  }, []);

  useEffect(() => {
    if (selectedCategory === 'All') {
      setFilteredCars(cars);
    } else {
      setFilteredCars(cars.filter(car => car.category.toLowerCase() === selectedCategory.toLowerCase()));
    }
  }, [selectedCategory, cars]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex-1 w-full bg-[#050505]">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6 border-b border-white/10 pb-6">
        <div>
          <h1 className="text-3xl font-bold uppercase italic tracking-tighter text-white border-none pl-0">Our <span className="text-red-600">Vehicles</span></h1>
          <p className="text-white/60 mt-2 pl-0">Browse our complete inventory of premium cars</p>
        </div>
        
        <div className="flex items-center gap-2 flex-wrap w-full md:w-auto pb-2 justify-center md:justify-start">
          <Filter className="w-5 h-5 text-white/40 shrink-0 mr-2 hidden md:block" />
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 text-xs font-semibold uppercase tracking-widest transition-colors text-center ${
                selectedCategory === cat 
                  ? 'bg-red-600 text-white' 
                  : 'bg-white/5 text-white/60 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600"></div>
        </div>
      ) : filteredCars.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredCars.map(car => (
            <CarCard key={car.id} car={car} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-[#121212] border border-white/5">
          <h3 className="text-xl font-bold uppercase tracking-widest mb-2 text-white">No vehicles found</h3>
          <p className="text-white/50 text-sm">We currently don't have any vehicles in the "{selectedCategory}" category.</p>
          <button 
            onClick={() => setSelectedCategory('All')}
            className="mt-6 bg-white/5 text-white px-6 py-3 uppercase tracking-widest text-xs font-bold hover:bg-red-600 transition-colors"
          >
            View All Vehicles
          </button>
        </div>
      )}
    </div>
  );
};

export default Categories;
