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
import {
  ShoppingBag, ArrowRight, DollarSign, Bitcoin, User,
  Mail,
  Lock,
  CheckCircle,
  AlertCircle,
  Eye,
  EyeOff
} from "lucide-react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";


export default function SignIn() {
  const [mounted, setMounted] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [strengthText, setStrengthText] = useState("");
  const [strengthColor, setStrengthColor] = useState("bg-gray-500");

  const router = useRouter();


  useEffect(() => {
    setMounted(true);

    // Prevent scrolling on the body
    document.body.style.overflow = "hidden";

    return () => {
      // Restore scrolling when component unmounts
      document.body.style.overflow = "auto";
    };
  }, []);


  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const calculatePasswordStrength = (password) => {
    if (!password) return { strength: 0, text: "", color: "bg-gray-500" };
    
    // Define criteria
    const hasLength = password.length >= 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialChars = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    
    // Calculate score
    let score = 0;
    if (password.length >= 8) score += 1;
    if (password.length >= 12) score += 1;
    if (hasUpperCase) score += 1;
    if (hasLowerCase) score += 1;
    if (hasNumbers) score += 1;
    if (hasSpecialChars) score += 1;
    
    // Determine strength level
    let strength = 0;
    let text = "";
    let color = "";
    
    if (password.length === 0) {
      strength = 0;
      text = "";
      color = "bg-gray-500";
    } else if (score <= 2) {
      strength = 25;
      text = "Weak";
      color = "bg-red-500";
    } else if (score <= 3) {
      strength = 50;
      text = "Fair";
      color = "bg-orange-500";
    } else if (score <= 4) {
      strength = 75;
      text = "Good";
      color = "bg-yellow-500";
    } else {
      strength = 100;
      text = "Strong";
      color = "bg-green-500";
    }
    
    return { strength, text, color };
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Calculate password strength when password field changes
    if (name === "password") {
      const { strength, text, color } = calculatePasswordStrength(value);
      setPasswordStrength(strength);
      setStrengthText(text);
      setStrengthColor(color);
    }

    // Clear error when user starts typing
    setErrors(prev => ({
      ...prev,
      [name]: ""
    }));
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = {
      name: "",
      email: "",
      password: "",
      confirmPassword: ""
    };

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
      isValid = false;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Invalid email format";
      isValid = false;
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = "Password is required";
      isValid = false;
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
      isValid = false;
    }

    // Confirm password validation
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      // Submit form data
      alert(JSON.stringify(formData))
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row overflow-hidden bg-black w-full h-screen ">
      <div className="hidden md:flex w-full md:w-1/2 p-4 md:p-8 flex-col justify-center items-center text-white overflow-hidden h-full">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-950"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(120,50,255,0.15),transparent_65%)]"></div>
        </div>

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
      </div>

      <div className="w-full md:w-1/2 flex items-center justify-center md:p-8 bg-black md:border-l md:border-purple-900/30 h-full p-none relative z-40">
        <div className="w-full mt-26 md:mt-0">
          <Card className="w-full shadow-xl border border-purple-900/20 bg-black/80 backdrop-blur-sm overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-purple-900/20 pt-0">
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
                Create your merchant account
              </CardDescription>
            </CardHeader>
            
            <CardContent className="p-4 pt-6 space-y-3">
              <div className="text-center text-sm text-gray-400 mb-4">
                Sign up to start managing your business with our powerful tools.
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-4 flex flex-col items-center">
                <div className="space-y-2 w-full md:w-10/12">
                  <Label htmlFor="name" className="text-gray-300 flex items-center gap-2">
                    <User size={16} className="text-purple-400" />
                    Full Name
                  </Label>
                  <div className="relative">
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter your full name"
                      className="bg-gray-900/50 border-purple-900/30 text-white focus:border-purple-500 focus:ring-purple-500/20 pl-10"
                    />
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={16} />
                  </div>
                  {errors.name && (
                    <p className="text-xs text-red-400 flex items-center gap-1">
                      <AlertCircle size={12} /> {errors.name}
                    </p>
                  )}
                </div>
                
                <div className="space-y-2 w-full md:w-10/12">
                  <Label htmlFor="email" className="text-gray-300 flex items-center gap-2">
                    <Mail size={16} className="text-purple-400" />
                    Email Address
                  </Label>
                  <div className="relative">
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="your@email.com"
                      className="bg-gray-900/50 border-purple-900/30 text-white focus:border-purple-500 focus:ring-purple-500/20 pl-10"
                    />
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={16} />
                  </div>
                  {errors.email && (
                    <p className="text-xs text-red-400 flex items-center gap-1">
                      <AlertCircle size={12} /> {errors.email}
                    </p>
                  )}
                </div>
                
                <div className="space-y-2 w-full md:w-10/12">
                  <Label htmlFor="password" className="text-gray-300 flex items-center gap-2">
                    <Lock size={16} className="text-purple-400" />
                    Password
                  </Label>
                  <div className="relative">
                    <Input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Create a strong password"
                      className="bg-gray-900/50 border-purple-900/30 text-white focus:border-purple-500 focus:ring-purple-500/20 pl-10 pr-10"
                    />
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={16} />
                    <button 
                      type="button" 
                      onClick={togglePasswordVisibility}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-purple-400 focus:outline-none"
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                  
                  {/* Password strength meter */}
                  <div className="mt-2 w-full">
                    <div className="h-1 w-full bg-gray-800 rounded-full overflow-hidden">
                      <div 
                        className={`h-full ${strengthColor} transition-all duration-300 ease-in-out`} 
                        style={{ width: `${passwordStrength}%` }}
                      ></div>
                    </div>
                    <div className="flex justify-between mt-1">

                      <span className={`text-xs font-medium ${
                        strengthColor === "bg-red-500" ? "text-red-500" : 
                        strengthColor === "bg-orange-500" ? "text-orange-500" :
                        strengthColor === "bg-yellow-500" ? "text-yellow-500" :
                        strengthColor === "bg-green-500" ? "text-green-500" : "text-gray-400"
                      }`}>
                        {strengthText}
                      </span>
                    </div>
                  </div>
                  
                  {errors.password && (
                    <p className="text-xs text-red-400 flex items-center gap-1">
                      <AlertCircle size={12} /> {errors.password}
                    </p>
                  )}
                </div>
                
                <div className="space-y-2 w-full md:w-10/12">
                  <Label htmlFor="confirmPassword" className="text-gray-300 flex items-center gap-2">
                    <CheckCircle size={16} className="text-purple-400" />
                    Confirm Password
                  </Label>
                  <div className="relative">
                    <Input
                      id="confirmPassword"
                      name="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      placeholder="Confirm your password"
                      className="bg-gray-900/50 border-purple-900/30 text-white focus:border-purple-500 focus:ring-purple-500/20 pl-10 pr-10"
                    />
                    <CheckCircle className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={16} />
                    <button 
                      type="button" 
                      onClick={toggleConfirmPasswordVisibility}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-purple-400 focus:outline-none"
                    >
                      {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                  {errors.confirmPassword && (
                    <p className="text-xs text-red-400 flex items-center gap-1">
                      <AlertCircle size={12} /> {errors.confirmPassword}
                    </p>
                  )}
                </div>
                
                <Button 
                  type="submit"
                  className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white h-11 transition-all duration-200 mt-6 space-y-2 md:w-10/12"
                >
                  Create Account
                </Button>
              </form>
              
              <div className="text-white text-center my-2">
                Already have an account? <span className="text-purple-400 cursor-pointer" onClick={() => { router.push('/signin') }}>Sign in</span> instead.
              </div>
            </CardContent>
            
            <CardFooter className="px-4 py-3 bg-black/50 border-t border-purple-900/30 flex flex-col space-y-1">
              <div className="text-xs text-center text-gray-400">
                By signing up, you agree to our
                <a
                  href="/termsofservice"
                  className="text-purple-400 hover:text-purple-300 hover:underline mx-1"
                >
                  Terms of Service
                </a>
                and
                <a
                  href="/privacy-policy"
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