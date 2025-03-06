"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion"
import { NavLink } from "@/components/NavLink";
import { Button } from "@/components/ui/button";
import { 
  Menu, ChevronLeft, Home, List, Code, BarChart, Wallet, Bell, 
  Settings, HelpCircle, DollarSign 
} from 'lucide-react';
import { cn } from "@/lib/utils";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Check if we're on mobile
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setIsOpen(true);
      } else {
        setIsOpen(false);
      }
    };

    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);
    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  const toggleSidebar = () => {
    if (isMobile) {
      setIsOpen(!isOpen);
    } else {
      setIsCollapsed(!isCollapsed);
    }
  };

  const menuItems = [
    { name: "Dashboard", path: "/dashboard", icon: <Home className="h-5 w-5" /> },
    { name: "Plans", path: "/dashboard/plans", icon: <List className="h-5 w-5" /> },
    { name: "Integration", path: "/dashboard/integration", icon: <Code className="h-5 w-5" /> },
    { name: "Analytics", path: "/dashboard/analytics", icon: <BarChart className="h-5 w-5" /> },
    { name: "Wallet", path: "/dashboard/wallet", icon: <Wallet className="h-5 w-5" /> },
    { name: "Notifications", path: "/dashboard/notifications", icon: <Bell className="h-5 w-5" /> },
    { name: "Transactions", path: "/dashboard/transactions", icon: <DollarSign className="h-5 w-5" /> },
    { name: "Settings", path: "/dashboard/settings", icon: <Settings className="h-5 w-5" /> },
    { name: "Support", path: "/dashboard/support", icon: <HelpCircle className="h-5 w-5" /> },
  ];

  return (
    <>
      {/* Sidebar */}
      <aside
        className={cn(
          "fixed top-0 left-0 h-full bg-gray-900 text-white transition-all duration-300 ease-in-out z-40 shadow-lg",
          isOpen ? "translate-x-0" : "-translate-x-full",
          isCollapsed && !isMobile ? "w-20" : "w-64",
          "md:translate-x-0" // Always visible on desktop
        )}
      >
        {/* Sidebar Header */}
        <div className="relative">
          <div className={cn(
            "p-6 text-2xl font-bold flex items-center gap-2 transition-all",
            isCollapsed && !isMobile ? "justify-center p-4" : ""
          )}>
            {isCollapsed && !isMobile ? (
              <span className="bg-gradient-to-r from-blue-400 to-purple-500 text-3xl">L</span>
            ) : (
              
            <motion.span
              whileHover={{ scale: 1.05 }}
              className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500"
            >
              LoopPay
            </motion.span>
        
            )}
          </div>

          {/* Sidebar Toggle Button (Aligned to the Right) */}
          <Button
            variant="outline"
            size="icon"
            className={cn(
              "absolute top-4 -right-5 z-50 bg-black border border-black shadow-md transition-all",
              "hover:bg-black",
              isCollapsed ? "right-5" : "right-[5px]"
            )}
            onClick={toggleSidebar}
          >
            {isCollapsed ? <h3 className="h-5 w-5">M</h3> : <ChevronLeft className="h-5 w-5" />}
          </Button>
        </div>

        {/* Navigation Menu */}
        <nav className="mt-4">
          <ul className="space-y-2">
            {menuItems.map((item) => (
              <li key={item.name}>
                <NavLink
                  href={item.path}
                  className={cn(
                    "flex items-center py-3 text-gray-300 hover:bg-gray-800 hover:text-white transition-colors",
                    isCollapsed && !isMobile ? "justify-center px-0" : "px-6",
                    isCollapsed && !isMobile ? "tooltip-wrapper relative group" : ""
                  )}
                  activeClassName={cn(
                    "bg-gray-800 text-white",
                    !isCollapsed || isMobile ? "border-l-4 border-blue-500" : ""
                  )}
                  onClick={() => isMobile && setIsOpen(false)}
                >
                  <div className={cn(
                    isCollapsed && !isMobile ? "flex justify-center items-center" : ""
                  )}>
                    {item.icon}
                  </div>
                  {(!isCollapsed || isMobile) && <span className="ml-3">{item.name}</span>}

                  {/* Tooltip for collapsed state */}
                  {isCollapsed && !isMobile && (
                    <div className="absolute left-full ml-2 px-2 py-1 bg-gray-800 text-white text-sm rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-opacity whitespace-nowrap">
                      {item.name}
                    </div>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
      
      {/* Overlay for Mobile View */}
      {isOpen && isMobile && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={() => setIsOpen(false)}
        />
      )}
      
      {/* Main Content Padding Adjustment */}
      <div className={cn(
        "transition-all duration-300 ease-in-out",
        isCollapsed && !isMobile ? "md:ml-20" : "md:ml-64"
      )}>
        {/* Your main content goes here */}
      </div>
    </>
  );
}
