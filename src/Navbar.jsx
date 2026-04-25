import React from 'react'
import { Link } from 'react-router-dom'
import { Icon } from '@iconify/react'

const Navbar = ({ 
  isNavbarScrolled, 
  isMobileMenuOpen, 
  setIsMobileMenuOpen, 
  ceyrixLogo, 
  isThemeFlash, 
  toggleTheme, 
  theme,
  mobileMenuItems,
  heroNav
}) => {
  return (
    <>
      <header className={`navbar ${isNavbarScrolled ? 'is-scrolled' : ''} ${heroNav && !isNavbarScrolled ? 'is-hero-nav' : ''}`}>
        <Link
          to="/"
          className={`brand ${isMobileMenuOpen ? 'menu-open-logo' : ''}`}
          aria-label="Ceyrix homepage"
        >
          <img className="brand-logo brand-logo-light" src={ceyrixLogo} alt="Ceyrix" />
          <img className="brand-logo brand-logo-dark" src={ceyrixLogo} alt="Ceyrix" />
        </Link>

        <nav className="main-nav" aria-label="Main navigation">
          <a href="/#projects">Projects</a>
          <a href="/#process">Process</a>
          <Link to="/services">Services</Link>
          <a href="/#request">Request Project</a>
        </nav>

        <div className="nav-actions">
          <button
            type="button"
            className={`theme-button ${isThemeFlash ? 'is-flashing' : ''}`}
            onClick={toggleTheme}
            aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
            title={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
          >
            <span className={`theme-icon-wrap ${theme === 'dark' ? 'is-dark' : ''}`}>
              <Icon className="theme-icon sun-icon" icon="solar:sun-bold-duotone" />
              <Icon className="theme-icon moon-icon" icon="solar:moon-stars-bold-duotone" />
            </span>
          </button>
          <a href="/#register">Register</a>
          <a href="/#login">Login</a>
        </div>

        <div className="mobile-nav-actions">
          <button
            type="button"
            className={`mobile-theme-button ${isThemeFlash ? 'is-flashing' : ''}`}
            onClick={toggleTheme}
            aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
            title={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
          >
            <span className={`theme-icon-wrap ${theme === 'dark' ? 'is-dark' : ''}`}>
              <Icon className="theme-icon sun-icon" icon="solar:sun-bold-duotone" />
              <Icon className="theme-icon moon-icon" icon="solar:moon-stars-bold-duotone" />
            </span>
          </button>
          <a href="/#contact" className="mobile-contact-button">
            Contact
          </a>
          <button
            type="button"
            className={`mobile-menu-toggle ${isMobileMenuOpen ? 'is-open' : ''}`}
            onClick={() => setIsMobileMenuOpen((open) => !open)}
            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMobileMenuOpen}
          >
            <Icon
              icon={isMobileMenuOpen ? 'solar:close-circle-linear' : 'solar:hamburger-menu-linear'}
            />
          </button>
        </div>
      </header>

      <div className={`mobile-menu-panel ${isMobileMenuOpen ? 'is-open' : ''}`}>
        <div className="mobile-menu-content">
          <nav className="mobile-menu-links" aria-label="Mobile menu">
            {mobileMenuItems.map((item, index) => {
              if (item.label === 'Services') {
                return (
                  <Link
                    key={item.label}
                    to="/services"
                    style={{ '--menu-delay': `${130 + index * 70}ms` }}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                )
              }
              return (
                <a
                  key={item.label}
                  href={item.href}
                  style={{ '--menu-delay': `${130 + index * 70}ms` }}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.label}
                </a>
              )
            })}
          </nav>

          <div className="mobile-menu-meta">
            <a href="mailto:hey@ceyrix.com">hey@ceyrix.com</a>
            <a href="tel:+14157966262">+1 (415) 796-6262</a>
          </div>

          <div className="mobile-menu-social">
            <a href="#social-dribbble" aria-label="Dribbble">
              <Icon icon="mdi:dribbble" />
            </a>
            <a href="#social-behance" aria-label="Behance">
              <Icon icon="mdi:behance" />
            </a>
            <a href="#social-instagram" aria-label="Instagram">
              <Icon icon="mdi:instagram" />
            </a>
            <a href="#social-linkedin" aria-label="LinkedIn">
              <Icon icon="mdi:linkedin" />
            </a>
          </div>
        </div>
      </div>
    </>
  )
}

export default Navbar
