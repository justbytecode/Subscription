"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Copy } from "lucide-react";
import { subscriptionABI } from "@/lib/subscriptionABI";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function IntegrationClient({ plans: initialPlans }) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [plans, setPlans] = useState(initialPlans);
  const apiKey = session?.user?.apiKey || "YOUR_API_KEY"; // Fallback for testing

  // Redirect to login if not authenticated
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  // Fetch plans dynamically if a planId is provided in the query
  useEffect(() => {
    const fetchPlans = async () => {
      if (!session || !session.user?.id) return;

      const userId = session.user.id;
      const urlParams = new URLSearchParams(window.location.search);
      const planId = urlParams.get("planId");

      try {
        const response = await fetch(`/api/plans?userId=${userId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch plans");
        }
        const fetchedPlans = await response.json();
        if (planId) {
          const filteredPlans = fetchedPlans.filter((plan) => plan.id === planId);
          setPlans(filteredPlans);
        } else {
          setPlans(fetchedPlans);
        }
      } catch (error) {
        console.error("Failed to fetch plans:", error);
        setPlans([]);
      }
    };

    fetchPlans();
  }, [session]);

  const generateJsCodeSnippet = (plan) => {
    return `
<button onclick="subscribe('${plan.contractAddress}', '${plan.id}')">Subscribe to ${plan.name}</button>
<script src="https://cdn.ethers.io/lib/ethers-5.7.umd.min.js"></script>
<script>
  async function subscribe(contractAddress, planId) {
    if (!window.ethereum) {
      alert("Please install MetaMask to subscribe");
      return;
    }
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(contractAddress, ${JSON.stringify(subscriptionABI)}, signer);
      const tx = await contract.subscribe(planId, { value: ethers.utils.parseEther("${plan.price}") });
      await tx.wait();
      alert("Subscription successful! Transaction: " + tx.hash);
    } catch (error) {
      console.error("Subscription failed:", error);
      alert("Failed to subscribe: " + error.message);
    }
  }
</script>
    `.trim();
  };

  const generateTsCodeSnippet = (plan) => {
    return `
import { ethers } from "ethers";

// ABI for the Subscription contract
const subscriptionABI = ${JSON.stringify(subscriptionABI, null, 2)};

// Function to subscribe to a plan
async function subscribe(contractAddress: string, planId: string): Promise<void> {
  if (!window.ethereum) {
    alert("Please install MetaMask to subscribe");
    return;
  }

  try {
    const provider = new ethers.BrowserProvider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, subscriptionABI, signer);
    const tx = await contract.subscribe(planId, { value: ethers.parseEther("${plan.price}") });
    await tx.wait();
    alert("Subscription successful! Transaction: " + tx.hash);
  } catch (error) {
    console.error("Subscription failed:", error);
    alert("Failed to subscribe: " + error.message);
  }
}

// Usage in your React component
<button onClick={() => subscribe('${plan.contractAddress}', '${plan.id}')}>
  Subscribe to ${plan.name}
</button>
    `.trim();
  };

  const generateApiCodeSnippet = (plan) => {
    return `
# Subscribe to a plan via API
# API Endpoint: POST /api/subscribe
# Headers: Authorization: Bearer ${apiKey}

# Example using Fetch (JavaScript)
fetch('/api/subscribe', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer ${apiKey}',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    planId: '${plan.id}',
    userWalletAddress: 'YOUR_USER_WALLET_ADDRESS',
  }),
})
  .then(response => response.json())
  .then(data => console.log('Subscription successful:', data))
  .catch(error => console.error('Subscription failed:', error));

# Example using Axios (JavaScript)
axios.post('/api/subscribe', {
  planId: '${plan.id}',
  userWalletAddress: 'YOUR_USER_WALLET_ADDRESS',
}, {
  headers: {
    'Authorization': 'Bearer ${apiKey}',
  },
})
  .then(response => console.log('Subscription successful:', response.data))
  .catch(error => console.error('Subscription failed:', error));
    `.trim();
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    alert("Code copied to clipboard!");
  };

  const safePlans = Array.isArray(plans) ? plans : [];

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-800">Integration Tools</h1>
      <p className="text-gray-600">
        Your API Key: <span className="text-blue-600">{apiKey}</span> (Keep this secure and do not share publicly)
      </p>
      {safePlans.length === 0 ? (
        <p className="text-gray-600">No subscription plans found. Create a plan first in the Plans section.</p>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {safePlans.map((plan) => (
            <Card key={plan.id} className="bg-white shadow-md">
              <CardHeader>
                <CardTitle className="text-lg text-gray-700">{plan.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-2">Smart Contract Address: {plan.contractAddress}</p>
                <Tabs defaultValue="javascript" className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="javascript">JavaScript</TabsTrigger>
                    <TabsTrigger value="typescript">TypeScript</TabsTrigger>
                    <TabsTrigger value="api">API</TabsTrigger>
                  </TabsList>
                  <TabsContent value="javascript">
                    <pre className="bg-gray-100 p-4 rounded-lg text-sm text-gray-800 overflow-x-auto">
                      {generateJsCodeSnippet(plan)}
                    </pre>
                    <Button
                      variant="outline"
                      className="mt-4"
                      onClick={() => copyToClipboard(generateJsCodeSnippet(plan))}
                    >
                      <Copy className="h-4 w-4 mr-2" /> Copy JavaScript Code
                    </Button>
                  </TabsContent>
                  <TabsContent value="typescript">
                    <pre className="bg-gray-100 p-4 rounded-lg text-sm text-gray-800 overflow-x-auto">
                      {generateTsCodeSnippet(plan)}
                    </pre>
                    <Button
                      variant="outline"
                      className="mt-4"
                      onClick={() => copyToClipboard(generateTsCodeSnippet(plan))}
                    >
                      <Copy className="h-4 w-4 mr-2" /> Copy TypeScript Code
                    </Button>
                  </TabsContent>
                  <TabsContent value="api">
                    <pre className="bg-gray-100 p-4 rounded-lg text-sm text-gray-800 overflow-x-auto">
                      {generateApiCodeSnippet(plan)}
                    </pre>
                    <Button
                      variant="outline"
                      className="mt-4"
                      onClick={() => copyToClipboard(generateApiCodeSnippet(plan))}
                    >
                      <Copy className="h-4 w-4 mr-2" /> Copy API Code
                    </Button>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

export const dynamic = "force-dynamic"; // Force dynamic rendering to avoid caching