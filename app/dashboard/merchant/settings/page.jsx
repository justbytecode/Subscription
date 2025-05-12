"use client";

import { useSession } from "next-auth/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import WalletConnectPopup from "@/components/WalletConnectPopup";
import { motion } from "framer-motion";
import { ThemeProvider } from "@/components/ThemeProvider";

export default function MerchantSettings() {
  const { data: session } = useSession();

  const handleWalletConnect = async (connectedAddress) => {
    if (session?.user?.id) {
      await fetch("/api/merchant/wallet", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: session.user.id, address: connectedAddress }),
      });
    }
  };

  return (
    <div className="space-y-6">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary"
      >
        Settings
      </motion.h1>
      <WalletConnectPopup onConnect={handleWalletConnect} />
      <Card>
        <CardHeader>
          <CardTitle>Profile</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <p><span className="font-medium">User ID:</span> recurx.xyz/{session?.user?.id}</p>
          <p><span className="font-medium">Email:</span> {session?.user?.email}</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Appearance</CardTitle>
        </CardHeader>
        <CardContent>
          <ThemeProvider />
        </CardContent>
      </Card>
    </div>
  );
}