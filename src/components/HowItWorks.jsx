"use client"

import { useEffect, useRef, useState } from "react"
import { Building2, Wallet, ShieldCheck, Award, CreditCard } from "lucide-react"
import "./HowItWorks.css"

function HowItWorks() {
  const [activeStep, setActiveStep] = useState(0)
  const stepsRef = useRef(null)

  const steps = [
    {
      title: "NGO Issues SBT",
      description: "Trusted organizations verify identity and issue tamper-proof Soulbound Tokens to refugees.",
      icon: <Building2 size={24} className="step-icon indigo" />,
    },
    {
      title: "Refugee Wallet Stores It",
      description: "The secure digital wallet stores credentials privately and securely on the blockchain.",
      icon: <Wallet size={24} className="step-icon indigo" />,
    },
    {
      title: "ZKP for Verification",
      description: "Zero-Knowledge Proofs allow verification without revealing sensitive personal information.",
      icon: <ShieldCheck size={24} className="step-icon indigo" />,
    },
    {
      title: "Earn Reputation On-Chain",
      description: "Build a verifiable history of interactions and credentials over time.",
      icon: <Award size={24} className="step-icon indigo" />,
    },
    {
      title: "Access Microloans",
      description: "Use your on-chain reputation to access financial services and stablecoin microloans.",
      icon: <CreditCard size={24} className="step-icon teal" />,
    },
  ]

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          const interval = setInterval(() => {
            setActiveStep((prev) => (prev + 1) % steps.length)
          }, 3000)
          return () => clearInterval(interval)
        }
      },
      { threshold: 0.3 },
    )

    if (stepsRef.current) {
      observer.observe(stepsRef.current)
    }

    return () => {
      if (stepsRef.current) {
        observer.unobserve(stepsRef.current)
      }
    }
  }, [steps.length])

  return (
    <section id="how-it-works" className="how-it-works-section">
      <div className="how-it-works-container">
        <h2 className="how-it-works-heading">How It Works</h2>

        <div ref={stepsRef} className="steps-container">
          <div className="progress-container">
            {/* Progress Bar */}
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: `${(activeStep / (steps.length - 1)) * 100}%` }}></div>
            </div>

            {/* Steps */}
            <div className="steps-row">
              {steps.map((step, index) => (
                <div key={index} className={`step ${index === activeStep ? "active" : ""}`}>
                  <div className={`step-circle ${index === activeStep ? "active" : ""}`}>{step.icon}</div>
                  <h3 className="step-title">{step.title}</h3>
                  <p className="step-description">{index === activeStep ? step.description : ""}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Mobile Description */}
          <div className="mobile-description">
            <p>{steps[activeStep].description}</p>
          </div>

          {/* Step Indicators */}
          <div className="step-indicators">
            {steps.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveStep(index)}
                className={`indicator ${index === activeStep ? "active" : ""}`}
                aria-label={`Go to step ${index + 1}`}
              ></button>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default HowItWorks

