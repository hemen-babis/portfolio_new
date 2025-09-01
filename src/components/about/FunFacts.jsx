import React from 'react'
import { motion } from 'framer-motion'

const FACTS = [
  '🧬 Double Major Life: CS + Math → I basically like pain and proofs.',
  '🎨 Tech + Design: I make things functional AND aesthetic.',
  '✈️ Global Perspective: Growing up in Ethiopia taught me to see tech as something that should serve people.',
  '🎤 Storyteller: I love making complex things simple — from theology for kids to ML pipelines for interns.',
  '🏋️ Fun Fact: I almost became a weightlifter before realizing algorithms were lighter (most days).',
]

export default function FunFacts() {
  return (
    <motion.aside
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, delay: 0.05 }}
      className="glass-card rounded-2xl p-6"
    >
      <h2 className="text-2xl font-extrabold title-gradient mb-3">🌍 Fun Facts</h2>
      <ul className="space-y-2 text-foreground">
        {FACTS.map((f) => (
          <li key={f} className="leading-relaxed">{f}</li>
        ))}
      </ul>
    </motion.aside>
  )
}

