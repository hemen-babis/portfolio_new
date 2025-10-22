export const about = `As a little girl, I used to sit beside my mom with a notebook full of questions — “Why does the computer hum?”, “What’s inside a lightbulb?”, “Can I build something like this one day?” I didn’t just want to use technology — I wanted to understand it, shape it, and make it beautiful.

That same wonder has stayed with me. Today, I’m majoring in Computer Science and Mathematics at PSU Honors College, designing AI‑powered tools, building elegant web apps, and using code as both a language and an act of care. Whether I’m creating a generative AI tutor, optimizing backend APIs, or hand‑crafting social media designs from scratch, I always ask: How can this help someone?

I’ve worked with startups, churches, nonprofits, and research teams — writing clean code with Flask, React, and Python; deploying intelligent systems using TensorFlow, LangChain, and Gemini API; and designing visual content that’s not just useful, but truly felt.

I love building things that are functional and thoughtful — tech that serves people, especially those who aren’t always seen in the design process. I’m currently seeking an internship where I can keep learning, creating, and contributing to something meaningful — with heart, humility, and lots of joyful curiosity.

Let’s connect — I’m always excited to learn, build, and bring a little light to tech. ✨`

export const projects = [
  {
    title: 'AI Project Manager',
    summary: 'AI-powered project management tool using Gemini for task planning, prioritization, and team insights.',
    tech: ['Python', 'Gemini API', 'Flask', 'LangChain'],
    demo: { label: 'Demo', href: '#' },
    links: [{ label: 'GitHub', href: '#' }],
    category: 'AI/ML',
    image: '/images/aipm.png',
    tagline: 'Automate, prioritize, and plan with GenAI.',
    caseStudy: {
      problem: 'Manual task planning slowed teams; priorities were unclear and context was scattered.',
      process: 'Built a Gemini-powered planner (Flask) with LangChain tools. Iterated on prompts, ranking heuristics, and UX. Added calendar sync and Slack-style status updates.',
      result: 'Shipped a tool that reduced planning overhead by ~30% and increased on-time delivery for small teams.',
      images: ['/images/case-aipm-1.png','/images/case-aipm-2.png']
    }
  },
  {
    title: 'Quantum Algorithms',
    summary: 'Explorations in quantum algorithms to accelerate ML tasks; notes and prototype code from coursework/research.',
    tech: ['Python', 'Quantum Computing', 'NumPy'],
    links: [{ label: 'GitHub', href: '#' }],
    category: 'School Projects',
    image: '/images/quantum.png',
    tagline: 'Quantum ideas to speed up learning.',
    caseStudy: {
      problem: 'Classic ML pipelines struggled on certain combinatorial tasks.',
      process: 'Explored quantum-inspired kernels and toy circuits. Benchmarked prototypes; documented caveats and next steps.',
      result: 'Produced a set of notes and code that inform future research directions and coursework demos.',
      images: ['/images/case-quantum-1.png']
    }
  },
  {
    title: 'AI Research Assistant',
    summary: 'Summarizes PDFs and answers queries with retrieval and LLMs.',
    tech: ['Python', 'LangChain', 'OpenAI API', 'Flask'],
    links: [{ label: 'GitHub', href: '#' }],
    category: 'AI/ML',
    image: '/images/research.png',
    tagline: 'Ask papers anything.',
    caseStudy: {
      problem: 'Researchers lost time parsing long PDFs and extracting consistent answers.',
      process: 'Built a RAG mini with chunking, rerank, and answer synthesis. Tuned chunk sizes and citation formatting.',
      result: 'Faster literature review and consistent, cited summaries for common questions.',
      images: ['/images/case-research-1.png']
    }
  },
  {
    title: 'Portfolio Websites (selected)',
    summary: 'A collection of bespoke websites for nonprofits, churches, and small orgs with clean UX and strong performance.',
    tech: ['React', 'Node.js', 'Next.js', 'SEO'],
    links: [{ label: 'GitHub', href: '#' }],
    category: 'Web Development',
    image: '/images/websites.png',
    tagline: 'Clean, purposeful, fast.',
    caseStudy: {
      problem: 'Small orgs needed modern sites without heavy budgets.',
      process: 'Designed component libraries, built Next.js sites with a11y, SEO, and fast hosting. Iterated with stakeholders.',
      result: 'Cut load times ~40% and increased traffic/engagement for several orgs.',
      images: ['/images/case-web-1.png']
    }
  },
  {
    title: 'Church Social Media Campaign',
    summary: '50+ Canva graphics and micro campaigns that boosted engagement by ~40%.',
    tech: ['Canva', 'Branding'],
    links: [{ label: 'Drive', href: '#' }],
    category: 'Visual Content',
    image: '/images/social.png',
    tagline: 'Design that people feel.',
    caseStudy: {
      problem: 'Community messaging wasn’t resonating or consistent across platforms.',
      process: 'Created 50+ original graphics (no templates), storyboards, and micro-campaigns calibrated to each audience.',
      result: 'Improved reach and engagement by ~40% over a quarter.',
      images: ['/images/case-social-1.png']
    }
  }
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
