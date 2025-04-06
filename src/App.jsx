"use client"

import { useState, useEffect } from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Navbar from "./components/Navbar"
import Hero from "./components/Hero"
import ProblemSection from "./components/ProblemSection"
import SolutionSection from "./components/SolutionSection"
import HowItWorks from "./components/HowItWorks"
import DemoPreview from "./components/DemoPreview"
import Partners from "./components/Partners"
import JoinMovement from "./components/JoinMovement"
import Footer from "./components/Footer"
import CurrencyConverterPage from "./pages/CurrencyConverterPage"
import Profile from "./components/ProfilePage"
import LoanDisbursement from "./components/LoanDisbursement"
import borrowings from "./components/borrowings"
import LoanRepayment from "./components/LoanRepayment"
import "./App.css"
import HoverDropdown from "./components/HoverDropDown"

function App() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/currency-converter" element={<CurrencyConverterPage />} />
        <Route path="/profile" element={<Profile/>} />
        <Route path="/transaction" element={<transaction-history/>} />
        <Route path="/components/LoanDisbursement" element={<LoanDisbursement/>}/>
        <Route path="/components/LoanRepayment" element={<LoanRepayment/>}/>
        <Route path="/components/borrowings" element={<borrowings/>}/>
        <Route
          path="/"
          element={
            <main className="app-main">
              <Hero />
              <ProblemSection />
              <SolutionSection />
              <HowItWorks />
              <DemoPreview />
              <Partners />
              <JoinMovement />
              <Footer />
            </main>
          }
        />
      </Routes>
    </Router>
  )
}

export default App

