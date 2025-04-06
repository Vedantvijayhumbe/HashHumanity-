import React, { useState } from 'react';
import styles from './AnimatedSBTBadge.module.css'; // Import module

function AnimatedSBTBadge({ visaData }) {
  const [showMeta, setShowMeta] = useState(false);

  // Don't render if user doesn't have a visa yet
  if (!visaData) return null;

  // Basic icon mapping - could be more complex (e.g., import SVGs)
  const getVisaIcon = (type) => {
    switch(type) {
        case 'Builder Visa': return '🛠️';
        case 'Contributor Visa': return '🤝';
        case 'Investor Visa': return '💰';
        default: return '👤';
    }
  }

  return (
    <div
      className={styles.badgeContainer}
      onMouseEnter={() => setShowMeta(true)}
      onMouseLeave={() => setShowMeta(false)}
    >
      {/* Apply animation classes */}
      <div className={`${styles.badge} ${styles.pulseGlow} ${styles.rotateBadge}`}>
        <div className={styles.badgeIcon}>
            {getVisaIcon(visaData.visaType)}
        </div>
        <div className={styles.badgeText}>{visaData.visaType}</div>
      </div>

      {/* Metadata shown on hover */}
      {/* You might want to use a portal if z-index becomes an issue */}
      {showMeta && (
        <div className={styles.metadata}>
          <p><strong>Issuer:</strong> {visaData.issuer || 'Unknown Issuer'}</p>
          <p><strong>Chain:</strong> {visaData.chainName || `ID: ${visaData.chainId || 'N/A'}`}</p>
          <p><strong>Standard:</strong> ERC721-SBT</p> {/* Assuming standard */}
          <p><strong>Token ID:</strong> #{visaData.tokenId || 'N/A'}</p>
        </div>
      )}
    </div>
  );
}

export default AnimatedSBTBadge;