export const about = `As a little girl, I used to sit beside my mom with a notebook full of questions — “Why does the computer hum?”, “What’s inside a lightbulb?”, “Can I build something like this one day?” I didn’t just want to use technology — I wanted to understand it, shape it, and make it beautiful.

That same wonder has stayed with me. Today, I’m majoring in Computer Science and Mathematics at PSU Honors College, designing AI‑powered tools, building elegant web apps, and using code as both a language and an act of care. Whether I’m creating a generative AI tutor, optimizing backend APIs, or hand‑crafting social media designs from scratch, I always ask: How can this help someone?

I’ve worked with startups, churches, nonprofits, and research teams — writing clean code with Flask, React, and Python; deploying intelligent systems using TensorFlow, LangChain, and Gemini API; and designing visual content that’s not just useful, but truly felt.

I love building things that are functional and thoughtful — tech that serves people, especially those who aren’t always seen in the design process. I’m currently seeking an internship where I can keep learning, creating, and contributing to something meaningful — with heart, humility, and lots of joyful curiosity.

Let’s connect — I’m always excited to learn, build, and bring a little light to tech. ✨`

export const projects = [
  // AI/ML
  {
    title: 'Project Manager',
    summary: 'AI-driven project manager using the Gemini API for task extraction, prioritization, and planning.',
    tech: ['Python','Flask','Gemini API','LangChain'],
    links: [{ label:'GitHub', href:'https://github.com/hemen-babis/AI-Project-Manager' }],
    category: 'AI/ML',
    image: '/images/aipm.png',
    tagline: 'Automate, prioritize, and plan with GenAI.',
    top: true,
  },
  {
    title: 'Research Assistant',
    summary: 'RAG mini app to summarize PDFs and answer questions with citations.',
    tech: ['Python','Flask','LangChain','OpenAI API'],
    links: [{ label:'GitHub', href:'https://github.com/hemen-babis/ai-research-assistant' }],
    category: 'AI/ML',
    image: 'public/images/image copy 2.png',
    tagline: 'Ask papers anything.',
    top: true,
  },
  {
    title: 'To‑Do Manager',
    summary: 'AI‑powered task manager built with Flask; dynamic prioritization with ML.',
    tech: ['Python','Flask','ML'],
    links: [{ label:'GitHub', href:'https://github.com/hemen-babis/ai-todo-manager' }],
    category: 'AI/ML',
    image: 'public/images/image.png',
    tagline: 'Stay organized with intelligent priorities.',
  },
  {
    title: 'Stock Price Predictor',
    summary: 'Time‑series modeling to forecast stock prices.',
    tech: ['Python','Pandas','scikit-learn'],
    links: [{ label:'GitHub', href:'https://github.com/hemen-babis/stock-price-predictor' }],
    category: 'AI/ML',
    image: 'public/images/image copy.png',
    tagline: 'Practical ML for financial series.',
  },
  // Web / Apps
  {
    title: 'TemarLije',
    summary: 'Convert any text or URL into a study pack: flashcards, summaries, and explanations.',
    tech: ['TypeScript','React','FastAPI','OpenAI'],
    links: [{ label:'GitHub', href:'https://github.com/hemen-babis/TemarLije' }],
    category: 'Web Development',
    image: 'public/images/temarlije.png',
    tagline: 'Learn smarter from any content.',
    top: true,
  },
  {
    title: 'Quantum Superposition & Entanglement',
    summary: 'Python notebooks exploring quantum computing fundamentals.',
    tech: ['Python','Quantum Computing'],
    links: [{ label:'GitHub', href:'https://github.com/hemen-babis/quantum-superposition-entanglement' }],
    category: 'School Projects',
    image: 'public/images/quantum.png',
    tagline: 'Hands‑on quantum concepts.',
  },
  {
    title: 'Portfolio',
    summary: 'Things I’ve built while learning how to turn curiosity into thoughtful, useful technology.',
    tech: ['HTML','CSS','JS'],
    demo: { label:'Live', href:'https://hemenbabis.com/' },
    links: [{ label:'GitHub', href:'https://github.com/hemen-babis/portfolio_new' }],
    category: 'Web Development',
    image: 'public/images/portfolio.png',
    tagline: 'Curious mind. Thoughtful tech.',
  },
   {
    title: 'Portfolio (legacy)',
    summary: 'Previous portfolio site hosted on GitHub Pages.',
    tech: ['HTML','CSS','JS'],
    demo: { label:'Live', href:'https://hemen-babis.github.io/hemen-portfolio/' },
    links: [{ label:'GitHub', href:'https://github.com/hemen-babis/hemen-portfolio' }],
    category: 'Web Development',
    image: 'public/images/legacy.png',
    tagline: 'Early portfolio on GH Pages.',
  },
  // Systems / Coursework
  {
    title: 'Rust Queue Simulator',
    summary: 'Queueing system simulator implemented in Rust.',
    tech: ['Rust'],
    links: [{ label:'GitHub', href:'https://github.com/hemen-babis/rustqueuesim' }],
    category: 'School Projects',
    image: 'public/images/rust.png',
    tagline: 'Discrete event simulation in Rust.',
    top: true,
  },
  {
    title: 'Text Analyzer',
    summary: 'Java app to analyze text statistics and patterns.',
    tech: ['Java'],
    links: [{ label:'GitHub', href:'https://github.com/hemen-babis/TextAnalyzer' }],
    category: 'School Projects',
    image: 'public/images/text.png',
    tagline: 'Classic analysis tool, clean Java.',
  },
  {
    title: 'CS 302 Projects',
    summary: 'C++ coursework: data structures and algorithms implementations.',
    tech: ['C++'],
    links: [{ label:'GitHub', href:'https://github.com/hemen-babis/CS-302Projects' }],
    category: 'School Projects',
    image: 'public/images/cs302.png',
    tagline: 'DS&A in modern C++',
  },
]
export const experience = [
  {
    role: 'Applied AI/ML Intern — Vision‑Language Models',
    company: 'Stealth Startup',
    period: 'Aug 2025 – Present · San Francisco · Hybrid',
    bullets: [
      'Designing evaluation strategies for vision‑language models in scientific domains (bioinformatics / microscopy).',
      'Defining domain‑specific metrics; benchmarking <100B models for structured comparison.',
      'Building reproducible fine‑tuning/analysis pipelines and VLM experimentation repos.',
      'Exploring agentic video understanding tools (e.g., TwelveLabs) for multimodal lab data.',
      'Supporting agent design with LangGraph + AWS primitives (memory, tools, feedback loops).',
    ],
  },
  {
    role: 'AI/ML Engineer Intern',
    company: 'Agents4Hire',
    period: 'Sep 2024 – Jun 2025 · Remote',
    bullets: [
      'Deployed an AI‑driven project management tool with Gemini API; improved team productivity.',
      'Optimized automation models (Python/TensorFlow) to reduce manual tasks and overhead.',
      'Integrated a real‑time task prioritization system (Flask) and improved user engagement.',
    ],
  },
  {
    role: 'Web Developer',
    company: 'Freelance',
    period: 'Mar 2023 – Present · Remote',
    bullets: [
      'Designed/developed 10+ websites for nonprofits, churches, and small orgs (marketing, events, donations).',
      'Full‑stack performance and SEO improvements (‑40% load time, +25% traffic).',
      'React/Node/Flutter across responsive, accessible, purpose‑driven experiences.',
    ],
  },
  {
    role: 'Freelance Visual Content Designer',
    company: 'Freelance',
    period: 'Jan 2022 – Present · Hybrid',
    bullets: [
      'Created 50+ original social media graphics (no templates) for 15+ organizations.',
      'Increased reach/engagement 30–40% with targeted visual storytelling and content calendars.',
    ],
  },
]

export const achievements = [
  'Honors Laurels Scholarship — PSU Honors College (Aug 2023)',
  'Tuition‑Free Degree Award — PSU Honors College (Aug 2023)',
  "President's List",
  "Dean's List",
  'Vision Academy Excellence Award',
  'National Honors Society Certificate',
]

export const volunteering = [
  'American Red Cross — Supervisor (Mar 2022 – Jul 2024)',
  "John’s Repentance — Social Media Manager (Dec 2023 – Present)",
]

export const topSkills = [
  'Generative AI', 'Full‑Stack Development', 'Machine Learning', 'Python', 'Creative Design'
]

export const languagesList = [
  { name:'Amharic', level:'Native/Bilingual' },
  { name:'English', level:'Native/Bilingual' }
]

export const certifications = [
  'BCLP — Interview Preparation: Own Your Story Job Simulation (Forage) · ID: iXG4pFrYZLhtY4kTj'
]

export const memberships = [
  'NSBE (National Society of Black Engineers)',
  'SWE (Society of Women Engineers)',
  'ColorStack',
  'Rewriting the Code',
  'AI4ALL',
]

// Condensed skills map for the Skills section
export const skills = {
  languages: ['JavaScript', 'TypeScript', 'Python', 'C++', 'Java'],
  frameworks: ['React', 'Node.js', 'Next.js', 'PyTorch', 'TensorFlow', 'LangChain'],
  tools: ['GitHub', 'Docker', 'Figma', 'Vercel'],
  subjects: ['AI/ML', 'NLP', 'Computer Vision', 'RAG', 'Bioinformatics', 'Genomics']
}
