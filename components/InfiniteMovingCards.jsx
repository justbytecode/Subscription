import React, { useRef, useState, useEffect } from 'react';
import { RefreshCw, Shield, Zap } from 'lucide-react';

function FeatureCard({ icon, title, description }) {
  return (
    <div
      className="bg-black backdrop-blur-sm p-4 sm:p-8 rounded-xl border border-gray-800 hover:border-black hover:-translate-y-1 transition-all duration-300 flex flex-col items-center text-center min-w-[250px] sm:min-w-[300px] mx-2 sm:mx-4"
    >
      <div className="p-2 sm:p-3 bg-blue-900/20 rounded-full w-fit mb-3 sm:mb-4">{icon}</div>
      <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3 text-white">{title}</h3>
      <p className="text-sm sm:text-base text-gray-400">{description}</p>
    </div>
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

// Main component
const InfiniteMovingCards = ({ scrollSpeed = 25, direction = "left" }) => {
  const [dragStartX, setDragStartX] = useState(0);
  const [dragOffsetX, setDragOffsetX] = useState(0);
  const [position, setPosition] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [autoScrollPaused, setAutoScrollPaused] = useState(false);
  const [carouselWidth, setCarouselWidth] = useState(0);
  const [rowWidth, setRowWidth] = useState(0);
  
  // Convert direction string to numeric direction
  const numericDirection = direction === "left" ? -1 : 1;
  
  const containerRef = useRef(null);
  const carouselRef = useRef(null);
  
  // Create 3 sets of features for infinite scrolling effect
  const tripleFeatures = [...features, ...features, ...features];
  
  // Initialize measurements
  useEffect(() => {
    const measureElements = () => {
      if (containerRef.current && carouselRef.current) {
        // Width of one set of cards
        const singleRowWidth = carouselRef.current.scrollWidth / 3;
        setRowWidth(singleRowWidth);
        setCarouselWidth(containerRef.current.offsetWidth);
      }
    };
    
    measureElements();
    window.addEventListener('resize', measureElements);
    return () => window.removeEventListener('resize', measureElements);
  }, []);
  
  // Auto scroll animation
  useEffect(() => {
    if (!rowWidth || isDragging || autoScrollPaused) return;
    
    let prevTimestamp = 0;
    let animationId;
    
    const animate = (timestamp) => {
      if (!prevTimestamp) prevTimestamp = timestamp;
      const elapsed = timestamp - prevTimestamp;
      prevTimestamp = timestamp;
      
      setPosition(prevPos => {
        // Calculate new position
        let newPos = prevPos + numericDirection * (elapsed / 1000) * scrollSpeed;
        
        // Reset position when we've moved one complete row width
        // This creates the infinite scroll effect
        if (numericDirection < 0 && newPos <= -rowWidth) {
          newPos += rowWidth;
        } else if (numericDirection > 0 && newPos >= 0) {
          newPos -= rowWidth;
        }
        
        return newPos;
      });
      
      animationId = requestAnimationFrame(animate);
    };
    
    animationId = requestAnimationFrame(animate);
    
    return () => {
      if (animationId) cancelAnimationFrame(animationId);
    };
  }, [rowWidth, isDragging, autoScrollPaused, numericDirection, scrollSpeed]);
  
  // Drag handlers
  const handleMouseDown = (e) => {
    e.preventDefault();
    setDragStartX(e.clientX);
    setIsDragging(true);
    setAutoScrollPaused(true);
  };
  
  const handleTouchStart = (e) => {
    setDragStartX(e.touches[0].clientX);
    setIsDragging(true);
    setAutoScrollPaused(true);
  };
  
  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const currentX = e.clientX;
    setDragOffsetX(currentX - dragStartX);
  };
  
  const handleTouchMove = (e) => {
    if (!isDragging) return;
    const currentX = e.touches[0].clientX;
    setDragOffsetX(currentX - dragStartX);
  };
  
  const handleDragEnd = () => {
    if (!isDragging) return;
    
    // Update position based on drag
    setPosition(prevPos => {
      let newPos = prevPos + dragOffsetX;
      
      // Reset position if we've moved beyond thresholds
      if (newPos < -rowWidth) {
        newPos += rowWidth;
      } else if (newPos > 0) {
        newPos -= rowWidth;
      }
      
      return newPos;
    });
    
    // Reset drag state
    setIsDragging(false);
    setDragOffsetX(0);
    
    // Resume auto-scrolling after a delay
    setTimeout(() => {
      setAutoScrollPaused(false);
    }, 1500);
  };
  
  // Calculate final transform position with drag
  const transformX = position + dragOffsetX;
  
  return (
    <div className="relative overflow-hidden py-6 sm:py-10 w-full">
      <div 
        ref={containerRef}
        className="relative w-full overflow-hidden"
        style={{ 
          maskImage: "linear-gradient(to right, transparent, white 5%, white 95%, transparent)",
          WebkitMaskImage: "linear-gradient(to right, transparent, white 5%, white 95%, transparent)"
        }}
      >
        <div
          className="cursor-grab active:cursor-grabbing"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleDragEnd}
          onMouseLeave={handleDragEnd}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleDragEnd}
        >
          <div 
            ref={carouselRef}
            className="flex gap-2 sm:gap-4 py-2 sm:py-4"
            style={{
              transform: `translateX(${transformX}px)`,
              transition: isDragging ? 'none' : 'transform 0.05s ease'
            }}
          >
            {tripleFeatures.map((feature, idx) => (
              <FeatureCard key={idx} {...feature} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfiniteMovingCards;