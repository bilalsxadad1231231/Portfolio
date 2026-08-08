/**
 * Career data, transcribed from the CV source of truth at
 * D:\job-apply\profile.yaml and the project docs under
 * D:\Company projects\docs\projects\.
 *
 * Attribution rules from those docs, which must not be mixed:
 *   - AxonBuild employment  -> the production systems listed below
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
      'Shipped nine production AI systems — agentic assistants, RAG platforms, enterprise workflow tools, and multi-tenant SaaS — from mobile apps through to serverless backends.',
    bullets: [
      'Built agent systems on typed contracts — Pydantic-schema structured outputs, forced tool choice, and deterministic fallbacks — so model decisions arrive as data to validate rather than prose to parse.',
      'Designed hierarchical retrieval — L0/L1/L2 chunking with dense and BM25 reciprocal rank fusion — across Qdrant, Pinecone, and Meilisearch.',
      'Ran LLM extraction over real client data: 282 chat exports and 306 meeting transcripts into ~4,800 QA pairs, indexed as 6,500 vectors for roughly $47.',
      'Deployed to AWS Lambda, Azure, DigitalOcean App Platform, and Firebase with GitHub Actions CI/CD, Alembic migrations, and per-tenant isolation; instrumented with Langfuse, Sentry, and BetterStack.',
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

/** The systems shipped under the AxonBuild role. */
export const PRODUCTION_SYSTEMS = [
  {
    name: 'StepMate',
    domain: 'Matching · mobile',
    blurb:
      'AI study-partner matching for medical exam students. Conversational GPT-4o onboarding fills a structured persona through tool calls instead of a form, then matching runs in two stages — Pinecone retrieval with hard filters, then batched LLM compatibility evaluation streamed back as cards. Missions and facets are config-driven, so a new exam type is a JSON file.',
    stack: ['GPT-4o', 'Pinecone', 'Firebase Functions', 'Ionic React', 'Pusher'],
    proof: 'Live on web and Google Play',
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
      'Multi-tenant platform for deploying WhatsApp AI agents. Each tenant gets an isolated Go agent provisioned on DigitalOcean App Platform, backed by either GPT or an n8n workflow, with vision, Whisper transcription, TTS voice notes, and per-message token cost tracking.',
    stack: ['Express', 'Prisma', 'PostgreSQL', 'OpenAI', 'Go / whatsmeow', 'n8n'],
    proof: 'One isolated agent per tenant; powers Halo',
    link: null,
  },
  {
    name: 'HonyakuOS',
    domain: 'Translation · enterprise',
    blurb:
      'Enterprise Japanese–English translation platform. A Next.js portal serves requesters, admins, and linguists over a Xano data hub, alongside the Shunyaku Lite pipeline: parse and chunk the document, match translation memory and termbase, translate multi-pass with an auditor review, then rebuild the original file from metadata — all one FastAPI container on AWS Lambda.',
    stack: ['Next.js', 'FastAPI', 'AWS Lambda', 'OpenRouter', 'DeepL', 'Meilisearch'],
    proof: 'Four translation modes, human-in-the-loop review',
    link: null,
  },
  {
    name: 'EkoMind',
    domain: 'Health · bilingual RAG',
    blurb:
      'Bilingual EN/FR mental-health app. The therapeutic pipeline extracts symptoms, retrieves matching clinical cases from Qdrant, detects limiting beliefs, and streams progressive solutions over SSE — offering generated audio scripts only once an LLM reranker clears a quality gate. Wearable biometrics feed the prompt as context.',
    stack: ['FastAPI', 'React Native', 'Qdrant', 'MongoDB', 'ElevenLabs'],
    proof: '174 clinical cases across two languages',
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
      'Extraction pipeline for technical PDF service manuals. It pulls embedded images, runs two OCR passes — a vision-language model and classic PaddleOCR — then has an LLM judge the disagreements and a vision pass adjudicate them against the image, so tables and diagrams survive into the RAG corpus.',
    stack: ['PaddleOCR-VL', 'PyMuPDF', 'FastAPI', 'OpenRouter'],
    proof: 'Dual-OCR with LLM judge',
    link: null,
  },
  {
    name: 'Tom Orent RAG',
    domain: 'RAG · knowledge base',
    blurb:
      'Hierarchical RAG over PDF knowledge bases. Documents chunk three levels deep — page, paragraph, content — and retrieval drills down through them fusing dense and BM25 results, with whole-document modes for material that should not be split.',
    stack: ['FastAPI', 'Qdrant', 'OpenAI', 'Streamlit'],
    proof: 'Three-level retrieval drill-down',
    link: 'https://github.com/AxonBuild/tom-orent-RAG',
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
      'An offline voice assistant that operates a Windows machine autonomously. Wake word and Faster-Whisper transcription feed an LLM router, which either answers or delegates to a LangGraph agent graph — it plans the task, routes each step to a screen, browser, or system agent, and replans when a step fails. Everything runs locally; no audio leaves the machine.',
    detail:
      'The real problem was making a local 9B model reliable enough to route on. Every decision boundary is a Pydantic schema with forced tool choice, escalating retries, and heuristic recovery, and UI grounding is layered — accessibility tree, then DOM, then vision, then YOLO and EasyOCR detection — so the cheapest exact method wins and vision is the last resort. I logged 122 comparative agent runs across grounding strategies, capturing per-step prompts, screenshots, and token cost.',
    stack: [
      'LangGraph',
      'LangChain',
      'Qwen 3.5 9B',
      'Faster-Whisper',
      'Porcupine',
      'YOLO',
      'EasyOCR',
      'PyQt',
    ],
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
