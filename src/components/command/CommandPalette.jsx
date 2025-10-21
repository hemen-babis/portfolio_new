import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'

const CMDS = [
  { label: 'Home', action: (nav)=>nav('/') },
  { label: 'Projects', action: (nav)=>nav('/projects') },
  { label: 'Client Work', action: (nav)=>nav('/work') },
  { label: 'Hire Me (Hemenly Tech)', action: (nav)=>nav('/hemenly-tech') },
  { label: 'About', action: (nav)=>nav('/about') },
  { label: 'Toggle Theme', action: ()=>{ const d = !document.documentElement.classList.contains('dark'); document.documentElement.classList.toggle('dark', d); try{localStorage.setItem('theme', d?'dark':'light')}catch{} }},
  { label: 'Resume', action: ()=> window.open('/Hemen_Babis_Resume.pdf', '_blank') },
  { label: 'GitHub', action: ()=> window.open('https://github.com/hemen-babis','_blank') },
  { label: 'LinkedIn', action: ()=> window.open('https://www.linkedin.com/in/hemen-babis','_blank') },
]

export default function CommandPalette() {
  const nav = useNavigate()
  const [open, setOpen] = React.useState(false)
  const [query, setQuery] = React.useState('')
  const inputRef = React.useRef(null)

  React.useEffect(() => {
    const onKey = (e) => {
      const isMetaK = (e.key === 'k' || e.key === 'K') && (e.metaKey || e.ctrlKey)
      if (isMetaK) { e.preventDefault(); setOpen(true) }
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  React.useEffect(()=>{ if(open) setTimeout(()=>inputRef.current?.focus(), 10) },[open])

  const list = CMDS.filter(c => c.label.toLowerCase().includes(query.toLowerCase()))

  const run = (cmd) => {
    setOpen(false)
    setTimeout(()=>cmd.action(nav), 30)
  }

  return (
    <>
      <button aria-label="Open command palette" onClick={()=>setOpen(true)} className="hidden" />
      <AnimatePresence>
        {open && (
          <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="fixed inset-0 z-[1000] bg-white/60 dark:bg-black/50 backdrop-blur-sm">
            <motion.div initial={{scale:0.98, y:8, opacity:0}} animate={{scale:1, y:0, opacity:1}} exit={{scale:0.98, y:8, opacity:0}} transition={{duration:0.15}}
              className="glass-card w-full max-w-xl mx-auto mt-28 p-3">
              <input ref={inputRef} value={query} onChange={(e)=>setQuery(e.target.value)} placeholder="Type a command or page..."
                className="w-full px-3 py-2 rounded-md outline-none bg-transparent" />
              <div className="mt-2 max-h-64 overflow-y-auto">
                {list.map((c,i)=> (
                  <button key={c.label} onClick={()=>run(c)} className="w-full text-left px-3 py-2 rounded-md hover:bg-white/10">
                    {c.label}
                  </button>
                ))}
                {list.length===0 && <div className="px-3 py-2 text-sm opacity-70">No matches</div>}
              </div>
              <div className="mt-2 text-xs opacity-70">Press Esc to close · ⌘K / Ctrl+K to open</div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
