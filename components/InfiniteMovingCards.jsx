// import React, { useRef, useState, useEffect } from 'react';
// import { RefreshCw, Shield, Zap } from 'lucide-react';

// function FeatureCard({ icon, title, description }) {
//   return (
//     <div
//       className="bg-black backdrop-blur-sm p-4 sm:p-8 rounded-xl border border-gray-800 hover:border-black hover:-translate-y-1 transition-all duration-300 flex flex-col items-center text-center min-w-[250px] sm:min-w-[300px] mx-2 sm:mx-4"
//     >
//       <div className="p-2 sm:p-3 bg-blue-900/20 rounded-full w-fit mb-3 sm:mb-4">{icon}</div>
//       <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3 text-white">{title}</h3>
//       <p className="text-sm sm:text-base text-gray-400">{description}</p>
//     </div>
//   );
// }

// // Our features data
// const features = [
//   {
//     icon: <Zap className="text-yellow-400" />,
//     title: "Lightning Fast",
//     description: "Process payments instantly with our optimized blockchain integration",
//   },
//   {
//     icon: <Shield className="text-emerald-400" />,
//     title: "Secure & Private",
//     description: "End-to-end encryption and decentralized architecture for maximum security",
//   },
//   {
//     icon: <RefreshCw className="text-blue-400" />,
//     title: "Recurring Payments",
//     description: "Set up and manage subscription plans with flexible payment schedules",
//   },
//   {
//     icon: <Zap className="text-purple-400" />,
//     title: "Global Support",
//     description: "Accept payments in multiple currencies from anywhere in the world",
//   },
//   {
//     icon: <Shield className="text-red-400" />,
//     title: "Smart Contracts",
//     description: "Automate complex payment logic with programmable transactions",
//   },
// ];

// // Main component
// const InfiniteMovingCards = ({ scrollSpeed = 25, direction = "left" }) => {
//   const [dragStartX, setDragStartX] = useState(0);
//   const [dragOffsetX, setDragOffsetX] = useState(0);
//   const [position, setPosition] = useState(0);
//   const [isDragging, setIsDragging] = useState(false);
//   const [autoScrollPaused, setAutoScrollPaused] = useState(false);
//   const [carouselWidth, setCarouselWidth] = useState(0);
//   const [rowWidth, setRowWidth] = useState(0);
  
//   // Convert direction string to numeric direction
//   const numericDirection = direction === "left" ? -1 : 1;
  
//   const containerRef = useRef(null);
//   const carouselRef = useRef(null);
  
//   // Create 3 sets of features for infinite scrolling effect
//   const tripleFeatures = [...features, ...features, ...features];
  
//   // Initialize measurements
//   useEffect(() => {
//     const measureElements = () => {
//       if (containerRef.current && carouselRef.current) {
//         // Width of one set of cards
//         const singleRowWidth = carouselRef.current.scrollWidth / 3;
//         setRowWidth(singleRowWidth);
//         setCarouselWidth(containerRef.current.offsetWidth);
//       }
//     };
    
//     measureElements();
//     window.addEventListener('resize', measureElements);
//     return () => window.removeEventListener('resize', measureElements);
//   }, []);
  
//   // Auto scroll animation
//   useEffect(() => {
//     if (!rowWidth || isDragging || autoScrollPaused) return;
    
//     let prevTimestamp = 0;
//     let animationId;
    
//     const animate = (timestamp) => {
//       if (!prevTimestamp) prevTimestamp = timestamp;
//       const elapsed = timestamp - prevTimestamp;
//       prevTimestamp = timestamp;
      
//       setPosition(prevPos => {
//         // Calculate new position
//         let newPos = prevPos + numericDirection * (elapsed / 1000) * scrollSpeed;
        
//         // Reset position when we've moved one complete row width
//         // This creates the infinite scroll effect
//         if (numericDirection < 0 && newPos <= -rowWidth) {
//           newPos += rowWidth;
//         } else if (numericDirection > 0 && newPos >= 0) {
//           newPos -= rowWidth;
//         }
        
//         return newPos;
//       });
      
//       animationId = requestAnimationFrame(animate);
//     };
    
//     animationId = requestAnimationFrame(animate);
    
//     return () => {
//       if (animationId) cancelAnimationFrame(animationId);
//     };
//   }, [rowWidth, isDragging, autoScrollPaused, numericDirection, scrollSpeed]);
  
//   // Drag handlers- earlier 
//   // const handleMouseDown = (e) => {
//   //   e.preventDefault();
//   //   setDragStartX(e.clientX);
//   //   setIsDragging(true);
//   //   setAutoScrollPaused(true);
//   // };
  
//   // const handleTouchStart = (e) => {
//   //   setDragStartX(e.touches[0].clientX);
//   //   setIsDragging(true);
//   //   setAutoScrollPaused(true);
//   // };
  
//   // const handleMouseMove = (e) => {
//   //   if (!isDragging) return;
//   //   const currentX = e.clientX;
//   //   setDragOffsetX(currentX - dragStartX);
//   // };
  
//   // const handleTouchMove = (e) => {
//   //   if (!isDragging) return;
//   //   const currentX = e.touches[0].clientX;
//   //   setDragOffsetX(currentX - dragStartX);
//   // };
  
//   // const handleDragEnd = () => {
//   //   if (!isDragging) return;
    
//   //   // Update position based on drag
//   //   setPosition(prevPos => {
//   //     let newPos = prevPos + dragOffsetX;
      
//   //     // Reset position if we've moved beyond thresholds
//   //     if (newPos < -rowWidth) {
//   //       newPos += rowWidth;
//   //     } else if (newPos > 0) {
//   //       newPos -= rowWidth;
//   //     }
      
//   //     return newPos;
//   //   });
    
//   //   // Reset drag state
//   //   setIsDragging(false);
//   //   setDragOffsetX(0);
    
//   //   // Resume auto-scrolling after a delay
//   //   setTimeout(() => {
//   //     setAutoScrollPaused(false);
//   //   }, 1500);
//   // };
  
//   // Calculate final transform position with drag
//   // const transformX = position + dragOffsetX;
  
//   return (
//     <div className="relative overflow-hidden py-6 sm:py-10 w-full">
//       <div 
//         ref={containerRef}
//         className="relative w-full overflow-hidden"
//         style={{ 
//           maskImage: "linear-gradient(to right, transparent, white 5%, white 95%, transparent)",
//           WebkitMaskImage: "linear-gradient(to right, transparent, white 5%, white 95%, transparent)"
//         }}
//       >
//         <div>
//           <div 
//             ref={carouselRef}
//             className="flex gap-2 sm:gap-4 py-2 sm:py-4"
//             style={{
              
//               transition: isDragging ? 'none' : 'transform 0.05s ease'
//             }}
//           >
//             {tripleFeatures.map((feature, idx) => (
//               <FeatureCard key={idx} {...feature} />
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default InfiniteMovingCards;



import React from "react";
import { Zap, Shield, RefreshCw } from "lucide-react";

const features = [
  {
     icon: <img src="/featureSection/redesigned_token.png" alt="Lightning Fast" width={150} height={150} />,
    title: "Lightning Fast",
    description: "Process payments instantly with our optimized blockchain integration",
  },
  {
     icon: <img src="/featureSection/secure_private.png" alt="Lightning Fast" width={130} height={130} />,
    title: "Secure & Private",
    description: "End-to-end encryption and decentralized architecture for maximum security",
  },
  {
     icon: <img src="/featureSection/recurring_payment.png" alt="Lightning Fast" width={200} height={200} />,
    title: "Recurring Payments",
    description: "Set up and manage subscription plans with flexible payment schedules",
  },
  {
     icon: <img src="/featureSection/global_support.png" alt="Lightning Fast" width={220} height={220} />,
    title: "Global Support",
    description: "Accept payments in multiple currencies from anywhere in the world",
  },
  {
     icon: <img src="/featureSection/native_token.png" alt="Lightning Fast" width={200} height={200} />,
    title: "Smart Contracts",
    description: "Automate complex payment logic with programmable transactions",
  },
];

const FeatureCard = ({ icon, title, description }) => (
  <div className="group relative bg-[#001843] border border-gray-800 rounded-xl p-6 flex flex-col gap-4 transition-transform duration-300 hover:scale-[1.03] hover:shadow-[0_0_20px_#10b98133]">
    <h3 className="text-xl font-semibold text-white">{title}</h3>
    <p className="text-gray-400 text-sm">{description}</p>

    {/* Optional glow effect on hover */}
    <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-10 transition duration-300 pointer-events-none bg-gradient-to-br from-green-400/10 to-purple-600/10 blur-md"></div>

    <div className="w-[200px] h-[200px] flex items-center justify-center">
      {icon}
    </div>
  </div>
);

const InfiniteMovingCards = () => {
  return (
    <section className="min-h-screen bg-black p-6 md:p-12">
      <div className="max-w-6xl mx-auto text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 max-sm:hidden">
          Powerful Subscription Features
        </h2>
        <p className="text-gray-400 text-lg max-sm:hidden">
          Everything you need to manage recurring payments globally and securely.
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-6" >
        {features.map((feature, index) => (
          <div className="w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]" key={feature.title}>
            <FeatureCard  {...feature} />
          </div>
           ))}
      </div>

    </section>
  );
};

export default InfiniteMovingCards;
