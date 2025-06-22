"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { Twitter, Linkedin, Github, Globe, X } from "lucide-react"
import { TeamMemberCard } from "@/components/TeamMemberCard"
import Background from "@/components/Background"
import Link from "next/link"
import SpotlightCard from "@/components/SpotlightCard/SpotlightCard"
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import RecurXAdvantageSection from "@/components/AboutUsCard"

const teamMembers = [{
  name: "Mani Pal",
  role: "Founder & CTO",
  image: "/team-profile/mani.jpg",
  bio: "With 5+ years in software engineering and blockchain, Mani leads RecurX’s technical vision. He architects AI-driven, cryptocurrency-integrated solutions, ensuring seamless automation and innovation.",
  social: {
    twitter: "#",
    linkedin: "https://www.linkedin.com/in/mani-pal-68b570163",
    github: "#",
    website: "#",
  },
},
{
  name: "Ishita Gupta",
  role: "Co-Founder & CEO",
  image: "/team-profile/ishita.jpeg",
  bio: "With 5+ years in fintech and blockchain, Ishita drives RecurX’s growth and operations. She ensures compliance while shaping innovative payment solutions.",
  social: {
    twitter: "https://x.com/Ishita2210",
    linkedin: "https://www.linkedin.com/in/ishita-gupta-846853168/",
  },
},

{
  name: "Yug Rathod",
  role: "Co-Founder & COO",
  image: "/team-profile/yug.jpeg",
  bio: "With expertise in distributed systems and cryptography, Yug ensures RecurX’s security and scalability. He drives technical strategy while advancing blockchain-powered payment infrastructure.",
  social: {
    twitter: "https://x.com/YugRath77227664",
    linkedin: "https://www.linkedin.com/in/yugrathod/",
  },
},
];


const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
}


export default function TeamPage() {
  const [selectedMember, setSelectedMember] = useState(null)
  const [isMobile, setIsMobile] = useState(false)

  // Check if we're on a mobile device
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    // Initial check
    checkMobile()

    // Add event listener for window resize
    window.addEventListener("resize", checkMobile)

    // Cleanup
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (selectedMember) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "auto"
    }

    return () => {
      document.body.style.overflow = "auto"
    }
  }, [selectedMember])
  const clicked = () => {
    // Navigate to the link - you can customize this URL
    window.open('/', '_blank'); // Opens in new tab
    // Or use: window.location.href = '/'; // Navigate in same tab
  };
  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 text-white pt-16 sm:pt-20 md:pt-24 pb-12 md:pb-16 relative overflow-x-hidden z-10 ">
      {/* Background elements */}
      <Background/>
      
      <div className="transparent mt-15">
      {/* hero section for about us begins here*/}
      <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              >
           
          <div className="flex justify-center ">     
          <button className="relative inline-flex h-12 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 ">
            <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)] " />
            <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-3 py-1 text-sm font-medium text-white backdrop-blur-3xl">
              About Us
            </span>
          </button>
          </div>

          <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="text-2xl sm:text-5xl md:text-6xl lg:text-7xl font-bold  tracking-tight leading-[1.1] justify-center text-center "
              >
            <div className="bg-clip-text mb-2 text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-emerald-400 ">
              Redefining Subscriptions
            </div>

            <div className="">for a Decentralized World</div>
          </motion.h1>
          <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2, }}
                className=" "
          >
            <div className="text-lg sm:text-md md:text-md lg:text-md font-light mt-4 justify-center text-center relative text-gray-300">
              We're building the future of subscription payments, one where businesses and users <br></br> have total control, zero fees, and global reach powered by blockchain.
            </div>
            <motion.img
            src="/about-us/hero.png" 
            className="absolute right-[0] top-[-15%] z-[-1] max-sm:hidden"
            height={500}
            width={2000}
            sizes="100vw"
            alt="Hero Image"
            initial={{ 
              opacity: 0, // Use a value between 0 (transparent) and 1 (opaque)
              filter: "blur(10px) brightness(0.5)",
              transform: "translateX(5px)"
            }}
            animate={{ 
              opacity: 0.8, // Final opacity value
              filter: "blur(0px) brightness(1)",
              transform: "translateX(0px) scale(1)"
            }}
            transition={{
              duration: 1.5,
              delay: 0.3,
              ease: "easeOut"
            }}
             
            />
            <motion.img
            src="/about-us/hero.png" 
            className="absolute right-[0] top-[6%] z-[-1] sm:hidden"
            height={5000}
            width={5000}
            sizes="100vw"
            alt="Hero Image"
            initial={{ 
              opacity: 0, // Use a value between 0 (transparent) and 1 (opaque)
              filter: "blur(10px) brightness(0.5)",
               
            }}
            animate={{ 
              opacity: 0.8, // Final opacity value
              filter: "blur(0px) brightness(1)",
              scale: 2,
            }}
            
             
            />
            
          </motion.h1>
            <div className="flex justify-center mt-6 ">     
            
            <button className="relative inline-flex h-12 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50  " onClick={clicked}>
              <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)] "  />
              <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-3 py-1 text-sm font-medium text-white backdrop-blur-3xl ">
                Try RecurX Now
              </span>
              </button>
      
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
            className="mt-55 text-center max-w-4xl mx-auto px-4"
          >
            <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight tracking-tight text-white mt-10">
              Our Mission Is Simple
            </h1>

            <p className="mt-6 text-base sm:text-lg md:text-xl text-gray-300 font-light leading-relaxed">
              To eliminate unnecessary fees, middlemen, and payment barriers from <br className="hidden sm:block" />
              recurring transactions. We empower people to operate globally, securely, <br className="hidden sm:block" />
              and autonomously through the power of blockchain technology.
            </p>
            <Image
              src="/about-us/tokenRecurx.png"
              alt="Mission Image"
              width={800}
              height={400}
              className="mt-6 mx-auto rounded-lg shadow-lg "
              sizes="(max-width: 768px) 100vw, 50vw"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}/>
          </motion.div>
         
         {/* cards */}
         <RecurXAdvantageSection/>
         {/* <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
            className="mt-55 text-center max-w-4xl mx-auto px-4 flex"
          >
            <SpotlightCard className="custom-spotlight-card" spotlightColor="rgba(0, 229, 255, 0.2)">
             first 
            </SpotlightCard>
            <SpotlightCard className="custom-spotlight-card" spotlightColor="rgba(0, 229, 255, 0.2)">
             first 
            </SpotlightCard>
            <SpotlightCard className="custom-spotlight-card" spotlightColor="rgba(0, 229, 255, 0.2)">
             first 
            </SpotlightCard>
          </motion.div> */}
      <motion.div
        className="xl:py-42 md:py-20 py-10 xl:px-0 px-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-white text-center font-manrope lg:text-6xl md:text-4xl text-3xl xl:text-7xl font-bold leading-tight mb-8">
            Meet the <span className='text-blue-600'>Minds</span> <br/> Behind <span className='text-blue-600'>RecurX!</span>
        </div>
        <p className="text-white text-center text-lg md:text-xl lg:text-2xl font-normal leading-7">
          At RecurX, we embrace agility and innovation, allowing us to stay ahead of market trends, <br />
          adapt to customer needs, and create cutting-edge solutions.
        </p>
      </motion.div>

      

        {/* Render Team Cards */}
        <motion.div variants={container} className="flex flex-wrap">
        </motion.div>
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 lg:gap-12"
        >
          {teamMembers.map((member, index) => (
            <TeamMemberCard member={member} key={index} />
          ))}
        </motion.div>
      </div>

      {/* Modal when clicking on a team member */}
      <AnimatePresence>
        {selectedMember && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-3 sm:p-6 md:p-10 overflow-y-auto"
            onClick={(e) => {
              // Close modal when clicking the backdrop
              if (e.target === e.currentTarget) {
                setSelectedMember(null)
              }
            }}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 20, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700/50 rounded-xl sm:rounded-2xl overflow-hidden w-full max-w-xs sm:max-w-lg md:max-w-4xl shadow-2xl my-4 sm:my-6"
            >
              <button
                onClick={() => setSelectedMember(null)}
                className="absolute top-3 right-3 sm:top-4 sm:right-4 md:top-6 md:right-6 text-gray-400 hover:text-white z-10 p-1 bg-gray-800/70 rounded-full"
                aria-label="Close modal"
              >
                <X className="h-5 w-5 sm:h-6 sm:w-6" />
              </button>

              <div className={`grid ${isMobile ? "grid-cols-1" : "grid-cols-1 md:grid-cols-2"} h-full`}>
                <div className={`relative ${isMobile ? "h-48 sm:h-56" : "h-56 md:h-full"}`}>
                  <Image
                    src={selectedMember.image || "/placeholder.svg?height=400&width=400"}
                    alt={selectedMember.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent to-gray-900 opacity-70 md:block hidden"></div>
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-70 md:hidden"></div>
                </div>

                <div className="p-4 sm:p-6 md:p-8 flex flex-col justify-between">
                  <div>
                    <h2 className="text-2xl sm:text-3xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
                      {selectedMember.name}
                    </h2>
                    <p className="text-blue-400 font-medium mb-4 sm:mb-6">{selectedMember.role}</p>
                    <div className="text-gray-300 mb-6 sm:mb-8 leading-relaxed text-sm sm:text-base max-h-48 md:max-h-none overflow-y-auto pr-1">
                      <p>{selectedMember.bio}</p>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-base sm:text-lg font-medium mb-3 sm:mb-4 text-gray-200">
                      Connect with {selectedMember.name.split(" ")[0]}
                    </h3>
                    <div className="flex space-x-3 sm:space-x-4">
                      {selectedMember.social.twitter && (
                        <a
                          href={selectedMember.social.twitter}
                          className="text-gray-400 hover:text-blue-400 transition-colors p-2 bg-gray-800/50 rounded-full hover:bg-gray-700/50"
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label="Twitter"
                        >
                          <Twitter className="h-4 w-4 sm:h-5 sm:w-5" />
                        </a>
                      )}
                      {selectedMember.social.linkedin && (
                        <a
                          href={selectedMember.social.linkedin}
                          className="text-gray-400 hover:text-blue-500 transition-colors p-2 bg-gray-800/50 rounded-full hover:bg-gray-700/50"
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label="LinkedIn"
                        >
                          <Linkedin className="h-4 w-4 sm:h-5 sm:w-5" />
                        </a>
                      )}
                      {selectedMember.social.github && (
                        <a
                          href={selectedMember.social.github}
                          className="text-gray-400 hover:text-white transition-colors p-2 bg-gray-800/50 rounded-full hover:bg-gray-700/50"
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label="GitHub"
                        >
                          <Github className="h-4 w-4 sm:h-5 sm:w-5" />
                        </a>
                      )}
                      {selectedMember.social.website && (
                        <a
                          href={selectedMember.social.website}
                          className="text-gray-400 hover:text-purple-400 transition-colors p-2 bg-gray-800/50 rounded-full hover:bg-gray-700/50"
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label="Personal Website"
                        >
                          <Globe className="h-4 w-4 sm:h-5 sm:w-5" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

