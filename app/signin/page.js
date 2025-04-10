"use client";

import { signIn } from "next-auth/react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ShoppingBag, ArrowRight, DollarSign, Bitcoin } from "lucide-react";

export default function SignIn() {
  const [mounted, setMounted] = useState(false);

  
  useEffect(() => {
    setMounted(true);

    // Prevent scrolling on the body
    document.body.style.overflow = "hidden";

    return () => {
      // Restore scrolling when component unmounts
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col md:flex-row overflow-hidden bg-black w-full h-screen">
      {/* Left side - Animation and Heading - Hidden on mobile */}
      <div className="hidden md:flex w-full md:w-1/2 p-4 md:p-8 flex-col justify-center items-center text-white relative overflow-hidden h-full">
        {/* Logo at the top */}

        {/* Animated background */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-950"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(120,50,255,0.15),transparent_65%)]"></div>
        </div>

        {/* Grid lines */}
        <div className="absolute inset-0 z-0 grid-lines"></div>

        <div className="relative z-10 max-w-xl text-center md:text-left px-4 md:px-0 flex flex-col h-full justify-center">
          <h1 className="text-2xl sm:text-3xl md:text-4xl mt-25 mb-12 lg:text-5xl font-bold tracking-tight leading-tight animate-fade-in">
            <span className="text-transparent ml-25 bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
              RECURX
            </span>
            <br />
            <span className="text-transparent mt-30 ml-10 bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
              Decentralized
            </span>
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
              Payment Solution
            </span>
          </h1>
        </div>

        {mounted && (
          <div className="absolute bottom-0 left-0 right-0 h-40 z-0">
            <div className="h-px w-full bg-gradient-to-r from-transparent via-purple-500/30 to-transparent"></div>
          </div>
        )}
      </div>

      <div className="w-full md:w-1/2 flex items-center justify-center p-4 md:p-8 bg-black md:border-l md:border-purple-900/30 h-full p-none">
        <div className="w-full max-w-md mt-16 md:mt-0">
          <Card className="w-full max-w-md shadow-xl border border-purple-900/20 bg-black/80 backdrop-blur-sm overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-purple-900/20 pt-0" style={{"paddingTop":"-10px"}}>
            <CardHeader className="space-y-1 text-center bg-gradient-to-r from-purple-900/80 to-blue-900/80 text-white p-4 border-b border-purple-800/30">
              <div className="flex justify-center mb-2">
                <div className="bg-black/50 p-2 rounded-full border border-purple-500/30">
                  <ShoppingBag className="h-8 w-8 text-purple-400" />
                </div>
              </div>
              <CardTitle className="text-2xl font-bold text-white">
                Recurx For Merchant
              </CardTitle>
              <CardDescription className="text-gray-300">
                Sign in to access your merchant dashboard
              </CardDescription>
            </CardHeader>
            <CardContent className="p-4 pt-6 space-y-3">
              <div className="text-center text-sm text-gray-400 mb-4">
                Welcome back! Please sign in to continue to your account.
              </div>
              <Button
                onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
                className="w-full bg-black hover:bg-gray-900 text-white border border-purple-500/30 flex items-center justify-center gap-2 h-11 transition-all duration-200 hover:shadow-md hover:shadow-purple-900/20"
                variant="outline"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  className="w-5 h-5"
                >
                  <path
                    fill="#EA4335"
                    d="M5.26620003,9.76452941 C6.19878754,6.93863203 8.85444915,4.90909091 12,4.90909091 C13.6909091,4.90909091 15.2181818,5.50909091 16.4181818,6.49090909 L19.9090909,3 C17.7818182,1.14545455 15.0545455,0 12,0 C7.27006974,0 3.1977497,2.69829785 1.23999023,6.65002441 L5.26620003,9.76452941 Z"
                  />
                  <path
                    fill="#34A853"
                    d="M16.0407269,18.0125889 C14.9509167,18.7163016 13.5660892,19.0909091 12,19.0909091 C8.86648613,19.0909091 6.21911939,17.076871 5.27698177,14.2678769 L1.23746264,17.3349879 C3.19279051,21.2936293 7.26500293,24 12,24 C14.9328362,24 17.7353462,22.9573905 19.834192,20.9995801 L16.0407269,18.0125889 Z"
                  />
                  <path
                    fill="#4A90E2"
                    d="M19.834192,20.9995801 C22.0291676,18.9520994 23.4545455,15.903663 23.4545455,12 C23.4545455,11.2909091 23.3454545,10.5272727 23.1818182,9.81818182 L12,9.81818182 L12,14.4545455 L18.4363636,14.4545455 C18.1187732,16.013626 17.2662994,17.2212117 16.0407269,18.0125889 L19.834192,20.9995801 Z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.27698177,14.2678769 C5.03832634,13.556323 4.90909091,12.7937589 4.90909091,12 C4.90909091,11.2182781 5.03443647,10.4668121 5.26620003,9.76452941 L1.23999023,6.65002441 C0.43658717,8.26043162 0,10.0753848 0,12 C0,13.9195484 0.444780743,15.7301709 1.23746264,17.3349879 L5.27698177,14.2678769 Z"
                  />
                </svg>
                Sign in with Google
              </Button>
            </CardContent>
            <CardFooter className="px-4 py-3 bg-black/50 border-t border-purple-900/30 flex flex-col space-y-1">
              <div className="text-xs text-center text-gray-400">
                By signing in, you agree to our
                <a
                  href="/termsofservice"
                  className="text-purple-400 hover:text-purple-300 hover:underline mx-1"
                >
                  Terms of Service
                </a>
                and
                <a
                  href="privacy-policy"
                  className="text-purple-400 hover:text-purple-300 hover:underline mx-1"
                >
                  Privacy Policy
                </a>
              </div>
            </CardFooter>
          </Card>
          <p className="mt-6 text-sm text-center text-gray-400">
            Need help?{" "}
            <a
              href="/contact"
              className="text-purple-400 hover:text-purple-300 hover:underline"
            >
              Contact support
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
