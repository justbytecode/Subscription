"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { updateUserSettings } from "@/actions/settings";
import { connectWallet, disconnectWallet } from "@/actions/wallet";
import { signOut } from "next-auth/react";
import detectEthereumProvider from "@metamask/detect-provider";
import { useRouter } from "next/navigation";
import { AlertCircle, LogOut, Wallet, Save, RefreshCw, Link2Off } from 'lucide-react';
import { Alert, AlertDescription } from "@/components/ui/alert";
import Image from "next/image";

export default function SettingsClient({ user, userId, wallet }) {
  const [isSavingProfile, setIsSavingProfile] = useState(false);
  const [isConnectingWallet, setIsConnectingWallet] = useState(false);
  const [isDisconnectingWallet, setIsDisconnectingWallet] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();

  // Profile update handler
  const handleUpdateProfile = async (formData) => {
    setIsSavingProfile(true);
    setError(null);
    try {
      await updateUserSettings(formData, userId);
      router.refresh(); // Refresh without full reload
    } catch (err) {
      console.error("Failed to update profile:", err);
      setError("Failed to update profile: " + err.message);
    } finally {
      setIsSavingProfile(false);
    }
  };

  // Wallet connect handler
  const handleConnectWallet = async () => {
    setIsConnectingWallet(true);
    setError(null);
    try {
      const provider = await detectEthereumProvider();
      if (!provider) {
        throw new Error("MetaMask not detected");
      }
      const accounts = await provider.request({ method: "eth_requestAccounts" });
      const address = accounts[0];

      await connectWallet(userId, address);
      router.refresh();
    } catch (err) {
      console.error("Failed to connect wallet:", err);
      setError("Failed to connect wallet: " + err.message);
    } finally {
      setIsConnectingWallet(false);
    }
  };

  // Wallet disconnect handler
  const handleDisconnectWallet = async () => {
    setIsDisconnectingWallet(true);
    setError(null);
    try {
      await disconnectWallet(userId);
      router.refresh();
    } catch (err) {
      console.error("Failed to disconnect wallet:", err);
      setError("Failed to disconnect wallet: " + err.message);
    } finally {
      setIsDisconnectingWallet(false);
    }
  };

  // Logout handler
  const handleLogout = async () => {
    await signOut({ callbackUrl: "/dashboard" });
  };

  // Helper function to truncate wallet address
  const truncateAddress = (address) => {
    if (!address) return "";
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
      <h1 className="text-4xl font-bold text-gradient bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
        Settings
      </h1>

      {error && (
        <Alert variant="destructive" className="animate-fade-in">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* Profile Settings */}
      <Card className="border-animation overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950">
          <CardTitle className="text-xl font-semibold text-blue-800 dark:text-blue-300 flex items-center gap-2">
            <span className="inline-block p-2 rounded-full bg-blue-100 dark:bg-blue-900">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5 text-blue-600 dark:text-blue-400"
              >
                <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </span>
            Profile Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <form action={handleUpdateProfile} className="space-y-5">
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-sm font-medium">Name</Label>
                <Input 
                  id="name" 
                  name="name" 
                  defaultValue={user?.name || ""} 
                  className="transition-all focus:ring-2 focus:ring-blue-500" 
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium">Email</Label>
                <Input 
                  id="email" 
                  name="email" 
                  type="email" 
                  defaultValue={user?.email || ""} 
                  className="transition-all focus:ring-2 focus:ring-blue-500" 
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="image" className="text-sm font-medium">Profile Image URL</Label>
              <Input 
                id="image" 
                name="image" 
                defaultValue={user?.image || ""} 
                className="transition-all focus:ring-2 focus:ring-blue-500" 
                placeholder="https://example.com/image.jpg" 
              />
            </div>
            
            {user?.image && (
              <div className="flex justify-center md:justify-start">
                <div className="relative w-24 h-24 rounded-full overflow-hidden border-4 border-blue-100 dark:border-blue-900 shadow-lg hover:shadow-xl transition-all duration-300">
                  <Image
                    src={user.image || "/placeholder.svg"} 
                    alt="Profile" 
                    className="w-full h-full object-cover" 
                  />
                </div>
              </div>
            )}
            
            <Button 
              type="submit" 
              className="w-full md:w-auto bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-md hover:shadow-lg"
              disabled={isSavingProfile}
            >
              {isSavingProfile ? (
                <>
                  <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  Save Profile
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Wallet Settings */}
      <Card className="border-animation overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950 dark:to-pink-950">
          <CardTitle className="text-xl font-semibold text-purple-800 dark:text-purple-300 flex items-center gap-2">
            <span className="inline-block p-2 rounded-full bg-purple-100 dark:bg-purple-900">
              <Wallet className="h-5 w-5 text-purple-600 dark:text-purple-400" />
            </span>
            Wallet Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          {wallet ? (
            <div className="space-y-5">
              <div className="p-4 rounded-lg bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-900/30 dark:to-indigo-900/30 border border-purple-100 dark:border-purple-800">
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">Connected Wallet</p>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-mono text-sm md:text-base font-medium text-purple-800 dark:text-purple-300 bg-white dark:bg-gray-800 px-3 py-1.5 rounded-md shadow-sm">
                    {wallet.address}
                  </span>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                    Connected
                  </span>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  onClick={handleConnectWallet}
                  className="flex-1 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 transition-all duration-300 shadow-md hover:shadow-lg"
                  disabled={isConnectingWallet || isDisconnectingWallet}
                >
                  {isConnectingWallet ? (
                    <>
                      <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                      Switching...
                    </>
                  ) : (
                    <>
                      <RefreshCw className="mr-2 h-4 w-4" />
                      Switch Wallet
                    </>
                  )}
                </Button>
                <Button
                  onClick={handleDisconnectWallet}
                  variant="destructive"
                  className="flex-1 shadow-md hover:shadow-lg transition-all duration-300"
                  disabled={isConnectingWallet || isDisconnectingWallet}
                >
                  {isDisconnectingWallet ? (
                    <>
                      <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                      Disconnecting...
                    </>
                  ) : (
                    <>
                      <Link2Off className="mr-2 h-4 w-4" />
                      Disconnect Wallet
                    </>
                  )}
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-5">
              <div className="p-4 rounded-lg bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-900/30 dark:to-gray-800/30 border border-gray-200 dark:border-gray-700">
                <p className="text-gray-600 dark:text-gray-300">No wallet connected. Connect your wallet to access additional features.</p>
              </div>
              <Button
                onClick={handleConnectWallet}
                className="w-full sm:w-auto bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 transition-all duration-300 shadow-md hover:shadow-lg"
                disabled={isConnectingWallet}
              >
                {isConnectingWallet ? (
                  <>
                    <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                    Connecting...
                  </>
                ) : (
                  <>
                    <Wallet className="mr-2 h-4 w-4" />
                    Connect Wallet
                  </>
                )}
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Logout */}
      <Card className="border-animation overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-950 dark:to-orange-950">
          <CardTitle className="text-xl font-semibold text-red-800 dark:text-red-300 flex items-center gap-2">
            <span className="inline-block p-2 rounded-full bg-red-100 dark:bg-red-900">
              <LogOut className="h-5 w-5 text-red-600 dark:text-red-400" />
            </span>
            Session
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Sign out from your current session. You&apos;ll need to log in again to access your account.
          </p>
          <Button 
            onClick={handleLogout} 
            variant="outline"
            className="border-red-200 text-red-700 hover:bg-red-50 hover:text-red-800 dark:border-red-800 dark:text-red-400 dark:hover:bg-red-900/30 dark:hover:text-red-300 transition-all duration-300"
          >
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}