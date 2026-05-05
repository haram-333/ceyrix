import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { Icon } from '@iconify/react'
import './LoginPage.css'

const LoginPage = () => {
  const [theme, setTheme] = useState(localStorage.getItem('ceyrix-theme') || document.body.dataset.theme || 'dark')
  const [showPassword, setShowPassword] = useState(false)
  const loginRef = useRef(null)

  useEffect(() => {
    document.body.dataset.theme = theme
    
    // Entrance Animation
    const tl = gsap.timeline()
    gsap.set('.login-bg-text', { opacity: 0, scale: 0.9 })
    gsap.set('.login-card', { opacity: 0, y: 40, filter: 'blur(10px)' })
    
    tl.to('.login-bg-text', { opacity: 0.04, scale: 1, duration: 2, ease: 'expo.out' })
      .to('.login-card', { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1.2, ease: 'power4.out' }, "-=1.5")
  }, [theme])

  return (
    <div className="login-page-root">
      <div className="login-container">
        <div className="login-card" ref={loginRef}>
          <div className="login-header">
            <Link to="/" className="login-logo-link">
              <img src="/ceyrix-logo.png" alt="Ceyrix" className="login-logo-img" />
            </Link>
            <h1>Welcome back</h1>
            <p>Enter your credentials to access your dashboard</p>
          </div>

          <form className="login-form" onSubmit={(e) => e.preventDefault()}>
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input type="email" id="email" placeholder="name@company.com" required />
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

            <div className="login-options">
              <label className="remember-me">
                <input type="checkbox" />
                <span>Remember me</span>
              </label>
              <a href="#forgot" className="forgot-password">Forgot password?</a>
            </div>

            <button type="submit" className="login-btn">
              SIGN IN
              <Icon icon="solar:alt-arrow-right-linear" />
            </button>
          </form>

          <div className="login-footer">
            <span>Don't have an account?</span>
            <Link to="/signup">Sign up</Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
