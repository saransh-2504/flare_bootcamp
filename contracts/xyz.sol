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

