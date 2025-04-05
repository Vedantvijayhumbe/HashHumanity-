"use client"

import { useState, useEffect } from "react"
import Navbar from "./components/Navbar"
import Hero from "./components/Hero"
import ProblemSection from "./components/ProblemSection"
import SolutionSection from "./components/SolutionSection"
import HowItWorks from "./components/HowItWorks"
import DemoPreview from "./components/DemoPreview"
import Partners from "./components/Partners"
import JoinMovement from "./components/JoinMovement"
import Footer from "./components/Footer"
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
    <main className="app-main">
      <Navbar />
      <Hero />
      <ProblemSection />
      <SolutionSection />
      <HowItWorks />
      <DemoPreview />
      <Partners />
      <JoinMovement />
      <Footer />
    </main>
  )
}

export default App

