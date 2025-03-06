// app/api/plans/route.js (for App Router)
import { prisma } from "@/lib/prisma";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("userId");

  if (!userId) {
    return new Response(JSON.stringify({ error: "userId is required" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    const plans = await prisma.subscriptionPlan.findMany({
      where: { userId },
    });
    return new Response(JSON.stringify(plans), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Failed to fetch plans:", error);
    return new Response(JSON.stringify({ error: "Failed to fetch plans" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}