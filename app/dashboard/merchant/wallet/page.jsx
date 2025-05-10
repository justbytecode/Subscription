"use client";

import { useEffect, useState } from "react";
import { useAccount, useBalance, useDisconnect } from "wagmi";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { motion } from "framer-motion";
import { useSession } from "next-auth/react";

export default function MerchantWallet() {
  const { data: session } = useSession();
  const { address, isConnected, isDisconnected, chain } = useAccount();
  const { data: balance } = useBalance({ address });
  const { disconnect } = useDisconnect();
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
        const response = await fetch("/api/merchant/wallet", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId: session.user.id, address: connectedAddress }),
        });
        if (!response.ok) {
          throw new Error("Failed to save wallet address");
        }
        console.log("Merchant wallet: Wallet address saved", { address: connectedAddress });
      } catch (error) {
        console.error("Merchant wallet: Error saving wallet address", error);
      }
    }
    setShowWalletPopup(false);
  };

  const handleDisconnect = () => {
    disconnect();
    console.log("Merchant wallet: Wallet disconnected");
    setShowWalletPopup(true); // Ensure popup reappears after disconnection
  };

  const handleChangeAccount = () => {
    setShowWalletPopup(true);
  };

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
        Wallet Management
      </motion.h1>
      <Card>
        <CardHeader>
          <CardTitle>Wallet Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p><span className="font-medium">Address:</span> {address || "Not connected"}</p>
          <p><span className="font-medium">Chain:</span> {chain?.name || "Polygon Amoy"}</p>
          <p><span className="font-medium">Balance:</span> {balance?.formatted || "0"} {balance?.symbol || "MATIC"}</p>
          {isConnected && (
            <div className="space-x-2">
              <Button
                onClick={handleChangeAccount}
                className="bg-primary hover:bg-primary/90"
              >
                Change Account
              </Button>
              <Button
                onClick={handleDisconnect}
                className="bg-red-500 hover:bg-red-600 text-white"
              >
                Disconnect
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}