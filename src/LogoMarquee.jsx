import React from 'react'
import { Icon } from '@iconify/react'
import './LogoMarquee.css'

const row1Logos = [
  { name: 'Toyota', icon: 'simple-icons:toyota' },
  { name: 'Microsoft', icon: 'simple-icons:microsoft' },
  { name: 'Discover', icon: 'simple-icons:discover' },
  { name: 'VMware', icon: 'simple-icons:vmware' },
  { name: 'Amazon', icon: 'simple-icons:amazon' },
]

const row2Logos = [
  { name: 'Coinbase', icon: 'simple-icons:coinbase' },
  { name: 'ADP', icon: 'simple-icons:adp' },
  { name: 'UPS', icon: 'simple-icons:ups' },
  { name: 'Google', icon: 'simple-icons:google' },
  { name: 'Coca-Cola', icon: 'simple-icons:cocacola' },
]

export default function LogoMarquee() {
  return (
    <section className="marquee-section">
      <div className="marquee-header">
        <span className="marquee-kicker">TRUSTED BY PIONEERS</span>
        <div className="marquee-line"></div>
      </div>

      <div className="marquee-container">
        {/* Top Row: Scrolls Left */}
        <div className="marquee-track track-left">
          <div className="marquee-content">
            {/* Render 3 sets to ensure seamless infinite loop without snapping */}
            {[...row1Logos, ...row1Logos, ...row1Logos].map((logo, idx) => (
              <div key={`${logo.name}-${idx}`} className="marquee-item">
                <Icon icon={logo.icon} className="marquee-icon" />
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Row: Scrolls Right */}
        <div className="marquee-track track-right">
          <div className="marquee-content reverse">
            {[...row2Logos, ...row2Logos, ...row2Logos].map((logo, idx) => (
              <div key={`${logo.name}-${idx}`} className="marquee-item">
                <Icon icon={logo.icon} className="marquee-icon" />
              </div>
            ))}
          </div>
        </div>
        
        {/* Edge Fade Masks */}
        <div className="marquee-mask mask-left"></div>
        <div className="marquee-mask mask-right"></div>
      </div>
    </section>
  )
}
