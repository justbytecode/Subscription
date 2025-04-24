import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { ethers } from "ethers";
import { subscriptionABI } from "@/lib/subscriptionABI";

const provider = new ethers.JsonRpcProvider(process.env.SEPOLIA_RPC_URL || "https://eth-sepolia.g.alchemy.com/v2/oqEOSkZ6l7JzL_JyPKD6j7iOoBSPIcKE");


export async function POST(request) {
  try {
    const authHeader = request.headers.get("authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json({ error: "Missing or invalid Authorization header" }, { status: 401 });
    }

    const apiKey = authHeader.replace("Bearer ", "");
    const user = await prisma.user.findUnique({ where: { apiKey } });
    if (!user) {
      return NextResponse.json({ error: "Invalid API key" }, { status: 401 });
    }

    const { planId, userWalletAddress } = await request.json();
    if (!planId || !userWalletAddress) {
      return NextResponse.json({ error: "planId and userWalletAddress are required" }, { status: 400 });
    }

    const plan = await prisma.subscriptionPlan.findUnique({
      where: { id: planId, userId: user.id },
    });
    if (!plan) {
      return NextResponse.json({ error: "Plan not found or not owned by user" }, { status: 404 });
    }

    if (plan.status !== "ACTIVE") {
      return NextResponse.json({ error: "Plan is not active" }, { status: 400 });
    }

    // Simulate a transaction (in a real scenario, this would be handled client-side via MetaMask)
    const contract = new ethers.Contract(plan.contractAddress, subscriptionABI, provider);
    // Note: In a real implementation, the transaction would be initiated client-side
    // This is a placeholder to record the transaction in the database
    const txHash = `0x${Math.random().toString(16).slice(2)}`; // Simulated transaction hash

    const transaction = await prisma.transaction.create({
      data: {
        userId: user.id,
        planId: plan.id,
        amount: plan.price,
        txHash,
        status: "PENDING", // In a real scenario, you'd update this after the transaction confirms
      },
    });

    return NextResponse.json({ success: true, transaction }, { status: 200 });
  } catch (error) {
    console.error("API subscribe error:", error);
    return NextResponse.json({ error: "Failed to process subscription: " + error.message }, { status: 500 });
  }
}