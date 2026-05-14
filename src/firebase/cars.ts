export interface Car {
  id?: string;
  make: string;
  model: string;
  year: number;
  price: number;
  mileage: number;
  fuelType: string;
  transmission: string;
  description: string;
  images: string[];
  category: string;
  isPopular: boolean;
  createdAt?: number;
  updatedAt?: number;
}

const STORAGE_KEY = 'panda_auto_cars';

const getStoredCars = (): Car[] => {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
};

const saveStoredCars = (cars: Car[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(cars));
};

export const getCars = async (): Promise<Car[]> => {
  const cars = getStoredCars();
  return cars.sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
};

export const getPopularCars = async (): Promise<Car[]> => {
  const cars = getStoredCars().filter(c => c.isPopular);
  return cars.sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
};

export const getCar = async (id: string): Promise<Car | null> => {
  const cars = getStoredCars();
  return cars.find(c => c.id === id) || null;
};

export const addCar = async (car: Omit<Car, 'id' | 'createdAt' | 'updatedAt'>): Promise<void> => {
  const cars = getStoredCars();
  const newCar: Car = {
    ...car,
    id: crypto.randomUUID ? crypto.randomUUID() : Date.now().toString(),
    createdAt: Date.now(),
    updatedAt: Date.now(),
  };
  cars.push(newCar);
  saveStoredCars(cars);
};

export const updateCar = async (id: string, car: Partial<Omit<Car, 'id' | 'createdAt' | 'updatedAt'>>): Promise<void> => {
  const cars = getStoredCars();
  const index = cars.findIndex(c => c.id === id);
  if (index !== -1) {
    cars[index] = { ...cars[index], ...car, updatedAt: Date.now() };
    saveStoredCars(cars);
  } else {
    throw new Error("Car not found");
  }
};

export const deleteCar = async (id: string): Promise<void> => {
  let cars = getStoredCars();
  cars = cars.filter(c => c.id !== id);
  saveStoredCars(cars);
};
