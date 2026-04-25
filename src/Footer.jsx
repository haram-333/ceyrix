import React from 'react'
import { Icon } from '@iconify/react'

const Footer = () => {
  return (
    <footer className="site-footer" id="contact">
      <div className="footer-content">
        <div className="footer-main">
          <div className="footer-contact">
            <h2 className="footer-title">Let&apos;s Talk</h2>
            <div className="footer-contact-details">
              <a href="mailto:hey@ceyrix.com" target="_blank" rel="noreferrer noopener" aria-label="Email" className="footer-email">
                <span>hey@ceyrix.com</span>
              </a>
              <a href="tel:+1 415 796 6262" target="_blank" rel="noreferrer noopener" aria-label="Tel" className="footer-phone">
                <span>+1 415 796 6262</span>
              </a>
            </div>
          </div>

          <div className="footer-links-container">
            <nav className="footer-nav">
              <ul>
                <li><a href="/work"><span>Work</span></a></li>
                <li><a href="/clients"><span>Clients</span></a></li>
                <li><a href="/services"><span>Services</span></a></li>
                <li><a href="/industries"><span>Industries</span></a></li>
                <li><a href="/about"><span>About</span></a></li>
                <li><a href="/blog"><span>Blog</span></a></li>
                <li><a href="/contact"><span>Contact</span></a></li>
              </ul>
            </nav>

            <ul className="footer-locations">
              <li>
                <span className="location-city">San Francisco</span>
                <div className="location-address">
                  <p><a href="https://maps.app.goo.gl/G1VHdzEgTTHyJKRDA" target="_blank" rel="noreferrer noopener">300 Broadway,<br />San Francisco, CA 94133</a></p>
                </div>
              </li>
              <li>
                <span className="location-city">New York</span>
                <div className="location-address">
                  <p><a href="https://maps.app.goo.gl/Wr1xNTxAh4Hx4zuV6" target="_blank" rel="noreferrer noopener">148 Lafayette St,<br />New York, NY 10013</a></p>
                </div>
              </li>
              <li>
                <span className="location-city">Austin</span>
                <div className="location-address">
                  <p><a href="https://maps.app.goo.gl/tHM3o7BnMvMM3Nks7" target="_blank" rel="noreferrer noopener">600 Congress Ave,<br />Austin, TX 78701</a></p>
                </div>
              </li>
              <li>
                <span className="location-city">Denver</span>
                <div className="location-address">
                  <p><a href="https://maps.app.goo.gl/7snLQRA35qpEJQ7R8" target="_blank" rel="noreferrer noopener">1700 Lincoln St 17th fl,<br />Denver, CO 80203</a></p>
                </div>
              </li>
              <li>
                <span className="location-city">Lisbon</span>
                <div className="location-address">
                  <p><a href="https://maps.app.goo.gl/U2uawhnTvn7AQWCPA" target="_blank" rel="noreferrer noopener">Av. Alm. Reis 139, 1150-015<br />Lisbon, Portugal</a></p>
                </div>
              </li>
              <li>
                <span className="location-city">Belgrade</span>
                <div className="location-address">
                  <p><a href="https://maps.app.goo.gl/pUqg7Exq6m88mSkdA" target="_blank" rel="noreferrer noopener">Nušićeva 15, 11000<br />Belgrade, Serbia</a></p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <ul className="footer-socials">
            <li><a href="#dribbble" aria-label="Dribbble"><Icon icon="mdi:dribbble" /></a></li>
            <li><a href="#behance" aria-label="Behance"><Icon icon="mdi:behance" /></a></li>
            <li><a href="#instagram" aria-label="Instagram"><Icon icon="mdi:instagram" /></a></li>
            <li><a href="#linkedin" aria-label="LinkedIn"><Icon icon="mdi:linkedin" /></a></li>
            <li><a href="#x" aria-label="X"><Icon icon="ri:twitter-x-line" /></a></li>
            <li><a href="#facebook" aria-label="Facebook"><Icon icon="mdi:facebook" /></a></li>
          </ul>

          <div className="footer-legal">
            <div className="footer-legal-links">
              <a href="/privacy-policy">Privacy</a>
              <a href="/terms">Terms</a>
              <a href="/sitemap">Sitemap</a>
            </div>
            <span className="footer-copyright">© 2016–2026 Ceyrix Global, LLC</span>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
