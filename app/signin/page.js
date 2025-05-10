"use client";

import { signIn } from "next-auth/react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ShoppingBag, UserPlus, ExternalLink, HelpCircle } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";

export default function SignIn() {
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const error = searchParams.get("error");

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-black">
      <div className="hidden md:flex md:w-1/2 p-8 flex-col justify-center items-center relative">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background to-secondary/20" />
        <div className="relative z-10 max-w-xl text-center md:text-left px-4">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
              RecurX
            </span>
            <br />
            Decentralized Payment Solution
          </h1>
          <p className="mt-4 text-lg text-foreground/80">
            Secure, fast, and transparent payments on the Polygon network.
          </p>
        </div>
      </div>
      <div className="w-full md:w-1/2 flex items-center justify-center p-8">
        <Card className="w-full max-w-md shadow-xl border border-primary/20">
          <CardHeader className="text-center bg-gradient-to-r from-primary/80 to-secondary/80 text-primary-foreground">
            <div className="flex justify-center mb-4">
              <div className="bg-background/50 p-2 rounded-full">
                <ShoppingBag className="h-8 w-8" />
              </div>
            </div>
            <CardTitle className="text-2xl">RecurX Sign In</CardTitle>
            <CardDescription>Access your merchant or user dashboard</CardDescription>
          </CardHeader>
          <CardContent className="p-6 space-y-4">
            {error === "OAuthAccountNotLinked" && (
              <p className="text-red-500 text-sm text-center">
                This Google account is not linked to a RecurX account. Please use a different account or contact support.
              </p>
            )}
            <Button
              onClick={() => signIn("google", { callbackUrl: "/role-selection" })}
              className="w-full bg-background hover:bg-primary/10 text-foreground border border-primary/30 flex items-center justify-center gap-2"
              variant="outline"
            >
              <Image src="/assets/google.svg" alt="Google" width={20} height={20} />
              Sign in with Google
            </Button>
            <div className="text-center text-sm text-foreground/80">
              Don't have an account?{" "}
              <span
                className="text-primary cursor-pointer hover:underline inline-flex items-center gap-1"
                onClick={() => router.push("/signup")}
              >
                <UserPlus size={14} />
                Sign up
              </span>
            </div>
          </CardContent>
          <div className="px-6 py-3 bg-background/50 border-t border-primary/20 text-xs text-center text-foreground/60">
            By signing in, you agree to our
            <a href="/termsofservice" className="text-primary hover:underline mx-1 inline-flex items-center">
              Terms of Service <ExternalLink size={10} className="ml-1" />
            </a>
            and
            <a href="/privacy-policy" className="text-primary hover:underline mx-1 inline-flex items-center">
              Privacy Policy <ExternalLink size={10} className="ml-1" />
            </a>
          </div>
          <p className="mt-4 text-sm text-center text-foreground/60">
            Need help?{" "}
            <a href="/contact" className="text-primary hover:underline inline-flex items-center">
              Contact support <HelpCircle size={12} className="ml-1" />
            </a>
          </p>
        </Card>
      </div>
    </div>
  );
}