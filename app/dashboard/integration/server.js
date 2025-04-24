// /dashboard/integration/server.js
import { getServerSession } from "next-auth";
import { authOptions } from "../../api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";
import IntegrationClient from "./page";

export default async function IntegrationServer() {
  const session = await getServerSession(authOptions);

  console.log("IntegrationServer - Session:", session);

  if (!session || !session.user?.id) {
    console.warn("IntegrationServer - No session or user ID found, redirecting to signin");
    return <IntegrationClient plans={[]} />;
  }

  const userId = session.user.id;
  let plans = [];

  try {
    plans = await prisma.subscriptionPlan.findMany({
      where: { userId },
      select: {
        id: true,
        name: true,
        price: true,
        contractAddress: true,
        planId: true, // Include the on-chain planId
      },
    });
  } catch (error) {
    console.error("IntegrationServer - Error fetching plans:", error);
    plans = [];
  }

  console.log("IntegrationServer - Sending props to IntegrationClient:", { plans });

  return <IntegrationClient plans={plans} />;
}