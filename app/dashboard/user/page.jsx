"use client";

import { useEffect, useState } from "react";
import { useAccount, useBalance } from "wagmi";
import { useSession } from "next-auth/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { formatUnits } from "ethers";
import { motion } from "framer-motion";

export default function UserDashboard() {
  const { data: session } = useSession();
  const { address, isConnected, isDisconnected } = useAccount();
  const { data: balance } = useBalance({ address });
  const [showWalletPopup, setShowWalletPopup] = useState(false);

  useEffect(() => {
    // Show popup if wallet is not connected or has been disconnected
    if (!isConnected || isDisconnected) {
      setShowWalletPopup(true);
    } else {
      setShowWalletPopup(false);
    }
  }, [isConnected, isDisconnected]);

  const handleWalletConnect = async (connectedAddress) => {
    if (session?.user?.id) {
      try {
        const response = await fetch("/api/user/wallet", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId: session.user.id, address: connectedAddress }),
        });
        if (!response.ok) {
          throw new Error("Failed to save wallet address");
        }
        console.log("User dashboard: Wallet address saved", { address: connectedAddress });
      } catch (error) {
        console.error("User dashboard: Error saving wallet address", error);
      }
    }
    setShowWalletPopup(false);
  };

  if (!session) return <div className="min-h-screen flex items-center justify-center">Please sign in</div>;

  return (
    <div className="space-y-6">
      {showWalletPopup && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
          <div className="relative z-10">
            <ConnectButton.Custom>
              {({ account, chain, openConnectModal, mounted }) => {
                if (account) {
                  handleWalletConnect(account.address);
                }
                if (!mounted) {
                  return <div>Loading...</div>;
                }
                return (
                  <div className="bg-background border border-primary/20 shadow-xl rounded-lg p-6 sm:max-w-md w-full">
                    <h2 className="text-2xl font-semibold text-center bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary mb-4">
                      Connect Your Wallet
                    </h2>
                    <p className="text-center text-foreground/80 mb-6">Please connect your wallet to continue.</p>
                    <button
                      onClick={openConnectModal}
                      className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-2 rounded-md"
                    >
                      Select Wallet
                    </button>
                  </div>
                );
              }}
            </ConnectButton.Custom>
          </div>
        </div>
      )}
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary"
      >
        User Dashboard
      </motion.h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <Card className="bg-gradient-to-br from-primary/20 to-background">
            <CardHeader>
              <CardTitle>Wallet</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm">Address: {address || "Not connected"}</p>
              <p className="text-2xl font-bold">{balance ? `${parseFloat(formatUnits(balance.value, 18)).toFixed(4)} MATIC` : "0 MATIC"}</p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}