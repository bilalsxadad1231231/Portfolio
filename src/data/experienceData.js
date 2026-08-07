/**
 * Career data, transcribed from the CV source of truth at
 * D:\job-apply\profile.yaml and the project docs under
 * D:\Company projects\docs\projects\.
 *
 * Attribution rules from those docs, which must not be mixed:
 *   - AxonBuild employment  -> 10 production systems
 *   - Nexa Home             -> co-founded startup, never an AxonBuild bullet
 *   - JARVIS                -> academic final year project, never AxonBuild
 */

export const ROLES = [
  {
    id: 'axonbuild',
    company: 'AxonBuild',
    title: 'Full Stack AI Engineer',
    location: 'Lahore, Pakistan',
    start: '2025-08',
    end: null,
    summary:
      'Shipped ten production AI systems — agentic assistants, RAG platforms, and multi-tenant SaaS — across FastAPI, Node.js, and React.',
    bullets: [
      'Engineered LLM pipelines with GPT-4o tool calling, streaming responses, and Langfuse tracing for token cost and quality evaluation.',
      'Deployed to AWS Lambda, Azure, DigitalOcean, and Firebase with GitHub Actions CI/CD and per-tenant container isolation.',
    ],
  },
  {
    id: 'itsolera-dev',
    company: 'ITSOLERA',
    title: 'AI Developer',
    location: 'Islamabad, Pakistan',
    start: '2024-11',
    end: '2025-04',
    summary:
      'Built generative AI and machine learning solutions across LLM fine-tuning, NLP, and computer vision pipelines.',
    bullets: [],
  },
  {
    id: 'itsolera-intern',
    company: 'ITSOLERA',
    title: 'Generative AI Intern',
    location: 'Islamabad, Pakistan',
    start: '2024-08',
    end: '2024-10',
    summary: 'First professional generative AI work, alongside the degree.',
    bullets: [],
  },
];

/** The ten systems shipped under the AxonBuild role. */
export const PRODUCTION_SYSTEMS = [
  {
    name: 'StepMate',
    domain: 'Matching · mobile',
    blurb:
      'AI study-partner matching for USMLE students. Conversational GPT-4o onboarding into a structured persona, then two-stage matching: Pinecone vector retrieval with metadata filters, followed by batched LLM evaluation.',
    stack: ['GPT-4o', 'Pinecone', 'Firebase Functions', 'Ionic React'],
    proof: 'Shipped to Google Play',
    link: 'https://www.mystepmate.com',
  },
  {
    name: "Nate's AI",
    domain: 'RAG · advisory',
    blurb:
      'Hierarchical RAG assistant for real-estate tax advisory, using hybrid Qdrant retrieval — dense plus BM25 reciprocal rank fusion across knowledge base and QA vectors.',
    stack: ['FastAPI', 'Qdrant', 'OpenAI embeddings', 'React', 'Clerk'],
    proof: '282 chats + 306 transcripts → ~4,800 QA pairs for ~$47',
    link: null,
  },
  {
    name: 'Halo',
    domain: 'Multi-agent · WhatsApp',
    blurb:
      'Consumer WhatsApp assistant orchestrating around 39 tools across parallel agents with a combiner stage and tier-gated access, plus a scheduler running cron-driven automations that push results without an incoming request.',
    stack: ['FastAPI', 'SQLAlchemy', 'OpenAI', 'Langfuse', 'React'],
    proof: '~39 tools across parallel agents',
    link: null,
  },
  {
    name: 'Komet',
    domain: 'Platform · multi-tenant',
    blurb:
      'Multi-tenant WhatsApp AI agent platform — deploy isolated agents backed by either GPT or n8n workflows, with per-tenant container isolation.',
    stack: ['FastAPI', 'OpenAI', 'n8n', 'Docker'],
    proof: 'Powers Halo in production',
    link: null,
  },
  {
    name: 'HonyakuOS',
    domain: 'Translation · enterprise',
    blurb:
      'Enterprise Japanese–English translation management platform with an AI-assisted Shunyaku Lite pipeline.',
    stack: ['AWS Lambda', 'OpenAI', 'React'],
    proof: 'Serverless on AWS',
    link: null,
  },
  {
    name: 'EkoMind',
    domain: 'Health · bilingual RAG',
    blurb:
      'Bilingual EN/FR mental-health application combining clinical RAG with generated therapeutic audio scripts.',
    stack: ['FastAPI', 'RAG', 'TTS'],
    proof: 'EN/FR clinical corpus',
    link: null,
  },
  {
    name: 'SafetyMapper',
    domain: 'Vision · compliance',
    blurb:
      'Upload a floor plan image and a three-layer vision-language pipeline proposes NFPA-informed placement of smoke detectors, fire extinguishers, and pull stations.',
    stack: ['VLM pipeline', 'FastAPI', 'Python'],
    proof: 'Three-layer VLM pipeline',
    link: 'https://github.com/AxonBuild/construction-rnd',
  },
  {
    name: 'Shopdog RAG Agent',
    domain: 'OCR · extraction',
    blurb:
      'Extraction pipeline for technical PDF service manuals: pulls embedded images, runs dual OCR (vision model plus classic), then an LLM judge and vision correction pass for tables and diagrams.',
    stack: ['VLM', 'OCR', 'Python', 'RAG'],
    proof: 'Dual-OCR with LLM judge',
    link: null,
  },
  {
    name: 'Tom Orent RAG',
    domain: 'RAG · knowledge base',
    blurb:
      'Hierarchical RAG over PDF knowledge bases, with both a custom web chat UI and a Streamlit interface.',
    stack: ['Python', 'RAG', 'Streamlit'],
    proof: 'Dual UI',
    link: 'https://github.com/AxonBuild/tom-orent-RAG',
  },
  {
    name: 'CLO Generator',
    domain: 'Education · LLM',
    blurb: 'Course learning outcome generation for academic programme design.',
    stack: ['Python', 'LLM'],
    proof: null,
    link: null,
  },
];

export const STARTUP = {
  name: 'Nexa Home',
  role: 'Co-founder',
  tenure: { start: '2026-04', end: null },
  team: 'Two co-founders — with Hamza',
  status: 'Pre-release',
  site: 'https://nexahome.co',
  demo: 'https://nexahome.co/demo',
  pitch:
    'A local-first smart home system. Control logic runs in the house, not a vendor cloud, so it keeps working when your internet does not — and your domestic routine stops being telemetry on someone else’s servers.',
  // From 01-overview.md, which is deliberate about not overstating the product.
  live: [
    '14-page marketing site',
    'Interactive 3D demo you can talk to in natural language',
    'AI chat hub with three engines and a deterministic fallback',
    'JWT auth, per-user home state, device event log',
    'Lead capture across four funnels, persisted to Postgres',
  ],
  building: ['Physical hub hardware', 'Device firmware', 'MQTT / Zigbee / Matter integrations'],
  technical: [
    {
      title: 'A 3D home built entirely from code',
      detail:
        'Procedural geometry and canvas-generated textures in React Three Fiber — zero external 3D asset files.',
    },
    {
      title: 'Four layers of AI fallback',
      detail:
        'Azure structured outputs → Claude → a server-side rules engine → a client-side intent engine. The demo still answers with the backend down.',
    },
    {
      title: 'One typed contract across every engine',
      detail:
        'Each engine returns {reply, chips, focus, patch}, so the frontend never knows which one answered.',
    },
  ],
  contribution: 'Product, design, and engineering. 58 of 58 commits.',
};

export const EDUCATION = {
  degree: 'BS in Computer Software Engineering',
  school: 'University of Engineering and Technology, Mardan',
  location: 'Mardan, PK',
  start: '2022-09',
  end: null,
  grade: '3.6 CGPA',
  fyp: {
    name: 'JARVIS Voice Assistant',
    team: 'Solo — design, architecture, and implementation',
    blurb:
      'An offline voice assistant that operates the computer autonomously: wake word, Whisper speech-to-text, and a LangGraph orchestrator routing to screen, browser, and system subgraphs.',
    detail:
      'Made a local 9B model reliable for agentic routing using forced tool choice, Pydantic-validated decisions, retry escalation, and heuristic fallbacks.',
    stack: ['LangGraph', 'LangChain', 'Qwen 3.5 9B', 'Faster-Whisper', 'YOLO', 'EasyOCR'],
  },
};

export const CERTIFICATIONS = [
  'AWS Fundamentals Specialization',
  'DevOps on AWS',
  'IBM AI Engineering',
  'LLMOps',
  'Google IT Automation with Python',
  'Machine Learning (DeepLearning.AI)',
  'Deep Learning Specialization',
  'Natural Language Processing',
  'TensorFlow: Advanced Techniques',
  'Databases for Data Scientists',
];

/** "2025-08" -> "Aug 2025"; null -> "Present". */
export const formatMonth = (value) => {
  if (!value) return 'Present';
  const [year, month] = value.split('-');
  const names = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  return `${names[Number(month) - 1]} ${year}`;
};
