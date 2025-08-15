import React from 'react';
import { Phone, Mail, MapPin, ShoppingCart, ShieldCheck, Truck, CreditCard } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Store Information */}
          <div className="col-span-1 md:col-span-2 space-y-6">
            <div className="flex items-center space-x-3">
              <ShoppingCart className="text-blue-400" size={28} />
              <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                Ecommerce DZ Store
              </h3>
            </div>
            <p className="text-gray-300 leading-relaxed">
              Votre destination premium pour des achats en ligne en Algérie. 
              Nous offrons des produits de qualité avec une livraison rapide 
              et un service client exceptionnel dans tout le pays.
            </p>
            
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <MapPin className="text-blue-400 mt-1 flex-shrink-0" size={18} />
                <span className="text-sm">Alger Centre, Algérie</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="text-blue-400" size={18} />
                <span className="text-sm">+213 123 456 789</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="text-blue-400" size={18} />
                <span className="text-sm">contact@ecommercedz.dz</span>
              </div>
            </div>
          </div>
          
          {/* Navigation Links */}
          <div className="space-y-6">
            <h4 className="text-lg font-semibold text-white">Navigation</h4>
            <ul className="space-y-3 text-gray-300">
              <li>
                <a href="#" className="hover:text-blue-400 transition-colors flex items-center space-x-2">
                  <span className="w-1 h-1 bg-blue-400 rounded-full"></span>
                  <span>Accueil</span>
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-400 transition-colors flex items-center space-x-2">
                  <span className="w-1 h-1 bg-blue-400 rounded-full"></span>
                  <span>Nouveautés</span>
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-400 transition-colors flex items-center space-x-2">
                  <span className="w-1 h-1 bg-blue-400 rounded-full"></span>
                  <span>Catégories</span>
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-400 transition-colors flex items-center space-x-2">
                  <span className="w-1 h-1 bg-blue-400 rounded-full"></span>
                  <span>Promotions</span>
                </a>
              </li>
            </ul>
          </div>
          
          {/* Customer Service */}
          <div className="space-y-6">
            <h4 className="text-lg font-semibold text-white">Service Client</h4>
            <ul className="space-y-3 text-gray-300">
              <li>
                <a href="#" className="hover:text-blue-400 transition-colors flex items-center space-x-2">
                  <Truck className="text-blue-400" size={16} />
                  <span>Suivi de commande</span>
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-400 transition-colors flex items-center space-x-2">
                  <ShieldCheck className="text-blue-400" size={16} />
                  <span>Politique de retour</span>
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-400 transition-colors flex items-center space-x-2">
                  <CreditCard className="text-blue-400" size={16} />
                  <span>Modes de paiement</span>
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-400 transition-colors flex items-center space-x-2">
                  <Phone className="text-blue-400" size={16} />
                  <span>Contactez-nous</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Developer Credit and Copyright */}
        <div className="border-t border-gray-700 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">
              &copy; {new Date().getFullYear()} Ecommerce DZ Store. Tous droits réservés.
            </p>
            
            <div className="flex items-center space-x-2">
              <span className="text-gray-400 text-sm">Développé par</span>
              <a 
                href="https://github.com/Rezki-Dev" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-cyan-300 transition-colors font-medium"
              >
                Rezki-Dev
              </a>
              <span className="text-gray-500">|</span>
              <a 
                href="mailto:rezki.devloper@gmail.com" 
                className="text-gray-400 hover:text-white text-sm transition-colors"
              >
                Contact Développeur
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};