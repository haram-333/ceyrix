import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import ServicesPage from './ServicesPage.jsx'
import ProcessPage from './ProcessPage.jsx'
import ProjectPage from './ProjectPage.jsx'
import ContactPage from './ContactPage.jsx'
import LoginPage from './LoginPage.jsx'
import SignupPage from './SignupPage.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/process" element={<ProcessPage />} />
        <Route path="/projects" element={<ProjectPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
