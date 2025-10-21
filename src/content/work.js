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
  { id: 'poster-01', title: 'Poster 01', filename: 'poster-01.jpg', caption: 'Logo', tools: ['Illustrator'] },
  { id: 'poster-02', title: 'Poster 02', filename: 'poster-02.jpg', caption: 'Event poster', tools: ['Photoshop'] },
  { id: 'poster-03', title: 'Poster 03', filename: 'poster-03.jpg', caption: 'Business flyer', tools: ['Canva'] },
  { id: 'poster-04', title: 'Poster 04', filename: 'poster-04.jpg', caption: 'Offer banner', tools: ['Illustrator'] },
  { id: 'poster-05', title: 'Poster 05', filename: 'poster-05.jpg', caption: 'Promo artwork', tools: ['Figma'] },
  { id: 'ad-01',     title: 'Ad 01',     filename: 'ad-01.jpg',     caption: 'Ad creative', tools: ['Photoshop'] },
  { id: 'ad-02',     title: 'Ad 02',     filename: 'ad-02.jpg',     caption: 'Ad creative', tools: ['Photoshop'] },
  { id: 'ad-03',     title: 'Ad 03',     filename: 'ad-03.jpg',     caption: 'Ad creative', tools: ['Photoshop'] },
]

// Websites — fill your real links here
export const websites = [
  { id: 'yohannesneseha', title: 'Yohannes Neseha', url: 'https://yohannesneseha.org/', caption: 'Informational site', tools: ['Webflow','SEO'] },
  { id: 'hemenbabis', title: 'Hemen Babis — Portfolio', url: 'https://hemenbabis.com', caption: 'Personal portfolio', tools: ['React','Tailwind'] },
  { id: 'md-tutoring', title: 'Maryland Tutoring Services', url: 'https://www.marylandtutoringservices.org/', caption: 'Tutoring business site', tools: ['Google Sites'] },
  { id: 'stgeorge', title: 'St. George PDX EOTC', url: '', caption: 'Church website (in progress)', tools: ['React, HTML, CSS',], status: 'Not published' },
  { id: 'lukas-art', title: 'Lukas Art', url: '', caption: 'Artist portfolio site', tools: ['React','Tailwind'], status: 'Not published' },
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
    image: '/logo.svg', // optional: replace with a screenshot later
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
    image: '/helix.png', // optional: replace with a cover graphic
    caption: s.caption,
    tools: s.tools,
    links: s.url ? [{ label: 'View', href: s.url }] : [],
  })),
]
