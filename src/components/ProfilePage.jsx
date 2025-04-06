"use client";

import { useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { ethers } from "ethers";
import contractABI from "../contract_data/RefugeeFinance.json";
import contractAddress from "../contract_data/RefugeeFinance-address.json";

import "./ProfilePage.css";

export default function Profile() {
  const [account, setAccount] = useState(null);
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [contract, setContract] = useState(null);

  const [showForm, setShowForm] = useState(false);
  const [selectedFileType, setSelectedFileType] = useState("");

  // Form fields
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [country, setCountry] = useState("");
  const [phone, setPhone] = useState("");

  const [showAdminModal, setShowAdminModal] = useState(false);
  const [verifierId, setVerifierId] = useState("");
  const [password, setPassword] = useState("");
  const [showVerificationDetails, setShowVerificationDetails] = useState(false);
  const [verified, setVerified] = useState(null);
  const [ipfsHash, setIpfsHash] = useState("");
  const [mintedSBT, setMintedSBT] = useState(null);

  const handleFileTypeChange = (e) => {
    setSelectedFileType(e.target.value);
  };

  const initializeEthers = async () => {
    if (!window.ethereum) {
      alert("MetaMask not detected!");
      return;
    }
    try {
      const _provider = new ethers.JsonRpcProvider("https://lb.drpc.org/ogrpc?network=sepolia&dkey=AlG5D6zvNETUp3IUZlWBmV_ciA3JEskR8JjwKjrWkQAY");
      const _signer = await _provider.getSigner();
      const _contract = new ethers.Contract(
        contractAddress.address,
        contractABI.abi,
        _signer
      );

      const accounts = await _provider.send("eth_requestAccounts", []);
      setAccount(accounts[0]);

      setProvider(_provider);
      setSigner(_signer);
      setContract(_contract);
    } catch (error) {
      console.error("Error initializing ethers:", error);
    }
  };

  const handleAdminSubmit = () => {
    if (verifierId && password) {
      setShowVerificationDetails(true);
      setVerified(null);
    } else {
      alert("Please enter Verifier ID and Password.");
    }
  };

  const closeAdminModal = () => {
    setShowAdminModal(false);
    setShowVerificationDetails(false);
    setVerifierId("");
    setPassword("");
    setVerified(null);
    setIpfsHash("");
  };

  // Mint SBT when admin approves document verification
  const mintSBT = async () => {
    if (!contract) return alert("Contract not initialized!");
    if (!account) return alert("No user account detected!");
    if (!ipfsHash) return alert("Please enter an IPFS hash for the document!");
    try {
      console.log(account, ipfsHash)
      const tx = await contract.registerRefugee(account, ipfsHash);
      await tx.wait();
      // After minting, query the contract for the user's SBT (document hash)
      const sbtValue = await contract.getUserDocument(account);
      setMintedSBT(sbtValue);
      alert("SBT minted successfully!");
    } catch (error) {
      console.error("Minting failed:", error);
      alert("Minting failed, please check the console for details.");
    }
  };

  // Only show the Connect Wallet button if all form details are filled
  const formDetailsFilled = fullName && email && country && phone;

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
            <FaUserCircle className="profile-icon" />
          </div>
          <h2>Join the Network</h2>
          <input
            type="text"
            placeholder="Full Name"
            className="input-field"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
          <input
            type="email"
            placeholder="Email Address"
            className="input-field"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <select
            className="input-field"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          >
            <option value="">Select Country</option>
            <option value="us">🇺🇸 United States</option>
            <option value="in">🇮🇳 India</option>
            <option value="uk">🇬🇧 United Kingdom</option>
            <option value="fr">🇫🇷 France</option>
            <option value="de">🇩🇪 Germany</option>
          </select>
          <input
            type="tel"
            placeholder="Phone Number (+ Country Code)"
            className="input-field"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />

          {formDetailsFilled && (
            <button className="btn btn-secondary wallet-btn" onClick={initializeEthers}>
              {account
                ? `Connected: ${account.slice(0, 6)}...${account.slice(-4)}`
                : "Connect Wallet"}
            </button>
          )}

          <label htmlFor="identityProof" className="input-label">
            Identity Proof:
          </label>
          <select
            id="identityProof"
            className="input-field"
            onChange={handleFileTypeChange}
            value={selectedFileType}
          >
            <option value="">Choose Identity Proof Type</option>
            <option value="DL">Driving License</option>
            <option value="PP">Passport</option>
            <option value="VID">Valid Identity Proof</option>
          </select>

          {selectedFileType && (
            <>
              <label htmlFor="fileUpload" className="input-label">
                Upload {selectedFileType}:
              </label>
              <input id="fileUpload" type="file" className="input-field file-input" />
            </>
          )}

          <button className="btn btn-admin admin-btn" onClick={() => setShowAdminModal(true)}>
            Go to Admin Page
          </button>

          {/* If SBT has been minted, display the SBT value block */}
          {mintedSBT && (
            <div className="sbt-block">
              <h3>SBT Value</h3>
              <p>{mintedSBT}</p>
              <p className="verified-msg">Verified</p>
            </div>
          )}
        </div>
      )}

      {/* Admin Modal */}
      {showAdminModal && (
        <div className="modal-overlay">
          <div className="modal-content admin-card">
            <button className="close-btn" onClick={closeAdminModal}>
              ×
            </button>
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
                <p>
                  <strong>ID Number:</strong> 0x9F2A...AbC1
                </p>
                <p>
                  <strong>Document Link:</strong>{" "}
                  <a href="#" target="_blank" rel="noopener noreferrer">
                    View Document
                  </a>
                </p>
                <p className="verify-question">Is this document valid?</p>
                <div className="verify-actions">
                  <button onClick={() => setVerified(true)} className="btn btn-success verify-btn">
                    Yes
                  </button>
                  <button onClick={() => setVerified(false)} className="btn btn-danger verify-btn no">
                    No
                  </button>
                </div>
                {verified !== null && (
                  <p className={`status ${verified ? "status-verified" : "status-rejected"}`}>
                    Status: {verified ? "✅ Verified" : "❌ Rejected"}
                  </p>
                )}
                {verified && (
                  <>
                    <input
                      type="text"
                      placeholder="Enter IPFS hash"
                      className="input-field"
                      value={ipfsHash}
                      onChange={(e) => setIpfsHash(e.target.value)}
                    />
                    <button className="btn btn-primary mint-btn" onClick={mintSBT}>
                      Mint SBT
                    </button>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}