import { getServerSession } from "next-auth";
import { authOptions } from "../../api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";
import SettingsClient from "./page";

export default async function SettingsServer() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user?.id) {
    return <SettingsClient user={null} userId={null} wallet={null} />;
  }

  const userId = session.user.id;
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { name: true, email: true, image: true },
  });
  const wallet = await prisma.wallet.findUnique({ where: { userId } });

  return <SettingsClient user={user} userId={userId} wallet={wallet} />;
}