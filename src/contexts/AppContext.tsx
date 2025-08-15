import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import { Product, Order, CartItem, DashboardStats } from '../types';
import { storageUtils } from '../utils/storage';
import { mockProducts } from '../data/mockProducts';

interface AppState {
  products: Product[];
  orders: Order[];
  cart: CartItem[];
  isAdmin: boolean;
}

type AppAction =
  | { type: 'SET_PRODUCTS'; payload: Product[] }
  | { type: 'ADD_PRODUCT'; payload: Product }
  | { type: 'UPDATE_PRODUCT'; payload: Product }
  | { type: 'DELETE_PRODUCT'; payload: string }
  | { type: 'SET_ORDERS'; payload: Order[] }
  | { type: 'ADD_ORDER'; payload: Order }
  | { type: 'UPDATE_ORDER'; payload: Order }
  | { type: 'SET_CART'; payload: CartItem[] }
  | { type: 'ADD_TO_CART'; payload: { product: Product; quantity: number } }
  | { type: 'REMOVE_FROM_CART'; payload: string }
  | { type: 'UPDATE_CART_QUANTITY'; payload: { productId: string; quantity: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'TOGGLE_ADMIN_MODE' };

const initialState: AppState = {
  products: [],
  orders: [],
  cart: [],
  isAdmin: false
};

const appReducer = (state: AppState, action: AppAction): AppState => {
  switch (action.type) {
    case 'SET_PRODUCTS':
      return { ...state, products: action.payload };
    
    case 'ADD_PRODUCT':
      const newProducts = [...state.products, action.payload];
      storageUtils.setProducts(newProducts);
      return { ...state, products: newProducts };
    
    case 'UPDATE_PRODUCT':
      const updatedProducts = state.products.map(p => 
        p.id === action.payload.id ? action.payload : p
      );
      storageUtils.setProducts(updatedProducts);
      return { ...state, products: updatedProducts };
    
    case 'DELETE_PRODUCT':
      const filteredProducts = state.products.filter(p => p.id !== action.payload);
      storageUtils.setProducts(filteredProducts);
      return { ...state, products: filteredProducts };
    
    case 'SET_ORDERS':
      return { ...state, orders: action.payload };
    
    case 'ADD_ORDER':
      const newOrders = [...state.orders, action.payload];
      storageUtils.setOrders(newOrders);
      return { ...state, orders: newOrders };
    
    case 'UPDATE_ORDER':
      const updatedOrders = state.orders.map(o => 
        o.id === action.payload.id ? action.payload : o
      );
      storageUtils.setOrders(updatedOrders);
      return { ...state, orders: updatedOrders };
    
    case 'SET_CART':
      return { ...state, cart: action.payload };
    
    case 'ADD_TO_CART':
      const existingItem = state.cart.find(item => item.product.id === action.payload.product.id);
      let newCart: CartItem[];
      
      if (existingItem) {
        newCart = state.cart.map(item =>
          item.product.id === action.payload.product.id
            ? { ...item, quantity: item.quantity + action.payload.quantity }
            : item
        );
      } else {
        newCart = [...state.cart, action.payload];
      }
      
      storageUtils.setCart(newCart);
      return { ...state, cart: newCart };
    
    case 'REMOVE_FROM_CART':
      const filteredCart = state.cart.filter(item => item.product.id !== action.payload);
      storageUtils.setCart(filteredCart);
      return { ...state, cart: filteredCart };
    
    case 'UPDATE_CART_QUANTITY':
      const updatedCart = state.cart.map(item =>
        item.product.id === action.payload.productId
          ? { ...item, quantity: action.payload.quantity }
          : item
      );
      storageUtils.setCart(updatedCart);
      return { ...state, cart: updatedCart };
    
    case 'CLEAR_CART':
      storageUtils.setCart([]);
      return { ...state, cart: [] };
    
    case 'TOGGLE_ADMIN_MODE':
      return { ...state, isAdmin: !state.isAdmin };
    
    default:
      return state;
  }
};

interface AppContextType extends AppState {
  dispatch: React.Dispatch<AppAction>;
  getDashboardStats: () => DashboardStats;
}

const AppContext = createContext<AppContextType | null>(null);

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  useEffect(() => {
    // Initialize data from localStorage or use mock data
    const products = storageUtils.getProducts();
    if (products.length === 0) {
      storageUtils.setProducts(mockProducts);
      dispatch({ type: 'SET_PRODUCTS', payload: mockProducts });
    } else {
      dispatch({ type: 'SET_PRODUCTS', payload: products });
    }

    const orders = storageUtils.getOrders();
    dispatch({ type: 'SET_ORDERS', payload: orders });

    const cart = storageUtils.getCart();
    dispatch({ type: 'SET_CART', payload: cart });
  }, []);

  const getDashboardStats = (): DashboardStats => {
    const totalSales = state.orders.reduce((sum, order) => sum + order.total, 0);
    const totalOrders = state.orders.length;
    const pendingOrders = state.orders.filter(order => order.status === 'pending').length;
    const totalProducts = state.products.length;

    return {
      totalSales,
      totalOrders,
      pendingOrders,
      totalProducts
    };
  };

  return (
    <AppContext.Provider value={{ ...state, dispatch, getDashboardStats }}>
      {children}
    </AppContext.Provider>
  );
};