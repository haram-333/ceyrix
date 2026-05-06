import React, { useEffect, useRef, useState, useCallback } from 'react'
import './ProjectSurf.css'

/* ── 3D DIAGONAL RAIL MATH ──────────────────────────────────────
   Each card sits on an invisible diagonal line in 3D space.
   All cards share a constant Y-rotation of -50°.
   Step per slot: X +240, Y -84, Z -288
   Scroll drives a continuous offset → modular wrap → infinite loop
─────────────────────────────────────────────────────────────────── */

const COS_Y = 0.642788    // cos(50°)
const SIN_Y = 0.766044    // sin(50°)
const STEP_X = 240
const STEP_Y = -84
const STEP_Z = -288
const CARD_W = 320
const CARD_H = 384
const TOTAL_SLOTS = 25     // rendered cards (buffer for wrapping)
const TOTAL_UNIQUE = 16    // unique projects

const projects = [
  { name: 'Meridian',  image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=640&h=768&fit=crop&q=80' },
  { name: 'Vortex',    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=640&h=768&fit=crop&q=80' },
  { name: 'Lumina',    image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=640&h=768&fit=crop&q=80' },
  { name: 'Nexus',     image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=640&h=768&fit=crop&q=80' },
  { name: 'Cipher',    image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=640&h=768&fit=crop&q=80' },
  { name: 'Prism',     image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=640&h=768&fit=crop&q=80' },
  { name: 'Atlas',     image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=640&h=768&fit=crop&q=80' },
  { name: 'Onyx',      image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=640&h=768&fit=crop&q=80' },
  { name: 'Flux',      image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=640&h=768&fit=crop&q=80' },
  { name: 'Helix',     image: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=640&h=768&fit=crop&q=80' },
  { name: 'Nova',      image: 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=640&h=768&fit=crop&q=80' },
  { name: 'Vertex',    image: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=640&h=768&fit=crop&q=80' },
  { name: 'Ember',     image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=640&h=768&fit=crop&q=80' },
  { name: 'Zenith',    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=640&h=768&fit=crop&q=80' },
  { name: 'Aether',    image: 'https://images.unsplash.com/photo-1534088568595-a066f410bcda?w=640&h=768&fit=crop&q=80' },
  { name: 'Pulse',     image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=640&h=768&fit=crop&q=80' },
]

function ProjectSurf() {
  const sectionRef = useRef(null)
  const sceneRef = useRef(null)
  const cardsRef = useRef([])
  const offsetTarget = useRef(0)
  const offsetSmooth = useRef(0)
  const rafId = useRef(null)
  const [hoveredIdx, setHoveredIdx] = useState(-1)
  const isPinnedRef = useRef(false)
  const pinTimerRef = useRef(null)
  const hasEnteredRef = useRef(false)

  // ── Single wheel listener on window handles BOTH detection and interception ──
  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const onWheel = (e) => {
      const rect = section.getBoundingClientRect()

      // If we're already pinned — intercept scroll and drive cards
      if (isPinnedRef.current) {
        e.preventDefault()
        offsetTarget.current += e.deltaY * 0.006 // faster feel
        return
      }

      // If the section top is close to reaching 0 (within 80px approaching),
      // check if this wheel event would push it to/past 0
      if (rect.top > 0 && rect.top < 80 && e.deltaY > 0 && !hasEnteredRef.current) {
        // This scroll would pin us — activate immediately
        e.preventDefault()
        isPinnedRef.current = true
        hasEnteredRef.current = true

        // Snap scroll to exact lock position
        window.scrollBy(0, rect.top)

        if (pinTimerRef.current) clearTimeout(pinTimerRef.current)
        pinTimerRef.current = setTimeout(() => {
          isPinnedRef.current = false
        }, 5000)
        return
      }

      // If section is at/past top and not yet registered — activate pin
      if (rect.top <= 0 && rect.top > -50 && !hasEnteredRef.current) {
        e.preventDefault()
        isPinnedRef.current = true
        hasEnteredRef.current = true

        if (pinTimerRef.current) clearTimeout(pinTimerRef.current)
        pinTimerRef.current = setTimeout(() => {
          isPinnedRef.current = false
        }, 5000)
        return
      }
    }

    const onScroll = () => {
      const rect = section.getBoundingClientRect()
      // Only used for cleanup/reset when user scrolls back up above the section
      if (rect.top > 80) {
        hasEnteredRef.current = false
        isPinnedRef.current = false
        if (pinTimerRef.current) {
          clearTimeout(pinTimerRef.current)
          pinTimerRef.current = null
        }
      }
    }

    window.addEventListener('wheel', onWheel, { passive: false })
    window.addEventListener('scroll', onScroll, { passive: true })

    return () => {
      window.removeEventListener('wheel', onWheel)
      window.removeEventListener('scroll', onScroll)
      if (pinTimerRef.current) clearTimeout(pinTimerRef.current)
    }
  }, [])



  // ── Animation loop: compute 3D positions every frame ──
  useEffect(() => {
    const animate = () => {
      // Buttery lerp
      offsetSmooth.current += (offsetTarget.current - offsetSmooth.current) * 0.07

      for (let i = 0; i < TOTAL_SLOTS; i++) {
        const cardEl = cardsRef.current[i]
        if (!cardEl) continue

        // Compute wrapped slot position (circular buffer math)
        let slot = i - offsetSmooth.current
        slot = ((slot % TOTAL_SLOTS) + TOTAL_SLOTS) % TOTAL_SLOTS
        slot -= TOTAL_SLOTS / 2 // center around 0

        // 3D position along the diagonal rail
        const x = slot * STEP_X
        const y = slot * STEP_Y
        const z = slot * STEP_Z

        // Distance-based brightness falloff
        const dist = Math.abs(slot)
        const brightness = Math.max(0.15, 1 - dist * 0.065)

        // Z-index: cards closer to center should be on top
        const zIdx = Math.round(100 - dist * 4)

        // Apply transforms directly to DOM (bypass React render for 60fps)
        cardEl.style.transform = `matrix3d(${COS_Y},0,${SIN_Y},0, 0,1,0,0, ${-SIN_Y},0,${COS_Y},0, ${x.toFixed(2)},${y.toFixed(2)},${z.toFixed(2)},1)`
        cardEl.style.filter = `brightness(${brightness.toFixed(3)})`
        cardEl.style.zIndex = zIdx
      }

      rafId.current = requestAnimationFrame(animate)
    }

    rafId.current = requestAnimationFrame(animate)
    return () => {
      if (rafId.current) cancelAnimationFrame(rafId.current)
    }
  }, [])

  // Assign ref callback for each card
  const setCardRef = useCallback((el, i) => {
    cardsRef.current[i] = el
  }, [])

  return (
    <section ref={sectionRef} className="surf-section">
      {/* Atmospheric background text */}
      <div className="surf-bg-text" aria-hidden="true">
        PROJECTS
      </div>

      {/* 3D Perspective Viewport */}
      <div className="surf-viewport">
        <div className="surf-scene" ref={sceneRef}>
          {Array.from({ length: TOTAL_SLOTS }, (_, i) => {
            const project = projects[i % TOTAL_UNIQUE]
            const idx = i % TOTAL_UNIQUE
            const isHovered = hoveredIdx === i

            return (
              <div
                key={i}
                ref={(el) => setCardRef(el, i)}
                className={`surf-card ${isHovered ? 'is-hovered' : ''}`}
                onMouseEnter={() => setHoveredIdx(i)}
                onMouseLeave={() => setHoveredIdx(-1)}
              >
                <div className="surf-card-media">
                  <img
                    src={project.image}
                    alt={project.name}
                    draggable="false"
                    loading="lazy"
                  />
                </div>

                {/* Technical mono index */}
                <span className="surf-card-idx">
                  {String(idx).padStart(2, '0')}
                </span>

                {/* Hover label — just the name, pure minimalism */}
                <div className="surf-card-label">
                  <span className="label-name">{project.name}</span>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Scroll hint */}
      <div className="surf-hint">
        <div className="surf-hint-icon">
          <div className="hint-dot"></div>
        </div>
        <span>Scroll to surf</span>
      </div>
    </section>
  )
}

export default ProjectSurf
