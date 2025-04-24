"use server";

import { prisma } from "@/lib/prisma";

export async function updateUserSettings(formData, userId) {
  const name = formData.get("name");
  const email = formData.get("email");
  const image = formData.get("image") || null; // Allow null if empty

  await prisma.user.update({
    where: { id: userId },
    data: { name, email, image },
  });

  return { success: true };
}