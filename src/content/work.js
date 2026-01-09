// Editing guide (super simple):
// 1) Posters/Ads
//    - Put your images in: public/posters/
//    - Rename your files to match any filename below (e.g., poster-01.jpg).
//    - The grid will use /posters/<filename>. You can edit titles/captions later.
// 2) Websites
//    - Edit the websites array: title + url + short caption. Image is optional.
// 3) Social
//    - Add social items (Linktree, TikTok, IG) with a title + link.

export const WORK_CATEGORIES = [
  'Websites',
  'Social',
  'Posters & Ads',
]

// Posters/Ads — just drop files in public/posters/ with these names
export const posters = [
  // Keep only files that actually exist in public/posters/
  { id: 'poster-01', title: 'Poster 01', filename: 'poster-01.jpg', caption: 'Logo', tools: ['Illustrator'] },
]

// Websites — fill your real links here
export const websites = [
  { id: 'yohannesneseha', title: 'Yohannes Neseha', url: 'https://yohannesneseha.org/', caption: 'Informational site', tools: ['Webflow','SEO'], image: 'images/work/johns.png' },
  { id: 'hemenbabis', title: 'Hemen Babis - Portfolio', url: 'https://hemenbabis.com', caption: 'Personal portfolio', tools: ['React','Tailwind'], image: 'images/portfolio.png' },
  { id: 'md-tutoring', title: 'Maryland Tutoring Services', url: 'https://www.marylandtutoringservices.org/', caption: 'Tutoring business site', tools: ['Google Sites'], image: 'public/images/work/mts.png' },
  { id: 'stgeorge', title: 'St. George PDX EOTC', url: '', caption: 'Church website (in progress)', tools: ['React, HTML, CSS',], status: 'Not published', image: 'public/images/work/church.png'},
  { id: 'lukas-art', title: 'Lukas Art', url: '', caption: 'Artist portfolio site', tools: ['React','Tailwind'], status: 'Not published', image: 'public/images/work/seble.png'},
  { id: 'hamlet-house', title: 'Hamlet House AFH', url: '', caption: 'Adult foster home', tools: ['React','Tailwind'] },
  { id: 'blessing-house', title: 'Blessing House AFH', url: '', caption: 'Adult foster home', tools: ['React','Tailwind'] },
  { id: 'blue-moon', title: 'Blue Moon Group Home', url: '', caption: 'Adult foster home', tools: ['React','Tailwind'] },
]

// Social — add pages you manage (use real links)
export const social = [
  { id: 'johns-repentance', title: "John's Repentance", url: '', caption: 'Managed multi-platform social presence', tools: ['TikTok','Instagram','YouTube', 'Telegram'] },
  { id: 'maryland-tutoring-services', title: 'Maryland Tutoring Services', url: '', caption: 'Managed social growth and content', tools: ['Instagram','TikTok', 'Linkedin', 'Youtube', 'Telegram'] },
  { id: 'meserete-hiwot-sunday-school', title: 'Meserete Hiwot Sunday School', url: '', caption: 'Managed social growth and content', tools: ['Instagram','TikTok', 'Telegram', 'Youtube'] },
]

// Build unified list for the gallery
const normalize = (p) => (p ? p.replace(/^public\//,'/') : '')

export const workItems = [
  // Posters → Posters/Advertisements category
  ...posters.map(p => ({
    id: p.id,
    title: p.title,
    category: 'Posters & Ads',
    image: `/posters/${p.filename}`,
    caption: p.caption,
    tools: p.tools,
    links: [{ label: 'Full', href: `/posters/${p.filename}` }],
  })),

  // Websites
  ...websites.map(w => ({
    id: w.id,
    title: w.title,
    category: 'Websites',
    image: normalize(w.image || ''),
    caption: w.caption,
    tools: w.tools,
    links: w.url ? [{ label: 'Visit Site', href: w.url }] : [],
    status: w.status,
  })),

  // Social
  ...social.map(s => ({
    id: s.id,
    title: s.title,
    category: 'Social',
    image: normalize(s.image || ''),
    caption: s.caption,
    tools: s.tools,
    links: s.url ? [{ label: 'View', href: s.url }] : [],
  })),
]
