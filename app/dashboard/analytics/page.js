import { getServerSession } from "next-auth";
import { authOptions } from "../../api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default async function Analytics() {
  const session = await getServerSession(authOptions);
  const userId = session?.user.id;
  const plans = await prisma.subscriptionPlan.findMany({ where: { userId } });
  const transactions = await prisma.transaction.findMany({ where: { userId } });
  const totalRevenue = transactions.reduce((sum, tx) => sum + tx.amount, 0);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-800">Analytics</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-white shadow-md hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="text-lg text-gray-700">Total Plans</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-semibold text-blue-600">{plans.length}</p>
          </CardContent>
        </Card>
        <Card className="bg-white shadow-md hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="text-lg text-gray-700">Total Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-semibold text-green-600">{totalRevenue.toFixed(2)} Dollars</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}