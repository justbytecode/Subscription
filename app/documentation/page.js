"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { ChevronDown, ChevronRight, Copy, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function DocumentationPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white pt-24 pb-16">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Mobile Sidebar Toggle */}
          <div className="lg:hidden flex justify-between items-center mb-4">
            <Button
              variant="outline"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="text-gray-300 border-gray-700"
            >
              {isSidebarOpen ? "Hide Menu" : "Show Menu"}
              {isSidebarOpen ? <ChevronDown className="ml-2 h-4 w-4" /> : <ChevronRight className="ml-2 h-4 w-4" />}
            </Button>

            <div className="relative w-full max-w-xs ml-4">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                placeholder="Search docs..."
                className="pl-8 bg-gray-800 border-gray-700 text-gray-300 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Sidebar */}
          <motion.aside
            className={`w-full lg:w-64 shrink-0 ${isSidebarOpen ? "block" : "hidden"} lg:block`}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="sticky top-24 bg-gray-800/50 backdrop-blur-sm rounded-lg border border-gray-700 p-4">
              <div className="hidden lg:block mb-6">
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                  <Input
                    placeholder="Search docs..."
                    className="pl-8 bg-gray-800 border-gray-700 text-gray-300 focus:ring-blue-500"
                  />
                </div>
              </div>

              <nav className="space-y-1">
                <p className="text-sm font-medium text-gray-400 py-2">Getting Started</p>
                <NavItem href="#introduction" active>
                  Introduction
                </NavItem>
                <NavItem href="#installation">Installation</NavItem>
                <NavItem href="#quick-start">Quick Start</NavItem>

                <p className="text-sm font-medium text-gray-400 py-2 mt-4">Core Concepts</p>
                <NavItem href="#authentication">Authentication</NavItem>
                <NavItem href="#payments">Payments</NavItem>
                <NavItem href="#webhooks">Webhooks</NavItem>

                <p className="text-sm font-medium text-gray-400 py-2 mt-4">API Reference</p>
                <NavItem href="#rest-api">REST API</NavItem>
                <NavItem href="#graphql-api">GraphQL API</NavItem>
                <NavItem href="#sdk">SDK</NavItem>
              </nav>
            </div>
          </motion.aside>

          {/* Main Content */}
          <motion.main
            className="flex-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg border border-gray-700 p-6 md:p-8">
              <div className="prose prose-invert max-w-none">
                <h1
                  id="introduction"
                  className="text-3xl md:text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500"
                >
                  LoopPay Developer Documentation
                </h1>

                <p className="text-xl text-gray-300 mb-8">
                  Welcome to the LoopPay developer documentation. Here you'll find comprehensive guides and
                  documentation to help you start working with LoopPay as quickly as possible.
                </p>

                <h2 id="installation" className="text-2xl font-bold mt-12 mb-4">
                  Installation
                </h2>
                <p className="mb-4">
                  Get started with LoopPay by installing our SDK using your preferred package manager:
                </p>

                <div className="relative mb-6">
                  <Tabs defaultValue="npm">
                    <TabsList className="bg-gray-900 border-gray-700">
                      <TabsTrigger value="npm">npm</TabsTrigger>
                      <TabsTrigger value="yarn">yarn</TabsTrigger>
                      <TabsTrigger value="pnpm">pnpm</TabsTrigger>
                    </TabsList>
                    <TabsContent value="npm" className="mt-2">
                      <CodeBlock>npm install @looppay/sdk</CodeBlock>
                    </TabsContent>
                    <TabsContent value="yarn" className="mt-2">
                      <CodeBlock>yarn add @looppay/sdk</CodeBlock>
                    </TabsContent>
                    <TabsContent value="pnpm" className="mt-2">
                      <CodeBlock>pnpm add @looppay/sdk</CodeBlock>
                    </TabsContent>
                  </Tabs>
                </div>

                <h2 id="quick-start" className="text-2xl font-bold mt-12 mb-4">
                  Quick Start
                </h2>
                <p className="mb-4">Initialize the LoopPay client with your API key:</p>

                <CodeBlock language="javascript">
                  {`import { LoopPay } from '@looppay/sdk';

// Initialize the client
const looppay = new LoopPay({
  apiKey: 'your_api_key',
  environment: 'sandbox' // or 'production'
});

// Create a payment
async function createPayment() {
  try {
    const payment = await looppay.payments.create({
      amount: 1000, // $10.00
      currency: 'USD',
      description: 'Order #1234',
      customer: {
        email: 'customer@example.com'
      }
    });
    
    console.log(payment);
  } catch (error) {
    console.error(error);
  }
}`}
                </CodeBlock>

                <h2 id="authentication" className="text-2xl font-bold mt-12 mb-4">
                  Authentication
                </h2>
                <p>
                  All requests to the LoopPay API require authentication. You can authenticate your requests by
                  including your API key in the Authorization header:
                </p>

                <CodeBlock language="bash">
                  {`curl -X GET \\
  https://api.looppay.io/v1/payments \\
  -H "Authorization: Bearer your_api_key"`}
                </CodeBlock>

                <div className="bg-blue-900/30 border border-blue-700/50 rounded-lg p-4 my-8">
                  <h3 className="text-blue-400 text-lg font-medium mb-2">Security Note</h3>
                  <p className="text-gray-300 mb-0">
                    Never expose your API keys in client-side code. Always use a backend service to make authenticated
                    requests to the LoopPay API.
                  </p>
                </div>

                <h2 id="payments" className="text-2xl font-bold mt-12 mb-4">
                  Payments
                </h2>
                <p>
                  The Payments API allows you to create, retrieve, update, and list payments. A payment represents a
                  charge on a customer's payment method.
                </p>

                <h3 className="text-xl font-semibold mt-6 mb-3">Creating a Payment</h3>
                <p className="mb-4">To create a payment, you need to specify at least the amount and currency:</p>

                <CodeBlock language="javascript">
                  {`const payment = await looppay.payments.create({
  amount: 2000, // $20.00
  currency: 'USD',
  description: 'Premium subscription',
  payment_method: 'pm_card_visa',
  confirm: true
});`}
                </CodeBlock>

                <h2 id="webhooks" className="text-2xl font-bold mt-12 mb-4">
                  Webhooks
                </h2>
                <p>
                  Webhooks allow you to receive real-time notifications about events that happen in your LoopPay
                  account. For example, you can use webhooks to be notified when a payment is successful or when a
                  subscription is canceled.
                </p>

                <p className="mt-4">
                  To use webhooks, you need to create a webhook endpoint on your server and register it in the LoopPay
                  dashboard.
                </p>
              </div>
            </div>
          </motion.main>
        </div>
      </div>
    </div>
  )
}

function NavItem({ href, active, children }) {
  return (
    <Link
      href={href}
      className={`flex items-center px-3 py-2 text-sm rounded-md transition-colors ${
        active ? "bg-blue-900/30 text-blue-400" : "text-gray-300 hover:bg-gray-700/50 hover:text-white"
      }`}
    >
      {children}
    </Link>
  )
}

function CodeBlock({ language = "bash", children }) {
  const copyToClipboard = () => {
    if (typeof children === "string") {
      navigator.clipboard.writeText(children)
    }
  }

  return (
    <div className="relative group">
      <pre className="bg-gray-900 border border-gray-700 rounded-lg p-4 overflow-x-auto">
        <code className="text-sm text-gray-300 font-mono">{children}</code>
      </pre>
      <button
        onClick={copyToClipboard}
        className="absolute top-2 right-2 p-2 rounded-md bg-gray-800 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity hover:text-white"
        aria-label="Copy code"
      >
        <Copy className="h-4 w-4" />
      </button>
    </div>
  )
}

