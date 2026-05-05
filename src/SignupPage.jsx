import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { Icon } from '@iconify/react'
import './LoginPage.css' // Sharing the high-end login styles

const SignupPage = () => {
  const [theme, setTheme] = useState(localStorage.getItem('ceyrix-theme') || document.body.dataset.theme || 'dark')
  const [showPassword, setShowPassword] = useState(false)
  const signupRef = useRef(null)

  useEffect(() => {
    document.body.dataset.theme = theme
    
    // Entrance Animation
    const tl = gsap.timeline()
    gsap.set('.login-card', { opacity: 0, y: 40, filter: 'blur(10px)' })
    
    tl.to('.login-card', { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1.2, ease: 'power4.out' })
  }, [theme])

  return (
    <div className="login-page-root">
      <div className="login-container">
        <div className="login-card" ref={signupRef}>
          <div className="login-header">
            <Link to="/" className="login-logo-link">
              <img src="/ceyrix-logo.png" alt="Ceyrix" className="login-logo-img" />
            </Link>
            <h1>Create Account</h1>
            <p>Join the Ceyrix ecosystem and start building.</p>
          </div>

          <form className="login-form" onSubmit={(e) => e.preventDefault()}>
            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <input type="text" id="name" placeholder="John Doe" required autoComplete="off" />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input type="email" id="email" placeholder="name@company.com" required autoComplete="off" />
            </div>

            <div className="form-group">
              <label htmlFor="company">Company</label>
              <input type="text" id="company" placeholder="Acme Corp" required autoComplete="off" />
            </div>

            <div className="form-group password-group">
              <label htmlFor="password">Password</label>
              <div className="input-with-action">
                <input 
                  type={showPassword ? "text" : "password"} 
                  id="password" 
                  placeholder="••••••••" 
                  required 
                  autoComplete="off"
                />
                <button 
                  type="button" 
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  <Icon icon={showPassword ? "solar:eye-closed-linear" : "solar:eye-linear"} />
                </button>
              </div>
            </div>

            <div className="form-group password-group">
              <label htmlFor="repeat-password">Repeat Password</label>
              <div className="input-with-action">
                <input 
                  type={showPassword ? "text" : "password"} 
                  id="repeat-password" 
                  placeholder="••••••••" 
                  required 
                  autoComplete="off"
                />
              </div>
            </div>

            <button type="submit" className="login-btn">
              GET STARTED
              <Icon icon="solar:alt-arrow-right-linear" />
            </button>
          </form>

          <div className="login-footer">
            <span>Already have an account?</span>
            <Link to="/login">Sign in</Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignupPage
