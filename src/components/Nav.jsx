import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, Sun, Moon, Linkedin, Github } from 'lucide-react'
import { motion } from 'framer-motion'

// Deep purple navbar — semi-transparent with blur
const glass = "navbar-glass shadow-[0_8px_25px_rgba(0,0,0,0.5)]"

export default function Nav() {
  const { pathname } = useLocation()
  const isActive = (p) => (pathname === p ? 'nav-link-active' : '')
  const [open, setOpen] = useState(false)
  const [dark, setDark] = useState(false)
  useEffect(() => {
    const saved = localStorage.getItem('theme')
    const prefers = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
    const useDark = saved ? saved === 'dark' : prefers
    setDark(useDark)
    document.documentElement.classList.toggle('dark', useDark)
  }, [])
  const applyTheme = (useDark) => {
    setDark(useDark)
    document.documentElement.classList.toggle('dark', useDark)
    localStorage.setItem('theme', useDark ? 'dark' : 'light')
  }
  const toggleTheme = () => applyTheme(!dark)
  return (
    <header className="sticky top-0 z-50">
      <div className="relative w-full">
        <nav className={`relative w-full px-4 sm:px-8 py-3 ${glass} flex items-center gap-6`}> 
          {/* Left: Neon-glow logo only (no name in logo) */}
          <Link to="/" className="relative flex items-center" aria-label="Home">
            <span className="absolute -left-3 -top-3 w-28 h-28 sm:w-36 sm:h-36 rounded-2xl bg-gradient-to-tr from-[#9B59B6]/30 via-[#E74C3C]/30 to-[#F1C40F]/30 blur-2xl" />
            <img src="/logo.svg" alt="HB" className="relative w-20 h-20 sm:w-24 sm:h-24 drop-shadow-[0_0_36px_rgba(255,105,180,0.45)]" />
          </Link>

          {/* Center: profile icons (absolute centered) */}
          <div className="pointer-events-auto absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 hidden md:flex items-center gap-3">
            <motion.a whileHover={{ scale:1.08 }} href="https://www.linkedin.com/in/hemen-babis" target="_blank" rel="noreferrer" className="w-10 h-10 grid place-items-center rounded-full bg-white/10 border border-white/20 hover:bg-white/20 transition">
              <Linkedin className="w-5 h-5"/>
            </motion.a>
            <motion.a whileHover={{ scale:1.08 }} href="https://github.com/hemen-babis" target="_blank" rel="noreferrer" className="w-10 h-10 grid place-items-center rounded-full bg-white/10 border border-white/20 hover:bg-white/20 transition">
              <Github className="w-5 h-5"/>
            </motion.a>
            <motion.a whileHover={{ scale:1.08 }} href="https://leetcode.com/u/dcjvytHjKf/" target="_blank" rel="noreferrer" className="w-10 h-10 grid place-items-center rounded-full bg-white/10 border border-white/20 hover:bg-white/20 transition">
              <span className="text-sm font-bold">LC</span>
            </motion.a>
          </div>

          {/* Right: Theme toggle + Nav links */}
          <div className="hidden md:flex ml-auto items-center gap-4 text-lg font-bold tracking-tight">
            {/* Accessible Light / Dark segmented control */}
            <div
              role="radiogroup"
              aria-label="Theme"
              className="inline-flex items-center rounded-lg bg-white/10 border border-white/20 p-1"
            >
              <button
                role="radio"
                aria-checked={!dark}
                onClick={() => applyTheme(false)}
                className={`flex items-center gap-2 px-3 py-2 rounded-md transition text-sm ${!dark ? 'bg-white/25 text-white' : 'opacity-80 hover:opacity-100'}`}
                title="Light mode"
              >
                <Sun className="w-4 h-4" />
                <span>Light</span>
              </button>
              <button
                role="radio"
                aria-checked={dark}
                onClick={() => applyTheme(true)}
                className={`flex items-center gap-2 px-3 py-2 rounded-md transition text-sm ${dark ? 'bg-white/25 text-white' : 'opacity-80 hover:opacity-100'}`}
                title="Dark mode"
              >
                <Moon className="w-4 h-4" />
                <span>Dark</span>
              </button>
            </div>
            {[{to:'/about-me',label:'About'},{to:'/experience',label:'Experience'},{to:'/projects',label:'Projects'},{to:'/contact',label:'Contact'}].map(({to,label}) => (
              <Link key={to} to={to} className={`nav-link ${isActive(to)}`}>{label}</Link>
            ))}
          </div>

          {/* Mobile: Hamburger */}
          <button className="md:hidden ml-auto inline-flex items-center justify-center w-10 h-10 rounded-lg bg-white/10 border border-white/20" onClick={()=>setOpen(v=>!v)} aria-label="Toggle menu">
            {open ? <X className="w-5 h-5"/> : <Menu className="w-5 h-5"/>}
          </button>
        </nav>

        {/* Mobile menu */}
        {open && (
          <div className={`md:hidden px-4 sm:px-8 py-3 ${glass}`}>
            <div className="flex flex-col text-sm">
              <div className="flex items-center gap-3 mb-3">
                <span className="nav-link">Theme</span>
                <div role="radiogroup" aria-label="Theme" className="inline-flex rounded-lg bg-white/10 border border-white/20 p-1">
                  <button
                    role="radio"
                    aria-checked={!dark}
                    onClick={() => applyTheme(false)}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-md transition text-sm ${!dark ? 'bg-white/25 text-white' : 'opacity-80 hover:opacity-100'}`}
                    title="Light mode"
                  >
                    <Sun className="w-4 h-4" />
                    <span>Light</span>
                  </button>
                  <button
                    role="radio"
                    aria-checked={dark}
                    onClick={() => applyTheme(true)}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-md transition text-sm ${dark ? 'bg-white/25 text-white' : 'opacity-80 hover:opacity-100'}`}
                    title="Dark mode"
                  >
                    <Moon className="w-4 h-4" />
                    <span>Dark</span>
                  </button>
                </div>
              </div>
              <Link onClick={()=>setOpen(false)} to="/about-me" className={`px-3 py-2 rounded-lg nav-link hover:bg-white/10 ${isActive('/about-me')}`}>About</Link>
              <Link onClick={()=>setOpen(false)} to="/experience" className={`px-3 py-2 rounded-lg nav-link hover:bg-white/10 ${isActive('/experience')}`}>Experience</Link>
              <Link onClick={()=>setOpen(false)} to="/projects" className={`px-3 py-2 rounded-lg nav-link hover:bg-white/10 ${isActive('/projects')}`}>Projects</Link>
              <Link onClick={()=>setOpen(false)} to="/contact" className={`px-3 py-2 rounded-lg nav-link hover:bg-white/10 ${isActive('/contact')}`}>Contact</Link>
              
              <div className="mt-2 flex items-center gap-2">
                <a href="https://www.linkedin.com/in/hemen-babis" target="_blank" rel="noreferrer" className="nav-link px-3 py-2 rounded-lg hover:bg-white/10">LinkedIn</a>
                <a href="https://github.com/" target="_blank" rel="noreferrer" className="nav-link px-3 py-2 rounded-lg hover:bg-white/10">GitHub</a>
                <a href="https://leetcode.com/" target="_blank" rel="noreferrer" className="nav-link px-3 py-2 rounded-lg hover:bg-white/10">LeetCode</a>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
