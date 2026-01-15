import React from 'react'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select'
import { toast } from 'sonner'
import { usePageMeta } from '@/lib/usePageMeta'

// Brand + Contact (update these with your info)
const BRAND_NAME = 'Hemenly Tech'
const BUSINESS = {
  email: '', // set your preferred email to enable direct mailto
  phone: '', // optional
  website: 'https://t.me/hemenly', // Telegram contact until email is set
}

// Optional: plug-and-play submissions with Formspree (simple, no backend).
// 1) Create a form at https://formspree.io (New Project → Create Form).
// 2) Copy your endpoint like "https://formspree.io/f/abcdwxyz" and paste below.
// When set, submissions POST here; you’ll see them in your Formspree inbox.
const FORMSPREE_ENDPOINT = '' // e.g., 'https://formspree.io/f/abcdwxyz'

const SERVICES = [
  { id: 'social', label: 'Social Media Content Management', desc: 'Strategy, content creation, scheduling and monthly reporting.' },
  { id: 'web', label: 'Website Design & Development', desc: 'Design and build with a modern stack; domain/hosting support.' },
  { id: 'app', label: 'App Development', desc: 'Web/mobile apps, APIs, authentication, databases and deployments.' },
  { id: 'job', label: 'Job Offer', desc: 'Freelance/contract or full-time roles.' },
]

const WEBSITE_PACKAGES = [
  {
    id: 'standard',
    title: 'Standard Package',
    note: 'Perfect for home care, local services, providers',
    bullets: [
      'Custom design (up to 5 pages)',
      'Modern frontend technologies',
      'Responsive, accessible layout',
      'Contact form + email notifications',
      'Basic SEO (titles, metadata)',
      'Custom domain setup help',
      '1-month support',
      '2 revision rounds',
    ],
  },
  {
    id: 'professional',
    title: 'Professional Package',
    note: 'Ideal for growing businesses and complex projects',
    popular: true,
    bullets: [
      'Custom web application',
      'Advanced responsive design',
      'API integration',
      'Database design and development',
      'User authentication',
      'Up to 5 revision rounds',
      '3 months of support',
    ],
  },
  {
    id: 'enterprise',
    title: 'Enterprise Custom Package',
    note: 'For organizations with specific requirements',
    bullets: [
      'Custom software architecture',
      'Advanced security',
      'Performance optimization',
      'Multiple platform support',
      'Unlimited revisions',
      '12 months of maintenance',
    ],
  },
]

const EXTRA_SERVICES = [
  'Content calendar & scheduling',
  'Brand style guide alignment',
  'On-page SEO setup + audit',
  'Analytics & monthly reporting',
  'E‑commerce storefront setup',
  'Payment gateway integration',
  'CMS setup (Sanity / WordPress)',
  'Email marketing (Mailchimp / Klaviyo)',
  'Third‑party API integration',
  'Cloud hosting & deployment',
  'Database design & migration',
  'Performance & security hardening',
]

const BUDGETS = {
  social: ['<$300 / month', '$300–$800 / month', '$800–$1.5k / month', '$1.5k+ / month'],
  web: ['$1k–$3k', '$3k–$8k', '$8k–$15k', '$15k+'],
  app: ['$5k–$10k', '$10k–$30k', '$30k+'],
  job: [],
}

const TIMELINES = {
  social: ['Start this month', '1–2 months', 'Flexible'],
  web: ['2–3 weeks', '1–2 months', '2–3 months', 'Flexible'],
  app: ['1–2 months', '2–4 months', '4+ months', 'Flexible'],
  job: [],
}

function CornerProgress({ step, total, service }) {
  if (service !== 'web') return null
  const pct = Math.round((step / total) * 100)
  return (
    <div className="fixed right-3 bottom-3 z-40">
      <div className="glass-card px-3 py-2 rounded-xl text-sm flex items-center gap-2">
        <span className="font-semibold">Website Quote</span>
        <span className="opacity-80">{step}/{total}</span>
        <div className="w-24 h-1.5 rounded bg-white/10 overflow-hidden">
          <div className="h-full bg-gradient-to-r from-[#FF6EC7] to-[#9B59B6]" style={{ width: `${pct}%` }} />
        </div>
      </div>
    </div>
  )
}

export default function HireMePage() {
  usePageMeta({ title: 'Hemenly Tech — Work With Me', description: 'Website, app and social media services. Get a quick tailored quote.' })
  const [step, setStep] = React.useState(1)
  const total = 3
  const [service, setService] = React.useState(null)
  const [websitePkg, setWebsitePkg] = React.useState('professional')
  const [timeline, setTimeline] = React.useState('')
  const [budget, setBudget] = React.useState('')
  const [desc, setDesc] = React.useState('')
  const [errors, setErrors] = React.useState({})
  const [extras, setExtras] = React.useState([])
  const [name, setName] = React.useState('')
  const [email, setEmail] = React.useState('')
  const [phone, setPhone] = React.useState('')
  const [company, setCompany] = React.useState('')
  const [jobRole, setJobRole] = React.useState('')
  const [jobType, setJobType] = React.useState('')
  const [jobLink, setJobLink] = React.useState('')

  // Persist quote draft locally
  React.useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('hire-quote')||'null')
      if (saved) {
        setService(saved.service||null)
        setWebsitePkg(saved.websitePkg||'professional')
        setTimeline(saved.timeline||'')
        setBudget(saved.budget||'')
        setDesc(saved.desc||'')
        setExtras(saved.extras||[])
        setName(saved.name||'')
        setEmail(saved.email||'')
        setPhone(saved.phone||'')
        setCompany(saved.company||'')
        setJobRole(saved.jobRole||'')
        setJobType(saved.jobType||'')
        setJobLink(saved.jobLink||'')
      }
    } catch {}
  }, [])
  React.useEffect(() => {
    const data = { service, websitePkg, timeline, budget, desc, extras, name, email, phone, company, jobRole, jobType, jobLink }
    try { localStorage.setItem('hire-quote', JSON.stringify(data)) } catch {}
  }, [service, websitePkg, timeline, budget, desc, extras, name, email, phone, company, jobRole, jobType, jobLink])

  const toggleExtra = (v) => {
    setExtras((xs) => (xs.includes(v) ? xs.filter((x) => x !== v) : [...xs, v]))
  }

  const validate = (targetStep) => {
    const e = {}
    if (targetStep === 2) {
      if (!service) e.service = 'Please pick a service.'
    }
    if (targetStep === 3) {
      if (service !== 'job') {
        if (!timeline) e.timeline = 'Timeline is required.'
        if (!budget) e.budget = 'Budget range is required.'
      } else {
        if (!jobRole) e.jobRole = 'Role title is required.'
        if (!jobType) e.jobType = 'Employment type is required.'
      }
    }
    if (targetStep === 'submit') {
      if (!name) e.name = 'Full name is required.'
      if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = 'Valid email is required.'
    }
    setErrors(e)
    if (Object.keys(e).length) {
      const first = Object.values(e)[0]
      toast.error(String(first))
      return false
    }
    return true
  }
  const next = () => {
    const ok = validate(step + 1)
    if (!ok) return
    setStep((s) => Math.min(total, s + 1))
  }
  const prev = () => setStep((s) => Math.max(1, s - 1))

  const summary = React.useMemo(() => {
    return {
      service,
      websitePkg,
      timeline,
      budget,
      desc,
      extras,
      name,
      email,
      phone,
      company,
      jobRole,
      jobType,
      jobLink,
    }
  }, [service, websitePkg, timeline, budget, desc, extras, name, email, phone, company, jobRole, jobType, jobLink])

  const buildRequestText = () => (
    `Quote Request\n\n` +
    `Service: ${summary.service}\n` +
    (summary.service === 'web' ? `Package: ${summary.websitePkg}\n` : '') +
    (summary.service !== 'job' && summary.timeline ? `Timeline: ${summary.timeline}\n` : '') +
    (summary.service !== 'job' && summary.budget ? `Budget: ${summary.budget}\n` : '') +
    (summary.service !== 'job' && summary.extras.length ? `Extras: ${summary.extras.join(', ')}\n` : '') +
    (summary.service === 'job' && summary.jobRole ? `Role: ${summary.jobRole}\n` : '') +
    (summary.service === 'job' && summary.jobType ? `Employment Type: ${summary.jobType}\n` : '') +
    (summary.service === 'job' && summary.jobLink ? `Job Link: ${summary.jobLink}\n` : '') +
    `\nProject Description:\n${summary.desc}\n\n` +
    `Contact:\n${summary.name}\n${summary.email}\n${summary.phone}\n${summary.company}`
  )

  const handleSubmit = async () => {
    if (!validate('submit')) return
    const to = BUSINESS.email
    const subject = service === 'job' ? 'Job Opportunity Inquiry' : 'Project Quote Request'
    const body = encodeURIComponent(buildRequestText())
    try {
      if (FORMSPREE_ENDPOINT) {
        const payload = {
          subject,
          service: summary.service,
          websitePkg: summary.websitePkg,
          timeline: summary.timeline,
          budget: summary.budget,
          extras: summary.extras,
          jobRole: summary.jobRole,
          jobType: summary.jobType,
          jobLink: summary.jobLink,
          description: summary.desc,
          name: summary.name,
          email: summary.email,
          phone: summary.phone,
          company: summary.company,
        }
        const r = await fetch(FORMSPREE_ENDPOINT, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        })
        if (r.ok) {
          toast.success('Thanks! Your request has been sent.')
          try { localStorage.removeItem('hire-quote') } catch {}
          return
        }
        // If Formspree errors, fall back gracefully
      }
      if (to) {
        window.location.href = `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${body}`
        toast.success('Thanks! Your email client is opening with the details.')
      } else {
        await navigator.clipboard.writeText(buildRequestText())
        toast.success('Copied request to clipboard. Paste it into your email.')
      }
    } catch (e) {
      toast.error('Unable to submit automatically. Please try email or copy the request.')
    }
  }

  return (
    <>
      <Nav />
      <CornerProgress step={step} total={total} service={service} />
      <main id="main" className="relative py-12">
        <div className="mx-auto w-full px-4 sm:px-6 max-w-6xl">
          <div className="flex items-center justify-between mb-6">
            <h1 className="font-hand text-4xl sm:text-5xl md:text-6xl title-gradient">{BRAND_NAME}</h1>
            <div className="text-right text-sm">
              <div className="opacity-80">English / USD</div>
              {BUSINESS.website && <a className="nav-link" href={BUSINESS.website} target="_blank" rel="noreferrer">{BUSINESS.website.replace(/^https?:\/\//,'')}</a>}
              {BUSINESS.phone && <div className="opacity-80">{BUSINESS.phone}</div>}
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-6 items-start">
            <div className="lg:col-span-2">
              {/* Stepper header */}
              <div className="glass-card p-3 mb-4 flex items-center gap-3">
                {[1,2,3].map((n) => (
                  <div key={n} className={`flex items-center gap-2 ${n===step ? 'opacity-100' : 'opacity-70'}`}>
                    <div className={`w-8 h-8 grid place-items-center rounded-full ${n<=step ? 'bg-gradient-to-r from-[#FF6EC7] to-[#9B59B6] text-white' : 'bg-white/10'}`}>{n}</div>
                    <span className="hidden sm:block text-sm">{n===1?'Choose':' '}{n===2?'Details':' '}{n===3?'Contact':' '}</span>
                    {n<3 && <div className="w-8 h-[2px] bg-white/10" />}
                  </div>
                ))}
              </div>

              <div className="glass-card p-5">
                <AnimatePresence mode="wait">
                  {step===1 && (
                    <motion.div key="s1" initial={{opacity:0,y:8}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-8}}>
                      <h2 className="text-2xl font-extrabold title-gradient mb-2">What do you need?</h2>
                      <p className="text-foreground/90 mb-4">Select a service to start.</p>
                      <div className="grid sm:grid-cols-2 gap-3">
                        {SERVICES.map(s => (
                          <button key={s.id} onClick={()=>{ setService(s.id); setStep(2); }} className={`text-left p-4 rounded-xl border transition hover:-translate-y-0.5 ${service===s.id ? 'border-[#a970ff66] bg-white/90 dark:bg-white/10' : 'border-black/10 bg-white/80 hover:bg-white/90 dark:border-white/15 dark:bg-white/5'}`}>
                            <div className="font-bold">{s.label}</div>
                            <div className="text-sm opacity-90">{s.desc}</div>
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {step===2 && (
                    <motion.div key="s2" initial={{opacity:0,y:8}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-8}}>
                      <h2 className="text-2xl font-extrabold title-gradient mb-2">{service==='job' ? 'Role Details' : 'Project Details'}</h2>
                      {service==='web' && (
                        <>
                          <div className="mb-4">
                            <div className="text-sm font-semibold mb-2">Choose Your Package</div>
                            <div className="grid md:grid-cols-3 gap-3">
                              {WEBSITE_PACKAGES.map(p => (
                                <button key={p.id} onClick={()=>setWebsitePkg(p.id)} className={`text-left p-4 rounded-xl border transition relative ${websitePkg===p.id ? 'border-[#a970ff66] bg-white/90 dark:bg-white/10' : 'border-black/10 bg-white/80 hover:bg-white/90 dark:border-white/15 dark:bg-white/5'}`}>
                                  {p.popular && <span className="absolute top-2 right-2 text-xs px-2 py-0.5 rounded-full bg-[#a970ff] text-white">Most Popular</span>}
                                  <div className="font-bold">{p.title}</div>
                                  <div className="text-xs opacity-90 mb-2">{p.note}</div>
                                  <ul className="text-xs space-y-1 list-disc pl-4 opacity-90">
                                    {p.bullets.map((b,i)=>(<li key={i}>{b}</li>))}
                                  </ul>
                                </button>
                              ))}
                            </div>
                          </div>
                        </>
                      )}

                      {service!=='job' ? (
                        <div className="grid md:grid-cols-3 gap-3 mb-3">
                          <div>
                            <Label>Timeline</Label>
                            <Select value={timeline} onValueChange={setTimeline}>
                              <SelectTrigger className="w-full"><SelectValue placeholder="When do you need it?" /></SelectTrigger>
                              <SelectContent>
                                {(TIMELINES[service||'web']||[]).map(opt => (
                                  <SelectItem key={opt} value={opt}>{opt}</SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            {errors.timeline && <div className="text-red-400 text-xs mt-1">{errors.timeline}</div>}
                          </div>
                          <div>
                            <Label>Budget Range</Label>
                            <Select value={budget} onValueChange={setBudget}>
                              <SelectTrigger className="w-full"><SelectValue placeholder="Select range" /></SelectTrigger>
                              <SelectContent>
                                {(BUDGETS[service||'web']||[]).map(opt => (
                                  <SelectItem key={opt} value={opt}>{opt}</SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            {errors.budget && <div className="text-red-400 text-xs mt-1">{errors.budget}</div>}
                          </div>
                          <div>
                            <Label>Project Type</Label>
                            <Select value={service||''} onValueChange={setService}>
                              <SelectTrigger className="w-full"><SelectValue placeholder="Select type" /></SelectTrigger>
                              <SelectContent>
                                <SelectItem value="social">Social Media</SelectItem>
                                <SelectItem value="web">Website</SelectItem>
                                <SelectItem value="app">App</SelectItem>
                                <SelectItem value="job">Job Offer</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      ) : (
                        <div className="grid md:grid-cols-2 gap-3 mb-3">
                          <div>
                            <Label>Role Title</Label>
                            <Input aria-invalid={!!errors.jobRole} value={jobRole} onChange={(e)=>setJobRole(e.target.value)} placeholder="e.g., Frontend Engineer" />
                            {errors.jobRole && <div className="text-red-400 text-xs mt-1">{errors.jobRole}</div>}
                          </div>
                          <div>
                            <Label>Employment Type</Label>
                            <Select value={jobType} onValueChange={setJobType}>
                              <SelectTrigger className="w-full"><SelectValue placeholder="Select type" /></SelectTrigger>
                              <SelectContent>
                                <SelectItem value="Full-time">Full-time</SelectItem>
                                <SelectItem value="Part-time">Part-time</SelectItem>
                                <SelectItem value="Contract">Contract</SelectItem>
                                <SelectItem value="Internship">Internship</SelectItem>
                              </SelectContent>
                            </Select>
                            {errors.jobType && <div className="text-red-400 text-xs mt-1">{errors.jobType}</div>}
                          </div>
                          <div className="md:col-span-2">
                            <Label>Link to Job Description</Label>
                            <Input value={jobLink} onChange={(e)=>setJobLink(e.target.value)} placeholder="https://..." />
                          </div>
                        </div>
                      )}

                      <div className="mb-3">
                        <Label>{service==='job' ? 'Notes' : 'Project Description'}</Label>
                        <Textarea value={desc} onChange={(e)=>setDesc(e.target.value)} placeholder={service==='job' ? 'Share a brief about the role, team, and expectations...' : 'Describe your project, goals, and any specific requirements...'} rows={6} />
                      </div>

                      {service!=='job' && (
                        <div className="mb-2">
                          <div className="text-sm font-semibold mb-2">Additional Options (Optional)</div>
                          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-2">
                            {EXTRA_SERVICES.map(es => (
                              <label key={es} className={`px-3 py-2 rounded-lg border text-sm cursor-pointer select-none ${extras.includes(es)?'bg-white/90 dark:bg-white/20 border-[#a970ff66]':'bg-white/80 hover:bg-white/90 dark:bg-white/5 border-black/10 dark:border-white/15'}`}>
                                <input type="checkbox" className="mr-2" checked={extras.includes(es)} onChange={()=>toggleExtra(es)} />
                                {es}
                              </label>
                            ))}
                          </div>
                        </div>
                      )}

                      <div className="mt-4 flex justify-between">
                        <Button variant="outline" className="btn-outline-purple" onClick={prev}>Previous</Button>
                        <Button className="btn-primary-purple" onClick={next}>Next</Button>
                      </div>
                    </motion.div>
                  )}

                  {step===3 && (
                    <motion.div key="s3" initial={{opacity:0,y:8}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-8}}>
                      <h2 className="text-2xl font-extrabold title-gradient mb-2">Contact Information</h2>
                      <div className="grid md:grid-cols-2 gap-3">
                        <div>
                          <Label>Full Name</Label>
                          <Input aria-invalid={!!errors.name} value={name} onChange={(e)=>setName(e.target.value)} placeholder="Enter your full name" />
                          {errors.name && <div className="text-red-400 text-xs mt-1">{errors.name}</div>}
                        </div>
                        <div>
                          <Label>Email Address</Label>
                          <Input aria-invalid={!!errors.email} type="email" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="your.email@example.com" />
                          {errors.email && <div className="text-red-400 text-xs mt-1">{errors.email}</div>}
                        </div>
                        <div>
                          <Label>Phone Number</Label>
                          <Input value={phone} onChange={(e)=>setPhone(e.target.value)} placeholder="(123) 456-7890" />
                        </div>
                        <div>
                          <Label>Company/Organization</Label>
                          <Input value={company} onChange={(e)=>setCompany(e.target.value)} placeholder="Optional" />
                        </div>
                      </div>

                      <div className="mt-4 grid md:grid-cols-3 gap-3 text-sm">
                        <div className="p-3 rounded-lg bg-white/90 dark:bg-white/5 border border-black/10 dark:border-white/15"><div className="font-semibold mb-1">Service</div><div className="opacity-90">{summary.service || '-'}</div></div>
                        {summary.service==='web' && (<div className="p-3 rounded-lg bg-white/90 dark:bg-white/5 border border-black/10 dark:border-white/15"><div className="font-semibold mb-1">Package</div><div className="opacity-90">{summary.websitePkg}</div></div>)}
                        {summary.service!=='job' && (<div className="p-3 rounded-lg bg-white/90 dark:bg-white/5 border border-black/10 dark:border-white/15"><div className="font-semibold mb-1">Timeline</div><div className="opacity-90">{summary.timeline || '-'}</div></div>)}
                        {summary.service!=='job' && (<div className="p-3 rounded-lg bg-white/90 dark:bg-white/5 border border-black/10 dark:border-white/15"><div className="font-semibold mb-1">Budget</div><div className="opacity-90">{summary.budget || '-'}</div></div>)}
                        {summary.service==='job' && (<div className="p-3 rounded-lg bg-white/90 dark:bg-white/5 border border-black/10 dark:border-white/15"><div className="font-semibold mb-1">Role</div><div className="opacity-90">{summary.jobRole || '-'}</div></div>)}
                        {summary.service==='job' && (<div className="p-3 rounded-lg bg-white/90 dark:bg-white/5 border border-black/10 dark:border-white/15"><div className="font-semibold mb-1">Type</div><div className="opacity-90">{summary.jobType || '-'}</div></div>)}
                        {summary.extras.length>0 && summary.service!=='job' && (<div className="p-3 rounded-lg bg-white/90 dark:bg-white/5 border border-black/10 dark:border-white/15 md:col-span-2"><div className="font-semibold mb-1">Extras</div><div className="opacity-90">{summary.extras.join(', ')}</div></div>)}
                      </div>

                      <div className="mt-4 flex justify-between gap-2 flex-wrap">
                        <Button variant="outline" className="btn-outline-purple" onClick={prev}>Previous</Button>
                        <div className="flex gap-2">
                          <Button className="btn-outline-purple" onClick={() => {
                            const text = buildRequestText();
                            navigator.clipboard.writeText(text).then(()=> toast.success('Copied request to clipboard.')).catch(()=> toast.error('Copy failed.'))
                          }}>Copy details</Button>
                          <Button className="btn-primary-purple" onClick={handleSubmit}>Submit Quote Request</Button>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Contact helpers */}
            <aside className="space-y-3">
              <div className="glass-card p-4">
                <div className="font-extrabold title-gradient mb-1">Prefer to talk?</div>
                <div className="text-sm opacity-90">Get in touch with me directly.</div>
                <div className="mt-3 space-y-2 text-sm">
                  {BUSINESS.phone && <div><span className="opacity-70">Call: </span><a className="nav-link" href={`tel:${BUSINESS.phone.replace(/[^+\d]/g,'')}`}>{BUSINESS.phone}</a></div>}
                  {BUSINESS.email && <div><span className="opacity-70">Email: </span><a className="nav-link" href={`mailto:${BUSINESS.email}`}>{BUSINESS.email}</a></div>}
                  {BUSINESS.website && <div><span className="opacity-70">Website: </span><a className="nav-link" href={BUSINESS.website} target="_blank" rel="noreferrer">{BUSINESS.website.replace(/^https?:\/\//,'')}</a></div>}
                </div>
              </div>
              <div className="glass-card p-4">
                <div className="font-semibold mb-1">Business Hours</div>
                <div className="text-sm opacity-80">Mon–Fri: 9:00 AM – 6:00 PM (ET)</div>
              </div>
            </aside>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
