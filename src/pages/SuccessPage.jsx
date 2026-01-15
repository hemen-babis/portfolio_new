import React from 'react'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'
import { usePageMeta } from '@/lib/usePageMeta'

export default function SuccessPage() {
  usePageMeta({ title: 'Success — Hemenly Tech', description: 'Your request has been sent.' })
  return (
    <>
      <Nav />
      <main id="main" className="relative py-16">
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -top-10 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-gradient-to-br from-[#FF6EC7]/30 to-[#9B59B6]/25 blur-3xl" />
          <div className="absolute top-40 -right-10 h-72 w-72 rounded-full bg-gradient-to-br from-[#F1C40F]/25 to-[#FF6EC7]/25 blur-3xl" />
          <div className="absolute bottom-0 left-0 h-72 w-72 rounded-full bg-gradient-to-br from-[#00B2FF]/20 to-[#6EE7FF]/20 blur-3xl" />
        </div>

        <div className="mx-auto w-full px-4 sm:px-6 max-w-3xl text-center">
          <div className="glass-card p-8 sm:p-10">
            <div className="mx-auto w-full max-w-xs">
              <img src="/images/success.gif" alt="Success" className="w-full h-auto rounded-xl" loading="lazy" decoding="async" />
            </div>
            <h1 className="mt-6 text-3xl sm:text-4xl font-extrabold title-gradient">Success!</h1>
            <p className="mt-3 text-foreground/80">
              Your request has been sent. I will review it and get back to you soon.
            </p>
            <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
              <Link to="/"><Button className="btn-primary-purple w-full sm:w-auto">Back to Home</Button></Link>
              <Link to="/projects"><Button variant="outline" className="btn-outline-purple w-full sm:w-auto">View Projects</Button></Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
