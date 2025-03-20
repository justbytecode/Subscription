// /dashboard/plans/page.js
"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";
import { ethers } from "ethers";
import { subscriptionABI } from "@/lib/subscriptionABI";
import { saveSubscriptionPlan } from "@/actions/plans";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useSession } from "next-auth/react";

// Contract address (replace with the deployed contract address)
const CONTRACT_ADDRESS = ""; 
// Update this with the actual address

export default function PlansClient({ wallet: initialWallet, plans: initialPlans, userId }) {
  // State management
  const [wallet, setWallet] = useState(initialWallet);
  const [plans, setPlans] = useState(initialPlans);
  const [isCreating, setIsCreating] = useState(false);
  const [isUpdating, setIsUpdating] = useState(null); // Track plan being updated
  const [error, setError] = useState(null);
  const [balance, setBalance] = useState(null);
  const [walletChainId, setWalletChainId] = useState(null);
  const [isBalanceLoading, setIsBalanceLoading] = useState(false);
  const router = useRouter();
  const { data: session, status } = useSession();

  // Log the received props immediately
  console.log("PlansClient - Received props:", { initialWallet, initialPlans, userId });

  // Redirect to login if not authenticated
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  // Validate userId at the component level
  useEffect(() => {
    if (status === "authenticated" && (!userId || typeof userId !== "string" || userId.trim() === "")) {
      console.error("Invalid userId at component initialization:", userId);
      setError("User not authenticated. Please log in to create a subscription plan.");
    }
  }, [userId, status]);

  // Sync wallet state with local storage and initialWallet
  useEffect(() => {
    console.log("PlansClient - Initial wallet prop:", initialWallet);

    if (initialWallet) {
      setWallet(initialWallet);
      localStorage.setItem("connectedWallet", JSON.stringify(initialWallet));
    } else {
      const storedWallet = localStorage.getItem("connectedWallet");
      if (storedWallet) {
        const parsedWallet = JSON.parse(storedWallet);
        setWallet(parsedWallet);
      }
    }
  }, [initialWallet]);

  // Fetch wallet balance and chain ID when wallet is connected
  useEffect(() => {
    const fetchWalletData = async () => {
      if (wallet && wallet.address && window.ethereum) {
        setIsBalanceLoading(true);
        try {
          const provider = new ethers.BrowserProvider(window.ethereum);

          const network = await provider.getNetwork();
          const chainId = network.chainId.toString();
          setWalletChainId(chainId);
          console.log("Wallet chain ID:", chainId);

          const balanceWei = await provider.getBalance(wallet.address);
          const balanceEth = ethers.formatEther(balanceWei);
          setBalance(balanceEth);
          console.log("Wallet balance fetched:", balanceEth, "ETH");
        } catch (err) {
          console.error("Failed to fetch wallet data:", err);
          setError("Failed to fetch wallet data: " + err.message);
        } finally {
          setIsBalanceLoading(false);
        }
      }
    };

    fetchWalletData();
  }, [wallet]);

  // Fetch plans dynamically when userId is available
  useEffect(() => {
    const fetchPlans = async () => {
      if (!userId) return;

      try {
        const response = await fetch(`/api/plans?userId=${userId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch plans");
        }
        const fetchedPlans = await response.json();
        setPlans(fetchedPlans);
      } catch (error) {
        console.error("Failed to fetch plans:", error);
        setPlans([]);
      }
    };

    fetchPlans();
  }, [userId]);

  const handleCreateOrUpdatePlan = async (formData, planId = null) => {
    if (!wallet || !wallet.address) {
      setError("Wallet not connected. Please connect your MetaMask wallet.");
      return;
    }

    console.log("handleCreateOrUpdatePlan called with formData:", formData, "planId:", planId);
    setIsCreating(true);
    setError(null);

    try {
      // Step 1: Validate wallet connection
      console.log("Step 1: Validating wallet connection");
      if (!window.ethereum) {
        throw new Error("MetaMask not installed.");
      }

      // Step 2: Validate userId
      console.log("Step 2: Validating userId:", userId);
      if (!userId || typeof userId !== "string" || userId.trim() === "") {
        throw new Error("Invalid user ID. Please log in again.");
      }

      // Step 3: Set up Ethereum provider and check network
      console.log("Step 3: Setting up Ethereum provider");
      const provider = new ethers.BrowserProvider(window.ethereum);

      const network = await provider.getNetwork();
      const chainId = network.chainId.toString();
      console.log("Current network chain ID:", chainId);
      if (chainId !== "11155111") {
        throw new Error("Please switch MetaMask to the Sepolia testnet (Chain ID: 11155111).");
      }

      // Step 4: Request accounts from MetaMask
      console.log("Step 4: Requesting accounts from MetaMask");
      const accounts = await provider.send("eth_requestAccounts", []);
      console.log("MetaMask accounts:", accounts);

      if (!accounts || accounts.length === 0) {
        throw new Error("No accounts found. Please approve the connection in MetaMask.");
      }

      const signer = await provider.getSigner();
      const walletAddress = await signer.getAddress();
      console.log("Interacting with contract with wallet address:", walletAddress);

      // Step 5: Verify wallet balance
      console.log("Step 5: Verifying wallet balance");
      const balanceWei = await provider.getBalance(walletAddress);
      const balanceEth = ethers.formatEther(balanceWei);
      console.log("Wallet balance:", balanceEth, "ETH");
      if (parseFloat(balanceEth) < 0.001) {
        throw new Error("Insufficient funds. Your wallet needs at least 0.001 ETH for gas fees.");
      }

      // Step 6: Extract and validate form data
      console.log("Step 6: Extracting and validating form data");
      const name = formData.get("name")?.trim() || "";
      const price = formData.get("price")?.trim() || "";
      const interval = formData.get("interval")?.trim() || "";

      if (!name) {
        throw new Error("Plan name is required.");
      }
      if (!price) {
        throw new Error("Price is required.");
      }
      if (!interval) {
        throw new Error("Interval is required.");
      }

      const parsedPrice = parseFloat(price);
      if (isNaN(parsedPrice) || parsedPrice <= 0) {
        throw new Error("Price must be a valid positive number.");
      }

      if (!["monthly", "daily"].includes(interval.toLowerCase())) {
        throw new Error("Interval must be either 'monthly' or 'daily'.");
      }

      console.log("Form data:", { name, price, interval });

      // Step 7: Get platform owner address
      console.log("Step 7: Getting platform owner address");
      const platformOwner = process.env.NEXT_PUBLIC_PLATFORM_OWNER_ADDRESS;
      console.log("Platform owner address:", platformOwner);
      if (!platformOwner) {
        throw new Error("Platform owner address not configured in environment variables.");
      }

      if (!ethers.isAddress(platformOwner)) {
        throw new Error("Invalid platform owner address in environment variables.");
      }

      // Step 8: Convert price to wei
      console.log("Step 8: Converting price to wei");
      const priceInWei = ethers.parseEther(price.toString());
      console.log("Price in wei:", priceInWei.toString());

      // Step 9: Determine interval in seconds
      console.log("Step 9: Determining interval in seconds");
      const intervalSeconds = interval.toLowerCase() === "monthly" ? 2592000 : 86400;
      console.log("Interval in seconds:", intervalSeconds);

      // Step 10: Interact with the deployed contract
      console.log("Step 10: Interacting with deployed contract");
      const contract = new ethers.Contract(CONTRACT_ADDRESS, subscriptionABI, signer);

      let tx;
      if (planId) {
        // Update existing plan
        tx = await contract.updatePlan(planId, priceInWei, intervalSeconds, { gasLimit: 300000 });
        console.log("Updating plan with planId:", planId);
      } else {
        // Create new plan
        tx = await contract.createPlan(priceInWei, intervalSeconds, { gasLimit: 300000 });
        console.log("Creating new plan");
      }

      console.log("Waiting for transaction...");
      const receipt = await tx.wait();
      console.log("Transaction receipt:", receipt);

      const event = receipt.logs
        .map((log) => contract.interface.parseLog(log))
        .find((parsedLog) => parsedLog?.name === (planId ? "PlanUpdated" : "PlanCreated"));

      if (!event) {
        throw new Error("Failed to find plan creation/update event in transaction logs");
      }

      const newPlanId = event.args[0].toString();
      console.log("Plan ID from event:", newPlanId);

      // Step 11: Prepare data for saveSubscriptionPlan
      console.log("Step 11: Preparing data for saveSubscriptionPlan");
      const planData = {
        name,
        price,
        interval,
        contractAddress: CONTRACT_ADDRESS,
        userId,
        planId: newPlanId,
      };
      console.log("Values passed to saveSubscriptionPlan:", planData);

      // Step 12: Save the plan to the database
      console.log("Step 12: Saving the plan to the database");
      const result = await saveSubscriptionPlan(planData);
      console.log("Save subscription plan result:", result);

      if (!result.success || !result.plan || !result.plan.id) {
        throw new Error("Failed to save subscription plan: No plan ID returned.");
      }

      // Step 13: Redirect to integration page with planId
      console.log("Step 13: Redirecting to integration page with planId:", result.plan.id);
      router.push(`/dashboard/integration?planId=${result.plan.id}`);
    } catch (err) {
      console.error("Failed to create/update plan:", err);
      let errorMessage = err.message || "An unexpected error occurred.";
      if (err.code === "INSUFFICIENT_FUNDS") {
        errorMessage = "Insufficient funds in your wallet for gas fees. Please add more ETH.";
      } else if (err.code === "NETWORK_ERROR") {
        errorMessage = "Network error. Please ensure MetaMask is connected to the Sepolia testnet.";
      } else if (err.message.includes("user rejected")) {
        errorMessage = "Transaction rejected by user. Please approve the transaction in MetaMask.";
      } else if (err.reason) {
        errorMessage += ` (Reason: ${err.reason})`;
      } else if (err.message.includes("nonce")) {
        errorMessage = "Nonce issue detected. Please reset your MetaMask account.";
      }
      setError(errorMessage);
    } finally {
      setIsCreating(false);
      setIsUpdating(null);
      console.log("handleCreateOrUpdatePlan completed");
    }
  };

  const handleDeletePlan = async (planId) => {
    if (!wallet || !wallet.address) {
      setError("Wallet not connected. Please connect your MetaMask wallet.");
      return;
    }

    setIsCreating(true);
    setError(null);

    try {
      if (!window.ethereum) {
        throw new Error("MetaMask not installed.");
      }

      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(CONTRACT_ADDRESS, subscriptionABI, signer);

      const tx = await contract.deletePlan(planId, { gasLimit: 300000 });
      const receipt = await tx.wait();

      const event = receipt.logs
        .map((log) => contract.interface.parseLog(log))
        .find((parsedLog) => parsedLog?.name === "PlanDeleted");

      if (!event || event.args[0].toString() !== planId) {
        throw new Error("Failed to find plan deletion event in transaction logs");
      }

      // Remove plan from local state (optimistic update)
      setPlans(plans.filter((plan) => plan.planId !== planId.toString()));

      // Update database (optional, depending on your backend)
      await fetch(`/api/plans/${planId}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });

      console.log("Plan deleted successfully:", planId);
    } catch (err) {
      console.error("Failed to delete plan:", err);
      setError("Failed to delete plan: " + (err.message || "Unknown error"));
    } finally {
      setIsCreating(false);
      console.log("handleDeletePlan completed");
    }
  };

  // Ensure plans is an array
  const safePlans = Array.isArray(plans) ? plans : [];

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-800">Subscription Plans</h1>

      {/* Wallet Status */}
      <Card className="bg-white shadow-md">
        <CardHeader>
          <CardTitle className="text-lg text-gray-700">Connected Wallet</CardTitle>
        </CardHeader>
        <CardContent>
          {wallet && wallet.address ? (
            <div>
              <p className="text-gray-700">
                <span className="font-semibold">Wallet Address:</span>{" "}
                <span className="text-blue-600">{wallet.address}</span>
              </p>
              <p className="text-gray-700">
                <span className="font-semibold">Network:</span>{" "}
                <span className="text-blue-600">
                  {walletChainId === "11155111"
                    ? "Sepolia Testnet"
                    : walletChainId
                    ? `Unknown Network (Chain ID: ${walletChainId})`
                    : "Fetching..."}
                </span>
              </p>
              <p className="text-gray-700">
                <span className="font-semibold">Balance:</span>{" "}
                <span className="text-blue-600">
                  {isBalanceLoading ? "Fetching..." : balance ? `${balance} ETH` : "Unable to fetch balance"}
                </span>
              </p>
              <p className="text-sm text-gray-500">This wallet will be used to manage subscription plans.</p>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-yellow-600" />
              <p className="text-yellow-700">
                No wallet connected. Please connect your MetaMask wallet to manage plans.
                <Link href="/dashboard/wallet" className="text-blue-600 hover:underline ml-1">
                  Connect Wallet
                </Link>
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Plan Creation/Update */}
      <Card className="bg-white shadow-md">
        <CardHeader>
          <CardTitle className="text-lg text-gray-700">
            {isUpdating ? "Update Plan" : "Create New Plan"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {error && <p className="text-red-600 mb-4">{error}</p>}
          {!wallet || !wallet.address ? (
            <p className="text-gray-600">
              Connect your wallet to create a new subscription plan.{" "}
              <Link href="/dashboard/wallet" className="text-blue-600 hover:underline">
                Connect Wallet
              </Link>
            </p>
          ) : error && error.includes("User not authenticated") ? (
            <p className="text-gray-600">
              Please log in to manage plans.{" "}
              <Link href="/login" className="text-blue-600 hover:underline">
                Log In
              </Link>
            </p>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.target);
                handleCreateOrUpdatePlan(formData, isUpdating);
              }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Input
                name="name"
                placeholder="Plan Name"
                defaultValue={isUpdating ? plans.find((p) => p.planId === isUpdating)?.name : ""}
                required
                className="flex-1"
              />
              <Input
                name="price"
                type="number"
                step="0.01"
                placeholder="Price (ETH)"
                defaultValue={isUpdating ? plans.find((p) => p.planId === isUpdating)?.price : ""}
                required
                className="flex-1"
              />
              <select
                name="interval"
                defaultValue={isUpdating ? plans.find((p) => p.planId === isUpdating)?.interval : "monthly"}
                required
                className="flex-1 border rounded px-3 py-2"
              >
                <option value="yearly">Yearly</option>
                <option value="monthly">Monthly</option>
                <option value="weekly">Weekly</option>
                <option value="daily">Daily</option>
              </select>
              <Button type="submit" className="bg-blue-600 hover:bg-blue-700" disabled={isCreating}>
                {isCreating ? (isUpdating ? "Updating..." : "Creating...") : isUpdating ? "Update Plan" : "Add Plan"}
              </Button>
              {isUpdating && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsUpdating(null)}
                  className="bg-gray-200 hover:bg-gray-300"
                >
                  Cancel
                </Button>
              )}
            </form>
          )}
        </CardContent>
      </Card>

      {/* Plans List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {safePlans.length === 0 ? (
          <p className="text-gray-600">No subscription plans found.</p>
        ) : (
          safePlans.map((plan) => (
            <Card key={plan.id} className="bg-white shadow-md hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-lg text-gray-700">{plan.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-semibold text-blue-600">{plan.price} ETH</p>
                <p className="text-gray-600">{plan.interval}</p>
                <p className="text-sm text-gray-500 mt-2">Plan ID: {plan.planId}</p>
                <p className="text-sm text-gray-500">Contract: {plan.contractAddress}</p>
                <div className="mt-4 space-x-2">
                  <Button
                    variant="outline"
                    onClick={() => setIsUpdating(plan.planId)}
                    className="text-blue-500 hover:text-blue-700"
                    disabled={!wallet || !wallet.address}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => handleDeletePlan(plan.planId)}
                    className="text-red-500 hover:text-red-700"
                    disabled={!wallet || !wallet.address}
                  >
                    Delete
                  </Button>
                  <Button variant="link" className="p-0 text-blue-500">
                    <Link href={`/dashboard/integration?planId=${plan.id}`}>Integrate</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}