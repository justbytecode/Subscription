import React, { useEffect, useState } from 'react'

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
  return (
    <>
      <div
        className="absolute inset-0 opacity-20 z-0"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(59, 130, 246, 0.3) 0%, rgba(16, 185, 129, 0.1) 25%, transparent 50%)`,
          transition: "background 0.3s ease",
        }}
      />

      {/* Simplified grid pattern overlay */}
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
    </>
  )
}

export default Background