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

// Placeholder for subscriptionBytecode
// TODO: Replace this with the actual bytecode you have compiled from Subscription.sol
// Example: import subscriptionJson from "@/artifacts/contracts/Subscription.sol/Subscription.json";
// const subscriptionBytecode = subscriptionJson.bytecode;
const subscriptionBytecode = "0x608060405234801561001057600080fd5b5060405161216538038061216583398181016040528101906100329190610416565b82600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff16036100a55760006040517f1e4fbdf700000000000000000000000000000000000000000000000000000000815260040161009c919061048c565b60405180910390fd5b6100b4816102b960201b60201c565b5060018081905550600073ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff160361012b576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161012290610504565b60405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff160361019a576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161019190610596565b60405180910390fd5b600082116101dd576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016101d490610602565b60405180910390fd5b60008111610220576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161021790610694565b60405180910390fd5b83600260006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555082600360006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508160048190555080600581905550505050506106b4565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050816000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508173ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a35050565b600080fd5b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b60006103ad82610382565b9050919050565b6103bd816103a2565b81146103c857600080fd5b50565b6000815190506103da816103b4565b92915050565b6000819050919050565b6103f3816103e0565b81146103fe57600080fd5b50565b600081519050610410816103ea565b92915050565b600080600080608085870312156104305761042f61037d565b5b600061043e878288016103cb565b945050602061044f878288016103cb565b935050604061046087828801610401565b925050606061047187828801610401565b91505092959194509250565b610486816103a2565b82525050565b60006020820190506104a1600083018461047d565b92915050565b600082825260208201905092915050565b7f4d65726368616e7420616464726573732063616e6e6f74206265207a65726f00600082015250565b60006104ee601f836104a7565b91506104f9826104b8565b602082019050919050565b6000602082019050818103600083015261051d816104e1565b9050919050565b7f506c6174666f726d206f776e657220616464726573732063616e6e6f7420626560008201527f207a65726f000000000000000000000000000000000000000000000000000000602082015250565b60006105806025836104a7565b915061058b82610524565b604082019050919050565b600060208201905081810360008301526105af81610573565b9050919050565b7f5072696365206d7573742062652067726561746572207468616e207a65726f00600082015250565b60006105ec601f836104a7565b91506105f7826105b6565b602082019050919050565b6000602082019050818103600083015261061b816105df565b9050919050565b7f496e74657276616c206d7573742062652067726561746572207468616e207a6560008201527f726f000000000000000000000000000000000000000000000000000000000000602082015250565b600061067e6022836104a7565b915061068982610622565b604082019050919050565b600060208201905081810360008301526106ad81610671565b9050919050565b611aa2806106c36000396000f3fe6080604052600436106100e85760003560e01c80638da5cb5b1161008a578063a5ff765111610059578063a5ff7651146102c6578063b7986b5b146102f1578063e1f1c4a71461031a578063f2fde38b14610345576100e8565b80638da5cb5b14610208578063947a36fb14610233578063a035b1fe1461025e578063a494ae6e14610289576100e8565b80634bcb8e1b116100c65780634bcb8e1b1461016d5780634df8ccb1146101aa578063507e7888146101d5578063715018a6146101f1576100e8565b80630cbebc24146100ed578063155482321461012b5780633ccfd60b14610156575b600080fd5b3480156100f957600080fd5b50610114600480360381019061010f9190610f60565b61036e565b604051610122929190611036565b60405180910390f35b34801561013757600080fd5b50610140610486565b60405161014d9190611066565b60405180910390f35b34801561016257600080fd5b5061016b61048b565b005b34801561017957600080fd5b50610194600480360381019061018f9190610f60565b6105bd565b6040516101a19190611066565b60405180910390f35b3480156101b657600080fd5b506101bf6105d5565b6040516101cc9190611090565b60405180910390f35b6101ef60048036038101906101ea91906111e0565b6105fb565b005b3480156101fd57600080fd5b50610206610af6565b005b34801561021457600080fd5b5061021d610b0a565b60405161022a9190611090565b60405180910390f35b34801561023f57600080fd5b50610248610b33565b6040516102559190611066565b60405180910390f35b34801561026a57600080fd5b50610273610b39565b6040516102809190611066565b60405180910390f35b34801561029557600080fd5b506102b060048036038101906102ab9190610f60565b610b3f565b6040516102bd9190611229565b60405180910390f35b3480156102d257600080fd5b506102db610bdf565b6040516102e89190611090565b60405180910390f35b3480156102fd57600080fd5b5061031860048036038101906103139190610f60565b610c05565b005b34801561032657600080fd5b5061032f610cc0565b60405161033c9190611066565b60405180910390f35b34801561035157600080fd5b5061036c60048036038101906103679190610f60565b610cc6565b005b60006060600660008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054600760008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000208080546103fd9061127a565b80601f01602080910402602001604051908101604052809291908181526020018280546104299061127a565b80156104765780601f1061044b57610100808354040283529160200191610476565b820191906000526020600020905b81548152906001019060200180831161045957829003601f168201915b5050505050905091509150915091565b603281565b610493610d4c565b61049b610dd3565b6000479050600081116104e3576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016104da906112f7565b60405180910390fd5b6000600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168260405161052b90611348565b60006040518083038185875af1925050503d8060008114610568576040519150601f19603f3d011682016040523d82523d6000602084013e61056d565b606091505b50509050806105b1576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016105a8906113a9565b60405180910390fd5b50506105bb610e19565b565b60066020528060005260406000206000915090505481565b600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b610603610dd3565b600454341015610648576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161063f90611415565b60405180910390fd5b600081511161068c576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161068390611481565b60405180910390fd5b600061271060323461069e91906114d0565b6106a89190611541565b9050600081346106b89190611572565b90506000600660003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020549050600081421161071a576005548261071591906115a6565b610729565b6005544261072891906115a6565b5b905080600660003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000208190555084600760003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002090816107bb9190611786565b506000600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168560405161080490611348565b60006040518083038185875af1925050503d8060008114610841576040519150601f19603f3d011682016040523d82523d6000602084013e610846565b606091505b505090508061088a576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610881906118a4565b60405180910390fd5b6000600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16856040516108d290611348565b60006040518083038185875af1925050503d806000811461090f576040519150601f19603f3d011682016040523d82523d6000602084013e610914565b606091505b5050905080610958576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161094f90611910565b60405180910390fd5b3373ffffffffffffffffffffffffffffffffffffffff167f5dd08cfef65063628195d7b41e793a6f1922b40ca02b42f3a4f338f3f3ecfc273489866040516109a293929190611930565b60405180910390a2600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167fb22271622602af8e76f473a71b98890df40dc7fd2c2a5a574fdaa6d8fdbf228187604051610a129190611066565b60405180910390a2600454341115610ae557600060045434610a349190611572565b905060003373ffffffffffffffffffffffffffffffffffffffff1682604051610a5c90611348565b60006040518083038185875af1925050503d8060008114610a99576040519150601f19603f3d011682016040523d82523d6000602084013e610a9e565b606091505b5050905080610ae2576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610ad9906119ba565b60405180910390fd5b50505b505050505050610af3610e19565b50565b610afe610d4c565b610b086000610e22565b565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905090565b60055481565b60045481565b60076020528060005260406000206000915090508054610b5e9061127a565b80601f0160208091040260200160405190810160405280929190818152602001828054610b8a9061127a565b8015610bd75780601f10610bac57610100808354040283529160200191610bd7565b820191906000526020600020905b815481529060010190602001808311610bba57829003601f168201915b505050505081565b600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b610c0d610d4c565b600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff1603610c7c576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610c7390611a4c565b60405180910390fd5b80600260006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555050565b61271081565b610cce610d4c565b600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff1603610d405760006040517f1e4fbdf7000000000000000000000000000000000000000000000000000000008152600401610d379190611090565b60405180910390fd5b610d4981610e22565b50565b610d54610ee6565b73ffffffffffffffffffffffffffffffffffffffff16610d72610b0a565b73ffffffffffffffffffffffffffffffffffffffff1614610dd157610d95610ee6565b6040517f118cdaa7000000000000000000000000000000000000000000000000000000008152600401610dc89190611090565b60405180910390fd5b565b600260015403610e0f576040517f3ee5aeb500000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b6002600181905550565b60018081905550565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050816000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508173ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a35050565b600033905090565b6000604051905090565b600080fd5b600080fd5b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000610f2d82610f02565b9050919050565b610f3d81610f22565b8114610f4857600080fd5b50565b600081359050610f5a81610f34565b92915050565b600060208284031215610f7657610f75610ef8565b5b6000610f8484828501610f4b565b91505092915050565b6000819050919050565b610fa081610f8d565b82525050565b600081519050919050565b600082825260208201905092915050565b60005b83811015610fe0578082015181840152602081019050610fc5565b60008484015250505050565b6000601f19601f8301169050919050565b600061100882610fa6565b6110128185610fb1565b9350611022818560208601610fc2565b61102b81610fec565b840191505092915050565b600060408201905061104b6000830185610f97565b818103602083015261105d8184610ffd565b90509392505050565b600060208201905061107b6000830184610f97565b92915050565b61108a81610f22565b82525050565b60006020820190506110a56000830184611081565b92915050565b600080fd5b600080fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b6110ed82610fec565b810181811067ffffffffffffffff8211171561110c5761110b6110b5565b5b80604052505050565b600061111f610eee565b905061112b82826110e4565b919050565b600067ffffffffffffffff82111561114b5761114a6110b5565b5b61115482610fec565b9050602081019050919050565b82818337600083830152505050565b600061118361117e84611130565b611115565b90508281526020810184848401111561119f5761119e6110b0565b5b6111aa848285611161565b509392505050565b600082601f8301126111c7576111c66110ab565b5b81356111d7848260208601611170565b91505092915050565b6000602082840312156111f6576111f5610ef8565b5b600082013567ffffffffffffffff81111561121457611213610efd565b5b611220848285016111b2565b91505092915050565b600060208201905081810360008301526112438184610ffd565b905092915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b6000600282049050600182168061129257607f821691505b6020821081036112a5576112a461124b565b5b50919050565b7f4e6f2066756e647320746f207769746864726177000000000000000000000000600082015250565b60006112e1601483610fb1565b91506112ec826112ab565b602082019050919050565b60006020820190508181036000830152611310816112d4565b9050919050565b600081905092915050565b50565b6000611332600083611317565b915061133d82611322565b600082019050919050565b600061135382611325565b9150819050919050565b7f5769746864726177616c206661696c6564000000000000000000000000000000600082015250565b6000611393601183610fb1565b915061139e8261135d565b602082019050919050565b600060208201905081810360008301526113c281611386565b9050919050565b7f496e73756666696369656e74207061796d656e74000000000000000000000000600082015250565b60006113ff601483610fb1565b915061140a826113c9565b602082019050919050565b6000602082019050818103600083015261142e816113f2565b9050919050565b7f506c616e2049442063616e6e6f7420626520656d707479000000000000000000600082015250565b600061146b601783610fb1565b915061147682611435565b602082019050919050565b6000602082019050818103600083015261149a8161145e565b9050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b60006114db82610f8d565b91506114e683610f8d565b92508282026114f481610f8d565b9150828204841483151761150b5761150a6114a1565b5b5092915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601260045260246000fd5b600061154c82610f8d565b915061155783610f8d565b92508261156757611566611512565b5b828204905092915050565b600061157d82610f8d565b915061158883610f8d565b92508282039050818111156115a05761159f6114a1565b5b92915050565b60006115b182610f8d565b91506115bc83610f8d565b92508282019050808211156115d4576115d36114a1565b5b92915050565b60008190508160005260206000209050919050565b60006020601f8301049050919050565b600082821b905092915050565b60006008830261163c7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff826115ff565b61164686836115ff565b95508019841693508086168417925050509392505050565b6000819050919050565b600061168361167e61167984610f8d565b61165e565b610f8d565b9050919050565b6000819050919050565b61169d83611668565b6116b16116a98261168a565b84845461160c565b825550505050565b600090565b6116c66116b9565b6116d1818484611694565b505050565b5b818110156116f5576116ea6000826116be565b6001810190506116d7565b5050565b601f82111561173a5761170b816115da565b611714846115ef565b81016020851015611723578190505b61173761172f856115ef565b8301826116d6565b50505b505050565b600082821c905092915050565b600061175d6000198460080261173f565b1980831691505092915050565b6000611776838361174c565b9150826002028217905092915050565b61178f82610fa6565b67ffffffffffffffff8111156117a8576117a76110b5565b5b6117b2825461127a565b6117bd8282856116f9565b600060209050601f8311600181146117f057600084156117de578287015190505b6117e8858261176a565b865550611850565b601f1984166117fe866115da565b60005b8281101561182657848901518255600182019150602085019450602081019050611801565b86831015611843578489015161183f601f89168261174c565b8355505b6001600288020188555050505b505050505050565b7f506c6174666f726d20666565207472616e73666572206661696c656400000000600082015250565b600061188e601c83610fb1565b915061189982611858565b602082019050919050565b600060208201905081810360008301526118bd81611881565b9050919050565b7f4d65726368616e74207472616e73666572206661696c65640000000000000000600082015250565b60006118fa601883610fb1565b9150611905826118c4565b602082019050919050565b60006020820190508181036000830152611929816118ed565b9050919050565b60006060820190506119456000830186610f97565b81810360208301526119578185610ffd565b90506119666040830184610f97565b949350505050565b7f526566756e64206661696c656400000000000000000000000000000000000000600082015250565b60006119a4600d83610fb1565b91506119af8261196e565b602082019050919050565b600060208201905081810360008301526119d381611997565b9050919050565b7f4e6577206d65726368616e7420616464726573732063616e6e6f74206265207a60008201527f65726f0000000000000000000000000000000000000000000000000000000000602082015250565b6000611a36602383610fb1565b9150611a41826119da565b604082019050919050565b60006020820190508181036000830152611a6581611a29565b905091905056fea264697066735822122099fa22a5511bca80a58dc7e3a3de2d563b54113f3e1ab071ec8d04c3da78bf6b64736f6c634300081c0033";

export default function PlansClient({ wallet: initialWallet, plans: initialPlans }) {
  // State management
  const [wallet, setWallet] = useState(initialWallet);
  const [plans, setPlans] = useState(initialPlans);
  const [isCreating, setIsCreating] = useState(false);
  const [error, setError] = useState(null);
  const [balance, setBalance] = useState(null);
  const [walletChainId, setWalletChainId] = useState(null);
  const [isBalanceLoading, setIsBalanceLoading] = useState(false);
  const router = useRouter();
  const { data: session, status } = useSession();

  // Derive userId from session
  const userId = session?.user?.id;

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

  const handleCreatePlan = async (formData) => {
    console.log("handleCreatePlan called with formData:", formData);
    setIsCreating(true);
    setError(null);

    try {
      // Step 1: Validate wallet connection
      console.log("Step 1: Validating wallet connection");
      if (!wallet || !wallet.address) {
        throw new Error("Wallet not connected. Please connect your MetaMask wallet.");
      }
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
      console.log("Deploying contract with wallet address:", walletAddress);

      // Step 5: Verify wallet balance
      console.log("Step 5: Verifying wallet balance");
      const balanceWei = await provider.getBalance(walletAddress);
      const balanceEth = ethers.formatEther(balanceWei);
      console.log("Wallet balance:", balanceEth, "ETH");
      if (parseFloat(balanceEth) < 0.01) {
        throw new Error("Insufficient funds. Your wallet needs at least 0.01 ETH to deploy the contract.");
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

      if (!ethers.isAddress(wallet.address)) {
        throw new Error("Invalid wallet address.");
      }

      // Step 8: Convert price to wei
      console.log("Step 8: Converting price to wei");
      const priceInWei = ethers.parseEther(price.toString());
      console.log("Price in wei:", priceInWei.toString());

      // Step 9: Determine interval in seconds
      console.log("Step 9: Determining interval in seconds");
      const intervalSeconds = interval.toLowerCase() === "monthly" ? 2592000 : 86400;
      console.log("Interval in seconds:", intervalSeconds);

      // Step 10: Deploy the contract
      console.log("Step 10: Deploying the contract");
      let contractAddress;
      try {
        const factory = new ethers.ContractFactory(subscriptionABI, subscriptionBytecode, signer);
        console.log("Deploying contract with parameters:", {
          merchant: wallet.address,
          platformOwner,
          priceInWei: priceInWei.toString(),
          intervalSeconds,
        });

        const contract = await factory.deploy(wallet.address, platformOwner, priceInWei, intervalSeconds, {
          gasLimit: 3000000,
        });

        console.log("Waiting for contract deployment...");
        const deploymentTx = await contract.deploymentTransaction();
        console.log("Deployment transaction:", deploymentTx);

        const receipt = await deploymentTx.wait();
        console.log("Deployment transaction receipt:", receipt);

        contractAddress = receipt.contractAddress;
        console.log("Contract deployed at address:", contractAddress);
      } catch (deployError) {
        console.error("Contract deployment failed:", deployError);
        throw new Error("Failed to deploy contract: " + (deployError.message || "Unknown error"));
      }

      if (!contractAddress) {
        throw new Error("Failed to retrieve contract address after deployment.");
      }

      if (!ethers.isAddress(contractAddress)) {
        throw new Error("Invalid contract address after deployment.");
      }

      // Step 11: Prepare data for saveSubscriptionPlan
      console.log("Step 11: Preparing data for saveSubscriptionPlan");
      const planData = { name, price, interval, contractAddress, userId };
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
      console.error("Failed to create plan:", err);
      let errorMessage = err.message || "An unexpected error occurred.";
      if (err.code === "INSUFFICIENT_FUNDS") {
        errorMessage = "Insufficient funds in your wallet to deploy the contract. Please add more ETH to your wallet.";
      } else if (err.code === "NETWORK_ERROR") {
        errorMessage = "Network error. Please ensure MetaMask is connected to the Sepolia testnet and try again.";
      } else if (err.message.includes("user rejected")) {
        errorMessage = "Transaction rejected by user. Please approve the transaction in MetaMask to deploy the contract.";
      } else if (err.reason) {
        errorMessage = `Transaction failed: ${err.reason}`;
      } else if (err.message.includes("nonce")) {
        errorMessage = "Nonce issue detected. Please reset your MetaMask account (Account > Settings > Advanced > Reset Account) and try again.";
      } else if (err.message.includes("invalid BytesLike value")) {
        errorMessage = "Invalid subscription bytecode. Please ensure the subscriptionBytecode is correctly set.";
      }
      setError(errorMessage);
    } finally {
      setIsCreating(false);
      console.log("handleCreatePlan completed");
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
              <p className="text-sm text-gray-500">This wallet will be used to deploy subscription contracts.</p>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-yellow-600" />
              <p className="text-yellow-700">
                No wallet connected. Please connect your MetaMask wallet to create plans.
                <Link href="/dashboard/wallet" className="text-blue-600 hover:underline ml-1">
                  Connect Wallet
                </Link>
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Plan Creation */}
      <Card className="bg-white shadow-md">
        <CardHeader>
          <CardTitle className="text-lg text-gray-700">Create New Plan</CardTitle>
        </CardHeader>
        <CardContent>
          {error && <p className="text-red-600 mb-4">{error}</p>}
          {!wallet || !wallet.address ? (
            <p className="text-gray-600">Connect your wallet to create a new subscription plan.</p>
          ) : error && error.includes("User not authenticated") ? (
            <p className="text-gray-600">
              Please log in to create a subscription plan.{" "}
              <Link href="/login" className="text-blue-600 hover:underline">
                Log In
              </Link>
            </p>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                console.log("Form submitted");
                const formData = new FormData(e.target);
                handleCreatePlan(formData);
              }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Input name="name" placeholder="Plan Name" required className="flex-1" />
              <Input
                name="price"
                type="number"
                step="0.01"
                placeholder="Price (ETH)"
                required
                className="flex-1"
              />
              <select name="interval" required className="flex-1 border rounded px-3 py-2">
                <option value="monthly">Monthly</option>
                <option value="daily">Daily</option>
              </select>
              <Button type="submit" className="bg-blue-600 hover:bg-blue-700" disabled={isCreating}>
                {isCreating ? "Creating..." : "Add Plan"}
              </Button>
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
                <p className="text-sm text-gray-500 mt-2">Contract: {plan.contractAddress}</p>
                <Button variant="link" className="mt-2 p-0 text-blue-500">
                  <Link href={`/dashboard/integration?planId=${plan.id}`}>Integrate</Link>
                </Button>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}