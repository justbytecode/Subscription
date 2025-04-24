"use server";

import { prisma } from "@/lib/prisma";

export async function saveSubscriptionPlan({ name, price, interval, contractAddress, userId }) {
  // Log the input values for debugging
  console.log("saveSubscriptionPlan - Received values:", { name, price, interval, contractAddress, userId });

  // Enhanced validation with specific error messages
  const missingFields = [];
  if (!name) missingFields.push("name");
  if (!price) missingFields.push("price");
  if (!interval) missingFields.push("interval");
  if (!contractAddress) missingFields.push("contractAddress");
  if (!userId || typeof userId !== "string" || userId.trim() === "") missingFields.push("userId");

  if (missingFields.length > 0) {
    const errorMessage = `All fields are required to save the subscription plan. Missing fields: ${missingFields.join(", ")}`;
    console.error(errorMessage);
    throw new Error(errorMessage);
  }

  try {
    const plan = await prisma.subscriptionPlan.create({
      data: {
        name,
        price: parseFloat(price),
        interval,
        contractAddress,
        user: { connect: { id: userId } },
      },
    });
    console.log("Subscription plan saved successfully:", plan);
    return { success: true, plan };
  } catch (error) {
    console.error("Failed to save subscription plan:", error);
    throw new Error("Failed to save subscription plan: " + error.message);
  }
}