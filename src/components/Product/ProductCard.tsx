import React from 'react';
import { ShoppingCart, Eye, Edit, Trash2 } from 'lucide-react';
import { Product } from '../../types';
import { formatDZD } from '../../utils/currency';
import { useApp } from '../../contexts/AppContext';
import { useCart } from '../../hooks/useCart';
import { Button } from '../UI/Button';

interface ProductCardProps {
  product: Product;
  onView?: (product: Product) => void;
  onEdit?: (product: Product) => void;
  onDelete?: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onView,
  onEdit,
  onDelete
}) => {
  const { isAdmin } = useApp();
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    if (product.stock > 0) {
      addToCart(product);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="relative">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover"
        />
        {product.stock === 0 && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <span className="bg-red-500 text-white px-3 py-1 rounded-md font-medium">
              Rupture de stock
            </span>
          </div>
        )}
        <div className="absolute top-2 right-2">
          <span className="bg-blue-600 text-white px-2 py-1 rounded-md text-xs">
            {product.category}
          </span>
        </div>
      </div>

      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
          {product.name}
        </h3>
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {product.description}
        </p>
        
        <div className="flex items-center justify-between mb-3">
          <span className="text-2xl font-bold text-blue-600">
            {formatDZD(product.price)}
          </span>
          <span className="text-sm text-gray-500">
            Stock: {product.stock}
          </span>
        </div>

        <div className="flex space-x-2">
          {isAdmin ? (
            <>
              {onView && (
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => onView(product)}
                  className="flex-1 flex items-center justify-center space-x-1"
                >
                  <Eye size={16} />
                  <span>Voir</span>
                </Button>
              )}
              {onEdit && (
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => onEdit(product)}
                  className="flex-1 flex items-center justify-center space-x-1"
                >
                  <Edit size={16} />
                  <span>Modifier</span>
                </Button>
              )}
              {onDelete && (
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => onDelete(product)}
                  className="flex items-center justify-center"
                >
                  <Trash2 size={16} />
                </Button>
              )}
            </>
          ) : (
            <Button
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              className="w-full flex items-center justify-center space-x-2"
            >
              <ShoppingCart size={16} />
              <span>Ajouter au panier</span>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};