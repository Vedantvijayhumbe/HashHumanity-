import React from 'react';
import styles from './MintViewSBT.module.css'; // Import module

// Example: Confetti effect on mint (install canvas-confetti)
// import confetti from 'canvas-confetti';

function MintViewSBT({ hasVisa, onMint, sbtTokenHash, explorerUrl, isMinting }) { // Add isMinting prop

  const handleMintClick = () => {
    console.log("Opening mint modal / starting mint flow...");
    // Optional: Trigger confetti on successful mint inside onMint callback
    // confetti({ particleCount: 150, spread: 90, origin: { y: 0.6 } });
    if (onMint) {
      onMint(); // Call the mint function passed from parent
    }
    // The parent component should handle the actual minting logic & state change
  };

  const explorerLink = explorerUrl || (sbtTokenHash ? `https://etherscan.io/token/${sbtTokenHash}` : '#');

  return (
    <div className={styles.container}>
      {hasVisa ? (
        <div className={styles.viewContainer}>
          <h4>Your Digital Visa is Active</h4>
          <p>You can view your SBT on the blockchain.</p>
          <a
            href={explorerLink}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.actionButton} // Use style from module
          >
            View on Explorer 🔗
          </a>
          {/* Optionally add refresh or other actions */}
        </div>
      ) : (
        <div className={styles.mintContainer}>
          <h3>Ready to get your Digital Identity?</h3>
          <p>Apply for your non-transferable Visa SBT to unlock access and verify your status.</p>
          <button
             className={styles.mintButton} // Use style from module
             onClick={handleMintClick}
             disabled={isMinting} // Disable button while minting
           >
             {isMinting ? 'Minting...' : '✨ Apply for Visa SBT'}
          </button>
          <p className={styles.learnMore}>
            {/* Replace # with actual link */}
            <a href="#">Learn more about these SBTs</a>
          </p>
        </div>
      )}
    </div>
  );
}

export default MintViewSBT;