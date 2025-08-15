import { Product, Order, CartItem } from '../types';

const STORAGE_KEYS = {
  PRODUCTS: 'ecommerce_dz_products',
  ORDERS: 'ecommerce_dz_orders',
  CART: 'ecommerce_dz_cart'
};

export const storageUtils = {
  // Products
  getProducts: (): Product[] => {
    const products = localStorage.getItem(STORAGE_KEYS.PRODUCTS);
    return products ? JSON.parse(products) : [];
  },

  setProducts: (products: Product[]): void => {
    localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(products));
  },

  // Orders
  getOrders: (): Order[] => {
    const orders = localStorage.getItem(STORAGE_KEYS.ORDERS);
    return orders ? JSON.parse(orders) : [];
  },

  setOrders: (orders: Order[]): void => {
    localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders));
  },

  // Cart
  getCart: (): CartItem[] => {
    const cart = localStorage.getItem(STORAGE_KEYS.CART);
    return cart ? JSON.parse(cart) : [];
  },

  setCart: (cart: CartItem[]): void => {
    localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(cart));
  }
};