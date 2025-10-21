import React from 'react';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import { usePageMeta } from '@/lib/usePageMeta'

export default function ArticlesPage() {
  usePageMeta({ title: 'Articles — Hemen Babis', description: 'Essays, notes and articles by Hemen Babis.' })
  return (
    <>
      <Nav />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-extrabold title-gradient">Articles</h1>
        <p className="mt-4">Coming soon...</p>
      </div>
      <Footer />
    </>
  );
}
