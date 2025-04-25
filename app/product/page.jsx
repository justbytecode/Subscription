"use client"
import { useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"

export default function ProductPage() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const constraintsRef = useRef(null)

  const features = [
    {
      id: 1,
      title: "Blockchain Powered",
      description:
        "Built on cutting-edge blockchain technology for maximum security and transparency in every transaction.",
      icon: "🔗",
    },
    {
      id: 2,
      title: "Zero Transaction Fees",
      description: "Enjoy 0% transaction fees on every payment, saving your business thousands in processing costs.",
      icon: "💰",
    },
    {
      id: 3,
      title: "Complete Security",
      description: "Advanced encryption and decentralized architecture ensures your payments are always protected.",
      icon: "🔒",
    },
    {
      id: 4,
      title: "Full Transparency",
      description: "Track every transaction in real-time with our immutable ledger system and comprehensive dashboard.",
      icon: "📊",
    },
    {
      id: 5,
      title: "Global Payments",
      description:
        "Accept payments from anywhere in the world with instant settlement and no currency conversion fees.",
      icon: "🌎",
    },
    {
      id: 6,
      title: "Instant Settlements",
      description: "Instant settlements (<10 seconds)",
      icon: "💰",
    },
  ]


  // Instant settlements (<10 seconds)
  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === features.length - 1 ? 0 : prevIndex + 1))
  }

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? features.length - 1 : prevIndex - 1))
  }

  // Calculate visible cards based on current index
  const getVisibleCards = () => {
    const visibleCards = []
    // Main card
    visibleCards.push(features[currentIndex])

    // Next card
    const nextIndex = (currentIndex + 1) % features.length
    visibleCards.push(features[nextIndex])

    // Previous card
    const prevIndex = currentIndex === 0 ? features.length - 1 : currentIndex - 1
    visibleCards.unshift(features[prevIndex])

    return visibleCards
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 text-white overflow-hidden relative font-manrope">
      {/* Product Header */}
      <motion.div
        className="xl:py-42 md:py-20 py-10 xl:px-0 mt-10 px-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <span className="w-fit mx-auto flex items-center justify-center bg-emerald-900 rounded-full text-emerald-400 text-center text-xl font-medium leading-5 px-5 py-3 mb-5">
          RecurX Payments
        </span>
        <div className="text-white text-center font-manrope lg:text-6xl md:text-4xl text-3xl xl:text-7xl font-bold leading-tight mb-8">
          Decentralized <span className="text-blue-600">Payments</span>
          <br />
          for the Modern Web
        </div>
        <p className="text-white text-center text-lg md:text-xl lg:text-2xl font-normal leading-7">
          Transparent and completely secure with 0% transaction fee on every payment
        </p>
      </motion.div>

      {/* Feature Cards Carousel */}
      <div className="w-full py-20 px-4 relative" ref={constraintsRef}>
        <div className="max-w-7xl mx-auto relative">
          {/* Navigation Controls */}
          <div className="absolute top-1/2 left-0 -translate-y-1/2 z-10 md:-left-5">
            <motion.button
              onClick={prevSlide}
              className="bg-white/10 backdrop-blur-sm text-white p-3 rounded-full hover:bg-white/20 transition-all"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <ChevronLeft size={24} />
            </motion.button>
          </div>

          <div className="absolute top-1/2 right-0 -translate-y-1/2 z-10 md:-right-5">
            <motion.button
              onClick={nextSlide}
              className="bg-white/10 backdrop-blur-sm text-white p-3 rounded-full hover:bg-white/20 transition-all"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <ChevronRight size={24} />
            </motion.button>
          </div>

          {/* Cards Container */}
          <div className="overflow-hidden py-10">
            <div className="flex justify-center items-center gap-4 md:gap-8">
              <AnimatePresence mode="popLayout">
                {getVisibleCards().map((feature, index) => {
                  // Determine if this is the center card
                  const isCenter = index === 1

                  return (
                    <motion.div
                      key={feature.id}
                      className={`bg-black border border-gray-800 rounded-2xl p-6 md:p-8 flex flex-col ${
                        isCenter ? "md:min-w-[500px] min-w-[280px]" : "md:min-w-[300px] min-w-[200px] opacity-50"
                      } relative overflow-hidden`}
                      initial={{
                        opacity: 0,
                        x: index === 0 ? -100 : index === 2 ? 100 : 0,
                        scale: isCenter ? 0.9 : 0.7,
                      }}
                      animate={{
                        opacity: isCenter ? 1 : 0.5,
                        x: 0,
                        scale: isCenter ? 1 : 0.8,
                        zIndex: isCenter ? 10 : 1,
                      }}
                      exit={{
                        opacity: 0,
                        x: index === 0 ? -100 : index === 2 ? 100 : 0,
                        scale: 0.7,
                      }}
                      transition={{ duration: 0.5 }}
                    >
                      {/* Subtle gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/10 to-transparent pointer-events-none" />

                      {/* Accent line at top */}
                      <div className={`absolute top-0 left-0 right-0 h-1 bg-blue-600`} />

                      <div className="text-5xl mb-6">{feature.icon}</div>
                      <h3 className="text-white text-2xl md:text-3xl font-bold mb-4">{feature.title}</h3>
                      <p className="text-white/80 text-base md:text-lg">{feature.description}</p>

                      {/* Subtle glow effect for center card */}
                      {isCenter && (
                        <motion.div
                          className="absolute -inset-1 bg-blue-600/10 rounded-2xl blur-xl"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 0.5 }}
                          exit={{ opacity: 0 }}
                        />
                      )}
                    </motion.div>
                  )
                })}
              </AnimatePresence>
            </div>
          </div>

          {/* Pagination Indicators */}
          <div className="flex justify-center gap-2 mt-8">
            {features.map((_, index) => (
              <motion.button
                key={index}
                className={`h-2 rounded-full ${currentIndex === index ? "w-8 bg-blue-600" : "w-2 bg-gray-700"}`}
                onClick={() => setCurrentIndex(index)}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                transition={{ duration: 0.2 }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="xl:max-w-7xl w-auto mx-auto pt-10 xl:px-0 px-10 relative mb-24">
        <motion.div
          className="lg:mt-24 mt-10 bg-gradient-to-l from-violet-600 to-blue-600 p-8 rounded-2xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <div className="lg:flex items-center justify-between gap-6">
            <div className="lg:mb-0 mb-10">
              <h3 className="text-white font-manrope lg:text-4xl text-3xl font-semibold leading-10 mb-5">
                Ready to Eliminate Payment Fees?
              </h3>
              <p className="text-indigo-100 text-xl font-normal leading-8">
                Join thousands of businesses saving money with our blockchain payment gateway.
              </p>
            </div>
            <motion.a
              href="mailto:sales@recurx.xyz"
              className="px-6 py-4 h-14 flex items-center justify-center text-indigo-600 text-lg font-semibold leading-7 gap-2 rounded-full bg-white whitespace-nowrap cursor-pointer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Schedule a Demo
            </motion.a>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
