import React from 'react'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import { workItems, WORK_CATEGORIES } from '@/content/work'
import { projects as projData } from '@/content/profile'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Globe, ExternalLink, Image as ImageIcon } from 'lucide-react'
import { usePageMeta } from '@/lib/usePageMeta'

const CAT_COLORS = {
  'Websites': { grad:'from-[#00B2FF]/15 to-[#6EE7FF]/15' },
  'Social': { grad:'from-[#FF7A7A]/15 to-[#FFC1A6]/15' },
  'Posters & Ads': { grad:'from-[#A970FF]/15 to-[#FF6EC7]/15' },
}

export default function WorkPage() {
  usePageMeta({ title: 'Client Work - Hemen Babis', description: 'Client sites, social and visual work.' })
  const [tab, setTab] = React.useState('Posters & Ads')
  const [open, setOpen] = React.useState(null)

  const items = React.useMemo(() => workItems.filter(w => w.category === tab), [tab])
  
  const WorkCard = ({ it }) => {
    if (it.category === 'Posters & Ads') {
      return (
        <motion.article initial={{opacity:0, y:14}} whileInView={{opacity:1, y:0}} viewport={{once:true}} transition={{duration:0.35}}
          className="glass-card lm-card p-2">
          <button onClick={()=>setOpen(it)} className="group relative rounded-xl overflow-hidden border dark:border-white/20 border-black/10 aspect-[4/3] w-full">
            {it.image && <img src={it.image} alt={it.title} loading="lazy" decoding="async" className="absolute inset-0 w-full h-full object-cover" />}
            <div className="absolute inset-0 bg-gradient-to-t from-black/10 dark:from-black/55 to-transparent opacity-70 group-hover:opacity-90 transition" />
            <div className="absolute bottom-0 left-0 right-0 p-3 flex items-center justify-between">
              <div>
                <h4 className="text-white font-extrabold drop-shadow">{it.title}</h4>
                <p className="text-white/90 text-xs drop-shadow">{it.caption}</p>
              </div>
              <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md text-[11px] font-semibold bg-white/15 text-white border border-white/20">
                <ImageIcon className="w-3.5 h-3.5"/> View
              </span>
            </div>
          </button>
        </motion.article>
      )
    }
    if (it.category === 'Websites') {
      return (
        <motion.article initial={{opacity:0, y:14}} whileInView={{opacity:1, y:0}} viewport={{once:true}} transition={{duration:0.35}}
          className="glass-card lm-card p-4 flex flex-col">
          <div className="flex items-center gap-3">
            <div className="w-16 h-16 rounded-lg overflow-hidden border dark:border-white/20 border-black/10 bg-slate-100 dark:bg-white/5 grid place-items-center">
              {it.image ? <img src={it.image} alt={it.title} loading="lazy" decoding="async" className="w-full h-full object-cover"/> : <Globe className="w-6 h-6"/>}
            </div>
            <div className="min-w-0">
              <h3 className="text-lg font-extrabold title-gradient lm-section-title truncate">{it.title}</h3>
              <p className="text-foreground/80 text-sm truncate">{it.caption}</p>
              {it.status && <span className="mt-1 inline-block text-xs px-2 py-0.5 rounded-md bg-amber-50 text-amber-800 border border-amber-200">{it.status}</span>}
            </div>
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            {(it.tools||[]).map(t => <span key={t} className="px-3 py-1.5 text-xs font-semibold lm-badge rounded-full">{t}</span>)}
          </div>
          <div className="mt-3">
            {it.links && it.links[0]?.href ? (
              <a href={it.links[0].href} target="_blank" rel="noreferrer">
                <Button className="btn-primary-purple inline-flex items-center gap-2"><Globe className="w-4 h-4"/> Visit Site</Button>
              </a>
            ) : (
              <Button disabled className="btn-outline-purple opacity-60">Preview Only</Button>
            )}
          </div>
        </motion.article>
      )
    }
    // Social
    return (
      <motion.article initial={{opacity:0, y:14}} whileInView={{opacity:1, y:0}} viewport={{once:true}} transition={{duration:0.35}}
        className="glass-card lm-card p-4 flex flex-col">
        <div className="flex items-center gap-3">
          <div className="w-16 h-16 rounded-lg overflow-hidden border dark:border-white/20 border-black/10 bg-slate-100 dark:bg-white/5 grid place-items-center">
            {it.image ? <img src={it.image} alt={it.title} loading="lazy" decoding="async" className="w-full h-full object-cover"/> : <ExternalLink className="w-6 h-6"/>}
          </div>
          <div className="min-w-0">
            <h3 className="text-lg font-extrabold title-gradient lm-section-title truncate">{it.title}</h3>
            <p className="text-foreground/80 text-sm truncate">{it.caption}</p>
          </div>
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          {(it.tools||[]).map(t => <span key={t} className="px-3 py-1.5 text-xs font-semibold lm-badge rounded-full">{t}</span>)}
        </div>
        <div className="mt-3">
          {it.links && it.links[0]?.href ? (
            <a href={it.links[0].href} target="_blank" rel="noreferrer">
              <Button className="btn-outline-purple inline-flex items-center gap-2"><ExternalLink className="w-4 h-4"/> View</Button>
            </a>
          ) : null}
        </div>
      </motion.article>
    )
  }

  return (
    <>
      <Nav />
      <main id="main" className="relative py-16">
        <div className="mx-auto w-full px-4 sm:px-6 max-w-6xl">
          <div className="flex items-center justify-between mb-6 gap-3">
            <h1 className="font-hand text-4xl sm:text-5xl md:text-6xl title-gradient">Work</h1>
            <a href="https://www.linkedin.com/in/hemen-babis" target="_blank" rel="noreferrer"><Button className="btn-primary-purple">Hire Me</Button></a>
          </div>

          {/* Tabs */}
          <div className="relative mb-6 overflow-x-auto no-scrollbar">
            <div className="inline-flex gap-2 whitespace-nowrap relative">
              {WORK_CATEGORIES.map(c => (
                <button
                  key={c}
                  onClick={()=>setTab(c)}
                  className={`relative px-3 py-1.5 font-semibold rounded-lg lm-tab ${c===tab ? 'lm-tab-active' : ''} transition`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {items.map((it) => (
              <WorkCard key={it.id || it.title} it={it} />
            ))}
          </div>

          {items.length===0 && (
            <div className="text-center text-foreground/70 mt-6">No items yet.</div>
          )}

          <div className="mt-10 text-center">
            <a href="/hemenly-tech"><Button className="btn-primary-purple">Let’s talk</Button></a>
          </div>
        </div>
      </main>

      {/* Lightbox modal */}
      <AnimatePresence>
        {open && (
          <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="fixed inset-0 z-50 bg-black/70 grid place-items-center p-4">
            <motion.div initial={{scale:0.95, y:8, opacity:0}} animate={{scale:1, y:0, opacity:1}} exit={{scale:0.98, y:4, opacity:0}} transition={{duration:0.2}}
              className="glass-card w-full max-w-5xl p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-xl font-extrabold title-gradient">{open.title}</h3>
                <button onClick={()=>setOpen(null)} className="px-3 py-1 rounded-md bg-white/10 hover:bg-white/20 border border-white/20">Close</button>
              </div>
              <div className="grid md:grid-cols-5 gap-4">
                <div className="md:col-span-3">
                  <div className="relative aspect-[4/3] rounded-xl overflow-hidden border border-white/15 bg-slate-100 dark:bg-white/5">
                    {open.image && <img src={open.image} alt={open.title} loading="lazy" decoding="async" className="absolute inset-0 w-full h-full object-contain" />}
                  </div>
                </div>
                <div className="md:col-span-2 space-y-3">
                  <p className="text-foreground/90 text-sm">{open.caption}</p>
                  <div className="flex flex-wrap gap-2">
                    {(open.tools||[]).map(t => <span key={t} className="tag-neon px-3 py-1.5 text-xs font-semibold">{t}</span>)}
                  </div>
                  {open.links && open.links.length>0 && (
                    <div className="flex gap-2">
                      {open.links.map(l => (
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
