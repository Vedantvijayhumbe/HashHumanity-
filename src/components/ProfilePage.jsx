"use client";

import Spline from "@splinetool/react-spline";
import { useEffect, useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { ethers } from "ethers";
import Lottie from "react-lottie";
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
  const [selectedFile, setSelectedFile] = useState(null);

  const [showAdminModal, setShowAdminModal] = useState(false);
  const [verifierId, setVerifierId] = useState("");
  const [password, setPassword] = useState("");
  const [showVerificationDetails, setShowVerificationDetails] = useState(false);
  const [ipfsHash, setIpfsHash] = useState("");
  const [mintedSBT, setMintedSBT] = useState(null);

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [country, setCountry] = useState("");
  const [phone, setPhone] = useState("");

  const [animationData, setAnimationData] = useState(null);
  const [isLoadingAnimation, setIsLoadingAnimation] = useState(true);

  const isFormValid =
    fullName && email && country && phone && selectedFileType && selectedFile;

  useEffect(() => {
    fetch("/animation.json")
      .then((res) => res.json())
      .then((data) => {
        setAnimationData(data);
        setIsLoadingAnimation(false);
      })
      .catch((err) => {
        console.error("Animation load error:", err);
        setIsLoadingAnimation(false);
      });
  }, []);

  const defaultLottieOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const connectWallet = async () => {
    if (!window.ethereum) {
      alert("Please install MetaMask to connect your wallet.");
      return;
    }

    try {
      const _provider = new ethers.BrowserProvider(window.ethereum);
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
    } catch (err) {
      console.error("Error connecting wallet:", err);
    }
  };

  const handleFileTypeChange = (e) => {
    setSelectedFileType(e.target.value);
    setSelectedFile(null); // Reset file when file type changes
  };

  const handleAdminSubmit = () => {
    if (verifierId && password) {
      setShowVerificationDetails(true);
    } else {
      alert("Please enter both Verifier ID and Password.");
    }
  };

  const closeAdminModal = () => {
    setShowAdminModal(false);
    setShowVerificationDetails(false);
    setVerifierId("");
    setPassword("");
    setIpfsHash("");
  };

  const mintSBT = async () => {
    if (!contract || !account || !ipfsHash) {
      alert("Missing contract/account/IPFS hash.");
      return;
    }

    try {
      const tx = await contract.registerRefugee(account, ipfsHash);
      await tx.wait();
      const sbtHash = await contract.getUserDocument(account);
      setMintedSBT(sbtHash);
      alert("SBT minted successfully!");
    } catch (err) {
      console.error("Minting error:", err);
      alert("Error minting SBT.");
    }
  };

  return (
    <>
      <div className="container">
        <div className="left-div">
          <Spline scene="https://prod.spline.design/6dOn5XExlRxxr-D5/scene.splinecode" />
        </div>

        <div className="right-div">
          {!showForm ? (
            <div className="card">
              <div className="card-content">
                <h1 className="card-title">OPENShelter</h1>
                <p className="card-description">
                  Decentralized Identity for Refugees
                </p>
                <button className="buttonp" onClick={() => setShowForm(true)}>Get Started</button>
              </div>
            </div>
          ) : (
            <div className="form-container">
              <FaUserCircle className="profile-icon" />

              <input
                type="text"
                placeholder="Full Name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />

              <input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <select value={country} onChange={(e) => setCountry(e.target.value)}>
                <option value="">Select Country</option>
                <option>India</option>
                <option>USA</option>
              </select>

              <input
                type="text"
                placeholder="Phone Number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />

              <button className="buttonp" onClick={connectWallet}>
                {account
                  ? `Connected: ${account.slice(0, 6)}...${account.slice(-4)}`
                  : "Connect Wallet"}
              </button>

              <label htmlFor="idtype">Choose ID Type:</label>
              <select id="idtype" value={selectedFileType} onChange={handleFileTypeChange}>
                <option value="">Select</option>
                <option value="passport">Passport</option>
                <option value="aadhaar">Aadhaar</option>
              </select>

              {selectedFileType && (
                <>
                  <label htmlFor="idupload">Upload {selectedFileType}:</label>
                  <input
                    type="file"
                    id="idupload"
                    onChange={(e) => setSelectedFile(e.target.files[0])}
                  />
                </>
              )}

              <button className="buttonp" onClick={() => setShowAdminModal(true)}>Go to Admin Panel</button>

              {isFormValid && (
                <button className="submit-button" onClick={() => alert("Form submitted!")}>
                  Submit
                </button>
              )}

              {mintedSBT && (
                <div className="sbt-result">
                  <p><strong>SBT Hash:</strong> {mintedSBT}</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* ADMIN MODAL */}
      {showAdminModal && (
        <div className="admin-modal">
          <div className="admin-content">
            <button className="buttonp" onClick={closeAdminModal}>Close</button>

            {!showVerificationDetails ? (
              <>
                <h3>Verifier Login</h3>
                <input
                  type="text"
                  placeholder="Verifier ID"
                  value={verifierId}
                  onChange={(e) => setVerifierId(e.target.value)}
                />
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button className="buttonp" onClick={handleAdminSubmit}>Verify</button>
              </>
            ) : (
              <>
                <h4>Document Verification</h4>
                <p><strong>Connected User:</strong> {account}</p>
                <input
                  type="text"
                  placeholder="Enter IPFS Hash"
                  value={ipfsHash}
                  onChange={(e) => setIpfsHash(e.target.value)}
                />
                <button className="buttonp" onClick={mintSBT}>Approve and Mint SBT</button>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
