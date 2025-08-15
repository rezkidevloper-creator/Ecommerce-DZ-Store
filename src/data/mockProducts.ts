import { Product } from '../types';

export const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Smartphone Samsung Galaxy A54',
    description: 'Smartphone 5G avec écran Super AMOLED 6.4", triple caméra 50MP, 128GB',
    price: 45000,
    category: 'Electronics',
    image: 'https://images.pexels.com/photos/404280/pexels-photo-404280.jpeg?auto=compress&cs=tinysrgb&w=500',
    stock: 15,
    createdAt: '2024-01-15T10:00:00Z'
  },
  {
    id: '2',
    name: 'Nike Air Max 270',
    description: 'Chaussures de sport Nike Air Max 270 pour homme, confort et style',
    price: 18000,
    category: 'Fashion',
    image: 'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=500',
    stock: 8,
    createdAt: '2024-01-16T14:30:00Z'
  },
  {
    id: '3',
    name: 'MacBook Air M2',
    description: 'MacBook Air 13" avec puce M2, 8GB RAM, 256GB SSD',
    price: 165000,
    category: 'Electronics',
    image: 'https://images.pexels.com/photos/18105/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=500',
    stock: 5,
    createdAt: '2024-01-17T09:15:00Z'
  },
  {
    id: '4',
    name: 'Robe Élégante',
    description: 'Robe élégante pour femme, parfaite pour les occasions spéciales',
    price: 8500,
    category: 'Fashion',
    image: 'https://images.pexels.com/photos/985635/pexels-photo-985635.jpeg?auto=compress&cs=tinysrgb&w=500',
    stock: 12,
    createdAt: '2024-01-18T16:45:00Z'
  },
  {
    id: '5',
    name: 'Canapé 3 Places',
    description: 'Canapé confortable 3 places en tissu, couleur gris moderne',
    price: 55000,
    category: 'Home & Garden',
    image: 'https://images.pexels.com/photos/1350789/pexels-photo-1350789.jpeg?auto=compress&cs=tinysrgb&w=500',
    stock: 3,
    createdAt: '2024-01-19T11:20:00Z'
  },
  {
    id: '6',
    name: 'Ballon de Football',
    description: 'Ballon de football professionnel, taille officielle',
    price: 3200,
    category: 'Sports & Fitness',
    image: 'https://images.pexels.com/photos/274506/pexels-photo-274506.jpeg?auto=compress&cs=tinysrgb&w=500',
    stock: 20,
    createdAt: '2024-01-20T13:10:00Z'
  }
];