"use client"
import { useState } from 'react'
import { motion } from "framer-motion"
import { Smile, MessageSquare, Target, Globe, Home, Terminal, PanelTop, Github, X } from "lucide-react"
import ContactUs from '@/components/ui/contactUs'
import SMBtnContactUs from '@/components/ui/SMBtnContactUs'

export default function ContactPage() {
  const [selectedPosition, setSelectedPosition] = useState(null)

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 text-white overflow-hidden relative font-manrope">
      {/* Career Header */}
      <motion.div
        className="xl:py-42 md:py-20 py-10 xl:px-0 px-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-white text-center font-manrope lg:text-6xl md:text-4xl sm:text-3xl xl:text-7xl font-bold leading-tight mb-8">
        Connect with <span className='text-blue-600'>RecurX!</span>  <br/>Your Crypto Payment Partner
        </div>
        <p className="text-white text-center text-2xl  font-normal leading-7">
        Seamless transactions, secure payments. 
        Get in touch with us for support, partnerships,<br/> or inquiries about our crypto payment gateway. 
        </p>
      </motion.div>

      {/* COntact us section */}
      <ContactUs/>

      {/* Floating Social Media */}
      <SMBtnContactUs />

    </div>
  )
}
