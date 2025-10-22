import React, { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

export default function FunFactsTicker({ facts = [], interval = 2200 }){
  const [i, setI] = useState(0)
  useEffect(()=>{
    if(!facts.length) return
    const t = setInterval(()=> setI(v => (v+1) % facts.length), interval)
    return ()=> clearInterval(t)
  }, [facts, interval])
  const fact = facts[i] || ''
  return (
    <div className="mt-3 inline-flex items-center gap-2 px-3 py-2 rounded-xl glass-card">
      <span className="w-2 h-2 rounded-full bg-[#FF6EC7] shadow-[0_0_8px_rgba(255,110,199,0.7)]" />
      <div className="relative min-h-[1.5rem]">
        <AnimatePresence mode="wait">
          <motion.span key={i}
            initial={{ opacity: 0, y: 8, scale: .98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: .98 }}
            transition={{ duration: 0.25 }}
            className="text-sm font-semibold">
            {fact}
          </motion.span>
        </AnimatePresence>
      </div>
    </div>
  )
}

