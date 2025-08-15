import React, { useState } from 'react';
import { Plus, Package, ShoppingBag, BarChart3, Trash2, Eye } from 'lucide-react';
import { useApp } from '../contexts/AppContext';
import { ProductCard } from '../components/Product/ProductCard';
import { ProductForm } from '../components/Admin/ProductForm';
import { OrderCard } from '../components/Admin/OrderCard';
import { DashboardStats } from '../components/Admin/DashboardStats';
import { Modal } from '../components/UI/Modal';
import { Button } from '../components/UI/Button';
import { Product, Order } from '../types';

type AdminTab = 'dashboard' | 'products' | 'orders';

export const AdminPage: React.FC = () => {
  const { products, orders, dispatch, getDashboardStats } = useApp();
  const [activeTab, setActiveTab] = useState<AdminTab>('dashboard');
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | undefined>();
  const [viewingProduct, setViewingProduct] = useState<Product | undefined>();

  const handleAddProduct = (product: Product) => {
    dispatch({ type: 'ADD_PRODUCT', payload: product });
    setIsProductModalOpen(false);
    setEditingProduct(undefined);
  };

  const handleUpdateProduct = (product: Product) => {
    dispatch({ type: 'UPDATE_PRODUCT', payload: product });
    setIsProductModalOpen(false);
    setEditingProduct(undefined);
  };

  const handleDeleteProduct = (product: Product) => {
    if (confirm(`Êtes-vous sûr de vouloir supprimer "${product.name}" ?`)) {
      dispatch({ type: 'DELETE_PRODUCT', payload: product.id });
    }
  };

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
    setIsProductModalOpen(true);
  };

  const handleViewProduct = (product: Product) => {
    setViewingProduct(product);
  };

  const handleUpdateOrderStatus = (orderId: string, status: Order['status']) => {
    const order = orders.find(o => o.id === orderId);
    if (order) {
      dispatch({ type: 'UPDATE_ORDER', payload: { ...order, status } });
    }
  };

  const openAddProductModal = () => {
    setEditingProduct(undefined);
    setIsProductModalOpen(true);
  };

  const tabs = [
    { id: 'dashboard' as AdminTab, name: 'Tableau de bord', icon: BarChart3 },
    { id: 'products' as AdminTab, name: 'Produits', icon: Package },
    { id: 'orders' as AdminTab, name: 'Commandes', icon: ShoppingBag }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Panneau d'administration
        </h1>
        
        {/* Tabs */}
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            {tabs.map(tab => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 py-2 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Icon size={16} />
                  <span>{tab.name}</span>
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Dashboard Tab */}
      {activeTab === 'dashboard' && (
        <div>
          <DashboardStats stats={getDashboardStats()} />
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Commandes récentes
              </h3>
              <div className="space-y-4">
                {orders.slice(0, 3).map(order => (
                  <div key={order.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium">#{order.id.slice(-8)}</p>
                      <p className="text-sm text-gray-600">{order.customer.name}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">{order.total.toLocaleString()} DZD</p>
                      <p className="text-sm text-gray-600 capitalize">{order.status}</p>
                    </div>
                  </div>
                ))}
              </div>
              {orders.length > 3 && (
                <Button
                  variant="secondary"
                  className="w-full mt-4"
                  onClick={() => setActiveTab('orders')}
                >
                  Voir toutes les commandes
                </Button>
              )}
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Produits populaires
              </h3>
              <div className="space-y-4">
                {products.slice(0, 3).map(product => (
                  <div key={product.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-12 h-12 object-cover rounded-md"
                      />
                      <div>
                        <p className="font-medium">{product.name}</p>
                        <p className="text-sm text-gray-600">Stock: {product.stock}</p>
                      </div>
                    </div>
                    <p className="font-medium">{product.price.toLocaleString()} DZD</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Products Tab */}
      {activeTab === 'products' && (
        <div>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              Gestion des produits ({products.length})
            </h2>
            <Button onClick={openAddProductModal}>
              <Plus size={16} className="mr-2" />
              Ajouter un produit
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map(product => (
              <ProductCard
                key={product.id}
                product={product}
                onView={handleViewProduct}
                onEdit={handleEditProduct}
                onDelete={handleDeleteProduct}
              />
            ))}
          </div>

          {products.length === 0 && (
            <div className="text-center py-12">
              <Package className="mx-auto text-gray-400 mb-4" size={64} />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Aucun produit
              </h3>
              <p className="text-gray-600 mb-6">
                Commencez par ajouter votre premier produit.
              </p>
              <Button onClick={openAddProductModal}>
                Ajouter un produit
              </Button>
            </div>
          )}
        </div>
      )}

      {/* Orders Tab */}
      {activeTab === 'orders' && (
        <div>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              Gestion des commandes ({orders.length})
            </h2>
          </div>

          {orders.length > 0 ? (
            <div className="space-y-6">
              {orders
                .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
                .map(order => (
                  <OrderCard
                    key={order.id}
                    order={order}
                    onUpdateStatus={handleUpdateOrderStatus}
                  />
                ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <ShoppingBag className="mx-auto text-gray-400 mb-4" size={64} />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Aucune commande
              </h3>
              <p className="text-gray-600">
                Les commandes apparaîtront ici une fois que les clients commenceront à acheter.
              </p>
            </div>
          )}
        </div>
      )}

      {/* Product Form Modal */}
      <Modal
        isOpen={isProductModalOpen}
        onClose={() => {
          setIsProductModalOpen(false);
          setEditingProduct(undefined);
        }}
        title={editingProduct ? 'Modifier le produit' : 'Ajouter un produit'}
        size="lg"
      >
        <ProductForm
          product={editingProduct}
          onSubmit={editingProduct ? handleUpdateProduct : handleAddProduct}
          onCancel={() => {
            setIsProductModalOpen(false);
            setEditingProduct(undefined);
          }}
        />
      </Modal>

      {/* Product View Modal */}
      <Modal
        isOpen={!!viewingProduct}
        onClose={() => setViewingProduct(undefined)}
        title="Détails du produit"
        size="lg"
      >
        {viewingProduct && (
          <div className="space-y-6">
            <img
              src={viewingProduct.image}
              alt={viewingProduct.name}
              className="w-full h-64 object-cover rounded-lg"
            />
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                {viewingProduct.name}
              </h3>
              <p className="text-gray-600 mb-4">{viewingProduct.description}</p>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="block text-sm font-medium text-gray-700">Prix</span>
                  <span className="text-xl font-bold text-blue-600">
                    {viewingProduct.price.toLocaleString()} DZD
                  </span>
                </div>
                <div>
                  <span className="block text-sm font-medium text-gray-700">Stock</span>
                  <span className="text-xl font-bold text-gray-900">
                    {viewingProduct.stock}
                  </span>
                </div>
                <div>
                  <span className="block text-sm font-medium text-gray-700">Catégorie</span>
                  <span className="text-lg text-gray-900">{viewingProduct.category}</span>
                </div>
                <div>
                  <span className="block text-sm font-medium text-gray-700">Date de création</span>
                  <span className="text-lg text-gray-900">
                    {new Date(viewingProduct.createdAt).toLocaleDateString('fr-FR')}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex space-x-4">
              <Button
                onClick={() => {
                  setViewingProduct(undefined);
                  handleEditProduct(viewingProduct);
                }}
                className="flex-1"
              >
                Modifier
              </Button>
              <Button
                variant="danger"
                onClick={() => {
                  setViewingProduct(undefined);
                  handleDeleteProduct(viewingProduct);
                }}
              >
                <Trash2 size={16} />
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};