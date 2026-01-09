import React from 'react'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'

export default function NotFound(){
  return (
    <>
      <Nav />
      <main id="main" className="relative py-20">
        <div className="mx-auto w-full px-4 sm:px-6 max-w-4xl text-center">
          <h1 className="title-gradient text-4xl font-extrabold mb-3">Page Not Found</h1>
          <p className="opacity-80">The page you’re looking for doesn’t exist.</p>
          <div className="mt-4"><a className="nav-link" href="/">Go home</a></div>
        </div>
      </main>
      <Footer />
    </>
  )
}

