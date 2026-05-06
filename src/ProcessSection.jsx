import React, { useRef } from 'react'
import { Icon } from '@iconify/react'
import './ProcessSection.css'

export default function ProcessSection() {
  const containerRef = useRef(null)

  // Mouse tracking for the spotlight glow effect
  const handleMouseMove = (e) => {
    if (!containerRef.current) return
    const cards = containerRef.current.querySelectorAll('.bento-card')
    for (const card of cards) {
      const rect = card.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      card.style.setProperty('--mouse-x', `${x}px`)
      card.style.setProperty('--mouse-y', `${y}px`)
    }
  }

  const steps = [
    {
      icon: "solar:document-text-linear",
      title: "Submit Requirements",
      desc: "Quickly describe your idea, upload project files, and send detailed requirements directly to our dedicated development team.",
      span: "span-2" // Large card
    },
    {
      icon: "solar:calculator-minimalistic-linear",
      title: "Transparent Quotations",
      desc: "Receive clear and professional quotations including development scope, pricing, and estimated delivery timelines.",
      span: ""
    },
    {
      icon: "solar:widget-2-linear",
      title: "Real-Time Tracking",
      desc: "Monitor project progress, milestones, and updates in real time through your dedicated client dashboard.",
      span: ""
    },
    {
      icon: "solar:rocket-linear",
      title: "Rapid Deployment",
      desc: "Experience accelerated timelines with agile methodology, ensuring your product gets to market faster without compromising on scalable architecture.",
      span: "span-2" // Large card to complete the 2x2 grid (3 cols total: 2+1, 1+2)
    }
  ]

  return (
    <section className="modern-process-section" onMouseMove={handleMouseMove}>
      <div className="process-header">
        <h2 className="process-title">
          <span className="title-serif">Reimagined</span> <span className="title-sans">for You</span>
        </h2>
        <p className="process-subtitle">
          Our tech-driven platform provides end-to-end visibility and control over your complex software enterprise.
        </p>
      </div>

      <div className="bento-grid" ref={containerRef}>
        {steps.map((step, idx) => (
          <div key={idx} className={`bento-card ${step.span}`}>
            <div className="bento-card-content">
              <div className="step-icon-box">
                <Icon icon={step.icon} />
              </div>
              <h3>{step.title}</h3>
              <p>{step.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
