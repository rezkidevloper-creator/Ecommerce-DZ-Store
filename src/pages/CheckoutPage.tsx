import React, { useState } from 'react';
import { ArrowLeft, CheckCircle } from 'lucide-react';
import { useCart } from '../hooks/useCart';
import { useApp } from '../contexts/AppContext';
import { CheckoutForm } from '../components/Checkout/CheckoutForm';
import { CartItem } from '../components/Cart/CartItem';
import { formatDZD } from '../utils/currency';
import { generateId } from '../utils/generateId';
import { Customer, Order } from '../types';
import { Button } from '../components/UI/Button';

interface CheckoutPageProps {
  onPageChange: (page: string) => void;
}

export const CheckoutPage: React.FC<CheckoutPageProps> = ({ onPageChange }) => {
  const { cart, getCartTotal, clearCart } = useCart();
  const { dispatch } = useApp();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderConfirmed, setOrderConfirmed] = useState<Order | null>(null);

  const handleOrderSubmit = async (customer: Customer) => {
    setIsSubmitting(true);

    try {
      const order: Order = {
        id: generateId(),
        customer,
        items: [...cart],
        total: getCartTotal(),
        status: 'pending',
        paymentMethod: 'cod',
        createdAt: new Date().toISOString()
      };

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 2000));

      dispatch({ type: 'ADD_ORDER', payload: order });
      clearCart();
      setOrderConfirmed(order);
    } catch (error) {
      console.error('Error submitting order:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (cart.length === 0 && !orderConfirmed) {
    onPageChange('cart');
    return null;
  }

  if (orderConfirmed) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-lg p-8 text-center">
          <CheckCircle className="mx-auto text-green-500 mb-6" size={64} />
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Commande confirmée !
          </h1>
          <p className="text-gray-600 mb-6">
            Merci pour votre commande. Nous vous contacterons bientôt pour confirmer la livraison.
          </p>
          
          <div className="bg-gray-50 rounded-lg p-6 mb-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Détails de votre commande
            </h3>
            <div className="text-left space-y-2">
              <p><strong>Numéro de commande:</strong> #{orderConfirmed.id.slice(-8)}</p>
              <p><strong>Total:</strong> {formatDZD(orderConfirmed.total)}</p>
              <p><strong>Mode de paiement:</strong> Paiement à la livraison</p>
              <p><strong>Status:</strong> En attente de confirmation</p>
            </div>
          </div>

          <div className="space-y-4">
            <Button onClick={() => onPageChange('home')} size="lg" className="w-full sm:w-auto">
              Continuer vos achats
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center space-x-4 mb-8">
        <button
          onClick={() => onPageChange('cart')}
          className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 transition-colors"
        >
          <ArrowLeft size={20} />
          <span>Retour au panier</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Checkout Form */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Informations de livraison
          </h2>
          <CheckoutForm onSubmit={handleOrderSubmit} isLoading={isSubmitting} />
        </div>

        {/* Order Summary */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Résumé de la commande
          </h2>
          
          <div className="space-y-4 mb-6">
            {cart.map(item => (
              <div key={item.product.id} className="flex items-center space-x-3 pb-4 border-b border-gray-200 last:border-b-0">
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  className="w-16 h-16 object-cover rounded-md"
                />
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900">{item.product.name}</h3>
                  <p className="text-sm text-gray-600">
                    {item.quantity} × {formatDZD(item.product.price)}
                  </p>
                </div>
                <p className="font-medium text-gray-900">
                  {formatDZD(item.product.price * item.quantity)}
                </p>
              </div>
            ))}
          </div>

          <div className="border-t pt-4">
            <div className="flex justify-between items-center mb-4">
              <span className="text-lg font-medium text-gray-900">Total:</span>
              <span className="text-2xl font-bold text-blue-600">
                {formatDZD(getCartTotal())}
              </span>
            </div>
            
            <div className="bg-green-50 p-4 rounded-lg">
              <h4 className="font-medium text-green-900 mb-2">Livraison</h4>
              <p className="text-sm text-green-800">
                Livraison gratuite dans toute l'Algérie. 
                Délai de livraison: 2-5 jours ouvrables.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};