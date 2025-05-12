"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { io } from "socket.io-client";
import { motion } from "framer-motion";
import Image from "next/image";

export default function UserTransactions() {
  const { data: session } = useSession();
  const [transactions, setTransactions] = useState([]);
  const [showAnalytics, setShowAnalytics] = useState(false);
  const socket = io(process.env.NEXT_PUBLIC_URL);

  useEffect(() => {
    if (session?.user?.id) {
      socket.emit("join", session.user.id);
      socket.on("transactionUpdate", (data) => {
        setTransactions(data.transactions);
      });
      fetchTransactions();
      return () => socket.disconnect();
    }
  }, [session]);

  const fetchTransactions = async () => {
    const response = await fetch(`/api/user/transactions?userId=${session?.user?.id}`);
    const data = await response.json();
    setTransactions(data);
  };

  const chartData = transactions.map(tx => ({
    date: new Date(tx.createdAt).toLocaleDateString(),
    amount: tx.amount,
  }));

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary"
        >
          Transactions
        </motion.h1>
        <Button
          onClick={() => setShowAnalytics(!showAnalytics)}
          className="bg-primary hover:bg-primary/90"
        >
          {showAnalytics ? "Hide Analytics" : "Show Analytics"}
        </Button>
      </div>
      {showAnalytics && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <Card>
            <CardHeader>
              <CardTitle>Transaction Analytics</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="amount" fill="var(--primary)" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>
      )}
      <Card>
        <CardHeader>
          <CardTitle>Recent Transactions</CardTitle>
        </CardHeader>
        <CardContent>
          {transactions.map(tx => (
            <motion.div
              key={tx.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-4 border-b py-4"
            >
              <Image src={`/coins/${tx.currency.toLowerCase()}.svg`} alt={tx.currency} width={32} height={32} />
              <div className="flex-1">
                <p className="font-medium">{tx.amount} {tx.currency}</p>
                <p className="text-sm text-foreground/80">Status: {tx.status}</p>
                <p className="text-sm text-foreground/80">Tx Hash: {tx.txHash.slice(0, 10)}...</p>
              </div>
            </motion.div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}