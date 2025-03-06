"use client";

import { signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function DashboardNavbar({ session }) {
  return (
    <header className="bg-white shadow-sm p-4 flex justify-between items-center">
      <h1 className="text-xl font-semibold text-center text-gray-800">LoopPay Dashboard</h1>
      <div className="flex items-center gap-4">
        <span className="text-gray-700">{session.user?.name}</span>
        <Avatar>
          <AvatarImage src={session.user?.image || ""} alt="Profile" />
          <AvatarFallback>{session.user?.name?.[0]}</AvatarFallback>
        </Avatar>
        <Button variant="outline" onClick={() => signOut({ callbackUrl: "/" })}>
          <LogOut className="h-4 w-4 mr-2" /> Logout
        </Button>
      </div>
    </header>
  );
}