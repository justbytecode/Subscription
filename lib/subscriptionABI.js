const subscriptionABI = [
    "constructor(address _merchant, address _platformOwner, uint256 _price, uint256 _interval)",
    "event Subscribed(address indexed subscriber, uint256 amount, string planId, uint256 expiry)",
    "event PlatformFeeTransferred(address indexed platformOwner, uint256 amount)",
    "function merchant() view returns (address)",
    "function platformOwner() view returns (address)",
    "function price() view returns (uint256)",
    "function interval() view returns (uint256)",
    "function subscribe(string memory planId) payable",
    "function getSubscription(address subscriber) view returns (uint256 expiry, string memory planId)",
    "function withdraw()",
    "function updateMerchant(address newMerchant)",
  ];
  
  module.exports = { subscriptionABI };