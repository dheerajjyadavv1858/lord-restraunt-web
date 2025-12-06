import React from 'react';
import { motion } from 'framer-motion';
import { Plus, Flame, Star } from 'lucide-react';
import { MENU_ITEMS, SECTION_IDS } from '../constants';
import { MenuItem } from '../types';

interface MenuGridProps {
  addToCart: (item: MenuItem) => void;
}

const MenuGrid: React.FC<MenuGridProps> = ({ addToCart }) => {
  return (
    <section id={SECTION_IDS.MENU} className="py-24 px-4 bg-[#FAFAFA] relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-30">
        <div className="absolute top-20 -left-20 w-96 h-96 bg-orange-200 rounded-full blur-[100px]" />
        <div className="absolute bottom-20 -right-20 w-96 h-96 bg-red-200 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block mb-3"
          >
             <span className="bg-orange-100 text-orange-600 px-4 py-1.5 rounded-full text-sm font-extrabold uppercase tracking-widest">
               Hungry?
             </span>
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-black text-gray-900 mb-6 tracking-tighter"
          >
            OUR HANDCRAFTED MENU
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-500 max-w-xl mx-auto text-lg font-medium leading-relaxed"
          >
            Prepared with fresh ingredients, authentic spices, and a whole lot of love. Hover to explore the details.
          </motion.p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 md:gap-8">
          {MENU_ITEMS.map((item, index) => (
            <MenuCard key={item.id} item={item} index={index} addToCart={addToCart} />
          ))}
        </div>
      </div>
    </section>
  );
};

const MenuCard: React.FC<{ item: MenuItem; index: number; addToCart: (item: MenuItem) => void }> = ({ item, index, addToCart }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay: index * 0.05, duration: 0.4, type: "spring", stiffness: 100 }}
      className="group relative aspect-square rounded-[2rem] overflow-hidden bg-white shadow-xl hover:shadow-2xl hover:shadow-orange-500/30 transition-all duration-500 ease-out hover:-translate-y-3 cursor-pointer border border-gray-100"
    >
      {/* Background Image with Cinematic Zoom */}
      <div className="w-full h-full overflow-hidden">
        <img 
          src={item.imageUrl} 
          alt={item.name} 
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
        />
      </div>

      {/* Overlay Gradient - Darkens on hover for contrast */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />

      {/* Badges (Top Left) */}
      <div className="absolute top-5 left-5 flex gap-2 z-20">
         {item.category === 'Veg' ? (
           <div className="veg-icon bg-white/95 backdrop-blur-md shadow-sm">
             <div className="veg-icon-inner"></div>
           </div>
         ) : (
           <div className="non-veg-icon bg-white/95 backdrop-blur-md shadow-sm">
             <div className="non-veg-icon-inner"></div>
           </div>
         )}
      </div>

      {/* Status Badges (Top Right) */}
      <div className="absolute top-5 right-5 flex flex-col gap-2 items-end z-20">
        {item.isBestseller && (
          <motion.span 
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-white text-[10px] font-extrabold px-3 py-1.5 rounded-lg shadow-lg flex items-center gap-1.5 uppercase tracking-wide border border-white/20"
          >
            <Star size={11} fill="currentColor" /> Bestseller
          </motion.span>
        )}
        {item.isSpicy && (
          <motion.span 
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="bg-gradient-to-r from-red-500 to-red-600 text-white text-[10px] font-extrabold px-3 py-1.5 rounded-lg shadow-lg flex items-center gap-1.5 uppercase tracking-wide border border-white/20"
          >
            <Flame size={11} fill="currentColor" /> Spicy
          </motion.span>
        )}
      </div>

      {/* Content Area */}
      <div className="absolute bottom-0 left-0 right-0 p-6 flex flex-col justify-end z-20 h-1/2">
        <div className="transform transition-transform duration-500 group-hover:-translate-y-2">
            <h3 className="text-white font-extrabold text-xl md:text-2xl leading-none mb-2 drop-shadow-lg tracking-tight">
            {item.name}
            </h3>
            
            {/* Description - Fades in and slides up */}
            <div className="h-0 group-hover:h-auto overflow-hidden transition-all duration-300">
                <p className="text-gray-200 text-sm font-medium leading-snug opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 delay-100 pb-3">
                {item.description}
                </p>
            </div>
        </div>
        
        <div className="flex justify-between items-center items-end mt-1">
          <span className="text-white font-black text-2xl tracking-tighter drop-shadow-md">
            ₹{item.price}
          </span>
          
          {/* Add to Cart Button - Bouncy Pop */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              addToCart(item);
            }}
            className="relative bg-white text-orange-600 w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg hover:bg-orange-600 hover:text-white transition-colors duration-300
            transform md:scale-50 md:opacity-0 md:translate-y-8 
            group-hover:scale-100 group-hover:opacity-100 group-hover:translate-y-0
            active:scale-90"
            // Custom bounce bezier for the pop effect
            style={{ transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)' }}
          >
            <Plus size={24} strokeWidth={3} />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default MenuGrid;