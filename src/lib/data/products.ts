import { Product } from '@/types';

export const categories = [
  { id: 'all', name: 'All Items', icon: '🛒' },
  { id: 'fruits', name: 'Fruits', icon: '🍎' },
  { id: 'vegetables', name: 'Vegetables', icon: '🥬' },
  { id: 'dairy', name: 'Dairy', icon: '🥛' },
  { id: 'grains', name: 'Grains & Pulses', icon: '🌾' },
  { id: 'spices', name: 'Spices', icon: '🌶️' },
  { id: 'snacks', name: 'Snacks', icon: '🍿' },
  { id: 'beverages', name: 'Beverages', icon: '☕' },
  { id: 'oils', name: 'Oils & Ghee', icon: '🫒' },
  { id: 'personal', name: 'Personal Care', icon: '🧴' },
];

export const products: Product[] = [
  // Fruits
  {
    id: '1', name: 'Organic Bananas', nameHindi: 'केला', category: 'fruits',
    price: 49, originalPrice: 65, unit: '1 dozen',
    image: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?auto=format&fit=crop&q=80&w=400',
    rating: 4.5, inStock: true, isOrganic: true, discount: 25,
  },
  {
    id: '6', name: 'Alphonso Mangoes', nameHindi: 'आम', category: 'fruits',
    price: 399, originalPrice: 499, unit: '1 dozen',
    image: 'https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&q=80&w=400',
    rating: 4.9, inStock: true, discount: 20,
  },
  {
    id: '12', name: 'Green Apples', nameHindi: 'सेब', category: 'fruits',
    price: 199, unit: '1 kg',
    image: 'https://images.unsplash.com/photo-1619546813926-a78fa6372cd2?auto=format&fit=crop&q=80&w=400',
    rating: 4.3, inStock: true,
  },
  {
    id: '31', name: 'Oranges', nameHindi: 'संतरा', category: 'fruits',
    price: 89, unit: '1 kg',
    image: 'https://images.unsplash.com/photo-1611080626919-7cf5a9dbab12?auto=format&fit=crop&q=80&w=400',
    rating: 4.3, inStock: true,
  },
  // Vegetables
  {
    id: '2', name: 'Fresh Tomatoes', nameHindi: 'टमाटर', category: 'vegetables',
    price: 35, unit: '500g',
    image: 'https://images.unsplash.com/photo-1546470427-e26264be0b0d?auto=format&fit=crop&q=80&w=400',
    rating: 4.2, inStock: true,
  },
  {
    id: '5', name: 'Fresh Spinach', nameHindi: 'पालक', category: 'vegetables',
    price: 30, unit: '250g',
    image: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?auto=format&fit=crop&q=80&w=400',
    rating: 4.3, inStock: true, isOrganic: true,
  },
  {
    id: '13', name: 'Potatoes', nameHindi: 'आलू', category: 'vegetables',
    price: 28, unit: '1 kg',
    image: 'https://images.unsplash.com/photo-1590165482129-1b8b276701c8?auto=format&fit=crop&q=80&w=400',
    rating: 4.1, inStock: true,
  },
  {
    id: '14', name: 'Onions', nameHindi: 'प्याज', category: 'vegetables',
    price: 32, unit: '1 kg',
    image: 'https://images.unsplash.com/photo-1618512496248-a2f0c1c88db2?auto=format&fit=crop&q=80&w=400',
    rating: 4.0, inStock: true,
  },
  {
    id: '32', name: 'Cauliflower', nameHindi: 'गोभी', category: 'vegetables',
    price: 45, unit: '1 piece',
    image: 'https://images.unsplash.com/photo-1568584711075-3d021a7c3ec3?auto=format&fit=crop&q=80&w=400',
    rating: 4.1, inStock: true,
  },
  // Dairy
  {
    id: '3', name: 'Amul Milk', nameHindi: 'दूध', category: 'dairy',
    price: 68, unit: '1 litre',
    image: 'https://images.unsplash.com/photo-1563636619-e910ef2a844b?auto=format&fit=crop&q=80&w=400',
    rating: 4.8, inStock: true,
  },
  {
    id: '8', name: 'Paneer', nameHindi: 'पनीर', category: 'dairy',
    price: 89, unit: '200g',
    image: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&q=80&w=400',
    rating: 4.5, inStock: true,
  },
  {
    id: '11', name: 'Fresh Curd', nameHindi: 'दही', category: 'dairy',
    price: 45, unit: '400g',
    image: 'https://images.unsplash.com/photo-1584278860047-22db9ff82bed?auto=format&fit=crop&q=80&w=400',
    rating: 4.4, inStock: true,
  },
  // Grains
  {
    id: '4', name: 'Basmati Rice', nameHindi: 'बासमती चावल', category: 'grains',
    price: 189, originalPrice: 220, unit: '1 kg',
    image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&q=80&w=400',
    rating: 4.6, inStock: true, discount: 14,
  },
  {
    id: '7', name: 'Toor Dal', nameHindi: 'तूर दाल', category: 'grains',
    price: 145, unit: '1 kg',
    image: 'https://images.unsplash.com/photo-1585994437202-09923a1a9805?auto=format&fit=crop&q=80&w=400',
    rating: 4.4, inStock: true,
  },
  // Spices
  {
    id: '9', name: 'Red Chilli Powder', nameHindi: 'लाल मिर्च', category: 'spices',
    price: 75, unit: '100g',
    image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&q=80&w=400',
    rating: 4.3, inStock: true,
  },
  {
    id: '10', name: 'Turmeric Powder', nameHindi: 'हल्दी', category: 'spices',
    price: 55, unit: '100g',
    image: 'https://images.unsplash.com/photo-1573428164716-ebb2cd0ca279?auto=format&fit=crop&q=80&w=400',
    rating: 4.7, inStock: true, isOrganic: true,
  },
  // Snacks
  {
    id: '16', name: 'Maggi Noodles', nameHindi: 'मैगी', category: 'snacks',
    price: 56, unit: '4 pack',
    image: 'https://images.unsplash.com/photo-1552611052-33e04de081de?auto=format&fit=crop&q=80&w=400',
    rating: 4.5, inStock: true,
  },
  // Beverages
  {
    id: '17', name: 'Tata Tea Gold', nameHindi: 'चाय', category: 'beverages',
    price: 245, originalPrice: 280, unit: '500g',
    image: 'https://images.unsplash.com/photo-1544787210-2211d619ed66?auto=format&fit=crop&q=80&w=400',
    rating: 4.6, inStock: true, discount: 12,
  },
  // Oils
  {
    id: '19', name: 'Desi Ghee', nameHindi: 'घी', category: 'oils',
    price: 549, originalPrice: 620, unit: '1 litre',
    image: 'https://images.unsplash.com/photo-1589927986089-35812388d1f4?auto=format&fit=crop&q=80&w=400',
    rating: 4.8, inStock: true, discount: 11,
  },
];
