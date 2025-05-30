"use client"
import Coin3D from "@/components/Coin3D"
import { ShieldCheck } from 'lucide-react';
import { useEffect, useState } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowRight, Shield, RefreshCw, Zap, Globe, Lock, CreditCard } from "lucide-react"
import FeatureComponent from "@/components/FeatureComponent"
import InfiniteMovingCards from "@/components/InfiniteMovingCards"
import SupportedTokens from "@/components/SupportedTokens"
import TawkMessengerReact from "@tawk.to/tawk-messenger-react"
import TokenDisplay from "@/components/token-display"
// Docs component removed as requested
const randomDecimal = () => (Math.random() * 0.99 + 0.01).toFixed(2)

const particlesAnimationArray = [
  {
    uint: "btc",
    img: "./supportedCoins/bitcoin.svg",
    amt: randomDecimal(),
  },
  {
    uint: "eth",
    img: "./supportedCoins/ethereum.svg",
    amt: randomDecimal(),
  },
  {
    uint: "usdc",
    img: "/supportedCoins/tether.svg",
    amt: randomDecimal(),
  },
  {
    uint: "btc",
    img: "./supportedCoins/bitcoin.svg",
    amt: randomDecimal(),
  },
  {
    uint: "eth",
    img: "./supportedCoins/ethereum.svg",
    amt: randomDecimal(),
  },
  {
    uint: "usdc",
    img: "/supportedCoins/tether.svg",
    amt: randomDecimal(),
  },
  {
    uint: "btc",
    img: "./supportedCoins/bitcoin.svg",
    amt: randomDecimal(),
  },
  {
    uint: "eth",
    img: "./supportedCoins/ethereum.svg",
    amt: randomDecimal(),
  },
  {
    uint: "usdc",
    img: "/supportedCoins/tether.svg",
    amt: randomDecimal(),
  },
]

export default function Page() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [activeFeature, setActiveFeature] = useState(0)
  const [isVisible, setIsVisible] = useState(true)

  const features = ["Decentralized Payments", "Zero Transaction Fees", "Blockchain Security", "Multi-chain Support"]

  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false)
      setTimeout(() => {
        setActiveFeature((prev) => (prev + 1) % features.length)
        setIsVisible(true)
      }, 500)
    }, 3000)

    return () => clearInterval(interval)
  }, [features.length])

  useEffect(() => {
    const script = document.createElement("script")
    script.src = "https://embed.tawk.to/67e50a774040b31908c84848/default"
    script.async = true
    script.charset = "UTF-8"
    script.setAttribute("crossorigin", "*")
    document.body.appendChild(script)

    return () => {
      document.body.removeChild(script) // Cleanup on unmount
    }
  }, [])

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch("/api/auth/session")
        const session = await response.json()
        if (session && session.user) {
          setIsAuthenticated(true)
          window.location.href = "/dashboard"
        }
      } catch (error) {
        console.error("Auth check failed:", error)
      }
    }

    checkAuth()
  }, [])

  // Track mouse position for the gradient effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener("mousemove", handleMouseMove)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden relative">
      <div className="relative">
        <TawkMessengerReact
          onBeforeLoad={() => {}}
          onStatusChange={() => {}}
          onLoad={() => {}}
          onChatMaximized={() => {}}
          onChatMinimized={() => {}}
          onChatHidden={() => {}}
          onChatStarted={() => {}}
          onChatEnded={() => {}}
          onPrechatSubmit={() => {}}
          onOfflineSubmit={() => {}}
          onChatMessageVisitor={() => {}}
          onChatMessageAgent={() => {}}
          onChatMessageSystem={() => {}}
          onAgentJoinChat={() => {}}
          onAgentLeaveChat={() => {}}
          onChatSatisfaction={() => {}}
          onVisitorNameChanged={() => {}}
          onTagsUpdated={() => {}}
          onUnreadCountChanged={() => {}}
          propertyId="67e50a774040b31908c84848"
          widgetId="1injsi3ti"
        />
      </div>

      {/* Enhanced animated background with multiple layers */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(59, 130, 246, 0.4) 0%, rgba(16, 185, 129, 0.2) 25%, transparent 50%)`,
          transition: "background 0.3s ease",
        }}
      />

      {/* Animated grid pattern overlay */}
      {/* <div className="absolute inset-0 opacity-10">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="smallGrid" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="white" strokeWidth="0.5" />
            </pattern>
            <pattern id="grid" width="80" height="80" patternUnits="userSpaceOnUse">
              <rect width="80" height="80" fill="url(#smallGrid)" />
              <path d="M 80 0 L 0 0 0 80" fill="none" stroke="white" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div> */}

      {/* Floating particles */}
      {/* <FloatingParticles /> */}

      {/* Hero Section */}
      <header className="mx-auto pl-[5%] py-20 relative z-10">
        {/* SVG Background Layer */}
        <motion.img
          src="/light.svg"
          className="absolute right-0 top-0 z-50"
          height={1000}
          width={1000}
          initial={{ 
            opacity: 0,
            filter: "blur(10px) brightness(0.5)",
            transform: "translateX(5px)"
          }}
          animate={{ 
            opacity: 0.8,
            filter: "blur(0px) brightness(1)",
            transform: "translateX(0px) scale(1)"
          }}
          transition={{
            duration: 1.5,
            delay: 0.3,
            ease: "easeOut"
          }}
          whileHover={{
            opacity: 1,
            filter: "blur(0px) brightness(1.2)",
            transition: { duration: 0.3 }
          }}
        />

        <div className="flex flex-col lg:flex-row items-center justify-between ml:20 mt-10 md:mt-24 gap-8 md:gap-12">
          {/* Left side content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="flex-1 max-w-2xl"
          >
            {/* Logo/Brand */}
           

            {/* Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 md:mb-6 tracking-tight leading-[1.1]"
            >
              {/* <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600">
                RecurX
              </span> */}
              <div className="flex items-center gap-2 mb-4">
                <div className="flex ">
                {<ShieldCheck className="h-5.6 w-5.63 text-emerald-400" />}
                </div>
                <div className="text-sm text-gray-400  font-normal tracking-wide ">
                Trusted by <span className="text-blue-400 font-medium">1,000+</span> Merchants worldwide
                </div>
              </div>
              
              <span className="text-white">The Future of</span>
              <br />
              <AnimatePresence mode="wait">
                {isVisible && (
                  <motion.span
                    key={activeFeature}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                    className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-emerald-400"
                  >
                    {features[activeFeature]}
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.h1>

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="text-xl text-gray-300 mb-8 sm:mb-17 leading-relaxed "
            >
              Create and manage your payments with RecurX, with
              <span className="relative inline-block mx-1">
                <span className="font-extrabold text-white">0% Transaction fee</span>
                <motion.span
                  className="absolute -bottom-1 left-0 w-full h-[2px] bg-gradient-to-r from-blue-500 to-emerald-400"
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ delay: 1, duration: 0.8 }}
                />
              </span>
              powered by blockchain technology.
            </motion.p>

            {/* CTA Button - moved to top */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.6 }}
                className="mb-12 flex justify-start"
              >
                <motion.div
                  whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(59, 130, 246, 0.5)" }}
                  whileTap={{ scale: 0.95 }}
                  className="relative group"
                >
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-emerald-600 rounded-xl blur opacity-60 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-pulse"></div>
                  <Link
                    href="/wait-list"
                    className="relative flex items-center justify-center gap-2 bg-gradient-to-br from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl shadow-lg transition-all duration-300 text-base sm:text-lg font-medium"
                  >
                    Join waitlist
                    <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
                  </Link>
                </motion.div>
              </motion.div>


          {/* Feature icons in horizontal layout */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.8 }}
              className="flex justify-center items-center gap-8 md:gap-12 lg:gap-16"
            >
              {/* Security Feature */}
              <motion.div
                whileHover={{ scale: 1.1 }}
                className="flex flex-col items-center text-center max-w-xs"
              >
                <div className="bg-emerald-500/20 p-4 rounded-full mb-4 border border-emerald-500/30">
                  <Shield className="h-6 w-6 text-emerald-400" />
                </div>
                <p className="text-white text-sm leading-relaxed">
                  Enterprise-grade security with blockchain technology
                </p>
              </motion.div>

              {/* Speed Feature */}
              <motion.div
                whileHover={{ scale: 1.1 }}
                className="flex flex-col items-center text-center max-w-xs"
              >
                <div className="bg-yellow-500/20 p-4 rounded-full mb-4 border border-yellow-500/30">
                  <Zap className="h-6 w-6 text-yellow-400" />
                </div>
                <p className="text-white text-sm leading-relaxed">
                  Lightning-fast transactions across multiple chains
                </p>
              </motion.div>

              {/* Global Feature */}
              <motion.div
                whileHover={{ scale: 1.1 }}
                className="flex flex-col items-center text-center max-w-xs"
              >
                <div className="bg-blue-500/20 p-4 rounded-full mb-4 border border-blue-500/30">
                  <Globe className="h-6 w-6 text-blue-400" />
                </div>
                <p className="text-white text-sm leading-relaxed">
                  Global payments with no borders or limitations
                </p>
              </motion.div>
            </motion.div>

            {/* Trust indicators */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.7 }}
              className="mt-10 flex items-center gap-2"
            >
              
              
            </motion.div>
          </motion.div>

          
          {/* Right side - 3D visualization */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="flex-1 relative"
          >
           
            
            {/* Content Layer */}
            <div className="relative z-10 w-full h-[500px] flex flex-col justify-center items-center">
              {/* <motion.h2
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.6 }}
                className="text-2xl md:text-3xl font-bold text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500 drop-shadow-[0_0_10px_rgba(255,215,0,0.5)] animate-pulse"
              >
                Seamless payments for better Future
              </motion.h2> 
              */}
              
              {/* token goes here  */}
              {/* <Coin3D /> */}
              
              {/* uncomment afterwards coin display*/}
              {/* <TokenDisplay /> */}
             
              {/* <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.8 }}
                  className="flex justify-center mt-4"
                >
                  <Link href="/airdrop">
                    <button className=" cursor-pointer bg-gradient-to-r from-indigo-700 via-indigo-600 to-blue-500 hover:from-blue-400 hover:to-blue-400 text-white px-8 py-3 rounded-xl text-base font-semibold transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg active:scale-95 focus:outline-none focus:ring-4 focus:ring-blue-300/50 ">
                        Get Your Token
                    </button>
                  </Link>
              </motion.div> */}

              {/* Connection lines */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 5 }}>
                <motion.path
                  d="M200,250 C250,150 350,150 400,250"
                  stroke="url(#blueGradient)"
                  strokeWidth="1"
                  fill="none"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 0.5 }}
                  transition={{ duration: 2, delay: 1 }}
                />
                <motion.path
                  d="M200,250 C150,350 250,350 400,250"
                  stroke="url(#purpleGradient)"
                  strokeWidth="1"
                  fill="none"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 0.5 }}
                  transition={{ duration: 2, delay: 1.5 }}
                />
                <defs>
                  <linearGradient id="blueGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.2" />
                    <stop offset="50%" stopColor="#3b82f6" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.2" />
                  </linearGradient>
                  <linearGradient id="purpleGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.2" />
                    <stop offset="50%" stopColor="#8b5cf6" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.2" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        {/* <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.7 }}
          className=" transform  flex flex-col items-center"
        >
          <span className="text-sm text-gray-400 mb-2">Scroll to explore</span>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
            className="w-6 h-10 rounded-full border-2 border-gray-500 flex items-center justify-center"
          >
            <motion.div
              animate={{ height: [5, 10, 5] }}
              transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
              className="w-1 bg-blue-500 rounded-full"
            />
          </motion.div>
        </motion.div> */}
      </header>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-center mb-16"
        >
          <h2
            className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 tracking-tight"
            style={{
              background: "linear-gradient(to right, #3b82f6, #8b5cf6, #10b981)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Why Choose RecurX ?
          </h2>
          <p className="text-gray-300 max-w-3xl mx-auto text-xl">
            Our platform combines the best of blockchain technology with user-friendly design to revolutionize
            subscription payments.
          </p>
        </motion.div>

        <InfiniteMovingCards />
      </section>

      {/* Supported Coin Section */}
      <section className="container mx-auto px-4 py-16 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-center mb-16"
        >
          <h2
            className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 tracking-tight"
            style={{
              background: "linear-gradient(to right, #3b82f6, #8b5cf6, #10b981)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Supported Tokens ?
          </h2>
          <p className="text-gray-300 max-w-3xl mx-auto text-xl">
            Our platform supports a wide range of cryptocurrencies, making subscription payments accessible and flexible
            for users worldwide.
          </p>
        </motion.div>

        <SupportedTokens />
      </section>

      {/* Floating blockchain elements - simplified */}
      <div className="absolute top-1/4 -left-20 opacity-10 animate-pulse">
        <BlockchainElement />
      </div>
      <div className="absolute bottom-1/4 -right-20 opacity-10 animate-pulse" style={{ animationDelay: "1s" }}>
        <BlockchainElement />
      </div>

      {/* Feature Component */}
      <FeatureComponent />
    </div>
  )
}

function FeatureBullet({ icon, text }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="flex items-center gap-2 md:gap-3"
    >
      <div className="flex-shrink-0 w-5 h-5 md:w-6 md:h-6 rounded-full bg-blue-900/50 flex items-center justify-center">
        {icon}
      </div>
      <span className="text-gray-300 text-sm md:text-base">{text}</span>
    </motion.div>
  )
}

// Orbiting Element Component
function OrbitingElement({ icon, size, distance, duration, delay, label }) {
  return (
    <motion.div
      className="absolute top-1/2 left-1/2"
      initial={{ rotate: delay * 18 }}
      animate={{ rotate: [delay * 18, delay * 18 + 360] }}
      transition={{ duration, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
      style={{ width: distance * 2, height: distance * 2, marginLeft: -distance, marginTop: -distance }}
    >
      <motion.div
        className="absolute"
        style={{
          width: size,
          height: size,
          borderRadius: "50%",
          top: "50%",
          left: distance - size / 2,
          marginTop: -size / 2,
        }}
        whileHover={{ scale: 1.2 }}
      >
        <div className="w-full h-full rounded-full bg-gray-900/80 backdrop-blur-md border border-gray-700 flex flex-col items-center justify-center">
          {icon}
          <span className="text-xs mt-1 text-gray-300">{label}</span>
        </div>
      </motion.div>
    </motion.div>
  )
}

// Floating Transaction Card
function FloatingTransactionCard({ amount, status, top, left, delay }) {
  return (
    <motion.div
      className="absolute bg-gray-900/70 backdrop-blur-md border border-gray-800 rounded-lg p-3 shadow-lg w-40"
      style={{ top, left }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.7 }}
    >
      <div className="flex items-center justify-between mb-2">
        <div className="text-sm font-medium text-gray-300">Payment</div>
        <div className="w-2 h-2 rounded-full bg-green-500"></div>
      </div>
      <div className="text-lg font-bold text-white mb-1">{amount}</div>
      <div className="text-xs text-green-400">{status}</div>
    </motion.div>
  )
}

// Floating Particles
function FloatingParticles() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-blue-500/10"
          initial={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            scale: Math.random() * 0.5 + 0.5,
          }}
          animate={{
            x: [null, Math.random() * window.innerWidth],
            y: [null, Math.random() * window.innerHeight],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{
            duration: Math.random() * 20 + 10,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
            repeatType: "reverse",
          }}
          style={{
            width: `${Math.random() * 20 + 5}px`,
            height: `${Math.random() * 20 + 5}px`,
          }}
        />
      ))}
    </div>
  )
}

// Secure Payment Badge

// Blockchain Element - Simplified
function BlockchainElement() {
  return (
    <svg width="180" height="180" viewBox="0 0 180 180" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="45" y="45" width="90" height="90" rx="8" stroke="white" strokeWidth="1.5" />
      <rect x="65" y="65" width="50" height="50" rx="4" stroke="white" strokeWidth="1.5" />
      <line x1="45" y1="90" x2="180" y2="90" stroke="white" strokeWidth="1.5" />
      <line x1="90" y1="45" x2="90" y2="180" stroke="white" strokeWidth="1.5" />
    </svg>
  )
}
