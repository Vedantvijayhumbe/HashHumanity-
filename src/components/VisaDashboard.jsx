import React, { useState, useEffect } from 'react';

// Import your components
import VisaStatusCard from '../components/VisaStatusCard';
import AnimatedSBTBadge from '../components/AnimatedSBTBadge';
import MintViewSBT from '../components/MintViewSBT';

// Import page-specific styles or use global App.css for layout
import './VisaDashboard.css'; // Create this file for layout if needed

// --- Mock Data & Functions (Replace with actual logic) ---
const MOCK_VISA_DATA = {
  profilePictureUrl: '', // Use DiceBear fallback
  name: 'Vita L.',
  walletAddress: '0xAbCdEfG1234567890AbCdEfG1234567890aBcDeF',
  visaId: 'VISA-SBT-CONTRIB-1337',
  sbtTokenHash: '0xdef456ghi789jkl0mno1pqrs2tuv3wxyz4abc123abc',
  tokenId: '42',
  visaType: 'Contributor Visa',
  issueDate: '2024-02-10',
  expiryDate: '2025-02-10',
  issuer: 'Community DAO',
  chainId: 137, // Polygon
  chainName: 'Polygon'
};
// --- End Mock Data ---

function Visa() {
  const [isLoading, setIsLoading] = useState(true);
  const [hasVisa, setHasVisa] = useState(false);
  const [visaData, setVisaData] = useState(null);
  const [isMinting, setIsMinting] = useState(false); // Track minting process
  const [connectedWallet, setConnectedWallet] = useState(null); // From context or props

  // Simulate fetching data and wallet connection
  useEffect(() => {
    setIsLoading(true);
    // TODO: Replace with actual wallet connection logic (e.g., from context)
    const fakeWallet = '0xAbCdEfG1234567890AbCdEfG1234567890aBcDeF';
    setConnectedWallet(fakeWallet);

    // TODO: Replace with actual check for SBT ownership
    const checkVisa = async () => {
      // const ownsVisa = await contract.balanceOf(fakeWallet) > 0; // Example
      const ownsVisa = Math.random() > 0.5; // Simulate 50% chance
      if (ownsVisa) {
        // TODO: Fetch metadata for the owned SBT
        setVisaData(MOCK_VISA_DATA);
        setHasVisa(true);
      } else {
        setHasVisa(false);
        setVisaData(null);
      }
      setIsLoading(false);
    };

    const timer = setTimeout(checkVisa, 1200); // Simulate delay
    return () => clearTimeout(timer);
  }, []); // Re-run if wallet changes? Add connectedWallet to dependency array if needed.

  // Mock Mint Function
  const handleMintVisa = async () => {
    if (!connectedWallet) {
      alert("Please connect wallet first!");
      return;
    }
    setIsMinting(true);
    console.log("Minting initiated...");
    // TODO: Replace with actual contract interaction
    try {
      // const tx = await contract.mint(...)
      // await tx.wait();
      await new Promise(resolve => setTimeout(resolve, 2500)); // Simulate transaction time

      console.log("Mint successful!");
      // TODO: Refetch or assume success and set data
      setVisaData(MOCK_VISA_DATA); // Use mock data for now
      setHasVisa(true);
      alert("🎉 Visa SBT Minted Successfully!");

    } catch (error) {
       console.error("Minting failed:", error);
       alert("Minting failed. Please try again.");
    } finally {
       setIsMinting(false);
    }
  };

  if (isLoading) {
    // Use a class from App.css or create one in VisaDashboard.css
    return <div className="loading-indicator">Loading Visa Information...</div>;
  }

  return (
    // Use layout classes from App.css or VisaDashboard.css
    <div className="visa-dashboard-layout">
      <h1>My Digital Visa</h1>
      <div className="visa-content-grid"> {/* Example layout class */}
        {hasVisa && visaData ? (
          <>
            <div className="visa-badge-area"> {/* Example layout class */}
              <AnimatedSBTBadge visaData={visaData} />
            </div>
            <div className="visa-card-area"> {/* Example layout class */}
              <VisaStatusCard visaData={visaData} />
            </div>
          </>
        ) : (
           // Optionally show a placeholder when no visa exists yet
           <div className="visa-placeholder-area">
              {/* <h2>No Visa Found</h2> */}
              {/* <p>Apply below to get started.</p> */}
           </div>
        )}

        {/* Mint/View section spans full width below */}
        <div className="visa-action-area"> {/* Example layout class */}
          <MintViewSBT
            hasVisa={hasVisa}
            onMint={handleMintVisa}
            sbtTokenHash={visaData?.sbtTokenHash}
            isMinting={isMinting} // Pass minting state
            // explorerUrl={getExplorerUrl(visaData?.chainId, visaData?.sbtTokenHash)} // Optional helper
          />
        </div>
         {/* Add Access History / Admin Panel conditionally here */}
      </div>
    </div>
  );
}

export default Visa;