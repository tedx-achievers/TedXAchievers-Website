import React from 'react';
import { motion } from 'framer-motion';
import BlurText from './ui/BlurText';

interface ComingSoonProps {
  title: string;
}

const ComingSoon: React.FC<ComingSoonProps> = ({ title }) => {
  return (
    <div className="h-screen w-full flex flex-col items-center justify-center bg-[#050505] text-white relative overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-1/4 left-1/4 w-[30rem] h-[30rem] bg-[#e62b1e] rounded-full mix-blend-screen filter blur-[150px] opacity-20 animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-[30rem] h-[30rem] bg-red-900 rounded-full mix-blend-screen filter blur-[150px] opacity-20" />
      
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="z-10 text-center space-y-6 px-4"
      >
        <BlurText 
          text={title} 
          delay={50} 
          animateBy="letters" 
          direction="bottom" 
          className="text-7xl md:text-9xl font-black tracking-tighter uppercase justify-center"
        />
        <div className="h-1.5 w-32 bg-[#e62b1e] mx-auto rounded-full" />
        <h2 className="text-2xl md:text-4xl font-light text-gray-300 uppercase tracking-[0.3em] mt-8">
          Coming Soon
        </h2>
        <p className="text-gray-500 mt-4 max-w-lg mx-auto text-sm md:text-base tracking-wide">
          We are currently curating an extraordinary experience. Stay tuned for updates.
        </p>
      </motion.div>
    </div>
  );
};

export default ComingSoon;
