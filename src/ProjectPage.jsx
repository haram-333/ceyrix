import React, { useState, useEffect, useRef } from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SplitType from 'split-type'
import { Icon } from '@iconify/react'
import './ProjectPage.css'

gsap.registerPlugin(ScrollTrigger)

const ceyrixLogo = '/ceyrix-logo.png'

const projectsData = [
  {
    id: 1,
    title: 'E-commerce Platform',
    category: 'Web Apps',
    client: 'RetailCo',
    year: '2024',
    description: 'A scalable online retail platform with advanced inventory management, real-time analytics, and seamless payment gateway integrations.',
    tags: ['Next.js', 'Stripe', 'PostgreSQL'],
    image: 'https://storage.googleapis.com/banani-generated-images/generated-images/3c017208-ee3d-440d-af69-acdc6199448b.jpg'
  },
  {
    id: 2,
    title: 'Healthcare Mobile App',
    category: 'Mobile Apps',
    client: 'Medicare+',
    year: '2024',
    description: 'A patient-centric mobile application allowing users to book appointments, access medical records securely, and teleconsult with doctors.',
    tags: ['React Native', 'WebRTC', 'HIPAA'],
    image: 'https://storage.googleapis.com/banani-generated-images/generated-images/c1a153a2-f41c-4c4a-9889-adb2a5be69e8.jpg'
  },
  {
    id: 3,
    title: 'SaaS Analytics Dashboard',
    category: 'SaaS Platforms',
    client: 'DataFlow',
    year: '2023',
    description: 'A comprehensive data visualization tool helping marketing teams track performance metrics, generate reports, and forecast trends.',
    tags: ['Vue.js', 'D3.js', 'Python'],
    image: 'https://storage.googleapis.com/banani-generated-images/generated-images/c6844ef9-96c8-449d-bac4-d0578a4b7e55.jpg'
  },
  {
    id: 4,
    title: 'Education Platform',
    category: 'Web Apps',
    client: 'EduTech',
    year: '2023',
    description: 'An interactive e-learning ecosystem featuring video streaming, student progress tracking, interactive quizzes, and instructor dashboards.',
    tags: ['React', 'GraphQL', 'AWS'],
    image: 'https://storage.googleapis.com/banani-generated-images/generated-images/431ef1aa-3c0b-4c55-91de-ab0a60093195.jpg'
  },
  {
    id: 5,
    title: 'Booking System',
    category: 'Enterprise',
    client: 'StayHub',
    year: '2022',
    description: 'A robust scheduling and reservation management system for a chain of boutique hotels, integrating with major travel aggregators.',
    tags: ['Angular', 'Java Spring', 'Redis'],
    image: 'https://storage.googleapis.com/banani-generated-images/generated-images/e8846a59-f9e3-409e-b790-2a3156695d8e.jpg'
  },
  {
    id: 6,
    title: 'CRM System',
    category: 'Enterprise',
    client: 'ApexRealty',
    year: '2022',
    description: 'A tailored Customer Relationship Management tool built for a real estate firm to manage leads, automate follow-ups, and track sales pipelines.',
    tags: ['React', 'Node.js', 'MongoDB'],
    image: 'https://storage.googleapis.com/banani-generated-images/generated-images/22235ba8-43e1-408e-b07a-5e1794520f44.jpg'
  }
]

const statsData = [
  { value: 150, suffix: '+', label: 'PROJECTS DELIVERED' },
  { value: 98, suffix: '%', label: 'CLIENT SATISFACTION' },
  { value: 40, suffix: '+', label: 'EXPERT ENGINEERS' },
  { value: 15, suffix: '+', label: 'COUNTRIES SERVED' }
]

const ProjectPage = () => {
  const [isNavbarScrolled, setIsNavbarScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [theme, setTheme] = useState(localStorage.getItem('ceyrix-theme') || document.body.dataset.theme || 'dark')
  const [isThemeFlash, setIsThemeFlash] = useState(false)
  const [activeFilter, setActiveFilter] = useState('All Projects')

  const heroRef = useRef(null)
  const featuredRef = useRef(null)
  const gridRef = useRef(null)
  const statsRef = useRef(null)
  const ctaRef = useRef(null)

  useEffect(() => {
    const savedTheme = localStorage.getItem('ceyrix-theme') || document.body.dataset.theme || 'dark';
    if (savedTheme !== theme) setTheme(savedTheme);
  }, [])

  useEffect(() => {
    const handleScroll = () => setIsNavbarScrolled(window.scrollY > 50)
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

  const filteredProjects = activeFilter === 'All Projects' 
    ? projectsData 
    : projectsData.filter(p => p.category === activeFilter)

  // ON MOUNT: Static Animations
  useEffect(() => {
    // Hero Animations
    const heroTitle = new SplitType('.project-hero-title', { types: 'words, chars' })
    const heroSub = new SplitType('.project-hero-subtitle', { types: 'lines' })
    const heroTl = gsap.timeline({ delay: 0.1 })
    gsap.set('.project-bg-text', { opacity: 0, scale: 0.85 })
    gsap.set('.scroll-indicator', { opacity: 0, y: -20 })
    heroTl.to('.project-bg-text', { opacity: 0.04, scale: 1, duration: 1.8, ease: 'power2.out' })
    .to('.project-kicker', { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, "-=1.2")
    .to(heroTitle.chars, { y: 0, opacity: 1, rotationZ: 0, stagger: 0.008, duration: 0.6, ease: 'power4.out' }, "-=0.8")
    if (heroSub.lines) {
      heroTl.to(heroSub.lines, { opacity: 1, y: 0, stagger: 0.08, duration: 0.6, ease: 'power3.out' }, "-=0.5")
    }
    heroTl.to('.scroll-indicator', { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }, "-=0.4")

    // Stats Counter
    if (statsRef.current) {
      const counters = statsRef.current.querySelectorAll('.stat-number-value')
      counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'))
        gsap.fromTo(counter, { innerText: 0 }, {
          innerText: target, duration: 2.5, snap: { innerText: 1 }, ease: 'power4.out',
          scrollTrigger: { trigger: statsRef.current, start: 'top 80%', once: true }
        })
      })
    }

    // Featured Case Study MODERN SICK ANIMATION
    if (featuredRef.current) {
      const caseTitle = new SplitType('.case-title', { types: 'lines, words' })
      const caseDesc = new SplitType('.case-description', { types: 'lines' })
      const imageWrap = featuredRef.current.querySelector('.project-step-image')
      const meta = featuredRef.current.querySelector('.case-meta-kicker')
      const divider = featuredRef.current.querySelector('.case-divider')
      const tech = featuredRef.current.querySelector('.tech-stack-list')
      const link = featuredRef.current.querySelector('.case-link')

      caseTitle.lines.forEach(line => {
        const wrapper = document.createElement('div')
        wrapper.className = 'case-title-line'
        line.parentNode.insertBefore(wrapper, line)
        wrapper.appendChild(line)
      })

      gsap.set(caseTitle.lines, { y: '100%' })
      if (caseDesc.lines) gsap.set(caseDesc.lines, { opacity: 0, y: 30, filter: 'blur(10px)' })
      gsap.set([meta, tech, link], { opacity: 0, y: 30 })
      gsap.set(divider, { width: 0 })

      gsap.fromTo(imageWrap, 
        { clipPath: 'inset(100% 0 0 0)', scale: 1.2 },
        { 
          clipPath: 'inset(0% 0 0 0)', scale: 1,
          duration: 2.4, ease: 'expo.inOut',
          scrollTrigger: { trigger: imageWrap, start: 'top 80%', once: true }
        }
      )

      const caseTl = gsap.timeline({ scrollTrigger: { trigger: featuredRef.current, start: 'top 65%', once: true } })
      caseTl.to(meta, { opacity: 1, y: 0, duration: 0.8, ease: 'power4.out' })
      .to(caseTitle.lines, { y: '0%', stagger: 0.15, duration: 1.2, ease: 'expo.out' }, "-=0.4")
      .to(divider, { width: '100%', duration: 1, ease: 'power4.inOut' }, "-=1")
      .to(caseDesc.lines, { opacity: 1, y: 0, filter: 'blur(0px)', stagger: 0.1, duration: 1, ease: 'power3.out' }, "-=0.6")
      .to([tech, link], { opacity: 1, y: 0, stagger: 0.2, duration: 0.8, ease: 'power4.out' }, "-=0.6")
    }

    // CTA Reveal
    if (ctaRef.current) {
      const ctaTitle = new SplitType('.cta-title', { types: 'words, chars' })
      const ctaSub = new SplitType('.cta-subtitle', { types: 'lines' })
      gsap.set(ctaTitle.chars, { y: 40, opacity: 0 })
      if (ctaSub.lines) gsap.set(ctaSub.lines, { y: 20, opacity: 0 })
      gsap.set('.cta-action-btn', { y: 20, opacity: 0 })
      const ctaTl = gsap.timeline({ scrollTrigger: { trigger: ctaRef.current, start: 'top 75%', once: true } })
      ctaTl.to(ctaTitle.chars, { y: 0, opacity: 1, stagger: 0.01, duration: 0.8, ease: 'power4.out' })
      .to(ctaSub.lines, { y: 0, opacity: 1, stagger: 0.1, duration: 0.8, ease: 'power3.out' }, "-=0.4")
      .to('.cta-action-btn', { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }, "-=0.4")
    }

    return () => {
      if (heroTitle.revert) heroTitle.revert()
      if (heroSub.revert) heroSub.revert()
      ScrollTrigger.getAll().filter(t => !t.trigger?.classList?.contains('archive-item')).forEach(t => t.kill())
    }
  }, [])

  // ON FILTER CHANGE: Grid MODERN SICK ANIMATION
  useEffect(() => {
    const gridItems = gsap.utils.toArray('.archive-item')
    
    gridItems.forEach((item) => {
      const img = item.querySelector('.item-image-wrap img')
      const title = item.querySelector('.item-title')
      const desc = item.querySelector('.item-desc')
      const meta = item.querySelector('.item-meta')
      const divider = item.querySelector('.item-desc-divider')
      
      const itemTitle = new SplitType(title, { types: 'lines' })
      const itemDesc = new SplitType(desc, { types: 'lines' })
      
      itemTitle.lines.forEach(line => {
        const wrapper = document.createElement('div')
        wrapper.className = 'item-title-line'
        line.parentNode.insertBefore(wrapper, line)
        wrapper.appendChild(line)
      })

      gsap.set(img, { clipPath: 'inset(100% 0 0 0)', scale: 1.25 })
      gsap.set(itemTitle.lines, { y: '100%' })
      if (itemDesc.lines) gsap.set(itemDesc.lines, { opacity: 0, y: 20, filter: 'blur(8px)' })
      gsap.set(meta, { opacity: 0, y: 10 })
      gsap.set(divider, { width: 0 })

      const tl = gsap.timeline({
        scrollTrigger: { trigger: item, start: 'top 85%', once: true }
      })

      tl.to(img, { clipPath: 'inset(0% 0 0 0)', scale: 1, duration: 1.8, ease: 'expo.inOut' })
      .to(meta, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, "-=1")
      .to(itemTitle.lines, { y: '0%', stagger: 0.1, duration: 0.8, ease: 'expo.out' }, "-=0.8")
      .to(divider, { width: '100%', duration: 0.8, ease: 'power4.inOut' }, "-=0.8")
      .to(itemDesc.lines, { opacity: 1, y: 0, filter: 'blur(0px)', stagger: 0.05, duration: 0.8, ease: 'power3.out' }, "-=0.6")
    })
    
    ScrollTrigger.refresh()
  }, [activeFilter])

  return (
    <div className={`page project-page-root ${isThemeFlash ? 'theme-flash' : ''}`}>
      <Navbar
        isNavbarScrolled={isNavbarScrolled}
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
        ceyrixLogo={ceyrixLogo}
        isThemeFlash={isThemeFlash}
        toggleTheme={toggleTheme}
        theme={theme}
        mobileMenuItems={[
          { label: 'Projects', href: '/projects' },
          { label: 'Process', href: '/process' },
          { label: 'Services', href: '/services' },
          { label: 'Contact', href: '/contact' },
          { label: 'Sign Up', href: '/signup' },
          { label: 'Login', href: '/login' }
        ]}
      />
      
      <main className="project-main">
        <section className="project-hero" ref={heroRef}>
          <div className="project-bg-text">PROJECTS</div>
          <span className="project-kicker">SELECTED WORK</span>
          <h1 className="project-hero-title">
            <span className="title-sans">Proven <span className="accent-text">Impact.</span></span>
            <span className="title-serif">Measurable Results.</span>
          </h1>
          <p className="project-hero-subtitle">
            We do not just write code — we solve complex business challenges. Every project here is measured by the outcomes it delivered.
          </p>
          <div className="scroll-indicator">
            <span className="scroll-text">EXPLORE ARCHIVE</span>
            <div className="scroll-line"></div>
          </div>
        </section>

        <section className="project-stats-section" ref={statsRef}>
          <div className="stats-container">
            {statsData.map((stat, i) => (
              <div key={i} className="stat-card">
                <div className="stat-number">
                  <span className="stat-number-value" data-target={stat.value}>0</span>
                  <span className="stat-suffix">{stat.suffix}</span>
                </div>
                <span className="stat-label">{stat.label}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="project-case-section" ref={featuredRef}>
          <div className="project-case-container">
            <div className="project-step-content">
              <span className="case-meta-kicker">01 // IMPACT CASE</span>
              <h2 className="case-title">Scaling a Global Payment Gateway to Process $500M+ Annually.</h2>
              <div className="case-divider"></div>
              <p className="case-description">
                Legacy architecture was throttling growth. We re-engineered the entire platform from the ground up — cutting user onboarding time by 40%.
              </p>
              <div className="tech-stack-list">
                <div className="tech-item">
                  <span className="tech-label">CORE ARCHITECTURE</span>
                  <span className="tech-value">React, Node.js, AWS</span>
                </div>
                <div className="tech-item">
                  <span className="tech-label">UX STRATEGY</span>
                  <span className="tech-value">User Centric Design</span>
                </div>
              </div>
              <a href="/projects/payment-gateway" className="case-link">
                VIEW CASE STUDY 
                <Icon icon="solar:alt-arrow-right-linear" />
              </a>
            </div>
            <div className="project-step-image">
              <div className="image-frame">
                <img src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1200" alt="Finance Flow Dashboard" />
              </div>
            </div>
          </div>
        </section>

        <section className="project-archive-section" ref={gridRef}>
          <div className="archive-header">
            <span className="archive-kicker">THE ARCHIVE</span>
            <h2 className="archive-title">Selected Works</h2>
            <div className="archive-filters">
              {['All Projects', 'Web Apps', 'Mobile Apps', 'SaaS Platforms', 'Enterprise'].map(filter => (
                <button 
                  key={filter} 
                  className={`filter-btn ${activeFilter === filter ? 'is-active' : ''}`}
                  onClick={() => setActiveFilter(filter)}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>

          <div className="archive-grid">
            {filteredProjects.map(project => (
              <div key={project.id} className="archive-item">
                <div className="item-image-wrap">
                  <img src={project.image} alt={project.title} />
                  <div className="item-overlay">
                    <div className="overlay-tags">
                      {project.tags.map(tag => <span key={tag} className="tag-pill">{tag}</span>)}
                    </div>
                    <a href={`/projects/${project.id}`} className="view-btn">
                      VIEW PROJECT
                      <Icon icon="solar:arrow-right-up-linear" />
                    </a>
                  </div>
                </div>
                <div className="item-info">
                  <div className="item-meta">
                    <span className="item-client">{project.client}</span>
                    <span className="item-year">{project.year}</span>
                  </div>
                  <h3 className="item-title">{project.title}</h3>
                  <div className="item-desc-divider"></div>
                  <p className="item-desc">{project.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="project-cta-section" ref={ctaRef}>
          <div className="cta-container">
            <h2 className="cta-title">
              Ready to build your <span className="title-serif-accent">next big idea?</span>
            </h2>
            <p className="cta-subtitle">
              Join hundreds of companies that trust Ceyrix to deliver high-quality custom software solutions on time and within budget.
            </p>
            <div className="cta-action">
              <a href="/#request" className="cta-action-btn">
                START YOUR PROJECT
                <Icon icon="solar:alt-arrow-right-linear" />
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

export default ProjectPage
