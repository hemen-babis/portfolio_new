import React, { useEffect, useRef, useState, useCallback } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Linkedin, Github, Sun, Moon } from 'lucide-react'
import CommandPalette from '@/components/command/CommandPalette.jsx'
import { motion, AnimatePresence } from 'framer-motion'

const glass = 'navbar-glass shadow-[0_8px_20px_rgba(0,0,0,0.12)] dark:shadow-[0_8px_25px_rgba(0,0,0,0.5)]'
const brandBtn = ''

export default function Nav() {
  const { pathname } = useLocation()
  const isActive = (p) => (pathname === p ? 'nav-link-active' : '')
  const [open, setOpen] = useState(false)
  const [dark, setDark] = useState(false)
  const btnRef = useRef(null)
  const panelRef = useRef(null)

  // Theme: default dark (no flash handled pre-paint), persist on toggle
  useEffect(() => { setDark(document.documentElement.classList.contains('dark')) }, [])
  const applyTheme = (useDark) => {
    document.documentElement.classList.toggle('dark', useDark)
    try { localStorage.setItem('theme', useDark ? 'dark' : 'light') } catch {}
    setDark(useDark)
  }

  // Accessibility: focus trap + ESC close
  const onKeyTrap = useCallback((e) => {
    if (!open) return
    if (e.key === 'Escape') { setOpen(false); btnRef.current?.focus(); return }
    if (e.key !== 'Tab') return
    const nodes = panelRef.current?.querySelectorAll('a,button,[tabindex]:not([tabindex="-1"])')
    const focusables = nodes ? Array.from(nodes).filter(el => !el.hasAttribute('disabled')) : []
    if (focusables.length === 0) return
    const first = focusables[0], last = focusables[focusables.length - 1]
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus() }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus() }
  }, [open])
  useEffect(() => { if (open) setTimeout(() => panelRef.current?.focus(), 0) }, [open])

  // Subcomponent: premium animated hamburger (morph → X, shimmer + ripple)
  const HamburgerButton = ({ open, onClick }) => {
    const base = 'block absolute left-1/2 -translate-x-1/2 h-[2px] w-6 rounded-full transition-all duration-300 ease-[cubic-bezier(.22,.61,.36,1)]'
    const grad = { background: 'linear-gradient(90deg,#FF6EC7,#9B59B6,#FF6EC7)', backgroundSize: '200% 100%' }
    const shimmer = open
      ? { backgroundPositionX: ['0%', '200%'], transition: { duration: 1.6, ease: 'linear', repeat: Infinity } }
      : {}
    return (
      <motion.button
        ref={btnRef}
        onClick={onClick}
        aria-label={open ? 'Close menu' : 'Open menu'}
        aria-expanded={open}
        className="md:hidden ml-auto inline-flex items-center justify-center w-11 h-11 rounded-xl border bg-white/80 hover:bg-white dark:bg-white/10 dark:hover:bg-white/20 border-[#a970ff33] shadow-[0_0_12px_rgba(169,112,255,0.22)] relative overflow-hidden"
        whileTap={{ scale: 0.96 }}
        animate={open ? { rotate: 2 } : { rotate: 0 }}
      >
        {open && (
          <motion.span
            className="absolute inset-0 rounded-xl"
            initial={{ scale: 0.6, opacity: 0.18 }}
            animate={{ scale: 1.25, opacity: 0 }}
            transition={{ duration: 0.5 }}
          />
        )}
        <span className="relative block w-6 h-5">
          <motion.span className={`${base}`} style={grad} animate={shimmer} initial={false} />
          <motion.span className={`${base}`} style={grad} animate={shimmer} />
          <motion.span className={`${base}`} style={grad} animate={shimmer} />
        </span>
        <style>{`
          button[aria-expanded="false"] span > span:nth-child(1){ top:0; }
          button[aria-expanded="false"] span > span:nth-child(2){ top:50%; transform:translate(-50%,-50%); }
          button[aria-expanded="false"] span > span:nth-child(3){ bottom:0; }
          button[aria-expanded="true"]  span > span:nth-child(1){ top:50%; transform:translate(-50%,-50%) rotate(45deg); box-shadow:0 0 10px rgba(169,112,255,.45); }
          button[aria-expanded="true"]  span > span:nth-child(2){ opacity:0; transform:translate(-50%,-50%) scaleX(0); }
          button[aria-expanded="true"]  span > span:nth-child(3){ top:50%; transform:translate(-50%,-50%) rotate(-45deg); box-shadow:0 0 10px rgba(169,112,255,.45); }
        `}</style>
      </motion.button>
    )
  }

  return (
    <header className="sticky top-0 z-50">
      <div className="relative w-full">
        <nav className={`relative w-full px-3 sm:px-6 py-2 md:py-3 ${glass} flex items-center gap-5`}>
          {/* Left: logo */}
          <Link to="/" className="relative flex items-center mx-auto md:mx-0" aria-label="Home">
            <span className="absolute -left-2 -top-2 w-20 h-20 sm:w-28 sm:h-28 rounded-2xl bg-gradient-to-tr from-[#9B59B6]/30 via-[#E74C3C]/30 to-[#F1C40F]/30 blur-2xl" />
            <img src="/logo.svg" alt="HB" className="relative w-14 h-14 sm:w-20 sm:h-20 drop-shadow-[0_0_28px_rgba(255,105,180,0.45)]" />
          </Link>

          {/* Center: social (md+) */}
          <div className="pointer-events-auto absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 hidden md:flex items-center gap-3">
            {[{ Icon: Linkedin, href: 'https://www.linkedin.com/in/hemen-babis', label: 'LinkedIn' }, { Icon: Github, href: 'https://github.com/hemen-babis', label: 'GitHub' }, { Icon: null, href: 'https://leetcode.com/u/dcjvytHjKf/', label: 'LeetCode' }].map(({ Icon, href, label }, i) => (
              <motion.a
                key={i}
                whileHover={{ scale: 1.08 }}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="w-10 h-10 grid place-items-center rounded-full dark:bg-white/10 dark:border dark:border-white/20 dark:hover:bg-white/20 bg-white/80 border border-black/10 hover:bg-white text-slate-800 dark:text-white transition"
              >
                {Icon ? <Icon className="w-5 h-5" /> : <span className="text-sm font-bold">LC</span>}
              </motion.a>
            ))}
          </div>

          {/* Right: theme + nav (md+) */}
          <div className="hidden md:flex ml-auto items-center gap-4 text-lg font-bold tracking-tight">
            <div role="radiogroup" aria-label="Theme" className="inline-flex items-center rounded-full bg-white/90 dark:bg-white/10 border border-black/10 dark:border-white/20 p-1">
              <button role="radio" aria-checked={!dark} onClick={() => applyTheme(false)} aria-label="Light mode" className={`grid place-items-center w-10 h-10 rounded-full transition ${!dark ? 'bg-gradient-to-r from-[#9B59B6]/15 to-[#FF6EC7]/15 text-[#6a40c8] border border-[#a970ff33] shadow-[0_0_10px_rgba(169,112,255,0.25)]' : 'text-slate-600 hover:text-slate-900'}`}>
                <Sun className="w-5 h-5" />
              </button>
              <button role="radio" aria-checked={dark} onClick={() => applyTheme(true)} aria-label="Dark mode" className={`grid place-items-center w-10 h-10 rounded-full transition ${dark ? 'dark:bg-white/25 text-white shadow-[0_0_10px_rgba(169,112,255,0.35)]' : 'text-slate-600 hover:text-slate-900'}`}>
                <Moon className="w-5 h-5" />
              </button>
            </div>
            <div className="nav-group">
              {[{ to: '/about-me', label: 'About' }, { to: '/projects', label: 'Projects' }, { to: '/articles', label: 'Articles' }].map(({ to, label }) => (
                <Link key={to} to={to} className={`nav-link ${isActive(to)}`} aria-current={pathname === to ? 'page' : undefined}>
                  {label}
                </Link>
              ))}
            </div>
            <a href="https://www.linkedin.com/in/hemen-babis" target="_blank" rel="noreferrer" className={`btn-primary-purple px-4 py-2 rounded-lg`}>
              Hire Me
            </a>
            <Link to="/hemenly-tech" className={`btn-outline-purple px-4 py-2 rounded-lg`}>
              Hemenly Tech
            </Link>
          </div>

          {/* Mobile: animated hamburger */}
          <HamburgerButton open={open} onClick={() => setOpen((v) => !v)} />
        </nav>

        {/* Mobile overlay */}
        <AnimatePresence>
          {open && (
            <motion.div className="fixed inset-0 z-50 md:hidden" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <motion.div className="absolute inset-0 bg-black/60" onClick={() => { setOpen(false); btnRef.current?.focus() }} />
              <motion.div
                role="dialog"
                aria-modal="true"
                aria-labelledby="mobile-menu-title"
                ref={panelRef}
                tabIndex={-1}
                className="absolute inset-0 overflow-y-auto backdrop-blur-xl bg-white/90 dark:bg-[rgba(15,7,23,0.92)]"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                onKeyDown={onKeyTrap}
              >
                <div className="px-5 py-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img src="/logo.svg" alt="HB" className="w-8 h-8 drop-shadow-[0_0_16px_rgba(255,105,180,0.35)]" />
                    <span id="mobile-menu-title" className="font-extrabold text-lg title-gradient">Menu</span>
                  </div>
                  <button onClick={() => { setOpen(false); btnRef.current?.focus() }} aria-label="Close menu" className="inline-flex items-center justify-center w-11 h-11 rounded-xl border bg-white/80 hover:bg-white dark:bg-white/10 dark:hover:bg-white/20 border-[#a970ff33] shadow-[0_0_10px_rgba(169,112,255,0.22)]">
                    <span className="text-[#a970ff] text-xl leading-none">&times;</span>
                  </button>
                </div>

                <motion.div className="px-5 pb-8 flex flex-col items-center text-center text-base gap-2" initial="hidden" animate="show" variants={{ hidden: {}, show: { transition: { staggerChildren: 0.06 } } }}>
                  <div className="flex items-center justify-center gap-3 mb-3">
                    <span className="nav-link">Theme</span>
                    <div role="radiogroup" aria-label="Theme" className="inline-flex rounded-full bg-white/90 dark:bg-white/10 border border-black/10 dark:border-white/20 p-1">
                      {[{ on: () => applyTheme(false), checked: !dark, Icon: Sun, label: 'Light mode' }, { on: () => applyTheme(true), checked: dark, Icon: Moon, label: 'Dark mode' }].map(({ on, checked, Icon, label }, i) => (
                        <button key={i} role="radio" aria-checked={checked} onClick={on} aria-label={label} className={`grid place-items-center w-9 h-9 rounded-full transition ${checked ? 'bg-gradient-to-r from-[#9B59B6]/15 to-[#FF6EC7]/15 text-[#6a40c8] dark:bg-white/25 dark:text-white shadow-[0_0_10px_rgba(169,112,255,0.25)]' : 'text-slate-600 hover:text-slate-900'}`}>
                          <Icon className="w-5 h-5" />
                        </button>
                      ))}
                    </div>
                  </div>

                  {[{ to: '/about-me', label: 'About' }, { to: '/projects', label: 'Projects' }, { to: '/articles', label: 'Articles' }].map(({ to, label }, i) => (
                    <motion.div key={to} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25, delay: i * 0.04 }}>
                      <Link onClick={() => { setOpen(false); btnRef.current?.focus() }} to={to} className={`px-4 py-3 rounded-xl nav-link dark:hover:bg-white/10 hover:bg-slate-100 text-2xl font-extrabold ${isActive(to)}`}>
                        {label}
                      </Link>
                    </motion.div>
                  ))}

                  <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25, delay: 0.18 }}>
                    <a onClick={() => { setOpen(false); btnRef.current?.focus() }} href="https://www.linkedin.com/in/hemen-babis" target="_blank" rel="noreferrer" className={`btn-primary-purple mt-3 px-4 py-3 inline-flex w-max text-lg rounded-lg`}>
                      Hire Me
                    </a>
                  </motion.div>
                  <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25, delay: 0.22 }}>
                    <Link onClick={() => { setOpen(false); btnRef.current?.focus() }} to="/hemenly-tech" className={`btn-outline-purple mt-2 px-4 py-3 inline-flex w-max text-lg rounded-lg`}>
                      Hemenly Tech
                    </Link>
                  </motion.div>

                  <motion.div className="mt-5 flex items-center justify-center gap-3" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25, delay: 0.22 }}>
                    {[{ Icon: Linkedin, href: 'https://www.linkedin.com/in/hemen-babis', label: 'LinkedIn' }, { Icon: Github, href: 'https://github.com/hemen-babis', label: 'GitHub' }, { Icon: null, href: 'https://leetcode.com/u/dcjvytHjKf/', label: 'LeetCode' }].map(({ Icon, href, label }, i) => (
                      <a key={i} href={href} target="_blank" rel="noreferrer" aria-label={label} className="w-12 h-12 grid place-items-center rounded-full dark:bg-white/10 dark:border dark:border-white/20 bg-white/80 border border-black/10 hover:bg-white text-slate-800 dark:text-white transition shadow-[0_0_12px_rgba(169,112,255,0.25)]">
                        {Icon ? <Icon className="w-6 h-6" /> : <span className="text-base font-extrabold">LC</span>}
                      </a>
                    ))}
                  </motion.div>
                </motion.div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      {/* Global command palette (Cmd/Ctrl+K) */}
      <CommandPalette />
    </header>
  )
}
