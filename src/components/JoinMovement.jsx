"use client"

import { useState } from "react"
import { Building2, Code, Users } from "lucide-react"
import "./JoinMovement.css"

function JoinMovement() {
  const [email, setEmail] = useState("")
  const [role, setRole] = useState("ngo")

  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle form submission
    alert(`Thank you for joining as a ${role}! We'll be in touch at ${email}`)
    setEmail("")
  }

  return (
    <section id="join" className="join-section">
      <div className="join-container">
        <h2 className="join-heading">Join the Movement</h2>
        <p className="join-subheading">
          Be part of the solution that empowers refugees with digital identity, privacy, and financial inclusion.
        </p>

        <div className="join-cards">
          <div className="join-card">
            <div className="join-icon-container">
              <div className="join-icon-circle indigo">
                <Building2 size={32} className="join-icon indigo" />
              </div>
            </div>
            <h3 className="join-card-title">For NGOs</h3>
            <p className="join-card-text">
              Partner with us to issue secure credentials to refugees and improve service delivery across borders.
            </p>
            <button onClick={() => setRole("ngo")} className="join-button primary">
              Partner With Us
            </button>
          </div>

          <div className="join-card">
            <div className="join-icon-container">
              <div className="join-icon-circle teal">
                <Code size={32} className="join-icon teal" />
              </div>
            </div>
            <h3 className="join-card-title">For Developers</h3>
            <p className="join-card-text">
              Contribute to our open-source protocol and help build the future of decentralized identity.
            </p>
            <button onClick={() => setRole("developer")} className="join-button teal">
              Contribute
            </button>
          </div>

          <div className="join-card">
            <div className="join-icon-container">
              <div className="join-icon-circle indigo">
                <Users size={32} className="join-icon indigo" />
              </div>
            </div>
            <h3 className="join-card-title">For Refugees (Beta)</h3>
            <p className="join-card-text">
              Join our beta program to test the platform and help us improve the user experience.
            </p>
            <button onClick={() => setRole("refugee")} className="join-button gray">
              Coming Soon
            </button>
          </div>
        </div>

        <div className="form-container">
          <h3 className="form-title">Stay Updated</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email" className="form-label">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-input"
                placeholder="your@email.com"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="role" className="form-label">
                I am a...
              </label>
              <select id="role" value={role} onChange={(e) => setRole(e.target.value)} className="form-select">
                <option value="ngo">NGO / Organization</option>
                <option value="developer">Developer</option>
                <option value="refugee">Refugee</option>
                <option value="other">Other Stakeholder</option>
              </select>
            </div>

            <button type="submit" className="form-button">
              Join Waitlist
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}

export default JoinMovement

