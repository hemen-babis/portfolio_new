import React from 'react'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import { motion } from 'framer-motion'
import { experience as xp, achievements, volunteering, memberships } from '@/content/profile'
import { usePageMeta } from '@/lib/usePageMeta'
import { GraduationCap, Briefcase, Heart, Award } from 'lucide-react'

export default function ExperiencePage() {
  usePageMeta({ title: 'Experience — Hemen Babis', description: 'Professional experience, achievements, volunteering and memberships.' })
  return (
    <>
      <Nav />
      <main className="relative py-20">
        <div className="mx-auto w-full px-4 sm:px-6 max-w-5xl">
          <h1 className="font-hand text-4xl sm:text-5xl md:text-6xl title-gradient mb-10">Experience</h1>

          {/* Timeline */}
          <div className="relative pl-10 sm:pl-12">
            <div className="absolute left-4 sm:left-6 top-0 bottom-0 w-[3px] rounded-full" style={{ background:'linear-gradient(#a970ff, rgba(169,112,255,0))' }} />
            {xp.map((e, i) => (
              <div key={e.role+i} className="relative mb-10 last:mb-0">
                <div className="absolute left-3.5 sm:left-5 top-2 w-3.5 h-3.5 rounded-full" style={{ background:'#a970ff', boxShadow:'0 0 18px rgba(169,112,255,0.6)' }} />
                <motion.div
                  initial={{opacity:0, x:-16}}
                  whileInView={{opacity:1, x:0}}
                  viewport={{once:true}}
                  transition={{duration:0.45, delay:i*0.05}}
                  className='glass-card p-6'
                >
                  <h3 className="text-2xl font-extrabold title-gradient mb-1">{e.role} · {e.company}</h3>
                  <div className="text-sm text-foreground opacity-80">{e.period}</div>
                  <ul className="mt-3 list-disc ml-6 text-foreground space-y-1.5">
                    {e.bullets.map((b, j) => <li key={j}>{b}</li>)}
                  </ul>
                </motion.div>
              </div>
            ))}
          </div>

          {/* Achievements, Volunteering, Memberships */}
          <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-6">
            <motion.div initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:0.5}} className="glass-card p-6">
              <div className="flex items-center gap-3 mb-3"><Award className="w-6 h-6 neon-icon"/><h2 className="text-xl font-extrabold title-gradient">Achievements</h2></div>
              <ul className="list-disc ml-6 text-foreground space-y-1.5">
                {achievements.map((a)=> <li key={a}>{a}</li>)}
              </ul>
            </motion.div>
            <motion.div initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:0.5, delay:0.05}} className="glass-card p-6">
              <div className="flex items-center gap-3 mb-3"><Heart className="w-6 h-6 neon-icon"/><h2 className="text-xl font-extrabold title-gradient">Volunteering</h2></div>
              <ul className="list-disc ml-6 text-foreground space-y-1.5">
                {volunteering.map((v)=> <li key={v}>{v}</li>)}
              </ul>
            </motion.div>
            <motion.div initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:0.5, delay:0.1}} className="glass-card p-6">
              <div className="flex items-center gap-3 mb-3"><Briefcase className="w-6 h-6 neon-icon"/><h2 className="text-xl font-extrabold title-gradient">Memberships</h2></div>
              <ul className="list-disc ml-6 text-foreground space-y-1.5">
                {memberships.map((m)=> <li key={m}>{m}</li>)}
              </ul>
            </motion.div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
