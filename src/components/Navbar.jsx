"use client"

import { useState } from "react"
import { Menu, X } from "lucide-react"
import ThemeToggle from "./ThemeToggle"
import "./Navbar.css"

function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <div className="navbar-logo">
          <span className="logo-text">RefugeID</span>
        </div>

        {/* Desktop Navigation */}
        <div className="desktop-nav">
          <a href="#problem" className="nav-link">
            Problem
          </a>
          <a href="#solution" className="nav-link">
            Solution
          </a>
          <a href="#how-it-works" className="nav-link">
            How It Works
          </a>
          <a href="#demo" className="nav-link">
            Demo
          </a>
          <a href="#join" className="nav-link">
            Join Us
          </a>
          {/* <ThemeToggle /> */}
          <button className="nav-button">Get Involved</button>
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
            <a href="#problem" className="mobile-link" onClick={() => setIsOpen(false)}>
              Problem
            </a>
            <a href="#solution" className="mobile-link" onClick={() => setIsOpen(false)}>
              Solution
            </a>
            <a href="#how-it-works" className="mobile-link" onClick={() => setIsOpen(false)}>
              How It Works
            </a>
            <a href="#demo" className="mobile-link" onClick={() => setIsOpen(false)}>
              Demo
            </a>
            <a href="#join" className="mobile-link" onClick={() => setIsOpen(false)}>
              Join Us
            </a>
            <button className="mobile-button">Get Involved</button>
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar

