"use client";

import { useState, useEffect } from "react";
import { ethers } from "ethers";
import contractABI from "../contract_data/RefugeeFinance.json";
import contractAddress from "../contract_data/RefugeeFinance-address.json";
import Navbar from "./Navbar";

export default function LoanRepayment() {
  const [tokenId, setTokenId] = useState("");
  const [amountDue, setAmountDue] = useState(null);
  const [contract, setContract] = useState(null);
  const [account, setAccount] = useState(null);

  const initializeEthers = async () => {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    setContract(new ethers.Contract(contractAddress.address, contractABI.abi, signer));
    setAccount((await provider.listAccounts())[0].address);
  };

  const checkLoanDetails = async () => {
    const history = JSON.parse(localStorage.getItem("borrowingHistory") || "[]");
    const loan = history.find(item => item.tokenId === tokenId && item.status === "Active");
    
    if (loan) {
      setAmountDue(loan.amount);
    } else {
      alert("Invalid token ID or loan already repaid");
    }
  };

  const repayLoan = async () => {
    try {
      const tx = await contract.repayLoan(tokenId, {
        value: ethers.parseEther(amountDue)
      });
      await tx.wait();
      
      // Update history
      const history = JSON.parse(localStorage.getItem("borrowingHistory"));
      const updated = history.map(item => 
        item.tokenId === tokenId ? {...item, status: "Repaid"} : item
      );
      localStorage.setItem("borrowingHistory", JSON.stringify(updated));
      
      setAmountDue(null);
      setTokenId("");
      alert("Loan repaid successfully!");
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => { initializeEthers(); }, []);

  return (
    <div>
      <Navbar />
      <div className="min-h-screen bg-gray-100 p-8">
        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">Loan Repayment</h2>
          
          <div className="space-y-6">
            <input
              type="text"
              value={tokenId}
              onChange={(e) => setTokenId(e.target.value)}
              placeholder="Enter your NFT Token ID"
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <button
              onClick={checkLoanDetails}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Check Loan Details
            </button>

            {amountDue !== null && (
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-lg font-semibold mb-2">
                  Amount Due: {amountDue} ETH
                </p>
                <button
                  onClick={repayLoan}
                  className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors"
                >
                  Repay Loan
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}