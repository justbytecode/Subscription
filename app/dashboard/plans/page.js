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
const CONTRACT_ADDRESS = "0x608060405234801561001057600080fd5b506040516126f93803806126f983398181016040528101906100329190610352565b80600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff16036100a55760006040517f1e4fbdf700000000000000000000000000000000000000000000000000000000815260040161009c91906103a1565b60405180910390fd5b6100b48161022b60201b60201c565b5060018081905550600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff160361012b576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161012290610419565b60405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff160361019a576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610191906104ab565b60405180910390fd5b81600260006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555080600360006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550600160078190555050506104cb565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050816000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508173ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a35050565b600080fd5b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b600061031f826102f4565b9050919050565b61032f81610314565b811461033a57600080fd5b50565b60008151905061034c81610326565b92915050565b60008060408385031215610369576103686102ef565b5b60006103778582860161033d565b92505060206103888582860161033d565b9150509250929050565b61039b81610314565b82525050565b60006020820190506103b66000830184610392565b92915050565b600082825260208201905092915050565b7f4d65726368616e7420616464726573732063616e6e6f74206265207a65726f00600082015250565b6000610403601f836103bc565b915061040e826103cd565b602082019050919050565b60006020820190508181036000830152610432816103f6565b9050919050565b7f506c6174666f726d206f776e657220616464726573732063616e6e6f7420626560008201527f207a65726f000000000000000000000000000000000000000000000000000000602082015250565b60006104956025836103bc565b91506104a082610439565b604082019050919050565b600060208201905081810360008301526104c481610488565b9050919050565b61221f806104da6000396000f3fe6080604052600436106101185760003560e01c8063715018a6116100a0578063b162061611610064578063b162061614610366578063b197df54146103a5578063b7986b5b146103ce578063e1f1c4a7146103f7578063f2fde38b146104225761011f565b8063715018a6146102935780638da5cb5b146102aa578063925a06c6146102d5578063a494ae6e146102fe578063a5ff76511461033b5761011f565b80633ccfd60b116100e75780633ccfd60b146101c05780634bcb8e1b146101d75780634df8ccb114610214578063568970d21461023f5780635f8d26b2146102685761011f565b80630cbebc24146101245780630f574ba714610162578063155482321461017e57806324e9edb0146101a95761011f565b3661011f57005b600080fd5b34801561013057600080fd5b5061014b60048036038101906101469190611820565b61044b565b604051610159929190611866565b60405180910390f35b61017c600480360381019061017791906118bb565b6104d7565b005b34801561018a57600080fd5b50610193610adb565b6040516101a091906118e8565b60405180910390f35b3480156101b557600080fd5b506101be610ae0565b005b3480156101cc57600080fd5b506101d5610e4e565b005b3480156101e357600080fd5b506101fe60048036038101906101f99190611820565b610f80565b60405161020b91906118e8565b60405180910390f35b34801561022057600080fd5b50610229610f98565b6040516102369190611912565b60405180910390f35b34801561024b57600080fd5b506102666004803603810190610261919061192d565b610fbe565b005b34801561027457600080fd5b5061027d6111a7565b60405161028a91906118e8565b60405180910390f35b34801561029f57600080fd5b506102a86111ad565b005b3480156102b657600080fd5b506102bf6111c1565b6040516102cc9190611912565b60405180910390f35b3480156102e157600080fd5b506102fc60048036038101906102f791906118bb565b6111ea565b005b34801561030a57600080fd5b5061032560048036038101906103209190611820565b61130e565b60405161033291906118e8565b60405180910390f35b34801561034757600080fd5b50610350611326565b60405161035d9190611912565b60405180910390f35b34801561037257600080fd5b5061038d600480360381019061038891906118bb565b61134c565b60405161039c9392919061199b565b60405180910390f35b3480156103b157600080fd5b506103cc60048036038101906103c791906119d2565b611383565b005b3480156103da57600080fd5b506103f560048036038101906103f09190611820565b6114d4565b005b34801561040357600080fd5b5061040c61158f565b60405161041991906118e8565b60405180910390f35b34801561042e57600080fd5b5061044960048036038101906104449190611820565b611595565b005b600080600560008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054600660008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205491509150915091565b6104df61161b565b6000811180156104f0575060075481105b61052f576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161052690611a6f565b60405180910390fd5b60006004600083815260200190815260200160002060405180606001604052908160008201548152602001600182015481526020016002820160009054906101000a900460ff161515151581525050905080604001516105c4576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016105bb90611adb565b60405180910390fd5b806000015134101561060b576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161060290611b47565b60405180910390fd5b600061271060323461061d9190611b96565b6106279190611c07565b9050600081346106379190611c38565b90506000600560003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020549050600081421161069b578460200151826106969190611c6c565b6106ac565b8460200151426106ab9190611c6c565b5b905080600560003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000208190555085600660003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055506000600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168560405161077e90611cd1565b60006040518083038185875af1925050503d80600081146107bb576040519150601f19603f3d011682016040523d82523d6000602084013e6107c0565b606091505b5050905080610804576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016107fb90611d32565b60405180910390fd5b6000600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168560405161084c90611cd1565b60006040518083038185875af1925050503d8060008114610889576040519150601f19603f3d011682016040523d82523d6000602084013e61088e565b606091505b50509050806108d2576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016108c990611d9e565b60405180910390fd5b3373ffffffffffffffffffffffffffffffffffffffff167f5ad333a6d56a7ddb1e78d9ecb8047e9dafcb890a41a227ede8d950259a1f0f75348a8660405161091c93929190611dbe565b60405180910390a2600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167fb22271622602af8e76f473a71b98890df40dc7fd2c2a5a574fdaa6d8fdbf22818760405161098c91906118e8565b60405180910390a28660000151341115610a635760008760000151346109b29190611c38565b905060003373ffffffffffffffffffffffffffffffffffffffff16826040516109da90611cd1565b60006040518083038185875af1925050503d8060008114610a17576040519150601f19603f3d011682016040523d82523d6000602084013e610a1c565b606091505b5050905080610a60576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610a5790611e41565b60405180910390fd5b50505b62093a804284610a739190611c38565b11610ac9573373ffffffffffffffffffffffffffffffffffffffff167f423e45173448db1dc5ff9ebc4844f2f3bd4f0127a286c72741ab201adff0f7f5848a604051610ac0929190611866565b60405180910390a25b50505050505050610ad8611661565b50565b603281565b610ae861161b565b6000600560003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020549050428111610b6e576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610b6590611ead565b60405180910390fd5b6000600660003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054905060006004600083815260200190815260200160002060405180606001604052908160008201548152602001600182015481526020016002820160009054906101000a900460ff16151515158152505090508060400151610c47576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610c3e90611adb565b60405180910390fd5b6000816020015184610c599190611c38565b42610c649190611c38565b905060008260200151612710838560200151610c809190611c38565b610c8a9190611b96565b610c949190611c07565b90506000612710828560000151610cab9190611b96565b610cb59190611c07565b90506000600560003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055506000600660003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000208190555060003373ffffffffffffffffffffffffffffffffffffffff1682604051610d6790611cd1565b60006040518083038185875af1925050503d8060008114610da4576040519150601f19603f3d011682016040523d82523d6000602084013e610da9565b606091505b5050905080610ded576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610de490611e41565b60405180910390fd5b3373ffffffffffffffffffffffffffffffffffffffff167fde4047f3bd050ef9b8743c61b37fd72275056d1ccb33d1eb3f22c80cb14df2898388604051610e35929190611866565b60405180910390a250505050505050610e4c611661565b565b610e5661166a565b610e5e61161b565b600047905060008111610ea6576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610e9d90611f19565b60405180910390fd5b6000600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1682604051610eee90611cd1565b60006040518083038185875af1925050503d8060008114610f2b576040519150601f19603f3d011682016040523d82523d6000602084013e610f30565b606091505b5050905080610f74576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610f6b90611f85565b60405180910390fd5b5050610f7e611661565b565b60056020528060005260406000206000915090505481565b600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b610fc661166a565b600083118015610fd7575060075483105b611016576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161100d90611a6f565b60405180910390fd5b6004600084815260200190815260200160002060020160009054906101000a900460ff16611079576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161107090611ff1565b60405180910390fd5b600082116110bc576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016110b39061205d565b60405180910390fd5b600081116110ff576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016110f6906120ef565b60405180910390fd5b60405180606001604052808381526020018281526020016001151581525060046000858152602001908152602001600020600082015181600001556020820151816001015560408201518160020160006101000a81548160ff0219169083151502179055509050507f353a42a683526219c00406d501f12ed3b877e06934a00242bc50ecf7a779919d83838360405161119a93929190611dbe565b60405180910390a1505050565b60075481565b6111b561166a565b6111bf60006116f1565b565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905090565b6111f261166a565b600081118015611203575060075481105b611242576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161123990611a6f565b60405180910390fd5b6004600082815260200190815260200160002060020160009054906101000a900460ff166112a5576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161129c90611ff1565b60405180910390fd5b60006004600083815260200190815260200160002060020160006101000a81548160ff0219169083151502179055507f3411f488b319ea4129f42cf93609e1822167b8b992e644385c9cd921f6f2cc6f8160405161130391906118e8565b60405180910390a150565b60066020528060005260406000206000915090505481565b600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b60046020528060005260406000206000915090508060000154908060010154908060020160009054906101000a900460ff16905083565b61138b61166a565b600082116113ce576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016113c59061205d565b60405180910390fd5b60008111611411576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401611408906120ef565b60405180910390fd5b604051806060016040528083815260200182815260200160011515815250600460006007548152602001908152602001600020600082015181600001556020820151816001015560408201518160020160006101000a81548160ff0219169083151502179055509050507f3c23b7bbdb7ee0acd2bf877ca1c70aa85ad90f581c13076913998f20b6e1e9b960075483836040516114b093929190611dbe565b60405180910390a1600760008154809291906114cb9061210f565b91905055505050565b6114dc61166a565b600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff160361154b576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401611542906121c9565b60405180910390fd5b80600260006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555050565b61271081565b61159d61166a565b600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff160361160f5760006040517f1e4fbdf70000000000000000000000000000000000000000000000000000000081526004016116069190611912565b60405180910390fd5b611618816116f1565b50565b600260015403611657576040517f3ee5aeb500000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b6002600181905550565b60018081905550565b6116726117b5565b73ffffffffffffffffffffffffffffffffffffffff166116906111c1565b73ffffffffffffffffffffffffffffffffffffffff16146116ef576116b36117b5565b6040517f118cdaa70000000000000000000000000000000000000000000000000000000081526004016116e69190611912565b60405180910390fd5b565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050816000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508173ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a35050565b600033905090565b600080fd5b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b60006117ed826117c2565b9050919050565b6117fd816117e2565b811461180857600080fd5b50565b60008135905061181a816117f4565b92915050565b600060208284031215611836576118356117bd565b5b60006118448482850161180b565b91505092915050565b6000819050919050565b6118608161184d565b82525050565b600060408201905061187b6000830185611857565b6118886020830184611857565b9392505050565b6118988161184d565b81146118a357600080fd5b50565b6000813590506118b58161188f565b92915050565b6000602082840312156118d1576118d06117bd565b5b60006118df848285016118a6565b91505092915050565b60006020820190506118fd6000830184611857565b92915050565b61190c816117e2565b82525050565b60006020820190506119276000830184611903565b92915050565b600080600060608486031215611946576119456117bd565b5b6000611954868287016118a6565b9350506020611965868287016118a6565b9250506040611976868287016118a6565b9150509250925092565b60008115159050919050565b61199581611980565b82525050565b60006060820190506119b06000830186611857565b6119bd6020830185611857565b6119ca604083018461198c565b949350505050565b600080604083850312156119e9576119e86117bd565b5b60006119f7858286016118a6565b9250506020611a08858286016118a6565b9150509250929050565b600082825260208201905092915050565b7f496e76616c696420706c616e2049440000000000000000000000000000000000600082015250565b6000611a59600f83611a12565b9150611a6482611a23565b602082019050919050565b60006020820190508181036000830152611a8881611a4c565b9050919050565b7f506c616e206973206e6f74206163746976650000000000000000000000000000600082015250565b6000611ac5601283611a12565b9150611ad082611a8f565b602082019050919050565b60006020820190508181036000830152611af481611ab8565b9050919050565b7f496e73756666696369656e74207061796d656e74000000000000000000000000600082015250565b6000611b31601483611a12565b9150611b3c82611afb565b602082019050919050565b60006020820190508181036000830152611b6081611b24565b9050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b6000611ba18261184d565b9150611bac8361184d565b9250828202611bba8161184d565b91508282048414831517611bd157611bd0611b67565b5b5092915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601260045260246000fd5b6000611c128261184d565b9150611c1d8361184d565b925082611c2d57611c2c611bd8565b5b828204905092915050565b6000611c438261184d565b9150611c4e8361184d565b9250828203905081811115611c6657611c65611b67565b5b92915050565b6000611c778261184d565b9150611c828361184d565b9250828201905080821115611c9a57611c99611b67565b5b92915050565b600081905092915050565b50565b6000611cbb600083611ca0565b9150611cc682611cab565b600082019050919050565b6000611cdc82611cae565b9150819050919050565b7f506c6174666f726d20666565207472616e73666572206661696c656400000000600082015250565b6000611d1c601c83611a12565b9150611d2782611ce6565b602082019050919050565b60006020820190508181036000830152611d4b81611d0f565b9050919050565b7f4d65726368616e74207472616e73666572206661696c65640000000000000000600082015250565b6000611d88601883611a12565b9150611d9382611d52565b602082019050919050565b60006020820190508181036000830152611db781611d7b565b9050919050565b6000606082019050611dd36000830186611857565b611de06020830185611857565b611ded6040830184611857565b949350505050565b7f526566756e64206661696c656400000000000000000000000000000000000000600082015250565b6000611e2b600d83611a12565b9150611e3682611df5565b602082019050919050565b60006020820190508181036000830152611e5a81611e1e565b9050919050565b7f4e6f2061637469766520737562736372697074696f6e00000000000000000000600082015250565b6000611e97601683611a12565b9150611ea282611e61565b602082019050919050565b60006020820190508181036000830152611ec681611e8a565b9050919050565b7f4e6f2066756e647320746f207769746864726177000000000000000000000000600082015250565b6000611f03601483611a12565b9150611f0e82611ecd565b602082019050919050565b60006020820190508181036000830152611f3281611ef6565b9050919050565b7f5769746864726177616c206661696c6564000000000000000000000000000000600082015250565b6000611f6f601183611a12565b9150611f7a82611f39565b602082019050919050565b60006020820190508181036000830152611f9e81611f62565b9050919050565b7f506c616e20646f6573206e6f7420657869737400000000000000000000000000600082015250565b6000611fdb601383611a12565b9150611fe682611fa5565b602082019050919050565b6000602082019050818103600083015261200a81611fce565b9050919050565b7f5072696365206d7573742062652067726561746572207468616e207a65726f00600082015250565b6000612047601f83611a12565b915061205282612011565b602082019050919050565b600060208201905081810360008301526120768161203a565b9050919050565b7f496e74657276616c206d7573742062652067726561746572207468616e207a6560008201527f726f000000000000000000000000000000000000000000000000000000000000602082015250565b60006120d9602283611a12565b91506120e48261207d565b604082019050919050565b60006020820190508181036000830152612108816120cc565b9050919050565b600061211a8261184d565b91507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff820361214c5761214b611b67565b5b600182019050919050565b7f4e6577206d65726368616e7420616464726573732063616e6e6f74206265207a60008201527f65726f0000000000000000000000000000000000000000000000000000000000602082015250565b60006121b3602383611a12565b91506121be82612157565b604082019050919050565b600060208201905081810360008301526121e2816121a6565b905091905056fea26469706673582212206891e1cbe3ddfdab7bbf77270caffd20aecbd3a30133e371c442e50c4407a60264736f6c634300081c0033"; 
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