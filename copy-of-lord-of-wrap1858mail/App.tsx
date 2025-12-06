import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import MenuGrid from './components/MenuGrid';
import RestaurantShowcase from './components/RestaurantShowcase';
import DeliverySection from './components/DeliverySection';
import AboutUs from './components/AboutUs';
import CartDrawer from './components/CartDrawer';
import AIChatbot from './components/AIChatbot';
import { MenuItem, CartItem } from './types';
import { BRAND_NAME, CONTACT_EMAIL, CONTACT_PHONE } from './constants';
import { Instagram, Facebook, Twitter } from 'lucide-react';

const App: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const addToCart = (item: MenuItem) => {
    setCartItems(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) {
        return prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prev, { ...item, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (id: string) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const updateQuantity = (id: string, delta: number) => {
    setCartItems(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = item.quantity + delta;
        return newQty > 0 ? { ...item, quantity: newQty } : item;
      }
      return item;
    }));
  };

  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="min-h-screen bg-[#FAFAFA] font-sans text-gray-900">
      
      <Navbar cartCount={cartCount} toggleCart={() => setIsCartOpen(!isCartOpen)} />
      
      <main>
        <Hero />
        <MenuGrid addToCart={addToCart} />
        <RestaurantShowcase />
        <DeliverySection />
        <AboutUs />
      </main>

      <footer className="bg-gray-900 text-white py-12 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-1">
                <h3 className="text-2xl font-black mb-4 tracking-tighter uppercase">{BRAND_NAME}</h3>
                <p className="text-gray-400 text-sm leading-relaxed font-medium">
                    Satisfying hunger pangs in Chandigarh with premium wraps and rolls since 2014.
                </p>
            </div>
            <div>
                <h4 className="font-bold mb-4 text-orange-500 uppercase tracking-wide text-sm">Quick Links</h4>
                <ul className="space-y-2 text-sm text-gray-400 font-medium">
                    <li className="hover:text-white cursor-pointer transition-colors">Menu</li>
                    <li className="hover:text-white cursor-pointer transition-colors">Track Order</li>
                    <li className="hover:text-white cursor-pointer transition-colors">Franchise Enquiry</li>
                </ul>
            </div>
             <div>
                <h4 className="font-bold mb-4 text-orange-500 uppercase tracking-wide text-sm">Contact</h4>
                <ul className="space-y-2 text-sm text-gray-400 font-medium">
                    <li>{CONTACT_PHONE}</li>
                    <li>{CONTACT_EMAIL}</li>
                    <li>Sector 15, Chandigarh</li>
                </ul>
            </div>
             <div>
                <h4 className="font-bold mb-4 text-orange-500 uppercase tracking-wide text-sm">Follow Us</h4>
                <div className="flex gap-4">
                    <a href="#" className="p-2 bg-gray-800 rounded-full hover:bg-orange-600 transition-colors"><Instagram size={18} /></a>
                    <a href="#" className="p-2 bg-gray-800 rounded-full hover:bg-orange-600 transition-colors"><Facebook size={18} /></a>
                    <a href="#" className="p-2 bg-gray-800 rounded-full hover:bg-orange-600 transition-colors"><Twitter size={18} /></a>
                </div>
            </div>
        </div>
        <div className="text-center mt-12 pt-8 border-t border-gray-800 text-gray-600 text-xs font-medium">
            © {new Date().getFullYear()} {BRAND_NAME}. All rights reserved.
        </div>
      </footer>

      <CartDrawer 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        cartItems={cartItems} 
        removeFromCart={removeFromCart}
        updateQuantity={updateQuantity}
      />
      
      <AIChatbot />
    </div>
  );
};

export default App;