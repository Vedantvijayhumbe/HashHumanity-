"use client"

import { useEffect, useRef } from "react"
import { ShieldOff, Lock, AlertTriangle } from "lucide-react"
import { useTheme } from "../contexts/ThemeContext"
import "./ProblemSection.css"

function ProblemSection() {
  const canvasRef = useRef(null)
  const { theme } = useTheme()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight

    // Animation for cycle of exclusion
    let angle = 0
    const centerX = canvas.width / 2
    const centerY = canvas.height / 2
    const radius = Math.min(centerX, centerY) * 0.7

    const stages = [
      { label: "No Identity", color: theme === "dark" ? "#6366f1" : "#4f46e5" },
      { label: "No Services", color: theme === "dark" ? "#14b8a6" : "#0d9488" },
      { label: "No Opportunity", color: theme === "dark" ? "#6366f1" : "#4f46e5" },
      { label: "No Economic Power", color: theme === "dark" ? "#14b8a6" : "#0d9488" },
    ]

    function drawCycle() {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw circle
      ctx.beginPath()
      ctx.arc(centerX, centerY, radius, 0, Math.PI * 2)
      ctx.strokeStyle = theme === "dark" ? "rgba(99, 102, 241, 0.3)" : "rgba(99, 102, 241, 0.3)"
      ctx.lineWidth = 2
      ctx.stroke()

      // Draw stages
      stages.forEach((stage, i) => {
        const stageAngle = ((Math.PI * 2) / stages.length) * i + angle
        const x = centerX + Math.cos(stageAngle) * radius
        const y = centerY + Math.sin(stageAngle) * radius

        // Draw node
        ctx.beginPath()
        ctx.arc(x, y, 10, 0, Math.PI * 2)
        ctx.fillStyle = stage.color
        ctx.fill()

        // Draw label
        ctx.font = "14px Inter, sans-serif"
        ctx.fillStyle = theme === "dark" ? "#d1d5db" : "#4b5563"
        ctx.textAlign = "center"
        ctx.textBaseline = "middle"

        const labelX = centerX + Math.cos(stageAngle) * (radius + 30)
        const labelY = centerY + Math.sin(stageAngle) * (radius + 30)
        ctx.fillText(stage.label, labelX, labelY)
      })

      // Draw arrows between stages
      stages.forEach((_, i) => {
        const startAngle = ((Math.PI * 2) / stages.length) * i + angle
        const endAngle = ((Math.PI * 2) / stages.length) * ((i + 1) % stages.length) + angle

        const startX = centerX + Math.cos(startAngle) * radius
        const startY = centerY + Math.sin(startAngle) * radius

        const endX = centerX + Math.cos(endAngle) * radius
        const endY = centerY + Math.sin(endAngle) * radius

        // Calculate control points for curved arrow
        const midAngle = (startAngle + endAngle) / 2
        const controlDistance = radius * 0.3
        const controlX = centerX + Math.cos(midAngle) * (radius - controlDistance)
        const controlY = centerY + Math.sin(midAngle) * (radius - controlDistance)

        // Draw curved arrow
        ctx.beginPath()
        ctx.moveTo(startX, startY)
        ctx.quadraticCurveTo(controlX, controlY, endX, endY)
        ctx.strokeStyle = theme === "dark" ? "rgba(99, 102, 241, 0.5)" : "rgba(99, 102, 241, 0.5)"
        ctx.lineWidth = 2
        ctx.stroke()

        // Draw arrowhead
        const arrowSize = 8
        const arrowAngle = Math.atan2(endY - controlY, endX - controlX)

        ctx.beginPath()
        ctx.moveTo(endX, endY)
        ctx.lineTo(
          endX - arrowSize * Math.cos(arrowAngle - Math.PI / 6),
          endY - arrowSize * Math.sin(arrowAngle - Math.PI / 6),
        )
        ctx.lineTo(
          endX - arrowSize * Math.cos(arrowAngle + Math.PI / 6),
          endY - arrowSize * Math.sin(arrowAngle + Math.PI / 6),
        )
        ctx.closePath()
        ctx.fillStyle = theme === "dark" ? "rgba(99, 102, 241, 0.7)" : "rgba(99, 102, 241, 0.7)"
        ctx.fill()
      })

      // Slowly rotate
      angle += 0.002
      requestAnimationFrame(drawCycle)
    }

    drawCycle()

    // Handle resize
    const handleResize = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [theme])

  return (
    <section id="problem" className="problem-section">
      <div className="problem-container">
        <h2 className="problem-heading">The Identity Crisis Faced by 100M+ Refugees</h2>

        <div className="problem-cards">
          <div className="problem-card">
            <div className="problem-icon-container">
              <div className="problem-icon-circle">
                <ShieldOff size={32} className="problem-icon" />
              </div>
            </div>
            <h3 className="problem-card-title">No Legal Identity</h3>
            <p className="problem-card-text">
              Without recognized documentation, refugees are locked out of essential systems and services, creating a
              cycle of exclusion.
            </p>
          </div>

          <div className="problem-card">
            <div className="problem-icon-container">
              <div className="problem-icon-circle">
                <Lock size={32} className="problem-icon" />
              </div>
            </div>
            <h3 className="problem-card-title">No Privacy</h3>
            <p className="problem-card-text">
              Centralized databases put vulnerable populations at risk, exposing sensitive information to potential
              breaches and misuse.
            </p>
          </div>

          <div className="problem-card">
            <div className="problem-icon-container">
              <div className="problem-icon-circle">
                <AlertTriangle size={32} className="problem-icon" />
              </div>
            </div>
            <h3 className="problem-card-title">No Trust</h3>
            <p className="problem-card-text">
              NGOs and service providers struggle with cross-border verification, limiting their ability to provide
              consistent support.
            </p>
          </div>
        </div>

        <div className="cycle-container">
          <h3 className="cycle-title">The Cycle of Exclusion</h3>
          <canvas ref={canvasRef} className="cycle-canvas"></canvas>
        </div>
      </div>
    </section>
  )
}

export default ProblemSection

