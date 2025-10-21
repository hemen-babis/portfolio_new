import React from 'react'
import { motion } from 'framer-motion'

export default function ScrollIndicator() {
  return (
    <a href="#projects" aria-label="Scroll to projects"
       className="group absolute left-1/2 -translate-x-1/2 bottom-6 z-40">
      <motion.div
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: [0, 1, 0.6, 1], y: [6, 0, 2, 0] }}
        transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
        className="w-9 h-9 rounded-full grid place-items-center border border-white/30 bg-white/10 backdrop-blur hover:bg-white/20"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white/90">
          <path d="M6 9l6 6 6-6" />
        </svg>
      </motion.div>
    </a>
  )
}

