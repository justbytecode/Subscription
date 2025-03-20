"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { motion, AnimatePresence } from "framer-motion"
import { Twitter, Linkedin, Github, Globe, X } from "lucide-react"

const teamMembers = [
  {
    name: "Mani Pal",
    role: "Founder & CEO",
    image: "/mani.jpg",
    bio: "Mani is a visionary developer with over 5 years of experience in software engineering and blockchain technology. He single-handedly designed and built RecurX from the ground up, leveraging his expertise in Next.js, Prisma, PostgreSQL, and Web3 technologies. His passion for innovation has led to the creation of a cutting-edge platform that seamlessly integrates AI, cryptocurrency payments, and automation to solve real-world problems.",
    social: {
      twitter: "#",
      linkedin: "#",
      github: "#",
      website: "#",
    },
  },
  {
    name: "Ishita Gupta",
    role: "Co-Founder & COO",
    image: "/ishita.jpeg",
    bio: "Ishita brings over 5 years of invaluable experience in fintech and blockchain technology to RecurX. With a keen eye for operational excellence and strategic planning, she oversees the company's day-to-day operations and long-term growth strategies. Her deep understanding of financial systems and regulatory frameworks has been instrumental in positioning RecurX at the forefront of compliant blockchain payment solutions.",
    social: {
      twitter: "#",
      linkedin: "#",
      github: "#",
    },
  },
  {
    name: "Yug Rathod",
    role: "Co-Founder & CTO",
    image: "/yug.jpeg",
    bio: "Yug leads our technical team with unparalleled expertise in distributed systems and cryptography. With a background in computer science and a passion for blockchain technology, he architects the robust infrastructure that powers RecurX. His innovative approach to solving complex technical challenges ensures our platform remains secure, scalable, and at the cutting edge of payment technology.",
    social: {
      twitter: "#",
      linkedin: "#",
      github: "#",
    },
  },
]

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
}

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
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
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-black text-white pt-16 sm:pt-20 md:pt-24 pb-12 md:pb-16 relative overflow-x-hidden">
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-48 sm:w-64 h-48 sm:h-64 bg-purple-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/3 right-1/4 w-56 sm:w-80 h-56 sm:h-80 bg-blue-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 max-w-6xl relative z-10">
        <div className="text-center mb-12 sm:mb-16 md:mb-20">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 sm:mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-500"
          >
            Meet Our Team
          </motion.h1>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.7 }}
            className="max-w-3xl mx-auto px-2"
          >
            <p className="text-lg sm:text-xl md:text-2xl text-gray-300 leading-relaxed">
              The brilliant minds behind RecurX working to revolutionize payment solutions through blockchain
              technology and innovative financial systems.
            </p>
          </motion.div>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10"
        >
          {teamMembers.map((member, index) => (
            <motion.div key={index} variants={item} className="relative">
              <Card
                className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-sm text-white border border-gray-700/50 overflow-hidden hover:shadow-xl hover:shadow-purple-500/20 transition-all duration-500 h-full cursor-pointer"
                onClick={() => setSelectedMember(member)}
              >
                <CardContent className="p-0 h-full">
                  <div className="relative h-56 sm:h-64 md:h-72 w-full overflow-hidden">
                    <Image
                      src={member.image || "/placeholder.svg?height=300&width=300"}
                      alt={member.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      priority={index < 2} // Prioritize loading the first two images
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-70"></div>
                  </div>
                  <div className="p-4 sm:p-5 md:p-6 relative z-10">
                    <h3 className="text-xl sm:text-2xl font-bold mb-1 bg-clip-text text-transparent bg-gradient-to-r from-blue-300 to-purple-300">
                      {member.name}
                    </h3>
                    <p className="text-sm font-medium text-blue-400 mb-3 md:mb-4">{member.role}</p>
                    <p className="text-gray-300 text-sm sm:text-base line-clamp-3">{member.bio}</p>

                    <div className="mt-4 inline-flex items-center text-blue-400 text-sm font-medium">
                      View Profile
                      <svg
                        className="ml-1 w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
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

