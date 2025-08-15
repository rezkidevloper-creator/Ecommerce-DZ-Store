import React from 'react';
import { ShoppingCart, ArrowLeft, CreditCard } from 'lucide-react';
import { useCart } from '../hooks/useCart';
import { CartItem } from '../components/Cart/CartItem';
import { formatDZD } from '../utils/currency';
import { Button } from '../components/UI/Button';

interface CartPageProps {
  onPageChange: (page: string) => void;
}

export const CartPage: React.FC<CartPageProps> = ({ onPageChange }) => {
  const { cart, getCartTotal, clearCart } = useCart();

  const handleCheckout = () => {
    onPageChange('checkout');
  };

  if (cart.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center py-12">
          <ShoppingCart className="mx-auto text-gray-400 mb-4" size={64} />
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Votre panier est vide
          </h2>
          <p className="text-gray-600 mb-6">
            Découvrez notre sélection de produits et ajoutez-les à votre panier.
          </p>
          <Button onClick={() => onPageChange('home')}>
            Continuer vos achats
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center space-x-4 mb-8">
        <button
          onClick={() => onPageChange('home')}
          className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 transition-colors"
        >
          <ArrowLeft size={20} />
          <span>Continuer vos achats</span>
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-900 flex items-center">
            <ShoppingCart className="mr-3" size={24} />
            Votre Panier ({cart.length} article{cart.length !== 1 ? 's' : ''})
          </h1>
          
          <Button
            variant="danger"
            size="sm"
            onClick={clearCart}
          >
            Vider le panier
          </Button>
        </div>

        <div className="space-y-4 mb-8">
          {cart.map(item => (
            <CartItem key={item.product.id} item={item} />
          ))}
        </div>

        <div className="border-t pt-6">
          <div className="flex justify-between items-center mb-6">
            <span className="text-xl font-medium text-gray-900">
              Total de la commande:
            </span>
            <span className="text-3xl font-bold text-blue-600">
              {formatDZD(getCartTotal())}
            </span>
          </div>

          <div className="bg-blue-50 p-4 rounded-lg mb-6">
            <div className="flex items-center space-x-2 mb-2">
              <CreditCard className="text-blue-600" size={20} />
              <span className="font-medium text-blue-900">Mode de paiement</span>
            </div>
            <p className="text-blue-800">
              Paiement à la livraison disponible dans toutes les wilayas d'Algérie
            </p>
          </div>

          <Button
            size="lg"
            className="w-full"
            onClick={handleCheckout}
          >
            Passer la commande
          </Button>
        </div>
      </div>
    </div>
  );
};