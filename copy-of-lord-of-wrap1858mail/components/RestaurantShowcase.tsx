import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Clock, ShieldCheck, Heart } from 'lucide-react';
import { SECTION_IDS } from '../constants';

const galleryImages = [
  "https://images.unsplash.com/photo-1556910103-1c02745a30bf?q=80&w=2000&auto=format&fit=crop", // Kitchen
  "https://images.unsplash.com/photo-1577308856961-0e972379dc98?q=80&w=2000&auto=format&fit=crop", // Chef
  "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2000&auto=format&fit=crop", // Ambience
  "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=2000&auto=format&fit=crop"  // Close up
];

const RestaurantShowcase: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % galleryImages.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % galleryImages.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);

  return (
    <section id={SECTION_IDS.SHOWCASE} className="py-24 bg-white overflow-visible">
      <div className="max-w-7xl mx-auto px-4">
        
        {/* Header */}
        <div className="text-center mb-16">
          <motion.h2 
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
            className="text-4xl font-black text-gray-900 tracking-tight"
          >
            INSIDE LORD OF WRAP'S
          </motion.h2>
          <p className="mt-4 text-gray-500 font-medium">Chandigarh’s Favourite Wrap Kitchen since 2014</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Video / Main Image Section */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative aspect-video group"
          >
            {/* Inner Container for Image with Overflow Hidden */}
            <div className="absolute inset-0 rounded-3xl overflow-hidden shadow-2xl border-4 border-orange-50/50">
                {/* Using an image as video placeholder for demo */}
                <img 
                  src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=2000&auto=format&fit=crop" 
                  alt="Kitchen Action"
                  className="w-full h-full object-cover transform transition-transform duration-1000 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center group-hover:bg-black/20 transition-all">
                  <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/40 cursor-pointer hover:scale-110 transition-transform">
                    <div className="w-0 h-0 border-t-[10px] border-t-transparent border-l-[18px] border-l-white border-b-[10px] border-b-transparent ml-1"></div>
                  </div>
                </div>
            </div>
            
            {/* Floating Badge - Now OUTSIDE the overflow-hidden container so it doesn't get clipped */}
            <motion.div 
              animate={{ y: [0, -8, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              className="absolute -bottom-8 -right-8 bg-white p-4 rounded-2xl shadow-xl border border-gray-100 z-20 hidden md:block"
            >
               <div className="flex items-center gap-3 whitespace-nowrap">
                 <div className="bg-green-100 p-3 rounded-full text-green-700">
                   <ShieldCheck size={26} />
                 </div>
                 <div>
                   <p className="font-black text-gray-900 leading-tight mb-0.5 text-sm">100% Hygienic</p>
                   <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Certified Kitchen</p>
                 </div>
               </div>
            </motion.div>
          </motion.div>

          {/* Gallery & Description */}
          <div className="flex flex-col gap-8">
            <div className="relative h-64 w-full rounded-3xl overflow-hidden shadow-lg border border-gray-100">
              <AnimatePresence mode='wait'>
                <motion.img 
                  key={currentSlide}
                  src={galleryImages[currentSlide]}
                  initial={{ opacity: 0, scale: 1.1 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </AnimatePresence>
              
              <div className="absolute bottom-4 right-4 flex gap-2">
                <button onClick={prevSlide} className="p-2 bg-black/50 text-white rounded-full hover:bg-orange-600 transition-colors backdrop-blur-sm"><ChevronLeft size={20} /></button>
                <button onClick={nextSlide} className="p-2 bg-black/50 text-white rounded-full hover:bg-orange-600 transition-colors backdrop-blur-sm"><ChevronRight size={20} /></button>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-2xl font-extrabold text-gray-800 tracking-tight">Quality You Can Taste</h3>
              <p className="text-gray-600 leading-relaxed font-medium">
                Serving Chandigarh for 10+ years with fresh, handcrafted wraps, rolls and fast food. Our kitchen focuses on hygiene, premium flavors and fast delivery. We don't just make food; we craft experiences.
              </p>
              
              <div className="flex gap-6 pt-2">
                <div className="flex flex-col items-center gap-1">
                  <div className="p-3 bg-orange-50 rounded-2xl text-orange-600 mb-1">
                    <Clock size={24} />
                  </div>
                  <span className="text-xs font-bold text-gray-800 uppercase tracking-wide">Quick Cook</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <div className="p-3 bg-red-50 rounded-2xl text-red-600 mb-1">
                    <Heart size={24} />
                  </div>
                  <span className="text-xs font-bold text-gray-800 uppercase tracking-wide">Loved by 10k+</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default RestaurantShowcase;