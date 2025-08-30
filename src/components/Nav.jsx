import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, Sun, Moon } from 'lucide-react'

// Deep purple navbar — semi-transparent with blur
const glass = "navbar-glass shadow-[0_8px_25px_rgba(0,0,0,0.5)]"

export default function Nav() {
  const { pathname } = useLocation()
  const isActive = (p) => (pathname === p ? 'text-[#a970ff]' : '')
  const [open, setOpen] = useState(false)
  const [dark, setDark] = useState(false)
  useEffect(() => {
    const saved = localStorage.getItem('theme')
    const prefers = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
    const useDark = saved ? saved === 'dark' : prefers
    setDark(useDark)
    document.documentElement.classList.toggle('dark', useDark)
  }, [])
  const toggleTheme = () => {
    setDark((v) => {
      const next = !v
      document.documentElement.classList.toggle('dark', next)
      localStorage.setItem('theme', next ? 'dark' : 'light')
      return next
    })
  }
  return (
    <header className="sticky top-0 z-50">
      <div className="relative w-full">
        <nav className={`relative w-full px-4 sm:px-8 py-3 ${glass} flex items-center gap-6`}> 
          {/* Left: Neon-glow logo only (no name in logo) */}
          <Link to="/" className="relative flex items-center" aria-label="Home">
            <span className="absolute -left-2 -top-2 w-14 h-14 rounded-xl bg-gradient-to-tr from-[#9B59B6]/30 via-[#E74C3C]/30 to-[#F1C40F]/30 blur-lg" />
            <img src="/logo.svg" alt="HB" className="relative w-10 h-10 drop-shadow-[0_0_20px_rgba(255,105,180,0.45)]" />
          </Link>

          {/* Right: Theme toggle + Nav links */}
          <div className="hidden md:flex ml-auto items-center gap-4 text-lg font-bold tracking-tight text-[#e0d9ff]">
            <button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-white/10 border border-white/20 hover:bg-white/20 transition"
            >
              {dark ? <Sun className="w-5 h-5"/> : <Moon className="w-5 h-5"/>}
            </button>
            {[{to:'/experience',label:'Experience'},{to:'/projects',label:'Projects'},{to:'/contact',label:'Contact'}].map(({to,label}) => (
              <Link key={to} to={to} className={`transition-colors hover:text-[#a970ff] ${isActive(to)}`}>{label}</Link>
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
              <button onClick={()=>{ toggleTheme(); setOpen(false) }} className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/10 border border-white/20 mb-2">
                {dark ? <Sun className="w-4 h-4"/> : <Moon className="w-4 h-4"/>} Theme
              </button>
              <Link onClick={()=>setOpen(false)} to="/experience" className={`px-3 py-2 rounded-lg text-[#e0d9ff] hover:text-[#a970ff] hover:bg-white/10 ${isActive('/experience')}`}>Experience</Link>
              <Link onClick={()=>setOpen(false)} to="/projects" className={`px-3 py-2 rounded-lg text-[#e0d9ff] hover:text-[#a970ff] hover:bg-white/10 ${isActive('/projects')}`}>Projects</Link>
              <Link onClick={()=>setOpen(false)} to="/contact" className={`px-3 py-2 rounded-lg text-[#e0d9ff] hover:text-[#a970ff] hover:bg-white/10 ${isActive('/contact')}`}>Contact</Link>
              
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
