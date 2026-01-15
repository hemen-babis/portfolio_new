export const about = `As a little girl, I used to sit beside my mom with a notebook full of questions - “Why does the computer hum?”, “What’s inside a lightbulb?”, “Can I build something like this one day?” I didn’t just want to use technology - I wanted to understand it, shape it, and make it beautiful.

That same wonder has stayed with me. Today, I’m majoring in Computer Science and Mathematics at PSU Honors College, designing AI‑powered tools, building elegant web apps, and using code as both a language and an act of care. Whether I’m creating a generative AI tutor, optimizing backend APIs, or hand‑crafting social media designs from scratch, I always ask: How can this help someone?

I’ve worked with startups, churches, nonprofits, and research teams - writing clean code with Flask, React, and Python; deploying intelligent systems using TensorFlow, LangChain, and Gemini API; and designing visual content that’s not just useful, but truly felt.

I love building things that are functional and thoughtful - tech that serves people, especially those who aren’t always seen in the design process. I’m currently seeking an internship where I can keep learning, creating, and contributing to something meaningful - with heart, humility, and lots of joyful curiosity.

Let’s connect - I’m always excited to learn, build, and bring a little light to tech. ✨`

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
    caseStudy: {
      problem: 'Manual task intake and prioritization slowed execution for fast-moving teams.',
      process: 'Built a Gemini-powered pipeline to extract tasks, rank urgency, and generate action plans inside a Flask app.',
      result: 'Improved team productivity with clearer priorities and faster planning cycles.',
    },
  },
  {
    title: 'Research Assistant',
    summary: 'RAG mini app to summarize PDFs and answer questions with citations.',
    tech: ['Python','Flask','LangChain','OpenAI API'],
    links: [{ label:'GitHub', href:'https://github.com/hemen-babis/ai-research-assistant' }],
    category: 'AI/ML',
    image: '/images/image copy 2.png',
    tagline: 'Ask papers anything.',
    top: true,
    caseStudy: {
      problem: 'Researchers lose time searching long PDFs for precise references.',
      process: 'Implemented retrieval + citation grounding with chunking, embeddings, and a Q&A interface.',
      result: 'Faster literature review with transparent, source-linked answers.',
    },
  },
  {
    title: 'To‑Do Manager',
    summary: 'AI‑powered task manager built with Flask; dynamic prioritization with ML.',
    tech: ['Python','Flask','ML'],
    links: [{ label:'GitHub', href:'https://github.com/hemen-babis/ai-todo-manager' }],
    category: 'AI/ML',
    image: '/images/image.png',
    tagline: 'Stay organized with intelligent priorities.',
  },
  {
    title: 'Stock Price Predictor',
    summary: 'Time‑series modeling to forecast stock prices.',
    tech: ['Python','Pandas','scikit-learn'],
    links: [{ label:'GitHub', href:'https://github.com/hemen-babis/stock-price-predictor' }],
    category: 'AI/ML',
    image: '/images/image copy.png',
    tagline: 'Practical ML for financial series.',
  },
  // Web / Apps
  {
    title: 'TemarLije',
    summary: 'Convert any text or URL into a study pack: flashcards, summaries, and explanations.',
    tech: ['TypeScript','React','FastAPI','OpenAI'],
    links: [{ label:'GitHub', href:'https://github.com/hemen-babis/TemarLije' }],
    category: 'Web Development',
    image: '/images/temarlije.png',
    tagline: 'Learn smarter from any content.',
    top: true,
    caseStudy: {
      problem: 'Students need quick, structured study materials from messy sources.',
      process: 'Built a React + FastAPI workflow that parses inputs and generates structured study assets.',
      result: 'Condensed dense content into usable study packs in minutes.',
    },
  },
  {
    title: 'Quantum Superposition & Entanglement',
    summary: 'Python notebooks exploring quantum computing fundamentals.',
    tech: ['Python','Quantum Computing'],
    links: [{ label:'GitHub', href:'https://github.com/hemen-babis/quantum-superposition-entanglement' }],
    category: 'School Projects',
    image: '/images/quantum.png',
    tagline: 'Hands‑on quantum concepts.',
  },
  {
    title: 'Portfolio',
    summary: 'Things I’ve built while learning how to turn curiosity into thoughtful, useful technology.',
    tech: ['HTML','CSS','JS'],
    demo: { label:'Live', href:'https://hemenbabis.com/' },
    links: [{ label:'GitHub', href:'https://github.com/hemen-babis/portfolio_new' }],
    category: 'Web Development',
    image: '/images/portfolio.png',
    tagline: 'Curious mind. Thoughtful tech.',
  },
   {
    title: 'Portfolio (legacy)',
    summary: 'Previous portfolio site hosted on GitHub Pages.',
    tech: ['HTML','CSS','JS'],
    demo: { label:'Live', href:'https://hemen-babis.github.io/hemen-portfolio/' },
    links: [{ label:'GitHub', href:'https://github.com/hemen-babis/hemen-portfolio' }],
    category: 'Web Development',
    image: '/images/legacy.png',
    tagline: 'Early portfolio on GH Pages.',
  },
  // Systems / Coursework
  {
    title: 'Rust Queue Simulator',
    summary: 'Queueing system simulator implemented in Rust.',
    tech: ['Rust'],
    links: [{ label:'GitHub', href:'https://github.com/hemen-babis/rustqueuesim' }],
    category: 'School Projects',
    image: '/images/rust.png',
    tagline: 'Discrete event simulation in Rust.',
    top: true,
  },
  {
    title: 'Text Analyzer',
    summary: 'Java app to analyze text statistics and patterns.',
    tech: ['Java'],
    links: [{ label:'GitHub', href:'https://github.com/hemen-babis/TextAnalyzer' }],
    category: 'School Projects',
    image: '/images/text.png',
    tagline: 'Classic analysis tool, clean Java.',
  },
  {
    title: 'CS 302 Projects',
    summary: 'C++ coursework: data structures and algorithms implementations.',
    tech: ['C++'],
    links: [{ label:'GitHub', href:'https://github.com/hemen-babis/CS-302Projects' }],
    category: 'School Projects',
    image: '/images/cs302.png',
    tagline: 'DS&A in modern C++',
  },
]
export const experience = [
  {
    role: 'Applied AI/ML Intern - Vision-Language Models',
    company: 'Stealth Startup',
    period: 'Aug 2025 - Oct 2025 · San Francisco, California, United States · Hybrid',
    bullets: [
      'Designed evaluation strategies for vision-language models in scientific domains, with emphasis on bioinformatics and microscopy imagery.',
      'Defined and implemented domain-specific performance metrics to benchmark model utility.',
      'Researched and tested <100B-parameter models for structured evaluation and comparison.',
      'Built reusable pipelines for fine-tuning and analysis of VLMs with custom datasets.',
      'Explored integration of agentic video understanding tools like TwelveLabs for multimodal lab data.',
      'Supported agent design with LangGraph and AWS primitives (memory, tool use, feedback loops).',
      'Maintained organized, documented repos for reproducible experiments.',
    ],
  },
  {
    role: 'AI/ML Engineer Intern',
    company: 'Agents4Hire',
    period: 'Sep 2024 - Jun 2025 · San Francisco Bay Area · Remote',
    bullets: [
      'Achieved a 30% productivity increase by developing and deploying an AI-driven project management tool using the Gemini API.',
      'Boosted operational efficiency by optimizing business automation models with Python and TensorFlow, reducing manual tasks.',
      'Cut operational overhead by designing and integrating a real-time task prioritization system using Flask.',
      'Enhanced user engagement by 25% through AI-driven solutions and close collaboration with full-stack engineers.',
    ],
  },
  {
    role: 'Web Developer',
    company: 'Freelance',
    period: 'Mar 2023 - Present · Portland, Oregon, United States · Remote',
    bullets: [
      'Designed and developed 10+ custom websites for private organizations, nonprofits, and churches ranging from marketing sites to event and donation platforms.',
      'Leveraged React, Node.js, and Flutter to create responsive, accessible, and purpose-driven digital experiences.',
      'Improved site traffic by 25% through full-stack performance optimization and SEO enhancements; reduced load times by 40% via backend refactoring and asset compression.',
      'Collaborated with community teams to launch meaningful web solutions that increased user engagement by 30%.',
    ],
  },
  {
    role: 'Freelance Visual Content Designer',
    company: 'Freelance',
    period: 'Jan 2022 - Present · Hybrid',
    bullets: [
      'Created 50+ original, from-scratch social media graphics (no templates) using Canva for 15+ businesses, nonprofits, and churches.',
      'Increased post reach and engagement by 30-40% across Instagram, Facebook, and LinkedIn through targeted visual storytelling.',
      'Collaborated with marketing leads and directors to align content with brand identity, campaign goals, and audience demographics.',
      'Contributed to sustained follower growth and community engagement for multiple organizations by developing consistent content calendars and compelling visuals.',
    ],
  },
  {
    role: 'Software Engineer Intern',
    company: 'Maryland Tutoring Services',
    period: 'Feb 2023 - Aug 2024 · Maryland, United States · Remote',
    bullets: [
      'Improved response time by developing a generative AI-powered tutoring assistant using LangChain.',
      'Reduced downtime by 15% and increased system performance by refactoring and optimizing backend logic in Flask and FastAPI.',
      'Boosted query processing speed by 30% by automating data preprocessing pipelines using Python and Pandas.',
      'Streamlined recruitment cycles and onboarding by leading software engineer hiring efforts.',
    ],
  },
  {
    role: 'Marketing and Administrative Assistant',
    company: 'Xpose',
    period: 'Jun 2022 - Sep 2022 · Portland, Oregon, United States · Remote',
    bullets: [
      'Coordinated and led volunteer teams of up to 15 members for events and outreach, improving project efficiency and increasing community engagement by 20%.',
      'Designed and created social media content using Canva, increasing online engagement by 35% within three months through targeted posts that improved brand visibility.',
      'Researched and identified potential donors and grant opportunities, contributing to securing $4000 in funding by identifying five viable sources for grants and donations.',
      'Managed website updates and supported recruitment processes, improving website user experience and increasing web traffic by 25%.',
    ],
  },
]

export const achievements = [
  'Honors Laurels Scholarship - PSU Honors College (Aug 2023)',
  'Tuition‑Free Degree Award - PSU Honors College (Aug 2023)',
  "President's List",
  "Dean's List",
  'Vision Academy Excellence Award',
  'National Honors Society Certificate',
]

export const volunteering = [
  'American Red Cross - Supervisor (Mar 2022 – Jul 2024)',
  "John’s Repentance - Social Media Manager (Dec 2023 – Present)",
]

export const topSkills = [
  'Generative AI', 'Full‑Stack Development', 'Machine Learning', 'Python', 'Creative Design'
]

export const languagesList = [
  { name:'Amharic', level:'Native/Bilingual' },
  { name:'English', level:'Native/Bilingual' }
]

export const certifications = [
  'BCLP - Interview Preparation: Own Your Story Job Simulation (Forage) · ID: iXG4pFrYZLhtY4kTj'
]

export const memberships = [
  'NSBE (National Society of Black Engineers)',
  'SWE (Society of Women Engineers)',
  'ColorStack',
  'Rewriting the Code',
  'AI4ALL',
]

export const organizations = [
  { name: 'AI4ALL', logo: '/images/orgs/ai4all.png' },
  { name: 'Rewriting the Code', logo: '/images/orgs/rewriting-the-code.png' },
  { name: 'MLT', logo: '/images/orgs/mlt.png' },
  { name: 'ColorStack', logo: '/images/orgs/colorstack.png' },
  { name: 'NSBE', logo: '/images/orgs/nsbe.png' },
  { name: 'NHS', logo: '/images/orgs/nhs.png' },
]

// Condensed skills map for the Skills section
export const skills = {
  languages: ['JavaScript', 'TypeScript', 'Python', 'C++', 'Java'],
  frameworks: ['React', 'Node.js', 'Next.js', 'Flutter', 'PyTorch', 'TensorFlow', 'LangChain'],
  tools: ['GitHub', 'Docker', 'Figma', 'Vercel'],
  subjects: ['AI/ML', 'NLP', 'Computer Vision', 'RAG', 'Bioinformatics', 'Genomics']
}
