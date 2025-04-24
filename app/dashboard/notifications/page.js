import { getServerSession } from "next-auth";
import { authOptions } from "../../api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default async function Notifications() {
  const session = await getServerSession(authOptions);
  const userId = session?.user.id;
  const notifications = await prisma.notification.findMany({ where: { userId }, orderBy: { createdAt: "desc" } });

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-800">Notifications</h1>
      <div className="space-y-4">
        {notifications.length === 0 ? (
          <p className="text-gray-600">No notifications yet.</p>
        ) : (
          notifications.map((notification) => (
            <Card key={notification.id} className="bg-white shadow-md">
              <CardContent className="p-4">
                <p className="text-gray-700">{notification.message}</p>
                <p className="text-sm text-gray-500 mt-1">
                  {notification.read ? "Read" : "Unread"} - {new Date(notification.createdAt).toLocaleString()}
                </p>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}