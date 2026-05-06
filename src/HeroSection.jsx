import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import SplitType from 'split-type'
import { Icon } from '@iconify/react'
import './HeroSection.css'

export default function HeroSection() {
  const heroRef = useRef(null)
  const titleRef = useRef(null)
  const badgesRef = useRef([])

  useEffect(() => {
    // 1. Split Text Animation
    if (titleRef.current) {
      const text = new SplitType(titleRef.current, { types: 'lines, words, chars' })
      
      gsap.fromTo(
        text.chars,
        { y: 100, opacity: 0, rotateZ: 5 },
        {
          y: 0,
          opacity: 1,
          rotateZ: 0,
          duration: 1.2,
          stagger: 0.02,
          ease: 'power4.out',
          delay: 0.2
        }
      )
    }

    // 2. HUD Elements Fade In
    gsap.fromTo(
      '.hero-hud, .hero-cta-wrap, .hero-scroll-indicator',
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 1, stagger: 0.2, ease: 'power3.out', delay: 1 }
    )

    // 3. Floating Badges Parallax Effect
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e
      const centerX = window.innerWidth / 2
      const centerY = window.innerHeight / 2
      const moveX = (clientX - centerX) * 0.05
      const moveY = (clientY - centerY) * 0.05

      gsap.to(badgesRef.current, {
        x: moveX,
        y: moveY,
        duration: 1,
        ease: 'power2.out',
        stagger: 0.05
      })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  const setBadgeRef = (el, index) => {
    badgesRef.current[index] = el
  }

  return (
    <section ref={heroRef} className="editorial-hero">
      {/* Background Video */}
      <video
        className="hero-bg-video"
        autoPlay
        loop
        muted
        playsInline
      >
        <source src="/hero.mp4" type="video/mp4" />
      </video>

      {/* CSS Grain Overlay */}
      <div className="hero-grain"></div>

      {/* Top HUD */}
      <div className="hero-hud top-hud">
        <div className="hud-left">
          <span className="hud-mono">[EST. 2024]</span>
        </div>
        <div className="hud-right">
          <span className="hud-mono">DESIGN &times; TECHNOLOGY</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="hero-center-content">
        <h1 ref={titleRef} className="hero-title">
          <span className="title-sans">We Build</span>
          <br />
          <span className="title-serif">Digital Futures.</span>
        </h1>

        <div className="hero-cta-wrap">
          <a href="#projects" className="hero-cta">
            <span className="cta-text">Explore our architecture</span>
            <Icon icon="solar:arrow-right-linear" className="cta-icon" />
          </a>
        </div>
      </div>

      {/* Stat Badges — right side vertical stack */}
      <div 
        ref={(el) => setBadgeRef(el, 0)} 
        className="hero-badge badge-r1"
      >
        <span className="badge-value">150+</span>
        <span className="badge-label">Projects</span>
      </div>

      <div 
        ref={(el) => setBadgeRef(el, 1)} 
        className="hero-badge badge-r2"
      >
        <span className="badge-value">98%</span>
        <span className="badge-label">Retention</span>
      </div>

      <div 
        ref={(el) => setBadgeRef(el, 2)} 
        className="hero-badge badge-r3"
      >
        <span className="badge-value">5★</span>
        <span className="badge-label">Rating</span>
      </div>

      <div 
        ref={(el) => setBadgeRef(el, 3)} 
        className="hero-badge badge-r4"
      >
        <span className="badge-value">12+</span>
        <span className="badge-label">Industries</span>
      </div>

      {/* Bottom Scroll HUD — centered */}
      <div className="hero-hud bottom-hud">
        <div className="hero-scroll-indicator">
          <span className="scroll-text">SCROLL</span>
          <div className="scroll-line-wrap">
            <div className="scroll-line"></div>
          </div>
        </div>
      </div>
    </section>
  )
}
