📌 AttendanceTracker – Blockchain Attendance System (Solidity)

A simple, beginner-friendly smart contract built using Solidity that allows users to mark their attendance directly on the blockchain. This project demonstrates how decentralized applications can replace traditional attendance systems with transparent, secure, and tamper-proof records.

This contract is deployed on the Flare Coston2 Testnet, making it easy for learners to view real transaction details and understand on-chain interactions.

🚀 What This Project Does

This smart contract:

Allows any wallet address to mark their own attendance

Prevents duplicate attendance entries

Stores all attendance data permanently on-chain

Enables anyone to view the list of attendees

Shows how mapping, arrays, and basic Solidity logic work

Perfect for absolute beginners learning Solidity, Flare development, or smart contract basics.

⭐ Features
✔ Mark Attendance

Users can mark their attendance with a single function call.

✔ Prevents Duplicate Submissions

A mapping ensures no address can mark attendance twice.

✔ View Attendees

Anyone can view total attendees and specific attendee addresses.

✔ Decentralized & Transparent

Attendance data is stored permanently on the blockchain—tamper-proof and publicly verifiable.

✔ Beginner-Friendly Solidity Code

Straightforward functions, clean structure, and ideal for learning.

🔗 Deployed Smart Contract

Contract Deployment Transaction:
XXX
(Replace with your contract explorer link if needed.
For reference, your provided link can go here when replacing XXX.)

🧩 Smart Contract Code
//paste your code
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract AttendanceTracker {

    address public owner;

    // Stores whether an address has marked attendance
    mapping(address => bool) public hasMarked;

    // List of all attendees
    address[] public attendees;

    constructor() {
        owner = msg.sender; // deployer becomes the admin
    }

    // Function to mark attendance
    function markAttendance() public {
        require(!hasMarked[msg.sender], "You have already marked attendance!");

        hasMarked[msg.sender] = true;
        attendees.push(msg.sender);
    }

    // Get total number of attendees
    function getTotalAttendees() public view returns (uint256) {
        return attendees.length;
    }

    // Get attendee by index
    function getAttendee(uint256 index) public view returns (address) {
        return attendees[index];
    }
}

🛠 Tech Stack

Solidity (0.8.x)

Flare Coston2 Testnet

Remix IDE / Hardhat (optional)

MetaMask / Web3 wallet

📘 How to Use

Deploy using Remix (no constructor inputs needed).

Connect your wallet on Flare Coston2 Testnet.

Interact with the contract functions:

markAttendance() → marks attendance

getTotalAttendees() → returns number of attendees

getAttendee(index) → returns address at index

All actions are permanently stored on-chain.

🤝 Contributing

Feel free to fork the repo, add new features, create a frontend, or enhance the contract.
Pull requests are always welcome!

📄 License

This project is licensed under the MIT License. 
