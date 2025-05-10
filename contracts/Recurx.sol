// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

contract RecurX {
    address public owner;
    uint256 public constant PLATFORM_FEE = 50; // 0.5% (50 basis points)
    uint256 public constant BASIS_POINTS = 10000;
    
    struct Transaction {
        address sender;
        address recipient;
        uint256 amount;
        string currency;
        uint256 platformFee;
        uint256 timestamp;
        bool completed;
    }
    
    mapping(bytes32 => Transaction) public transactions;
    mapping(address => bool) public supportedTokens;
    
    event PaymentSent(
        bytes32 indexed txId,
        address indexed sender,
        address indexed recipient,
        uint256 amount,
        string currency,
        uint256 platformFee
    );
    
    event TokenSupportUpdated(address token, bool supported);
    
    modifier onlyOwner() {
        require(msg.sender == owner, "Not owner");
        _;
    }
    
    constructor() {
        owner = msg.sender;
        // Initialize with MATIC as default supported token
        supportedTokens[address(0)] = true;
    }
    
    function sendPayment(
        address recipient,
        uint256 amount,
        string memory currency,
        address token
    ) external payable returns (bytes32) {
        require(recipient != address(0), "Invalid recipient");
        require(amount > 0, "Invalid amount");
        require(supportedTokens[token] || token == address(0), "Unsupported token");
        
        uint256 platformFee = (amount * PLATFORM_FEE) / BASIS_POINTS;
        uint256 amountAfterFee = amount - platformFee;
        
        bytes32 txId = keccak256(abi.encodePacked(
            msg.sender,
            recipient,
            amount,
            currency,
            block.timestamp
        ));
        
        transactions[txId] = Transaction({
            sender: msg.sender,
            recipient: recipient,
            amount: amount,
            currency: currency,
            platformFee: platformFee,
            timestamp: block.timestamp,
            completed: false
        });
        
        if (token == address(0)) {
            // Native MATIC transfer
            require(msg.value >= amount, "Insufficient MATIC");
            payable(recipient).transfer(amountAfterFee);
            payable(owner).transfer(platformFee);
        } else {
            // ERC20 token transfer (implementation would be added based on specific tokens)
            revert("ERC20 transfers not implemented yet");
        }
        
        transactions[txId].completed = true;
        
        emit PaymentSent(txId, msg.sender, recipient, amount, currency, platformFee);
        
        return txId;
    }
    
    function updateTokenSupport(address token, bool supported) external onlyOwner {
        supportedTokens[token] = supported;
        emit TokenSupportUpdated(token, supported);
    }
    
    function withdrawFees() external onlyOwner {
        uint256 balance = address(this).balance;
        require(balance > 0, "No fees to withdraw");
        payable(owner).transfer(balance);
    }
    
    receive() external payable {}
}