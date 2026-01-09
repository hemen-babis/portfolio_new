import React from 'react'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import AboutText from '@/components/about/AboutText'
import { usePageMeta } from '@/lib/usePageMeta'
import FunFacts from '@/components/about/FunFacts'

export default function AboutMePage(){
  usePageMeta({ title: 'About — Hemen Babis', description: 'About Hemen Babis: background, fun facts and interests across AI/ML, CS, Math and Bioinformatics.' })
  return (
    <>
      <Nav />
      <main id="main" className="relative py-16">
        <div className="mx-auto w-full px-4 sm:px-6 max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
            <div className="md:col-span-2">
              <AboutText />
            </div>
            <div className="md:col-span-1">
              <FunFacts />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
