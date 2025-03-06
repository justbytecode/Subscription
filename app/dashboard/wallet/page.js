"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import detectEthereumProvider from "@metamask/detect-provider";
import { connectWallet, disconnectWallet } from "@/actions/wallet";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { ethers } from "ethers";

export default function WalletClient({ wallet: initialWallet }) {
  const { data: session, status } = useSession();
  const [userId, setUserId] = useState(null);
  const [wallet, setWallet] = useState(initialWallet);
  const [balance, setBalance] = useState(null);
  const [isBalanceLoading, setIsBalanceLoading] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [isDisconnecting, setIsDisconnecting] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();

  // Sync wallet state with local storage and initialWallet
  useEffect(() => {
    console.log("WalletClient - Initial wallet prop:", initialWallet);

    // If initialWallet is provided (from server), prioritize it
    if (initialWallet) {
      setWallet(initialWallet);
      localStorage.setItem("connectedWallet", JSON.stringify(initialWallet));
    } else {
      // Otherwise, check local storage for a previously connected wallet
      const storedWallet = localStorage.getItem("connectedWallet");
      if (storedWallet) {
        const parsedWallet = JSON.parse(storedWallet);
        setWallet(parsedWallet);
      }
    }
  }, [initialWallet]);

  // Fetch wallet balance when wallet is connected
  useEffect(() => {
    const fetchWalletBalance = async () => {
      if (wallet && wallet.address && window.ethereum) {
        setIsBalanceLoading(true);
        try {
          const provider = new ethers.BrowserProvider(window.ethereum);
          const balanceWei = await provider.getBalance(wallet.address);
          const balanceEth = ethers.formatEther(balanceWei);
          setBalance(balanceEth);
          console.log("Wallet balance fetched:", balanceEth, "ETH");
        } catch (err) {
          console.error("Failed to fetch wallet balance:", err);
          setError("Failed to fetch wallet balance: " + err.message);
        } finally {
          setIsBalanceLoading(false);
        }
      }
    };

    fetchWalletBalance();
  }, [wallet]);

  // Set userId from session
  useEffect(() => {
    if (status === "authenticated" && session?.user?.id) {
      setUserId(session.user.id);
      console.log("WalletClient - User ID from session:", session.user.id);
    } else if (status === "unauthenticated") {
      setError("User authentication failed. Please sign in again.");
    }
  }, [session, status]);

  const handleConnect = async () => {
    setIsConnecting(true);
    setError(null);
    try {
      if (!window.ethereum) {
        throw new Error("MetaMask not detected. Please install MetaMask.");
      }

      console.log("Window Ethereum:", window.ethereum);

      const provider = await detectEthereumProvider({
        mustBeMetaMask: true,
        silent: false,
      });

      if (!provider) {
        throw new Error("MetaMask not detected. Please install MetaMask.");
      }

      console.log("MetaMask provider detected:", provider);

      const accounts = await provider.request({ method: "eth_requestAccounts" });
      if (!accounts || accounts.length === 0) {
        throw new Error("No accounts found. Please approve the connection in MetaMask.");
      }

      const address = accounts[0];
      console.log("Connecting wallet with userId:", userId, "address:", address);

      const result = await connectWallet(userId, address);
      if (!result.success) {
        throw new Error(result.message || "Failed to connect wallet");
      }

      const newWallet = { address };
      setWallet(newWallet);
      localStorage.setItem("connectedWallet", JSON.stringify(newWallet));
      setError(null);
      router.refresh(); // Refresh to ensure server-side state is updated
    } catch (err) {
      setError(err.message);
      console.error("Failed to connect wallet:", err);
    } finally {
      setIsConnecting(false);
    }
  };

  const handleSwitchAccount = async () => {
    setIsConnecting(true);
    setError(null);
    try {
      const provider = await detectEthereumProvider({
        mustBeMetaMask: true,
        silent: false,
      });

      if (!provider) {
        throw new Error("MetaMask not detected. Please install MetaMask.");
      }

      await provider.request({
        method: "wallet_requestPermissions",
        params: [{ eth_accounts: {} }],
      });

      const accounts = await provider.request({ method: "eth_requestAccounts" });
      if (!accounts || accounts.length === 0) {
        throw new Error("No accounts found. Please approve the connection in MetaMask.");
      }

      const address = accounts[0];
      console.log("Switching wallet with userId:", userId, "address:", address);

      const result = await connectWallet(userId, address);
      if (!result.success) {
        throw new Error(result.message || "Failed to switch account");
      }

      const newWallet = { address };
      setWallet(newWallet);
      localStorage.setItem("connectedWallet", JSON.stringify(newWallet));
      setError(null);
      router.refresh();
    } catch (err) {
      setError(err.message);
      console.error("Failed to switch account:", err);
    } finally {
      setIsConnecting(false);
    }
  };

  const handleDisconnect = async () => {
    setIsDisconnecting(true);
    setError(null);
    try {
      if (window.ethereum) {
        const provider = await detectEthereumProvider();
        if (provider) {
          await provider.request({
            method: "wallet_revokePermissions",
            params: [{ eth_accounts: {} }],
          });
          console.log("Permissions revoked for MetaMask.");
        }
      }

      const result = await disconnectWallet(userId);
      if (!result.success) {
        throw new Error(result.message || "Failed to disconnect wallet");
      }

      setWallet(null);
      setBalance(null);
      localStorage.removeItem("connectedWallet");
      router.refresh();
    } catch (err) {
      setError(err.message);
      console.error("Failed to disconnect wallet:", err);
    } finally {
      setIsDisconnecting(false);
    }
  };

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "unauthenticated") {
    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-gray-800">Wallet Management</h1>
        <p className="text-red-600">User authentication failed. Please sign in again.</p>
        <Button asChild variant="link" className="text-blue-600">
          <Link href="/signin">Sign In</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-800">Wallet Management</h1>
      <Card className="bg-white shadow-md">
        <CardHeader>
          <CardTitle className="text-lg text-gray-700">Your MetaMask Wallet</CardTitle>
        </CardHeader>
        <CardContent>
          {error && (
            <div className="mb-4">
              <p className="text-red-600">{error}</p>
            </div>
          )}
          {wallet ? (
            <div className="space-y-4">
              <p className="text-gray-700">
                <span className="font-semibold">Address:</span>{" "}
                <span className="text-blue-600">{wallet.address}</span>
              </p>
              <p className="text-gray-700">
                <span className="font-semibold">Balance:</span>{" "}
                <span className="text-blue-600">
                  {isBalanceLoading ? "Fetching..." : balance ? `${balance} ETH` : "Unable to fetch balance"}
                </span>
              </p>
              <p className="text-sm text-gray-500">This wallet will receive all subscription payments.</p>
              <div className="flex space-x-4">
                <Button
                  onClick={handleSwitchAccount}
                  className="bg-blue-600 hover:bg-blue-700"
                  disabled={isConnecting || isDisconnecting}
                >
                  {isConnecting ? "Switching..." : "Switch Account"}
                </Button>
                <Button
                  onClick={handleDisconnect}
                  variant="destructive"
                  disabled={isConnecting || isDisconnecting}
                >
                  {isDisconnecting ? "Disconnecting..." : "Disconnect"}
                </Button>
              </div>
            </div>
          ) : (
            <div>
              <p className="text-gray-600 mb-4">Connect your MetaMask wallet to start receiving payments.</p>
              <Button
                onClick={handleConnect}
                className="bg-blue-600 hover:bg-blue-700"
                disabled={isConnecting || !userId || status !== "authenticated"}
              >
                {isConnecting ? "Connecting..." : "Connect MetaMask"}
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}