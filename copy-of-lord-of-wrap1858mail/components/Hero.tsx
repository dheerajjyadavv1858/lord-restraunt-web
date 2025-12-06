import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { ArrowRight, Star } from 'lucide-react';
import { BRAND_TAGLINE, SECTION_IDS } from '../constants';

const backgroundImages = [
  "https://images.unsplash.com/photo-1556910103-1c02745a30bf?q=80&w=2524&auto=format&fit=crop", // Busy Kitchen Team
  "https://images.unsplash.com/photo-1577308856961-0e972379dc98?q=80&w=2524&auto=format&fit=crop", // Chef Cooking
  "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=2524&auto=format&fit=crop", // Food Prep
  "https://images.unsplash.com/photo-1617347454431-f49d7ff5c301?q=80&w=2524&auto=format&fit=crop"  // Delivery Rider
];

const Hero: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Parallax Scroll Effect
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  // Cycle images every 4 seconds to tell the story
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % backgroundImages.length);
    }, 4000); 
    return () => clearInterval(timer);
  }, []);

  return (
    <div id={SECTION_IDS.HOME} className="relative h-screen w-full overflow-hidden bg-gray-900" ref={ref}>
      
      {/* Animated Background Slideshow */}
      <motion.div style={{ y, opacity }} className="absolute inset-0 z-0">
        <AnimatePresence mode='popLayout'>
          <motion.img 
            key={currentSlide}
            src={backgroundImages[currentSlide]}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="absolute inset-0 w-full h-full object-cover brightness-[0.35]"
            alt="Restaurant Story Sequence"
          />
        </AnimatePresence>
        
        {/* Gradient Overlay for Text Readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-transparent to-black/80" />
      </motion.div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-center items-center text-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-5xl"
        >
          {/* Trust Badge */}
          <div className="flex justify-center mb-8">
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5, type: "spring" }}
              className="bg-white/10 backdrop-blur-md border border-white/20 text-orange-400 px-5 py-2 rounded-full flex items-center gap-2 text-xs uppercase tracking-widest font-black shadow-xl"
            >
              <Star size={14} fill="currentColor" /> 10 Years of Excellence
            </motion.div>
          </div>

          <h1 className="text-6xl md:text-8xl lg:text-9xl font-black text-white mb-6 leading-[0.9] tracking-tighter drop-shadow-2xl">
            LORD OF <br className="md:hidden" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-600">WRAP'S</span>
          </h1>
          
          <p className="text-xl md:text-3xl text-gray-200 mb-12 font-medium max-w-3xl mx-auto tracking-tight leading-snug">
            {BRAND_TAGLINE}
          </p>

          <div className="flex flex-col sm:flex-row gap-5 justify-center items-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => document.getElementById(SECTION_IDS.MENU)?.scrollIntoView({ behavior: 'smooth' })}
              className="px-10 py-5 bg-orange-600 hover:bg-orange-700 text-white rounded-2xl font-black text-xl shadow-2xl shadow-orange-600/40 flex items-center gap-3 tracking-wide"
            >
              ORDER NOW <ArrowRight size={24} strokeWidth={3} />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => document.getElementById(SECTION_IDS.SHOWCASE)?.scrollIntoView({ behavior: 'smooth' })}
              className="px-10 py-5 bg-white/5 hover:bg-white/10 backdrop-blur-md text-white border border-white/20 rounded-2xl font-bold text-xl tracking-wide"
            >
              EXPLORE MENU
            </motion.button>
          </div>
        </motion.div>
      </div>

      {/* Steam/Smoke Effect Animation */}
      <motion.div 
        animate={{ opacity: [0, 0.4, 0], y: [-20, -100], scale: [1, 1.5] }}
        transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
        className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-white blur-[80px] opacity-20 pointer-events-none rounded-full mix-blend-overlay"
      />
      
      {/* Bottom Fade */}
      <div className="absolute bottom-0 w-full h-40 bg-gradient-to-t from-[#FAFAFA] to-transparent z-10" />
    </div>
  );
};

export default Hero;