import React from 'react'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import AboutText from '@/components/about/AboutText'
import FunFacts from '@/components/about/FunFacts'

export default function AboutMePage(){
  return (
    <>
      <Nav />
      <main className="relative py-16">
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
