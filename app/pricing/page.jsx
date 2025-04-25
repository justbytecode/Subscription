"use client"

import { useEffect, useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Check,
  CheckCircle2,
  X,
  Star,
  Zap,
  Shield,
  Clock,
  ArrowRight,
  Coins,
  BarChart3,
  Globe,
  Wallet,
  RefreshCw,
  DollarSign,
  Award,
  TrendingUp,
  Layers,
  AlertCircle,
  ChevronRight,
} from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import {
  Bar,
  BarChart,
  Line,
  LineChart,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
  CartesianGrid,
} from "recharts"

// Cryptocurrency currencies for RecurX and Decentralized tabs
const currencies = [
  { symbol: "BTC", name: "Bitcoin", icon: <svg viewBox="0 0 24 24" className="w-full h-full" fill="#F7931A"><path d="M23.638 14.904c-1.602 6.43-8.113 10.34-14.542 8.736C2.67 22.05-1.244 15.525.362 9.105 1.962 2.67 8.475-1.243 14.9.358c6.43 1.605 10.342 8.115 8.738 14.548v-.002zm-6.35-4.613c.24-1.59-.974-2.45-2.64-3.03l.54-2.153-1.315-.33-.525 2.107c-.345-.087-.705-.167-1.064-.25l.526-2.127-1.32-.33-.54 2.165c-.285-.067-.565-.132-.84-.2l-1.815-.45-.35 1.407s.975.225.955.236c.535.136.63.486.615.766l-1.477 5.92c-.075.166-.24.406-.614.314.015.02-.96-.24-.96-.24l-.66 1.51 1.71.426.93.242-.54 2.19 1.32.327.54-2.17c.36.1.705.19 1.05.273l-.51 2.154 1.32.33.545-2.19c2.24.427 3.93.257 4.64-1.774.57-1.637-.03-2.58-1.217-3.196.854-.193 1.5-.76 1.68-1.93h.01zm-3.01 4.22c-.404 1.64-3.157.75-4.05.53l.72-2.9c.896.23 3.757.67 3.33 2.37zm.41-4.24c-.37 1.49-2.662.735-3.405.55l.654-2.64c.744.18 3.137.52 2.75 2.084v.006z" /></svg> },
  { symbol: "ETH", name: "Ethereum", icon: <svg viewBox="0 0 24 24" className="w-full h-full"><path d="M11.944 17.97L4.58 13.62 11.943 24l7.37-10.38-7.372 4.35h.003zM12.056 0L4.69 12.223l7.365 4.354 7.365-4.35L12.056 0z" fill="#627EEA" /></svg> },
  { symbol: "USDT", name: "Tether", icon: <svg viewBox="0 0 24 24" className="w-full h-full"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0z" fill="#26A17B" /><path d="M13.871 10.644v1.702h2.588v1.13h-6.916v-1.13h2.588v-1.702H8.217V9.513h9.568v1.13h-3.914zm.32 4.848c-3.801 0-6.896-.598-6.896-1.342 0-.742 3.094-1.344 6.896-1.344 3.8 0 6.896.602 6.896 1.344 0 .744-3.096 1.342-6.896 1.342z" fill="white" /></svg> },
  { symbol: "SOL", name: "Solana", icon: <svg viewBox="0 0 24 24" className="w-full h-full"><path d="M4.815 15.126A.42.42 0 0 0 5.051 15h15.4a.42.42 0 0 1 .295.718l-3.664 3.482a.84.84 0 0 1-.59.236H.888a.42.42 0 0 1-.296-.718l4.223-3.592zM4.815 8.87A.42.42 0 0 0 5.051 8.75h15.4a.42.42 0 0 1 .295.718l-3.664 3.482a.84.84 0 0 1-.59.236H.888a.42.42 0 0 1-.296-.718L4.815 8.87zM16.492 2.615a.84.84 0 0 0-.59-.236H.888a.42.42 0 0 0-.296.718l4.223 3.592a.42.42 0 0 0 .295.123h15.4a.42.42 0 0 0 .295-.718l-3.664-3.482z" fill="#00FFA3" /></svg> },
  { symbol: "USDC", name: "USD Coin", icon: <svg viewBox="0 0 24 24" className="w-full h-full"><circle cx="12" cy="12" r="12" fill="#2775CA" /><path d="M12.113 5.95c.8 0 1.538.141 2.212.424.675.282 1.258.684 1.75 1.205.492.522.876 1.152 1.152 1.89.276.738.414 1.556.414 2.454 0 .897-.138 1.715-.414 2.453-.276.739-.66 1.368-1.152 1.89-.492.52-1.075.923-1.75 1.205-.674.283-1.412.424-2.212.424-.8 0-1.538-.141-2.212-.424a5.025 5.025 0 0 1-1.75-1.205 5.386 5.386 0 0 1-1.152-1.89c-.276-.738-.414-1.556-.414-2.454 0-.897.138-1.715.414-2.453.276-.739.66-1.368 1.152-1.89.492-.52 1.075-.923 1.75-1.205.674-.283 1.412-.424 2.212-.424zm0 1.891c-.533 0-1.025.094-1.475.282-.45.188-.837.457-1.162.807-.325.35-.578.773-.76 1.27-.183.498-.274 1.05-.274 1.659 0 .608.091 1.16.274 1.658.182.498.435.921.76 1.27.325.35.712.62 1.162.807.45.188.942.282 1.475.282.533 0 1.025-.094 1.475-.282.45-.188.837-.457 1.162-.807.325-.35.578-.773.76-1.27.183-.498.274-1.05.274-1.659 0-.608-.091-1.16-.274-1.658-.182-.498-.435-.921-.76-1.27-.325-.35-.712-.62-1.162-.807-.45-.188-.942-.282-1.475-.282zm-5.979 3.68v1.891h1.187v-1.89h-1.187zm10.77 0v1.891h1.188v-1.89h-1.187z" fill="white" /></svg> },
  { symbol: "BNB", name: "Binance Coin", icon: <svg viewBox="0 0 24 24" className="w-full h-full"><path d="M12 0L5.424 6.576l2.424 2.424L12 4.848 16.152 9 18.576 6.576 12 0zM4.848 7.152L2.424 9.576 4.848 12l2.424-2.424L4.848 7.152zm14.304 0L16.728 9.576 19.152 12l2.424-2.424-2.424-2.424zM12 14.152L7.848 10 5.424 12.424 12 19l6.576-6.576-2.424-2.424L12 14.152zM12 9.576l-2.424 2.424L12 14.424l2.424-2.424L12 9.576z" fill="#F3BA2F" /></svg> },
  { symbol: "AVAX", name: "Avalanche", icon: <svg viewBox="0 0 24 24" className="w-full h-full"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0z" fill="#E84142" /><path d="M16.95 15.344h2.513L12.6 5.28c-.45-.704-1.53-.704-1.98 0l-1.74 2.731 1.74 2.731 2.61-4.097 3.72 8.699zm-9.9 0h4.95l-2.475-3.879-2.475 3.879zm3.72-5.824L8.03 6.789 5.537 11.03h2.513l2.72-1.51z" fill="white" /></svg> },
  { symbol: "MATIC", name: "Polygon", icon: <svg viewBox="0 0 24 24" className="w-full h-full"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0z" fill="#8247E5" /><path d="M15.86 9.684v4.632L12 16.5l-3.86-2.184v-4.632L12 7.5l3.86 2.184zm-7.72 5.457l3.86 2.184 3.86-2.184v2.184L12 19.5l-3.86-2.175v-2.184zm0-8.282v2.184L12 11.227l3.86-2.184V6.6L12 4.675 8.14 6.859z" fill="white" /></svg> },
]

// Traditional fiat currencies for Traditional tab (2025 data)
const traditionalCurrencies = [
  { symbol: "USD", name: "US Dollar", icon: <svg viewBox="0 0 24 24" className="w-full h-full" fill="#2775CA"><circle cx="12" cy="12" r="12" /><path d="M13.5 7.5h-1.125V6h-1.125v1.5H10.5v1.125h.75v1.125H9V12h1.5v4.5h1.125V18h1.125v-1.5h1.125v-1.125H13.5v-1.125h1.5V12h-1.5V7.5zm-2.25 7.875V12h1.125v3.375H11.25z" fill="white" /></svg> },
  { symbol: "INR", name: "Indian Rupee", icon: <svg viewBox="0 0 24 24" className="w-full h-full" fill="#FF9933"><circle cx="12" cy="12" r="12" /><path d="M9 6h6v1.5h-3.75v1.5H15v1.5H9V9h3.75V7.5H9V6zm0 4.5h6v1.5h-3.75v3H15v1.5H9v-1.5h3.75v-3H9v-1.5z" fill="white" /></svg> },
  { symbol: "EUR", name: "Euro", icon: <svg viewBox="0 0 24 24" className="w-full h-full" fill="#003087"><circle cx="12" cy="12" r="12" /><path d="M15 9.75h-1.5V9H12v1.5H9v1.5h3v3H9v1.5h3V18h1.5v-1.5H15v-1.5h-1.5v-3H15v-1.5z" fill="white" /></svg> },
  { symbol: "GBP", name: "British Pound", icon: <svg viewBox="0 0 24 24" className="w-full h-full" fill="#CF142B"><circle cx="12" cy="12" r="12" /><path d="M9 9h4.5v1.5H12v1.5H9v1.5h3v1.5H9V18h6v-1.5H12v-1.5h3v-1.5H12V12h1.5V9H9z" fill="white" /></svg> },
  { symbol: "CHF", name: "Swiss Franc", icon: <svg viewBox="0 0 24 24" className="w-full h-full" fill="#D52B1E"><circle cx="12" cy="12" r="12" /><path d="M12 9v9m-3-4.5h6" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg> },
  { symbol: "KYD", name: "Cayman Islands Dollar", icon: <svg viewBox="0 0 24 24" className="w-full h-full" fill="#008000"><circle cx="12" cy="12" r="12" /><path d="M9 9h6v1.5h-3v3H9v1.5h3v3h1.5v-3H15V12h-3V9.75H9V9z" fill="white" /></svg> },
  { symbol: "JPY", name: "Japanese Yen", icon: <svg viewBox="0 0 24 24" className="w-full h-full" fill="#BC002D"><circle cx="12" cy="12" r="12" /><path d="M9 9h6v1.5H12v3H9v1.5h3v3h1.5v-3H15V12h-3V9.75H9V9z" fill="white" /></svg> },
]

// Updated fee data with 2025 data, enhanced RecurX features
const feeData = {
  recurx: {
    transactionFee: "0%",
    processingFee: "$0",
    minPayment: "$1",
    depositFee: "Free",
    withdrawalFee: "Free",
    settlementTime: "Instant (<10s)",
    monthlyFee: "$0",
    setupFee: "$0",
    chargebackFee: "$0",
    internationalFee: "0%",
    features: [
      "Zero transaction fees forever",
      "Instant settlements (<10 seconds)",
      "300+ cryptocurrencies supported",
      "12+ fiat currencies supported",
      "AI-driven fraud detection",
      "Biometric authentication",
      "DeFi protocol integration (Uniswap, Compound)",
      "Fiat-crypto instant conversion",
      "Recurring subscription payments",
      "Point of Sale (POS) solutions",
      "Customizable donation widgets",
      "Non-custodial wallet support",
      "Anonymous transactions (no KYC)",
      "Payment orchestration for cost efficiency",
      "Advanced analytics for performance",
      "Buy Now, Pay Later (BNPL) support",
      "Regulatory compliance automation",
      "Eco-friendly blockchain technology",
      "Smart contract automation",
      "24/7 AI-powered support with human escalation",
      "User-friendly interface for non-tech users",
      "Global payments with no restrictions",
    ],
    chartData: { fees: 0, speed: 98, security: 97, ease: 95, global: 96, support: 94 },
  },
  decentralized: {
    transactionFee: "0.4% - 2%", 
    processingFee: "$0.50 - $5",
    minPayment: "$2",
    depositFee: "$0.50 - $3",
    withdrawalFee: "$1 - $10",
    settlementTime: "1 - 30 minutes",
    monthlyFee: "$0 - $20",
    setupFee: "$0 - $50",
    chargebackFee: "N/A",
    internationalFee: "0.5% - 2%",
    features: [
      "Low transaction fees (0.4%–2%)",
      "DeFi protocol integration",
      "Stablecoin support (e.g., USDT, USDC)",
      "Fast settlement (1–30 min)",
      "Global cross-border payments",
      "Multi-currency wallet support",
      "Blockchain-based security",
      "Anonymous transactions (no KYC)",
      "Fiat-crypto conversion",
      "Recurring subscription payments",
      "Point of Sale (POS) solutions",
      "Customizable donation widgets",
      "Regulatory compliance challenges",
      "Complex integration for non-tech users",
      "Price volatility risks",
      "Basic customer support",
    ],
    chartData: { fees: 30, speed: 85, security: 90, ease: 60, global: 80, support: 55 },
  },
  traditional: {
    transactionFee: "2.9% + $0.30", 
    processingFee: "$10 - $25",
    minPayment: "$5",
    depositFee: "$3 - $15",
    withdrawalFee: "$5 - $30",
    settlementTime: "2 - 5 business days",
    monthlyFee: "$20 - $75",
    setupFee: "$50 - $200",
    chargebackFee: "$10 - $40 per case",
    internationalFee: "2% - 5%",
    features: [
      "High transaction fees (2.9% + $0.30)",
      "AI-driven fraud detection",
      "Biometric authentication support",
      "Slow settlement (2–5 days)",
      "Regional banking restrictions",
      "Robust PCI DSS compliance",
      "User-friendly APIs",
      "Payment orchestration",
      "Advanced analytics",
      "Buy Now, Pay Later (BNPL) support",
      "Business-hours support only",
      "Tiered pricing complexity",
      "Limited currency support",
      "Manual reconciliation required",
    ],
    chartData: { fees: 90, speed: 35, security: 85, ease: 65, global: 45, support: 70 },
  },
}

const benefits = [
  { icon: <Zap className="w-12 h-12 text-cyan-400" />, title: "Zero Transaction Fees", description: "Eliminate costly fees with RecurX’s 0% transaction model, saving up to 2% compared to decentralized gateways like NOWPayments." },
  { icon: <Shield className="w-12 h-12 text-purple-400" />, title: "Multi-Layered Security", description: "Combines blockchain encryption, AI fraud detection, and biometrics, surpassing BTCPay Server’s security." },
  { icon: <Clock className="w-12 h-12 text-emerald-400" />, title: "Instant Settlements", description: "Sub-second settlements (<10s), faster than CoinGate’s 1–30 minutes." },
  { icon: <Globe className="w-12 h-12 text-blue-400" />, title: "Global Reach", description: "Supports 300+ cryptos and 135+ fiat currencies, outpacing Stripe’s fiat-only model." },
  { icon: <Wallet className="w-12 h-12 text-amber-400" />, title: "Versatile Payments", description: "DeFi, BNPL, and POS solutions in one platform, unlike Coinswap’s crypto-only focus." },
  { icon: <RefreshCw className="w-12 h-12 text-rose-400" />, title: "Seamless Integration", description: "User-friendly APIs for non-tech users, solving Hodl Hodl’s integration complexity." },
]

// Updated comparison chart data
const comparisonData = [
  { name: "Transaction Fees", recurx: 0, decentralized: 30, traditional: 90 },
  { name: "Settlement Speed", recurx: 98, decentralized: 85, traditional: 35 },
  { name: "Security", recurx: 97, decentralized: 90, traditional: 85 },
  { name: "Ease of Use", recurx: 95, decentralized: 60, traditional: 65 },
  { name: "Global Coverage", recurx: 96, decentralized: 80, traditional: 45 },
  { name: "Customer Support", recurx: 94, decentralized: 55, traditional: 70 },
]

// Updated comparison table data
const comparisonTableData = [
  { feature: "Transaction Fee", recurx: "0%", decentralized: "0.4% - 2%", traditional: "2.9% + $0.30" },
  { feature: "Processing Fee", recurx: "$0", decentralized: "$0.50 - $5", traditional: "$10 - $25" },
  { feature: "Settlement Time", recurx: "Instant (<10s)", decentralized: "1 - 30 min", traditional: "2 - 5 days" },
  { feature: "Monthly Fee", recurx: "$0", decentralized: "$0 - $20", traditional: "$20 - $75" },
  { feature: "Setup Fee", recurx: "$0", decentralized: "$0 - $50", traditional: "$50 - $200" },
  { feature: "International Fee", recurx: "0%", decentralized: "0.5% - 2%", traditional: "2% - 5%" },
  { feature: "Chargeback Fee", recurx: "$0", decentralized: "N/A", traditional: "$10 - $40" },
  { feature: "Currency Support", recurx: "300+ crypto, 12+ fiat", decentralized: "300+ crypto", traditional: "Major fiat only" },
]

// Updated performance metrics for radar chart
const performanceMetrics = [
  { category: "Cost Efficiency", recurx: 98, decentralized: 70, traditional: 20 },
  { category: "Transaction Speed", recurx: 95, decentralized: 85, traditional: 35 },
  { category: "Security", recurx: 97, decentralized: 90, traditional: 85 },
  { category: "Ease of Use", recurx: 95, decentralized: 60, traditional: 65 },
  { category: "Global Reach", recurx: 96, decentralized: 80, traditional: 45 },
  { category: "Reliability", recurx: 98, decentralized: 80, traditional: 85 },
]

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-gray-800 p-3 rounded-lg border border-gray-700 shadow-lg">
        <p className="text-gray-300 mb-1">{label}</p>
        {payload.map((entry, index) => (
          <div key={index} className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: entry.color }}></div>
            <p className="text-white font-medium">{entry.name}: {entry.value}</p>
          </div>
        ))}
      </div>
    )
  }
  return null
}

const ComparisonChart = () => {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}>
      <Card className="bg-gradient-to-br from-gray-900 to-gray-800 border-gray-700 backdrop-blur-md p-4 md:p-6 overflow-hidden relative">
        <div className="absolute inset-0 bg-grid-black/[0.02] -z-10" />
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-purple-500/10 to-blue-500/10 -z-10" />
        <CardContent className="p-0">
          <h3 className="text-xl font-bold text-white mb-6 flex items-center">
            <BarChart3 className="w-5 h-5 mr-2 text-cyan-400" />
            Payment Solutions Comparison
          </h3>
          <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={comparisonData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="name" tick={{ fill: "#9CA3AF" }} />
                <YAxis tick={{ fill: "#9CA3AF" }} />
                <Tooltip content={<CustomTooltip />} />
                <Legend wrapperStyle={{ paddingTop: "10px" }} formatter={(value) => <span className="text-gray-300">{value}</span>} />
                <Bar dataKey="recurx" name="RecurX" fill="#22D3EE" radius={[4, 4, 0, 0]} animationDuration={1500} animationEasing="ease-out" />
                <Bar dataKey="decentralized" name="Decentralized Competitors" fill="#A78BFA" radius={[4, 4, 0, 0]} animationDuration={1500} animationEasing="ease-out" />
                <Bar dataKey="traditional" name="Traditional Payments" fill="#FB7185" radius={[4, 4, 0, 0]} animationDuration={1500} animationEasing="ease-out" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-6 text-sm text-gray-400">
            <p className="mb-2">* Lower transaction fees score is better (0% = best score)</p>
            <p>* Higher scores in other categories indicate better performance</p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

const ComparisonTable = () => {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }} className="mt-8">
      <Card className="bg-gradient-to-br from-gray-900 to-gray-800 border-gray-700 backdrop-blur-md p-4 md:p-6 overflow-hidden relative">
        <div className="absolute inset-0 bg-grid-white/[0.02] -z-10" />
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-blue-500/10 to-cyan-500/10 -z-10" />
        <CardContent className="p-0">
          <h3 className="text-xl font-bold text-white mb-6 flex items-center">
            <Layers className="w-5 h-5 mr-2 text-purple-400" />
            Detailed Fee Comparison
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="py-3 px-4 text-left text-gray-300 font-medium">Feature</th>
                  <th className="py-3 px-4 text-left text-cyan-400 font-medium">RecurX</th>
                  <th className="py-3 px-4 text-left text-purple-400 font-medium">Decentralized</th>
                  <th className="py-3 px-4 text-left text-rose-400 font-medium">Traditional</th>
                </tr>
              </thead>
              <tbody>
                {comparisonTableData.map((row, index) => (
                  <motion.tr key={index} className="border-b border-gray-800 hover:bg-gray-800/50 transition-colors" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 0.05 * index }}>
                    <td className="py-3 px-4 text-white font-medium">{row.feature}</td>
                    <td className="py-3 px-4 text-cyan-300">{row.recurx}</td>
                    <td className="py-3 px-4 text-gray-300">{row.decentralized}</td>
                    <td className="py-3 px-4 text-gray-300">{row.traditional}</td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

const PerformanceRadarChart = () => {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.4 }} className="mt-8">
      <Card className="bg-gradient-to-br from-gray-900 to-gray-800 border-gray-700 backdrop-blur-md p-4 md:p-6 overflow-hidden relative">
        <div className="absolute inset-0 bg-grid-white/[0.02] -z-10" />
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-cyan-500/10 to-emerald-500/10 -z-10" />
        <CardContent className="p-0">
          <h3 className="text-xl font-bold text-white mb-6 flex items-center">
            <TrendingUp className="w-5 h-5 mr-2 text-emerald-400" />
            Performance Metrics
          </h3>
          <div className="h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={performanceMetrics} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="category" tick={{ fill: "#9CA3AF" }} />
                <YAxis tick={{ fill: "#9CA3AF" }} />
                <Tooltip content={<CustomTooltip />} />
                <Legend wrapperStyle={{ paddingTop: "10px" }} formatter={(value) => <span className="text-gray-300">{value}</span>} />
                <Line type="monotone" dataKey="recurx" name="RecurX" stroke="#22D3EE" strokeWidth={3} dot={{ r: 4, fill: "#22D3EE" }} activeDot={{ r: 6 }} animationDuration={1500} animationEasing="ease-out" />
                <Line type="monotone" dataKey="decentralized" name="Decentralized Competitors" stroke="#A78BFA" strokeWidth={3} dot={{ r: 4, fill: "#A78BFA" }} activeDot={{ r: 6 }} animationDuration={1500} animationEasing="ease-out" />
                <Line type="monotone" dataKey="traditional" name="Traditional Payments" stroke="#FB7185" strokeWidth={3} dot={{ r: 4, fill: "#FB7185" }} activeDot={{ r: 6 }} animationDuration={1500} animationEasing="ease-out" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

const PricingTable = ({ type }) => {
  const data = feeData[type]
  const isRecurx = type === "recurx"
  const displayCurrencies = type === "traditional" ? traditionalCurrencies : currencies

  return (
    <motion.div className="w-full h-full flex flex-col gap-6" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-full">
        <motion.div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-6 shadow-xl border border-gray-700 backdrop-blur-md relative overflow-hidden" whileHover={{ scale: 1.01 }} transition={{ duration: 0.2 }}>
          <div className="absolute inset-0 bg-grid-white/[0.02] -z-10" />
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 -z-10" />
          <h3 className="text-xl font-bold text-white mb-4 flex items-center">
            <Coins className="w-5 h-5 mr-2 text-cyan-400" />
            Supported Currencies
          </h3>
          <div className="grid grid-cols-3 gap-3">
            {displayCurrencies.map((currency) => (
              <motion.div key={currency.symbol} className="bg-gray-800/70 p-3 rounded-lg flex flex-col items-center justify-center transition-all hover:bg-cyan-600/20 hover:border-cyan-500/50 border border-transparent" whileHover={{ scale: 1.05, y: -2 }} transition={{ duration: 0.2 }}>
                <div className="w-10 h-10 mb-2">{currency.icon}</div>
                <span className="text-white font-medium">{currency.symbol}</span>
                <span className="text-gray-400 text-xs">{currency.name}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
        <motion.div className={`${isRecurx ? "bg-gradient-to-br from-cyan-600/90 to-blue-700/90" : "bg-gradient-to-br from-gray-900 to-gray-800"} rounded-2xl p-6 shadow-xl border ${isRecurx ? "border-cyan-500" : "border-gray-700"} backdrop-blur-md md:col-span-2 relative overflow-hidden`} whileHover={{ scale: 1.01 }} transition={{ duration: 0.2 }}>
          {isRecurx && (
            <motion.div className="absolute top-3 right-3 bg-white text-cyan-600 px-3 py-1 rounded-full text-sm font-bold flex items-center" initial={{ scale: 0.9 }} animate={{ scale: [0.9, 1.1, 1] }} transition={{ duration: 0.5, times: [0, 0.5, 1] }}>
              <Star className="w-4 h-4 mr-1 fill-amber-400 stroke-amber-400" />
              Best Value
            </motion.div>
          )}
          <div className="absolute inset-0 bg-grid-white/[0.03] -z-10" />
          {isRecurx && <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-cyan-400/20 rounded-full blur-3xl -z-10" />}
          <h3 className="text-2xl font-bold text-white mb-6">Fee Structure</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <motion.div className="space-y-1" initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3, delay: 0.1 }}>
                <div className="text-gray-300 text-sm">Transaction Fee</div>
                <div className={`text-2xl font-bold ${isRecurx ? "text-white" : "text-gray-200"}`}>{data.transactionFee}</div>
              </motion.div>
              <motion.div className="space-y-1" initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3, delay: 0.2 }}>
                <div className="text-gray-300 text-sm">Processing Fee</div>
                <div className={`text-2xl font-bold ${isRecurx ? "text-white" : "text-gray-200"}`}>{data.processingFee}</div>
              </motion.div>
              <motion.div className="space-y-1" initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3, delay: 0.3 }}>
                <div className="text-gray-300 text-sm">Settlement Time</div>
                <div className={`text-2xl font-bold ${isRecurx ? "text-white" : "text-gray-200"}`}>{data.settlementTime}</div>
              </motion.div>
              <motion.div className="space-y-1" initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3, delay: 0.4 }}>
                <div className="text-gray-300 text-sm">Monthly Fee</div>
                <div className={`text-2xl font-bold ${isRecurx ? "text-white" : "text-gray-200"}`}>{data.monthlyFee}</div>
              </motion.div>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-white mb-3">Features</h4>
              <ul className="space-y-2">
                {data.features.slice(0, 8).map((feature, index) => (
                  <motion.li key={index} className="flex items-start" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3, delay: 0.1 * index }}>
                    {isRecurx ? (
                      <CheckCircle2 className="w-5 h-5 text-cyan-300 mr-2 flex-shrink-0" />
                    ) : feature.includes("High") || feature.includes("Limited") || feature.includes("Slow") || feature.includes("Complex") || feature.includes("Additional") || feature.includes("challenges") ? (
                      <X className="w-5 h-5 text-rose-400 mr-2 flex-shrink-0" />
                    ) : (
                      <Check className="w-5 h-5 text-gray-400 mr-2 flex-shrink-0" />
                    )}
                    <span className={`text-sm ${isRecurx ? "text-white" : "text-gray-300"}`}>{feature}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
      {type === "recurx" ? (
        <>
          <ComparisonChart />
          <ComparisonTable />
          <PerformanceRadarChart />
        </>
      ) : (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="mt-4">
          <Card className="bg-gradient-to-br from-gray-900 to-gray-800 border-gray-700 backdrop-blur-md p-6 overflow-hidden relative">
            <div className="absolute inset-0 bg-grid-white/[0.02] -z-10" />
            <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 via-rose-500/10 to-purple-500/10 -z-10" />
            <CardContent className="p-0">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-white flex items-center">
                  <AlertCircle className="w-5 h-5 mr-2 text-amber-400" />
                  Why Consider RecurX Instead?
                </h3>
                <motion.button className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-4 py-2 rounded-lg font-medium flex items-center" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  Switch to RecurX
                  <ChevronRight className="ml-1 w-4 h-4" />
                </motion.button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700">
                  <h4 className="text-cyan-400 font-semibold mb-2 flex items-center">
                    <DollarSign className="w-4 h-4 mr-1" />
                    Zero Fees
                  </h4>
                  <p className="text-gray-300 text-sm">Save up to {type === "traditional" ? "2.9% + $0.30" : "2%"} per transaction with RecurX’s zero-fee model, compared to {type} gateways.</p>
                </div>
                <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700">
                  <h4 className="text-cyan-400 font-semibold mb-2 flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    Instant Settlement
                  </h4>
                  <p className="text-gray-300 text-sm">Get funds in &lt;10 seconds, unlike {type === "traditional" ? "2–5 days" : "1–30 minutes"} with {type} gateways.</p>
                </div>
                <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700">
                  <h4 className="text-cyan-400 font-semibold mb-2 flex items-center">
                    <Award className="w-4 h-4 mr-1" />
                    Superior Features
                  </h4>
                  <p className="text-gray-300 text-sm">Combines DeFi, BNPL, and AI analytics, surpassing {type === "traditional" ? "fiat-only" : "crypto-only"} limitations.</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </motion.div>
  )
}

export default function Fees() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [activeTab, setActiveTab] = useState("recurx")
  const tabsRef = useRef(null)

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener("mousemove", handleMouseMove)
    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  const handleTabChange = (value) => {
    console.log("Switching to tab:", value); // Debug log to confirm tab switch
    setActiveTab(value);
  };

  return (
    <div className="bg-gradient-to-b from-black to-gray-900 text-white min-h-screen overflow-hidden relative pb-20 z-50">
      <div className="absolute inset-0 opacity-20" style={{ background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(34, 211, 238, 0.3) 0%, rgba(124, 58, 237, 0.1) 25%, transparent 50%)`, transition: "background 0.3s ease" }} />
      <div className="absolute inset-0 opacity-5">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="80" height="80" patternUnits="userSpaceOnUse">
              <path d="M 80 0 L 0 0 0 80" fill="none" stroke="white" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>
      <motion.div className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <motion.h1 className="text-center text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }}>
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-600">Transparent</span> Pricing Structure
        </motion.h1>
        <motion.p className="text-center text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.7, delay: 0.4 }}>
          Experience fair, clear, and predictable fees with RecurX's revolutionary payment solution
        </motion.p>
      </motion.div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
          <div className="relative">
            <motion.div className="absolute inset-0 -z-10 bg-gradient-to-r from-cyan-500/20 via-blue-500/20 to-purple-500/20 blur-xl rounded-full" animate={{ opacity: [0.5, 0.8, 0.5], scale: [0.95, 1.05, 0.95] }} transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }} />
            <TabsList className="w-full max-w-2xl mx-auto grid grid-cols-3 mb-12 bg-gray-800/50 p-1 backdrop-blur-md">
              <TabsTrigger value="recurx" className={cn("data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-500 data-[state=active]:to-blue-600", "data-[state=active]:text-white text-base py-3 px-4 rounded-md transition-all duration-300", "data-[state=active]:shadow-lg relative overflow-hidden")}>
                {activeTab === "recurx" && <motion.div className="absolute inset-0 -z-10 bg-gradient-to-r from-cyan-500 to-blue-600" layoutId="activeTabBackground" transition={{ type: "spring", duration: 0.5 }}  onClick={() => setActiveTab("recurx")}/>}
                <span className="relative z-10">RecurX</span>
              </TabsTrigger>
              <TabsTrigger value="decentralized" className={cn("data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-violet-600", "data-[state=active]:text-white text-base py-3 px-4 rounded-md transition-all duration-300", "data-[state=active]:shadow-lg relative overflow-hidden")}>
                {activeTab === "decentralized" && <motion.div className="absolute inset-0 -z-10 bg-gradient-to-r from-purple-500 to-violet-600" layoutId="activeTabBackground" transition={{ type: "spring", duration: 0.5 }} onClick={() => setActiveTab("decentralized")} />}
                <span className="relative z-10">Decentralized</span>
              </TabsTrigger>
              <TabsTrigger value="traditional" className={cn("data-[state=active]:bg-gradient-to-r data-[state=active]:from-rose-500 data-[state=active]:to-red-600", "data-[state=active]:text-white text-base py-3 px-4 rounded-md transition-all duration-300", "data-[state=active]:shadow-lg relative overflow-hidden") }>
                {activeTab === "traditional" && <motion.div className="absolute inset-0 -z-10 bg-gradient-to-r from-rose-500 to-red-600" layoutId="activeTabBackground" transition={{ type: "spring", duration: 0.5 }}  onClick={() => setActiveTab("traditional")} />}
                <span className="relative z-10">Traditional</span>
              </TabsTrigger>
            </TabsList>
          </div>
          <AnimatePresence mode="wait">
            {activeTab === "recurx" && (
              <TabsContent key="recurx" value="recurx" className="mt-2">
                <PricingTable type="recurx" />
              </TabsContent>
            )}
            {activeTab === "decentralized" && (
              <TabsContent key="decentralized" value="decentralized" className="mt-2">
                <PricingTable type="decentralized" />
              </TabsContent>
            )}
            {activeTab === "traditional" && (
              <TabsContent key="traditional" value="traditional" className="mt-2">
                <PricingTable type="traditional" />
              </TabsContent>
            )}
          </AnimatePresence>
        </Tabs>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }} className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Why Choose <span className="text-cyan-400">RecurX</span> for Payments?
          </h2>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">RecurX combines the best of decentralized and traditional gateways, delivering unmatched value and performance.</p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((benefit, index) => (
            <motion.div key={index} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 * (index + 1) }} className="bg-gradient-to-br from-gray-900 to-gray-800 backdrop-blur-sm border border-gray-700 rounded-xl p-6 hover:border-cyan-500/50 hover:bg-cyan-900/10 transition-all relative overflow-hidden group" whileHover={{ y: -5 }}>
              <div className="absolute inset-0 bg-grid-white/[0.02] -z-10" />
              <div className="absolute -bottom-32 -right-32 w-64 h-64 bg-cyan-400/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 -z-10" />
              <motion.div className="mb-4 bg-gradient-to-br from-gray-800 to-gray-900 p-3 rounded-lg inline-block" whileHover={{ rotate: [0, -5, 5, -5, 0] }} transition={{ duration: 0.5 }}>
                {benefit.icon}
              </motion.div>
              <h3 className="text-xl font-bold mb-2 text-white">{benefit.title}</h3>
              <p className="text-gray-300">{benefit.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
      <motion.div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.5 }}>
      </motion.div>
    </div>
  )
}