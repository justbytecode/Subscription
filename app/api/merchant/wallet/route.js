import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { ethers } from "ethers";

const provider = new ethers.providers.JsonRpcProvider(process.env.AMOY_RPC_URL);

export async function POST(request) {
  try {
    const { userId, address } = await request.json();
    
    const balance = await provider.getBalance(address);
    
    const wallet = await prisma.wallet.upsert({
      where: { userId },
      update: { address, balance: parseFloat(ethers.utils.formatEther(balance)) },
      create: {
        userId,
        address,
        balance: parseFloat(ethers.utils.formatEther(balance)),
        chain: "POLYGON",
        currency: "MATIC",
      },
    });

    return NextResponse.json(wallet);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
