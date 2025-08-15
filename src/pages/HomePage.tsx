import React, { useState, useMemo } from 'react';
import { Search, ShoppingBag } from 'lucide-react';
import { useApp } from '../contexts/AppContext';
import { ProductCard } from '../components/Product/ProductCard';
import { ProductFilters } from '../components/Product/ProductFilters';
import { LoadingSpinner } from '../components/UI/LoadingSpinner';

export const HomePage: React.FC = () => {
  const { products } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 200000]);
  const [inStockOnly, setInStockOnly] = useState(false);

  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          product.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = !selectedCategory || product.category === selectedCategory;
      const matchesPrice = product.price <= priceRange[1];
      const matchesStock = !inStockOnly || product.stock > 0;

      return matchesSearch && matchesCategory && matchesPrice && matchesStock;
    });
  }, [products, searchQuery, selectedCategory, priceRange, inStockOnly]);

  if (!products.length) {
    return <LoadingSpinner />;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg text-white p-8 mb-8">
        <div className="max-w-3xl">
          <h1 className="text-4xl font-bold mb-4">
            Bienvenue chez Ecommerce DZ Store
          </h1>
          <p className="text-xl mb-6">
            Découvrez notre large sélection de produits de qualité, 
            livrés partout en Algérie avec paiement à la livraison.
          </p>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <ShoppingBag className="text-yellow-300" size={20} />
              <span>Livraison gratuite</span>
            </div>
            <div className="flex items-center space-x-2">
              <Search className="text-yellow-300" size={20} />
              <span>Large choix</span>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <ProductFilters
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        priceRange={priceRange}
        setPriceRange={setPriceRange}
        inStockOnly={inStockOnly}
        setInStockOnly={setInStockOnly}
      />

      {/* Results Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">
          Nos Produits
        </h2>
        <p className="text-gray-600">
          {filteredProducts.length} produit{filteredProducts.length !== 1 ? 's' : ''} trouvé{filteredProducts.length !== 1 ? 's' : ''}
        </p>
      </div>

      {/* Products Grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <Search size={64} className="mx-auto mb-4" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Aucun produit trouvé
          </h3>
          <p className="text-gray-600">
            Essayez de modifier vos filtres ou votre recherche.
          </p>
        </div>
      )}
    </div>
  );
};