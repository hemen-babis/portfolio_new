// removed duplicate React import
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import { projects as projData } from '@/content/profile'
import { Github, ExternalLink, FileText } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import React from 'react'

const CATS = ['All','Web Development','Visual Content','AI/ML','School Projects','Other/Creative']
const CAT_COLORS = {
  'Web Development': { ring:'ring-[#00B2FF]/30', grad:'from-[#00B2FF]/20 to-[#6EE7FF]/20' },
  'Visual Content': { ring:'ring-[#FF7A7A]/30', grad:'from-[#FF7A7A]/20 to-[#FFC1A6]/20' },
  'AI/ML': { ring:'ring-[#A970FF]/30', grad:'from-[#FF6EC7]/20 to-[#9B59B6]/20' },
  'School Projects': { ring:'ring-[#34D399]/30', grad:'from-[#34D399]/20 to-[#6EE7B7]/20' },
  'Other/Creative': { ring:'ring-[#F59E0B]/30', grad:'from-[#F59E0B]/20 to-[#FCD34D]/20' },
}

export default function ProjectsPage() {
  const [cat, setCat] = React.useState('All')
  const [query, setQuery] = React.useState('')
  const [open, setOpen] = React.useState(null) // case study modal

  const data = React.useMemo(() => {
    const pool = projData
    const filtered = pool.filter(p => (cat==='All' || (p.category||'Other/Creative')===cat))
                         .filter(p => {
                           const q = query.trim().toLowerCase()
                           if (!q) return true
                           return (
                             p.title.toLowerCase().includes(q) ||
                             (p.summary||'').toLowerCase().includes(q) ||
                             (p.tagline||'').toLowerCase().includes(q) ||
                             (p.tech||[]).some(t=>t.toLowerCase().includes(q))
                           )
                         })
    return filtered
  }, [cat, query])

  // Pick a featured project (first AI/ML if available)
  const featured = React.useMemo(() => (projData.find(p=>p.category==='AI/ML') || projData[0]), [])

  return (
    <>
      <Nav />
      <main className="relative py-16">
        <div className="mx-auto w-full px-4 sm:px-6 max-w-6xl">
          <h1 className="font-hand text-4xl sm:text-5xl md:text-6xl title-gradient mb-6">Projects</h1>

          {/* Featured banner */}
          {featured && (
            <motion.div initial={{opacity:0, y:14}} whileInView={{opacity:1, y:0}} viewport={{once:true}} transition={{duration:0.45}}
              className="relative overflow-hidden glass-card p-6 mb-8 flex flex-col md:flex-row gap-6 items-center">
              <div className="w-full md:w-1/2">
                <div className={`aspect-[16/9] w-full rounded-xl bg-gradient-to-br ${CAT_COLORS[featured.category||'Other/Creative']?.grad||'from-pink-400/30 to-violet-500/30'} border border-white/20 flex items-center justify-center text-white/90`}>
                  <span className="text-xl">{featured.image ? 'Preview' : 'Featured'}</span>
                </div>
              </div>
              <div className="w-full md:w-1/2">
                <h2 className="text-3xl font-extrabold title-gradient">{featured.title}</h2>
                <p className="text-foreground mt-1">{featured.tagline || featured.summary}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {(featured.tech||[]).map(t => <span key={t} className="tag-neon px-3 py-1.5 text-sm font-semibold">{t}</span>)}
                </div>
                <div className="mt-4 flex gap-3">
                  {featured.demo?.href && (
                    <a href={featured.demo.href} target="_blank" rel="noreferrer">
                      <Button className="btn-primary-purple inline-flex items-center gap-2">🚀 Launch Project</Button>
                    </a>
                  )}
                  {featured.links && featured.links[0]?.href && (
                    <a href={featured.links[0].href} target="_blank" rel="noreferrer">
                      <Button className="btn-outline-purple inline-flex items-center gap-2"><FileText className="w-4 h-4"/> Case Study</Button>
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          )}

          {/* Tabs + search */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
            <div className="relative inline-flex items-center gap-4 flex-wrap">
              {CATS.map(c => (
                <button key={c} onClick={()=>setCat(c)} className={`relative px-3 py-1.5 font-semibold transition ${c===cat? 'text-[#E0AA3E]':'nav-link'}`}>
                  {c}
                  {c===cat && (
                    <motion.span layoutId="tab-underline" className="absolute left-0 -bottom-0.5 h-[3px] w-full rounded bg-gradient-to-r from-[#FF6EC7] to-[#9B59B6]" />
                  )}
                </button>
              ))}
            </div>
            <div>
              <input
                value={query}
                onChange={(e)=>setQuery(e.target.value)}
                placeholder="Search projects (title, tech)"
                className="glass-card px-4 py-2 rounded-xl outline-none"
              />
            </div>
          </div>

          {/* Grid */}
          <AnimatePresence mode="popLayout">
            <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {data.map((p, i) => (
                <motion.article
                  key={p.title+i}
                  layout
                  initial={{opacity:0, y:18, scale:0.98}}
                  animate={{opacity:1, y:0, scale:1}}
                  exit={{opacity:0, y:12, scale:0.98}}
                  transition={{duration:0.35, delay:i*0.03}}
                  className={`group glass-card p-4 flex flex-col hover:-translate-y-1.5 hover:shadow-[0_0_32px_rgba(169,112,255,0.35)] ${CAT_COLORS[p.category||'Other/Creative']?.ring||''}`}
                >
                  <div className="relative mb-3 rounded-lg overflow-hidden border border-white/15">
                    <div className={`aspect-[16/10] w-full bg-gradient-to-br ${CAT_COLORS[p.category||'Other/Creative']?.grad||'from-pink-400/20 to-violet-500/20'} grid place-items-center text-white/90 group-hover:rotate-[0.5deg] transition`}>
                      <span className="opacity-80">{p.image ? 'Preview' : p.category || 'Project'}</span>
                    </div>
                    <span className="absolute inset-0 rounded-lg pointer-events-none border-2 border-transparent group-hover:border-pink-400/40 transition" />
                  </div>
                  <h3 className="text-xl font-extrabold title-gradient">{p.title}</h3>
                  <p className="text-foreground/90 text-sm mt-1">{p.tagline || p.summary}</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {(p.tech||[]).map(t => <span key={t} className="tag-neon px-3 py-1.5 text-xs font-semibold">{t}</span>)}
                  </div>
                  <div className="mt-4 flex gap-3">
                    {p.demo?.href && (
                      <a href={p.demo.href} target="_blank" rel="noreferrer">
                        <Button className="btn-primary-purple inline-flex items-center gap-2">🚀 Launch Project</Button>
                      </a>
                    )}
                    {p.links && p.links[0]?.href && (
                      <a href={p.links[0].href} target="_blank" rel="noreferrer">
                        <Button className="btn-outline-purple inline-flex items-center gap-2"><Github className="w-4 h-4"/> Code</Button>
                      </a>
                    )}
                    {p.caseStudy && (
                      <Button onClick={()=>setOpen(p)} className="btn-outline-purple inline-flex items-center gap-2"><FileText className="w-4 h-4"/> Case Study</Button>
                    )}
                  </div>
                </motion.article>
              ))}
              {data.length===0 && (
                <div className="col-span-full text-center text-foreground/70">No projects found.</div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* CTA */}
          <div className="mt-10 text-center">
            <p className="text-foreground/80 mb-3">Want to build something like this?</p>
            <a href="/contact"><Button className="btn-primary-purple">Let’s talk</Button></a>
          </div>
        </div>
      </main>

      {/* Case Study modal */}
      <AnimatePresence>
        {open && (
          <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="fixed inset-0 z-50 bg-black/60 grid place-items-center p-4">
            <motion.div initial={{scale:0.95, y:10, opacity:0}} animate={{scale:1, y:0, opacity:1}} exit={{scale:0.98, y:4, opacity:0}} transition={{duration:0.2}}
              className="glass-card max-w-3xl w-full p-6">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-2xl font-extrabold title-gradient">{open.title}</h3>
                <button onClick={()=>setOpen(null)} className="px-3 py-1 rounded-md bg-white/10 hover:bg-white/20 border border-white/20">Close</button>
              </div>
              <div className="text-foreground/90 grid md:grid-cols-3 gap-4">
                <div className="md:col-span-2 space-y-3">
                  <section>
                    <h4 className="font-bold title-gradient">Problem</h4>
                    <p>{open.caseStudy?.problem}</p>
                  </section>
                  <section>
                    <h4 className="font-bold title-gradient">Process</h4>
                    <p>{open.caseStudy?.process}</p>
                  </section>
                  <section>
                    <h4 className="font-bold title-gradient">Result</h4>
                    <p>{open.caseStudy?.result}</p>
                  </section>
                </div>
                <div className="space-y-2">
                  <div className={`aspect-[16/10] w-full rounded-lg bg-gradient-to-br ${CAT_COLORS[open.category||'Other/Creative']?.grad||'from-pink-400/20 to-violet-500/20'} border border-white/20 grid place-items-center text-white/90`}>
                    <span className="opacity-80">{open.image ? 'Preview' : 'Project'}</span>
                  </div>
                  {(open.demo?.href || (open.links && open.links[0]?.href)) && (
                    <div className="flex gap-2">
                      {open.demo?.href && <a href={open.demo.href} target="_blank" rel="noreferrer"><Button className="btn-primary-purple w-full">🚀 Launch</Button></a>}
                      {open.links && open.links[0]?.href && <a href={open.links[0].href} target="_blank" rel="noreferrer"><Button className="btn-outline-purple w-full"><Github className="w-4 h-4"/></Button></a>}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <Footer />
    </>
  )
}
