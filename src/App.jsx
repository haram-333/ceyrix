import { useEffect, useRef, useState } from 'react'
import { Icon } from '@iconify/react'
import { Link } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'
// import { Canvas, useFrame } from '@react-three/fiber'
// import { Float, MeshTransmissionMaterial } from '@react-three/drei'


import ceyrixLogo from './assets/ceyrix-logo.png'
import expertLillian from './assets/expert-lillian.png'
import expert2 from './assets/expert-2.png'
import section5Vid from './assets/section5.mp4'
import heroVid from './assets/hero.mp4'
import nobiasVid from './assets/nobias.mp4' // The high-fidelity product video
import gsap from 'gsap'
import './App.css'

const serviceItems = [
  {
    title: 'Branding',
    description:
      'At Ceyrix, branding is not just visuals. We shape market memory through identity systems, voice, and design direction so your brand feels unmistakable, premium, and built to scale.',
  },
  {
    title: 'Digital Products',
    description:
      'We design digital products with obsessive clarity. From onboarding to power-user flows, every screen is tuned for speed, retention, and confident user decisions.',
  },
  {
    title: 'Websites',
    description:
      'We craft high-performance websites that convert attention into trust. Sharp hierarchy, refined interactions, and technical execution give your brand a stronger first impression.',
  },
  {
    title: 'Development',
    description:
      'Our engineering team ships production-ready frontend and backend systems with clean architecture, scalable foundations, and details that feel polished under real traffic.',
  },
  {
    title: 'Content',
    description:
      'We build content systems that sound like one clear voice across every channel. Strategy, structure, and creative direction align so your message stays consistent and persuasive.',
  },
  {
    title: 'Generative AI',
    description:
      'We integrate generative AI where it creates measurable leverage: faster workflows, smarter experiences, and practical automation that actually improves outcomes.',
  },
]

const clientLogos = [
  { name: 'Toyota', icon: 'simple-icons:toyota' },
  { name: 'Microsoft', icon: 'simple-icons:microsoft' },
  { name: 'Discover', icon: 'simple-icons:discover' },
  { name: 'VMware', icon: 'simple-icons:vmware' },
  { name: 'Amazon', icon: 'simple-icons:amazon' },
  { name: 'Coinbase', icon: 'simple-icons:coinbase' },
  { name: 'ADP', icon: 'simple-icons:adp' },
  { name: 'UPS', icon: 'simple-icons:ups' },
  { name: 'Google', icon: 'simple-icons:google' },
  { name: 'Coca-Cola', icon: 'simple-icons:cocacola' },
]

const faqItems = [
  {
    question: 'What are your core services as a UX design and branding firm?',
    answer: [
      'At Ceyrix, we combine product strategy, UX design, and brand direction into one integrated workflow. We build scalable design systems and high-fidelity interfaces that ensure a consistent, premium experience across every user touchpoint.',
      'From discovery and journey mapping to frontend-ready design systems, we provide the technical and creative execution needed to ship complex digital products at scale.'
    ],
  },
  {
    question: 'What separates Ceyrix from other branding and web design agencies?',
    answer: [
      'We prioritize execution depth and system-first thinking over one-off visuals. Our team is built for complexity, ensuring that every design decision is tied to practical outcomes like comprehension speed, conversion quality, and long-term maintainability.'
    ],
  },
  {
    question: 'Do you work with clients in different timezones?',
    answer: [
      'Yes. We use a structured async workflow—combining detailed documentation, recorded walkthroughs, and defined overlap windows—to keep projects moving continuously across global timezones without bottlenecks.'
    ],
  },
  {
    question: 'How much does hiring you for a design project cost?',
    answer: [
      'Pricing is scope-dependent. We provide structured proposals with clear milestones and deliverables to ensure budget transparency and avoid mid-project surprises.'
    ],
  },
  {
    question: 'Do you work with startups?',
    answer: [
      'Absolutely. We help startups at all stages—from MVP foundations and positioning clarity for early-stage teams to building unified UI patterns and design systems for scaling ventures.'
    ],
  },
  {
    question: 'Can you help us redesign our B2B/enterprise software?',
    answer: [
      'Yes. We specialize in simplifying dense B2B workflows. We redesign structure and interaction behavior around real operational tasks to reduce cognitive load and improve adoption for complex platforms.'
    ],
  },
]

const shuffle = (items) => [...items].sort(() => Math.random() - 0.5)

/*
function ServiceShape({ index, pointer }) {
  ... (commented out)
}
*/

/*
function FooterShape() {
  ... (commented out)
}
*/

function DesignInnovation() {
  const sectionRef = useRef(null)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return undefined

    let rafId = 0
    const updateProgress = () => {
      const rect = section.getBoundingClientRect()
      const viewportHeight = window.innerHeight || 1
      const start = viewportHeight * 0.9
      const end = viewportHeight * 0.2
      const raw = (start - rect.top) / (start - end)
      const clamped = Math.max(0, Math.min(1, raw))
      setProgress(clamped)
    }

    const onScroll = () => {
      if (rafId) cancelAnimationFrame(rafId)
      rafId = requestAnimationFrame(updateProgress)
    }

    updateProgress()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      if (rafId) cancelAnimationFrame(rafId)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  return (
    <section ref={sectionRef} className="design-innovation-section">
      <h2
        style={{
          opacity: 0.18 + progress * 0.82,
          transform: `translate3d(0, ${36 - progress * 36}px, 0)`,
        }}
      >
        We transform companies through design innovation
      </h2>
      <p
        style={{
          opacity: 0.1 + progress * 0.9,
          transform: `translate3d(0, ${30 - progress * 30}px, 0)`,
        }}
      >
        A full-service creative agency designing and building inventive digital experiences
        across all platforms and brand touchpoints.
      </p>
      <a
        href="#services-showcase"
        className="services-view-link"
        style={{
          opacity: 0.08 + progress * 0.92,
          transform: `translate3d(0, ${24 - progress * 24}px, 0)`,
        }}
      >
        <span className="link-text">View all our services</span>
        <span aria-hidden="true">→</span>
      </a>
    </section>
  )
}

function ProcessSection() {
  const steps = [
    {
      icon: "solar:document-text-linear",
      title: "Submit Requirements",
      desc: "Quickly describe your idea, upload project files, and send detailed requirements directly to our dedicated development team."
    },
    {
      icon: "solar:calculator-minimalistic-linear",
      title: "Transparent Quotations",
      desc: "Receive clear and professional quotations including development scope, pricing, and estimated delivery timelines."
    },
    {
      icon: "solar:widget-2-linear",
      title: "Real-Time Tracking",
      desc: "Monitor project progress, milestones, and updates in real time through your dedicated client dashboard."
    }
  ];

  return (
    <section className="process-section">
      <video className="process-bg-video" autoPlay loop muted playsInline>
        <source src={section5Vid} type="video/mp4" />
      </video>
      <div className="process-overlay"></div>
      
      <div className="process-content-wrapper">
        <div className="process-header">
          <h2 className="process-title">Reimagined for You</h2>
          <p className="process-subtitle">
            Our tech-driven platform provides end-to-end visibility and control over your complex software enterprise.
          </p>
        </div>
        
        <div className="process-grid">
          {steps.map((step, idx) => (
            <div key={idx} className="process-card">
              <div className="step-icon-box">
                <Icon icon={step.icon} />
              </div>
              <h3>{step.title}</h3>
              <p>{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ExpertSourcing() {
  return (
    <section className="expert-sourcing-section">
      <div className="expert-sourcing-container">
        <div className="expert-ribbon">NEW</div>
        <div className="expert-sourcing-content">
          <div className="fiverr-pro-logo">
            <span className="brand-text">ceyrix</span>
            <span className="pro-text pink">pro.</span>
          </div>
          
          <h2 className="expert-sourcing-title">
            Let experts find the right <br />
            freelancer for you
          </h2>

          <ul className="expert-sourcing-list">
            <li>Work with experts who will source, interview, and vet freelancers for you</li>
            <li>Get a report with clear recommendations</li>
            <li>Hire vetted freelance talent with confidence</li>
          </ul>

          <div className="expert-sourcing-footer">
            <button className="expert-cta">
              Discover expert sourcing
            </button>
            <div className="guarantee-badge">
              <Icon icon="solar:dollar-minimalistic-bold" className="dollar-icon" />
              <span>100% money-back guarantee</span>
            </div>
          </div>
        </div>

        <div className="expert-sourcing-visual">
          <div className="visual-elements">
            <div className="more-bubble">
              <span>...</span>
            </div>
            
            <div className="expert-cards-stack">
              <div className="expert-card card-3">
                <img src={expert2} alt="Expert" />
              </div>
              <div className="expert-card card-2">
                <img src={expertLillian} alt="Expert" />
              </div>
              <div className="expert-card card-1">
                <img src={expertLillian} alt="Lillian" />
                <div className="card-info">
                  <div className="mini-avatar">
                    <img src={expertLillian} alt="Avatar" />
                  </div>
                  <div className="mini-text">
                    <h3>Lillian</h3>
                    <p>Website developer</p>
                  </div>
                </div>
              </div>
              
              <div className="fiverr-cursor">
                <Icon icon="solar:cursor-bold" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function ProjectGallery() {
  const videoRef = useRef(null)

  const handleMouseEnter = () => {
    if (videoRef.current) {
      videoRef.current.play()
    }
  }

  const handleMouseLeave = () => {
    if (videoRef.current) {
      videoRef.current.pause()
    }
  }

  return (
    <section className="gallery-section">
      <div className="gallery-header">
        <h2 className="gallery-label">Featured Work</h2>
      </div>

      <div className="gallery-grid">
        {/* NOBIAS - Single Exclusive Card */}
        <div className="project-card large">
          <div 
            className="project-media-wrap"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <div className="project-dim-overlay"></div>
            <video 
              ref={videoRef}
              className="project-video" 
              muted 
              loop
              playsInline
            >
              <source src={nobiasVid} type="video/mp4" />
            </video>
          </div>
          <div className="project-info">
            <h3 className="project-name">NOBIAS</h3>
            <p className="project-cat">Trading Journal & Analytics Platform</p>
          </div>
        </div>
      </div>
    </section>
  )
}

function App() {
  const [theme, setTheme] = useState('light')
  const [isThemeFlash, setIsThemeFlash] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isNavbarScrolled, setIsNavbarScrolled] = useState(false)
  const [openFaqIndex, setOpenFaqIndex] = useState(-1)
  const [activeServiceIndex, setActiveServiceIndex] = useState(0)
  const [openServiceIndex, setOpenServiceIndex] = useState(-1)
  const [servicePointer, setServicePointer] = useState({ x: 0, y: 0 })
  const [isServicesMobile, setIsServicesMobile] = useState(false)
  const [isServicesInView, setIsServicesInView] = useState(false)
  const [isAssetVisible, setIsAssetVisible] = useState(false)
  const flashTimeoutRef = useRef(null)
  const assetSwitchTimeoutRef = useRef(null)
  const servicesSectionRef = useRef(null)
  const designSectionRef = useRef(null)

  useEffect(() => {
    document.body.dataset.theme = theme
  }, [theme])

  useEffect(() => {
    const onScroll = () => {
      setIsNavbarScrolled(window.scrollY > 28)
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    return () => {
      if (flashTimeoutRef.current) {
        clearTimeout(flashTimeoutRef.current)
      }
      if (assetSwitchTimeoutRef.current) {
        clearTimeout(assetSwitchTimeoutRef.current)
      }
    }
  }, [])

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 980px)')
    const updateServicesMode = (event) => {
      setIsServicesMobile(event.matches)
      if (event.matches) {
        setIsAssetVisible(false)
        setOpenServiceIndex((current) => (current === -1 ? 0 : current))
      }
    }

    updateServicesMode(mediaQuery)
    mediaQuery.addEventListener('change', updateServicesMode)
    return () => mediaQuery.removeEventListener('change', updateServicesMode)
  }, [])

  useEffect(() => {
    const section = servicesSectionRef.current
    if (!section) return undefined

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsServicesInView(true)
          }
        })
      },
      { threshold: 0.2 }
    )

    observer.observe(section)
    return () => {
      observer.disconnect()
    }
  }, [])







  useEffect(() => {
    document.body.classList.toggle('menu-open', isMobileMenuOpen)
    return () => document.body.classList.remove('menu-open')
  }, [isMobileMenuOpen])



  const toggleTheme = () => {
    setIsThemeFlash(true)
    if (flashTimeoutRef.current) {
      clearTimeout(flashTimeoutRef.current)
    }
    flashTimeoutRef.current = setTimeout(() => {
      setIsThemeFlash(false)
    }, 420)
    setTheme((currentTheme) => (currentTheme === 'light' ? 'dark' : 'light'))
  }

  useEffect(() => {
    const lines = document.querySelectorAll('[data-hero-line]')
    gsap.fromTo(lines, 
      { y: 100, opacity: 0 }, 
      { 
        y: 0, 
        opacity: 1, 
        duration: 1.2, 
        stagger: 0.15, 
        ease: "power4.out",
        delay: 0.4
      }
    )
  }, [])

  const heroLines = [
    'Crafting',
    'Digital Products',
    'That Scale.',
  ]

  const switchServiceAsset = (nextIndex, forceVisible = true) => {
    if (isServicesMobile) return
    if (nextIndex === activeServiceIndex) return

    if (assetSwitchTimeoutRef.current) {
      clearTimeout(assetSwitchTimeoutRef.current)
    }

    setIsAssetVisible(false)
    assetSwitchTimeoutRef.current = window.setTimeout(() => {
      setActiveServiceIndex(nextIndex)
      if (forceVisible) {
        setIsAssetVisible(true)
      }
    }, 100)
  }

  const mobileMenuItems = [
    { label: 'Projects', href: '#projects' },
    { label: 'Process', href: '#process' },
    { label: 'Services', href: '#services-showcase' },
    { label: 'Request Project', href: '#request' },
    { label: 'Register', href: '#register' },
    { label: 'Login', href: '#login' },
  ]

  return (
    <div className="page">
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



      <main>
        <section className="hero-section">
          <div className="hero-media">
            <video
              className="hero-video"
              autoPlay
              loop
              muted
              playsInline
            >
              <source src={heroVid} type="video/mp4" />
            </video>

            <div className="hero-overlay">
              <div className="hero-content">
                <h1>
                  {heroLines.map((line, index) => (
                    <div key={line} className="hero-line-mask">
                      <span
                        className={`hero-line ${line.includes('Digital') ? 'accent-text' : ''}`}
                        data-hero-line
                      >
                        {line}
                      </span>
                    </div>
                  ))}
                </h1>
              </div>
            </div>
          </div>
        </section>

        <section
          id="services-showcase"
          ref={servicesSectionRef}
          className={`services-section ${isServicesInView ? 'in-view' : ''}`}
          onPointerMove={(event) => {
            const rect = event.currentTarget.getBoundingClientRect()
            const x = ((event.clientX - rect.left) / rect.width) * 2 - 1
            const y = ((event.clientY - rect.top) / rect.height) * 2 - 1
            setServicePointer({
              x: Math.max(-1, Math.min(1, x)),
              y: Math.max(-1, Math.min(1, -y)),
            })
          }}
          onPointerLeave={() => setServicePointer({ x: 0, y: 0 })}
        >
          <p
            className="services-intro"
          >
            <span className="intro-line">We build transformative digital experiences</span>
            <span className="intro-line">for the world&apos;s leading brands by blending</span>
            <span className="intro-line">AI, design, and technology.</span>
          </p>

          {/* 3D Assets disabled for performance
          {!isServicesMobile && (
            <div className={`services-asset-wrap ${isAssetVisible ? 'is-visible' : ''}`}>
              <Canvas camera={{ position: [0, 0, 6.2], fov: 40 }} dpr={[1, 1.5]}>
                <ambientLight intensity={1.15} />
                <directionalLight position={[2.8, 4, 3]} intensity={1.35} />
                <directionalLight position={[-2.2, -2, 1.2]} intensity={0.45} />
                <ServiceShape index={activeServiceIndex} pointer={servicePointer} />
              </Canvas>
            </div>
          )}
          */}

          <div
            className="services-list"
            onMouseLeave={() => {
              if (!isServicesMobile && openServiceIndex === -1) {
                setIsAssetVisible(false)
              }
            }}
          >
            {serviceItems.map((item, index) => {
              const isOpen = openServiceIndex === index
              return (
                <article
                  key={item.title}
                  className={`service-item ${isOpen ? 'is-open' : ''}`}
                  style={{ transitionDelay: `${index * 45}ms` }}
                  onMouseEnter={() => {
                    if (!isServicesMobile && openServiceIndex === -1 && index !== activeServiceIndex) {
                      switchServiceAsset(index)
                    } else if (
                      !isServicesMobile &&
                      openServiceIndex === -1 &&
                      index === activeServiceIndex
                    ) {
                      setIsAssetVisible(true)
                    }
                  }}
                >
                  <button
                    type="button"
                    className="service-trigger"
                    onClick={() => {
                      if (openServiceIndex === index) {
                        setOpenServiceIndex(-1)
                        if (!isServicesMobile) {
                          setIsAssetVisible(false)
                        }
                        return
                      }

                      setOpenServiceIndex(index)
                      switchServiceAsset(index)
                      if (!isServicesMobile) {
                        setIsAssetVisible(true)
                      }
                    }}
                  >
                    <span>{item.title}</span>
                    <Icon className="service-chevron" icon="solar:alt-arrow-down-linear" />
                  </button>
                  <div className="service-description">
                    <p>{item.description}</p>
                  </div>
                </article>
              )
            })}
          </div>

          <div className="logos-cloud">
            {clientLogos.map((logo) => (
              <div key={logo.name} className="logo-pill" data-name={logo.name}>
                <Icon icon={logo.icon} aria-label={logo.name} />
              </div>
            ))}
          </div>

          <div className="view-all-clients-wrap">
            <a href="#clients" className="view-all-clients">
              <span>View all clients</span>
              <Icon icon="solar:alt-arrow-right-linear" className="arrow-icon" />
            </a>
          </div>
        </section>

        <DesignInnovation />

        <ProcessSection />
        <ProjectGallery />
        <ExpertSourcing />

        <section className="faq-section" id="faq">
          <h2>FAQ</h2>
          <div className="faq-list">
            {faqItems.map((item, index) => {
              const isOpen = openFaqIndex === index
              return (
                <article key={item.question} className={`faq-item ${isOpen ? 'is-open' : ''}`}>
                  <button
                    type="button"
                    className="faq-question"
                    onClick={() => setOpenFaqIndex((current) => (current === index ? -1 : index))}
                  >
                    <span>{item.question}</span>
                    <Icon className="faq-chevron" icon="solar:alt-arrow-down-linear" />
                  </button>
                  <div className="faq-answer-wrap">
                    <div className="faq-answer">
                      {item.answer.map((paragraph) => (
                        <p key={paragraph}>{paragraph}</p>
                      ))}
                    </div>
                  </div>
                </article>
              )
            })}
          </div>
        </section>

        <Footer />
      </main>

      <a className="schedule-call" href="#schedule">
        Schedule Call
      </a>


    </div>
  )
}

export default App
