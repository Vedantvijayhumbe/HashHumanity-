"use client";

import Navbar from "./Navbar";
import { useState, useEffect } from "react";
export default function BorrowingHistory() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const storedHistory = JSON.parse(localStorage.getItem("borrowingHistory") || "[]");
    setHistory(storedHistory);
  }, []);

  return (
    <div>
      <Navbar />
      <div className="min-h-screen bg-gray-100 p-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">Borrowing History</h2>
          
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Token ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount (ETH)</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {history.map((entry, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 text-sm text-gray-900">#{entry.tokenId}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">{entry.amount}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                        ${entry.status === "Active" ? "bg-red-100 text-red-800" : "bg-green-100 text-green-800"}`}>
                        {entry.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {new Date(entry.date).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            
            {history.length === 0 && (
              <div className="text-center p-6 text-gray-500">
                No borrowing history found
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}