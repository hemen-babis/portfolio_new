import React from 'react'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import { usePageMeta } from '@/lib/usePageMeta'
import { articles } from '@/content/articles'

export default function ArticlesPage() {
  usePageMeta({ title: 'Articles - Hemen Babis', description: 'Essays, notes and articles by Hemen Babis.' })
  const [q, setQ] = React.useState('')
  const [tag, setTag] = React.useState('All')
  const tags = React.useMemo(() => ['All', ...Array.from(new Set(articles.flatMap(a => a.tags)))], [])
  const list = articles.filter(a => (tag==='All'||a.tags.includes(tag)) && (a.title.toLowerCase().includes(q.toLowerCase()) || a.summary.toLowerCase().includes(q.toLowerCase())))
  return (
    <>
      <Nav />
      <main id="main" className="mx-auto w-full px-4 sm:px-6 max-w-5xl py-10">
        <div className="flex items-center justify-between gap-3 mb-6">
          <h1 className="text-4xl font-extrabold title-gradient">Articles</h1>
          <input className="glass-card px-3 py-2 rounded-lg" placeholder="Search articles" value={q} onChange={(e)=>setQ(e.target.value)} />
        </div>
        <div className="mb-4 flex gap-2 flex-wrap">
          {tags.map(t => (
            <button key={t} onClick={()=>setTag(t)} className={`px-3 py-1.5 rounded-lg lm-tab ${t===tag?'lm-tab-active':''}`}>{t}</button>
          ))}
        </div>
        <div className="space-y-4">
          {list.map((a) => (
            <article key={a.slug} className="glass-card p-4">
              <div className="flex items-center justify-between gap-3">
                <h2 className="text-xl font-extrabold title-gradient">{a.title}</h2>
                <div className="text-sm opacity-70">{new Date(a.date).toLocaleDateString()}</div>
              </div>
              <p className="mt-1 text-foreground/90">{a.summary}</p>
              <div className="mt-2 flex flex-wrap gap-2 text-xs">
                {a.tags.map(t => <span key={t} className="chip">{t}</span>)}
              </div>
              <div className="mt-3">
                {a.url ? (
                  <a href={a.url} target="_blank" rel="noreferrer" className="btn-outline-purple px-3 py-1.5 rounded-md">Read →</a>
                ) : (
                  <span className="text-sm opacity-70">Draft</span>
                )}
              </div>
            </article>
          ))}
          {list.length===0 && <div className="opacity-70">No articles match.</div>}
        </div>
      </main>
      <Footer />
    </>
  )
}
