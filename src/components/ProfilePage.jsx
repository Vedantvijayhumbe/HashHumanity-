import React, { useState } from 'react';
import { FaUserCircle } from 'react-icons/fa'; // Import an icon
import './ProfilePage.css';

const Profile = () => {
  // State for main form visibility
  const [showForm, setShowForm] = useState(false);
  const [selectedFileType, setSelectedFileType] = useState('');

  // State for Admin Modal
  const [showAdminModal, setShowAdminModal] = useState(false);
  const [verifierId, setVerifierId] = useState('');
  const [password, setPassword] = useState('');
  const [showVerificationDetails, setShowVerificationDetails] = useState(false); // State for showing details inside modal
  const [verified, setVerified] = useState(null); // null, true, or false

  const handleFileTypeChange = (e) => {
    setSelectedFileType(e.target.value);
  };

  // Simulate admin login and show verification details
  const handleAdminSubmit = () => {
    // In a real app, you'd validate credentials here
    if (verifierId && password) {
      setShowVerificationDetails(true); // Show the next step within the modal
      setVerified(null); // Reset verification status when showing details
    } else {
      alert('Please enter Verifier ID and Password.');
    }
  };

  // Function to close the admin modal and reset its state
  const closeAdminModal = () => {
    setShowAdminModal(false);
    setShowVerificationDetails(false);
    setVerifierId('');
    setPassword('');
    setVerified(null);
  };

  return (
    <div className="profile-app">
      {!showForm ? (
        <div className="initial-view">
          <h1>Welcome!</h1>
          <p>Join our network to get started.</p>
          <button className="btn btn-primary start-btn" onClick={() => setShowForm(true)}>
            Get Involved
          </button>
        </div>
      ) : (
        <div className="form-card">
          <div className="profile-icon-container">
            {/* You can replace this with an <img> tag if you have a URL */}
            <FaUserCircle className="profile-icon" />
          </div>
          <h2>Join the Network</h2>

          <input type="text" placeholder="Full Name" className="input-field" />
          <input type="email" placeholder="Email Address" className="input-field" />

          <select className="input-field">
            <option value="">Select Country</option>
            <option value="us">🇺🇸 United States</option>
            <option value="in">🇮🇳 India</option>
            <option value="uk">🇬🇧 United Kingdom</option>
            <option value="fr">🇫🇷 France</option>
            <option value="de">🇩🇪 Germany</option>
          </select>

          <input type="tel" placeholder="Phone Number (+ Country Code)" className="input-field" />

          <button className="btn btn-secondary wallet-btn">Connect Wallet</button>

          <label htmlFor="identityProof" className="input-label">Identity Proof:</label>
          <select id="identityProof" className="input-field" onChange={handleFileTypeChange} value={selectedFileType}>
            <option value="">Choose Identity Proof Type</option>
            <option value="DL">Driving License</option>
            <option value="PP">Passport</option>
            <option value="VID">Valid Identity Proof</option>
          </select>

          {/* Conditionally render file input only after type is selected */}
          {selectedFileType && (
            <>
             <label htmlFor="fileUpload" className="input-label">Upload {selectedFileType}:</label>
             <input id="fileUpload" type="file" className="input-field file-input" />
            </>
          )}

          {/* Button to open the Admin Modal */}
          <button className="btn btn-admin admin-btn" onClick={() => setShowAdminModal(true)}>
            Go to Admin Page
          </button>
        </div>
      )}

      {/* Admin Modal */}
      {showAdminModal && (
        <div className="modal-overlay">
          <div className="modal-content admin-card">
            <button className="close-btn" onClick={closeAdminModal}>×</button>
             {!showVerificationDetails ? (
               <>
                 <h3>Admin Access</h3>
                 <input
                   type="text"
                   placeholder="Verifier ID"
                   className="input-field"
                   value={verifierId}
                   onChange={(e) => setVerifierId(e.target.value)}
                 />
                 <input
                   type="password"
                   placeholder="Password"
                   className="input-field"
                   value={password}
                   onChange={(e) => setPassword(e.target.value)}
                 />
                 <button className="btn btn-primary submit-btn" onClick={handleAdminSubmit}>
                   Submit
                 </button>
               </>
             ) : (
               <div className="result-card">
                 <h4>Verification Request</h4>
                 <p><strong>ID Number:</strong> 0x9F2A...AbC1</p>
                 <p>
                   <strong>Document Link:</strong>{' '}
                   <a href="#" target="_blank" rel="noopener noreferrer">
                     View Document {/* Replace with actual link logic */}
                   </a>
                 </p>
                 <p className='verify-question'>Is this document valid?</p>
                 <div className='verify-actions'>
                   <button onClick={() => setVerified(true)} className="btn btn-success verify-btn">
                     Yes
                   </button>
                   <button onClick={() => setVerified(false)} className="btn btn-danger verify-btn no">
                     No
                   </button>
                 </div>
                 {verified !== null && (
                   <p className={`status ${verified ? 'status-verified' : 'status-rejected'}`}>
                     Status: {verified ? '✅ Verified' : '❌ Rejected'}
                   </p>
                 )}
               </div>
             )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;