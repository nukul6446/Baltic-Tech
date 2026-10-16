import { useEffect, useRef } from 'react'

export default function Particles({
  particleColors = ['#ffffff'],
  particleCount = 200,
  particleSpread = 10,
  speed = 0.1,
  particleBaseSize = 100,
  glow = 0.5,
  twinkle = 0.3,
  moveParticlesOnHover = true,
  hoverEffect = 'parallax',
  sizeRandomness = 1,
  shape = 'circle',
  connections = false,
  connectionDistance = 110,
  particleHoverFactor = 1,
  hoverRadius = 140,
  drift = 'none',
  driftSpeed = 1,
  alphaParticles = false,
  disableRotation = false,
  cameraDistance = 20,
  variation = 0,
  opacity = 1,
  clickBurst = true,
  intro = true,
  lightMode = false,
}) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const parent = canvas?.parentElement
    if (!canvas || !parent) return undefined

    const context = canvas.getContext('2d')
    const pointer = { x: 0, y: 0, active: false }
    const particles = []
    const bursts = []
    let animationFrame
    let width = 0
    let height = 0
    let pixelRatio = 1
    let startedAt = performance.now()

    const random = (min, max) => Math.random() * (max - min) + min
    const makeParticle = (burst = false) => ({
      x: burst ? pointer.x : random(0, width),
      y: burst ? pointer.y : random(0, height),
      depth: random(0.35, 1),
      size: random(.35, 1.15) * Math.max(1, particleBaseSize / 100) * (1 - sizeRandomness * .2),
      alpha: random(.3, 1),
      color: particleColors[Math.floor(Math.random() * particleColors.length)] || '#ffffff',
      phase: random(0, Math.PI * 2),
      vx: random(-.15, .15),
      vy: random(-.15, .15),
    })

    const resize = () => {
      const bounds = parent.getBoundingClientRect()
      width = bounds.width
      height = bounds.height
      pixelRatio = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = width * pixelRatio
      canvas.height = height * pixelRatio
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0)
      particles.length = 0
      for (let index = 0; index < particleCount; index += 1) particles.push(makeParticle())
      startedAt = performance.now()
    }

    const handlePointerMove = (event) => {
      const bounds = canvas.getBoundingClientRect()
      pointer.x = event.clientX - bounds.left
      pointer.y = event.clientY - bounds.top
      pointer.active = true
    }

    const handlePointerLeave = () => { pointer.active = false }
    const handleClick = () => {
      if (!clickBurst || !pointer.active) return
      for (let index = 0; index < 18; index += 1) bursts.push({ ...makeParticle(true), life: 1, angle: random(0, Math.PI * 2), force: random(1, 3) })
    }

    const drawParticle = (particle, time, alpha = particle.alpha) => {
      const distanceX = pointer.x - particle.x
      const distanceY = pointer.y - particle.y
      const distance = Math.hypot(distanceX, distanceY)
      const hoverStrength = moveParticlesOnHover && pointer.active && distance < hoverRadius ? (1 - distance / hoverRadius) * particleHoverFactor : 0
      const parallaxX = hoverEffect === 'parallax' ? -distanceX * hoverStrength * .018 : 0
      const parallaxY = hoverEffect === 'parallax' ? -distanceY * hoverStrength * .018 : 0
      const twinkleAmount = twinkle ? 1 - twinkle * .35 + Math.sin(time * .002 + particle.phase) * twinkle * .35 : 1
      const radius = Math.max(.7, particle.size * (1 + hoverStrength) * twinkleAmount * particle.depth)
      const x = particle.x + parallaxX
      const y = particle.y + parallaxY

      context.save()
      context.globalAlpha = Math.max(0, Math.min(1, alpha * opacity))
      context.fillStyle = particle.color
      if (glow > 0) {
        context.shadowColor = particle.color
        context.shadowBlur = glow * 12
      }
      if (shape === 'square') context.fillRect(x - radius, y - radius, radius * 2, radius * 2)
      else {
        context.beginPath()
        context.arc(x, y, radius, 0, Math.PI * 2)
        context.fill()
      }
      context.restore()
    }

    const render = (time) => {
      context.clearRect(0, 0, width, height)
      const introProgress = intro ? Math.min(1, (time - startedAt) / 1200) : 1
      const driftAmount = drift === 'none' ? 0 : driftSpeed

      particles.forEach((particle, index) => {
        particle.x += particle.vx * speed + Math.sin(time * .00025 + index) * driftAmount * .01
        particle.y += particle.vy * speed + Math.cos(time * .0002 + index) * driftAmount * .01
        if (particle.x < -20) particle.x = width + 20
        if (particle.x > width + 20) particle.x = -20
        if (particle.y < -20) particle.y = height + 20
        if (particle.y > height + 20) particle.y = -20
        drawParticle(particle, time, introProgress * (alphaParticles ? particle.depth : 1))
      })

      if (connections) {
        context.save()
        context.strokeStyle = lightMode ? '#1b3a66' : '#ffffff'
        context.globalAlpha = .12
        particles.forEach((particle, index) => {
          particles.slice(index + 1, index + 8).forEach((other) => {
            const distance = Math.hypot(particle.x - other.x, particle.y - other.y)
            if (distance < connectionDistance) {
              context.beginPath()
              context.moveTo(particle.x, particle.y)
              context.lineTo(other.x, other.y)
              context.stroke()
            }
          })
        })
        context.restore()
      }

      bursts.splice(0).forEach((burst) => {
        burst.life -= .035
        burst.x += Math.cos(burst.angle) * burst.force
        burst.y += Math.sin(burst.angle) * burst.force
        if (burst.life > 0) {
          drawParticle(burst, time, burst.life)
          bursts.push(burst)
        }
      })

      animationFrame = requestAnimationFrame(render)
    }

    resize()
    const observer = new ResizeObserver(resize)
    observer.observe(parent)
    canvas.addEventListener('pointermove', handlePointerMove)
    canvas.addEventListener('pointerleave', handlePointerLeave)
    canvas.addEventListener('click', handleClick)
    animationFrame = requestAnimationFrame(render)

    return () => {
      cancelAnimationFrame(animationFrame)
      observer.disconnect()
      canvas.removeEventListener('pointermove', handlePointerMove)
      canvas.removeEventListener('pointerleave', handlePointerLeave)
      canvas.removeEventListener('click', handleClick)
    }
  }, [alphaParticles, cameraDistance, clickBurst, connectionDistance, connections, disableRotation, drift, driftSpeed, glow, hoverEffect, hoverRadius, intro, lightMode, opacity, particleBaseSize, particleColors, particleCount, particleHoverFactor, particleSpread, shape, sizeRandomness, speed, twinkle, variation, moveParticlesOnHover])

  return <canvas ref={canvasRef} className="particles-canvas" aria-hidden="true" />
}
