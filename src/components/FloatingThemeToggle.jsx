import React from 'react'
import { Sun, Moon } from 'lucide-react'

export default function FloatingThemeToggle(){
  const [dark, setDark] = React.useState(()=> document.documentElement.classList.contains('dark'))
  const toggle = () => {
    const next = !dark
    document.documentElement.classList.toggle('dark', next)
    try{ localStorage.setItem('theme', next ? 'dark' : 'light') }catch{}
    setDark(next)
  }
  return (
    <button onClick={toggle} aria-label="Toggle theme"
      className="fixed bottom-4 right-4 z-[100] md:hidden w-12 h-12 rounded-full border border-white/20 bg-white/10 backdrop-blur grid place-items-center">
      {dark ? <Sun className="w-5 h-5"/> : <Moon className="w-5 h-5"/>}
    </button>
  )
}

