import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { RefreshCw, Shield, Zap } from 'lucide-react';

function FeatureCard({ icon, title, description }) {
  return (
    <motion.div
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      className="bg-black backdrop-blur-sm p-8 rounded-xl border border-gray-800 hover:border-black transition-all duration-300 flex flex-col items-center text-center min-w-[300px] mx-4"
    >
      <div className="p-3 bg-blue-900/20 rounded-full w-fit mb-4">{icon}</div>
      <h3 className="text-xl font-bold mb-3 text-white">{title}</h3>
      <p className="text-gray-400">{description}</p>
    </motion.div>
  );
}

// Our features data
const features = [
  {
    icon: <Zap className="text-yellow-400" />,
    title: "Lightning Fast",
    description: "Process payments instantly with our optimized blockchain integration",
  },
  {
    icon: <Shield className="text-emerald-400" />,
    title: "Secure & Private",
    description: "End-to-end encryption and decentralized architecture for maximum security",
  },
  {
    icon: <RefreshCw className="text-blue-400" />,
    title: "Recurring Payments",
    description: "Set up and manage subscription plans with flexible payment schedules",
  },
  {
    icon: <Zap className="text-purple-400" />,
    title: "Global Support",
    description: "Accept payments in multiple currencies from anywhere in the world",
  },
  {
    icon: <Shield className="text-red-400" />,
    title: "Smart Contracts",
    description: "Automate complex payment logic with programmable transactions",
  },
];

const InfiniteMovingCards = () => {
  // Animation settings
  const duration = 30;
  const pauseDuration = 0;
  
  return (
    <div className="relative overflow-hidden py-10 w-full">
      <div className="relative w-full">
        <InfiniteCardsRow duration={duration} pauseOnHover={false} direction="left" />
      </div>
    </div>
  );
};

const InfiniteCardsRow = ({ 
  duration = 20, 
  pauseOnHover = false, 
  direction = "left" 
}) => {
  // based on the multiple feature it will look like infinit 
  const doubledFeatures = [...features, ...features];
  
  return (
    <div 
      className="flex overflow-hidden relative"
      style={{ 
        maskImage: "linear-gradient(to right, transparent, white 10%, white 90%, transparent)",
        WebkitMaskImage: "linear-gradient(to right, transparent, white 10%, white 90%, transparent)"
      }}
    >
      <motion.div 
        className="flex min-w-full gap-4 py-4"
        initial={{ x: direction === "right" ? "-100%" : "0%" }}
        animate={{ x: direction === "right" ? "0%" : "-100%" }}
        transition={{ 
          duration: duration,
          repeat: Infinity,
          repeatType: "loop",
          ease: "linear",
          repeatDelay: 0,
        }}
        {...(pauseOnHover && { whileHover: { animationPlayState: "paused" } })}
      >
        {doubledFeatures.map((feature, idx) => (
          <FeatureCard key={idx} {...feature} />
        ))}
      </motion.div>
    
    </div>
  );
};

export default InfiniteMovingCards;