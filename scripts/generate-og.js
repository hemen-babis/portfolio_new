// Generates a 1200x630 PNG og:image from an inline SVG template using sharp
import fs from 'fs'
import path from 'path'
import sharp from 'sharp'

const outDir = path.resolve(process.cwd(), 'public/og')
const outPng = path.join(outDir, 'og.png')

const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#9B59B6"/>
      <stop offset="50%" stop-color="#FF6EC7"/>
      <stop offset="100%" stop-color="#E0AA3E"/>
    </linearGradient>
    <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="4" stdDeviation="18" flood-color="rgba(0,0,0,0.4)"/>
    </filter>
  </defs>
  <rect width="1200" height="630" fill="#0d0717"/>
  <rect x="40" y="40" width="1120" height="550" rx="28" fill="url(#g)" opacity="0.12"/>
  <text x="80" y="250" font-family="Poppins, Arial, sans-serif" font-size="72" font-weight="800" fill="white">Hemen Babis</text>
  <text x="80" y="330" font-family="Poppins, Arial, sans-serif" font-size="36" fill="#eae6ff">AI/ML · CS · Math · Bioinformatics</text>
  <text x="80" y="420" font-family="Poppins, Arial, sans-serif" font-size="28" fill="#cfc7ff">Projects, experience and services</text>
  <circle cx="1050" cy="120" r="8" fill="#FF6EC7"/>
  <circle cx="1020" cy="160" r="6" fill="#9B59B6"/>
  <circle cx="1080" cy="200" r="10" fill="#E0AA3E"/>
</svg>`

if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true })
const png = await sharp(Buffer.from(svg)).png({ quality: 95 }).toBuffer()
fs.writeFileSync(outPng, png)
console.log('Generated', outPng)

