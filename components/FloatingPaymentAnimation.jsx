"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Plus, Minus, CreditCard, RefreshCw, QrCode, Globe } from "lucide-react"

const FeatureComponent = () => {
  const [openItem, setOpenItem] = useState("links")
  const [text, setText] = useState("")
  const [isDeleting, setIsDeleting] = useState(false)
  const [wordIndex, setWordIndex] = useState(0)

  // Array of words to cycle through
  const words = ["Crypto Payments", "with Security", "Subscription", "Multichain Payments"]

  // Typing speed (milliseconds)
  const typingSpeed = 150
  const deletingSpeed = 100
  const pauseBeforeDeleting = 1500
  const pauseBeforeTyping = 500

  useEffect(() => {
    let timeout

    if (!isDeleting && text === words[wordIndex]) {
      // Finished typing a word, pause before deleting
      timeout = setTimeout(() => {
        setIsDeleting(true)
      }, pauseBeforeDeleting)
    } else if (isDeleting && text === "") {
      // Finished deleting, move to next word and pause before typing
      setIsDeleting(false)
      setWordIndex((prev) => (prev + 1) % words.length)
      timeout = setTimeout(() => {}, pauseBeforeTyping)
    } else if (isDeleting) {
      // Deleting characters
      timeout = setTimeout(() => {
        setText(text.slice(0, -1))
      }, deletingSpeed)
    } else {
      // Typing characters
      timeout = setTimeout(() => {
        setText(words[wordIndex].slice(0, text.length + 1))
      }, typingSpeed)
    }

    return () => clearTimeout(timeout)
  }, [text, isDeleting, wordIndex, words])

  const paymentOptions = [
    {
      id: "recurring",
      title: "Recurring payments",
      subtitle: "Subscription businesses choice",
      description:
        "Subscription-based payments for your business. Your client needs to set it up just once to be charged regularly.",
      defaultOpen: false,
      component: "recurring",
    },
    {
      id: "qr",
      title: "QR",
      subtitle: "Scan and Pay",
      description: "Scan and Pay through Crypto on RecurX, Scan and Pay Feature.",
      defaultOpen: false,
      component: "qr",
    },
    {
      id: "links",
      title: "Payment links",
      description: "Create shareable payment links for your products or services.",
      defaultOpen: true,
      component: "links",
    },
    {
      id: "invoices",
      title: "Invoices",
      description: "Send professional invoices to your clients for one-time payments.",
      defaultOpen: false,
      component: "invoices",
    },
  ]

  const toggleItem = (id) => {
    setOpenItem(openItem === id ? "recurring" : id)
  }

  // Animation variants for accordion items
  const accordionVariants = {
    open: {
      opacity: 1,
      height: "auto",
      transition: { duration: 0.3, ease: "easeInOut" },
    },
    closed: {
      opacity: 0,
      height: 0,
      transition: { duration: 0.3, ease: "easeInOut" },
    },
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: 0.2, duration: 0.7 }}
      className="flex flex-col lg:flex-row justify-center items-center gap-8 min-h-screen px-4 py-12 md:p-12 z-50"
    >
      <div className="text-center lg:text-left mb-8 lg:mb-0">
        <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-6 max-w-3xl tracking-tight leading-tight animate-fade-in">
          We make it easy for you to plug
          <br />
          into digital payments <br /> <span className="text-green-500">{text}</span>
          <span className="opacity-100 animate-pulse" aria-hidden="true">
            |
          </span>
        </h2>
      </div>

      <div className="w-full max-w-5xl flex flex-col lg:flex-row gap-6 lg:gap-8 rounded-3xl overflow-hidden bg-zinc-900/80 backdrop-blur-md shadow-2xl shadow-blue-900/20 animate-slide-in border border-zinc-800">
        <div className="w-full lg:w-1/2 p-6">
          <div className="space-y-0">
            {paymentOptions.map((option) => (
              <div key={option.id} className="relative border-b border-gray-800 py-5">
                <div
                  className="flex items-center justify-between cursor-pointer py-2 transition-all duration-300 hover:opacity-80"
                  onClick={() => toggleItem(option.id)}
                >
                  <div>
                    <h3 className="text-xl font-medium">{option.title}</h3>
                    {option.subtitle && <p className="text-sm text-white/70 mt-1">{option.subtitle}</p>}
                  </div>

                  <button
                    className={`bg-transparent border border-gray-800 rounded-full w-6 h-6 flex items-center justify-center transition-all duration-300 ${openItem === option.id ? "bg-white transform rotate-0" : "transform rotate-0"}`}
                    aria-label={openItem === option.id ? "Collapse" : "Expand"}
                  >
                    <span className={openItem === option.id ? "text-black" : "text-white"}>
                      {openItem === option.id ? <Minus className="h-3 w-3" /> : <Plus className="h-3 w-3" />}
                    </span>
                  </button>
                </div>

                <motion.div
                  initial={false}
                  animate={openItem === option.id ? "open" : "closed"}
                  variants={accordionVariants}
                  className="overflow-hidden"
                >
                  {option.description && (
                    <div className="pt-3 pb-1">
                      <p className="text-white/70">{option.description}</p>
                    </div>
                  )}
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2, duration: 0.7 }}
                  className={`w-full lg:w-1/2 mx-auto block md:hidden`}
                >
                  {openItem === option.id && getComponentToRender(openItem)}
                </motion.div>
              </div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.7 }}
          className="w-full lg:w-1/2 hidden md:block p-6 bg-gradient-to-br from-zinc-900 to-zinc-950 rounded-r-3xl"
        >
          {getComponentToRender(openItem)}
        </motion.div>
      </div>
    </motion.div>
  )
}

// Feature visualization components
function getComponentToRender(componentName) {
  switch (componentName) {
    case "recurring":
      return <RecurringPaymentCard />
    case "qr":
      return <QrPaymentCard />
    case "links":
      return <PaymentLinksCard />
    case "invoices":
      return <InvoicePaymentCard />
    default:
      return <QrPaymentCard />
  }
}

// Recurring Payment Card Component
function RecurringPaymentCard() {
  return (
    <div className="h-full flex flex-col items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-zinc-800/50 backdrop-blur-md rounded-xl p-6 border border-zinc-700 shadow-lg max-w-md w-full"
      >
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="bg-blue-600/20 p-2 rounded-full">
              <RefreshCw className="h-6 w-6 text-blue-400" />
            </div>
            <div>
              <h3 className="font-bold text-lg">Netflix Premium</h3>
              <p className="text-sm text-gray-400">Monthly subscription</p>
            </div>
          </div>
          <div className="text-right">
            <p className="font-bold text-lg">$14.99</p>
            <p className="text-xs text-green-400">Active</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-400">Next payment</span>
            <span>June 15, 2025</span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-400">Payment method</span>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-yellow-500"></div>
              <span>0.0043 BTC</span>
            </div>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-400">Status</span>
            <span className="px-2 py-1 bg-green-500/20 text-green-400 rounded-full text-xs">Active</span>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-zinc-700">
          <div className="flex justify-between items-center">
            <button className="text-sm text-red-400 hover:text-red-300 transition-colors">Cancel subscription</button>
            <button className="text-sm bg-blue-600 hover:bg-blue-500 px-3 py-1.5 rounded-lg transition-colors">
              Manage
            </button>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="bg-zinc-800/50 backdrop-blur-md rounded-xl p-6 border border-zinc-700 shadow-lg max-w-md w-full mt-4"
      >
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="bg-purple-600/20 p-2 rounded-full">
              <RefreshCw className="h-6 w-6 text-purple-400" />
            </div>
            <div>
              <h3 className="font-bold text-lg">Spotify</h3>
              <p className="text-sm text-gray-400">Annual subscription</p>
            </div>
          </div>
          <div className="text-right">
            <p className="font-bold text-lg">$99.99</p>
            <p className="text-xs text-green-400">Active</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-400">Next payment</span>
            <span>Dec 01, 2025</span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-400">Payment method</span>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-blue-500"></div>
              <span>0.052 ETH</span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

// QR Payment Card Component
function QrPaymentCard() {
  const [isScanning, setIsScanning] = useState(false)
  const [isComplete, setIsComplete] = useState(false)

  useEffect(() => {
    if (isScanning) {
      const timer = setTimeout(() => {
        setIsComplete(true)
        setIsScanning(false)
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [isScanning])

  return (
    <div className="h-full flex flex-col items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-zinc-800/50 backdrop-blur-md rounded-xl p-6 border border-zinc-700 shadow-lg max-w-md w-full"
      >
        <div className="text-center mb-4">
          <h3 className="font-bold text-xl mb-1">Scan to Pay</h3>
          <p className="text-sm text-gray-400">Amount: 50 USDT</p>
        </div>

        <div className="relative mx-auto w-64 h-64 bg-white p-2 rounded-lg mb-4">
          {!isComplete ? (
            <>
              <div className="w-full h-full relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <QrCode className="w-48 h-48 text-black" />
                </div>

                {isScanning && (
                  <motion.div
                    initial={{ top: 0 }}
                    animate={{ top: ["0%", "100%", "0%"] }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                    className="absolute left-0 right-0 h-1 bg-green-500 z-10"
                  />
                )}
              </div>
            </>
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center bg-green-50">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 10 }}
                className="w-20 h-20 rounded-full bg-green-500 flex items-center justify-center mb-2"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-12 w-12 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              </motion.div>
              <p className="text-black font-bold text-lg">Payment Complete!</p>
            </div>
          )}
        </div>

        <div className="flex flex-col space-y-3">
          {!isComplete ? (
            <>
              <button
                onClick={() => setIsScanning(true)}
                disabled={isScanning}
                className={`w-full py-3 rounded-lg font-medium transition-colors ${
                  isScanning
                    ? "bg-blue-800 text-blue-200 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-500 text-white"
                }`}
              >
                {isScanning ? "Scanning..." : "Scan QR Code"}
              </button>
              <button className="w-full py-3 rounded-lg font-medium bg-transparent border border-gray-600 hover:border-gray-500 transition-colors">
                Copy Address
              </button>
            </>
          ) : (
            <button
              onClick={() => {
                setIsComplete(false)
                setIsScanning(false)
              }}
              className="w-full py-3 rounded-lg font-medium bg-blue-600 hover:bg-blue-500 transition-colors"
            >
              New Payment
            </button>
          )}
        </div>
      </motion.div>
    </div>
  )
}

// Payment Links Card Component
function PaymentLinksCard() {
  return (
    <div className="h-full flex flex-col items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-zinc-800/50 backdrop-blur-md rounded-xl p-6 border border-zinc-700 shadow-lg max-w-md w-full"
      >
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="bg-blue-600/20 p-2 rounded-full">
              <Globe className="h-6 w-6 text-blue-400" />
            </div>
            <div>
              <h3 className="font-bold text-lg">Payment Links</h3>
              <p className="text-sm text-gray-400">Share & receive payments</p>
            </div>
          </div>
        </div>

        <div className="space-y-4 mb-6">
          <div className="p-4 rounded-lg bg-zinc-900 border border-zinc-800">
            <div className="flex justify-between items-center mb-2">
              <span className="font-medium">Product Purchase</span>
              <span className="text-sm text-blue-400">Active</span>
            </div>
            <div className="text-sm text-gray-400 mb-3">https://recurx.io/pay/prod-12345</div>
            <div className="flex justify-between items-center text-sm">
              <span>100 USDT</span>
              <button className="text-xs bg-blue-600/20 text-blue-400 px-2 py-1 rounded">Copy Link</button>
            </div>
          </div>

          <div className="p-4 rounded-lg bg-zinc-900 border border-zinc-800">
            <div className="flex justify-between items-center mb-2">
              <span className="font-medium">Donation</span>
              <span className="text-sm text-blue-400">Active</span>
            </div>
            <div className="text-sm text-gray-400 mb-3">https://recurx.io/pay/donate-67890</div>
            <div className="flex justify-between items-center text-sm">
              <span>Any amount</span>
              <button className="text-xs bg-blue-600/20 text-blue-400 px-2 py-1 rounded">Copy Link</button>
            </div>
          </div>
        </div>

        <button className="w-full py-3 rounded-lg font-medium bg-blue-600 hover:bg-blue-500 transition-colors flex items-center justify-center gap-2">
          <Plus className="h-4 w-4" />
          <span>Create New Link</span>
        </button>
      </motion.div>
    </div>
  )
}

// Invoice Payment Card Component
function InvoicePaymentCard() {
  return (
    <div className="h-full flex flex-col items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-zinc-800/50 backdrop-blur-md rounded-xl p-6 border border-zinc-700 shadow-lg max-w-md w-full"
      >
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="bg-emerald-600/20 p-2 rounded-full">
              <CreditCard className="h-6 w-6 text-emerald-400" />
            </div>
            <div>
              <h3 className="font-bold text-lg">Invoice #INV-2025-001</h3>
              <p className="text-sm text-gray-400">Due: May 30, 2025</p>
            </div>
          </div>
          <div className="text-right">
            <p className="font-bold text-lg">$750.00</p>
            <p className="text-xs text-yellow-400">Pending</p>
          </div>
        </div>

        <div className="space-y-4 mb-6">
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-400">Client</span>
            <span>Acme Corporation</span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-400">Issue date</span>
            <span>May 15, 2025</span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-400">Payment methods</span>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-blue-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
          </div>
        </div>

        <div className="p-4 rounded-lg bg-zinc-900 border border-zinc-800 mb-6">
          <div className="flex justify-between items-center mb-1">
            <span className="font-medium">Web Development</span>
            <span>$750.00</span>
          </div>
          <div className="text-sm text-gray-400">Frontend implementation - 30 hours</div>
        </div>

        <div className="flex gap-3">
          <button className="flex-1 py-3 rounded-lg font-medium bg-transparent border border-gray-600 hover:border-gray-500 transition-colors">
            Download
          </button>
          <button className="flex-1 py-3 rounded-lg font-medium bg-blue-600 hover:bg-blue-500 transition-colors">
            Send Reminder
          </button>
        </div>
      </motion.div>
    </div>
  )
}

export default FeatureComponent
