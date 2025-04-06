"use client";

import { useState, useEffect } from "react";
import { ethers } from "ethers";

export default function LoanDisbursement({ account, contract, mintedSBT }) {
  const [loanAmount, setLoanAmount] = useState("");
  const [maxLoan, setMaxLoan] = useState(0.5);
  const [creditScore, setCreditScore] = useState(0);
  const [hasActiveLoan, setHasActiveLoan] = useState(false);

  useEffect(() => {
    const checkEligibility = async () => {
      if (contract && account && mintedSBT) {
        try {
          const score = await contract.creditScore(account);
          const loanCount = await contract.loans(account).length;
          const max = await contract.MAX_LOAN();
          
          setCreditScore(Number(score));
          setHasActiveLoan(loanCount > 0);
          setMaxLoan(Number(ethers.formatEther(max)));
        } catch (error) {
          console.error("Error checking eligibility:", error);
        }
      }
    };
    checkEligibility();
  }, [contract, account, mintedSBT]);

  const handleDisburse = async (e) => {
    e.preventDefault();
    try {
      const amountWei = ethers.parseEther(loanAmount);
      const tx = await contract.requestLoan(amountWei);
      await tx.wait();
      alert("Loan disbursed successfully!");
      setHasActiveLoan(true);
    } catch (error) {
      console.error("Disbursement failed:", error);
      alert(`Error: ${error.reason || "Check console for details"}`);
    }
  };

  return (
    <div className="loan-container">
      <h2>Loan Disbursement</h2>
      
      {!mintedSBT ? (
        <div className="verification-required">
          <h3>Verification Required 🔒</h3>
          <p>Complete these steps to access loans:</p>
          <ol className="steps">
            <li>Submit all required documents</li>
            <li>Get verified by an administrator</li>
            <li>Mint your verification SBT</li>
          </ol>
        </div>
      ) : hasActiveLoan ? (
        <div className="active-loan-warning">
          <h3>Active Loan Detected</h3>
          <p>You must repay your current loan before requesting a new one.</p>
        </div>
      ) : (
        <>
          <div className="loan-status">
            <p>Your Credit Score: {creditScore}</p>
            <p>Maximum Loan Amount: {maxLoan} ETH</p>
          </div>

          <form onSubmit={handleDisburse} className="loan-form">
            <input
              type="number"
              step="0.01"
              min="0.01"
              max={maxLoan}
              value={loanAmount}
              onChange={(e) => setLoanAmount(e.target.value)}
              placeholder="Enter amount in ETH"
              required
            />
            <button type="submit" className="disburse-btn">
              Request Loan
            </button>
          </form>

          <div className="terms">
            <h4>Loan Terms</h4>
            <ul>
              <li>0% Interest Rate</li>
              <li>30 Day Repayment Period</li>
              <li>Late repayments affect credit score</li>
            </ul>
          </div>
        </>
      )}
    </div>
  );
}