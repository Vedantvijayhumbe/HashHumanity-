import { Key, Shield, Wallet, Lock } from "lucide-react"
import "./SolutionSection.css"

function SolutionSection() {
  return (
    <section id="solution" className="solution-section">
      <div className="solution-container">
        <h2 className="solution-heading">Decentralized, Private, and Human-Centric Identity Solution</h2>
        <p className="solution-subheading">
          Our platform leverages blockchain technology to provide secure, private, and user-controlled identity
          solutions for the stateless.
        </p>

        <div className="solution-cards">
          <div className="solution-card">
            <div className="solution-icon-container">
              <div className="solution-icon-circle indigo">
                <Key size={32} className="solution-icon indigo" />
              </div>
            </div>
            <h3 className="solution-card-title">Soulbound Tokens (SBTs)</h3>
            <p className="solution-card-text">
              Non-transferable, tamper-proof credentials issued by trusted NGOs that stay with the individual
              permanently.
            </p>
          </div>

          <div className="solution-card">
            <div className="solution-icon-container">
              <div className="solution-icon-circle teal">
                <Shield size={32} className="solution-icon teal" />
              </div>
            </div>
            <h3 className="solution-card-title">Zero-Knowledge Proofs</h3>
            <p className="solution-card-text">
              Verify status and credentials without revealing sensitive personal data, maintaining privacy and security.
            </p>
          </div>

          <div className="solution-card">
            <div className="solution-icon-container">
              <div className="solution-icon-circle teal">
                <Wallet size={32} className="solution-icon teal" />
              </div>
            </div>
            <h3 className="solution-card-title">DeFi Microloans</h3>
            <p className="solution-card-text">
              Build credit history on-chain to access stablecoin loans and financial services previously unavailable.
            </p>
          </div>

          <div className="solution-card">
            <div className="solution-icon-container">
              <div className="solution-icon-circle indigo">
                <Lock size={32} className="solution-icon indigo" />
              </div>
            </div>
            <h3 className="solution-card-title">Privacy & Sovereignty</h3>
            <p className="solution-card-text">
              User-owned identity wallet — not a centralized vault. You control who sees your information and when.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default SolutionSection

