"use server";

import { prisma } from "@/lib/prisma";

export async function getRecentTransactions(userId) {
  if (!userId) {
    throw new Error("User ID is required");
  }

  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

  const transactions = await prisma.transaction.findMany({
    where: {
      userId,
      createdAt: { gte: thirtyDaysAgo },
    },
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      amount: true,
      txHash: true,
      planId: true,
      createdAt: true,
      plan: { select: { name: true } },
    },
  });

  return transactions;
}