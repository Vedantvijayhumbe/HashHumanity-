import React, { useState } from 'react';
// Import the CSS module
import styles from './VisaStatusCard.module.css';
// Consider using the native Clipboard API or a small library like copy-to-clipboard
// import { CopyToClipboard } from 'react-copy-to-clipboard';

// Placeholder Verified Icon (replace with actual SVG or icon library if you have one)
const VerifiedIcon = () => (
  <svg className={styles.verifiedIcon} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z"/>
  </svg>
);

function VisaStatusCard({ visaData }) {
  const [copiedHash, setCopiedHash] = useState(false);
  const [copiedAddress, setCopiedAddress] = useState(false);

  // --- Using Native Clipboard API (Recommended) ---
  const handleCopy = async (textToCopy, type) => {
    try {
      await navigator.clipboard.writeText(textToCopy);
      if (type === 'hash') setCopiedHash(true);
      if (type === 'address') setCopiedAddress(true);
      setTimeout(() => {
        setCopiedHash(false);
        setCopiedAddress(false);
      }, 1500);
    } catch (err) {
      console.error('Failed to copy text: ', err);
      // Optionally show an error message to the user
      alert("Failed to copy.");
    }
  };
  // --- End Native Clipboard API ---

  if (!visaData) {
    // You might want a more sophisticated loading state/skeleton here
    return <div className={styles.card}>Loading Visa Data...</div>;
  }

  // Simple PDF download placeholder
  const handleDownloadPdf = () => {
    alert("PDF Download functionality requires a library like @react-pdf/renderer and generation logic.");
    // Implement actual PDF generation here
  }

  const explorerBaseUrl = `https://etherscan.io/token/`; // Or dynamically set based on chain

  return (
    // Use class names from the imported 'styles' object
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <img
          src={visaData.profilePictureUrl || `https://api.dicebear.com/6.x/avataaars/svg?seed=${visaData.walletAddress}`}
          alt="Profile"
          className={styles.profilePic}
        />
        <div className={styles.headerText}>
          <h2 className={styles.name}>{visaData.name}</h2>
          <div className={styles.addressContainer}>
             <code className={styles.walletAddress}>
                {`${visaData.walletAddress.substring(0, 6)}...${visaData.walletAddress.substring(visaData.walletAddress.length - 4)}`}
             </code>
             <button
               className={styles.copyButton}
               title="Copy address"
               onClick={() => handleCopy(visaData.walletAddress, 'address')}
             >
               {copiedAddress ? 'Copied!' : '📄'}
             </button>
           </div>
        </div>
         <button onClick={handleDownloadPdf} className={styles.pdfButton} title="Download as PDF">
            ⬇️ PDF
         </button>
      </div>

      <div className={styles.cardBody}>
        <div className={styles.field}>
          <span className={styles.fieldLabel}>Visa ID:</span>
          <span className={styles.fieldValue}>{visaData.visaId}</span>
        </div>
         <div className={styles.field}>
           <span className={styles.fieldLabel}>SBT Hash:</span>
           <div className={styles.hashContainer}>
            <code className={styles.fieldValue}>
                {`${visaData.sbtTokenHash.substring(0, 10)}...${visaData.sbtTokenHash.substring(visaData.sbtTokenHash.length - 8)}`}
            </code>
            <button
               className={styles.copyButton}
               title="Copy hash"
               onClick={() => handleCopy(visaData.sbtTokenHash, 'hash')}
             >
               {copiedHash ? 'Copied!' : '📄'}
             </button>
            <a href={`${explorerBaseUrl}${visaData.sbtTokenHash}`} // Adjust URL if needed
                target="_blank" rel="noopener noreferrer" className={styles.explorerLink} title="View on Explorer">
                🔗
             </a>
           </div>
         </div>
        <div className={styles.field}>
          <span className={styles.fieldLabel}>Visa Type:</span>
          {/* Example of combining multiple classes */}
          <span className={`${styles.fieldValue} ${styles.visaType}`}>{visaData.visaType}</span>
        </div>
      </div>

      <div className={styles.cardFooter}>
        <span>Issued: {visaData.issueDate}</span>
        <span className={styles.separator}>|</span>
        <span>Expiry: {visaData.expiryDate}</span>
        <div className={styles.verifiedBadge}>
          <VerifiedIcon />
          <span>Verified</span>
        </div>
      </div>
    </div>
  );
}

export default VisaStatusCard;