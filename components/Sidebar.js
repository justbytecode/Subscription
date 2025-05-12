"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import {
  LayoutDashboard,
  Send,
  Wallet,
  BarChart2,
  Key,
  Settings,
  FileText,
  Menu,
  X,
} from "lucide-react";
import { motion } from "framer-motion";
import { signOut } from "next-auth/react";

export default function Sidebar() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);

  if (!session?.user?.role) return null;

  const isMerchant = session.user.role === "MERCHANT";
  const basePath = `/dashboard/${isMerchant ? "merchant" : "user"}`;

  const navItems = isMerchant
    ? [
        { name: "Dashboard", path: basePath, icon: LayoutDashboard },
        { name: "Send", path: `${basePath}/send`, icon: Send },
        { name: "Analytics", path: `${basePath}/analytics`, icon: BarChart2 },
        { name: "Plans", path: `${basePath}/plans`, icon: FileText },
        { name: "Wallet", path: `${basePath}/wallet`, icon: Wallet },
        { name: "API", path: `${basePath}/api`, icon: Key },
        { name: "Transactions", path: `${basePath}/transactions`, icon: FileText },
        { name: "Settings", path: `${basePath}/settings`, icon: Settings },
      ]
    : [
        { name: "Dashboard", path: basePath, icon: LayoutDashboard },
        { name: "Send", path: `${basePath}/send`, icon: Send },
        { name: "Subscriptions", path: `${basePath}/subscriptions`, icon: FileText },
        { name: "Wallet", path: `${basePath}/wallet`, icon: Wallet },
        { name: "Transactions", path: `${basePath}/transactions`, icon: FileText },
      ];

  return (
    <>
      <button
        className=" fixed top-4 left-4 z-20 p-2 bg-black text-white rounded-md"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>
      <motion.div
        initial={{ x: -300 }}
        animate={{ x: isOpen ? 0 : -300 }}
        transition={{ duration: 0.3 }}
        className={`w-64 bg-card shadow-lg p-4 fixed top-0 left-0 h-screen z-10 lg:static lg:translate-x-0 lg:flex lg:flex-col ${
          isOpen ? "block" : "hidden lg:flex"
        }`}
      >
        <div className="flex items-center gap-2 mb-8 pt-4 lg:pt-0">
          <div className="bg-primary/20 p-2 rounded-full">
            <LayoutDashboard className="h-6 w-6 text-primary" />
          </div>
          <h2 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
            RecurX
          </h2>
        </div>
        <nav className="flex-1 space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.path}
              className={`flex items-center gap-2 p-2 rounded-lg transition-colors ${
                pathname === item.path
                  ? "bg-primary/10 text-primary font-medium"
                  : "text-foreground/80 hover:bg-primary/5 hover:text-primary"
              }`}
              onClick={() => setIsOpen(false)}
            >
              <item.icon className="h-5 w-5" />
              {item.name}
            </Link>
          ))}
        </nav>
      </motion.div>
    </>
  );
}