"use client";

import { useEffect, useState } from "react";
import { ethers } from "ethers";
import abi from "../utils/contractABI.json";

export default function Home() {
  const [total, setTotal] = useState(0);
  const [hasMarked, setHasMarked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [wallet, setWallet] = useState("");

  const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS;

  const getContract = async () => {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    return new ethers.Contract(contractAddress, abi, signer);
  };

  const loadDetails = async () => {
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = await provider.getSigner();
      const user = await signer.getAddress();
      setWallet(user);

      const contract = new ethers.Contract(contractAddress, abi, provider);
      const totalResult = await contract.getTotalAttendees();
      const marked = await contract.hasMarked(user);

      setTotal(Number(totalResult));
      setHasMarked(marked);
    } catch (e) {
      console.error(e);
    }
  };

  const markAttendance = async () => {
    try {
      setLoading(true);
      const contract = await getContract();

      const tx = await contract.markAttendance();
      await tx.wait();

      await loadDetails();
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDetails();
  }, []);

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center px-6 overflow-hidden bg-black text-white">

      {/* Glowing blobs */}
      <div className="absolute top-[-150px] left-[-150px] h-[400px] w-[400px] bg-green-500 rounded-full blur-[180px] opacity-20"></div>
      <div className="absolute bottom-[-150px] right-[-150px] h-[400px] w-[400px] bg-blue-500 rounded-full blur-[180px] opacity-20"></div>

      {/* Main container */}
      <div className="z-10 flex flex-col items-center text-center space-y-10 max-w-xl w-full">

        <h1 className="text-6xl font-extrabold bg-gradient-to-r from-green-300 to-blue-400 bg-clip-text text-transparent drop-shadow-xl animate-fadeIn">
          Attendance Tracker
        </h1>

        {/* Wallet box */}
        <div className="w-full glass rounded-2xl p-5 border border-white/10 shadow-xl animate-fadeIn">
          <p className="text-gray-300 text-sm">
            Connected Wallet:{" "}
            <span className="text-green-400">
              {wallet ? `${wallet.slice(0, 6)}...${wallet.slice(-4)}` : "Not Connected"}
            </span>
          </p>
        </div>

        {/* Attendance button */}
        {!hasMarked ? (
          <button
            onClick={markAttendance}
            disabled={loading}
            className="px-10 py-4 text-xl font-semibold rounded-2xl 
            bg-gradient-to-r from-green-400 to-blue-400 text-black
            shadow-[0_0_25px_rgba(0,255,200,0.6)]
            hover:scale-105 hover:shadow-[0_0_40px_rgba(0,255,200,0.9)]
            active:scale-95 transition-all duration-300 ease-out animate-fadeIn"
          >
            {loading ? "Marking..." : "Mark Attendance"}
          </button>
        ) : (
          <p className="text-2xl text-green-400 font-semibold animate-fadeIn">
            🎉 Attendance Recorded!
          </p>
        )}

        {/* Stats box */}
        <div className="glass w-full p-8 rounded-3xl text-left border border-white/10 shadow-xl animate-fadeIn">
          <h2 className="text-3xl font-bold mb-6">Live Stats</h2>

          <p className="text-xl mb-4">
            Total Attendees:{" "}
            <span className="text-green-300 font-semibold">{total}</span>
          </p>

          <p className="text-gray-400 text-sm">
            Anyone can mark attendance by switching to a different wallet.
          </p>
        </div>
      </div>

    </div>
  );
}
