"use client"

import { useState } from "react"
import { Smartphone, CheckCircle, Shield, CreditCard } from "lucide-react"
import "./DemoPreview.css"

function DemoPreview() {
  const [activeTab, setActiveTab] = useState("identity")

  const tabs = {
    identity: {
      title: "Identity Wallet",
      icon: <Smartphone size={24} />,
      content: (
        <div className="demo-card">
          <div className="demo-header">
            <h4 className="demo-title">RefugeID Wallet</h4>
            <p className="demo-subtitle">Secure, private, and portable</p>
          </div>
          <div className="demo-content">
            <div className="credential-item">
              <div className="credential-header">
                <CheckCircle size={16} className="credential-icon" />
                <span className="credential-title">Identity Verified</span>
              </div>
              <p className="credential-subtitle">Verified by UNHCR on 04/05/2023</p>
            </div>

            <div className="credential-item">
              <div className="credential-header">
                <CheckCircle size={16} className="credential-icon" />
                <span className="credential-title">Medical Records</span>
              </div>
              <p className="credential-subtitle">Verified by Doctors Without Borders</p>
            </div>

            <div className="credential-item">
              <div className="credential-header">
                <CheckCircle size={16} className="credential-icon" />
                <span className="credential-title">Education Credentials</span>
              </div>
              <p className="credential-subtitle">Verified by UNESCO</p>
            </div>

            <button className="demo-button primary">Share Credentials</button>
          </div>
        </div>
      ),
    },
    verification: {
      title: "Anonymous Verification",
      icon: <Shield size={24} />,
      content: (
        <div className="demo-card">
          <div className="demo-header teal">
            <h4 className="demo-title">Zero-Knowledge Verification</h4>
            <p className="demo-subtitle">Prove without revealing</p>
          </div>
          <div className="demo-content">
            <div className="verification-section">
              <h5 className="section-title">Verification Request:</h5>
              <div className="verification-box">
                <p className="verification-text">Housing Authority needs to verify:</p>
                <ul className="verification-list">
                  <li>You are over 18 years old</li>
                  <li>You have refugee status</li>
                  <li>You have no criminal record</li>
                </ul>
              </div>
            </div>

            <div className="verification-section">
              <h5 className="section-title">Your Response:</h5>
              <div className="verification-box teal">
                <div className="credential-header">
                  <CheckCircle size={16} className="credential-icon" />
                  <span className="verification-text">Proof generated without revealing personal data</span>
                </div>
                <p className="credential-subtitle">
                  Zero-knowledge proof confirms all requirements without sharing your actual information.
                </p>
              </div>
            </div>

            <button className="demo-button teal">Send Verification</button>
          </div>
        </div>
      ),
    },
    loans: {
      title: "Access Microloans",
      icon: <CreditCard size={24} />,
      content: (
        <div className="demo-card">
          <div className="demo-header">
            <h4 className="demo-title">DeFi Microloan Portal</h4>
            <p className="demo-subtitle">Financial inclusion through blockchain</p>
          </div>
          <div className="demo-content">
            <div className="trust-score-section">
              <div className="trust-score-header">
                <span className="trust-score-label">Trust Score</span>
                <span className="trust-score-value">87/100</span>
              </div>
              <div className="trust-score-bar">
                <div className="trust-score-fill" style={{ width: "87%" }}></div>
              </div>
              <p className="trust-score-subtext">Based on your verified credentials and on-chain history</p>
            </div>

            <div className="loans-section">
              <h5 className="section-title">Available Loans</h5>
              <div className="loans-list">
                <div className="loan-item">
                  <span className="loan-name">Small Business Startup</span>
                  <span className="loan-amount">$500 USDC</span>
                </div>
                <div className="loan-item">
                  <span className="loan-name">Education Fund</span>
                  <span className="loan-amount">$300 USDC</span>
                </div>
                <div className="loan-item">
                  <span className="loan-name">Emergency Fund</span>
                  <span className="loan-amount">$200 USDC</span>
                </div>
              </div>
            </div>

            <button className="demo-button primary">Apply for Loan</button>
          </div>
        </div>
      ),
    },
  }

  return (
    <section id="demo" className="demo-section">
      <div className="demo-container">
        <h2 className="demo-heading">See How It Works</h2>
        <p className="demo-subheading">
          Our platform empowers refugees with digital identity, privacy-preserving verification, and financial
          inclusion.
        </p>

        <div className="demo-flex-container">
          <div className="demo-sidebar">
            <div className="sidebar-card">
              <h3 className="sidebar-title">Interactive Demo</h3>

              <div className="tab-buttons">
                {Object.entries(tabs).map(([key, tab]) => (
                  <button
                    key={key}
                    onClick={() => setActiveTab(key)}
                    className={`tab-button ${activeTab === key ? "active" : ""}`}
                  >
                    <span className="tab-icon">{tab.icon}</span>
                    <span>{tab.title}</span>
                  </button>
                ))}
              </div>

              <div className="sidebar-footer">
                <p className="sidebar-footer-text">
                  This is a simplified demo of our platform's core functionality. The actual implementation includes
                  additional security features and user experience enhancements.
                </p>
              </div>
            </div>
          </div>

          <div className="demo-content-container">
            <div className="demo-wrapper">{tabs[activeTab].content}</div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default DemoPreview

