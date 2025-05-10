"use client";

import { useState } from "react";
import { useAccount, useSendTransaction } from "wagmi";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search } from "lucide-react";
import { parseEther } from "ethers/lib/utils";
import { motion } from "framer-motion";
import { toast } from "react-toastify";

const supportedTokens = [
  { symbol: "MATIC", address: "0x0000000000000000000000000000000000000000" },
  { symbol: "USDT", address: "0xYourUSDTAddress" },
  { symbol: "USDC", address: "0xYourUSDCAddress" },
  { symbol: "DAI", address: "0xYourDAIAddress" },
  { symbol: "QUICK", address: "0xYourQUICKAddress" },
  { symbol: "SHIB", address: "0xYourSHIBAddress" },
  { symbol: "LINK", address: "0xYourLINKAddress" },
];

export default function UserSend() {
  const { address, isConnected } = useAccount();
  const { sendTransaction } = useSendTransaction();
  const [searchQuery, setSearchQuery] = useState("");
  const [recipient, setRecipient] = useState(null);
  const [amount, setAmount] = useState("");
  const [currency, setCurrency] = useState("MATIC");

  const handleSearch = async () => {
    try {
      const response = await fetch(`/api/user/send?query=${searchQuery}`);
      const data = await response.json();
      if (data.user) {
        setRecipient(data.user);
        toast.success("Recipient found!");
      } else {
        toast.error("Recipient not found");
      }
    } catch (error) {
      toast.error("Error searching recipient");
    }
  };

  const handleSend = async () => {
    if (!recipient || !amount) {
      toast.error("Please enter amount and select recipient");
      return;
    }

    try {
      const tx = await sendTransaction({
        to: recipient.wallet.address,
        value: currency === "MATIC" ? parseEther(amount) : 0,
        // Add ERC20 transfer logic for other tokens
      });

      await fetch("/api/user/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          senderId: address,
          recipientId: recipient.id,
          amount: parseFloat(amount),
          currency,
          txHash: tx.hash,
        }),
      });

      toast.success("Payment sent successfully!");
      setAmount("");
      setRecipient(null);
      setSearchQuery("");
    } catch (error) {
      toast.error("Failed to send payment");
      console.error("Send error:", error);
    }
  };

  if (!isConnected) return <div className="min-h-screen flex items-center justify-center">Please connect your wallet</div>;

  return (
    <div className="space-y-6">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary"
      >
        Send Payment
      </motion.h1>
      <Card>
        <CardHeader>
          <CardTitle>Search Recipient</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Enter email or user ID (recurx.xyz/userid)"
              className="flex-1"
            />
            <Button onClick={handleSearch}>
              <Search className="h-4 w-4 mr-2" /> Search
            </Button>
          </div>
          {recipient && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              <p className="text-foreground/80">Found: {recipient.name} ({recipient.email})</p>
              <Input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Amount"
              />
              <Select value={currency} onValueChange={setCurrency}>
                <SelectTrigger>
                  <SelectValue placeholder="Select currency" />
                </SelectTrigger>
                <SelectContent>
                  {supportedTokens.map((token) => (
                    <SelectItem key={token.symbol} value={token.symbol}>
                      {token.symbol}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button onClick={handleSend} className="w-full bg-primary hover:bg-primary/90">
                Send Payment
              </Button>
            </motion.div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}