import React from 'react'
import { motion } from 'framer-motion'

const ITEMS = [
  {
    name: 'Client',
    role: 'Founder, Local Services',
    quote: 'Hemen delivered fast, communicated clearly, and exceeded expectations. The site feels premium and performs well.',
  },
  {
    name: 'Client',
    role: 'Product Lead, EdTech',
    quote: 'Strong engineering instincts with a great eye for design. She turned rough ideas into a polished, accessible experience.',
  },
  {
    name: 'Client',
    role: 'Engineer, Open Source',
    quote: 'Hemen is thoughtful and detail‑oriented. Her small touches and micro‑interactions really elevated the project for users.',
  },
]

export default function Testimonials() {
  return (
    <section id="testimonials" className="relative py-20">
      <div className="mx-auto w-full px-4 sm:px-6 max-w-6xl">
        <h2 className="title-gradient text-3xl font-extrabold mb-6">Testimonials</h2>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={{ visible: { transition: { staggerChildren: 0.12 } } }}
          className="grid grid-cols-1 md:grid-cols-3 gap-5"
        >
          {ITEMS.map((t, i) => (
            <motion.article
              key={t.name}
              variants={{ hidden: { opacity: 0, y: 18 }, visible: { opacity: 1, y: 0 } }}
              className="glass-card p-5 rounded-2xl"
              style={{ transform: `rotate(${i===1?0.2: i===2?-0.2:0.3}deg)` }}
            >
              <div className="text-base text-foreground/90">“{t.quote}”</div>
              <div className="mt-3 text-sm opacity-80">{t.name} - {t.role}</div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
