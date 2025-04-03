"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { Menu, X } from "lucide-react"

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed z-50 transition-all duration-300 w-full px-4 border-none ${
        isScrolled
          ? "bg-black-500 backdrop-blur-sm shadow-sm border-none "
          : "bg-transparent"
      }`}
      
    >
      <div className="w-full">
        <div className="flex justify-between items-center h-16 md:h-20">
          <Link href="/" className="flex items-center px-4">
            <motion.span
              whileHover={{ scale: 1.05 }}
              className="text-2xl font-bold bg-clip-text text-transparent bg-white"
            >
              RecurX
            </motion.span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <div className="flex-1"></div>
            <div className="flex items-center space-x-8">
              <NavLink href="/product">Product</NavLink>
              <NavLink href="/documentation">Documentation</NavLink>
              <NavLink href="/pricing">Pricing</NavLink>
              <NavLink href="/career">Career</NavLink>
              <NavLink href="/blogs">Blogs</NavLink>
              <NavLink href="/team">About us</NavLink>
              <NavLink href="/contact-us">Contact us</NavLink>
            </div>
            <div className="flex-1 flex justify-end">
              <Button asChild variant="ghost" className="text-gray-300 hover:text-white hover:bg-blue-600 bg-blue-600 hover:scale-110">
                <Link href="/signin">Sign In</Link>
              </Button>
            </div>
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-300"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden bg-gray-900 border-t border-gray-800"
        >
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            <MobileNavLink href="/team" onClick={() => setIsMobileMenuOpen(false)}>
              Team
            </MobileNavLink>
            <MobileNavLink href="/documentation" onClick={() => setIsMobileMenuOpen(false)}>
              Documentation
            </MobileNavLink>

            <MobileNavLink href="mailto:career@recurx.com" onClick={() => setIsMobileMenuOpen(false)}>
              career
            </MobileNavLink>

            <div className="pt-4 border-t border-gray-800 flex flex-col space-y-3">
              <Button asChild className="w-full border-gray-700 text-gray-300 hover:bg-gray-800">
                <Link href="/signin" onClick={() => setIsMobileMenuOpen(false)}>
                  Sign In
                </Link>
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </motion.header>
  )
}

function NavLink({ href, children }) {
  return (
    <Link href={href} className="text-gray-300 hover:text-white transition-colors duration-200">
      {children}
    </Link>
  )
}

function MobileNavLink({ href, onClick, children }) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="block py-2 text-gray-300 hover:text-white transition-colors duration-200"
    >
      {children}
    </Link>
  )
}

