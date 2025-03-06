import { getServerSession } from "next-auth";
import { authOptions } from "../../api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";
import PlansClient from "./page";

export default async function PlansServer() {
  const session = await getServerSession(authOptions);

  console.log("PlansServer - Session:", session);

  if (!session || !session.user?.id) {
    console.warn("PlansServer - No session or user ID found, redirecting to signin");
    return <PlansClient wallet={null} plans={[]} userId={null} />;
  }

  const userId = session.user.id;
  let wallet = null;
  let plans = [];

  try {
    // Fetch wallet data
    const walletRecord = await prisma.wallet.findUnique({
      where: { userId: userId },
      select: { address: true },
    });

    console.log("PlansServer - Fetched wallet for userId:", userId, "Wallet:", walletRecord);

    if (walletRecord) {
      wallet = { address: walletRecord.address };
    } else {
      console.warn("PlansServer - No wallet found for userId:", userId);
    }

    // Fetch plans data
    plans = await prisma.subscriptionPlan.findMany({
      where: { userId: userId },
      select: { id: true, name: true, price: true, interval: true, contractAddress: true },
    });

    console.log("PlansServer - Fetched plans for userId:", userId, "Plans:", plans);
  } catch (error) {
    console.error("PlansServer - Error fetching data:", error);
    wallet = null;
    plans = [];
  }

  console.log("PlansServer - Sending props to PlansClient:", { userId, wallet, plans });

  return <PlansClient wallet={wallet} plans={plans} userId={userId} />;
}

// Force dynamic rendering to avoid caching
export const dynamic = "force-dynamic";

// Ensure revalidation happens immediately
export const revalidate = 0;