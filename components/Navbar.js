"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { Menu, X } from "lucide-react"
import Image from "next/image"

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
      className={`fixed z-50 transition-all duration-300 w-full  border-none ${
        isScrolled
          ? "bg-black-500 backdrop-blur-sm shadow-sm border-none "
          : "bg-transparent"
      }`}
    >
     <div className="w-full px-4">
  <div className="flex items-center justify-between h-16 md:h-20">
    {/* Left: Logo */}
    <div >
      <Link href="/" className="flex items-center">
        <motion.span whileHover={{ scale: 1.05 }} className="text-2xl font-bold bg-clip-text text-transparent bg-white">
          <Image
            src="/logo_hor_transparent.png"
            alt="RecurX"
            width={180}
            height={70}
            priority
            className="object-contain h-12 md:h-16 w-auto lg:ml-35"
          />
        </motion.span>
      </Link>
    </div>

    {/* Center: Navigation */}
    <div className="hidden md:flex md:items-center md:space-x-6 max-lg:space-x-8  bg-[#1f1c2f] rounded-full px-6 py-2 shadow-lg">
      <nav className="hidden md:flex flex-1 justify-center items-center space-x-8">
        <NavLink href="/airdrop" className="text-white">Airdrop</NavLink>
        <NavLink href="/product" className="text-white">Product</NavLink>
        <NavLink href="/pricing" className="text-white">Pricing</NavLink>
        <NavLink href="/career" className="text-white">Career</NavLink>
        <NavLink href="/team" className="text-white">About us</NavLink>
        <NavLink href="/contact-us" className="text-white">Contact us</NavLink>
      </nav>
    </div>


    {/* Right: Waitlist Button */}
    <div className="hidden md:flex justify-end pr-30">
      <Button
        asChild
        variant="ghost"
        className="text-gray-300 hover:text-white hover:bg-blue-600 bg-blue-600 hover:scale-110"
      >
        <Link href="/wait-list">Waitlist</Link>
      </Button>
    </div>

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
          className="md:hidden border-t border-gray-800 backdrop-blur-lg max-h-screen"
        >
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-4 font-medium h-[100vh]">
              <MobileNavLink  onClick={() => setIsMobileMenuOpen(false)} href="/airdrop">Airdrop</MobileNavLink>
              <MobileNavLink  onClick={() => setIsMobileMenuOpen(false)} href="/product">Product</MobileNavLink>
              {/* <MobileNavLink  onClick={() => setIsMobileMenuOpen(false)} href="/documentation">Documentation</MobileNavLink> */}
              <MobileNavLink  onClick={() => setIsMobileMenuOpen(false)} href="/pricing">Pricing</MobileNavLink>
              <MobileNavLink  onClick={() => setIsMobileMenuOpen(false)} href="/career">Career</MobileNavLink>
              {/* <MobileNavLink  onClick={() => setIsMobileMenuOpen(false)} href="/blogs">Blogs</MobileNavLink> */}
              <MobileNavLink  onClick={() => setIsMobileMenuOpen(false)} href="/team">About us</MobileNavLink>
              <MobileNavLink  onClick={() => setIsMobileMenuOpen(false)} href="/contact-us">Contact us</MobileNavLink>

            <div className="pt-4 border-t border-gray-800 flex flex-col space-y-3">
              <Button asChild className="w-full bg-blue-600 text-gray-300 hover:bg-blue-600">
                {/* <Link href="/signin" onClick={() => setIsMobileMenuOpen(false)}>
                  Sign In
                </Link> */}
                <Link href="/wait-list" onClick={() => setIsMobileMenuOpen(false)}>
                 Waitlist
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

