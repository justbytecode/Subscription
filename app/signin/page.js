"use client"

import { signIn } from "next-auth/react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ShoppingBag, UserPlus, ExternalLink, HelpCircle, Sparkles, Shield, Zap, Globe } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"
import Image from "next/image"

export default function SignIn() {
  const [mounted, setMounted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()
  const error = searchParams.get("error")

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleGoogleSignIn = async () => {
    setIsLoading(true)
    try {
      await signIn("google", { callbackUrl: "/role-selection" })
    } catch (error) {
      console.error("Sign in error:", error)
    } finally {
      setIsLoading(false)
    }
  }

  if (!mounted) return null

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-black text-white relative overflow-hidden ">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-black rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-black rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-black rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse animation-delay-4000" />
      </div>

      {/* Desktop Left Branding */}
      <div className="hidden md:flex md:w-1/2 p-8 flex-col justify-center items-center relative max-sm:hidden  ">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 via-transparent to-blue-600/10 backdrop-blur-sm" />

        <div className="relative z-10 max-w-xl text-center space-y-8 ">
          <div className="flex justify-center mb-8">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full blur-lg opacity-50 animate-pulse" />
              <div className="relative bg-gradient-to-r from-blue-500 to-cyan-500 p-4 rounded-full">
                <ShoppingBag className="h-12 w-12 text-white" />
              </div>
            </div>
          </div>

          <div className="space-y-4 ">
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400 animate-gradient">
                RecurX
              </span>
            </h1>
            <p className="text-xl font-semibold text-white/90">
              Decentralized Payment Solution
            </p>
            <p className="text-lg text-white/70 leading-relaxed">
              Secure, fast, and transparent payments on the Polygon network. 
              Experience the future of decentralized commerce.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-6 mt-12">
            <div className="text-center group">
              <div className="bg-white/10 backdrop-blur-sm rounded-full p-3 mx-auto w-fit mb-2 group-hover:bg-white/20 transition-all duration-300">
                <Shield className="h-6 w-6 text-cyan-300" />
              </div>
              <p className="text-sm text-white/80">Secure</p>
            </div>
            <div className="text-center group">
              <div className="bg-white/10 backdrop-blur-sm rounded-full p-3 mx-auto w-fit mb-2 group-hover:bg-white/20 transition-all duration-300">
                <Zap className="h-6 w-6 text-blue-400" />
              </div>
              <p className="text-sm text-white/80">Fast</p>
            </div>
            <div className="text-center group">
              <div className="bg-white/10 backdrop-blur-sm rounded-full p-3 mx-auto w-fit mb-2 group-hover:bg-white/20 transition-all duration-300">
                <Globe className="h-6 w-6 text-teal-300" />
              </div>
              <p className="text-sm text-white/80">Global</p>
            </div>
          </div>
        </div>
      </div>

      

      {/* Right Side - Sign In */}
      <div className="w-full md:w-1/2 flex items-center justify-center px-4 py-8 relative">
        <div className="absolute inset-0 bg-black/20 backdrop-blur-sm md:bg-transparent md:backdrop-blur-none z-0" />

        <Card className="group w-full max-w-md shadow-2xl border-0 bg-blue-300 backdrop-blur-xl relative z-10 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          <CardHeader className="text-center bg-black text-white relative overflow-hidden">
            <div className="relative z-10">
              <div className="flex justify-center mb-4">
                <div className="bg-white/20 backdrop-blur-sm p-3 rounded-full animate-bounce-slow">
                  <ShoppingBag className="h-8 w-8 text-white" />
                </div>
              </div>
              <CardTitle className="text-2xl font-bold flex items-center justify-center gap-2">
                RecurX Sign In
                <Sparkles className="h-5 w-5 text-yellow-300 animate-pulse" />
              </CardTitle>
              <CardDescription className="text-white/90 mt-2">
                Access your merchant or user dashboard
              </CardDescription>
            </div>
          </CardHeader>

          <CardContent className="p-8 space-y-6 relative">
            {error === "OAuthAccountNotLinked" && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 animate-shake">
                <p className="text-red-600 text-sm text-center flex items-center justify-center gap-2">
                  <ExternalLink className="h-4 w-4" />
                  This Google account is not linked to a RecurX account. Please use a different account or contact support.
                </p>
              </div>
            )}

            <Button
              onClick={handleGoogleSignIn}
              disabled={isLoading}
              className="w-full bg-white hover:bg-gray-50 text-gray-700 border-2 border-gray-200 hover:border-cyan-300 flex items-center justify-center gap-3 h-12 text-base font-medium transition-all duration-300 hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] group relative overflow-hidden"
              variant="outline"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative z-10 flex items-center gap-3">
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    {/* ❗ Make sure this exists in `public/assets/` */}
                    <Image
                      src="/google.png"
                      alt="Google"
                      width={50}
                      height={50}
                      className="group-hover:scale-110 transition-transform duration-200"
                    />
                  </>
                )}
                {isLoading ? "Signing in..." : "Sign in with Google"}
              </div>
            </Button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-gray-500">New to RecurX?</span>
              </div>
            </div>

            <div className="text-center">
              <Button
                variant="ghost"
                onClick={() => router.push("/signup")}
                className="text-blue-600 hover:text-cyan-700 hover:bg-cyan-50 font-medium inline-flex items-center gap-2 transition-all duration-200 hover:scale-105"
              >
                <UserPlus size={16} />
                Create an account
              </Button>
            </div>
          </CardContent>

          <div className="px-8 py-4 bg-gray-50 border-t border-gray-100 text-xs text-center text-gray-600 leading-relaxed">
            By signing in, you agree to our{" "}
            <a href="/termsofservice" className="text-cyan-600 hover:text-cyan-700 hover:underline font-medium inline-flex items-center gap-1 transition-colors">
              Terms of Service <ExternalLink size={10} />
            </a>{" "}
            and{" "}
            <a href="/privacy-policy" className="text-cyan-600 hover:text-cyan-700 hover:underline font-medium inline-flex items-center gap-1 transition-colors">
              Privacy Policy <ExternalLink size={10} />
            </a>
          </div>

          <div className="px-8 py-3 text-center">
            <a
              href="/contact"
              className="text-sm text-gray-500 hover:text-purple-600 inline-flex items-center gap-2 transition-colors duration-200 hover:scale-105"
            >
              <HelpCircle size={14} />
              Need help? Contact support
            </a>
          </div>
        </Card>
      </div>
    </div>
  )
}
