"use client"
import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion';
import { Tabs } from '@/components/Tab';
import Image from 'next/image';

const currencies = [
  {
    symbol: 'BTC',
    img: <Image src="./supportedCoins/bitcoin.svg" alt="Bitcoin" className="w-8 h-8 rounded-full" width={100} height={100} />,
    details: {
      transactionFees: '0.5%',
      processingFee: '$5',
      minPayment: '$10',
    }
  },
  {
    symbol: 'ETH',
    img: <img src="./supportedCoins/bitcoin.svg" alt="Ethereum" className="w-8 h-8 rounded-full" width={100} height={100} />,
    details: {
      transactionFees: '0.3%',
      processingFee: '$3',
      minPayment: '$5',
    }
  },
  {
    symbol: 'USDT',
    img: <img src="./supportedCoins/bitcoin.svg" alt="Tether" className="w-8 h-8 rounded-full" width={100} height={100} />,
    details: {
      transactionFees: '0.1%',
      processingFee: '$1',
      minPayment: '$2',
    }
  },
  {
    symbol: 'BTC',
    img: <img src="./supportedCoins/bitcoin.svg" alt="Bitcoin" className="w-8 h-8 rounded-full" width={100} height={100} />,
    details: {
      transactionFees: '0.5%',
      processingFee: '$5',
      minPayment: '$10',
    }
  },
  {
    symbol: 'ETH',
    img: <img src="./supportedCoins/bitcoin.svg" alt="Ethereum" className="w-8 h-8 rounded-full" width={100} height={100} />,
    details: {
      transactionFees: '0.3%',
      processingFee: '$3',
      minPayment: '$5',
    }
  },
  {
    symbol: 'USDT',
    img: <img src="./supportedCoins/bitcoin.svg" alt="Tether" className="w-8 h-8 rounded-full" width={100} height={100} />,
    details: {
      transactionFees: '0.1%',
      processingFee: '$1',
      minPayment: '$2',
    }
  }
];

const DummyContent = () => {
  return (
    <motion.div className="flex flex-col md:flex-row w-full  pr-0 bg-gray-900 text-white rounded-lg">
      {/* Sidebar */}
      <motion.div className="w-full md:w-1/5 bg-gray-800 p-4 rounded-lg mb-4 md:mb-0 md:mr-4">
        <div className="p-4 border-b border-blue-600 text-blue-600 m-auto text-xl" >
          RecurX Supports
        </div>
        <div className="mt-4 space-y-4 grid grid-cols-3 md:grid-cols-1 gap-2 md:gap-4">
          {currencies.map((currency,index) => (
            <div
            key={index}
              className="p-2 bg-blue-600 rounded-md text-center"
            >
              {currency.symbol}
            </div>
          ))}
        </div>
      </motion.div>

      {/* Table Section */}
      <motion.div className="w-full md:flex-1 overflow-x-auto">
        <motion.div className="overflow-x-auto">
          <table className="w-full border-collapse border-gray-700 mt-7">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="p-3 text-xs md:text-base">Symbol</th>
                <th className="p-3 bg-gray-800 text-xs md:text-base">Transaction</th>
                <th className="p-3 bg-gray-800 text-xs md:text-base">Processing Fee</th>
                <th className="p-3 bg-gray-800 text-xs md:text-base">Min Payment</th>
                <th className="p-3 bg-gray-800 text-xs md:text-base">Deposit</th>
              </tr>
            </thead>
            <tbody>
              {currencies.map((currency, index) => (
                <tr 
                  key={index} 
                  className="hover:bg-blue-900/20 transition-colors duration-200 ease-in-out cursor-pointer"
                >
                  <td className="px-4 py-5 flex items-center space-x-2 border-r border-gray-700 last:border-b-0 justify-center">
                    {currency.img}
                    <span className="text-xs md:text-base">{currency.symbol}</span>
                  </td>
                  <td className="p-3 text-xs md:text-base border-b border-gray-700">{currency.details.transactionFees}</td>
                  <td className="p-3 text-xs md:text-base border-b border-gray-700">{currency.details.processingFee}</td>
                  <td className="p-3 text-xs md:text-base border-b border-gray-700">{currency.details.minPayment}</td>
                  <td className="p-3 text-xs md:text-base border-b border-gray-700">{currency.details.minPayment}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

const ComponentWrapper = () => {
  return (
    <div className="w-full overflow-hidden relative h-full bg-gray-900/50 backdrop-blur-lg p-2 md:p-8 rounded-xl border border-gray-800 transition-all duration-300 flex flex-col items-center text-center min-w-[300px]">
      <DummyContent />
    </div>
  )
}

const tabs = [
  {
    title: "RecurX",
    value: "recurX",
    content: <ComponentWrapper />,
  },
  {
    title: "Competitors",
    value: "competitors",
    content: <ComponentWrapper />,
  },
  {
    title: "Conventional Payments",
    value: "Conventional Payments",
    content: <ComponentWrapper />,
  }
];


const Fees = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

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
    <div className="bg-gradient-to-b from-black to-gray-900 text-white overflow-hidden relative pb-10">
      <div
        className="absolute inset-0 opacity-20"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(59, 130, 246, 0.3) 0%, rgba(16, 185, 129, 0.1) 25%, transparent 50%)`,
          transition: "background 0.3s ease",
        }}
      />

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

      {/* Header Section */}

<motion.div
        className="xl:py-42 md:py-20 py-10 xl:px-0 px-10 mt-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-white text-center font-manrope text-3xl lg:text-6xl md:text-4xl  xl:text-7xl font-bold leading-tight mb-8 text-center">
        Transparent Pricing Structure<br/> at  <span className='text-blue-600'>RecurX!</span>        </div>
        <p className="text-white text-center text-lg md:text-xl lg:text-2xl font-normal leading-7">
        Fair, Clear, and Predictable Fees <br/> Unlocking Value with RecurX’s Transparent Pricing!
        </p>
      </motion.div>

      <div className='flex flex-col gap-10'>


      {/* Tabs Section for Price Comparison*/}
      <div className="h-[20rem] md:h-[40rem] [perspective:1000px] flex flex-col max-w-7xl w-full m-auto  items-start justify-start px-4 h-full ">
        <Tabs tabs={tabs} />
      </div>

<motion.div className='xl:max-w-7xl w-auto mx-auto pt-28 xl:px-0 px-10 relative'>


      <motion.div
          className=" bg-gradient-to-l from-violet-600 to-indigo-600 p-8 rounded-2xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          >
          <div className="lg:flex items-center justify-between gap-6">
            <div className="lg:mb-0 mb-10">
              <h3 className="text-white font-manrope lg:text-4xl text-3xl font-semibold leading-10 mb-5">
              Let's Talk – Get the Best Pricing for Your Needs!
              </h3>
              <p className="text-indigo-100 text-xl font-normal leading-8">
              Connect with our sales team to explore tailored pricing solutions that fit your business.
              </p>
            </div>
            <motion.a
            href='mailto:sales@recurx.xyz'
            className="px-6 py-4 h-14 flex items-center justify-center text-indigo-600 text-lg font-semibold leading-7 gap-2 rounded-full bg-white whitespace-nowrap cursor-pointer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            >
              Contact Sales
            </motion.a>
          </div>
        </motion.div>

      
              </motion.div>
              </div>
    </div>
  )
}

export default Fees