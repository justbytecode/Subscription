"use client"
import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion"
import {
  Check,
  ArrowRight,
  Clock,
  Shield,
  Globe,
  Repeat,
  CreditCard,
  FileText,
  Headphones,
  Zap,
  DollarSign,
  Bitcoin,
  QrCode,
  Smartphone,
  Wallet2Icon,
  Link2,
  BitcoinIcon,
} from "lucide-react"
import Image from "next/image"

export default function ProductPage() {
  const { scrollYProgress } = useScroll()
  const opacity = useTransform(scrollYProgress, [0, 0.1], [1, 0])
  const y = useTransform(scrollYProgress, [0, 0.1], [0, -50])

  const [activeFeature, setActiveFeature] = useState(null)
  const [isVisible, setIsVisible] = useState({})
  const featureRefs = useRef([])

  // Initialize feature refs with optimized observer
  useEffect(() => {
    featureRefs.current = featureRefs.current.slice(0, features.length)

    const observerOptions = {
      root: null,
      rootMargin: "0px 0px -10% 0px", // Trigger slightly before element is fully visible
      threshold: 0.15, // Lower threshold for earlier detection
    }

    // Use requestIdleCallback for non-critical operations
    const handleIntersection = (entries) => {
      // Batch state updates for better performance
      const updatedVisibility = {}

      entries.forEach((entry) => {
        updatedVisibility[entry.target.dataset.id] = entry.isIntersecting
      })

      // Only update state if there are changes
      if (Object.keys(updatedVisibility).length > 0) {
        setIsVisible((prev) => ({ ...prev, ...updatedVisibility }))
      }
    }

    const observer = new IntersectionObserver(handleIntersection, observerOptions)

    // Observe all feature elements
    featureRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref)
    })

    return () => {
      featureRefs.current.forEach((ref) => {
        if (ref) observer.unobserve(ref)
      })
    }
  }, [])

  const features = [
    {
      id: 1,
      title: "Zero Transaction Fees — Forever",
      description:
        "Unlike traditional payment gateways, Recurx believes in removing the friction between you and your earnings. We charge absolutely zero transaction fees — so you keep 100% of what you earn. No hidden costs. No fine print. Just pure growth.",
      icon: <DollarSign className="w-12 h-12 text-orange-400" />,
      color: "orange",
      animation: "fade-right",
    },
    {
      id: 2,
      title: "Instant Settlements (<10 Seconds)",
      description:
        "Waiting days for settlements is a thing of the past. With Recurx, payments are settled directly into your account in under 10 seconds — providing you with instant liquidity and better cash flow management. Whether it's 2 AM or a public holiday, your funds are always moving at blockchain speed.",
      icon: <Clock className="w-12 h-12 text-blue-400" />,
      color: "blue",
      animation: "fade-left",
    },
    {
      id: 3,
      title: "Subscription Integration for Merchant Websites",
      description:
        "Want to enable recurring payments in crypto? Recurx provides a ready-to-integrate subscription module that fits perfectly into your website or app, enabling automated billing for memberships, SaaS, donations, or any recurring service. Manage subscription lifecycles seamlessly — without any coding complexity.",
      icon: <CreditCard className="w-12 h-12 text-yellow-400" />,
      color: "yellow",
      animation: "fade-left",
    },
    {
      id: 4,
      title: "One-Time Payment Integration Through Payment Links",
      description:
        "Selling products, services, or tickets? Generate instant payment links with one click and accept one-time crypto payments anywhere — through email, social media, QR codes, or your website. Perfect for freelancers, e-commerce, and startups needing a simple, plug-and-play solution.",
      icon: <Zap className="w-12 h-12 text-cyan-400" />,
      color: "cyan",
      animation: "fade-right",
    },
    {
      id: 5,
      title: "QR Code Payment Solution",
      description:
        "Simplify in-person transactions with our dynamic QR code payment solution. Generate custom QR codes for each transaction that customers can scan with their mobile wallets. Perfect for retail stores, restaurants, and events where quick, contactless payments are essential.",
      icon: <QrCode className="w-16 h-16 text-violet-400" />,
      color: "violet",
      animation: "fade-right",
    },

    {
      id: 6,
      title: "Fiat-to-Crypto Instant Conversion",
      description:
        "Accept fiat currencies from your users and instantly convert them to crypto assets of your choice — without delays or intermediaries. Dynamic currency conversion built for a decentralized world.",
      icon: <Repeat className="w-12 h-12 text-purple-400" />,
      color: "purple",
      animation: "fade-left",
    },
    {
      id: 7,
      title: "Crypto-to-Crypto Conversion",
      description:
        "Need flexible asset management? Easily convert crypto to crypto at competitive rates through our platform, with instant execution and transparent pricing. Diversify, hedge, or reallocate assets on-the-go — no need for multiple platforms.",
      icon: <Repeat className="w-12 h-12 text-green-400" />,
      color: "green",
      animation: "fade-right",
    },
    {
      id: 8,
      title: "300+ Cryptocurrencies Supported",
      description:
        "Accept payments in over 300 cryptocurrencies — including Bitcoin (BTC), Ethereum (ETH), Solana (SOL), USDT, and many more. Give your customers the freedom to pay however they prefer, while you enjoy a seamless experience on the backend.",
      icon: <Bitcoin className="w-15 h-15 text-orange-400" />,
      color: "orange",
      animation: "fade-right",
    },
    {
      id: 9,
      title: "12+ Fiat Currencies Supported",
      description:
        "Expand your global reach effortlessly with support for 12+ major fiat currencies, including USD, EUR, GBP, INR, and more. Recurx enables instant fiat-to-crypto conversions, making it easier than ever to settle, report, and manage funds — no matter where you or your customers are located.",
      icon: <Globe className="w-15 h-15 text-indigo-400" />,
      color: "indigo",
      animation: "fade-left",
    },

    {
      id: 10,
      title: "KYB (Know Your Business) Compliance",
      description:
        "Trust and transparency are essential. Our KYB onboarding process ensures that only verified businesses can operate on Recurx, maintaining a secure, compliant ecosystem for all our merchants. We make compliance simple and swift, so you can get started without hurdles.",
      icon: <Check className="w-12 h-12 text-teal-400" />,
      color: "teal",
      animation: "fade-left",
    },
    {
      id: 11,
      title: "Invoicing Made Easy",
      description:
        "Send professional crypto invoices to clients and customers with ease. Track payments, view statuses, automate reminders, and generate transaction histories — all from your Recurx merchant dashboard. Stay organized. Get paid faster.",
      icon: <FileText className="w-12 h-12 text-pink-400" />,
      color: "pink",
      animation: "fade-right",
    },
    {
      id: 12,
      title: "24×7 Dedicated Merchant Support",
      description:
        "Our merchant-first approach means you're never alone. Our 24/7 dedicated support team is always available to assist you — whether it's technical integration, transaction queries, or troubleshooting. With Recurx, you get real people, ready to help you succeed.",
      icon: <Headphones className="w-12 h-12 text-amber-400" />,
      color: "amber",
      animation: "fade-left",
    },
    {
      id: 13,
      title: "AI-Driven Fraud Detection",
      description:
        "Security is our first priority. Our AI-powered fraud detection system continuously analyzes transaction patterns to identify and stop suspicious activities in real-time — before they become a problem. You focus on growing your business. We'll focus on protecting it.",
      icon: <Shield className="w-12 h-12 text-red-400" />,
      color: "red",
      animation: "fade-right",
    },
  ]

  // Highlighted features for the hero section
  const highlightedFeatures = [
    { title: "Zero Fees", icon: <DollarSign className="w-5 h-5" /> },
    { title: "Receive Your Payments via Links", icon: <Link2 className="w-5 h-5" /> },
    { title: "Subscription Integration", icon: <Wallet2Icon className="w-5 h-5" /> },
    { title: "QR Payments", icon: <QrCode className="w-5 h-5" /> },
    { title: "Instant Settlements", icon: <Clock className="w-5 h-5" /> },
    { title: "300+ Cryptocurrencies", icon: <Bitcoin className="w-5 h-5" /> },
    { title: " 12+ Fiats", icon: <BitcoinIcon className="w-5 h-5" /> },
  ]

  // Replace the existing animation variants with these optimized versions
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08, // Slightly faster staggering
        delayChildren: 0.2, // Reduced delay
      },
    },
  }

  const itemVariants = {
    hidden: { y: 15, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100, damping: 8, duration: 0.4 }, // Faster spring
    },
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10,
        duration: 0.3, // Faster animation
      },
    },
    hover: {
      y: -8,
      scale: 1.03,
      boxShadow: "0 20px 30px rgba(0, 0, 0, 0.2)",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10,
      },
    },
  }

  const pulseAnimation = {
    scale: [1, 1.05, 1],
    transition: {
      duration: 2,
      repeat: Number.POSITIVE_INFINITY,
      ease: "easeInOut",
    },
  }

  // Add these new animation variants
  const iconAnimation = {
    initial: { scale: 0.8, opacity: 0 },
    animate: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 15,
        duration: 0.4,
      },
    },
    hover: {
      scale: 1.1,
      rotate: [0, 3, -3, 0],
      filter: "brightness(1.1)",
      transition: {
        scale: { duration: 0.2 },
        rotate: { duration: 0.4, repeat: 0 },
      },
    },
  }

  const shimmerAnimation = {
    x: [-200, 200],
    opacity: [0, 0.5, 0],
    transition: {
      x: { duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "linear" },
      opacity: { duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "linear" },
    },
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white overflow-hidden relative font-sans">
      
      {/* Hero Section with improved animations */}
      <motion.div className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto" style={{ opacity, y }}>
        <motion.div className="text-center" variants={containerVariants} initial="hidden" animate="visible">
          <motion.div
            className="inline-block px-4 py-1 rounded-full bg-gradient-to-r from-blue-600/20 to-purple-600/20 text-blue-400 mb-6 backdrop-blur-sm border border-blue-500/20"
            variants={itemVariants}
          >
            The Future of Payments is Here
          </motion.div>

          <motion.h1
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6"
            variants={itemVariants}
          >
            <span className="block">Decentralized</span>
            <span className="block mt-2 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              Payments Infrastructure
            </span>
          </motion.h1>

          <motion.p className="max-w-2xl mx-auto text-lg sm:text-xl text-white/80 mb-10" variants={itemVariants}>
            Transparent, secure, and completely fee-free payments for the modern web. Built for businesses that want to
            eliminate transaction costs forever.
          </motion.p>

          <motion.div variants={itemVariants} className="relative flex flex-col justify-center items-center mt-8">
            <Image
              src="/product/up.svg" // Replace with your image path
            alt="Illustration of Decentralized Payments"
            width={400}
            height={210}
            className="rounded-xl shadow-lg mb-10 sm:hidden "
            />
            <Image
              src="/product/dash.png" // Replace with your image path
              alt="Illustration of Decentralized Payments"
              width={900}
              height={900}
              className="rounded-xl shadow-lg"
            />
            <Image 
            src="/product/up.svg" // Replace with your image path
            alt="Illustration of Decentralized Payments"
            width={400}
            height={410}
            className="absolute top-12 right-70 translate-x-1/2 -translate-y-1/2 shadow-md max-sm:hidden"
            />
          </motion.div>

          {/* <motion.div className="flex flex-wrap justify-center gap-4 mb-12" variants={itemVariants}>
            <motion.a
              href="/signin"
              className="px-8 py-3 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium shadow-lg shadow-blue-600/20"
              whileHover={{ scale: 1.05, boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.4)" }}
              whileTap={{ scale: 0.95 }}
            >
              Start For Free
            </motion.a>
          </motion.div> */}

          {/* Highlighted Features with improved animations */}
          {/* <motion.div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto" variants={containerVariants}>
            {highlightedFeatures.map((feature, index) => (
              <motion.div
                key={index}
                className="flex flex-col items-center p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10"
                variants={cardVariants}
                whileHover="hover"
                transition={{ duration: 0.2 }}
              >
                <motion.div
                  className="w-10 h-10 rounded-full bg-blue-600/20 flex items-center justify-center mb-2"
                  animate={pulseAnimation}
                >
                  {feature.icon}
                </motion.div>
                <span className="text-sm font-medium">{feature.title}</span>
              </motion.div>
            ))}
          </motion.div> */}

        </motion.div>
      </motion.div>
         

        {/* QR Code Demo Section - New Section */}
      <div className=" relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              className="inline-block px-4 py-1 rounded-full bg-gradient-to-r from-violet-600/20 to-purple-600/20 text-violet-400 mb-4 backdrop-blur-sm border border-violet-500/20"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              New Feature
            </motion.div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">QR Code Payment Solution</h2>
            <p className="max-w-2xl mx-auto text-lg text-white/80">
              Simplify in-person transactions with our dynamic QR code payment system. Perfect for retail, restaurants,
              and events.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="space-y-6">
                <motion.div
                  className="flex items-start gap-4"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <div className="w-12 h-12 rounded-full bg-violet-500/20 flex items-center justify-center shrink-0 mt-1">
                    <Smartphone className="w-6 h-6 text-violet-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Mobile-First Experience</h3>
                    <p className="text-white/80">
                      Customers simply scan the QR code with their smartphone camera or wallet app to complete the
                      payment in seconds.
                    </p>
                  </div>
                </motion.div>

                <motion.div
                  className="flex items-start gap-4"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  <div className="w-12 h-12 rounded-full bg-violet-500/20 flex items-center justify-center shrink-0 mt-1">
                    <Clock className="w-6 h-6 text-violet-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Real-Time Confirmation</h3>
                    <p className="text-white/80">
                      Receive instant payment confirmations on your merchant dashboard as soon as the transaction is
                      complete.
                    </p>
                  </div>
                </motion.div>

                <motion.div
                  className="flex items-start gap-4"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                >
                  <div className="w-12 h-12 rounded-full bg-violet-500/20 flex items-center justify-center shrink-0 mt-1">
                    <Shield className="w-6 h-6 text-violet-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Secure Transactions</h3>
                    <p className="text-white/80">
                      Each QR code is uniquely generated for the specific transaction amount and expires after use for
                      maximum security.
                    </p>
                  </div>
                </motion.div>
              </div>
            </motion.div>

            <motion.div
              className="relative h-[400px] sm:h-[500px] rounded-2xl overflow-hidden bg-gradient-to-br from-violet-900/20 to-purple-600/10 backdrop-blur-sm border border-violet-500/20"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
              whileHover={{
                boxShadow: "0 20px 40px -20px rgba(139, 92, 246, 0.3)",
                scale: 1.02,
                transition: { duration: 0.3 },
              }}
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  className="w-64 h-64 bg-white p-4 rounded-xl shadow-2xl"
                  animate={{
                    y: [0, -10, 0],
                    boxShadow: [
                      "0 20px 30px -10px rgba(0, 0, 0, 0.3)",
                      "0 30px 40px -10px rgba(139, 92, 246, 0.4)",
                      "0 20px 30px -10px rgba(0, 0, 0, 0.3)",
                    ],
                  }}
                  transition={{
                    repeat: Number.POSITIVE_INFINITY,
                    duration: 4,
                    ease: "easeInOut",
                  }}
                >
                  <div className="bg-violet-500 text-white p-2 rounded-t-lg text-center font-medium">
                    RecurX Payment
                  </div>
                  <div className="p-4 flex flex-col items-center">
                    <div className="text-gray-800 font-medium mb-2">Total: $100.00</div>
                    <div className="w-44 h-44 bg-gray-100 rounded-lg flex items-center justify-center mb-2">
                      <QrCode className="w-32 h-32 text-gray-800" />
                    </div>
                    <div className="text-xs text-gray-500 text-center">Scan with your crypto wallet</div>
                  </div>
                </motion.div>

                {/* Animated particles - simplified */}
                {Array.from({ length: 4 }).map((_, i) => (
                  <motion.div
                    key={`qr-particle-${i}`}
                    className="absolute w-2 h-2 rounded-full bg-violet-400"
                    initial={{ opacity: 0 }}
                    animate={{
                      opacity: [0, 0.7, 0],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Number.POSITIVE_INFINITY,
                      delay: i * 0.5,
                      ease: "easeInOut",
                    }}
                    style={{
                      top: `${50 + (i % 2 ? 20 : -20)}%`,
                      left: `${50 + (i < 2 ? 20 : -20)}%`,
                    }}
                  />
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Features Section with enhanced animations */}
      <div id="features" className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              className="inline-block px-4 py-1 rounded-full bg-gradient-to-r from-blue-600/20 to-purple-600/20 text-blue-400 mb-4 backdrop-blur-sm border border-blue-500/20"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: 0.1, duration: 0.4 }}
            >
              Powerful Features
            </motion.div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">Everything You Need</h2>
            <p className="max-w-2xl mx-auto text-lg text-white/80">
              Recurx provides a complete payment infrastructure with features designed to maximize your revenue and
              simplify your operations.
            </p>
          </motion.div>

          <div className="space-y-24 md:space-y-32">
            {features.map((feature, index) => (
              <div
                key={feature.id}
                ref={(el) => (featureRefs.current[index] = el)}
                data-id={feature.id}
                className="relative"
              >
                <motion.div
                  className={`flex flex-col ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"} items-center gap-8 md:gap-16`}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                  animate={isVisible[feature.id] ? { opacity: 1, x: 0 } : {}}
                  transition={{
                    type: "spring",
                    stiffness: 60,
                    damping: 20,
                    duration: 0.6,
                  }}
                >
                  {/* Feature illustration with enhanced animations */}
                  <div className="w-full md:w-1/2">
                    <motion.div
                      className={`relative h-64 sm:h-80 rounded-2xl overflow-hidden bg-gradient-to-br from-${feature.color}-900/30 to-${feature.color}-600/10 backdrop-blur-sm border border-${feature.color}-500/30 shadow-lg shadow-${feature.color}-900/10`}
                      whileHover={{
                        boxShadow: `0 25px 50px -12px rgba(${feature.color === "emerald" ? "16, 185, 129" : feature.color === "blue" ? "59, 130, 246" : feature.color === "orange" ? "249, 115, 22" : feature.color === "indigo" ? "99, 102, 241" : feature.color === "red" ? "239, 68, 68" : feature.color === "purple" ? "168, 85, 247" : feature.color === "green" ? "34, 197, 94" : feature.color === "yellow" ? "234, 179, 8" : feature.color === "cyan" ? "6, 182, 212" : feature.color === "teal" ? "20, 184, 166" : feature.color === "pink" ? "236, 72, 153" : feature.color === "amber" ? "245, 158, 11" : feature.color === "violet" ? "139, 92, 246" : "59, 130, 246"}, 0.4)`,
                        scale: 1.02,
                        transition: { duration: 0.3 },
                      }}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={
                        isVisible[feature.id]
                          ? {
                              opacity: 1,
                              scale: 1,
                              transition: {
                                type: "spring",
                                stiffness: 80,
                                damping: 15,
                                delay: 0.1,
                              },
                            }
                          : {}
                      }
                    >
                      {/* Animated background particles - optimized for performance */}
                      {Array.from({ length: 3 }).map((_, i) => (
                        <motion.div
                          key={`particle-${feature.id}-${i}`}
                          className={`absolute w-${2 + (i % 3)} h-${2 + (i % 3)} rounded-full bg-${feature.color}-400/40`}
                          initial={{ opacity: 0 }}
                          animate={
                            isVisible[feature.id]
                              ? {
                                  opacity: [0, 0.7, 0],
                                  x: [0, (i % 2 ? 40 : -40) * (1 + (i % 2))],
                                  y: [0, (i < 2 ? -30 : 30) * (1 + (i % 2))],
                                }
                              : {}
                          }
                          transition={{
                            duration: 2.5 + i,
                            repeat: Number.POSITIVE_INFINITY,
                            repeatType: "loop",
                            delay: i * 0.3,
                            ease: "easeInOut",
                          }}
                          style={{
                            left: `${45 + ((i * 10) % 20)}%`,
                            top: `${45 + ((i * 10) % 20)}%`,
                          }}
                        />
                      ))}

                      <div className="absolute inset-0 flex items-center justify-center">
                        <motion.div
                          className={`w-28 h-28 rounded-full bg-gradient-to-r from-${feature.color}-600 to-${feature.color}-400 flex items-center justify-center shadow-xl shadow-${feature.color}-500/30`}
                          initial={{ scale: 0.8, opacity: 0 }}
                          animate={
                            isVisible[feature.id]
                              ? {
                                  scale: 1,
                                  opacity: 1,
                                  transition: {
                                    type: "spring",
                                    stiffness: 150,
                                    damping: 15,
                                    delay: 0.3,
                                  },
                                }
                              : {}
                          }
                          whileHover={iconAnimation.hover}
                        >
                          <motion.div
                            className="text-5xl text-white"
                            animate={
                              isVisible[feature.id]
                                ? {
                                    scale: [1, 1.1, 1],
                                    transition: {
                                      duration: 3,
                                      repeat: Number.POSITIVE_INFINITY,
                                      repeatType: "reverse",
                                      ease: "easeInOut",
                                    },
                                  }
                                : {}
                            }
                          >
                            {feature.icon}
                          </motion.div>
                        </motion.div>
                      </div>

                      {/* Animated glow effect - optimized */}
                      <motion.div
                        className={`absolute inset-0 bg-gradient-to-r from-transparent via-${feature.color}-500/30 to-transparent`}
                        initial={{ opacity: 0, x: -200 }}
                        animate={isVisible[feature.id] ? shimmerAnimation : {}}
                      />
                    </motion.div>
                  </div>

                  {/* Feature content with enhanced animations */}
                  <div className="w-full md:w-1/2">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={
                        isVisible[feature.id]
                          ? {
                              opacity: 1,
                              y: 0,
                              transition: {
                                type: "spring",
                                stiffness: 60,
                                damping: 20,
                                delay: 0.2,
                              },
                            }
                          : {}
                      }
                    >
                      <motion.h3
                        className={`text-2xl sm:text-3xl font-bold mb-4 text-${feature.color}-400`}
                        initial={{ opacity: 0, x: index % 2 === 0 ? 15 : -15 }}
                        animate={
                          isVisible[feature.id]
                            ? {
                                opacity: 1,
                                x: 0,
                                transition: {
                                  type: "spring",
                                  stiffness: 100,
                                  damping: 20,
                                  delay: 0.3,
                                },
                              }
                            : {}
                        }
                      >
                        {feature.title}
                      </motion.h3>

                      <motion.p
                        className="text-white/90 text-lg mb-6"
                        initial={{ opacity: 0 }}
                        animate={
                          isVisible[feature.id]
                            ? {
                                opacity: 1,
                                transition: {
                                  duration: 0.6,
                                  delay: 0.4,
                                },
                              }
                            : {}
                        }
                      >
                        {feature.description}
                      </motion.p>

                      <motion.button
                        className={`inline-flex items-center text-${feature.color}-400 font-medium`}
                        whileHover={{
                          x: 5,
                          transition: {
                            type: "spring",
                            stiffness: 400,
                            damping: 10,
                          },
                        }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setActiveFeature(feature.id === activeFeature ? null : feature.id)}
                        initial={{ opacity: 0 }}
                        animate={
                          isVisible[feature.id]
                            ? {
                                opacity: 1,
                                transition: {
                                  duration: 0.4,
                                  delay: 0.5,
                                },
                              }
                            : {}
                        }
                      >
                        <span>See More</span>
                        <motion.span
                          animate={{ x: [0, 5, 0] }}
                          transition={{
                            duration: 1.2,
                            repeat: Number.POSITIVE_INFINITY,
                            repeatType: "loop",
                            ease: "easeInOut",
                          }}
                        >
                          <ArrowRight className="ml-2 w-4 h-4" />
                        </motion.span>
                      </motion.button>

                      {/* Expandable content with enhanced animations */}
                      <AnimatePresence>
                        {activeFeature === feature.id && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{
                              height: "auto",
                              opacity: 1,
                              transition: {
                                height: {
                                  type: "spring",
                                  stiffness: 100,
                                  damping: 20,
                                  duration: 0.3,
                                },
                                opacity: {
                                  duration: 0.3,
                                  delay: 0.1,
                                },
                              },
                            }}
                            exit={{
                              height: 0,
                              opacity: 0,
                              transition: {
                                height: {
                                  duration: 0.2,
                                },
                                opacity: {
                                  duration: 0.1,
                                },
                              },
                            }}
                            className="overflow-hidden"
                          >
                            <motion.div
                              className={`mt-4 p-4 rounded-lg bg-${feature.color}-900/30 border border-${feature.color}-500/30 shadow-lg shadow-${feature.color}-900/5`}
                              initial={{ y: 15 }}
                              animate={{
                                y: 0,
                                transition: {
                                  type: "spring",
                                  stiffness: 200,
                                  damping: 20,
                                },
                              }}
                            >
                              <motion.ul className="space-y-3">
                                {[
                                  "Seamless integration with your existing systems",
                                  "Comprehensive dashboard for real-time monitoring",
                                  "Advanced analytics to track performance metrics",
                                ].map((item, i) => (
                                  <motion.li
                                    key={i}
                                    className="flex items-start"
                                    initial={{ opacity: 0, x: -8 }}
                                    animate={{
                                      opacity: 1,
                                      x: 0,
                                      transition: {
                                        duration: 0.2,
                                        delay: 0.05 + i * 0.08,
                                      },
                                    }}
                                  >
                                    <motion.span
                                      initial={{ scale: 0 }}
                                      animate={{
                                        scale: 1,
                                        transition: {
                                          type: "spring",
                                          stiffness: 300,
                                          damping: 10,
                                          delay: 0.1 + i * 0.08,
                                        },
                                      }}
                                    >
                                      <Check className={`w-5 h-5 mr-2 text-${feature.color}-400 shrink-0 mt-0.5`} />
                                    </motion.span>
                                    <span className="text-white/90">{item}</span>
                                  </motion.li>
                                ))}
                              </motion.ul>
                            </motion.div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  </div>
                </motion.div>

                {/* Decorative elements - optimized */}
                <motion.div
                  className={`absolute -z-10 w-full md:w-1/2 h-full top-0 ${index % 2 === 0 ? "right-0" : "left-0"} opacity-10`}
                  initial={{ opacity: 0 }}
                  animate={
                    isVisible[feature.id]
                      ? {
                          opacity: 0.05,
                          transition: { duration: 0.8, delay: 0.3 },
                        }
                      : {}
                  }
                >
                  <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                    <path
                      fill={`currentColor`}
                      className={`text-${feature.color}-500`}
                      d="M45.3,-51.2C58.3,-40.9,68.5,-25.9,71.8,-9.2C75.2,7.5,71.7,25.9,61.4,38.5C51.1,51.1,33.9,58,16.2,62.5C-1.5,67,-19.7,69.2,-35.8,63.5C-51.9,57.8,-65.9,44.3,-72.1,27.7C-78.3,11.1,-76.7,-8.6,-68.9,-24.8C-61.1,-41,-47.1,-53.8,-32.3,-63.1C-17.5,-72.4,-1.9,-78.2,11.8,-74.8C25.5,-71.4,32.3,-61.5,45.3,-51.2Z"
                      transform="translate(100 100)"
                    />
                  </svg>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </div>

      

      {/* How It Works Section with enhanced animations */}
      <div id="how-it-works" className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              className="inline-block px-4 py-1 rounded-full bg-gradient-to-r from-blue-600/20 to-purple-600/20 text-blue-400 mb-4 backdrop-blur-sm border border-blue-500/20"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              Simple Process
            </motion.div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">How RecurX Works</h2>
            <p className="max-w-2xl mx-auto text-lg text-white/80">
              Get started in minutes with our simple integration process. No complex setup required.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Sign Up",
                description: "Create your merchant account and complete the simple KYB verification process.",
                icon: <Check className="w-8 h-8 text-green-400" />,
                color: "green",
              },
              {
                step: "02",
                title: "Integrate",
                description: "Add our SDK to your website or use our payment links for quick implementation.",
                icon: <CreditCard className="w-8 h-8 text-blue-400" />,
                color: "blue",
              },
              {
                step: "03",
                title: "Get Paid",
                description: "Start accepting payments with zero fees and instant settlements to your wallet.",
                icon: <DollarSign className="w-8 h-8 text-purple-400" />,
                color: "purple",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                className="relative p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 overflow-hidden"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                whileHover={{
                  y: -10,
                  boxShadow: "0 20px 40px -10px rgba(0, 0, 0, 0.5)",
                  backgroundColor: "rgba(255, 255, 255, 0.08)",
                  scale: 1.03,
                  transition: { type: "spring", stiffness: 400, damping: 10 },
                }}
              >
                <div className={`absolute -right-4 -top-4 w-24 h-24 rounded-full bg-${item.color}-500/10 blur-2xl`} />

                <div className="relative">
                  <motion.div
                    className={`w-16 h-16 rounded-2xl bg-${item.color}-500/20 flex items-center justify-center mb-6`}
                    animate={pulseAnimation}
                  >
                    {item.icon}
                  </motion.div>

                  <span className={`text-5xl font-bold text-${item.color}-500/20 absolute -top-2 -right-2`}>
                    {item.step}
                  </span>

                  <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                  <p className="text-white/70">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section with enhanced animations */}
      <div id="contact" className="py-20 relative">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="rounded-3xl overflow-hidden relative"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            {/* Animated background elements with enhanced effects */}
            <div className="absolute inset-0 overflow-hidden">
              {Array.from({ length: 8 }).map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute rounded-full bg-white/10"
                  style={{
                    width: Math.random() * 300 + 50,
                    height: Math.random() * 300 + 50,
                    top: `${Math.random() * 100}%`,
                    left: `${Math.random() * 100}%`,
                  }}
                  animate={{
                    x: [Math.random() * 100 - 50, Math.random() * 100 - 50],
                    y: [Math.random() * 100 - 50, Math.random() * 100 - 50],
                    opacity: [0.1, 0.3, 0.1],
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: Math.random() * 10 + 10,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: "reverse",
                  }}
                />
              ))}
            </div>

            <div className="relative p-8 md:p-12 lg:p-16 text-white">
              <div className="text-center max-w-3xl mx-auto">
                <motion.h2
                  className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                >
                  Ready to Eliminate Payment Fees?
                </motion.h2>
                <motion.p
                  className="text-xl mb-10 text-white/90"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  Join thousands of businesses saving money with our blockchain payment gateway. Schedule a demo today
                  and see how RecurX can transform your payment infrastructure.
                </motion.p>

                <motion.div
                  className="flex flex-col sm:flex-row gap-4 justify-center"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  <motion.a
                    href="/signin"
                    className="px-8 py-4 rounded-full bg-black/20 backdrop-blur-sm text-white font-medium border border-white/30"
                    whileHover={{ scale: 1.05, backgroundColor: "rgba(255, 255, 255, 0.3)" }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Explore Features
                  </motion.a>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
