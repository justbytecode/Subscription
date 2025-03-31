"use client"
import {motion} from "framer-motion"
import React from "react";
import { cn } from "@/lib/utils";
import { 
  Book, 
  Globe, 
  Newspaper, 
  Rocket, 
  Lightbulb, 
  Palette, 
  Compass 
} from "lucide-react";

// Bento Grid Component
const BentoGrid = ({ className, children }) => {
  return (
    <div
      className={cn(
        "grid md:auto-rows-[18rem] grid-cols-1 md:grid-cols-3 gap-4 max-w-7xl mx-auto",
        className
      )}
    >
      {children}
    </div>
  );
};

// Bento Grid Item Component
const BentoGridItem = ({
  className,
  title,
  description,
  header,
  icon: Icon,
}) => {
  return (
    <div
      className={cn(
        `bg-gray-900/50 rounded-xl p-6 
        flex flex-col 
        border border-gray-800 
        hover:border-purple-600/50 
        hover:shadow-xl 
        transition duration-300 
        backdrop-blur-sm 
        group 
        space-y-4`,
        className
      )}
    >
      {header}
      <div className="group-hover:translate-x-2 transition duration-200">
        {Icon && (
          <Icon className="h-8 w-8 mb-3 text-purple-500 group-hover:text-purple-400 transition" />
        )}
        <div className="font-bold text-white text-xl mb-2 group-hover:text-purple-300 transition">
          {title}
        </div>
        <div className="text-gray-400 text-sm">
          {description}
        </div>
      </div>
    </div>
  );
};

// Skeleton Component
const Skeleton = () => (
  <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-neutral-900 to-neutral-800 opacity-50"></div>
);

// Blog Grid Demo Component
export default function BlogGrid() {
  const blogItems = [
    {
      title: "AI-Powered Solutions",
      description: "Revolutionizing business intelligence with cutting-edge AI technologies at Recurx.",
      header: <Skeleton />,
      icon: Rocket,
    },
    {
      title: "Digital Transformation Insights" ,
      description: "How Recurx is helping enterprises navigate the complex landscape of digital innovation.",
      header: <Skeleton />,
      icon: Globe,
    },
    {
      title: "Design Engineering",
      description: "Our approach to creating intuitive, user-centric technological solutions.",
      header: <Skeleton />,
      icon: Palette,
    },
    {
      title: "Cloud Strategy Breakthroughs",
      description: "Exploring Recurx's innovative cloud migration and optimization techniques.",
      header: <Skeleton />,
      icon: Newspaper,
    },
    {
      title: "Tech Research Frontiers",
      description: "Cutting-edge research and development initiatives driving Recurx's innovation.",
      header: <Skeleton />,
      icon: Lightbulb,
    },
    {
      title: "Startup Ecosystem Insights",
      description: "How Recurx supports and accelerates emerging technological entrepreneurs.",
      header: <Skeleton />,
      icon: Book,
    },
    {
      title: "Future of Technology",
      description: "Recurx's vision for transformative technological solutions in the digital era.",
      header: <Skeleton />,
      icon: Compass,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 text-white pt-16 sm:pt-20 md:pt-24 pb-12 md:pb-16 relative overflow-x-hidden ">
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-48 sm:w-64 h-48 sm:h-64 bg-purple-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/3 right-1/4 w-56 sm:w-80 h-56 sm:h-80 bg-blue-500/10 rounded-full blur-3xl"></div>
      </div>
      {/* Blogs header */}
      <motion.div
        className="xl:py-42 md:py-20 py-10 xl:px-0 px-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-white text-center font-manrope lg:text-6xl md:text-4xl sm:text-3xl xl:text-7xl font-bold leading-tight mb-8">
        Insights & Updates <br/> Stay Ahead with Our <span className='text-blue-600'>Blog</span>
        </div>
        <p className="text-white text-center text-2xl font-normal leading-7">
        At RecurX, we share insights, trends, and innovations <br/>to keep you informed and ahead of the curve.
        </p>
      </motion.div>

      {/* Blog Grid */}
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-white">
          Explore Our Blogs
        </h2>
        <BentoGrid>
          {blogItems.map((item, i) => (
            <BentoGridItem
              key={i}
              title={item.title}
              description={item.description}
              header={item.header}
              icon={item.icon}
              className={i === 3 || i === 6 ? "md:col-span-2" : ""}
            />
          ))}
        </BentoGrid>
      </div>
    </div>
  );
}