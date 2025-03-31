"use client"
import { useState } from 'react'
import { motion } from "framer-motion"
import { Smile, MessageSquare, Target, Globe } from "lucide-react"

const careerPositions = [
  { title: "UX Designer", emoji: "🎨", status: "regular" },
  { title: "Motion Designer", emoji: "🎥", status: "regular" },
  { title: "iOS Developer", emoji: "📱", status: "regular" },
  { title: "Product Designer", emoji: "🛠️", status: "regular" },
  { title: "UX Researcher", emoji: "🔍", status: "regular" },
  { title: "Project Manager", emoji: "📊", status: "regular" }
];

const companyValues = [
  {
    title: "Leadership",
    description: "At RecurX, we lead with vision, innovation, and integrity—empowering individuals to drive change and shape the future of technology.",
    icon: <Globe className="w-8 h-8" />
  },
  {
    title: "Communication",
    description: "Clear, open, and effective communication fuels our success. We foster collaboration and transparency to drive impactful results.",
    icon: <MessageSquare className="w-8 h-8" />
  },
  {
    title: "Commitment",
    description: "We are relentless in our pursuit of excellence—delivering impactful solutions with integrity, accountability, and precision.",
    icon: <Target className="w-8 h-8" />
  }
];

export default function CareerPage() {
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
        <span className="w-fit mx-auto flex items-center justify-center bg-emerald-900 rounded-full text-emerald-400 text-center text-xl font-medium leading-5 px-5 py-3 mb-5">
          Join the RecurX Team
        </span>
        <div className="text-white text-center font-manrope lg:text-6xl md:text-4xl sm:text-3xl xl:text-7xl font-bold leading-tight mb-8">
          Your next big opportunity starts <br /> here at <span className='text-blue-600'>RecurX!</span> 
        </div>
        <p className="text-white text-center text-2xl font-normal leading-7">
          At RecurX, we embrace agility and innovation, allowing us to stay ahead of market trends, <br />
          adapt to customer needs, and create cutting-edge solutions.
        </p>
      </motion.div>

      {/* Position Section */}
      <motion.div
        className="lg:py-24 md:py-16 py-10 xl:px-0 px-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <h2 className="text-blue-600 text-center font-manrope lg:text-4xl text-3xl font-bold leading-10 mb-14">
          Make an Impact—Join Our Team!
        </h2>
        <div className="lg:max-w-3xl md:max-w-xl sm:max-w-md max-w-sm mx-auto border border-gray-700 rounded-2xl p-12 bg-gray-800/50">
          {careerPositions.map((position, index) => (
            <motion.div
              key={index}
              className={`flex justify-between gap-x-8  ${index !== careerPositions.length - 1 ? 'pb-6 border-b border-gray-700' : ''} ${index !== 0 ? 'pt-6' : ''}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <h3 className={`text-xl font-medium leading-8 text-white`}>
                {position.title}
              </h3>
              <motion.a
                href="mailto:career@recurx.xyz"
                className="w-20 h-9 flex items-center justify-center rounded-full bg-blue-600 hover:text-black transition-all duration-700 text-white text-xs font-semibold leading-4 cursor-pointer hover:scale-110"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Apply
              </motion.a>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Company Values Section */}
      <div className="xl:max-w-6xl w-auto mx-auto xl:py-28 md:py-16 py-10 xl:px-0 px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h3 className="text-blue-600 text-center lg:text-4xl md:text-3xl sm:text-3xl xl:text-5xl font-bold leading-10 mb-5">
            A Culture of Innovation & Excellence
          </h3>
          <p className="text-gray-300 text-center text-xl font-normal leading-7 lg:mb-14 mb-6">
            At RecurX, we’re passionate about crafting seamless experiences and building <br />
            products that truly make a difference.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-x-4 lg:gap-x-8 gap-y-4 lg:pb-24 pb-10 border-b border-gray-700 max-w-lg mx-auto md:max-w-3xl lg:max-w-full">
          {companyValues.map((value, index) => (
            <motion.div
              key={index}
              className="p-8 group hover:rounded-2xl transition-all duration-500 hover:shadow-md cursor-pointer bg-gray-800/30 hover:bg-gray-800/70"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <motion.div
                className="w-20 h-20 bg-indigo-900 rounded-xl flex items-center justify-center mb-5 max-lg:mx-auto transition-all duration-500 group-hover:bg-indigo-600"
                whileHover={{ rotate: 5 }}
              >
                <motion.div
                  className="text-indigo-300 group-hover:text-indigo-50 transition-all duration-500"
                >
                  {value.icon}
                </motion.div>
              </motion.div>
              <h4 className="text-white text-lg font-semibold leading-7 mb-3 max-lg:text-center">
                {value.title}
              </h4>
              <p className="text-gray-300 text-sm font-normal leading-5 max-lg:text-center">
                {value.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* CV Submission Section */}
        <motion.div
          className="lg:mt-24 mt-10 bg-gradient-to-l from-violet-600 to-indigo-600 p-12 rounded-2xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <div className="lg:flex items-center justify-between gap-6">
            <div className="lg:mb-0 mb-10">
              <h3 className="text-white font-manrope lg:text-4xl text-3xl font-semibold leading-10 mb-5">
                Your Dream Job Could Be Waiting!
              </h3>
              <p className="text-indigo-100 text-xl font-normal leading-8">
                Don’t see a position that matches your skills? No worries! We’re always looking for exceptional talent. 
                Share your CV with us, and we’ll reach out when an opportunity arises.
              </p>
            </div>
            <motion.a
            href='mailto:career@recurx.xyz'
              className="px-6 py-4 h-14 flex items-center justify-center text-indigo-600 text-lg font-semibold leading-7 gap-2 rounded-full bg-white whitespace-nowrap cursor-pointer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Send Your CV
            </motion.a>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
