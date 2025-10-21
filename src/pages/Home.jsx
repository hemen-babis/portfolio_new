import React from 'react'
import App from '@/App'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import { usePageMeta } from '@/lib/usePageMeta'

export default function Home() {
  usePageMeta({
    title: 'Hemen Babis — Portfolio',
    description: 'AI/ML, CS, Math and Bioinformatics projects, experience and interactive labs by Hemen Babis.'
  })
  return (
    <>
      <Nav />
      <App />
      <Footer />
    </>
  )
}
