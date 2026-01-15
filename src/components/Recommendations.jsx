import React from 'react'

function Avatar({ src, name, size=32 }){
  const [err, setErr] = React.useState(false)
  const initials = name.split(' ').map(s=>s[0]).slice(0,2).join('').toUpperCase()
  return (
    <div className="relative" style={{ width: size, height: size }}>
      {!err && src ? (
        <img src={src} alt={name} width={size} height={size}
             onError={()=>setErr(true)}
             className="rounded-full object-cover border border-black/10 dark:border-white/15" />
      ) : (
        <div className="rounded-full grid place-items-center text-[11px] font-bold bg-white/70 dark:bg-white/10 border border-black/10 dark:border-white/15"
             style={{ width: size, height: size }}>{initials}</div>
      )}
    </div>
  )
}

export default function Recommendations(){
  const items = [
    {
      name: 'Kidus Anteneh Adugna',
      title: 'Founder @ Stealth | X Engineer @Google | GenAI Expert | CS+Math+Entr @UMD',
      meta: 'December 16, 2025 · Managed Hemen directly',
      quote: `I worked with Hemen during her AI Software Engineering internship at my startup. She took charge of various backend tasks, including model fine-tuning, AI agent orchestration, RAG, and context engineering, alongside traditional responsibilities like authentication, performance optimization and many others.

The energy she brought daily was contagious and significantly boosted the team's performance. She truly drove our team culture, fostering a psychologically safe environment that enhanced both creativity and collective problem-solving. Her time with us was nothing short of transformative. I cannot recommend her highly enough to anyone seeking an exceptional engineer who prioritizes the mission and the team above all else! 🙏🏾🚀🔥`,
      img: '/images/recs/kidus.jpg',
    },
    {
      name: 'Jesse Cotari, PhD',
      title: 'Building the human interface between science and AI',
      meta: 'October 13, 2025 · Mentor',
      quote: `I worked with Hemen during a research internship focused on applied AI/ML ops. The primary goal of the internship was learning, and she took that seriously. She made a genuine effort to understand technical concepts deeply and in a hands-on way rather than taking AI coding shortcuts, demonstrating a commitment to building her skills from the ground up. Hemen is hardworking and eager to develop her technical abilities; she invested significant time into learning new tools and methodologies throughout the internship. I wish her well as she continues to grow her technical skills and hope the experience was valuable for her professional development.`,
      img: '/images/recs/jesse.jpg',
    },
  ]
  return (
    <section className="py-14">
      <div className="mx-auto w-full px-4 sm:px-6 max-w-5xl">
        <div className="text-center mb-6">
          <h2 className="text-3xl font-extrabold title-gradient">Recommendations</h2>
          <p className="text-sm text-foreground/70 mt-2">What collaborators and mentors say</p>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          {items.map((r)=> (
            <article key={r.name} className="glass-card p-5 flex items-start gap-4 border border-white/30 dark:border-white/15 shadow-[0_12px_30px_rgba(0,0,0,0.18)]">
              <Avatar src={r.img} name={r.name} size={250} />
              <div className="min-w-0">
                <div className="text-sm font-semibold leading-snug">{r.name}</div>
                <div className="text-xs opacity-70 leading-snug">{r.title}</div>
                {r.meta && <div className="text-[11px] opacity-60 leading-snug">{r.meta}</div>}
                <p className="mt-2 text-sm whitespace-pre-wrap text-foreground/90">“{r.quote}”</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
