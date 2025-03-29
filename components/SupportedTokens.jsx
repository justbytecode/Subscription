import React from 'react';
import { motion } from 'framer-motion';

function FeatureCard({ imageSource }) {
  return (

      <img 
        src={imageSource} 
        alt="Cryptocurrency" 
        className="h-24 object-contain mx-8"  // Standardized height and width
      />
  );
}

// Our features data
const supportedCoinsPath = [
  "./supportedCoins/bitcoin.svg",
  "./supportedCoins/ethereum.svg",
  "./supportedCoins/tether.svg",
  "./supportedCoins/bitcoin.svg",
  "./supportedCoins/ethereum.svg",
  "./supportedCoins/tether.svg",
  "./supportedCoins/bitcoin.svg",
  "./supportedCoins/ethereum.svg",
  "./supportedCoins/tether.svg",
  "./supportedCoins/bitcoin.svg",
  "./supportedCoins/bitcoin.svg"
];

const SupportedTokens = () => {
  // Animation settings
  const duration = 30;
  
  return (
    <div className="relative overflow-hidden py-10 w-full">
      <div className="relative w-full">
        <InfiniteCardsRow duration={duration} pauseOnHover={true} direction="left" />
      </div>
    </div>
  );
};

const InfiniteCardsRow = ({ 
  duration = 20, 
  pauseOnHover = false, 
  direction = "left" 
}) => {
  // Create two sets of tokens for the infinite effect
  const doubledFeatures = [...supportedCoinsPath, ...supportedCoinsPath];
  
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
        {doubledFeatures.map((source, idx) => (
          <FeatureCard key={idx} imageSource={source} />
        ))}
      </motion.div>
    
    </div>
  );
};

export default SupportedTokens;