"use server";

import { prisma } from "@/lib/prisma";
import { v4 as uuidv4 } from "uuid";

export async function connectWallet(userId, address) {
  if (!userId) {
    throw new Error("User ID is required");
  }
  if (!address || !/^0x[a-fA-F0-9]{40}$/.test(address)) {
    throw new Error("Valid wallet address is required");
  }

  try {
    // Ensure the user has an API key
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user.apiKey) {
      await prisma.user.update({
        where: { id: userId },
        data: { apiKey: uuidv4() },
      });
      console.log("API key generated for user:", userId);
    }

    const existingWallet = await prisma.wallet.findUnique({ where: { userId } });
    if (existingWallet) {
      const updatedWallet = await prisma.wallet.update({
        where: { userId },
        data: { address },
      });
      console.log("Wallet updated successfully:", updatedWallet);

      // Update the User record to set walletId
      await prisma.user.update({
        where: { id: userId },
        data: { walletId: updatedWallet.id },
      });
      console.log("User updated with walletId:", updatedWallet.id);

      return { success: true, address: updatedWallet.address, message: "Wallet updated successfully" };
    }

    const wallet = await prisma.wallet.create({
      data: {
        user: { connect: { id: userId } },
        address,
      },
    });
    console.log("Wallet connected successfully:", wallet);

    // Update the User record to set walletId
    await prisma.user.update({
      where: { id: userId },
      data: { walletId: wallet.id },
    });
    console.log("User updated with walletId:", wallet.id);

    return { success: true, address: wallet.address, message: "Wallet connected successfully" };
  } catch (error) {
    if (error.code === "P2002") {
      throw new Error("A wallet is already connected to this user");
    }
    throw new Error("Failed to connect wallet: " + error.message);
  }
}

export async function disconnectWallet(userId) {
  if (!userId) {
    throw new Error("User ID is required");
  }

  try {
    await prisma.wallet.delete({ where: { userId } });

    // Update the User record to clear walletId
    await prisma.user.update({
      where: { id: userId },
      data: { walletId: null },
    });
    console.log("User updated with walletId set to null");

    console.log("Wallet disconnected successfully for userId:", userId);
    return { success: true, message: "Wallet disconnected successfully" };
  } catch (error) {
    if (error.code === "P2025") {
      throw new Error("No wallet found to disconnect");
    }
    throw new Error("Failed to disconnect wallet: " + error.message);
  }
}