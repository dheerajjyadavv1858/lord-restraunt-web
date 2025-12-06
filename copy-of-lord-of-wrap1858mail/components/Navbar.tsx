import React, { useState, useEffect } from 'react';
import { ShoppingBag, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { BRAND_NAME, SECTION_IDS } from '../constants';
import { CartItem } from '../types';

interface NavbarProps {
  cartCount: number;
  toggleCart: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ cartCount, toggleCart }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/90 backdrop-blur-md shadow-md py-3' : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        {/* Logo */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center cursor-pointer"
          onClick={() => scrollToSection(SECTION_IDS.HOME)}
        >
          <span className={`text-2xl font-extrabold tracking-tighter ${isScrolled ? 'text-gray-900' : 'text-white'}`}>
            {BRAND_NAME.toUpperCase()}
          </span>
        </motion.div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8">
          {[
            { name: 'Menu', id: SECTION_IDS.MENU },
            { name: 'Showcase', id: SECTION_IDS.SHOWCASE },
            { name: 'Delivery', id: SECTION_IDS.DELIVERY },
            { name: 'About', id: SECTION_IDS.ABOUT },
          ].map((item) => (
            <button
              key={item.name}
              onClick={() => scrollToSection(item.id)}
              className={`text-sm font-bold tracking-wide hover:text-orange-500 transition-colors uppercase ${
                isScrolled ? 'text-gray-700' : 'text-white/90'
              }`}
            >
              {item.name}
            </button>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={toggleCart}
            className={`relative p-2 rounded-full ${
              isScrolled ? 'bg-orange-100 text-orange-600' : 'bg-white/20 text-white'
            } transition-colors`}
          >
            <ShoppingBag size={22} />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-600 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full animate-bounce">
                {cartCount}
              </span>
            )}
          </motion.button>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden text-orange-500"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} className={isScrolled ? 'text-gray-800' : 'text-white'} />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white shadow-lg overflow-hidden"
          >
            <div className="flex flex-col p-6 space-y-4">
               {[
                { name: 'Menu', id: SECTION_IDS.MENU },
                { name: 'Showcase', id: SECTION_IDS.SHOWCASE },
                { name: 'Delivery', id: SECTION_IDS.DELIVERY },
                { name: 'About', id: SECTION_IDS.ABOUT },
              ].map((item) => (
                <button
                  key={item.name}
                  onClick={() => scrollToSection(item.id)}
                  className="text-lg font-bold text-gray-800 text-left uppercase tracking-tight"
                >
                  {item.name}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;