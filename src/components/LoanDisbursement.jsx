"use client";

import { useState, useEffect } from "react";
import { ethers } from "ethers";
import contractABI from "../contract_data/RefugeeFinance.json";
import contractAddress from "../contract_data/RefugeeFinance-address.json";
import Navbar from "./Navbar";
import "./LoanDisbursement.css"; // Import your CSS file

export default function LoanDisbursement() {
  const [nftTokens, setNftTokens] = useState([]);
  const [loanAmount, setLoanAmount] = useState("");
  const [account, setAccount] = useState(null);
  const [contract, setContract] = useState(null);
  const [loading, setLoading] = useState(false);

  const initializeEthers = async () => {
    if (!window.ethereum) {
      alert("Install MetaMask!");
      return;
    }
    
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const loanContract = new ethers.Contract(
      contractAddress.address,
      contractABI.abi,
      signer
    );
    
    setContract(loanContract);
    const accounts = await provider.listAccounts();
    setAccount(accounts[0].address);
  };

  const mintNFT = async () => {
    setLoading(true);
    try {
      const tx = await contract.mintNFT(account);
      await tx.wait();
      const tokenId = await contract.getLastTokenId();
      setNftTokens([...nftTokens, tokenId.toString()]);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  // Updated to call contract.requestLoan from the Solidity file
  const requestLoan = async () => {
    if (!contract) return;
    if (parseFloat(loanAmount) > 0.5) {
      alert("Please request loan below 0.5 ETH");
      return;
    }

    try {
      const tx = await contract.requestLoan(ethers.parseEther(loanAmount));
      await tx.wait();
      
      // Store in borrowing history
      const history = JSON.parse(localStorage.getItem("borrowingHistory") || "[]");
      history.push({
        tokenId: nftTokens[nftTokens.length - 1],
        amount: loanAmount,
        status: "Active",
        date: new Date().toISOString()
      });
      localStorage.setItem("borrowingHistory", JSON.stringify(history));
      
      alert(`Loan of ${loanAmount} ETH granted to ${account}!`);
      setLoanAmount("");
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    initializeEthers();
  }, []);

  return (
    <div className="loan-disbursement-page">
      <Navbar />
      <div className="container">
        <div className="card">
          <h2 className="card-title">Loan Disbursement</h2>
          
          <div className="section">
            <button 
              onClick={mintNFT}
              className="mint-button"
              disabled={loading}
            >
              {loading ? "Minting..." : "Mint Collateral NFT"}
            </button>
            <div className="nft-tokens">
              <h3>Your NFT Tokens:</h3>
              <div className="tokens-list">
                {nftTokens.length === 0 && (
                  <span className="no-tokens">No tokens minted yet.</span>
                )}
                {nftTokens.map(token => (
                  <span key={token} className="token-badge">
                    Token #{token}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="section">
            <input
              type="number"
              step="0.01"
              value={loanAmount}
              onChange={(e) => setLoanAmount(e.target.value)}
              placeholder="Loan amount in ETH (Max 0.5)"
              className="loan-input"
            />
            <button
              onClick={requestLoan}
              className="loan-button"
            >
              Request Loan
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
