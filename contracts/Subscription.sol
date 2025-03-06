// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

contract Subscription is Ownable, ReentrancyGuard {
    address public merchant;
    address public platformOwner;
    uint256 public price; // Price in wei
    uint256 public interval; // Interval in seconds (e.g., 2592000 for 30 days)
    uint256 public constant PLATFORM_FEE_PERCENTAGE = 50; // 0.5% (50 basis points, where 10000 = 100%)
    uint256 public constant BASIS_POINTS = 10000;

    mapping(address => uint256) public subscriberExpiry; // Subscriber address => subscription expiry timestamp
    mapping(address => string) public subscriberPlanId; // Subscriber address => plan ID

    event Subscribed(address indexed subscriber, uint256 amount, string planId, uint256 expiry);
    event PlatformFeeTransferred(address indexed platformOwner, uint256 amount);

    constructor(
        address _merchant,
        address _platformOwner,
        uint256 _price,
        uint256 _interval
    ) Ownable(_platformOwner) {
        require(_merchant != address(0), "Merchant address cannot be zero");
        require(_platformOwner != address(0), "Platform owner address cannot be zero");
        require(_price > 0, "Price must be greater than zero");
        require(_interval > 0, "Interval must be greater than zero");

        merchant = _merchant;
        platformOwner = _platformOwner;
        price = _price;
        interval = _interval;
    }

    function subscribe(string memory planId) external payable nonReentrant {
        require(msg.value >= price, "Insufficient payment");
        require(bytes(planId).length > 0, "Plan ID cannot be empty");

        uint256 platformFee = (msg.value * PLATFORM_FEE_PERCENTAGE) / BASIS_POINTS;
        uint256 merchantAmount = msg.value - platformFee;

        // Update or extend subscription
        uint256 currentExpiry = subscriberExpiry[msg.sender];
        uint256 newExpiry = block.timestamp > currentExpiry 
            ? block.timestamp + interval 
            : currentExpiry + interval;
        subscriberExpiry[msg.sender] = newExpiry;
        subscriberPlanId[msg.sender] = planId;

        // Transfer platform fee
        (bool feeSuccess, ) = platformOwner.call{value: platformFee}("");
        require(feeSuccess, "Platform fee transfer failed");

        // Transfer merchant amount
        (bool merchantSuccess, ) = merchant.call{value: merchantAmount}("");
        require(merchantSuccess, "Merchant transfer failed");

        emit Subscribed(msg.sender, msg.value, planId, newExpiry);
        emit PlatformFeeTransferred(platformOwner, platformFee);

        // Refund excess payment if any
        if (msg.value > price) {
            uint256 refund = msg.value - price;
            (bool refundSuccess, ) = msg.sender.call{value: refund}("");
            require(refundSuccess, "Refund failed");
        }
    }

    function getSubscription(address subscriber) external view returns (uint256 expiry, string memory planId) {
        return (subscriberExpiry[subscriber], subscriberPlanId[subscriber]);
    }

    // Allow platform owner to withdraw any stuck funds (emergency use)
    function withdraw() external onlyOwner nonReentrant {
        uint256 balance = address(this).balance;
        require(balance > 0, "No funds to withdraw");
        (bool success, ) = platformOwner.call{value: balance}("");
        require(success, "Withdrawal failed");
    }

    // Update merchant address (only by platform owner)
    function updateMerchant(address newMerchant) external onlyOwner {
        require(newMerchant != address(0), "New merchant address cannot be zero");
        merchant = newMerchant;
    }
}