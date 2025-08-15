import React from 'react';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { CartItem as CartItemType } from '../../types';
import { formatDZD } from '../../utils/currency';
import { useCart } from '../../hooks/useCart';

interface CartItemProps {
  item: CartItemType;
}

export const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const { updateQuantity, removeFromCart } = useCart();

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(item.product.id);
    } else if (newQuantity <= item.product.stock) {
      updateQuantity(item.product.id, newQuantity);
    }
  };

  return (
    <div className="flex items-center space-x-4 bg-white p-4 rounded-lg shadow-sm border">
      <img
        src={item.product.image}
        alt={item.product.name}
        className="w-16 h-16 object-cover rounded-md"
      />
      
      <div className="flex-1">
        <h3 className="text-lg font-medium text-gray-900">{item.product.name}</h3>
        <p className="text-gray-600">{formatDZD(item.product.price)}</p>
      </div>

      <div className="flex items-center space-x-3">
        <button
          onClick={() => handleQuantityChange(item.quantity - 1)}
          className="p-1 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <Minus size={16} />
        </button>
        
        <span className="text-lg font-medium w-8 text-center">
          {item.quantity}
        </span>
        
        <button
          onClick={() => handleQuantityChange(item.quantity + 1)}
          disabled={item.quantity >= item.product.stock}
          className="p-1 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Plus size={16} />
        </button>
      </div>

      <div className="text-right">
        <p className="text-lg font-medium text-gray-900">
          {formatDZD(item.product.price * item.quantity)}
        </p>
        <button
          onClick={() => removeFromCart(item.product.id)}
          className="text-red-600 hover:text-red-700 focus:outline-none mt-1"
        >
          <Trash2 size={16} />
        </button>
      </div>
    </div>
  );
};