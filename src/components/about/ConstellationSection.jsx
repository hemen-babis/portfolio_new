import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const THEMES = [
  { key:'curiosity', label:'Curiosity', story:`As a kid, I filled notebooks with questions and little sketches. That same curiosity guides every system I build.` },
  { key:'aiml', label:'AI/ML', story:`From LLM agents to evaluation pipelines, I love bridging models with pragmatic product thinking.` },
  { key:'math', label:'Math', story:`Proofs and patterns sharpen how I reason about complex systems — from optimization to discrete structures.` },
  { key:'bio', label:'Bioinformatics', story:`I enjoy translating biological signals into data — DNA, proteins, microscopy — and building tools to reason about them.` },
  { key:'design', label:'Design', story:`I believe the best tools are felt as much as they are used — clarity, color, motion, and care.` },
]

function Star({ x, y, onClick }){
  return (
    <motion.button
      onClick={onClick}
      className="absolute rounded-full"
      style={{ left:`${x}%`, top:`${y}%` }}
      whileHover={{ scale: 1.25 }}
      initial={false}
    >
      <span className="block w-2.5 h-2.5 rounded-full bg-white dark:bg-white shadow-[0_0_10px_rgba(255,255,255,0.8)]" />
    </motion.button>
  )
}

export default function ConstellationSection(){
  const [open, setOpen] = React.useState(null)
  const stars = React.useMemo(() => ([
    { x: 22, y: 38, theme: 'curiosity' },
    { x: 46, y: 24, theme: 'aiml' },
    { x: 68, y: 42, theme: 'math' },
    { x: 35, y: 62, theme: 'bio' },
    { x: 58, y: 70, theme: 'design' },
  ]), [])
  const edges = React.useMemo(() => ([ [0,1],[1,2],[2,4],[4,3],[3,0] ]), [])
  const active = THEMES.find(t => t.key === open)

  return (
    <section className="relative py-24">
      <div className="mx-auto w-full px-4 sm:px-6 max-w-6xl">
        <h2 className="font-hand text-3xl sm:text-4xl md:text-5xl title-gradient mb-6">Constellation Map</h2>
        <div className="relative overflow-hidden rounded-2xl h-[460px] sm:h-[520px] glass-card">
          <div className="absolute inset-0 bg-[radial-gradient(120%_100%_at_50%_20%,rgba(155,89,182,0.18),transparent_55%)]" />
          <svg className="absolute inset-0 w-full h-full">
            {edges.map(([a,b],i) => (
              <motion.line
                key={i}
                x1={`${stars[a].x}%`} y1={`${stars[a].y}%`}
                x2={`${stars[b].x}%`} y2={`${stars[b].y}%`}
                stroke="url(#starglow)" strokeWidth="1.5" strokeLinecap="round"
                initial={{ pathLength: 0, opacity:0 }}
                whileInView={{ pathLength: 1, opacity:1 }}
                viewport={{ once:true }}
                transition={{ duration: 1.2, delay: i*0.15 }}
              />
            ))}
            <defs>
              <linearGradient id="starglow" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#FF6EC7" />
                <stop offset="100%" stopColor="#9B59B6" />
              </linearGradient>
            </defs>
          </svg>
          {stars.map((s, idx) => (
            <Star key={idx} x={s.x} y={s.y} onClick={()=> setOpen(s.theme)} />
          ))}
          <AnimatePresence>
            {active && (
              <motion.div
                initial={{ opacity:0, scale:0.92, y: 16 }}
                animate={{ opacity:1, scale:1, y: 0 }}
                exit={{ opacity:0, scale:0.96, y: 8 }}
                transition={{ duration:0.25 }}
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 glass-card p-6 w-[min(90%,560px)]"
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-2xl font-extrabold title-gradient">{active.label}</h3>
                  <button onClick={()=> setOpen(null)} className="px-3 py-1 rounded-md bg-white/10 hover:bg-white/20 border border-white/20">Close</button>
                </div>
                <p className="text-foreground leading-relaxed">{active.story}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}

