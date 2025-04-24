import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Bell, CreditCard, TrendingUp, Wallet } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import Link from "next/link"; // Import Link for client-side navigation

export default async function Dashboard() {
  const session = await getServerSession(authOptions);

  // Redirect to sign-in if not authenticated
  if (!session || !session.user?.id) {
    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-gray-800">Merchant Dashboard</h1>
        <p className="text-gray-600">Please sign in to access your dashboard.</p>
        <Button asChild>
          <Link href="/signin">Sign In</Link>
        </Button>
      </div>
    );
  }

  const userId = session.user.id;

  // Fetch data
  const plans = await prisma.subscriptionPlan.count({ where: { userId } });
  const wallet = await prisma.wallet.findUnique({ where: { userId } });

  // Get current date for greeting
  const currentHour = new Date().getHours();
  let greeting = "Good morning";
  if (currentHour >= 12 && currentHour < 18) {
    greeting = "Good afternoon";
  } else if (currentHour >= 18) {
    greeting = "Good evening";
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-2">
        <h2 className="text-2xl font-bold tracking-tight">{greeting}, {session.user.name}</h2>
        <p className="text-muted-foreground">
        Here&apos;s an overview of your subscription management dashboard.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="overflow-hidden border-none shadow-md transition-all hover:shadow-lg dark:bg-gray-900">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 bg-blue-50 dark:bg-blue-950/40">
            <CardTitle className="text-sm font-medium">Total Plans</CardTitle>
            <CreditCard className="h-4 w-4 text-blue-600 dark:text-blue-400" />
          </CardHeader>
          <CardContent className="pt-6">
            <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">{plans}</div>
            <p className="text-xs text-muted-foreground mt-1">Active subscription plans</p>
            <div className="mt-4">
              <Progress
                value={plans > 0 ? 100 : 0}
                className="h-1 bg-blue-100 dark:bg-blue-950"
                indicatorClassName="bg-blue-600 dark:bg-blue-400"
              />
            </div>
          </CardContent>
        </Card>

        <Card className="overflow-hidden border-none shadow-md transition-all hover:shadow-lg dark:bg-gray-900">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 bg-green-50 dark:bg-green-950/40">
            <CardTitle className="text-sm font-medium">Wallet Balance</CardTitle>
            <Wallet className="h-4 w-4 text-green-600 dark:text-green-400" />
          </CardHeader>
          <CardContent className="pt-6">
            <div className="text-3xl font-bold text-green-600 dark:text-green-400">
              {wallet ? "Connected" : "Not set"} {/* Simplified for now; balance fetch needs client-side */}
            </div>
            <p className="text-xs text-muted-foreground mt-1">Available balance</p>
            <div className="mt-4">
              <Progress
                value={wallet ? 60 : 0}
                className="h-1 bg-green-100 dark:bg-green-950"
                indicatorClassName="bg-green-600 dark:bg-green-400"
              />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <Card className="col-span-1 md:col-span-2 shadow-md dark:bg-gray-900">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Your subscription activity for the past 30 days</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[200px] flex items-center justify-center">
              <TrendingUp className="h-16 w-16 text-muted-foreground/30" />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-md dark:bg-gray-900">
          <CardHeader>
            <CardTitle>Upcoming Payments</CardTitle>
            <CardDescription>Payments due in the next 30 days</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {plans > 0 ? (
                <div className="rounded-lg border p-3">
                  <div className="flex justify-between">
                    <div className="font-medium">Sample Plan</div>
                    <div className="font-medium text-green-600 dark:text-green-400">0.1 ETH</div>
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">Due in 5 days</div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-8 text-center">
                  <p className="text-muted-foreground">No upcoming payments</p>
                  <Button asChild variant="outline" size="sm" className="mt-4">
                    <Link href="/dashboard/plans">Add a Subscription</Link>
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}