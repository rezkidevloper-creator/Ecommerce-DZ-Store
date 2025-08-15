import React, { useState } from 'react';
import { AppProvider, useApp } from './contexts/AppContext';
import { Header } from './components/Layout/Header';
import { Footer } from './components/Layout/Footer';
import { HomePage } from './pages/HomePage';
import { CartPage } from './pages/CartPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { AdminPage } from './pages/AdminPage';

type Page = 'home' | 'cart' | 'checkout' | 'admin';

const AppContent: React.FC = () => {
  const { isAdmin } = useApp();
  const [currentPage, setCurrentPage] = useState<Page>('home');

  const renderPage = () => {
    if (isAdmin) {
      return <AdminPage />;
    }

    switch (currentPage) {
      case 'cart':
        return <CartPage onPageChange={setCurrentPage} />;
      case 'checkout':
        return <CheckoutPage onPageChange={setCurrentPage} />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header currentPage={isAdmin ? 'admin' : currentPage} onPageChange={setCurrentPage} />
      <main className="flex-1">
        {renderPage()}
      </main>
      <Footer />
    </div>
  );
};

function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

export default App;