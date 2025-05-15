"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { QrCode, Check, Copy, ArrowRight } from "lucide-react"

const QrCodePayment = () => {
  const [isScanning, setIsScanning] = useState(false)
  const [isComplete, setIsComplete] = useState(false)
  const [copied, setCopied] = useState(false)
  const [countdown, setCountdown] = useState(3)

  // Wallet address
  const walletAddress = "0x742d35Cc6634C0532925a3b844Bc454e4438f44e"

  // Handle copy to clipboard
  const handleCopy = () => {
    navigator.clipboard.writeText(walletAddress)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  // Handle scan animation
  useEffect(() => {
    if (isScanning) {
      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer)
            setIsComplete(true)
            setIsScanning(false)
            return 3
          }
          return prev - 1
        })
      }, 1000)

      return () => clearInterval(timer)
    }
  }, [isScanning])

  // Reset after completion
  const handleReset = () => {
    setIsComplete(false)
    setCountdown(3)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      className="max-w-md mx-auto bg-gray-900/70 backdrop-blur-md rounded-xl overflow-hidden shadow-xl border border-gray-800"
    >
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold">Pay with USDT</h3>
          <div className="px-2 py-1 bg-green-900/30 text-green-400 rounded text-sm font-medium">Secure</div>
        </div>

        <div className="flex justify-between items-center mb-6">
          <div>
            <p className="text-sm text-gray-400">Amount</p>
            <p className="text-2xl font-bold">100.00 USDT</p>
          </div>
          <div>
            <p className="text-sm text-gray-400">Network</p>
            <p className="text-sm font-medium">Ethereum</p>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg mb-6 relative">
          {!isComplete ? (
            <>
              <div className="flex items-center justify-center">
                <QrCode className="w-48 h-48 text-black" />
              </div>

              {isScanning && (
                <>
                  <motion.div
                    initial={{ top: 0 }}
                    animate={{ top: ["0%", "100%", "0%"] }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                    className="absolute left-0 right-0 h-1 bg-green-500 z-10"
                  />
                  <div className="absolute inset-0 bg-black/10 flex items-center justify-center">
                    <div className="bg-black/80 text-white px-4 py-2 rounded-full text-lg font-bold">
                      Scanning... {countdown}
                    </div>
                  </div>
                </>
              )}
            </>
          ) : (
            <div className="flex flex-col items-center justify-center py-8">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 10 }}
                className="w-20 h-20 rounded-full bg-green-500 flex items-center justify-center mb-4"
              >
                <Check className="h-10 w-10 text-white" />
              </motion.div>
              <h3 className="text-black text-xl font-bold mb-1">Payment Complete!</h3>
              <p className="text-gray-600 text-sm">Transaction ID: #TXN25814</p>
            </div>
          )}
        </div>

        {!isComplete ? (
          <>
            <div className="mb-6">
              <p className="text-sm text-gray-400 mb-2">Wallet Address</p>
              <div className="flex items-center">
                <div className="bg-gray-800 rounded-l-lg py-2 px-3 flex-1 overflow-hidden text-sm">
                  <p className="truncate">{walletAddress}</p>
                </div>
                <button
                  onClick={handleCopy}
                  className="bg-gray-800 hover:bg-gray-700 rounded-r-lg p-2 border-l border-gray-700"
                >
                  {copied ? <Check className="h-5 w-5 text-green-400" /> : <Copy className="h-5 w-5" />}
                </button>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setIsScanning(true)}
                disabled={isScanning}
                className={`flex-1 py-3 rounded-lg font-medium flex items-center justify-center gap-2 transition-colors ${
                  isScanning
                    ? "bg-blue-800/50 text-blue-300 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-500 text-white"
                }`}
              >
                {isScanning ? "Scanning..." : "Scan QR Code"}
              </button>
            </div>
          </>
        ) : (
          <div className="flex gap-3">
            <button
              onClick={handleReset}
              className="flex-1 py-3 rounded-lg font-medium bg-gray-800 hover:bg-gray-700 transition-colors"
            >
              New Payment
            </button>
            <button className="flex-1 py-3 rounded-lg font-medium bg-blue-600 hover:bg-blue-500 transition-colors flex items-center justify-center gap-2">
              <span>View Receipt</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>

      <div className="bg-gray-800/50 p-4 text-center">
        <p className="text-sm text-gray-400">
          Powered by <span className="text-blue-400 font-medium">RecurX</span> • Secure Blockchain Payments
        </p>
      </div>
    </motion.div>
  )
}

export default QrCodePayment
