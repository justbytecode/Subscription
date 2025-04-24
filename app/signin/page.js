"use client";

import { signIn } from "next-auth/react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { 
  ShoppingBag, 
  ArrowRight, 
  Eye, 
  EyeOff, 
  Mail, 
  Lock,
  HelpCircle,
  ExternalLink,
  UserPlus,
  AlertCircle
} from "lucide-react";
import { useRouter } from "next/navigation";

export default function SignIn() {
  const [mounted, setMounted] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const router = useRouter();

  useEffect(() => {
    setMounted(true);
    // Removed the code that prevents scrolling
  }, []);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      setEmailError("Email is required");
      return false;
    } else if (!emailRegex.test(email)) {
      setEmailError("Please enter a valid email address");
      return false;
    }
    setEmailError("");
    return true;
  };

  const validatePassword = (password) => {
    if (!password) {
      setPasswordError("Password is required");
      return false;
    } else if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters");
      return false;
    }
    setPasswordError("");
    return true;
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    if (value) {
      validateEmail(value);
    } else {
      setEmailError("");
    }
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    if (value) {
      validatePassword(value);
    } else {
      setPasswordError("");
    }
  };

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    
    // Validate inputs before proceeding
    const isEmailValid = validateEmail(email);
    const isPasswordValid = validatePassword(password);
    
    if (!isEmailValid || !isPasswordValid) {
      return;
    }
    
    setIsLoading(true);
    setLoginError("");

    // Alert the values (for demonstration purposes)
    alert(`Login attempt with:\nEmail: ${email}\nPassword: ${password}`);

    try {
      const result = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      if (result?.error) {
        setLoginError("Invalid email or password");
      } else {
        router.push("/dashboard");
      }
    } catch (error) {
      setLoginError("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-black w-full">
      <div className="hidden md:flex w-full md:w-1/2 p-4 md:p-8 flex-col justify-center items-center text-white relative">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-950"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(120,50,255,0.15),transparent_65%)]"></div>
        </div>

        <div className="absolute inset-0 z-0 grid-lines"></div>

        <div className="relative z-10 max-w-xl text-center md:text-left px-4 md:px-0 flex flex-col h-full justify-center">
          <h1 className="text-2xl sm:text-3xl md:text-4xl mb-12 lg:text-5xl font-bold tracking-tight leading-tight animate-fade-in">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
              RECURX
            </span>
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
              Decentralized
            </span>
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
              Payment Solution
            </span>
          </h1>
        </div>
      </div>

      <div className="w-full md:w-1/2 flex items-start md:items-center justify-center p-4 md:p-8 bg-black md:border-l md:border-purple-900/30 min-h-screen">
        <div className="w-full max-w-md py-4 md:py-8 z-40">
          <Card className="w-full shadow-xl border border-purple-900/20 bg-black/80 backdrop-blur-sm overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-purple-900/20 mt-9 sm:mt-0">
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
            <CardContent className="p-4 pt-6 space-y-4">
              <div className="text-center text-sm text-gray-400 mb-2">
                Welcome back! Please sign in to continue to your account.
              </div>
              
              {/* Email and Password Form */}
              <form onSubmit={handleEmailLogin} className="space-y-3">
                <div className="space-y-1">
                  <Label htmlFor="email" className="text-gray-200 flex items-center gap-1">
                    <Mail size={14} className="text-purple-400" />
                    Email
                  </Label>
                  <div className="relative">
                    <Input
                      id="email"
                      type="email"
                      placeholder="name@example.com"
                      value={email}
                      onChange={handleEmailChange}
                      onBlur={() => validateEmail(email)}
                      required
                      className={`bg-black/50 border-purple-900/30 text-white focus:border-purple-500 h-10 ${
                        emailError ? "border-red-500" : ""
                      }`}
                    />
                  </div>
                  {emailError && (
                    <div className="text-xs text-red-500 flex items-center gap-1 mt-1">
                      <AlertCircle size={12} />
                      {emailError}
                    </div>
                  )}
                </div>
                
                <div className="space-y-1">
                  <div className="flex justify-between">
                    <Label htmlFor="password" className="text-gray-200 flex items-center gap-1">
                      <Lock size={14} className="text-purple-400" />
                      Password
                    </Label>
                    {/* <a href="/forgot-password" className="text-xs text-purple-400 hover:text-purple-300 flex items-center gap-1">
                      <HelpCircle size={12} />
                      Forgot password?
                    </a> */}
                  </div>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"} 
                      placeholder="••••••••"
                      value={password}
                      onChange={handlePasswordChange}
                      onBlur={() => validatePassword(password)}
                      required
                      className={`bg-black/50 border-purple-900/30 text-white focus:border-purple-500 h-10 pr-10 ${
                        passwordError ? "border-red-500" : ""
                      }`}
                    />
                    <button
                      type="button"
                      onClick={togglePasswordVisibility}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300"
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                  {passwordError && (
                    <div className="text-xs text-red-500 flex items-center gap-1 mt-1">
                      <AlertCircle size={12} />
                      {passwordError}
                    </div>
                  )}
                </div>
                
                {loginError && (
                  <div className="text-sm text-red-500 flex items-center gap-1 mt-1">
                    <AlertCircle size={14} />
                    {loginError}
                  </div>
                )}
                
                <Button 
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white h-10 transition-all duration-200 flex items-center justify-center gap-2"
                >
                  {isLoading ? "Signing in..." : "Sign in with Email"}
                  <ArrowRight size={16} />
                </Button>
              </form>
              
              <div className="relative flex items-center justify-center my-4">
                <Separator className="bg-purple-900/30" />
                <span className="bg-black px-2 text-xs text-gray-400 absolute">OR</span>
              </div>
              
              <Button
                onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
                className="w-full bg-black hover:bg-gray-900 text-white border border-purple-500/30 flex items-center justify-center gap-2 h-10 transition-all duration-200 hover:shadow-md hover:shadow-purple-900/20"
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
              
              <div className="text-white text-center mt-4">
                Don&apos;t have an account? <span className="text-purple-400 cursor-pointer hover:underline inline-flex items-center gap-1" onClick={() => { router.push('/signup') }}>
                  <UserPlus size={14} />
                  Sign up
                </span> now to get started!
              </div>
            </CardContent>
            <CardFooter className="px-4 py-3 bg-black/50 border-t border-purple-900/30 flex flex-col space-y-1">
              <div className="text-xs text-center text-gray-400">
                By signing in, you agree to our
                <a
                  href="/termsofservice"
                  className="text-purple-400 hover:text-purple-300 hover:underline mx-1 inline-flex items-center"
                >
                  Terms of Service
                  <ExternalLink size={10} className="ml-1" />
                </a>
                and
                <a
                  href="privacy-policy"
                  className="text-purple-400 hover:text-purple-300 hover:underline mx-1 inline-flex items-center"
                >
                  Privacy Policy
                  <ExternalLink size={10} className="ml-1" />
                </a>
              </div>
            </CardFooter>
          </Card>
          <p className="mt-6 text-sm text-center text-gray-400">
            Need help?{" "}
            <a
              href="/contact"
              className="text-purple-400 hover:text-purple-300 hover:underline inline-flex items-center"
            >
              Contact support
              <HelpCircle size={12} className="ml-1" />
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}