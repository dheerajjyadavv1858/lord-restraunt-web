import { MenuItem } from './types';

export enum SECTION_IDS {
  HOME = 'home',
  MENU = 'menu',
  SHOWCASE = 'showcase',
  DELIVERY = 'delivery',
  ABOUT = 'about',
}

export const BRAND_NAME = "Lord of Wrap's";
export const BRAND_TAGLINE = "Chandigarh’s Fastest Wrap Delivery";
export const CONTACT_PHONE = "8264093595";
export const CONTACT_EMAIL = "arminders422@gmail.com";
export const LOCATION = "Chandigarh";

export const MENU_ITEMS: MenuItem[] = [
  {
    id: '1',
    name: 'Maharaja Chicken Wrap',
    description: 'Juicy tandoori chicken, mint mayo, fresh veggies.',
    price: 249,
    imageUrl: 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?q=80&w=800&auto=format&fit=crop',
    category: 'Non-Veg',
    isBestseller: true,
    isSpicy: true,
  },
  {
    id: '2',
    name: 'Paneer Tikka Roll',
    description: 'Smoky paneer cubes wrapped in a soft paratha.',
    price: 199,
    imageUrl: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?q=80&w=800&auto=format&fit=crop',
    category: 'Veg',
    isBestseller: true,
  },
  {
    id: '3',
    name: 'Cheesy Corn Salsa Wrap',
    description: 'Melting cheese, sweet corn, spicy salsa mix.',
    price: 179,
    imageUrl: 'https://images.unsplash.com/photo-1541529086526-db283c563270?q=80&w=800&auto=format&fit=crop',
    category: 'Veg',
  },
  {
    id: '4',
    name: 'Fiery Mutton Keema',
    description: 'Spicy minced mutton with secret spices.',
    price: 299,
    imageUrl: 'https://images.unsplash.com/photo-1563379926898-05f4575a45d8?q=80&w=800&auto=format&fit=crop',
    category: 'Non-Veg',
    isSpicy: true,
  },
  {
    id: '5',
    name: 'Falafel Hummus Wrap',
    description: 'Crispy falafel, creamy hummus, pickled veggies.',
    price: 189,
    imageUrl: 'https://images.unsplash.com/photo-1564767667063-549a15c809b9?q=80&w=800&auto=format&fit=crop',
    category: 'Veg',
  },
  {
    id: '6',
    name: 'Egg & Cheese Burst',
    description: 'Double egg omelette with liquid cheese core.',
    price: 159,
    imageUrl: 'https://images.unsplash.com/photo-1505253716362-afaea1d3d1af?q=80&w=800&auto=format&fit=crop',
    category: 'Non-Veg',
  },
  {
    id: '7',
    name: 'BBQ Smoked Chicken',
    description: 'Smokey BBQ sauce glazed chicken strips.',
    price: 259,
    imageUrl: 'https://images.unsplash.com/photo-1574484284008-86d4751c6c96?q=80&w=800&auto=format&fit=crop',
    category: 'Non-Veg',
    isBestseller: true,
  },
  {
    id: '8',
    name: 'Mexican Bean Burrito',
    description: 'Kidney beans, rice, salsa, and sour cream.',
    price: 209,
    imageUrl: 'https://images.unsplash.com/photo-1628191013008-333e8b0a9844?q=80&w=800&auto=format&fit=crop',
    category: 'Veg',
    isSpicy: true,
  }
];

export const DELIVERY_ZONES = [
  "Sector 17", "Sector 35", "Mohali Phase 7", "Zirakpur", "Manimajra"
];
