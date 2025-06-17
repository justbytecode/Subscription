import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { Motion } from 'react-motion'
import { motion, AnimatePresence } from "framer-motion"
const Background = () => {
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
    const MotionImage = motion(Image)

  return (
    <>
      <div
        className="absolute inset-0 opacity-20 z-0"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(59, 130, 246, 0.3) 0%, rgba(16, 185, 129, 0.1) 25%, transparent 50%)`,
          transition: "background 0.3s ease",
        }}
      />
      
 

      
    </>
  )
}

export default Background