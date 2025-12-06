import React from 'react';
import { motion } from 'framer-motion';
import { SECTION_IDS } from '../constants';

const AboutUs: React.FC = () => {
  return (
    <section id={SECTION_IDS.ABOUT} className="py-24 bg-[#FAFAFA] overflow-hidden">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-black text-gray-900 mb-4 tracking-tighter">OUR JOURNEY</h2>
          <p className="text-gray-600 font-medium text-lg">From a small stall to Chandigarh's favorite wrap brand.</p>
        </div>

        <div className="relative">
            {/* Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-orange-200"></div>

            <TimelineItem 
                year="2014" 
                title="The Beginning" 
                desc="Started with a small takeaway counter in Sector 15 with just 5 wrap varieties."
                side="left"
                index={0}
            />
             <TimelineItem 
                year="2018" 
                title="Expanding Flavors" 
                desc="Opened our first full-service outlet and introduced fusion rolls."
                side="right"
                index={1}
            />
             <TimelineItem 
                year="2024" 
                title="Lord of Wrap's Today" 
                desc="Delivering happiness across the Tricity with a menu of over 50 items."
                side="left"
                index={2}
            />
        </div>
        
        <div className="mt-20 relative h-64 rounded-3xl overflow-hidden shadow-xl">
             <div className="absolute inset-0">
                <img 
                    src="https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=2000&auto=format&fit=crop" 
                    className="w-full h-full object-cover"
                    alt="Kitchen Team"
                />
                <div className="absolute inset-0 bg-orange-900/60 flex items-center justify-center text-center p-8">
                     <div>
                         <h3 className="text-3xl font-black text-white mb-2 tracking-tight">MEET THE FOUNDERS</h3>
                         <p className="text-orange-100 italic font-medium text-lg">"We believe every wrap tells a story of flavor."</p>
                     </div>
                </div>
             </div>
        </div>
      </div>
    </section>
  );
};

const TimelineItem: React.FC<{ year: string; title: string; desc: string; side: 'left' | 'right'; index: number }> = ({ year, title, desc, side, index }) => {
    return (
        <motion.div 
            initial={{ opacity: 0, x: side === 'left' ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            className={`flex items-center justify-between w-full mb-8 ${side === 'left' ? 'flex-row-reverse' : ''}`}
        >
            <div className="w-5/12"></div>
            <div className="z-10 bg-orange-500 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold shadow-lg border-4 border-white">
                <div className="w-3 h-3 bg-white rounded-full"></div>
            </div>
            <div className="w-5/12 bg-white p-6 rounded-2xl shadow-lg border border-gray-100 hover:-translate-y-1 transition-transform">
                <span className="text-orange-600 font-extrabold text-sm block mb-1">{year}</span>
                <h4 className="font-bold text-gray-900 text-lg mb-2">{title}</h4>
                <p className="text-gray-500 text-sm leading-relaxed font-medium">{desc}</p>
            </div>
        </motion.div>
    )
}

export default AboutUs;