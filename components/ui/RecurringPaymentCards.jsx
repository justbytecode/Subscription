"use client";
import { motion } from "framer-motion";
import { useState } from "react";
import { Clock, ArrowRight, BarChart3, ChevronDown, Landmark } from "lucide-react";

const RecurringPaymentCards = () => {
  const [expanded, setExpanded] = useState(true);
  
  const toggleExpand = () => setExpanded(!expanded);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.2, duration: 0.7 }}
      className="w-full max-w-5xl flex flex-col gap-6 rounded-3xl overflow-hidden bg-zinc-900 shadow-2xl p-6"
    >
      {/* Card Header */}
      <div className="flex justify-between items-center border-b border-gray-800 pb-4">
        <h3 className="text-2xl font-medium">RecurX Subscription</h3>
        <div className="px-3 py-1 bg-green-600 rounded-full text-sm font-semibold">Active</div>
      </div>
      
      {/* Subscription Info */}
      <div className="flex justify-between">
        <div>
          <p className="text-sm text-white/70">Next Payment</p>
          <p className="font-bold text-lg">{new Date(new Date().setMonth(new Date().getMonth() + 1)).toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" })}</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-white/70">Amount</p>
          <p className="font-bold text-lg">0.005 ETH</p>
          <p className="text-xs text-white/50">≈ $24.50 USD</p>
        </div>
      </div>

      {/* Transaction History Toggle */}
      <button
        onClick={toggleExpand}
        className="flex items-center justify-between w-full py-2 text-left transition-all hover:opacity-75"
      >
        <span className="font-medium flex items-center">
          <BarChart3 size={16} className="mr-2" /> Transaction History
        </span>
        <motion.div animate={{ rotate: expanded ? 180 : 0 }}>
          <ChevronDown size={16} />
        </motion.div>
      </button>
      
      {/* Transaction History */}
      {expanded && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          transition={{ duration: 0.3 }}
          className="bg-zinc-800 p-4 rounded-lg"
        >
          {[...Array(3)].map((_, i) => ({
            date: new Date(new Date().setMonth(new Date().getMonth() - i)).toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" }),
            amount: "0.005 ETH"
          })).map((transaction, index) => (
            <div key={index} className="flex justify-between text-sm py-2 border-b border-gray-700 last:border-none">
              <div className="flex items-center">
                <Clock size={14} className="mr-2 text-white/70" />
                <span>{transaction.date}</span>
              </div>
              <span className="font-semibold">{transaction.amount}</span>
            </div>
          ))}
        </motion.div>
      )}
      
      {/* Card Footer */}
      <div className="flex justify-between items-center mt-4 border-t border-gray-800 pt-4">
        <div className="flex items-center text-sm">
          <Landmark size={14} className="mr-2" /> Wallet: 0x71C...F39B
        </div>
        <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center transition-all cursor-pointer">
          Manage <ArrowRight size={16} className="ml-2" />
        </button>
      </div>
    </motion.div>
  );
};

export default RecurringPaymentCards;