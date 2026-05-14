import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { addCar, updateCar, getCars, deleteCar, Car } from '../api/cars';
import { Trash2, Plus, Image as ImageIcon, X, Upload, Edit } from 'lucide-react';

const Admin: React.FC = () => {
  const { user, isAdmin, login, loading: authLoading } = useAuth();
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const [formData, setFormData] = useState<Partial<Car>>({
    make: '', model: '', year: new Date().getFullYear(),
    price: 0, mileage: 0, fuelType: 'Petrol',
    transmission: 'Automatic', description: '',
    category: 'Sedan', isPopular: false, images: []
  });
  
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [currentImageUrl, setCurrentImageUrl] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [errorInfo, setErrorInfo] = useState<string | null>(null);
  const [successInfo, setSuccessInfo] = useState<string | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  const fetchCars = async () => {
    setLoading(true);
    try {
      const fetchedCars = await getCars();
      setCars(fetchedCars);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAdmin) {
      fetchCars();
    }
  }, [isAdmin]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    const success = await login(email, password);
    if (!success) {
      setLoginError('Invalid email or password.');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData({ ...formData, [name]: checked });
    } else if (type === 'number') {
      setFormData({ ...formData, [name]: Number(value) });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleAddImageUrl = () => {
    if (currentImageUrl && imageUrls.length < 10) {
      setImageUrls([...imageUrls, currentImageUrl]);
      setCurrentImageUrl('');
    }
  };

  const showError = (msg: string) => {
    setErrorInfo(msg);
    setTimeout(() => setErrorInfo(null), 3000);
  };

  const showSuccess = (msg: string) => {
    setSuccessInfo(msg);
    setTimeout(() => setSuccessInfo(null), 3000);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (imageUrls.length >= 10) {
      showError("Maximum 10 images allowed.");
      return;
    }
    
    setUploadingImage(true);
    try {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImageUrls(prev => [...prev, event.target?.result as string]);
        setUploadingImage(false);
        showSuccess("Image processed successfully.");
      };
      reader.onerror = () => {
        showError("Failed to read file.");
        setUploadingImage(false);
      }
      reader.readAsDataURL(file);
    } catch (error) {
      console.error("Error processing image:", error);
      showError("Failed to process image. Please try again.");
      setUploadingImage(false);
    } finally {
      e.target.value = '';
    }
  };

  const handleRemoveImageUrl = (index: number) => {
    const newUrls = [...imageUrls];
    newUrls.splice(index, 1);
    setImageUrls(newUrls);
  };

  const handleEdit = (car: Car) => {
    setFormData(car);
    setImageUrls(car.images || []);
    setEditingId(car.id!);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancelForm = () => {
    setShowForm(false);
    setEditingId(null);
    setFormData({
      make: '', model: '', year: new Date().getFullYear(),
      price: 0, mileage: 0, fuelType: 'Petrol',
      transmission: 'Automatic', description: '',
      category: 'Sedan', isPopular: false, images: []
    });
    setImageUrls([]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting || uploadingImage) return;
    if (imageUrls.length === 0) {
      showError("At least one image is required.");
      return;
    }
    setSubmitting(true);
    try {
      const carData = {
        make: formData.make as string,
        model: formData.model as string,
        year: formData.year as number,
        price: formData.price as number,
        mileage: formData.mileage as number,
        fuelType: formData.fuelType as string,
        transmission: formData.transmission as string,
        description: formData.description as string,
        category: formData.category as string,
        isPopular: formData.isPopular as boolean,
        images: imageUrls,
      };

      if (editingId) {
        await updateCar(editingId, carData);
        showSuccess("Car updated successfully!");
      } else {
        await addCar(carData);
        showSuccess("Car added successfully!");
      }
      
      handleCancelForm();
      fetchCars();
    } catch (error) {
      console.error("Error saving car:", error);
      showError("Failed to save car. Are you an admin?");
    } finally {
      setSubmitting(false);
    }
  };

  const executeDelete = async (id: string) => {
    setSubmitting(true);
    try {
      await deleteCar(id);
      setDeletingId(null);
      showSuccess("Car deleted successfully");
      fetchCars();
    } catch (error) {
      console.error("Error deleting car:", error);
      showError("Failed to delete. Are you admin?");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteClick = (id: string) => {
    setDeletingId(id);
  };

  if (authLoading) return <div className="p-10 text-center flex-1">Loading...</div>;

  if (!user || !isAdmin) {
    return (
      <div className="flex-1 flex items-center justify-center py-20 bg-[#050505] px-4">
        <div className="bg-[#121212] border border-white/5 p-8 text-center max-w-md w-full">
          <h2 className="text-2xl font-bold uppercase tracking-widest text-white mb-4">Admin Login</h2>
          <p className="text-white/60 text-sm mb-6">Enter your credentials to access the dashboard.</p>
          {loginError && (
            <div className="bg-red-600/10 border border-red-600/20 p-3 mb-6 rounded text-left">
              <p className="text-red-500 text-xs font-bold">{loginError}</p>
            </div>
          )}
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <input 
                type="email" 
                placeholder="Email Address" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-[#1a1a1a] border border-white/10 text-white focus:ring-1 focus:ring-red-600 focus:border-red-600 outline-none transition-colors"
                required
              />
            </div>
            <div>
              <input 
                type="password" 
                placeholder="Password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-[#1a1a1a] border border-white/10 text-white focus:ring-1 focus:ring-red-600 focus:border-red-600 outline-none transition-colors"
                required
              />
            </div>
            <button 
              type="submit"
              className="w-full bg-red-600 hover:bg-red-700 text-white uppercase tracking-widest text-xs font-bold py-4 transition-colors mt-2"
            >
              Login Securely
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex-1 w-full bg-[#050505] relative">
      {/* Toast Notifications */}
      <div className="fixed top-24 right-4 z-50 flex flex-col gap-2">
        {successInfo && (
          <div className="bg-green-600 text-white px-6 py-3 shadow-xl flex items-center gap-3 animate-in fade-in slide-in-from-top-4">
            <span className="font-bold uppercase tracking-widest text-[10px]">{successInfo}</span>
          </div>
        )}
        {errorInfo && (
          <div className="bg-red-600 text-white px-6 py-3 shadow-xl flex items-center gap-3 animate-in fade-in slide-in-from-top-4">
            <span className="font-bold uppercase tracking-widest text-[10px]">{errorInfo}</span>
          </div>
        )}
      </div>

      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold uppercase italic tracking-tighter text-white">Admin Dashboard</h1>
        <button 
          onClick={showForm ? handleCancelForm : () => setShowForm(true)}
          className="bg-white/5 hover:bg-white/10 text-white uppercase tracking-widest text-xs font-bold px-4 py-3 flex items-center gap-2 transition-colors"
        >
          {showForm ? <><X className="w-5 h-5"/> Cancel</> : <><Plus className="w-5 h-5"/> Add New Car</>}
        </button>
      </div>

      {showForm && (
        <div className="bg-[#121212] p-6 md:p-8 mb-10 border border-white/5">
          <h2 className="text-xl font-bold uppercase tracking-widest text-white mb-6">{editingId ? 'Edit Listing' : 'Create New Listing'}</h2>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-xs font-semibold text-white/40 uppercase tracking-widest mb-2">Make</label>
                <input required type="text" name="make" value={formData.make} onChange={handleInputChange} className="w-full px-4 py-3 bg-[#1a1a1a] border border-white/10 text-white focus:ring-1 focus:ring-red-600 focus:border-red-600 outline-none transition-colors" placeholder="e.g. BMW" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-white/40 uppercase tracking-widest mb-2">Model</label>
                <input required type="text" name="model" value={formData.model} onChange={handleInputChange} className="w-full px-4 py-3 bg-[#1a1a1a] border border-white/10 text-white focus:ring-1 focus:ring-red-600 focus:border-red-600 outline-none transition-colors" placeholder="e.g. 320i" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-white/40 uppercase tracking-widest mb-2">Year</label>
                <input required type="number" name="year" value={formData.year} onChange={handleInputChange} className="w-full px-4 py-3 bg-[#1a1a1a] border border-white/10 text-white focus:ring-1 focus:ring-red-600 focus:border-red-600 outline-none transition-colors" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-white/40 uppercase tracking-widest mb-2">Price (€)</label>
                <input required type="number" name="price" value={formData.price} onChange={handleInputChange} className="w-full px-4 py-3 bg-[#1a1a1a] border border-white/10 text-white focus:ring-1 focus:ring-red-600 focus:border-red-600 outline-none transition-colors" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-white/40 uppercase tracking-widest mb-2">Mileage (km)</label>
                <input required type="number" name="mileage" value={formData.mileage} onChange={handleInputChange} className="w-full px-4 py-3 bg-[#1a1a1a] border border-white/10 text-white focus:ring-1 focus:ring-red-600 focus:border-red-600 outline-none transition-colors" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-white/40 uppercase tracking-widest mb-2">Category</label>
                <select name="category" value={formData.category} onChange={handleInputChange} className="w-full px-4 py-3 bg-[#1a1a1a] border border-white/10 text-white focus:ring-1 focus:ring-red-600 focus:border-red-600 outline-none transition-colors">
                  <option value="Sedan">Sedan</option>
                  <option value="SUV">SUV</option>
                  <option value="Coupe">Coupe</option>
                  <option value="Hatchback">Hatchback</option>
                  <option value="Convertible">Convertible</option>
                  <option value="Wagon">Wagon</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-white/40 uppercase tracking-widest mb-2">Fuel Type</label>
                <select name="fuelType" value={formData.fuelType} onChange={handleInputChange} className="w-full px-4 py-3 bg-[#1a1a1a] border border-white/10 text-white focus:ring-1 focus:ring-red-600 focus:border-red-600 outline-none transition-colors">
                  <option value="Petrol">Petrol</option>
                  <option value="Diesel">Diesel</option>
                  <option value="Electric">Electric</option>
                  <option value="Hybrid">Hybrid</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-white/40 uppercase tracking-widest mb-2">Transmission</label>
                <select name="transmission" value={formData.transmission} onChange={handleInputChange} className="w-full px-4 py-3 bg-[#1a1a1a] border border-white/10 text-white focus:ring-1 focus:ring-red-600 focus:border-red-600 outline-none transition-colors">
                  <option value="Automatic">Automatic</option>
                  <option value="Manual">Manual</option>
                </select>
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-xs font-semibold text-white/40 uppercase tracking-widest mb-2">Description</label>
              <textarea required name="description" value={formData.description} onChange={handleInputChange} rows={4} className="w-full px-4 py-3 bg-[#1a1a1a] border border-white/10 text-white focus:ring-1 focus:ring-red-600 focus:border-red-600 outline-none transition-colors" placeholder="Detailed vehicle description..."></textarea>
            </div>

            <div className="mb-6">
              <label className="block text-xs font-semibold text-white/40 uppercase tracking-widest mb-2">Images (Up to 10 image URLs or Uploads)</label>
              
              <div className="flex gap-4 mb-4 border border-white/10 p-4 bg-[#1a1a1a]">
                <div className="flex-1 flex flex-col justify-center items-center border border-dashed border-white/20 p-4 cursor-pointer hover:bg-white/5 transition-colors relative">
                  <input 
                    type="file" 
                    accept="image/*" 
                    onChange={handleFileUpload}
                    disabled={uploadingImage || imageUrls.length >= 10}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
                  />
                  <Upload className="w-6 h-6 text-white/40 mb-2" />
                  <span className="text-[10px] text-white/40 uppercase tracking-widest font-bold">
                    {uploadingImage ? 'Uploading...' : 'Upload Image File'}
                  </span>
                </div>
                
                <div className="flex-1 flex flex-col justify-center">
                  <span className="text-[10px] text-white/40 uppercase tracking-widest font-bold mb-2">Or add URL</span>
                  <div className="flex gap-2">
                    <input 
                      type="text" 
                      value={currentImageUrl} 
                      onChange={(e) => setCurrentImageUrl(e.target.value)} 
                      onKeyDown={(e) => { 
                        if (e.key === 'Enter') { 
                          e.preventDefault(); 
                          if (currentImageUrl && imageUrls.length < 10) handleAddImageUrl(); 
                        } 
                      }}
                      className="flex-1 px-4 py-3 bg-[#121212] border border-white/10 text-white focus:ring-1 focus:ring-red-600 focus:border-red-600 outline-none transition-colors" 
                      placeholder="https://example.com/image.jpg"
                      disabled={imageUrls.length >= 10}
                    />
                    <button 
                      type="button" 
                      onClick={handleAddImageUrl}
                      disabled={!currentImageUrl || imageUrls.length >= 10}
                      className="bg-white/10 hover:bg-white/20 text-white px-4 py-3 uppercase tracking-widest text-[10px] font-bold whitespace-nowrap disabled:opacity-50 transition-colors"
                    >
                      Add URL
                    </button>
                  </div>
                </div>
              </div>
              
              {imageUrls.length > 0 && (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 mt-4">
                  {imageUrls.map((url, index) => (
                    <div key={index} className="relative group overflow-hidden border border-white/10 bg-[#1a1a1a] aspect-video flex-shrink-0">
                      <img 
                        src={url} 
                        alt={`Preview ${index}`} 
                        className="w-full h-full object-cover opacity-80 hover:opacity-100 cursor-pointer transition-opacity" 
                        onClick={() => setPreviewImage(url)}
                      />
                      <button 
                        type="button" 
                        onClick={() => handleRemoveImageUrl(index)}
                        className="absolute top-1 right-1 bg-red-600 text-white rounded-none p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
              <p className="text-[10px] uppercase tracking-widest text-white/40 mt-2">{imageUrls.length} / 10 images added</p>
            </div>

            <div className="mb-8 flex items-center">
              <input type="checkbox" id="isPopular" name="isPopular" checked={formData.isPopular} onChange={handleInputChange} className="w-4 h-4 text-red-600 border-white/10 bg-[#1a1a1a] focus:ring-1 focus:ring-red-600 focus:ring-offset-[#121212] transition-colors" />
              <label htmlFor="isPopular" className="ml-2 block text-xs font-semibold text-white uppercase tracking-widest">Mark as Popular</label>
            </div>

            <button type="submit" disabled={submitting || uploadingImage} className="w-full bg-red-600 hover:bg-red-700 text-white uppercase tracking-widest text-xs font-bold py-4 flex justify-center items-center gap-2 transition-colors disabled:opacity-70">
              {submitting ? 'Saving...' : uploadingImage ? 'Processing Image...' : editingId ? 'Update Listing' : 'Publish Listing'}
            </button>
          </form>
        </div>
      )}

      <div className="bg-[#121212] border border-white/5 overflow-hidden">
        <div className="px-6 py-4 border-b border-white/10 bg-[#0a0a0a] flex justify-between items-center">
          <h2 className="text-xs font-bold uppercase tracking-widest text-white">Current Inventory ({cars.length})</h2>
        </div>
        
        {loading ? (
          <div className="p-8 text-center text-white/40 text-sm uppercase tracking-widest">Loading cars...</div>
        ) : cars.length === 0 ? (
          <div className="p-10 text-center text-white/40 flex flex-col items-center">
            <ImageIcon className="w-12 h-12 text-white/10 mb-2" />
            <p className="text-sm uppercase tracking-widest">No vehicles in inventory.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#0a0a0a] text-white/40 text-xs font-bold uppercase tracking-widest">
                  <th className="px-6 py-4">Vehicle</th>
                  <th className="px-6 py-4">Price</th>
                  <th className="px-6 py-4">Category</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {cars.map((car) => (
                  <tr key={car.id} className="hover:bg-white/5 transition-colors">
                    <td className="px-6 py-4 flex items-center gap-4">
                      <div className="w-16 h-12 bg-[#1a1a1a] overflow-hidden flex-shrink-0">
                        {car.images && car.images[0] && (
                          <img 
                            src={car.images[0]} 
                            alt="" 
                            className="w-full h-full object-cover opacity-80 hover:opacity-100 cursor-pointer transition-opacity" 
                            onClick={() => setPreviewImage(car.images[0])}
                          />
                        )}
                      </div>
                      <div>
                        <div className="font-bold uppercase tracking-tight text-white">{car.make} {car.model}</div>
                        <div className="text-[10px] uppercase tracking-widest text-white/40">{car.year} • {car.mileage.toLocaleString()} km</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-bold text-red-600">
                      €{car.price.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 text-white/60">
                      <span className="bg-white/5 px-2 py-1 text-[10px] font-bold uppercase tracking-widest">{car.category}</span>
                    </td>
                    <td className="px-6 py-4 text-white/60">
                      {car.isPopular ? <span className="text-red-500 text-[10px] font-bold uppercase tracking-widest flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-red-600"></span> Popular</span> : '-'}
                    </td>
                    <td className="px-6 py-4 text-right">
                      {deletingId === car.id ? (
                        <div className="flex items-center justify-end gap-2">
                          <span className="text-[10px] uppercase tracking-widest text-red-500 font-bold">Sure?</span>
                          <button
                            onClick={() => executeDelete(car.id!)}
                            className="bg-red-600 text-white hover:bg-red-700 px-3 py-1 text-[10px] font-bold uppercase tracking-widest transition-colors"
                          >
                            Yes
                          </button>
                          <button
                            onClick={() => setDeletingId(null)}
                            className="bg-white/10 text-white hover:bg-white/20 px-3 py-1 text-[10px] font-bold uppercase tracking-widest transition-colors"
                          >
                            No
                          </button>
                        </div>
                      ) : (
                        <div className="flex items-center justify-end gap-2">
                          <button 
                            onClick={() => handleEdit(car)}
                            className="text-white/40 hover:text-white p-2 transition-colors"
                            title="Edit Listing"
                          >
                            <Edit className="w-5 h-5" />
                          </button>
                          <button 
                            onClick={() => handleDeleteClick(car.id!)}
                            className="text-white/40 hover:text-red-600 p-2 transition-colors"
                            title="Delete Listing"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Full Screen Image Preview Modal */}
      {previewImage && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 p-4 md:p-8 cursor-pointer"
          onClick={() => setPreviewImage(null)}
        >
          <button 
            className="absolute top-4 right-4 md:top-8 md:right-8 text-white/50 hover:text-white transition-colors p-2"
            onClick={() => setPreviewImage(null)}
          >
            <X className="w-8 h-8 md:w-10 md:h-10" />
          </button>
          <img 
            src={previewImage} 
            alt="Full screen preview" 
            className="max-w-full max-h-full object-contain cursor-default shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
};

export default Admin;
