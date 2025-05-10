"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingBag, User } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { signIn } from "next-auth/react";

export default function RoleSelection() {
  const { data: session, status, update } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState(false);

  useEffect(() => {
    if (status === "authenticated" && session?.user?.role && !selected) {
      console.log("Role selection: Redirecting to dashboard", { role: session.user.role, userId: session.user.id });
      router.push(`/dashboard/${session.user.role.toLowerCase()}`);
    }
  }, [session, status, router, selected]);

  const handleRoleSelection = async (role) => {
    if (loading || selected) return;
    setLoading(true);
    setSelected(true);

    console.log("Role selection: Attempting to update role", { role, session });

    try {
      const response = await fetch("/api/auth/update-role", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role }),
      });

      if (!response.ok) {
        const { error } = await response.json();
        if (response.status === 401) {
          console.error("Role selection: Unauthorized", { error, session });
          toast.error("Session expired. Please sign in again.");
          await signIn("google", { callbackUrl: "/role-selection" });
          return;
        }
        throw new Error(error || "Failed to update role");
      }

      const { role: updatedRole } = await response.json();
      console.log("Role selection: Role updated successfully", { updatedRole });

      // Refresh the session
      await update();

      // Wait for the session to reflect the new role
      let attempts = 0;
      const maxAttempts = 5;
      const checkSession = async () => {
        const currentSession = await fetch("/api/auth/session").then((res) => res.json());
        if (currentSession?.user?.role === updatedRole || attempts >= maxAttempts) {
          console.log("Role selection: Session updated, redirecting", { role: currentSession.user.role });
          router.push(`/dashboard/${updatedRole.toLowerCase()}`);
        } else {
          attempts++;
          console.log("Role selection: Session not updated yet, retrying", { attempts, currentRole: currentSession.user.role });
          setTimeout(checkSession, 500);
        }
      };

      await checkSession();
    } catch (error) {
      console.error("Role selection: Error updating role", error);
      toast.error(error.message || "An error occurred while selecting role");
      setLoading(false);
      setSelected(false);
    }
  };

  if (status === "loading") {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (!session) {
    console.log("Role selection: No session, redirecting to signin");
    router.push("/signin");
    return null;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="w-full max-w-md shadow-xl border border-primary/20">
          <CardHeader className="text-center bg-gradient-to-r from-primary/80 to-secondary/80 text-primary-foreground">
            <div className="flex justify-center mb-4">
              <div className="bg-background/50 p-2 rounded-full">
                <ShoppingBag className="h-8 w-8" />
              </div>
            </div>
            <CardTitle className="text-2xl">Select Your Role</CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-4">
            <p className="text-center text-foreground/80">
              Choose whether you want to proceed as a Merchant or a User.
            </p>
            <div className="grid grid-cols-2 gap-4">
              <Button
                onClick={() => handleRoleSelection("MERCHANT")}
                disabled={loading || selected}
                className="flex items-center justify-center gap-2 bg-primary hover:bg-primary/90"
              >
                <ShoppingBag className="h-5 w-5" />
                Merchant
              </Button>
              <Button
                onClick={() => handleRoleSelection("USER")}
                disabled={loading || selected}
                className="flex items-center justify-center gap-2 bg-secondary hover:bg-secondary/90"
              >
                <User className="h-5 w-5" />
                User
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}