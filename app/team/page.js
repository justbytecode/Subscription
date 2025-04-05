"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { Twitter, Linkedin, Github, Globe, X } from "lucide-react"
import { TeamMemberCard } from "@/components/TeamMemberCard"
import Background from "@/components/Background"

const teamMembers = [{
  name: "Mani Pal",
  role: "Founder & CTO",
  image: "/mani.jpg",
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
  image: "/ishita.jpeg",
  bio: "With 5+ years in fintech and blockchain, Ishita drives RecurX’s growth and operations. She ensures compliance while shaping innovative payment solutions.",
  social: {
    twitter: "https://x.com/Ishita2210",
    linkedin: "https://www.linkedin.com/in/ishita-gupta-846853168/",
  },
},

{
  name: "Yug Rathod",
  role: "Co-Founder & COO",
  image: "/yug.jpeg",
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

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 text-white pt-16 sm:pt-20 md:pt-24 pb-12 md:pb-16 relative overflow-x-hidden">
      {/* Background elements */}
      <Background/>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
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

