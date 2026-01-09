// removed duplicate React import
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import { projects as projData } from '@/content/profile'
import { workItems as workData, WORK_CATEGORIES as WORK_TABS } from '@/content/work'
import { Github, ExternalLink, FileText } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import React from 'react'
import { useSearchParams } from 'react-router-dom'
import { usePageMeta } from '@/lib/usePageMeta'

const CATS = ['All','Web Development','Visual Content','AI/ML','School Projects','Other/Creative']
const CAT_COLORS = {
  'Web Development': { ring:'ring-[#00B2FF]/30', grad:'from-[#00B2FF]/20 to-[#6EE7FF]/20' },
  'Visual Content': { ring:'ring-[#FF7A7A]/30', grad:'from-[#FF7A7A]/20 to-[#FFC1A6]/20' },
  'AI/ML': { ring:'ring-[#A970FF]/30', grad:'from-[#FF6EC7]/20 to-[#9B59B6]/20' },
  'School Projects': { ring:'ring-[#34D399]/30', grad:'from-[#34D399]/20 to-[#6EE7B7]/20' },
  'Other/Creative': { ring:'ring-[#F59E0B]/30', grad:'from-[#F59E0B]/20 to-[#FCD34D]/20' },
}

function ProjectCard({ p, i, onOpen }) {
  return (
    <motion.article
      layout
      initial={{opacity:0, y:18, scale:0.98}}
      animate={{opacity:1, y:0, scale:1}}
      exit={{opacity:0, y:12, scale:0.98}}
      transition={{duration:0.35, delay:i*0.03}}
      className={`group glass-card lm-card p-4 flex flex-col hover:-translate-y-1.5 hover:shadow-[0_0_32px_rgba(169,112,255,0.35)] ring-1 ${CAT_COLORS[p.category||'Other/Creative']?.ring||''}`}
    >
      <div className="relative mb-3 rounded-lg overflow-hidden border dark:border-white/15 border-black/10">
        {p.image ? (
          <div className="aspect-[16/10] w-full relative bg-slate-100 dark:bg-white/5">
            <img src={p.image} alt={p.title} loading="lazy" decoding="async" className="absolute inset-0 w-full h-full object-cover" />
          </div>
        ) : (
          <div className={`aspect-[16/10] w-full bg-gradient-to-br ${CAT_COLORS[p.category||'Other/Creative']?.grad||'from-pink-400/20 to-violet-500/20'} grid place-items-center dark:text-white/90 text-slate-800 group-hover:rotate-[0.5deg] transition`}>
            <span className="opacity-80">{p.category || 'Project'}</span>
          </div>
        )}
        <span className="absolute inset-0 rounded-lg pointer-events-none border-2 border-transparent group-hover:border-pink-400/40 transition" />
      </div>
      <h3 className="text-xl font-extrabold title-gradient">{p.title}</h3>
      <p className="text-foreground/90 text-sm mt-1">{p.tagline || p.summary}</p>
      <div className="mt-3 flex flex-wrap gap-2">
        {(p.tech||[]).map(t => <span key={t} className="chip">{t}</span>)}
      </div>
      <div className="mt-4 flex flex-wrap gap-3">
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
          <a href={`/projects/${encodeURIComponent(p.title.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/(^-|-$)/g,''))}`}>
            <Button className="btn-outline-purple inline-flex items-center gap-2"><FileText className="w-4 h-4"/> Case Study</Button>
          </a>
        )}
      </div>
    </motion.article>
  )
}

export default function ProjectsPage() {
  usePageMeta({
    title: 'Projects — Hemen Babis',
    description: 'Selected software projects, client work and case studies by Hemen Babis.'
  })
  const [sp, setSp] = useSearchParams()
  const [mode, setMode] = React.useState(sp.get('mode') || 'code') // 'code' or 'work'
  const [cat, setCat] = React.useState(sp.get('cat') || 'All')
  const [query, setQuery] = React.useState(sp.get('q') || '')
  const [open, setOpen] = React.useState(null) // case study modal (code)
  const [wTab, setWTab] = React.useState(sp.get('wtab') || WORK_TABS[0])
  const [wOpen, setWOpen] = React.useState(null)
  const [view, setView] = React.useState(sp.get('view') || 'grid') // 'grid' | 'list'

  // Sync state → URL
  React.useEffect(() => {
    const next = new URLSearchParams(sp)
    next.set('mode', mode)
    next.set('cat', cat)
    query ? next.set('q', query) : next.delete('q')
    next.set('view', view)
    next.set('wtab', wTab)
    setSp(next, { replace: true })
  }, [mode, cat, query, view, wTab])

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
  const workItems = React.useMemo(() => workData.filter(w => w.category === wTab), [wTab])

  return (
    <>
      <Nav />
      <main id="main" className="relative py-16">
        <div className="mx-auto w-full px-4 sm:px-6 max-w-6xl">
          <h1 className="font-hand text-4xl sm:text-5xl md:text-6xl title-gradient mb-4">Projects</h1>
          <div className="mb-6 inline-flex items-center rounded-lg dark:bg-white/10 bg-white/80 border border-[#a970ff33] p-1">
            <button onClick={()=>setMode('code')} className={`px-4 py-2 rounded-md font-semibold transition lm-tab ${mode==='code' ? 'lm-tab-active dark:bg-white/20 shadow-[0_0_10px_rgba(169,112,255,0.35)]' : 'opacity-80 hover:opacity-100'}`}>Code Projects</button>
            <button onClick={()=>setMode('work')} className={`px-4 py-2 rounded-md font-semibold transition lm-tab ${mode==='work' ? 'lm-tab-active dark:bg-white/20 shadow-[0_0_10px_rgba(169,112,255,0.35)]' : 'opacity-80 hover:opacity-100'}`}>Client Work</button>
          </div>

          {/* Featured banner (code projects) */}
          {mode==='code' && featured && (
            <motion.div initial={{opacity:0, y:14}} whileInView={{opacity:1, y:0}} viewport={{once:true}} transition={{duration:0.45}}
              className="relative overflow-hidden glass-card lm-card lm-hero p-6 mb-8 flex flex-col md:flex-row gap-6 items-center">
              <div className="w-full md:w-1/2">
                {featured.image ? (
                  <div className="aspect-[16/9] w-full rounded-xl overflow-hidden border dark:border-white/20 border-black/10 relative bg-slate-100 dark:bg-white/5">
                    <img src={featured.image} alt={featured.title} loading="lazy" decoding="async" className="absolute inset-0 w-full h-full object-cover" />
                  </div>
                ) : (
                  <div className={`aspect-[16/9] w-full rounded-xl bg-gradient-to-br ${CAT_COLORS[featured.category||'Other/Creative']?.grad||'from-pink-400/30 to-violet-500/30'} border dark:border-white/20 border-black/10 flex items-center justify-center dark:text-white/90 text-slate-800`}>
                    <span className="text-xl">Featured</span>
                  </div>
                )}
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

          {mode==='code' && (
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
            <div className="relative inline-flex items-center gap-4 flex-wrap">
              {CATS.map(c => (
                <button key={c} onClick={()=>setCat(c)} className={`relative px-3 py-1.5 font-semibold transition lm-tab ${c===cat? 'lm-tab-active':''}`}>
                  {c}
                  {c===cat && (
                    <motion.span layoutId="tab-underline" className="absolute left-0 -bottom-0.5 h-[3px] w-full rounded bg-gradient-to-r from-[#FF6EC7] to-[#9B59B6]" />
                  )}
                </button>
              ))}
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <button onClick={()=>setView(v=> v==='grid'?'list':'grid')} className="px-3 py-1.5 rounded-lg border dark:border-white/20 border-black/10 text-sm">
                  {view==='grid' ? 'List View' : 'Grid View'}
                </button>
                <input
                value={query}
                onChange={(e)=>setQuery(e.target.value)}
                placeholder="Search projects (title, tech)"
                aria-label="Search projects"
                role="searchbox"
                className="glass-card lm-input px-4 py-2 rounded-xl outline-none placeholder:text-slate-500 dark:placeholder:text-slate-300"
              />
                {query && (
                  <button onClick={()=>setQuery('')} className="px-2 py-1 rounded-md border dark:border-white/20 border-black/10 text-xs">Clear</button>
                )}
                <span className="text-xs opacity-70">{data.length} result{data.length===1?'':'s'}</span>
              </div>
            </div>
          </div>
          )}

          {/* Grid: code projects */}
          {mode==='code' && (
            view==='grid' ? (
              <AnimatePresence mode="popLayout">
                {cat !== 'All' ? (
                  <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {data.map((p, i) => (
                      <ProjectCard key={p.title+i} p={p} i={i} onOpen={setOpen} />
                    ))}
                    {data.length===0 && (
                      <div className="col-span-full text-center text-foreground/70">No projects found.</div>
                    )}
                  </motion.div>
                ) : (
                  <div className="space-y-10">
                    {CATS.filter(c=>c!=='All').map(section => {
                      const items = projData.filter(p => (p.category||'Other/Creative') === section)
                      if (items.length === 0) return null
                      return (
                        <section key={section}>
                          <h2 className="text-2xl font-extrabold title-gradient lm-section-title mb-3">{section}</h2>
                          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {items.map((p,i)=> <ProjectCard key={p.title+i} p={p} i={i} onOpen={setOpen} />)}
                          </motion.div>
                        </section>
                      )
                    })}
                  </div>
                )}
              </AnimatePresence>
            ) : (
              <div className="space-y-3">
                {data.map((p,i)=>(
                  <motion.article key={p.title+i} initial={{opacity:0, y:10}} animate={{opacity:1,y:0}} transition={{duration:0.25}}
                    className="glass-card p-3 flex items-center gap-4">
                    <div className="relative w-40 aspect-[16/10] rounded-lg overflow-hidden bg-gradient-to-br from-pink-400/15 to-violet-500/15 border dark:border-white/15 border-black/10">
                      {p.image && <img src={p.image} alt={p.title} loading="lazy" decoding="async" className="absolute inset-0 w-full h-full object-cover" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-extrabold title-gradient truncate">{p.title}</h3>
                      <p className="text-foreground/90 text-sm line-clamp-2">{p.tagline || p.summary}</p>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {(p.tech||[]).slice(0,6).map(t => <span key={t} className="chip">{t}</span>)}
                      </div>
                    </div>
                    <div className="flex flex-col gap-2">
                      {p.demo?.href && (
                        <a href={p.demo.href} target="_blank" rel="noreferrer"><Button className="btn-primary-purple">Launch</Button></a>
                      )}
                      {p.links && p.links[0]?.href && (
                        <a href={p.links[0].href} target="_blank" rel="noreferrer"><Button className="btn-outline-purple">Code</Button></a>
                      )}
                    </div>
                  </motion.article>
                ))}
                {data.length===0 && (
                  <div className="text-center text-foreground/70">No projects found.</div>
                )}
              </div>
            )
          )}

          {/* Client Work view */}
          {mode==='work' && (
            <>
              <div className="flex gap-2 mb-6">
                {WORK_TABS.map(c => (
                  <button key={c} onClick={()=>setWTab(c)} className={`px-3 py-1.5 font-semibold rounded-lg ${c===wTab ? 'bg-white/70 dark:bg-white/10 border border-[#a970ff33]' : 'hover:bg-white/10 border border-transparent'} transition`}>
                    {c}
                  </button>
                ))}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {workItems.map(it => (
                  <motion.article key={it.id} initial={{opacity:0, y:14}} whileInView={{opacity:1, y:0}} viewport={{once:true}} transition={{duration:0.35}}
                    className="glass-card p-3 flex flex-col">
                    <button onClick={()=>setWOpen(it)} className={`group relative rounded-xl border dark:border-white/20 border-black/10 overflow-hidden bg-gradient-to-br from-pink-400/15 to-violet-500/15 aspect-[4/3] grid place-items-center`}>
                      {it.image ? (
                        <img src={it.image} alt={it.title} loading="lazy" decoding="async" className="absolute inset-0 w-full h-full object-cover object-center opacity-95 group-hover:opacity-100 transition" />
                      ) : (
                        <span className="opacity-80 dark:text-white/90 text-slate-800">Preview</span>
                      )}
                    </button>
                    <div className="mt-3">
                      <h3 className="text-lg font-extrabold title-gradient">{it.title}</h3>
                      <p className="text-foreground/80 text-sm">{it.caption}</p>
                    </div>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {(it.tools||[]).map(t => <span key={t} className="tag-neon px-3 py-1.5 text-xs font-semibold">{t}</span>)}
                    </div>
                    {it.links && it.links.length>0 && (
                      <div className="mt-3 flex gap-2">
                        {it.links.map(l => (
                          <a key={l.href} href={l.href} target="_blank" rel="noreferrer"><Button className="btn-outline-purple">{l.label}</Button></a>
                        ))}
                      </div>
                    )}
                  </motion.article>
                ))}
              </div>
              {workItems.length===0 && (
                <div className="text-center text-foreground/70 mt-6">No items yet.</div>
              )}
            </>
          )}

          {/* CTA */}
          <div className="mt-10 text-center">
            <p className="text-foreground/80 mb-3">Want to build something like this?</p>
            <a href="/hemenly-tech"><Button className="btn-primary-purple">Let’s talk</Button></a>
          </div>
        </div>
      </main>

      {/* Case Study modal (code) */}
      <AnimatePresence>
        {mode==='code' && open && (
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
                  <div className={`aspect-[16/10] w-full rounded-lg bg-gradient-to-br ${CAT_COLORS[open.category||'Other/Creative']?.grad||'from-pink-400/20 to-violet-500/20'} border dark:border-white/20 border-black/10 grid place-items-center dark:text-white/90 text-slate-800`}>
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

      {/* Work lightbox modal */}
      <AnimatePresence>
        {mode==='work' && wOpen && (
          <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="fixed inset-0 z-50 bg-black/70 grid place-items-center p-4">
            <motion.div initial={{scale:0.95, y:8, opacity:0}} animate={{scale:1, y:0, opacity:1}} exit={{scale:0.98, y:4, opacity:0}} transition={{duration:0.2}}
              className="glass-card w-full max-w-5xl p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-xl font-extrabold title-gradient">{wOpen.title}</h3>
                <button onClick={()=>setWOpen(null)} className="px-3 py-1 rounded-md bg-white/10 hover:bg-white/20 border border-white/20">Close</button>
              </div>
              <div className="grid md:grid-cols-5 gap-4">
                <div className="md:col-span-3">
                  <div className="relative aspect-[4/3] rounded-xl overflow-hidden border border-white/15 bg-slate-100 dark:bg-white/5">
                    {wOpen.image && <img src={wOpen.image} alt={wOpen.title} className="absolute inset-0 w-full h-full object-contain" />}
                  </div>
                </div>
                <div className="md:col-span-2 space-y-3">
                  <p className="text-foreground/90 text-sm">{wOpen.caption}</p>
                  <div className="flex flex-wrap gap-2">
                    {(wOpen.tools||[]).map(t => <span key={t} className="tag-neon px-3 py-1.5 text-xs font-semibold">{t}</span>)}
                  </div>
                  {wOpen.links && wOpen.links.length>0 && (
                    <div className="flex gap-2">
                      {wOpen.links.map(l => (
                        <a key={l.href} href={l.href} target="_blank" rel="noreferrer"><Button className="btn-primary-purple">{l.label}</Button></a>
                      ))}
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
