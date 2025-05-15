"use client"

import { useEffect, useRef } from "react"

export default function TokenDisplay() {
  const canvasRef = useRef(null)
  const animationRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas size based on device pixel ratio for better quality
    const getCanvasSize = () => {
      const windowWidth = window.innerWidth
      // Responsive size: smaller on mobile, larger on desktop
      if (windowWidth < 640) {
        return 200 // Smaller size for mobile
      } else if (windowWidth < 1024) {
        return 250 // Medium size for tablets
      } else {
        return 300 // Reduced size for desktop (original was 500)
      }
    }

    let size = getCanvasSize()
    const scale = window.devicePixelRatio || 1

    canvas.width = size * scale
    canvas.height = size * scale
    canvas.style.width = `${size}px`
    canvas.style.height = `${size}px`

    ctx.scale(scale, scale)

    const centerX = size / 2
    const centerY = size / 2
    const radius = size * 0.45 // Maintain proportional radius

    // Animation variables
    let animationPhase = 0

    // Animation function
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      drawToken(ctx, centerX, centerY, radius, animationPhase, size)
      animationPhase += 0.01
      animationRef.current = requestAnimationFrame(animate)
    }

    // Start animation
    animate()

    // Handle window resize
    const handleResize = () => {
      size = getCanvasSize()
      canvas.width = size * scale
      canvas.height = size * scale
      canvas.style.width = `${size}px`
      canvas.style.height = `${size}px`
      ctx.scale(scale, scale)
    }

    window.addEventListener("resize", handleResize)

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [])

  return (
    <div className="token-container relative flex justify-center items-center">
      <canvas ref={canvasRef} className="shadow-[0_0_20px_rgba(218,165,32,0.4)] rounded-full" />
    </div>
  )
}

function drawToken(ctx, centerX, centerY, radius, phase, size) {
  // Create gradient for the main coin body
  const mainGradient = ctx.createRadialGradient(centerX, centerY, radius * 0.1, centerX, centerY, radius)
  mainGradient.addColorStop(0, "#3a3a30")
  mainGradient.addColorStop(0.8, "#2a2a20")
  mainGradient.addColorStop(1, "#1a1a15")

  // Create gradient for the gold border
  const borderGradient = ctx.createRadialGradient(centerX, centerY, radius * 0.9, centerX, centerY, radius)
  borderGradient.addColorStop(0, "#d4af37")
  borderGradient.addColorStop(0.5, "#f9d776")
  borderGradient.addColorStop(1, "#d4af37")

  // Draw main coin body
  ctx.beginPath()
  ctx.arc(centerX, centerY, radius, 0, Math.PI * 2)
  ctx.fillStyle = mainGradient
  ctx.fill()

  // Draw outer gold border
  ctx.beginPath()
  ctx.arc(centerX, centerY, radius, 0, Math.PI * 2)
  ctx.lineWidth = radius * 0.05
  ctx.strokeStyle = borderGradient
  ctx.stroke()

  // Draw inner circle
  ctx.beginPath()
  ctx.arc(centerX, centerY, radius * 0.8, 0, Math.PI * 2)
  ctx.lineWidth = radius * 0.02
  ctx.strokeStyle = borderGradient
  ctx.stroke()

  // Draw animated circuit board pattern
  drawCircuitPattern(ctx, centerX, centerY, radius * 0.7, phase, size)

  // Draw stars around the edge with subtle animation
  drawStars(ctx, centerX, centerY, radius * 0.9, 16, phase, size)

  // Draw RCX text with subtle glow animation
  drawText(ctx, centerX, centerY, radius, phase, size)
}

function drawCircuitPattern(ctx, centerX, centerY, radius, phase, size) {
  const lines = 12
  const circleRadius = radius * 0.1

  // Animate the circuit lines with a pulsing effect
  const pulseIntensity = 0.3 + Math.sin(phase * 2) * 0.1

  ctx.strokeStyle = `rgba(218, 165, 32, ${pulseIntensity})`
  ctx.lineWidth = size * 0.002 // Scale line width

  // Draw circuit lines
  for (let i = 0; i < lines; i++) {
    const angle = ((Math.PI * 2) / lines) * i + phase * 0.1
    const startX = centerX + Math.cos(angle) * circleRadius
    const startY = centerY + Math.sin(angle) * circleRadius
    const endX = centerX + Math.cos(angle) * radius
    const endY = centerY + Math.sin(angle) * radius

    ctx.beginPath()
    ctx.moveTo(startX, startY)

    // Add some bends to the lines to look like circuits
    const bendPoints = Math.floor(Math.random() * 3) + 1
    let lastX = startX
    let lastY = startY

    for (let j = 1; j <= bendPoints; j++) {
      const t = j / (bendPoints + 1)
      const dist = circleRadius + (radius - circleRadius) * t

      // Add some randomness to the bend with animation
      const bendAngle = angle + (Math.random() * 0.4 - 0.2) + Math.sin(phase + i) * 0.05
      const nextX = centerX + Math.cos(bendAngle) * dist
      const nextY = centerY + Math.sin(bendAngle) * dist

      ctx.lineTo(nextX, nextY)

      // Add small circles at bend points with animation
      if (Math.random() > 0.7) {
        ctx.stroke()
        ctx.beginPath()

        // Animate the node size
        const nodeSize = (size * 0.005) + Math.sin(phase * 3 + i * 0.5) * (size * 0.0015)

        ctx.arc(nextX, nextY, nodeSize, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(218, 165, 32, ${pulseIntensity + 0.2})`
        ctx.fill()
        ctx.beginPath()
        ctx.moveTo(nextX, nextY)
      }

      lastX = nextX
      lastY = nextY
    }

    ctx.lineTo(endX, endY)
    ctx.stroke()
  }

  // Add some random dots for circuit nodes with animation
  for (let i = 0; i < 20; i++) {
    const nodePhase = phase + i * 0.2
    const angle = Math.random() * Math.PI * 2 + phase * 0.1
    const dist = circleRadius + Math.random() * (radius - circleRadius)
    const x = centerX + Math.cos(angle) * dist
    const y = centerY + Math.sin(angle) * dist

    // Animate the node size and opacity
    const nodeSize = (size * 0.005) + Math.sin(nodePhase * 2) * (size * 0.0015)
    const nodeOpacity = 0.5 + Math.sin(nodePhase * 3) * 0.2

    ctx.beginPath()
    ctx.arc(x, y, nodeSize, 0, Math.PI * 2)
    ctx.fillStyle = `rgba(218, 165, 32, ${nodeOpacity})`
    ctx.fill()
  }
}

function drawStars(ctx, centerX, centerY, radius, count, phase, size) {
  const starRadius = radius * 0.05

  for (let i = 0; i < count; i++) {
    const angle = ((Math.PI * 2) / count) * i
    const x = centerX + Math.cos(angle) * radius
    const y = centerY + Math.sin(angle) * radius

    // Animate star size with subtle pulsing
    const starSize = starRadius * (0.9 + Math.sin(phase * 2 + i * 0.5) * 0.1)

    drawStar(ctx, x, y, starSize, 5, phase + i * 0.2, size)
  }
}

function drawStar(ctx, cx, cy, radius, spikes, phase, size) {
  let rot = (Math.PI / 2) * 3
  const step = Math.PI / spikes

  // Gold gradient for stars with animation
  const starGradient = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius)

  // Animate the gradient colors
  const colorIntensity = 0.8 + Math.sin(phase) * 0.2
  starGradient.addColorStop(0, `rgba(249, 215, 118, ${colorIntensity})`)
  starGradient.addColorStop(1, `rgba(212, 175, 55, ${colorIntensity})`)

  ctx.beginPath()
  ctx.moveTo(cx, cy - radius)

  for (let i = 0; i < spikes; i++) {
    const x1 = cx + Math.cos(rot) * radius
    const y1 = cy + Math.sin(rot) * radius
    rot += step

    const x2 = cx + Math.cos(rot) * (radius * 0.4)
    const y2 = cy + Math.sin(rot) * (radius * 0.4)
    rot += step

    ctx.lineTo(x1, y1)
    ctx.lineTo(x2, y2)
  }

  ctx.lineTo(cx, cy - radius)
  ctx.closePath()
  ctx.fillStyle = starGradient
  ctx.fill()
}

function drawText(ctx, centerX, centerY, radius, phase, size) {
  // Animate text with subtle glow effect
  const glowIntensity = 5 + Math.sin(phase * 2) * 3

  ctx.save()

  // Add glow effect
  ctx.shadowColor = "#f9d776"
  ctx.shadowBlur = glowIntensity

  ctx.font = `bold ${radius * 0.3}px Arial`
  ctx.textAlign = "center"
  ctx.textBaseline = "middle"

  // Gold gradient for text
  const textGradient = ctx.createLinearGradient(centerX - radius * 0.4, centerY, centerX + radius * 0.4, centerY)
  textGradient.addColorStop(0, "#d4af37")
  textGradient.addColorStop(0.5, "#f9d776")
  textGradient.addColorStop(1, "#d4af37")

  ctx.fillStyle = textGradient
  ctx.fillText("RCX", centerX, centerY)

  ctx.restore()
}