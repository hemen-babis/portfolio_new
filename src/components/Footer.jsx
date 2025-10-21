import React from 'react'
import { Button } from '@/components/ui/button'
import { Linkedin, Github, FileDown } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="mt-10 border-t border-white/10 bg-[#0f061e]">
      <div className="mx-auto w-full px-4 sm:px-6 max-w-6xl py-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <a href="/hemenly-tech"><Button className="btn-primary-purple hover-ring">Hire Me</Button></a>
            <a href="/Hemen_Babis_Resume.pdf" target="_blank" rel="noreferrer"><Button className="btn-outline-purple inline-flex items-center gap-2 hover-ring"><FileDown className="w-4 h-4"/> Resume</Button></a>
          </div>
          <div className="flex items-center gap-3">
            <a title="LinkedIn" href="https://www.linkedin.com/in/hemen-babis" target="_blank" rel="noreferrer" className="text-white/80 hover:text-white"><Linkedin className="w-5 h-5"/></a>
            <a title="GitHub" href="https://github.com/hemen-babis" target="_blank" rel="noreferrer" className="text-white/80 hover:text-white"><Github className="w-5 h-5"/></a>
          </div>
        </div>
        <div className="mt-4 text-center text-[#aaaaaa]">© 2025 Hemen Babis · Built with React · Designed to Glow ✨</div>
      </div>
    </footer>
  )
}
