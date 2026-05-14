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

// Tip: You might want to move this base URL into a .env file later (e.g. process.env.REACT_APP_API_URL)
const API_BASE_URL = 'http://localhost:8000';

export const getCars = async (): Promise<Car[]> => {
  const response = await fetch(`${API_BASE_URL}/getCars.php`);
  if (!response.ok) throw new Error('Failed to fetch cars');
  return response.json();
};

export const getPopularCars = async (): Promise<Car[]> => {
  const cars = await getCars();
  return cars.filter(c => c.isPopular);
};

export const getCar = async (id: string): Promise<Car | null> => {
  const cars = await getCars();
  return cars.find(c => c.id?.toString() === id.toString()) || null;
};

export const addCar = async (car: Omit<Car, 'id' | 'createdAt' | 'updatedAt'>): Promise<void> => {
  const response = await fetch(`${API_BASE_URL}/addCar.php`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(car),
  });
  if (!response.ok) throw new Error('Failed to add car');
};

export const updateCar = async (id: string, car: Partial<Omit<Car, 'id' | 'createdAt' | 'updatedAt'>>): Promise<void> => {
  const response = await fetch(`${API_BASE_URL}/updateCar.php`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id, ...car }),
  });
  if (!response.ok) throw new Error('Failed to update car');
};

export const deleteCar = async (id: string): Promise<void> => {
  const response = await fetch(`${API_BASE_URL}/deleteCar.php`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id }),
  });
  if (!response.ok) throw new Error('Failed to delete car');
};