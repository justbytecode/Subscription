import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

export async function GET(request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const query = searchParams.get("query");

  if (!query) {
    return NextResponse.json({ error: "Query is required" }, { status: 400 });
  }

  try {
    const users = await prisma.user.findMany({
      where: {
        OR: [
          { email: { contains: query, mode: "insensitive" } },
          { id: { contains: query, mode: "insensitive" } },
        ],
      },
      select: { id: true, email: true, name: true },
    });
    return NextResponse.json(users, { status: 200 });
  } catch (error) {
    console.error("Search error:", error);
    return NextResponse.json({ error: "Failed to search users" }, { status: 500 });
  }
}