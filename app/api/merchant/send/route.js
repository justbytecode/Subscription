import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { io } from "@/lib/socket";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("query");

  try {
    const user = await prisma.user.findFirst({
      where: {
        OR: [
          { email: query },
          { id: query.replace("recurx.xyz/", "") },
        ],
      },
      include: { wallet: true },
    });

    return NextResponse.json({ user });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const { senderId, recipientId, amount, currency, txHash } = await request.json();
    
    const platformFee = amount * 0.005; // 0.5% fee
    const transaction = await prisma.transaction.create({
      data: {
        userId: senderId,
        recipientId,
        amount,
        currency,
        txHash,
        platformFee,
        status: "COMPLETED",
      },
    });

    io.to(senderId).emit("transactionUpdate", { transactions: [transaction] });
    if (recipientId) {
      io.to(recipientId).emit("transactionUpdate", { transactions: [transaction] });
    }

    return NextResponse.json({ transaction });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}