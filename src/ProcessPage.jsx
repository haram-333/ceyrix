import React, { useState, useEffect, useRef } from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SplitType from 'split-type'
import { Icon } from '@iconify/react'
import './ProcessPage.css'

gsap.registerPlugin(ScrollTrigger)

const ceyrixLogo = '/ceyrix-logo.png'

const ProcessPage = () => {
  const [isNavbarScrolled, setIsNavbarScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [theme, setTheme] = useState(document.body.dataset.theme || 'light')
  const [isThemeFlash, setIsThemeFlash] = useState(false)

  const heroRef = useRef(null)
  const videoRef = useRef(null)
  const step01Ref = useRef(null)
  const step02Ref = useRef(null)
  const step03Ref = useRef(null)
  const step04Ref = useRef(null)
  const step05Ref = useRef(null)
  const ctaRef = useRef(null)
  
  const [isVideoPlaying, setIsVideoPlaying] = useState(false)
  const [isVideoMuted, setIsVideoMuted] = useState(true)

  const toggleVideoPlay = () => {
    if (videoRef.current) {
      if (isVideoPlaying) {
        videoRef.current.pause()
        setIsVideoPlaying(false)
      } else {
        videoRef.current.play()
          .then(() => setIsVideoPlaying(true))
          .catch(err => {
            console.error("Video play blocked:", err);
            setIsVideoPlaying(false);
          });
      }
    }
  }

  const toggleVideoMute = (e) => {
    if (e) e.stopPropagation()
    if (videoRef.current) {
      videoRef.current.muted = !isVideoMuted
      setIsVideoMuted(!isVideoMuted)
    }
  }

  useEffect(() => {
    const handleScroll = () => {
      setIsNavbarScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    document.body.dataset.theme = theme
  }, [theme])

  const toggleTheme = () => {
    setIsThemeFlash(true)
    setTimeout(() => setIsThemeFlash(false), 420)
    setTheme(current => {
      const newTheme = current === 'light' ? 'dark' : 'light';
      localStorage.setItem('ceyrix-theme', newTheme);
      return newTheme;
    })
  }

  useEffect(() => {
    const savedTheme = localStorage.getItem('ceyrix-theme') || document.body.dataset.theme || 'light';
    if (savedTheme !== theme) setTheme(savedTheme);
  }, [])

  const mobileMenuItems = [
    { label: 'Projects', href: '/projects' },
    { label: 'Process', href: '/process' },
    { label: 'Services', href: '/services' },
    { label: 'Contact', href: '/contact' },
    { label: 'Sign Up', href: '/signup' },
    { label: 'Login', href: '/login' }
  ]

  useEffect(() => {
    const titleText = new SplitType('.process-title', { types: 'words, chars' })
    const paragraphText = new SplitType('.process-subtitle', { types: 'lines' })
    
    gsap.set('.process-kicker', { opacity: 0, y: 15 })
    gsap.set(titleText.chars, { y: 100, opacity: 0, rotationZ: 5 })
    if (paragraphText.lines) {
      gsap.set(paragraphText.lines, { y: 30, opacity: 0 })
    }
    
    const tl = gsap.timeline({ delay: 0.2 })
    
    tl.to('.process-kicker', 
      { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }
    )
    .to(titleText.chars,
      { y: 0, opacity: 1, rotationZ: 0, stagger: 0.02, duration: 1.2, ease: 'power4.out' },
      "-=0.4"
    )
    
    if (paragraphText.lines) {
      tl.to(paragraphText.lines,
        { opacity: 1, y: 0, stagger: 0.1, duration: 1, ease: 'power3.out' },
        "-=0.8"
      )
    }

    // Step 01 Scroll Reveal
    if (step01Ref.current) {
      const stepTl = gsap.timeline({
        scrollTrigger: {
          trigger: step01Ref.current,
          start: 'top 85%',
          toggleActions: 'play none none reverse'
        }
      })

      stepTl.fromTo(step01Ref.current.querySelector('.step-number-bg'),
        { opacity: 0, x: -30 },
        { opacity: 0.03, x: 0, duration: 1, ease: 'power3.out' }
      )
      .fromTo(step01Ref.current.querySelector('.step-title'),
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power4.out' },
        "-=0.8"
      )
      .fromTo(step01Ref.current.querySelector('.step-description'),
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
        "-=0.6"
      )
      .fromTo(step01Ref.current.querySelectorAll('.step-sub-item'),
        { opacity: 0, x: -15 },
        { opacity: 1, x: 0, stagger: 0.1, duration: 0.6, ease: 'power2.out' },
        "-=0.5"
      )
      .fromTo(step01Ref.current.querySelector('.step-image-wrapper'),
        { opacity: 0, scale: 1.05, filter: 'blur(10px)' },
        { opacity: 1, scale: 1, filter: 'blur(0px)', duration: 0.8, ease: 'power2.out' },
        "-=0.8"
      )
    }

    // Step 02 Scroll Reveal
    if (step02Ref.current) {
      const step02Tl = gsap.timeline({
        scrollTrigger: {
          trigger: step02Ref.current,
          start: 'top 85%',
          toggleActions: 'play none none reverse'
        }
      })

      step02Tl.fromTo(step02Ref.current.querySelector('.step-number-bg'),
        { opacity: 0, x: 30 },
        { opacity: 0.03, x: 0, duration: 1, ease: 'power3.out' }
      )
      .fromTo(step02Ref.current.querySelector('.step-title'),
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power4.out' },
        "-=0.8"
      )
      .fromTo(step02Ref.current.querySelector('.step-description'),
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
        "-=0.6"
      )
      .fromTo(step02Ref.current.querySelector('.step-link'),
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
        "-=0.5"
      )
      .fromTo(step02Ref.current.querySelectorAll('.step-image-wrapper, .step-quote-box'),
        { opacity: 0, scale: 1.05, filter: 'blur(10px)' },
        { opacity: 1, scale: 1, filter: 'blur(0px)', stagger: 0.1, duration: 0.8, ease: 'power2.out' },
        "-=0.8"
      )
    }

    // Step 03 Scroll Reveal
    if (step03Ref.current) {
      const step03Tl = gsap.timeline({
        scrollTrigger: {
          trigger: step03Ref.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      })

      step03Tl.fromTo(step03Ref.current.querySelector('.gallery-kicker'),
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }
      )
      .fromTo(step03Ref.current.querySelector('.gallery-title'),
        { opacity: 0, scale: 0.95 },
        { opacity: 1, scale: 1, duration: 1, ease: 'power4.out' },
        "-=0.7"
      )
      .fromTo(step03Ref.current.querySelector('.gallery-image-container'),
        { opacity: 0, y: 40, scale: 0.98 },
        { opacity: 1, y: 0, scale: 1, duration: 1.2, ease: 'power3.out' },
        "-=0.9"
      )
      .fromTo(step03Ref.current.querySelector('.gallery-description'),
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' },
        "-=0.8"
      )
    }

    // Step 04 Scroll Reveal
    if (step04Ref.current) {
      const step04Tl = gsap.timeline({
        scrollTrigger: {
          trigger: step04Ref.current,
          start: 'top 85%',
          toggleActions: 'play none none reverse'
        }
      })

      step04Tl.fromTo(step04Ref.current.querySelector('.step-number-bg'),
        { opacity: 0, x: -30 },
        { opacity: 0.03, x: 0, duration: 1, ease: 'power3.out' }
      )
      .fromTo(step04Ref.current.querySelector('.step-title'),
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power4.out' },
        "-=0.8"
      )
      .fromTo(step04Ref.current.querySelector('.step-description'),
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
        "-=0.6"
      )
      .fromTo(step04Ref.current.querySelector('.code-terminal'),
        { opacity: 0, y: 40, rotationX: 10 },
        { opacity: 1, y: 0, rotationX: 0, duration: 1.2, ease: 'power4.out' },
        "-=0.8"
      )
    }

    // Step 05 Scroll Reveal
    if (step05Ref.current) {
      const step05Tl = gsap.timeline({
        scrollTrigger: {
          trigger: step05Ref.current,
          start: 'top 85%',
          toggleActions: 'play none none reverse'
        }
      })

      step05Tl.fromTo(step05Ref.current.querySelector('.step-number-bg'),
        { opacity: 0, y: -20 },
        { opacity: 0.03, y: 0, duration: 1, ease: 'power3.out' }
      )
      .fromTo(step05Ref.current.querySelector('.step-title'),
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power4.out' },
        "-=0.7"
      )
      .fromTo(step05Ref.current.querySelector('.step-description'),
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
        "-=0.6"
      )
      .fromTo(step05Ref.current.querySelectorAll('.stat-item'),
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, stagger: 0.15, duration: 0.8, ease: 'power2.out' },
        "-=0.5"
      )
    }

    // CTA Scroll Reveal
    if (ctaRef.current) {
      gsap.fromTo(ctaRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1, y: 0, duration: 1.2, ease: 'power3.out',
          scrollTrigger: {
            trigger: ctaRef.current,
            start: 'top 90%'
          }
        }
      )
    }
    
    return () => {
      if (titleText.revert) titleText.revert()
      if (paragraphText.revert) paragraphText.revert()
      ScrollTrigger.getAll().forEach(t => t.kill())
    }
  }, [])

  return (
    <div className={`page process-page-root ${isThemeFlash ? 'theme-flash' : ''}`}>
      <Navbar
        isNavbarScrolled={isNavbarScrolled}
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
        ceyrixLogo={ceyrixLogo}
        isThemeFlash={isThemeFlash}
        toggleTheme={toggleTheme}
        theme={theme}
        mobileMenuItems={mobileMenuItems}
      />
      
      <main className="process-main">
        <section className="process-hero" ref={heroRef}>
          <div className="process-hero-content">
            <span className="process-kicker">OUR METHODOLOGY</span>
            <h1 className="process-title">
              Defined by<br />
              Precision.
            </h1>
            <p className="process-subtitle">
              We don't just build; we architect digital permanence. Our process is a rigorous journey from abstract concept to structural&nbsp;excellence.
            </p>
          </div>
        </section>

        <section className="process-video-section">
          <div className="process-video-container" onClick={toggleVideoPlay}>
            <video
              key="globe-video"
              ref={videoRef}
              className="process-video"
              src="https://videos.pexels.com/video-files/1851190/1851190-hd_1280_720_25fps.mp4"
              loop
              playsInline
              muted={isVideoMuted}
              crossOrigin="anonymous"
              preload="auto"
              poster="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=2072"
              style={{ filter: 'grayscale(100%) brightness(0.8) contrast(1.2)' }}
            ></video>
            
            <div className={`video-overlay ${isVideoPlaying ? 'is-playing' : ''}`}>
              <button 
                className="custom-play-btn" 
                onClick={(e) => {
                  e.stopPropagation();
                  toggleVideoPlay();
                }}
                aria-label="Play/Pause Video"
              >
                <Icon icon={isVideoPlaying ? "solar:pause-bold" : "solar:play-bold"} />
              </button>
            </div>
            
            <div className="video-controls">
              <button className="custom-mute-btn" onClick={toggleVideoMute} aria-label="Mute/Unmute">
                <Icon icon={isVideoMuted ? "solar:muted-bold" : "solar:volume-loud-bold"} />
              </button>
            </div>
          </div>
        </section>

        {/* Step 01: Discovery */}
        <section className="process-step-section" ref={step01Ref}>
          <div className="process-step-content">
            <div className="step-number-bg">01</div>
            <h2 className="step-title">Discovery</h2>
            <p className="step-description">
              Before a single pixel is placed, we immerse ourselves in your world. We analyze market structures, identify core tensions, and define the soul of the project. This is the bedrock of our architectural approach.
            </p>
            
            <div className="step-sub-list">
              <div className="step-sub-item">
                <span className="sub-item-number">01.1</span>
                <span className="sub-item-text">STAKEHOLDER ALIGNMENT</span>
              </div>
              <div className="step-sub-item">
                <span className="sub-item-number">01.2</span>
                <span className="sub-item-text">MARKET ANALYSIS</span>
              </div>
            </div>
          </div>

          <div className="process-step-image">
            <div className="step-image-wrapper">
              <img 
                src="https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?auto=format&fit=crop&q=80&w=2000" 
                alt="Discovery Phase Abstract" 
                style={{ filter: 'grayscale(100%) brightness(0.6) contrast(1.2)' }}
              />
            </div>
          </div>
        </section>

        {/* Step 02: Strategy */}
        <section className="process-step-section reversed align-right-mobile" ref={step02Ref}>
          <div className="process-step-content">
            <div className="step-number-bg">02</div>
            <h2 className="step-title">Strategy</h2>
            <p className="step-description">
              Planning with mathematical precision. We define the user journey as a sequence of spatial experiences, ensuring every interaction serves a primary objective. We don't guess; we map.
            </p>
            
            <a href="#blueprint" className="step-link">VIEW BLUEPRINT METHODOLOGY</a>
          </div>

          <div className="process-step-image">
            <div className="dual-image-grid">
              <div className="step-image-wrapper">
                <img 
                  src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=2070" 
                  alt="Strategy Laptop" 
                  style={{ filter: 'grayscale(100%) brightness(0.7) contrast(1.2)' }}
                />
              </div>
              <div className="step-quote-box">
                <p className="step-quote-text">"Strategy is the art of sacrifice."</p>
              </div>
            </div>
          </div>
        </section>

        {/* Step 03: Design */}
        <section className="process-gallery-section" ref={step03Ref}>
          <span className="gallery-kicker">THE SILENT GALLERY</span>
          <h2 className="gallery-title">03. Design</h2>
          
          <div className="gallery-image-container">
            <img 
              src="https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?auto=format&fit=crop&q=80&w=1200" 
              alt="Design Phase 3D Abstract Sculpture" 
              style={{ opacity: 1, filter: 'grayscale(100%) brightness(0.6)' }}
            />
            <div className="gallery-overlay-content">
              <p className="gallery-description">
                Focusing on the void. We create interfaces that feel carved rather than assembled, prioritizing rhythm, typography, and tonal depth.
              </p>
            </div>
          </div>
        </section>

        {/* Step 04: Development */}
        <section className="process-step-section" ref={step04Ref}>
          <div className="process-step-content">
            <div className="step-number-bg">04</div>
            <h2 className="step-title">Development</h2>
            <p className="step-description">
              Our code is as clean as our design. We utilize high-performance frameworks to ensure that the structural integrity of the design is maintained across every device and browser. Pure, scalable, and permanent.
            </p>
          </div>

          <div className="process-step-image">
            <div className="code-terminal">
              <div className="terminal-header">
                <div className="dot"></div>
                <div className="dot"></div>
                <div className="dot"></div>
              </div>
              <div className="terminal-body">
                <div className="terminal-line">
                  <span className="cmd-prefix">$</span>
                  <span className="cmd-text">ceyrix --deploy --project excellence</span>
                </div>
                <div className="terminal-line">
                  <span className="status-text">&gt; Compiling architectural soul...</span>
                </div>
                <div className="terminal-line binary-text">
                  01010111 01101111 01110010 01101011
                </div>
                <div className="terminal-line binary-text">
                  01010111 01101111 01110010 01101011
                </div>
                <div className="terminal-line launch-text">
                  READY FOR LAUNCH
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Step 05: The Launch */}
        <section className="process-launch-section" ref={step05Ref}>
          <div className="step-number-bg" style={{ left: '50%', transform: 'translateX(-50%)', top: '20px' }}>05</div>
          <h2 className="step-title">The Launch.</h2>
          <p className="step-description" style={{ maxWidth: '720px' }}>
            We don't just hand over keys; we launch an experience. Every project ends with a meticulous transition phase ensuring your team is empowered to manage the digital structure we've built.
          </p>
          
          <div className="launch-stats">
            <div className="stat-item">
              <span className="stat-value">100%</span>
              <span className="stat-label">UPTIME TARGET</span>
            </div>
            <div className="stat-item">
              <span className="stat-value">&lt;100ms</span>
              <span className="stat-label">RESPONSE GOAL</span>
            </div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="process-cta-section" ref={ctaRef}>
          <h2 className="cta-title">Ready for excellence?</h2>
          <a href="/contact" className="cta-btn">START YOUR PROJECT</a>
        </section>
      </main>

      <Footer />
    </div>
  )
}

export default ProcessPage
