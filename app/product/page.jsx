"use client"
import { useState } from 'react'
import { motion } from "framer-motion"
import { Products } from '@/components/ui/Products'

export default function CareerPage() {
  const [selectedPosition, setSelectedPosition] = useState(null)

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 text-white overflow-hidden relative font-manrope ">
      {/* Career Header */}
      <motion.div
        className="xl:py-42 md:py-20 py-10 xl:px-0 mt-10 px-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <span className="w-fit mx-auto flex items-center justify-center bg-emerald-900 rounded-full text-emerald-400 text-center text-xl font-medium leading-5 px-5 py-3 mb-5">
          Discover RecurX
        </span>
        <div className="text-white text-center font-manrope lg:text-6xl md:text-4xl text-3xl xl:text-7xl font-bold leading-tight mb-8">
          Powerful <span className='text-blue-600'>Solutions</span><br />for Modern Businesses
        </div>
        <p className="text-white text-center text-lg md:text-xl lg:text-2xl font-normal leading-7">
          Enterprise-grade technology that scales with your ambitions
        </p>
      </motion.div>

      {/* products to showcase */}
      <Products />

      {/* contact sales */}
      <div className='xl:max-w-7xl w-auto mx-auto pt-28 xl:px-0 px-10 relative mb-24'>
        <motion.div
          className="lg:mt-24 mt-10 bg-gradient-to-l from-violet-600 to-blue-600 p-8 rounded-2xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <div className="lg:flex items-center justify-between gap-6">
            <div className="lg:mb-0 mb-10">
              <h3 className="text-white font-manrope lg:text-4xl text-3xl font-semibold leading-10 mb-5">
                Ready to Transform Your Business?
              </h3>
              <p className="text-indigo-100 text-xl font-normal leading-8">
                Our experts will create a custom implementation plan designed for your specific needs and growth goals.
              </p>
            </div>
            <motion.a
              href='mailto:sales@recurx.xyz'
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