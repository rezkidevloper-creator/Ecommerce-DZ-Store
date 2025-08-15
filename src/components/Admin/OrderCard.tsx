import React from 'react';
import { Package, User, MapPin, Phone, Calendar, CreditCard } from 'lucide-react';
import { Order } from '../../types';
import { formatDZD } from '../../utils/currency';
import { Button } from '../UI/Button';

interface OrderCardProps {
  order: Order;
  onUpdateStatus: (orderId: string, status: Order['status']) => void;
}

export const OrderCard: React.FC<OrderCardProps> = ({ order, onUpdateStatus }) => {
  const getStatusColor = (status: Order['status']) => {
    const colors = {
      pending: 'bg-yellow-100 text-yellow-800',
      confirmed: 'bg-blue-100 text-blue-800',
      shipped: 'bg-purple-100 text-purple-800',
      delivered: 'bg-green-100 text-green-800',
      cancelled: 'bg-red-100 text-red-800'
    };
    return colors[status];
  };

  const getStatusText = (status: Order['status']) => {
    const texts = {
      pending: 'En attente',
      confirmed: 'Confirmée',
      shipped: 'Expédiée',
      delivered: 'Livrée',
      cancelled: 'Annulée'
    };
    return texts[status];
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-4">
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center space-x-2">
          <Package className="text-gray-500" size={20} />
          <h3 className="text-lg font-semibold">Commande #{order.id.slice(-8)}</h3>
        </div>
        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
          {getStatusText(order.status)}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <h4 className="font-medium text-gray-900 mb-3 flex items-center">
            <User className="mr-2" size={16} />
            Informations client
          </h4>
          <div className="space-y-2 text-sm text-gray-600">
            <p><strong>Nom:</strong> {order.customer.name}</p>
            <p className="flex items-center">
              <Phone size={14} className="mr-1" />
              {order.customer.phone}
            </p>
            <p><strong>Email:</strong> {order.customer.email}</p>
            <p className="flex items-start">
              <MapPin size={14} className="mr-1 mt-0.5 flex-shrink-0" />
              <span>{order.customer.address}, {order.customer.city}, {order.customer.wilaya}</span>
            </p>
          </div>
        </div>

        <div>
          <h4 className="font-medium text-gray-900 mb-3">Détails de la commande</h4>
          <div className="space-y-2 text-sm text-gray-600">
            <p className="flex items-center">
              <Calendar size={14} className="mr-1" />
              {new Date(order.createdAt).toLocaleDateString('fr-FR')}
            </p>
            <p className="flex items-center">
              <CreditCard size={14} className="mr-1" />
              Paiement à la livraison
            </p>
            <p><strong>Total:</strong> <span className="text-lg font-bold text-blue-600">{formatDZD(order.total)}</span></p>
          </div>
        </div>
      </div>

      <div className="mb-6">
        <h4 className="font-medium text-gray-900 mb-3">Produits commandés</h4>
        <div className="space-y-2">
          {order.items.map((item, index) => (
            <div key={index} className="flex justify-between items-center py-2 border-b border-gray-200 last:border-b-0">
              <div className="flex items-center space-x-3">
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  className="w-12 h-12 object-cover rounded-md"
                />
                <div>
                  <p className="font-medium">{item.product.name}</p>
                  <p className="text-sm text-gray-600">Quantité: {item.quantity}</p>
                </div>
              </div>
              <p className="font-medium">{formatDZD(item.product.price * item.quantity)}</p>
            </div>
          ))}
        </div>
      </div>

      {order.status !== 'delivered' && order.status !== 'cancelled' && (
        <div className="flex flex-wrap gap-2">
          {order.status === 'pending' && (
            <>
              <Button
                size="sm"
                onClick={() => onUpdateStatus(order.id, 'confirmed')}
              >
                Confirmer
              </Button>
              <Button
                size="sm"
                variant="danger"
                onClick={() => onUpdateStatus(order.id, 'cancelled')}
              >
                Annuler
              </Button>
            </>
          )}
          {order.status === 'confirmed' && (
            <Button
              size="sm"
              variant="secondary"
              onClick={() => onUpdateStatus(order.id, 'shipped')}
            >
              Marquer comme expédiée
            </Button>
          )}
          {order.status === 'shipped' && (
            <Button
              size="sm"
              variant="success"
              onClick={() => onUpdateStatus(order.id, 'delivered')}
            >
              Marquer comme livrée
            </Button>
          )}
        </div>
      )}
    </div>
  );
};