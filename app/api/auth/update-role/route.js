import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../[...nextauth]/route";

export async function POST(request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || !session.user?.id) {
      console.error("Session error: No valid session or user ID found", { session });
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { role } = await request.json();
    if (!["USER", "MERCHANT"].includes(role)) {
      console.error("Invalid role provided:", role);
      return NextResponse.json({ error: "Invalid role" }, { status: 400 });
    }

    const updatedUser = await prisma.user.update({
      where: { id: session.user.id },
      data: { role },
    });

    return NextResponse.json({ success: true, role: updatedUser.role });
  } catch (error) {
    console.error("Update role error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}