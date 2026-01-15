import React from 'react'
import { motion } from 'framer-motion'

export default function AboutText() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <div>
        <h1 className="font-hand text-4xl sm:text-5xl title-gradient mb-3">About Me</h1>
        <div className="mb-4">
          <img src="/hemu.jpg" alt="Hemen Babis portrait" className="w-full max-w-xs md:max-w-sm h-auto rounded-2xl object-cover dark:hidden" loading="lazy" decoding="async" />
          <img src="/hemu-dark.jpg" alt="Hemen Babis portrait" className="w-full max-w-xs md:max-w-sm h-auto rounded-2xl object-cover hidden dark:block" loading="lazy" decoding="async" />
        </div>
        <p className="text-foreground leading-relaxed">
          Hi, I’m Hemen Babis — born and raised in Ethiopia, now a Computer Science + Math student at PSU Honors College focusing on AI/ML, bioinformatics, and creative coding.
        </p>
      </div>

      <p className="text-foreground leading-relaxed">
        I started with a notebook full of questions ("Why does the computer hum?") and today I ask things like "How can AI make lab work easier?" or "What if math could dance on a webpage?"
      </p>

      <div>
        <h2 className="text-2xl font-extrabold title-gradient mb-2">What Drives Me</h2>
        <p className="text-foreground leading-relaxed">
          I build systems that anticipate needs, not just compute answers. My work spans AI project managers, quantum-inspired algorithms, and web design that is both functional and aesthetic.
        </p>
      </div>

      <div>
        <h2 className="text-2xl font-extrabold title-gradient mb-2">What I’m Looking For</h2>
        <p className="text-foreground leading-relaxed">
          Opportunities in AI/ML engineering, GenAI, or software engineering where I can combine rigor (math, optimization) with creativity (design, teaching, community).
        </p>
      </div>
    </motion.div>
  )
}
