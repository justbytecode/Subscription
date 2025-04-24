import { getServerSession } from "next-auth";
import { authOptions } from "../../api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export default async function Transactions() {
  const session = await getServerSession(authOptions);
  const userId = session?.user.id;
  const transactions = await prisma.transaction.findMany({
    where: { userId },
    include: { subscription: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-800">Transaction History</h1>
      <Card className="bg-white shadow-md">
        <CardHeader>
          <CardTitle className="text-lg text-gray-700">Recent Transactions</CardTitle>
        </CardHeader>
        <CardContent>
          {transactions.length === 0 ? (
            <p className="text-gray-600">No transactions yet.</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Plan</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Transaction Hash</TableHead>
                  <TableHead>Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {transactions.map((tx) => (
                  <TableRow key={tx.id}>
                    <TableCell>{tx.subscription.name}</TableCell>
                    <TableCell>{tx.amount} ETH</TableCell>
                    <TableCell className="text-sm text-gray-500 truncate max-w-xs">{tx.txHash}</TableCell>
                    <TableCell>{new Date(tx.createdAt).toLocaleString()}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}