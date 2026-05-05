import React, { useState, useEffect, useRef } from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SplitType from 'split-type'
import { Icon } from '@iconify/react'
import './ContactPage.css'

gsap.registerPlugin(ScrollTrigger)

const ceyrixLogo = '/ceyrix-logo.png'

const contactInfo = [
  {
    icon: "solar:letter-linear",
    title: "Email Us",
    lines: ["hello@ceyrix.com", "support@ceyrix.com"],
    link: "mailto:hello@ceyrix.com"
  },
  {
    icon: "solar:phone-linear",
    title: "Call Us",
    lines: ["+1 (555) 123-4567", "Mon-Fri, 9am-6pm EST"],
    link: "tel:+15551234567"
  },
  {
    icon: "solar:map-point-linear",
    title: "Visit Us",
    lines: ["120 Broadway, Suite 3400", "New York, NY 10271"],
    link: "https://maps.google.com"
  },
  {
    icon: "solar:chat-round-dots-linear",
    title: "Live Chat",
    lines: ["Available 24/7 on our platform", "Average response time: 5 mins"],
    link: "#chat"
  }
]

const ContactPage = () => {
  const [isNavbarScrolled, setIsNavbarScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [theme, setTheme] = useState(localStorage.getItem('ceyrix-theme') || document.body.dataset.theme || 'dark')
  const [isThemeFlash, setIsThemeFlash] = useState(false)

  const heroRef = useRef(null)
  const inquiryRef = useRef(null)
  const dropdownRef = useRef(null)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [selectedBudget, setSelectedBudget] = useState('Select a budget range')

  const budgetOptions = [
    '$5k — $10k',
    '$10k — $25k',
    '$25k — $50k',
    '$50k+'
  ]

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

  useEffect(() => {
    // Hero Animations
    const title = new SplitType('.contact-hero-title', { types: 'lines, words' })
    const subtitle = new SplitType('.contact-hero-subtitle', { types: 'lines' })
    
    title.lines.forEach(line => {
      const wrapper = document.createElement('div')
      wrapper.className = 'title-line-wrapper'
      line.parentNode.insertBefore(wrapper, line)
      wrapper.appendChild(line)
    })

    gsap.set('.contact-kicker', { opacity: 0, y: 20 })
    gsap.set(title.lines, { y: '160%' })
    if (subtitle.lines) gsap.set(subtitle.lines, { opacity: 0, y: 20, filter: 'blur(10px)' })
    gsap.set('.contact-bg-text', { opacity: 0, scale: 0.85 })

    const tl = gsap.timeline({ delay: 0.1 })

    tl.to('.contact-bg-text', {
      opacity: 0.04, scale: 1, duration: 1.8, ease: 'power2.out'
    })
    .to('.contact-kicker', {
      opacity: 1, y: 0, duration: 0.8, ease: 'power4.out'
    }, "-=1.4")
    .to(title.lines, {
      y: '0%', stagger: 0.1, duration: 1.4, ease: 'expo.out'
    }, "-=1")
    .to(subtitle.lines, {
      opacity: 1, y: 0, filter: 'blur(0px)', stagger: 0.08, duration: 1, ease: 'power3.out'
    }, "-=1")

    // Inquiry Section Reveal (Fixed Trigger)
    if (inquiryRef.current) {
      const cards = inquiryRef.current.querySelectorAll('.contact-info-card')
      const form = inquiryRef.current.querySelector('.contact-form-container')
      
      gsap.fromTo(cards, 
        { opacity: 0, x: -40 },
        {
          opacity: 1, x: 0, stagger: 0.15, duration: 1.2, ease: 'power4.out',
          scrollTrigger: { 
            trigger: inquiryRef.current, 
            start: 'top 85%', // Trigger earlier
            once: true 
          }
        }
      )
      
      gsap.fromTo(form, 
        { opacity: 0, y: 60 },
        {
          opacity: 1, y: 0, duration: 1.5, ease: 'expo.out',
          scrollTrigger: { 
            trigger: inquiryRef.current, 
            start: 'top 80%', 
            once: true 
          }
        }
      )
    }

    // Click Outside listener for custom dropdown
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      if (title.revert) title.revert()
      if (subtitle.revert) subtitle.revert()
      document.removeEventListener('mousedown', handleClickOutside)
      ScrollTrigger.getAll().forEach(t => t.kill())
    }
  }, [])

  return (
    <div className={`page contact-page-root ${isThemeFlash ? 'theme-flash' : ''}`}>
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

      <main className="contact-main">
        <section className="contact-hero" ref={heroRef}>
          <div className="contact-bg-text">CONNECT</div>
          
          <div className="contact-hero-content">
            <span className="contact-kicker">GET IN TOUCH</span>
            <h1 className="contact-hero-title">
              <span className="title-sans">Let's Build</span>
              <span className="title-serif-accent">Something Great.</span>
            </h1>
            <p className="contact-hero-subtitle">
              Have a project in mind or want to learn more about our services? Our team is ready to help you build your next digital solution.
            </p>
          </div>

          <div className="contact-scroll-hint">
            <div className="hint-line"></div>
            <span>INQUIRY FORM</span>
          </div>
        </section>

        <section className="contact-inquiry-section" ref={inquiryRef}>
          <div className="inquiry-grid">
            <div className="contact-info-column">
              {contactInfo.map((info, i) => (
                <div key={i} className="contact-info-card">
                  <div className="info-icon-box">
                    <Icon icon={info.icon} />
                  </div>
                  <div className="info-content">
                    <h3>{info.title}</h3>
                    {info.lines.map((line, li) => (
                      <p key={li}>{line}</p>
                    ))}
                    <a href={info.link} className="info-action">Get in touch →</a>
                  </div>
                </div>
              ))}
            </div>

            <div className="contact-form-container">
              <form className="inquiry-form" onSubmit={(e) => e.preventDefault()}>
                <div className="form-group">
                  <label htmlFor="firstName">First Name</label>
                  <input type="text" id="firstName" placeholder="e.g. Jane" required />
                </div>
                <div className="form-group">
                  <label htmlFor="lastName">Last Name</label>
                  <input type="text" id="lastName" placeholder="e.g. Doe" required />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email Address</label>
                  <input type="email" id="email" placeholder="e.g. jane@company.com" required />
                </div>
                <div className="form-group">
                  <label htmlFor="phone">Phone Number</label>
                  <input type="tel" id="phone" placeholder="e.g. +1 (555) 000-0000" />
                </div>
                <div className="form-group full-width">
                  <label htmlFor="company">Company Name</label>
                  <input type="text" id="company" placeholder="e.g. Acme Corporation" />
                </div>
                <div className={`form-group full-width ${isDropdownOpen ? 'active-dropdown' : ''}`}>
                  <label htmlFor="budget">Project Budget</label>
                  <div 
                    ref={dropdownRef}
                    className={`custom-select ${isDropdownOpen ? 'is-open' : ''} ${selectedBudget !== 'Select a budget range' ? 'has-value' : ''}`}
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  >
                    <div className="select-trigger">
                      <span>{selectedBudget}</span>
                      <Icon icon="solar:alt-arrow-down-linear" />
                    </div>
                    {isDropdownOpen && (
                      <div className="select-options">
                        {budgetOptions.map(option => (
                          <div 
                            key={option} 
                            className={`select-option ${selectedBudget === option ? 'is-selected' : ''}`}
                            onClick={(e) => {
                              e.stopPropagation()
                              setSelectedBudget(option)
                              setIsDropdownOpen(false)
                            }}
                          >
                            {option}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
                <div className="form-group full-width">
                  <label htmlFor="message">Your Message</label>
                  <textarea id="message" placeholder="Tell us about your project requirements..."></textarea>
                </div>
                <button type="submit" className="form-submit-btn">SEND MESSAGE</button>
                <p className="form-policy">
                  By submitting this form, you agree to our <a href="/privacy">privacy policy</a>
                </p>
              </form>
            </div>
          </div>
        </section>

        <section className="contact-faq-section">
          <div className="faq-container">
            <div className="faq-sidebar">
              <div className="faq-sticky-content">
                <span className="faq-kicker">TECHNICAL FAQ</span>
                <h2 className="faq-title">
                  Information <span className="title-serif-accent">Architecture.</span>
                </h2>
                <p className="faq-intro">
                  Find detailed answers to common inquiries about our development 
                  methodologies, timelines, and post-launch commitments.
                </p>
              </div>
            </div>
            
            <div className="faq-main-list">
              {[
                {
                  q: "What is your typical project timeline?",
                  a: "Project timelines vary based on complexity and scope. A standard web application might take 8-12 weeks, while larger enterprise solutions can take 4-6 months. We provide detailed timelines during our initial consultation."
                },
                {
                  q: "How do you handle project communication?",
                  a: "We use the Ceyrix platform dashboard where you can track progress, view milestones, and communicate directly with your dedicated development team in real-time."
                },
                {
                  q: "Do you offer post-launch support?",
                  a: "Yes, we offer comprehensive maintenance and support packages for all projects we build. This includes bug fixes, security updates, and feature enhancements."
                },
                {
                  q: "How does the pricing and quotation work?",
                  a: "After reviewing your initial requirements, we provide a transparent, itemized quotation that breaks down costs by features and development phases."
                }
              ].map((item, idx) => (
                <div key={idx} className="faq-item-row">
                  <div className="faq-item-header" onClick={(e) => {
                    const row = e.currentTarget.parentElement;
                    row.classList.toggle('is-open');
                  }}>
                    <span className="faq-number">{(idx + 1).toString().padStart(2, '0')}</span>
                    <h3>{item.q}</h3>
                    <div className="faq-plus"></div>
                  </div>
                  <div className="faq-answer">
                    <div className="faq-answer-inner">
                      <p>{item.a}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

export default ContactPage
