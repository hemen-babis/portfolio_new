import React from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Code2, Boxes, Wrench, Sparkles } from 'lucide-react'
import { skills } from '@/content/profile'

const glass = "glass-card"
const neonText = "bg-clip-text text-transparent bg-gradient-to-r from-[#9B59B6] via-[#E74C3C] to-[#F1C40F]"

function ChipCloud({ items }) {
  const palettes = [
    'from-pink-500/15 to-fuchsia-500/15 border-pink-500/20',
    'from-amber-500/15 to-orange-500/15 border-amber-500/20',
    'from-violet-500/15 to-indigo-500/15 border-violet-500/20',
    'from-emerald-500/15 to-teal-500/15 border-emerald-500/20',
  ]
  return (
    <div className="flex flex-wrap gap-3">
      {items.map((t) => (
        <span key={t} className="inline-flex items-center px-4 py-2.5 text-base font-semibold tag-neon hover:-translate-y-0.5 transition">{t}</span>
      ))}
    </div>
  )
}

function SkillCard({ title, icon: Icon, desc, items }) {
  return (
    <Card className={`${glass} h-full p-2`}> 
      <CardHeader className="pb-4">
        <div className="flex items-center gap-4">
          <div className="p-3 rounded-xl bg-white/10">
            <Icon className="w-6 h-6 neon-icon" />
          </div>
          <CardTitle className="text-lg font-semibold heading">{title}</CardTitle>
        </div>
        {desc && <CardDescription className="text-[#e0e0e0] text-base">{desc}</CardDescription>}
      </CardHeader>
      <CardContent className="pb-6">
        <ChipCloud items={items} />
      </CardContent>
    </Card>
  )
}

export default function Skills() {

  return (
    <section id="skills" className="relative py-20">
      <div className="mx-auto w-full px-4 sm:px-6">
        <h2 className={`text-2xl sm:text-3xl md:text-4xl font-bold heading mb-4`}>Skills</h2>
        <p className="text-sm sm:text-base text-foreground mb-6">Languages, frameworks, tools, and domains I work with.</p>

        {/* Highlight chip cloud removed to avoid duplicates */}

        {/* Category grid with animated cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {title:'Languages', icon:Code2, desc:'Core languages and query dialects', items:skills.languages},
            {title:'Frameworks & Libraries', icon:Boxes, desc:'Web, AI/ML, and backend ecosystems', items:skills.frameworks},
            {title:'Tools & Platforms', icon:Wrench, desc:'Dev tooling, hosting, and design', items:skills.tools},
            {title:'Domains & Subjects', icon:Sparkles, desc:'Where I focus and explore deeply', items:skills.subjects},
          ].map((c, idx)=> (
            <motion.div key={c.title} initial={{opacity:0, y:18}} whileInView={{opacity:1, y:0}} viewport={{once:true}} transition={{duration:0.45, delay: idx*0.06}}>
              <SkillCard title={c.title} icon={c.icon} desc={c.desc} items={c.items} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
