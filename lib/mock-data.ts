import { Product, Offer } from '@/types';

export const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Basmati Rice Premium Quality',
    price: 180,
    originalPrice: 200,
    image: 'https://images.pexels.com/photos/1583884/pexels-photo-1583884.jpeg',
    category: 'Grains',
    rating: 4.5,
    stock: 50,
    unit: 'per kg',
    description: 'Premium quality basmati rice'
  },
  {
    id: '2',
    name: 'Fresh Organic Tomatoes',
    price: 80,
    image: 'https://images.pexels.com/photos/533280/pexels-photo-533280.jpeg',
    category: 'Vegetables',
    rating: 4.2,
    stock: 25,
    unit: 'per kg'
  },
  {
    id: '3',
    name: 'Pure Mustard Oil',
    price: 220,
    originalPrice: 250,
    image: 'https://images.pexels.com/photos/33783/olive-oil-salad-dressing-cooking-olive.jpg',
    category: 'Cooking Oil',
    rating: 4.6,
    stock: 30,
    unit: 'per liter'
  },
  {
    id: '4',
    name: 'Fresh Milk Daily',
    price: 60,
    image: 'https://images.pexels.com/photos/416658/pexels-photo-416658.jpeg',
    category: 'Dairy',
    rating: 4.8,
    stock: 20,
    unit: 'per liter'
  },
  {
    id: '5',
    name: 'Whole Wheat Flour',
    price: 65,
    image: 'https://images.pexels.com/photos/5639921/pexels-photo-5639921.jpeg',
    category: 'Grains',
    rating: 4.3,
    stock: 45,
    unit: 'per kg'
  },
  {
    id: '6',
    name: 'Red Lentils (Masoor Dal)',
    price: 120,
    originalPrice: 140,
    image: 'https://images.pexels.com/photos/7262793/pexels-photo-7262793.jpeg',
    category: 'Pulses',
    rating: 4.4,
    stock: 35,
    unit: 'per kg'
  },
  {
    id: '7',
    name: 'Himalayan Rock Salt',
    price: 25,
    image: 'https://images.pexels.com/photos/1059905/pexels-photo-1059905.jpeg',
    category: 'Spices',
    rating: 4.7,
    stock: 60,
    unit: 'per 500g'
  },
  {
    id: '8',
    name: 'Green Tea Bags',
    price: 150,
    image: 'https://images.pexels.com/photos/1417945/pexels-photo-1417945.jpeg',
    category: 'Beverages',
    rating: 4.1,
    stock: 40,
    unit: 'per pack'
  },
  {
    id: '9',
    name: 'Mixed Nuts Premium',
    price: 400,
    originalPrice: 450,
    image: 'https://images.pexels.com/photos/1295572/pexels-photo-1295572.jpeg',
    category: 'Dry Fruits',
    rating: 4.9,
    stock: 15,
    unit: 'per 500g'
  },
  {
    id: '10',
    name: 'Fresh Bananas',
    price: 90,
    image: 'https://images.pexels.com/photos/61127/pexels-photo-61127.jpeg',
    category: 'Fruits',
    rating: 4.0,
    stock: 30,
    unit: 'per dozen'
  },
  {
    id: '11',
    name: 'Chicken Eggs Farm Fresh',
    price: 200,
    image: 'https://images.pexels.com/photos/162712/egg-white-food-protein-162712.jpeg',
    category: 'Dairy',
    rating: 4.6,
    stock: 25,
    unit: 'per 30 pieces'
  },
  {
    id: '12',
    name: 'Instant Noodles Variety Pack',
    price: 300,
    originalPrice: 350,
    image: 'https://images.pexels.com/photos/4871125/pexels-photo-4871125.jpeg',
    category: 'Instant Food',
    rating: 3.8,
    stock: 50,
    unit: 'per pack of 12'
  },
  {
    id: '13',
    name: 'Fresh Potatoes',
    price: 45,
    image: 'https://images.pexels.com/photos/144248/potatoes-vegetables-erdfrucht-bio-144248.jpeg',
    category: 'Vegetables',
    rating: 4.2,
    stock: 100,
    unit: 'per kg'
  },
  {
    id: '14',
    name: 'Pure Honey Natural',
    price: 350,
    image: 'https://images.pexels.com/photos/87808/pexels-photo-87808.jpeg',
    category: 'Natural Products',
    rating: 4.8,
    stock: 12,
    unit: 'per 500g'
  },
  {
    id: '15',
    name: 'Turmeric Powder Pure',
    price: 80,
    image: 'https://images.pexels.com/photos/4198467/pexels-photo-4198467.jpeg',
    category: 'Spices',
    rating: 4.5,
    stock: 40,
    unit: 'per 250g'
  },
  {
    id: '16',
    name: 'Fresh Carrots',
    price: 70,
    image: 'https://images.pexels.com/photos/3650647/pexels-photo-3650647.jpeg',
    category: 'Vegetables',
    rating: 4.1,
    stock: 35,
    unit: 'per kg'
  },
  {
    id: '17',
    name: 'Coconut Oil Virgin',
    price: 280,
    originalPrice: 320,
    image: 'https://images.pexels.com/photos/4198019/pexels-photo-4198019.jpeg',
    category: 'Cooking Oil',
    rating: 4.7,
    stock: 18,
    unit: 'per 500ml'
  },
  {
    id: '18',
    name: 'Brown Sugar Natural',
    price: 95,
    image: 'https://images.pexels.com/photos/3622643/pexels-photo-3622643.jpeg',
    category: 'Sweeteners',
    rating: 4.3,
    stock: 25,
    unit: 'per kg'
  },
  {
    id: '19',
    name: 'Black Pepper Whole',
    price: 600,
    image: 'https://images.pexels.com/photos/4198020/pexels-photo-4198020.jpeg',
    category: 'Spices',
    rating: 4.6,
    stock: 20,
    unit: 'per 250g'
  },
  {
    id: '20',
    name: 'Fresh Ginger',
    price: 160,
    image: 'https://images.pexels.com/photos/2827395/pexels-photo-2827395.jpeg',
    category: 'Vegetables',
    rating: 4.4,
    stock: 15,
    unit: 'per kg'
  }
];

export const mockOffers: Offer[] = [
  {
    id: '1',
    title: 'Weekend Special - 25% Off Groceries',
    description: 'Get 25% discount on all grocery items this weekend',
    discount: 25,
    image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg',
    validUntil: '2024-12-31',
    category: 'Groceries'
  },
  {
    id: '2',
    title: 'Buy 2 Get 1 Free - Snacks',
    description: 'Buy any 2 snack items and get 1 absolutely free',
    discount: 33,
    image: 'https://images.pexels.com/photos/4198019/pexels-photo-4198019.jpeg',
    validUntil: '2024-12-25',
    category: 'Snacks'
  },
  {
    id: '3',
    title: 'Fresh Vegetables - 15% Off',
    description: 'All fresh vegetables at 15% discount daily',
    discount: 15,
    image: 'https://images.pexels.com/photos/1435904/pexels-photo-1435904.jpeg',
    validUntil: '2024-12-30',
    category: 'Vegetables'
  },
  {
    id: '4',
    title: 'Dairy Products Special Deal',
    description: 'Special prices on milk, curd, and other dairy products',
    discount: 20,
    image: 'https://images.pexels.com/photos/416658/pexels-photo-416658.jpeg',
    validUntil: '2024-12-28',
    category: 'Dairy'
  },
  {
    id: '5',
    title: 'Festival Special - Oil & Ghee',
    description: 'Festival special prices on cooking oil and ghee',
    discount: 18,
    image: 'https://images.pexels.com/photos/33783/olive-oil-salad-dressing-cooking-olive.jpg',
    validUntil: '2024-12-29',
    category: 'Cooking Oil'
  },
  {
    id: '6',
    title: 'Bulk Purchase Discount',
    description: 'Buy rice and dal in bulk and save more',
    discount: 12,
    image: 'https://images.pexels.com/photos/1583884/pexels-photo-1583884.jpeg',
    validUntil: '2024-12-31',
    category: 'Grains'
  }
];