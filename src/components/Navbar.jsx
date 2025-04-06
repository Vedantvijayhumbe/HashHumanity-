"use client"

import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Menu, X } from "lucide-react"
import ThemeToggle from "./ThemeToggle"
import "./Navbar.css"

function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const navigate = useNavigate()

  const handleGetInvolved = () => {
    setIsOpen(false)
    navigate("/ProfilePage")
  }

  // Dropdown hover logic
  useEffect(() => {
    const dropdown = document.querySelector(".dropdown")
    const content = dropdown?.querySelector(".dropdown-content")

    const show = () => content && (content.style.display = "block")
    const hide = () => content && (content.style.display = "none")

    dropdown?.addEventListener("mouseenter", show)
    dropdown?.addEventListener("mouseleave", hide)

    return () => {
      dropdown?.removeEventListener("mouseenter", show)
      dropdown?.removeEventListener("mouseleave", hide)
    }
  }, [])

  const linkStyle = {
    padding: "10px 14px",
    textDecoration: "none",
    display: "block",
    color: "#333",
    fontSize: "14px",
  }

  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <div className="navbar-logo">
          <Link to="/" className="logo-text">
            OPENShelter
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="desktop-nav">
          <a href="/#problem" className="nav-link">
            Problem
          </a>
          <a href="/#solution" className="nav-link">
            Solution
          </a>
          <a href="/#how-it-works" className="nav-link">
            How It Works
          </a>
          <a href="/#demo" className="nav-link">
            Demo
          </a>
          <Link to="/currency-converter" className="nav-link">
            Currency Converter
          </Link>
          <Link to="/visa" className="mobile-link" onClick={() => setIsOpen(false)}>
            Visa
          </Link>

          {/* Transaction History with Dropdown */}
          <div
            className="nav-link dropdown"
            style={{ position: "relative" }}
          >
            Transaction History
            <div
              className="dropdown-content"
              style={{
                display: "none",
                position: "absolute",
                top: "100%",
                left: 0,
                backgroundColor: "#fff",
                boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                borderRadius: "6px",
                zIndex: 1000,
                minWidth: "180px",
              }}
            >
              <Link to="/transaction/Loan_Disrubment" style={linkStyle}>
                Loan Disrubment
              </Link>
              <Link to="/transaction/Previous" style={linkStyle}>
                Previous Borrowings
              </Link>
              <Link to="/transaction/Loan_Repayment" style={linkStyle}>
                Loan Repayment
              </Link>
            </div>
          </div>

          <a href="/#join" className="nav-link">
            Join Us
          </a>
          <button className="nav-button" onClick={handleGetInvolved}>
            Get Involved
          </button>
        </div>

        {/* Mobile Navigation Toggle */}
        <div className="mobile-toggle">
          <ThemeToggle />
          <button onClick={() => setIsOpen(!isOpen)} className="toggle-button">
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isOpen && (
        <div className="mobile-menu">
          <div className="mobile-menu-inner">
            <a href="/#problem" className="mobile-link" onClick={() => setIsOpen(false)}>
              Problem
            </a>
            <a href="/#solution" className="mobile-link" onClick={() => setIsOpen(false)}>
              Solution
            </a>
            <a href="/#how-it-works" className="mobile-link" onClick={() => setIsOpen(false)}>
              How It Works
            </a>
            <a href="/#demo" className="mobile-link" onClick={() => setIsOpen(false)}>
              Demo
            </a>
            <Link to="/currency-converter" className="mobile-link" onClick={() => setIsOpen(false)}>
              Currency Converter
            </Link>
            <Link to="/transaction" className="mobile-link" onClick={() => setIsOpen(false)}>
              Transaction History
            </Link>
            <a href="/#join" className="mobile-link" onClick={() => setIsOpen(false)}>
              Join Us
            </a>
            <button className="mobile-button" onClick={handleGetInvolved}>
              Get Involved
            </button>
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar
