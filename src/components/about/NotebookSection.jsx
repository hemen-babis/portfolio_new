import React from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

// A lightweight, self-contained notebook section with lined-paper background
export default function NotebookSection() {
  const ref = React.useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] })

  // Map scroll progress to opacity/position for lines
  const q1Y = useTransform(scrollYProgress, [0, 0.5], [0, -40])
  const q2Y = useTransform(scrollYProgress, [0.1, 0.6], [0, -40])
  const q3Y = useTransform(scrollYProgress, [0.2, 0.7], [0, -40])
  const qAlpha = useTransform(scrollYProgress, [0, 0.35, 0.45], [1, 1, 0])

  // Emerging themes as questions fade
  const tAlpha = useTransform(scrollYProgress, [0.35, 0.55], [0, 1])
  const tY = useTransform(scrollYProgress, [0.35, 0.55], [20, 0])

  return (
    <section ref={ref} className="relative py-24">
      <div className="mx-auto w-full px-4 sm:px-6 max-w-5xl">
        <div className="relative overflow-hidden rounded-2xl p-8 notebook-bg">
          {/* Notebook header */}
          <h2 className="font-hand text-3xl sm:text-4xl md:text-5xl title-gradient mb-6">Notebook of Curiosity</h2>

          {/* Handwritten questions */}
          <div className="relative h-[240px] sm:h-[300px]">
            <motion.p style={{ y: q1Y, opacity: qAlpha }} className="font-hand text-2xl sm:text-3xl text-foreground/90">
              "Why does the computer hum?"
            </motion.p>
            <motion.p style={{ y: q2Y, opacity: qAlpha }} className="font-hand text-2xl sm:text-3xl text-foreground/90 mt-3">
              "What’s inside a lightbulb?"
            </motion.p>
            <motion.p style={{ y: q3Y, opacity: qAlpha }} className="font-hand text-2xl sm:text-3xl text-foreground/90 mt-3">
              "Can I build something like this one day?"
            </motion.p>
          </div>

          {/* Themes that replace the questions as you scroll */}
          <motion.div style={{ opacity: tAlpha, y: tY }} className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4">
            {["AI/ML","CS + Math","Bioinformatics","Creative Design"].map((t) => (
              <div key={t} className="glass-card px-4 py-3 text-center font-extrabold title-gradient">
                {t}
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

