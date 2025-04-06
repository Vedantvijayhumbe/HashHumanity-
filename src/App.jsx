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
import "./App.css"

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
            </main>
          }
        />
      </Routes>
      <Footer />
    </Router>
  )
}

export default App

