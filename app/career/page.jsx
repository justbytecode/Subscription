"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { MessageSquare, Target, Globe, Briefcase, Send, X, Clock, MapPin, DollarSign } from "lucide-react"

// Custom hook for media queries
function useMediaQuery(query) {
  const [matches, setMatches] = useState(false)

  useEffect(() => {
    const media = window.matchMedia(query)
    if (media.matches !== matches) {
      setMatches(media.matches)
    }

    const listener = () => setMatches(media.matches)
    media.addEventListener("change", listener)

    return () => media.removeEventListener("change", listener)
  }, [matches, query])

  return matches
}

const careerPositions = [
  {
    id: 1,
    title: "Solana  Developer",
    emoji: "💻",
    shortDescription: "Design, develop, and deploy scalable and secure Solana-based smart contracts using Rust.",
    fullDescription:
      "We are seeking a highly skilled Solana Developer with at least 3 years of hands-on experience in building decentralized applications (dApps), smart contracts, and blockchain infrastructure on the Solana ecosystem. You will work closely with our product, design, and engineering teams to build and scale Web3 solutions that power next-gen decentralized platforms.",
    requirements: [
      "Integrate Solana smart contracts with front-end applications via Nextjs , Web3.js, or Solana.js.",
      "Optimize smart contract performance, transaction speed, and gas efficiency",
      "Conduct code reviews, audits, and implement best practices in blockchain development.",
      "Collaborate with cross-functional teams to define, design, and ship new features.",
      "Stay up to date with the latest advancements in the Solana ecosystem and DeFi/NFT space.",
    ],
    location: "Remote ",
    type: "Internship",
    status: "regular",
  },
  {
    id: 2,
    title: "Motion Designer",
    emoji: "🎥",
    shortDescription: "Bring our products to life with stunning animations and visual effects.",
    fullDescription:
      "As a Motion Designer at RecurX, you'll create engaging animations and visual effects that enhance our product experience and marketing materials. You'll work closely with our design and marketing teams to develop a cohesive motion language that reinforces our brand identity and improves user engagement across all platforms.",
    requirements: [
      "2+ years of experience in motion design",
      "Proficiency in After Effects, Cinema 4D, or similar tools",
      "Strong understanding of animation principles",
      "Experience creating UI animations for digital products",
      "Ability to translate brand guidelines into motion",
    ],
    location: "Remote / New York, NY",
    type: "Full-time",
    salary: "$85,000 - $110,000",
    status: "regular",
  },
  {
    id: 3,
    title: "iOS Developer",
    emoji: "📱",
    shortDescription: "Build cutting-edge mobile applications for Apple's ecosystem.",
    fullDescription:
      "As an iOS Developer at RecurX, you'll be responsible for developing and maintaining high-quality iOS applications. You'll work with our product and design teams to implement new features, ensure performance optimization, and maintain code quality. You'll play a key role in shaping our mobile strategy and delivering exceptional user experiences on iOS devices.",
    requirements: [
      "4+ years of experience in iOS development",
      "Strong proficiency in Swift and UIKit",
      "Experience with SwiftUI is a plus",
      "Understanding of iOS design principles and guidelines",
      "Experience with RESTful APIs and data persistence",
    ],
    location: "Remote / Austin, TX",
    type: "Full-time",
    salary: "$100,000 - $140,000",
    status: "regular",
  },
  
]

const companyValues = [
  {
    title: "Leadership",
    description:
      "At RecurX, we lead with vision, innovation, and integrity—empowering individuals to drive change and shape the future of technology.",
    icon: <Globe className="w-8 h-8" />,
  },
  {
    title: "Communication",
    description:
      "Clear, open, and effective communication fuels our success. We foster collaboration and transparency to drive impactful results.",
    icon: <MessageSquare className="w-8 h-8" />,
  },
  {
    title: "Commitment",
    description:
      "We are relentless in our pursuit of excellence—delivering impactful solutions with integrity, accountability, and precision.",
    icon: <Target className="w-8 h-8" />,
  },
]

export default function CareerPage() {
  const [selectedJob, setSelectedJob] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const isMobile = useMediaQuery("(max-width: 768px)")
  const isSmallMobile = useMediaQuery("(max-width: 480px)")

  const openJobModal = (job) => {
    setSelectedJob(job)
    setIsModalOpen(true)
    document.body.style.overflow = "hidden"
  }

  const closeJobModal = () => {
    setIsModalOpen(false)
    document.body.style.overflow = "auto"
  }

  // Job Detail Modal Component
  const JobDetailModal = () => {
    const job = selectedJob;
    if (!isModalOpen || !job) return null;
    
    return (
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-2 sm:p-4 overflow-y-auto"
        onClick={closeJobModal}
      >
        <div
          className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl sm:rounded-2xl w-full max-w-[95%] sm:max-w-3xl max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="relative p-4 sm:p-6 md:p-8">
            <button
              onClick={closeJobModal}
              className="absolute top-4 right-4 sm:top-6 sm:right-6 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gray-700/50 flex items-center justify-center text-gray-300 hover:bg-gray-700 transition-colors"
            >
              <X className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>

            <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
              <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl bg-blue-600/20 flex items-center justify-center text-3xl sm:text-4xl">
                {job.emoji}
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white">{job.title}</h2>
                <div className="flex flex-wrap gap-2 sm:gap-3 mt-1 sm:mt-2">
                  <span className="inline-flex items-center gap-1 text-xs sm:text-sm text-gray-300">
                    <MapPin className="w-3 h-3 sm:w-4 sm:h-4 text-blue-400" /> {job.location}
                  </span>
                  <span className="inline-flex items-center gap-1 text-xs sm:text-sm text-gray-300">
                    <Clock className="w-3 h-3 sm:w-4 sm:h-4 text-blue-400" /> {job.type}
                  </span>
                  <span className="inline-flex items-center gap-1 text-xs sm:text-sm text-gray-300">
                    <DollarSign className="w-3 h-3 sm:w-4 sm:h-4 text-blue-400" /> {job.salary}
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-4 sm:space-y-6 mb-6 sm:mb-8">
              <div>
                <h3 className="text-lg sm:text-xl font-semibold text-white mb-2 sm:mb-3">Job Description</h3>
                <p className="text-sm sm:text-base text-gray-300 leading-relaxed">{job.fullDescription}</p>
              </div>

              <div>
                <h3 className="text-lg sm:text-xl font-semibold text-white mb-2 sm:mb-3">Requirements</h3>
                <ul className="space-y-1 sm:space-y-2">
                  {job.requirements.map((req, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm sm:text-base text-gray-300">
                      <span className="text-blue-400 mt-1">•</span>
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <a
              href={`mailto:career@recurx.xyz?subject=Application for ${job.title} Position`}
              className="w-full py-3 sm:py-4 flex items-center justify-center rounded-lg sm:rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm sm:text-base font-semibold gap-2 transition-colors"
            >
              <Send className="w-4 h-4" />
              Apply for this Position
            </a>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 text-white overflow-hidden relative font-manrope">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-10 sm:top-20 left-5 sm:left-10 w-32 sm:w-64 h-32 sm:h-64 rounded-full bg-blue-600/10 blur-3xl"
          animate={{
            x: [0, 50, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 15,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
          }}
        />
        <motion.div
          className="absolute bottom-20 sm:bottom-40 right-10 sm:right-20 w-40 sm:w-80 h-40 sm:h-80 rounded-full bg-indigo-600/10 blur-3xl"
          animate={{
            x: [0, -70, 0],
            y: [0, 50, 0],
          }}
          transition={{
            duration: 18,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
          }}
        />
      </div>

      {/* Career Header */}
      <motion.div
        className="py-6 sm:py-10 md:py-16 lg:py-20 xl:py-32 mt-6 sm:mt-10 px-4 sm:px-6 md:px-10 xl:px-0 relative z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.span
          className="w-fit mx-auto flex items-center justify-center bg-emerald-900/80 backdrop-blur-sm rounded-full text-emerald-400 text-center text-xs sm:text-base md:text-lg lg:text-xl font-medium leading-5 px-3 sm:px-5 py-2 sm:py-3 mb-4 sm:mb-5"
          whileHover={{ scale: 1.05 }}
        >
          <Briefcase className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
          Join the RecurX Team
        </motion.span>
        <motion.div
          className="text-white text-center font-manrope text-2xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight mb-4 sm:mb-6 lg:mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Your next big opportunity starts <br className="hidden sm:block" />
          here at{" "}
          <motion.span
            className="text-blue-600 inline-block"
            animate={{
              color: ["#2563eb", "#4f46e5", "#6366f1", "#2563eb"],
            }}
            transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY }}
          >
            RecurX!
          </motion.span>
        </motion.div>
        <motion.p
          className="text-white/90 text-center text-base sm:text-xl lg:text-2xl font-normal leading-relaxed max-w-4xl mx-auto px-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          At RecurX, we embrace agility and innovation, allowing us to stay ahead of market trends,{" "}
          <br className="hidden md:block" />
          adapt to customer needs, and create cutting-edge solutions.
        </motion.p>
      </motion.div>

      {/* Position Section - Grid of Cards */}
      <motion.div
        className="py-8 sm:py-10 md:py-16 lg:py-24 px-4 sm:px-6 md:px-10 xl:px-0 relative z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <motion.h2
          className="text-blue-600 text-center font-manrope text-2xl sm:text-3xl lg:text-4xl font-bold leading-10 mb-8 sm:mb-10 lg:mb-14"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          Make an Impact—Join Our Team!
        </motion.h2>

        {/* Job Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 max-w-sm sm:max-w-3xl md:max-w-4xl lg:max-w-6xl xl:max-w-7xl mx-auto">
          {careerPositions.map((job, index) => (
            <motion.div
              key={job.id}
              className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-sm border border-gray-700/50 rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-xl flex flex-col h-full cursor-pointer"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{
                y: -10,
                boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.2), 0 10px 10px -5px rgba(0, 0, 0, 0.1)",
                borderColor: "rgba(107, 114, 128, 0.5)",
              }}
              onClick={() => openJobModal(job)}
            >
              <div className="flex items-center justify-between mb-3 sm:mb-4">
                <span className="text-3xl sm:text-4xl">{job.emoji}</span>
                <motion.div
                  className="w-8 h-8 sm:w-12 sm:h-12 bg-blue-600/20 rounded-full flex items-center justify-center"
                  whileHover={{ scale: 1.1, backgroundColor: "rgba(37, 99, 235, 0.3)" }}
                >
                  <Briefcase className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400" />
                </motion.div>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-2 sm:mb-3">{job.title}</h3>
              <p className="text-sm sm:text-base text-gray-300 mb-4 sm:mb-6 flex-grow">{job.shortDescription}</p>
              <div className="flex items-center text-xs sm:text-sm text-gray-400 mb-3 sm:mb-4">
                <MapPin className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                <span>{job.location}</span>
              </div>
              <motion.button
                className="w-full py-2 sm:py-3 flex items-center justify-center rounded-lg sm:rounded-xl bg-blue-600/20 hover:bg-blue-600/30 text-blue-300 hover:text-blue-200 text-xs sm:text-sm font-semibold leading-4 transition-all duration-300 border border-blue-600/30"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                View Details
              </motion.button>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Company Values Section */}
      <div className="w-auto mx-auto py-8 sm:py-10 md:py-16 lg:py-20 xl:py-28 px-4 sm:px-6 md:px-10 xl:px-0 relative z-10">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <h3 className="text-blue-600 text-center font-manrope text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-4 sm:mb-8">
            A Culture of Innovation & Excellence
          </h3>
          <p className="text-white/90 text-center text-base sm:text-xl lg:text-2xl font-normal leading-7 max-w-4xl mx-auto px-2">
            At RecurX, we're passionate about crafting seamless experiences and building{" "}
            <br className="hidden md:block" />
            products that truly make a difference.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 pb-8 sm:pb-10 lg:pb-24 border-b border-gray-700/50 max-w-sm sm:max-w-3xl lg:max-w-full mx-auto mt-8 sm:mt-12 lg:mt-16">
          {companyValues.map((value, index) => (
            <motion.div
              key={index}
              className="p-4 sm:p-8 group rounded-xl sm:rounded-2xl transition-all duration-500 hover:shadow-lg cursor-pointer bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-gray-700/30 hover:border-gray-600/50"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              whileHover={{
                y: -8,
                boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.2), 0 10px 10px -5px rgba(0, 0, 0, 0.1)",
              }}
            >
              <motion.div
                className="w-14 h-14 sm:w-16 sm:h-16 lg:w-20 lg:h-20 bg-indigo-900/80 rounded-xl sm:rounded-2xl flex items-center justify-center mb-4 sm:mb-6 mx-auto lg:mx-0 transition-all duration-500 group-hover:bg-indigo-600"
                whileHover={{ rotate: 5 }}
              >
                <motion.div className="text-indigo-300 group-hover:text-indigo-50 transition-all duration-500">
                  {value.icon}
                </motion.div>
              </motion.div>
              <h4 className="text-white text-lg sm:text-xl font-semibold leading-7 mb-2 sm:mb-4 text-center lg:text-left">{value.title}</h4>
              <p className="text-gray-300 text-xs sm:text-sm font-normal leading-6 text-center lg:text-left">{value.description}</p>
            </motion.div>
          ))}
        </div>

        {/* CV Submission Section */}
        <motion.div
          className="mt-8 sm:mt-10 lg:mt-16 xl:mt-24 bg-gradient-to-br from-violet-600 to-indigo-600 p-4 sm:p-8 md:p-10 rounded-xl sm:rounded-2xl shadow-xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          whileHover={{ y: -5 }}
        >
          <div className="lg:flex items-center justify-between gap-6 lg:gap-8">
            <div className="lg:mb-0 mb-6 sm:mb-8">
              <h3 className="text-white font-manrope text-2xl sm:text-3xl lg:text-4xl font-semibold leading-tight mb-3 sm:mb-5">
                Your Dream Job Could Be Waiting!
              </h3>
              <p className="text-indigo-100 text-base sm:text-xl font-normal leading-relaxed">
                Don't see a position that matches your skills? No worries! We're always looking for exceptional talent.
                Share your CV with us, and we'll reach out when an opportunity arises.
              </p>
            </div>
            <motion.a
              href="mailto:career@recurx.xyz"
              className="px-6 sm:px-8 py-3 sm:py-4 h-12 sm:h-14 flex items-center justify-center text-indigo-600 text-base sm:text-lg font-semibold leading-7 gap-2 sm:gap-3 rounded-full bg-white whitespace-nowrap cursor-pointer shadow-lg"
              whileHover={{
                scale: 1.05,
                boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
              }}
              whileTap={{ scale: 0.98 }}
            >
              <Send className="w-4 h-4 sm:w-5 sm:h-5" />
              Send Your CV
            </motion.a>
          </div>
        </motion.div>
      </div>

      {/* Footer CTA */}
      <motion.div
        className="w-full py-8 sm:py-12 lg:py-16 text-center relative z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.7 }}
      >
        <h4 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-4 sm:mb-6">Ready to shape the future with us?</h4>
        <motion.a
          href="#"
          className="inline-flex items-center justify-center px-6 sm:px-8 py-2 sm:py-3 rounded-full bg-blue-600 text-white font-medium text-base sm:text-lg transition-all"
          whileHover={{ scale: 1.05, backgroundColor: "#3b82f6" }}
          whileTap={{ scale: 0.98 }}
        >
          View All Positions
        </motion.a>
      </motion.div>

      {/* Render modal inline */}
      {JobDetailModal()}
    </div>
  )
}