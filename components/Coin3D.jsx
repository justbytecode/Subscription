"use client"

import { useEffect, useRef, useState } from "react"
import * as THREE from 'three'

export default function TokenDisplay3D() {
  const mountRef = useRef(null)
  const sceneRef = useRef(null)
  const rendererRef = useRef(null)
  const coinRef = useRef(null)
  const animationRef = useRef(null)
  const mouseRef = useRef({ x: 0, y: 0 })
  const isDraggingRef = useRef(false)
  const rotationRef = useRef({ x: 0, y: 0 })
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 640)
    }
    
    checkScreenSize()
    window.addEventListener("resize", checkScreenSize)

    if (!mountRef.current) return

    // Scene setup
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000)
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    
    // Get responsive size
    const getSize = () => {
      const windowWidth = window.innerWidth
      if (windowWidth < 480) return Math.min(windowWidth - 40, 180)
      if (windowWidth < 640) return 220
      if (windowWidth < 1024) return 280
      if (windowWidth < 1440) return 320
      return 380
    }

    const size = getSize()
    renderer.setSize(size, size)
    renderer.setClearColor(0x000000, 0)
    renderer.shadowMap.enabled = true
    renderer.shadowMap.type = THREE.PCFSoftShadowMap
    
    mountRef.current.appendChild(renderer.domElement)
    
    // Store references
    sceneRef.current = scene
    rendererRef.current = renderer

    // Create coin geometry
    const coinGroup = new THREE.Group()
    
    // Main coin body - rotated to face the camera
    const coinGeometry = new THREE.CylinderGeometry(2, 2, 0.3, 32)
    coinGeometry.rotateX(Math.PI / 2) // Rotate to face forward
    
    // Create gold material with reduced metalness for better visibility
    const coinMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xd4af37,
      metalness: 0.3,
      roughness: 0.3,
      clearcoat: 0.2,
      clearcoatRoughness: 0.2
    })
    
    const coinMesh = new THREE.Mesh(coinGeometry, coinMaterial)
    coinMesh.castShadow = true
    coinMesh.receiveShadow = true
    coinGroup.add(coinMesh)

    // Create edge ridges - flatter and less protruding
    for (let i = 0; i < 16; i++) {
      const angle = (i / 16) * Math.PI * 2
      const ridgeGeometry = new THREE.BoxGeometry(0.01, 0.05, 0.2)
      const ridgeMaterial = new THREE.MeshPhysicalMaterial({
        color: 0xf9d776,
        metalness: 0.4,
        roughness: 0.3
      })
      const ridge = new THREE.Mesh(ridgeGeometry, ridgeMaterial)
      ridge.position.x = Math.cos(angle) * 1.98
      ridge.position.y = Math.sin(angle) * 1.98
      ridge.position.z = 0
      ridge.lookAt(ridge.position.x * 2, ridge.position.y * 2, 0)
      coinGroup.add(ridge)
    }

    // Create circuit pattern on the surface
    const circuitGroup = new THREE.Group()
    
    // Create glowing circuit lines
    for (let i = 0; i < 12; i++) {
      const angle = (i / 12) * Math.PI * 2
      const points = []
      
      // Create curved path from center to edge in XY plane
      for (let j = 0; j <= 20; j++) {
        const t = j / 20
        const radius = 0.2 + t * 1.6
        const angleOffset = Math.sin(t * Math.PI * 2) * 0.3
        const x = Math.cos(angle + angleOffset) * radius
        const y = Math.sin(angle + angleOffset) * radius
        points.push(new THREE.Vector3(x, y, 0.1))
      }
      
      const curve = new THREE.CatmullRomCurve3(points)
      const tubeGeometry = new THREE.TubeGeometry(curve, 20, 0.01, 8, false)
      const tubeMaterial = new THREE.MeshStandardMaterial({
        color: 0x00ff88,
        emissive: 0x004422,
        transparent: true,
        opacity: 0.8
      })
      const tube = new THREE.Mesh(tubeGeometry, tubeMaterial)
      circuitGroup.add(tube)
    }

    // Add circuit nodes
    for (let i = 0; i < 20; i++) {
      const angle = Math.random() * Math.PI * 2
      const radius = 0.3 + Math.random() * 1.4
      const nodeGeometry = new THREE.SphereGeometry(0.03, 8, 8)
      const nodeMaterial = new THREE.MeshStandardMaterial({
        color: 0x00ffff,
        emissive: 0x004444
      })
      const node = new THREE.Mesh(nodeGeometry, nodeMaterial)
      node.position.x = Math.cos(angle) * radius
      node.position.y = Math.sin(angle) * radius
      node.position.z = 0.1
      circuitGroup.add(node)
    }

    coinGroup.add(circuitGroup)

    // Create stars around the edge - properly oriented in coin plane
    const starGroup = new THREE.Group()
    for (let i = 0; i < 16; i++) {
      const angle = (i / 16) * Math.PI * 2
      const starGeometry = createStarGeometry()
      const starMaterial = new THREE.MeshStandardMaterial({
        color: 0xffd700,
        emissive: 0x332200
      })
      const star = new THREE.Mesh(starGeometry, starMaterial)
      star.position.x = Math.cos(angle) * 1.8
      star.position.y = Math.sin(angle) * 1.8
      star.position.z = 0.1
      star.scale.setScalar(0.08)
      // No rotation needed - stars are already in XY plane
      starGroup.add(star)
    }
    coinGroup.add(starGroup)

    // Create RCX text - properly positioned and sized for visibility
    const textGroup = new THREE.Group()
    
    // Create 3D text using boxes with better materials
    const letterMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xffd700,
      metalness: 0.2,
      roughness: 0.4,
      emissive: 0x331100
    })

    // R - larger and more visible
    const r1 = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.5, 0.08), letterMaterial)
    r1.position.set(-0.35, 0, 0.12)
    const r2 = new THREE.Mesh(new THREE.BoxGeometry(0.25, 0.08, 0.08), letterMaterial)
    r2.position.set(-0.23, 0.17, 0.12)
    const r3 = new THREE.Mesh(new THREE.BoxGeometry(0.25, 0.08, 0.08), letterMaterial)
    r3.position.set(-0.23, 0.04, 0.12)
    const r4 = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.17, 0.08), letterMaterial)
    r4.position.set(-0.12, -0.08, 0.12)

    // C - larger and more visible
    const c1 = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.5, 0.08), letterMaterial)
    c1.position.set(0, 0, 0.12)
    const c2 = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.08, 0.08), letterMaterial)
    c2.position.set(0.1, 0.17, 0.12)
    const c3 = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.08, 0.08), letterMaterial)
    c3.position.set(0.1, -0.17, 0.12)

    // X - larger and more visible
    const x1 = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.5, 0.08), letterMaterial)
    x1.position.set(0.28, 0, 0.12)
    x1.rotation.z = Math.PI / 4
    const x2 = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.5, 0.08), letterMaterial)
    x2.position.set(0.42, 0, 0.12)
    x2.rotation.z = -Math.PI / 4

    textGroup.add(r1, r2, r3, r4, c1, c2, c3, x1, x2)
    coinGroup.add(textGroup)

    scene.add(coinGroup)
    coinRef.current = coinGroup

    // Position camera
    camera.position.set(0, 2, 5)
    camera.lookAt(0, 0, 0)

    // Lighting - increased ambient lighting for brighter appearance
    const ambientLight = new THREE.AmbientLight(0x404040, 0.8) // Increased from 0.4 to 0.8
    scene.add(ambientLight)

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8)
    directionalLight.position.set(5, 5, 5)
    directionalLight.castShadow = true
    directionalLight.shadow.mapSize.width = 2048
    directionalLight.shadow.mapSize.height = 2048
    scene.add(directionalLight)

    const pointLight = new THREE.PointLight(0xffd700, 0.5, 10)
    pointLight.position.set(0, 3, 2)
    scene.add(pointLight)

    // Mouse interaction handlers
    const handleMouseDown = (event) => {
      isDraggingRef.current = true
      const rect = renderer.domElement.getBoundingClientRect()
      mouseRef.current.x = event.clientX - rect.left
      mouseRef.current.y = event.clientY - rect.top
    }

    const handleMouseMove = (event) => {
      if (!isDraggingRef.current || !coinRef.current) return
      
      const rect = renderer.domElement.getBoundingClientRect()
      const deltaX = event.clientX - rect.left - mouseRef.current.x
      const deltaY = event.clientY - rect.top - mouseRef.current.y
      
      rotationRef.current.y += deltaX * 0.01
      rotationRef.current.x += deltaY * 0.01
      
      mouseRef.current.x = event.clientX - rect.left
      mouseRef.current.y = event.clientY - rect.top
    }

    const handleMouseUp = () => {
      isDraggingRef.current = false
    }

    // Touch handlers for mobile
    const handleTouchStart = (event) => {
      if (event.touches.length === 1) {
        isDraggingRef.current = true
        const rect = renderer.domElement.getBoundingClientRect()
        mouseRef.current.x = event.touches[0].clientX - rect.left
        mouseRef.current.y = event.touches[0].clientY - rect.top
      }
    }

    const handleTouchMove = (event) => {
      if (!isDraggingRef.current || !coinRef.current || event.touches.length !== 1) return
      
      event.preventDefault()
      const rect = renderer.domElement.getBoundingClientRect()
      const deltaX = event.touches[0].clientX - rect.left - mouseRef.current.x
      const deltaY = event.touches[0].clientY - rect.top - mouseRef.current.y
      
      rotationRef.current.y += deltaX * 0.01
      rotationRef.current.x += deltaY * 0.01
      
      mouseRef.current.x = event.touches[0].clientX - rect.left
      mouseRef.current.y = event.touches[0].clientY - rect.top
    }

    const handleTouchEnd = () => {
      isDraggingRef.current = false
    }

    // Add event listeners
    renderer.domElement.addEventListener('mousedown', handleMouseDown)
    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseup', handleMouseUp)
    renderer.domElement.addEventListener('touchstart', handleTouchStart)
    renderer.domElement.addEventListener('touchmove', handleTouchMove)
    renderer.domElement.addEventListener('touchend', handleTouchEnd)

    // Animation loop
    let time = 0
    const animate = () => {
      time += 0.01
      
      if (coinRef.current) {
        // Default Y-axis rotation when not being dragged
        if (!isDraggingRef.current) {
          rotationRef.current.y += 0.005
        }
        
        // Apply rotations
        coinRef.current.rotation.x = rotationRef.current.x
        coinRef.current.rotation.y = rotationRef.current.y
        
        // Animate circuit elements
        const circuitNodes = circuitGroup.children.filter(child => child.geometry?.type === 'SphereGeometry')
        circuitNodes.forEach((node, i) => {
          node.material.emissive.setHSL(0.5 + Math.sin(time * 2 + i) * 0.1, 0.8, 0.3)
          node.scale.setScalar(1 + Math.sin(time * 3 + i) * 0.3)
        })
        
        // Animate stars - rotating in the coin's XY plane
        starGroup.children.forEach((star, i) => {
          star.rotation.z = time + i * 0.2 // Rotate around Z-axis to spin in coin plane
          star.material.emissive.setHSL(0.15, 0.8, 0.2 + Math.sin(time * 2 + i) * 0.1)
        })
        
        // Animate text glow
        textGroup.children.forEach((letter, i) => {
          letter.material.emissive.setHSL(0.15, 0.8, 0.1 + Math.sin(time * 1.5 + i * 0.2) * 0.05)
        })
      }
      
      renderer.render(scene, camera)
      animationRef.current = requestAnimationFrame(animate)
    }
    
    animate()

    // Handle window resize
    const handleResize = () => {
      const newSize = getSize()
      renderer.setSize(newSize, newSize)
      camera.aspect = 1
      camera.updateProjectionMatrix()
    }

    window.addEventListener('resize', handleResize)

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('resize', checkScreenSize)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseup', handleMouseUp)
      
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
      
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement)
      }
      
      renderer.dispose()
    }
  }, [isMobile])

  // Helper function to create star geometry
  function createStarGeometry() {
    const shape = new THREE.Shape()
    const outerRadius = 1
    const innerRadius = 0.4
    const spikes = 5
    
    for (let i = 0; i < spikes * 2; i++) {
      const angle = (i / (spikes * 2)) * Math.PI * 2
      const radius = i % 2 === 0 ? outerRadius : innerRadius
      const x = Math.cos(angle) * radius
      const y = Math.sin(angle) * radius
      
      if (i === 0) {
        shape.moveTo(x, y)
      } else {
        shape.lineTo(x, y)
      }
    }
    
    const extrudeSettings = {
      depth: 0.1,
      bevelEnabled: true,
      bevelSegments: 2,
      steps: 2,
      bevelSize: 0.02,
      bevelThickness: 0.02
    }
    
    return new THREE.ExtrudeGeometry(shape, extrudeSettings)
  }

  return (
    <div className="token-container relative flex justify-center items-center w-full py-4 overflow-visible">
      <div 
        ref={mountRef} 
        className="shadow-[0_0_30px_rgba(218,165,32,0.6)] rounded-full cursor-grab active:cursor-grabbing"
        style={{ 
          background: 'radial-gradient(circle, rgba(218,165,32,0.1) 0%, rgba(0,0,0,0) 70%)',
          touchAction: 'none' // Prevent default touch behaviors
        }}
      />
    </div>
  )
}