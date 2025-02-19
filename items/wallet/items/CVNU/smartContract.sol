// SPDX-License-Identifier: GNU
pragma solidity ^0.8.13;

contract SmartContrat {
    struct Account {
        address owner;
        string role;
        uint256 balance;
    }

    mapping(address => Account) public accounts;
    address public admin;

    event Deposit(address indexed user, uint256 amount);
    event Withdrawal(address indexed user, uint256 amount);
    event Transfer(address indexed sender, address indexed recipient, uint256 amount);

    constructor() {
        admin = msg.sender;
    }

    function setRole(address user, string memory _role) external onlyAdmin {
        accounts[user].role = _role;
    }

    function deposit() external payable {
        accounts[msg.sender].balance += msg.value;
        emit Deposit(msg.sender, msg.value);
    }

    function withdraw(uint256 _amount) external {
        require(accounts[msg.sender].balance >= _amount, "Insufficient balance");
        accounts[msg.sender].balance -= _amount;
        payable(msg.sender).transfer(_amount);
        emit Withdrawal(msg.sender, _amount);
    }

    function transfer(address _recipient, uint256 _amount) external onlyAdmin {
        require(accounts[_recipient].balance >= _amount, "Insufficient balance");
        accounts[_recipient].balance -= _amount;
        payable(msg.sender).transfer(_amount);
        emit Transfer(msg.sender, _recipient, _amount);
    }

    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin allowed");
        _;
    }
}