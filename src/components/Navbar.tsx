import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Menu, X, Car as CarIcon } from 'lucide-react';

const Navbar: React.FC = () => {
  const { user, isAdmin, logout } = useAuth();
  const location = useLocation();
  const [isOpen, setIsOpen] = React.useState(false);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Categories', path: '/categories' },
    { name: 'About Us', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  const toggleMenu = () => setIsOpen(!isOpen);

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-[#0a0a0a] text-white sticky top-0 z-50 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2">
              {/* Simple stylistic logo with black and red */}
              <img 
                src="/Images/HeaderPNG.png" 
                alt="Panda Auto Logo" 
                className="h-16 md:h-20 py-2 w-auto object-contain drop-shadow-md transition-all duration-300 hover:scale-105" 
              />
              <span className="font-bold text-xl tracking-tighter uppercase text-white">
                <span className="text-red-600">Panda</span> Auto
              </span>
            </Link>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`px-3 py-2 text-xs font-semibold uppercase tracking-widest transition-colors ${
                    isActive(link.path)
                      ? 'text-red-500'
                      : 'text-white/60 hover:text-white'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              {isAdmin && (
                <Link
                  to="/admin"
                  className={`px-3 py-2 text-xs font-semibold uppercase tracking-widest transition-colors ${
                    isActive('/admin')
                      ? 'text-red-500'
                      : 'text-white/60 hover:text-white'
                  }`}
                >
                  Admin
                </Link>
              )}
            </div>
          </div>
          <div className="hidden md:block">
            {user && (
              <button
                onClick={logout}
                className="text-xs font-semibold uppercase tracking-widest text-white/60 hover:text-white px-3 py-2 transition-colors"
              >
                Sign Out
              </button>
            )}
          </div>
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-800 focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-[#0a0a0a] border-t border-white/10">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`block px-3 py-2 text-xs font-semibold uppercase tracking-widest ${
                  isActive(link.path)
                    ? 'text-red-500 bg-red-600/10'
                    : 'text-white/60 hover:text-white'
                }`}
              >
                {link.name}
              </Link>
            ))}
            {isAdmin && (
              <Link
                to="/admin"
                onClick={() => setIsOpen(false)}
                className={`block px-3 py-2 text-xs font-semibold uppercase tracking-widest ${
                  isActive('/admin')
                    ? 'text-red-500 bg-red-600/10'
                    : 'text-white/60 hover:text-white'
                }`}
              >
                Admin
              </Link>
            )}
            {user && (
              <button
                onClick={() => {
                  logout();
                  setIsOpen(false);
                }}
                className="block w-full text-left px-3 py-2 text-xs font-semibold uppercase tracking-widest text-white/60 hover:text-white"
              >
                Sign Out
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
