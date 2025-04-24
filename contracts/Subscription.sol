// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

contract Subscription is Ownable, ReentrancyGuard {
    address public merchant;
    address public platformOwner;
    uint256 public constant PLATFORM_FEE_PERCENTAGE = 50; // 0.5% (50 basis points, where 10000 = 100%)
    uint256 public constant BASIS_POINTS = 10000;

    struct Plan {
        uint256 price; // Price in wei
        uint256 interval; // Interval in seconds (e.g., 2592000 for 30 days)
        bool active; // Whether the plan is active
    }

    mapping(uint256 => Plan) public plans; // planId => Plan
    mapping(address => uint256) public subscriberExpiry; // Subscriber address => subscription expiry timestamp
    mapping(address => uint256) public subscriberPlanId; // Subscriber address => plan ID

    uint256 public nextPlanId; // Auto-incrementing ID for new plans

    event Subscribed(address indexed subscriber, uint256 amount, uint256 planId, uint256 expiry);
    event PlatformFeeTransferred(address indexed platformOwner, uint256 amount);
    event SubscriptionCancelled(address indexed subscriber, uint256 refundAmount, uint256 planId);
    event PlanCreated(uint256 planId, uint256 price, uint256 interval);
    event PlanUpdated(uint256 planId, uint256 price, uint256 interval);
    event PlanDeleted(uint256 planId);
    event ExpiryApproaching(address indexed subscriber, uint256 expiry, uint256 planId);

    constructor(
        address _merchant,
        address _platformOwner
    ) Ownable(_platformOwner) {
        require(_merchant != address(0), "Merchant address cannot be zero");
        require(_platformOwner != address(0), "Platform owner address cannot be zero");
        merchant = _merchant;
        platformOwner = _platformOwner;
        nextPlanId = 1;
    }

    // Create a new subscription plan (only by platform owner)
    function createPlan(uint256 _price, uint256 _interval) external onlyOwner {
        require(_price > 0, "Price must be greater than zero");
        require(_interval > 0, "Interval must be greater than zero");

        plans[nextPlanId] = Plan(_price, _interval, true);
        emit PlanCreated(nextPlanId, _price, _interval);
        nextPlanId++;
    }

    // Update an existing plan (only by platform owner)
    function updatePlan(uint256 _planId, uint256 _price, uint256 _interval) external onlyOwner {
        require(_planId > 0 && _planId < nextPlanId, "Invalid plan ID");
        require(plans[_planId].active, "Plan does not exist");
        require(_price > 0, "Price must be greater than zero");
        require(_interval > 0, "Interval must be greater than zero");

        plans[_planId] = Plan(_price, _interval, true);
        emit PlanUpdated(_planId, _price, _interval);
    }

    // Delete a plan (only by platform owner)
    function deletePlan(uint256 _planId) external onlyOwner {
        require(_planId > 0 && _planId < nextPlanId, "Invalid plan ID");
        require(plans[_planId].active, "Plan does not exist");

        plans[_planId].active = false;
        emit PlanDeleted(_planId);
    }

    // Subscribe to a plan
    function subscribe(uint256 _planId) external payable nonReentrant {
        require(_planId > 0 && _planId < nextPlanId, "Invalid plan ID");
        Plan memory plan = plans[_planId];
        require(plan.active, "Plan is not active");
        require(msg.value >= plan.price, "Insufficient payment");

        uint256 platformFee = (msg.value * PLATFORM_FEE_PERCENTAGE) / BASIS_POINTS;
        uint256 merchantAmount = msg.value - platformFee;

        // Update or extend subscription
        uint256 currentExpiry = subscriberExpiry[msg.sender];
        uint256 newExpiry = block.timestamp > currentExpiry 
            ? block.timestamp + plan.interval 
            : currentExpiry + plan.interval;
        subscriberExpiry[msg.sender] = newExpiry;
        subscriberPlanId[msg.sender] = _planId;

        // Transfer platform fee
        (bool feeSuccess, ) = platformOwner.call{value: platformFee}("");
        require(feeSuccess, "Platform fee transfer failed");

        // Transfer merchant amount
        (bool merchantSuccess, ) = merchant.call{value: merchantAmount}("");
        require(merchantSuccess, "Merchant transfer failed");

        emit Subscribed(msg.sender, msg.value, _planId, newExpiry);
        emit PlatformFeeTransferred(platformOwner, platformFee);

        // Refund excess payment if any
        if (msg.value > plan.price) {
            uint256 refund = msg.value - plan.price;
            (bool refundSuccess, ) = msg.sender.call{value: refund}("");
            require(refundSuccess, "Refund failed");
        }

        // Emit event for off-chain renewal reminder (e.g., 7 days before expiry)
        if (newExpiry - block.timestamp <= 7 days) {
            emit ExpiryApproaching(msg.sender, newExpiry, _planId);
        }
    }

    // Cancel subscription with partial refund
    function cancelSubscription() external nonReentrant {
        uint256 expiry = subscriberExpiry[msg.sender];
        require(expiry > block.timestamp, "No active subscription");

        uint256 planId = subscriberPlanId[msg.sender];
        Plan memory plan = plans[planId];
        require(plan.active, "Plan is not active");

        uint256 timeElapsed = block.timestamp - (expiry - plan.interval);
        uint256 refundPercentage = ((plan.interval - timeElapsed) * BASIS_POINTS) / plan.interval;
        uint256 refundAmount = (plan.price * refundPercentage) / BASIS_POINTS;

        // Reset subscription
        subscriberExpiry[msg.sender] = 0;
        subscriberPlanId[msg.sender] = 0;

        // Transfer refund (platform fee not refunded for simplicity)
        (bool refundSuccess, ) = msg.sender.call{value: refundAmount}("");
        require(refundSuccess, "Refund failed");

        emit SubscriptionCancelled(msg.sender, refundAmount, planId);
    }

    // Get subscription details
    function getSubscription(address subscriber) external view returns (uint256 expiry, uint256 planId) {
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

    // Fallback function to receive ETH (if any)
    receive() external payable {}
}