import React from 'react'
import { useParams, Link } from 'react-router-dom'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import { projects as projData } from '@/content/profile'
import { motion } from 'framer-motion'

function slugify(t){ return (t||'').toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/(^-|-$)/g,'') }

export default function ProjectCase(){
  const { slug } = useParams()
  const project = React.useMemo(()=> projData.find(p=> slugify(p.title)===slug), [slug])

  if (!project) {
    return (
      <>
        <Nav />
        <main className="py-20 text-center">
          <div className="mx-auto w-full px-4 sm:px-6 max-w-4xl">
            <h1 className="title-gradient text-3xl font-extrabold mb-3">Project Not Found</h1>
            <p className="opacity-80">We couldn’t find that case study.</p>
            <div className="mt-4"><Link to="/projects" className="nav-link">Back to Projects</Link></div>
          </div>
        </main>
        <Footer />
      </>
    )
  }

  const { title, image, summary, tech = [], caseStudy = {} } = project
  const index = React.useMemo(() => projData.findIndex(p => slugify(p.title) === slug), [slug])
  const prev = index > 0 ? projData[index - 1] : null
  const next = index >= 0 && index < projData.length - 1 ? projData[index + 1] : null
  return (
    <>
      <Nav />
      <main id="main" className="relative">
        <section className="relative py-10">
          <div className="mx-auto w-full px-4 sm:px-6 max-w-6xl">
            <div className="grid md:grid-cols-2 gap-6 items-center">
              <div>
                <h1 className="title-gradient text-4xl font-extrabold">{title}</h1>
                <p className="mt-2 text-foreground/90">{summary}</p>
                <div className="mt-3 flex flex-wrap gap-2">{tech.map(t=> <span key={t} className="chip">{t}</span>)}</div>
              </div>
              <div>
                <div className="relative aspect-[16/10] rounded-xl overflow-hidden border dark:border-white/15 border-black/10 bg-slate-100 dark:bg-white/5">
                  {image ? <img src={image} alt={title} loading="lazy" decoding="async" className="absolute inset-0 w-full h-full object-cover"/> : null}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-12">
          <div className="mx-auto w-full px-4 sm:px-6 max-w-5xl space-y-8">
            {['problem','process','result'].map((k,i)=> (
              caseStudy?.[k] ? (
                <motion.article key={k} initial={{opacity:0, y:18}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:0.4, delay:i*0.05}} className="glass-card p-6">
                  <h2 className="title-gradient text-2xl font-extrabold mb-2">{k[0].toUpperCase()+k.slice(1)}</h2>
                  <p className="text-foreground/90 whitespace-pre-wrap">{caseStudy[k]}</p>
                </motion.article>
              ) : null
            ))}
          </div>
        </section>

        <section className="py-8">
          <div className="mx-auto w-full px-4 sm:px-6 max-w-5xl flex items-center justify-between">
            <div>
              {prev && (
                <Link to={`/projects/${slugify(prev.title)}`} className="btn-outline-purple px-3 py-2 rounded-md">← {prev.title}</Link>
              )}
            </div>
            <div>
              {next && (
                <Link to={`/projects/${slugify(next.title)}`} className="btn-outline-purple px-3 py-2 rounded-md">{next.title} →</Link>
              )}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
