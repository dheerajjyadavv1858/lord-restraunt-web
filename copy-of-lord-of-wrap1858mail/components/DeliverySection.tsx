import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Navigation, CheckCircle } from 'lucide-react';
import { SECTION_IDS, DELIVERY_ZONES } from '../constants';

const DeliverySection: React.FC = () => {
  const [pincode, setPincode] = useState('');
  const [status, setStatus] = useState<'idle' | 'checking' | 'available' | 'unavailable'>('idle');

  const checkAvailability = () => {
    setStatus('checking');
    setTimeout(() => {
        // Mock check
      if (pincode.startsWith('160')) {
        setStatus('available');
      } else {
        setStatus('unavailable');
      }
    }, 1500);
  };

  return (
    <section id={SECTION_IDS.DELIVERY} className="py-24 bg-gray-900 text-white relative overflow-hidden">
      {/* Abstract Map Background */}
      <div className="absolute inset-0 opacity-10">
         <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5"/>
            </pattern>
            <rect width="100%" height="100%" fill="url(#grid)" />
         </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 relative z-10 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        
        {/* Map Visualization */}
        <div className="relative h-[400px] w-full bg-gray-800 rounded-3xl border border-gray-700 shadow-2xl flex items-center justify-center overflow-hidden group">
            <div className="absolute inset-0 bg-[url('https://api.mapbox.com/styles/v1/mapbox/dark-v10/static/76.7794,30.7333,12,0/800x600?access_token=placeholder')] bg-cover bg-center opacity-50 grayscale group-hover:grayscale-0 transition-all duration-700"></div>
            
            {/* Animated Pulse Points for Chandigarh */}
            {[
                { top: '40%', left: '50%' },
                { top: '30%', left: '45%' },
                { top: '55%', left: '60%' },
            ].map((pos, i) => (
                <motion.div
                    key={i}
                    className="absolute w-4 h-4 bg-orange-500 rounded-full shadow-[0_0_20px_rgba(249,115,22,0.8)]"
                    style={pos}
                    animate={{ scale: [1, 1.5, 1], opacity: [0.8, 0.2, 0.8] }}
                    transition={{ duration: 2, repeat: Infinity, delay: i * 0.5 }}
                >
                    <div className="absolute inset-0 bg-orange-500 rounded-full animate-ping opacity-75"></div>
                </motion.div>
            ))}

            <div className="bg-black/60 backdrop-blur-md px-6 py-3 rounded-full border border-gray-600 flex items-center gap-3">
                <MapPin className="text-orange-500" />
                <span className="font-bold tracking-wide">Chandigarh (Tricity)</span>
            </div>
        </div>

        {/* Content */}
        <div className="space-y-8">
            <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
            >
                <h2 className="text-4xl font-black mb-4 tracking-tight">FAST DELIVERY ACROSS CHANDIGARH</h2>
                <p className="text-gray-400 text-lg font-medium">
                    Craving a wrap? We deliver hot and fresh within 30 minutes to most locations in the Tricity area.
                </p>
            </motion.div>

            <div className="bg-gray-800/50 p-6 rounded-2xl border border-gray-700 backdrop-blur-sm">
                <label className="block text-sm font-bold text-gray-400 mb-2 uppercase tracking-wider">Check Delivery Availability</label>
                <div className="flex gap-2">
                    <input 
                        type="text" 
                        placeholder="Enter Pincode (e.g. 160017)"
                        className="flex-1 bg-gray-900 border border-gray-600 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-orange-500 outline-none font-medium"
                        value={pincode}
                        onChange={(e) => setPincode(e.target.value)}
                    />
                    <button 
                        onClick={checkAvailability}
                        disabled={status === 'checking'}
                        className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-xl font-bold transition-colors"
                    >
                        {status === 'checking' ? 'Checking...' : 'Check'}
                    </button>
                </div>
                
                {status === 'available' && (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-4 flex items-center gap-2 text-green-400 font-bold">
                        <CheckCircle size={18} /> Delivery available in this area!
                    </motion.div>
                )}
                 {status === 'unavailable' && (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-4 flex items-center gap-2 text-red-400 font-bold">
                        <MapPin size={18} /> Sorry, we don't deliver here yet.
                    </motion.div>
                )}

                <div className="mt-6 pt-6 border-t border-gray-700">
                    <button className="flex items-center gap-2 text-sm text-orange-400 hover:text-orange-300 transition-colors font-semibold">
                        <Navigation size={16} /> Use my current location
                        <span className="relative flex h-3 w-3 ml-1">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-3 w-3 bg-orange-500"></span>
                        </span>
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
                {DELIVERY_ZONES.slice(0, 4).map((zone) => (
                    <div key={zone} className="flex items-center gap-2 text-gray-400 text-sm font-medium">
                        <div className="w-1.5 h-1.5 bg-gray-500 rounded-full" /> {zone}
                    </div>
                ))}
            </div>
        </div>

      </div>
    </section>
  );
};

export default DeliverySection;