import React from 'react'
import { projects as projData } from '@/content/profile'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'

export default function ProjectsConstellation() {
  const nodes = projData.map((p, i) => ({
    id: i,
    title: p.title,
    blurb: p.summary,
    tags: p.tech,
    link: (p.links && p.links[0] && p.links[0].href) || '#',
    x: [10, 40, 65, 25, 55][i % 5],
    y: [10, 30, 55, 65, 45][i % 5],
  }))

  return (
    <section className="relative py-24">
      <div className="mx-auto w-full px-4 sm:px-6">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#9B59B6] via-[#E74C3C] to-[#F1C40F] mb-6">Projects</h2>
        <div className="relative hidden lg:block h-[70vh] rounded-[16px] overflow-hidden">
          <svg className="absolute inset-0 w-full h-full">
            {nodes.slice(1).map((n, i) => (
              <line key={i}
                x1={`${nodes[0].x}%`} y1={`${nodes[0].y}%`}
                x2={`${n.x}%`} y2={`${n.y}%`}
                stroke="url(#grad)" strokeWidth="1.5" strokeLinecap="round"
                style={{ strokeDasharray: 240, strokeDashoffset: 240, animation: 'dash 1.8s ease forwards', animationDelay: `${i * 0.2}s` }}
              />
            ))}
            <defs>
              <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#9B59B6" />
                <stop offset="60%" stopColor="#E74C3C" />
                <stop offset="100%" stopColor="#F1C40F" />
              </linearGradient>
            </defs>
          </svg>
          <style>{`@keyframes dash{to{stroke-dashoffset:0}}`}</style>
          {nodes.map((n) => (
            <a key={n.id} href={n.link} className="absolute transform -translate-x-1/2 -translate-y-1/2 w-[280px]" style={{ left: `${n.x}%`, top: `${n.y}%` }}>
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle className="heading">{n.title}</CardTitle>
                  <CardDescription className="text-foreground">{n.blurb}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-2 flex-wrap">
                    {n.tags.map((t) => <Badge key={t} className="tag-neon">{t}</Badge>)}
                  </div>
                </CardContent>
              </Card>
            </a>
          ))}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:hidden">
          {nodes.map((n) => (
            <a key={n.id} href={n.link}>
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle className="heading">{n.title}</CardTitle>
                  <CardDescription className="text-foreground">{n.blurb}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-2 flex-wrap">
                    {n.tags.map((t) => <Badge key={t} className="tag-neon">{t}</Badge>)}
                  </div>
                </CardContent>
              </Card>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
