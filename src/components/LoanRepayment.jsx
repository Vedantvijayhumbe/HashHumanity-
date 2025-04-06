"use client";

import { useState, useEffect } from "react";
import { ethers } from "ethers";

export default function LoanRepayment({ account, contract, mintedSBT, refreshStatus }) {
  const [repayAmount, setRepayAmount] = useState("");
  const [activeLoan, setActiveLoan] = useState(null);
  const [dueAmount, setDueAmount] = useState(0);

  useEffect(() => {
    const loadActiveLoan = async () => {
      if (contract && account && mintedSBT) {
        try {
          const loanCount = await contract.loans(account).length;
          if (loanCount > 0) {
            const lastLoan = await contract.loans(account, loanCount - 1);
            if (lastLoan.active) {
              setActiveLoan({
                amount: ethers.formatEther(lastLoan.amount),
                repaid: ethers.formatEther(lastLoan.amountRepaid),
                dueDate: new Date(Number(lastLoan.dueDate) * 1000)
              });
              setDueAmount(ethers.formatEther(lastLoan.amount - lastLoan.amountRepaid));
            }
          }
        } catch (error) {
          console.error("Error loading loan:", error);
        }
      }
    };
    loadActiveLoan();
  }, [contract, account, mintedSBT]);

  const handleRepayment = async (e) => {
    e.preventDefault();
    try {
      const amountWei = ethers.parseEther(repayAmount);
      const tx = await contract.repayLoan({ value: amountWei });
      await tx.wait();
      
      // Refresh data
      const loanCount = await contract.loans(account).length;
      const updatedLoan = await contract.loans(account, loanCount - 1);
      
      setActiveLoan({
        amount: ethers.formatEther(updatedLoan.amount),
        repaid: ethers.formatEther(updatedLoan.amountRepaid),
        dueDate: new Date(Number(updatedLoan.dueDate) * 1000)
      });
      setDueAmount(ethers.formatEther(updatedLoan.amount - updatedLoan.amountRepaid));
      setRepayAmount("");
      refreshStatus();
      
      alert("Repayment successful!");
    } catch (error) {
      console.error("Repayment failed:", error);
      alert(`Error: ${error.reason || "Check console for details"}`);
    }
  };

  return (
    <div className="repayment-container">
      <h2>Loan Repayment</h2>
      
      {!mintedSBT ? (
        <div className="verification-required">
          <h3>Identity Not Verified 🔒</h3>
          <p>You must complete verification and mint your SBT to access loan services.</p>
        </div>
      ) : activeLoan ? (
        <>
          <div className="loan-details">
            <p>Total Amount: {activeLoan.amount} ETH</p>
            <p>Amount Repaid: {activeLoan.repaid} ETH</p>
            <p>Due Date: {activeLoan.dueDate.toLocaleDateString()}</p>
            <p>Amount Due: {dueAmount} ETH</p>
          </div>

          <form onSubmit={handleRepayment} className="repayment-form">
            <input
              type="number"
              step="0.01"
              min="0.01"
              max={dueAmount}
              value={repayAmount}
              onChange={(e) => setRepayAmount(e.target.value)}
              placeholder="Enter repayment amount"
              required
            />
            <button type="submit" className="repay-btn">
              Make Payment
            </button>
          </form>
        </>
      ) : (
        <div className="no-loans">
          <h3>No Active Loans</h3>
          <p>You don't currently have any outstanding loans.</p>
        </div>
      )}
    </div>
  );
}