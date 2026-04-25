import React, { useState, useEffect } from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
const ceyrixLogo = '/ceyrix-logo.png'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './ServicesPage.css'

gsap.registerPlugin(ScrollTrigger)

const ServicesPage = () => {
  const [isNavbarScrolled, setIsNavbarScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [theme, setTheme] = useState('light')
  const [isThemeFlash, setIsThemeFlash] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsNavbarScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Sync theme state → DOM so CSS variables kick in
  useEffect(() => {
    document.body.dataset.theme = theme
  }, [theme])

  const toggleTheme = () => {
    setIsThemeFlash(true)
    setTimeout(() => setIsThemeFlash(false), 420)
    setTheme(current => current === 'light' ? 'dark' : 'light')
  }

  const mobileMenuItems = [
    { label: 'Projects', href: '/#projects' },
    { label: 'Process', href: '/#process' },
    { label: 'Services', href: '/services' },
    { label: 'Request Project', href: '/#request' }
  ]

  useEffect(() => {
    let ctx = gsap.context(() => {
      const items = document.querySelectorAll('.parallax-item')

      items.forEach((item) => {
        const speed = parseFloat(item.getAttribute('data-speed'))
        const img = item.querySelector('img')

        // Window Parallax: Animate the image inside the container
        if (img) {
          // Kinetic Reveal Animation: High-impact scale, rotation, and blur
          gsap.fromTo(item,
            {
              scale: 0.7,
              opacity: 0,
              rotationX: -10,
              rotationY: 5,
              filter: 'blur(10px)'
            },
            {
              scale: 1,
              opacity: 1,
              rotationX: 0,
              rotationY: 0,
              filter: 'blur(0px)',
              duration: 0.4, // Accelerated for high-speed snap
              ease: 'back.out(1.4)',
              scrollTrigger: {
                trigger: item,
                start: 'top 92%',
                toggleActions: 'play none none none'
              }
            }
          )

          // Parallax Drift: Animate the internal image drift
          gsap.fromTo(img,
            { y: '10%' },
            {
              y: '-10%',
              ease: 'none',
              scrollTrigger: {
                trigger: item,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 1
              }
            }
          )
        } else {
          // Fallback for background shapes
          gsap.to(item, {
            y: -200 * speed,
            ease: 'none',
            scrollTrigger: {
              trigger: item,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1
            }
          })
        }
      })
    })

    // Force refresh after a short delay to account for layout shifts
    const timer = setTimeout(() => {
      ScrollTrigger.refresh()
    }, 100)

    return () => {
      ctx.revert()
      clearTimeout(timer)
    }
  }, [])

  return (
    <div className={`services-page-root theme-${theme}`}>
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

      <main className="services-hero">
        <div className="hero-content-wrap">
          <h1 className="hero-headline">
            A full-service <br />
            digital innovation <br />
            partner
          </h1>
          <p className="hero-subheadline">
            Our rich design and technology expertise delivers <br />
            top brands and digital experiences.
          </p>
        </div>
      </main>

      <section className="services-capabilities">
        <div className="capability-container">
          {/* 01. Branding */}
          <div className="capability-row">
            <div className="capability-text-side">
              <span className="capability-index">01</span>
              <h2 className="capability-title">Branding</h2>
              <p className="capability-desc">
                At the core of our approach, we maintain that brand and UX are
                inextricably connected and work together. Our team specializes
                in creating and implementing digital brand identities across
                channels, providing strategy assistance and guidelines to ensure consistency.
              </p>
              <ul className="capability-list">
                <li><span>+</span> Brand Strategy</li>
                <li><span>+</span> Brand Architecture</li>
                <li><span>+</span> Verbal Identity</li>
                <li><span>+</span> Visual Identity</li>
                <li><span>+</span> Brand Guidelines</li>
                <li><span>+</span> Brand Experience</li>
              </ul>
            </div>
            <div className="capability-image-side parallax-item" data-speed="0.1">
              <img src="https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&q=80&w=1000" alt="Branding" />
            </div>
          </div>

          {/* 02. Digital Products */}
          <div className="capability-row reverse">
            <div className="capability-text-side">
              <span className="capability-index">02</span>
              <h2 className="capability-title">Digital Products</h2>
              <p className="capability-desc">
                At Ceyrix, we make every touchpoint an opportunity to make our
                experience whether using a product at work or in their free
                time. We create memorable products and services that
                user-centric as well as provide comprehensive design systems
                for effortless product iteration.
              </p>
              <ul className="capability-list">
                <li><span>+</span> Consumer & Enterprise Software</li>
                <li><span>+</span> User Research & Testing</li>
                <li><span>+</span> CX, UX & Interaction Design</li>
                <li><span>+</span> UI Design</li>
                <li><span>+</span> Motion Design</li>
                <li><span>+</span> Design Systems</li>
              </ul>
            </div>
            <div className="capability-image-side parallax-item" data-speed="0.2">
              <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1000" alt="Digital Products" />
            </div>
          </div>

          {/* 03. Websites */}
          <div className="capability-row">
            <div className="capability-text-side">
              <span className="capability-index">03</span>
              <h2 className="capability-title">Websites</h2>
              <p className="capability-desc">
                A website is the most important channel to showcase your
                brand to customers. Our portfolio features award-winning
                websites designed to give users the best experience
                possible while also meeting business goals.
              </p>
              <ul className="capability-list">
                <li><span>+</span> Content Strategy</li>
                <li><span>+</span> Web Design</li>
                <li><span>+</span> Interactive Experiences</li>
                <li><span>+</span> Content Production</li>
                <li><span>+</span> Frontend & Backend Development</li>
                <li><span>+</span> CMS Implementation</li>
              </ul>
            </div>
            <div className="capability-image-side parallax-item" data-speed="0.15">
              <img src="https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&q=80&w=1000" alt="Websites" />
            </div>
          </div>

          {/* 04. Content */}
          <div className="capability-row reverse">
            <div className="capability-text-side">
              <span className="capability-index">04</span>
              <h2 className="capability-title">Content</h2>
              <p className="capability-desc">
                Authentic content is essential in the digital world. We work
                with brands to identify their unique brand voice and deliver
                custom-made assets of the highest quality down to the last pixel.
              </p>
              <ul className="capability-list">
                <li><span>+</span> Art Direction</li>
                <li><span>+</span> Illustration & Graphic Design</li>
                <li><span>+</span> Iconography</li>
                <li><span>+</span> Animation</li>
                <li><span>+</span> Photo & Video</li>
                <li><span>+</span> 3D</li>
              </ul>
            </div>
            <div className="capability-image-side parallax-item" data-speed="0.25">
              <img src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=1000" alt="Content" />
            </div>
          </div>

          {/* 05. Development */}
          <div className="capability-row">
            <div className="capability-text-side">
              <span className="capability-index">05</span>
              <h2 className="capability-title">Development</h2>
              <p className="capability-desc">
                Our designers and developers collaborate to create
                websites and products that provide exceptional user
                experience and functionality. We optimize search engine
                visibility, ensure accessibility, and maximize performance.
              </p>
              <ul className="capability-list">
                <li><span>+</span> Technology Consulting</li>
                <li><span>+</span> Architecture Planning</li>
                <li><span>+</span> Mobile App Development</li>
                <li><span>+</span> Frontend Web Development</li>
                <li><span>+</span> Backend Development & API Integration</li>
                <li><span>+</span> Emerging Tech (AI, AR/VR, Blockchain, Web3)</li>
              </ul>
            </div>
            <div className="capability-image-side parallax-item" data-speed="0.1">
              <img src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=1000" alt="Development" />
            </div>
          </div>
          {/* Background Decorative Shapes */}
          <div className="floating-shape shape-1 parallax-item" data-speed="0.05"></div>
          <div className="floating-shape shape-2 parallax-item" data-speed="0.12"></div>
          <div className="floating-shape shape-3 parallax-item" data-speed="0.08"></div>
        </div>
      </section>

      <section className="services-industries">
        <div className="industries-header">
          <h2 className="industries-title">Industries</h2>
          <p className="industries-subtitle">
            We unite with big brands and startups in various <br />
            industries to create award-winning work.
          </p>
        </div>

        <div className="industries-grid">
          <div className="industry-row">
            <div className="industry-name">Fintech</div>
            <div className="industry-clients">Discover, Stripe, CreditKarma, STC Bank, MoneyLion, Marqeta, Quicken, Lulo Bank, Earnin, Fundbox, StreetBeat, Q2</div>
          </div>
          <div className="industry-row">
            <div className="industry-name">B2B & Enterprise Software</div>
            <div className="industry-clients">Slack, ADP, VMware, Okta, Splunk, Nutanix, Zenefits, Comscore, Papaya, TeamViewer, Cornerstone, WorkBoard, AppDynamics</div>
          </div>
          <div className="industry-row">
            <div className="industry-name">Crypto & Web3</div>
            <div className="industry-clients">Coinbase, MEXC, DFINITY, Ndax, Aurox, Alliance Block</div>
          </div>
          <div className="industry-row">
            <div className="industry-name">Technology</div>
            <div className="industry-clients">Google, Amazon, Snapchat, Facebook, Cisco, Speedtest.net</div>
          </div>
          <div className="industry-row">
            <div className="industry-name">Ecommerce & Fashiontech</div>
            <div className="industry-clients">Serena & Lily, California Closets, L'Oreal, Mercari</div>
          </div>
          <div className="industry-row">
            <div className="industry-name">Electronics</div>
            <div className="industry-clients">Sony, Sandisk, Western Digital, Oppo, Corsair, Samsung, XGIMI, Fossil</div>
          </div>
          <div className="industry-row">
            <div className="industry-name">Food & Beverage</div>
            <div className="industry-clients">Coca-Cola, IMPOSSIBLE, Joe & The Juice, JOKR, Reyes Holdings</div>
          </div>
          <div className="industry-row">
            <div className="industry-name">Startups & VC</div>
            <div className="industry-clients">Fiverr, Superhuman, SendGrid, Clearbit, Onfido, Rapid Robotics, Wealth</div>
          </div>
          <div className="industry-row">
            <div className="industry-name">Healthcare & Life Sciences</div>
            <div className="industry-clients">Medidata, Medable, Hint, Endpoint, Neurolign, Quartzy</div>
          </div>
          <div className="industry-row">
            <div className="industry-name">Telecommunications</div>
            <div className="industry-clients">T-Mobile, C-Spire, Huawei</div>
          </div>
          <div className="industry-row">
            <div className="industry-name">Mobility</div>
            <div className="industry-clients">Uber, Toyota, Nauto</div>
          </div>
          <div className="industry-row">
            <div className="industry-name">Logistics</div>
            <div className="industry-clients">UPS, Interos, Martin Brower</div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default ServicesPage
