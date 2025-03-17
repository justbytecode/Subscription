// /dashboard/wallet/server.js
import { getServerSession } from "next-auth";
import { authOptions } from "../../api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";
import WalletClient from "./page";

export default async function WalletServer() {
  const session = await getServerSession(authOptions);

  console.log("WalletServer - Session:", session);

  if (!session || !session.user?.id) {
    console.warn("WalletServer - No session or user ID found");
    return <WalletClient wallet={null} />;
  }

  const userId = session.user.id;
  let wallet = null;

  try {
    const walletRecord = await prisma.wallet.findUnique({
      where: { userId },
      select: { address: true },
    });

    console.log("WalletServer - Fetched wallet for userId:", userId, "Wallet:", walletRecord);

    if (walletRecord) {
      wallet = { address: walletRecord.address };
    } else {
      console.warn("WalletServer - No wallet found for userId:", userId);
    }
  } catch (error) {
    console.error("WalletServer - Error fetching wallet:", error);
    wallet = null;
  }

  console.log("WalletServer - Sending props to WalletClient:", { wallet });

  return <WalletClient wallet={wallet} />;
}

export const dynamic = "force-dynamic"; // Force dynamic rendering to avoid caching