"use client"

import { useEffect, useRef } from "react"
import "./Hero.css"

function Hero() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight

    // Simple animation of globe with connecting nodes
    const nodes = []
    const connections = []
    const nodeCount = 30

    // Create nodes
    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 2 + 1,
        vx: Math.random() * 0.5 - 0.25,
        vy: Math.random() * 0.5 - 0.25,
      })
    }

    // Create connections
    for (let i = 0; i < nodeCount; i++) {
      for (let j = i + 1; j < nodeCount; j++) {
        if (Math.random() > 0.85) {
          connections.push([i, j])
        }
      }
    }

    function drawGlobe() {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw a subtle globe
      ctx.beginPath()
      ctx.arc(canvas.width / 2, canvas.height / 2, Math.min(canvas.width, canvas.height) * 0.3, 0, Math.PI * 2)
      ctx.strokeStyle = "rgba(99, 102, 241, 0.2)"
      ctx.stroke()

      // Update and draw nodes
      nodes.forEach((node, i) => {
        node.x += node.vx
        node.y += node.vy

        // Bounce off edges
        if (node.x < 0 || node.x > canvas.width) node.vx *= -1
        if (node.y < 0 || node.y > canvas.height) node.vy *= -1

        // Draw node
        ctx.beginPath()
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2)
        ctx.fillStyle = i % 3 === 0 ? "rgba(99, 102, 241, 0.7)" : "rgba(20, 184, 166, 0.7)"
        ctx.fill()
      })

      // Draw connections
      connections.forEach(([i, j]) => {
        const nodeA = nodes[i]
        const nodeB = nodes[j]
        const distance = Math.sqrt(Math.pow(nodeA.x - nodeB.x, 2) + Math.pow(nodeA.y - nodeB.y, 2))

        if (distance < 100) {
          ctx.beginPath()
          ctx.moveTo(nodeA.x, nodeA.y)
          ctx.lineTo(nodeB.x, nodeB.y)
          ctx.strokeStyle = `rgba(99, 102, 241, ${0.8 - distance / 100})`
          ctx.lineWidth = 0.5
          ctx.stroke()
        }
      })

      requestAnimationFrame(drawGlobe)
    }

    drawGlobe()

    // Handle resize
    const handleResize = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return (
    <section className="hero-section">
      <canvas ref={canvasRef} className="hero-canvas"></canvas>
      <div className="hero-container">
        <div className="hero-content">
          <h1 className="hero-heading">Empowering the Stateless with Identity, Trust, and Financial Freedom.</h1>
          <p className="hero-subheading">
            A decentralized platform for refugees to regain agency, dignity, and economic power.
          </p>
          <div className="hero-buttons">
            <button className="hero-button primary">Get Involved</button>
            <button className="hero-button secondary">Explore Identity System</button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero

