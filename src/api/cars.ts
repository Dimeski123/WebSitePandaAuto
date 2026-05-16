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
  category: string;
  isPopular: boolean;
  images: string[];
}

// This assumes you will upload your PHP files to a folder called "api" on Hostinger
const API_URL = '/api'; 

export const getCars = async (): Promise<Car[]> => {
  const response = await fetch(`${API_URL}/getCars.php`);
  if (!response.ok) throw new Error('Failed to fetch cars');
  return response.json();
};

export const getPopularCars = async (): Promise<Car[]> => {
  const response = await fetch(`${API_URL}/getCars.php?popular=true`);
  if (!response.ok) throw new Error('Failed to fetch popular cars');
  return response.json();
};

export const getCar = async (id: string): Promise<Car> => {
  const response = await fetch(`${API_URL}/getCar.php?id=${id}`);
  if (!response.ok) throw new Error('Failed to fetch car');
  return response.json();
};

export const addCar = async (car: Omit<Car, 'id'>): Promise<void> => {
  const response = await fetch(`${API_URL}/addCar.php`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(car),
  });
  if (!response.ok) throw new Error('Failed to add car');
};

export const updateCar = async (id: string, car: Partial<Car>): Promise<void> => {
  const response = await fetch(`${API_URL}/updateCar.php`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id, ...car }),
  });
  if (!response.ok) throw new Error('Failed to update car');
};

export const deleteCar = async (id: string): Promise<void> => {
  const response = await fetch(`${API_URL}/deleteCar.php`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id }),
  });
  if (!response.ok) throw new Error('Failed to delete car');
};