import React from 'react';
import { ShoppingCart, User, Home, Settings } from 'lucide-react';
import { useApp } from '../../contexts/AppContext';
import { useCart } from '../../hooks/useCart';

interface HeaderProps {
  currentPage: string;
  onPageChange: (page: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ currentPage, onPageChange }) => {
  const { isAdmin, dispatch } = useApp();
  const { getCartItemCount } = useCart();

  const toggleAdminMode = () => {
    dispatch({ type: 'TOGGLE_ADMIN_MODE' });
    onPageChange('home');
  };

  return (
    <header className="bg-white shadow-lg border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-blue-600 cursor-pointer"
                onClick={() => onPageChange('home')}>
              Ecommerce DZ Store
            </h1>
          </div>
          
          <nav className="hidden md:flex space-x-6">
            <button
              onClick={() => onPageChange('home')}
              className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                currentPage === 'home' ? 'text-blue-600 bg-blue-50' : 'text-gray-700 hover:text-blue-600'
              }`}
            >
              <Home size={20} />
              <span>Accueil</span>
            </button>
            
            {!isAdmin && (
              <button
                onClick={() => onPageChange('cart')}
                className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors relative ${
                  currentPage === 'cart' ? 'text-blue-600 bg-blue-50' : 'text-gray-700 hover:text-blue-600'
                }`}
              >
                <ShoppingCart size={20} />
                <span>Panier</span>
                {getCartItemCount() > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {getCartItemCount()}
                  </span>
                )}
              </button>
            )}
          </nav>

          <div className="flex items-center space-x-4">
            <button
              onClick={toggleAdminMode}
              className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isAdmin ? 'text-green-600 bg-green-50' : 'text-gray-700 hover:text-blue-600'
              }`}
            >
              {isAdmin ? <Settings size={20} /> : <User size={20} />}
              <span className="hidden sm:inline">
                {isAdmin ? 'Admin' : 'Mode Admin'}
              </span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};