window.__cvProjects = {
  "categories": [
    {
      "id": "agents",
      "label": "AI agents & adaptive systems",
      "summary": "Tutors, advisors, and conversational interfaces built for graduate-level instruction and research support."
    },
    {
      "id": "immersive-analytics",
      "label": "Immersive & analytics prototypes",
      "summary": "VR research prototypes, interactive visualizations, and discourse / video analytics pipelines."
    },
    {
      "id": "ethics-infra",
      "label": "AI ethics & teaching infrastructure",
      "summary": "Open guides, fine-tuning recipes, and instructional surfaces for safe AI use in higher education."
    }
  ],
  "projects": [
    {
      "name": "thecrimsonthread",
      "title": "The Crimson Thread",
      "category": "agents",
      "language": "TypeScript",
      "summary": "PhD program planner: Gemini-generated milestone timelines, Gantt chart view, ICS calendar export, and history persistence. Designed for Instructional Leadership doctoral students at the University of Alabama.",
      "tags": ["PhD planning", "Gantt", "Gemini", "ICS export"],
      "repo": "https://github.com/Educatian/thecrimsonthread",
      "live": ""
    },
    {
      "name": "ThinkMethod",
      "title": "ThinkMethod",
      "category": "agents",
      "language": "TypeScript",
      "summary": "AI-powered research design and methodology advisor: interrogates a draft research question, then recommends data, design, measurement, and validity strategies.",
      "tags": ["methodology", "research design", "agent"],
      "repo": "https://github.com/Educatian/ThinkMethod",
      "live": ""
    },
    {
      "name": "bamatext",
      "title": "BamaText — Adaptive Physics Textbook",
      "category": "agents",
      "language": "TypeScript",
      "summary": "Adaptive Physics textbook that retunes to each learner in real time: mastery tracking, interactive simulations, and a Socratic AI tutor that probes reasoning rather than handing out answers. React + Vite + Supabase + Google Gemini.",
      "tags": ["adaptive learning", "Physics", "Socratic AI tutor"],
      "repo": "https://github.com/Educatian/bamatext",
      "live": ""
    },
    {
      "name": "BamaTide",
      "title": "UA Game Design Microcredential",
      "category": "agents",
      "language": "TypeScript",
      "summary": "MOOC-style platform for the University of Alabama Educational Game Design microcredential program. Lesson sequencing, evidence submission editor, certificate issuance, discussion board, and a Gemini-powered course tutor scoped per view.",
      "tags": ["microcredential", "MOOC", "game design", "Gemini tutor"],
      "repo": "https://github.com/Educatian/BamaTide",
      "live": ""
    },
    {
      "name": "ETHOBOT_ENG",
      "title": "Ethobot — AI Ethics Education Chatbot",
      "category": "agents",
      "language": "JavaScript",
      "summary": "Firebase-backed AI ethics chatbot for graduate-level instruction. English deployment of the Ethobot research line (with 3.1 and 3.2 follow-ups), Express server with Firestore-stored conversations and Analytics instrumentation.",
      "tags": ["AI ethics", "chatbot", "Firebase"],
      "repo": "https://github.com/Educatian/ETHOBOT_ENG",
      "live": "https://educatian.github.io/ETHOBOT_ENG/"
    },
    {
      "name": "TINA1.01",
      "title": "TINA — Teacher Identity Navigation Assistant",
      "category": "agents",
      "language": "TypeScript",
      "summary": "Conversational assistant that walks pre-service and in-service teachers through reflective prompts on professional identity formation, with voice input, Hugging Face inference fallback, and PDF/DOCX export of the reflection record.",
      "tags": ["teacher identity", "reflection", "voice + LLM"],
      "repo": "https://github.com/Educatian/TINA1.01",
      "live": ""
    },
    {
      "name": "virtual-makerspace",
      "title": "Virtual Makerspace",
      "category": "immersive-analytics",
      "language": "TypeScript",
      "summary": "VR research prototype built on the Meta Immersive Web SDK. Captures learning-behavior telemetry in a maker setting for downstream multimodal learning analytics.",
      "tags": ["VR", "Meta IWSDK", "MMLA"],
      "repo": "https://github.com/Educatian/virtual-makerspace",
      "live": ""
    },
    {
      "name": "chalk-and-chance",
      "title": "Chalk & Chance — Teacher Simulation",
      "category": "immersive-analytics",
      "language": "Godot 4",
      "summary": "Browser-playable pixel classroom simulation for deliberate teaching practice. LLM-driven students that won't just accept an answer, proximity & withitness mechanics, lesson-under-pressure timing, seating-by-task, and a scored debrief with badges built around seven core teaching moves (Elicit, Extend, Revoice, Tell/Model, Praise, Redirect, Wait).",
      "tags": ["teacher simulation", "Godot 4", "LLM students", "deliberate practice"],
      "repo": "",
      "live": "https://chalk-and-chance.pages.dev/"
    },
    {
      "name": "discourse-lens",
      "title": "Discourse Lens",
      "category": "immersive-analytics",
      "language": "Python",
      "summary": "Cross-field discourse map of Learning Sciences vs Educational Technology journal abstracts (2015–2025). MPNet embeddings, BERTopic, LLM-tagged threads, bootstrap inference, sensitivity sweeps.",
      "tags": ["BERTopic", "MPNet", "bibliometrics"],
      "repo": "https://github.com/Educatian/discourse-lens",
      "live": "https://educatian.github.io/discourse-lens/"
    },
    {
      "name": "learning-theories-timeline",
      "title": "Learning Theories Timeline",
      "category": "immersive-analytics",
      "language": "JavaScript",
      "summary": "Interactive D3 timeline of learning theories, instructional design, AIED, learning analytics, EDM, QE, VR, and agentic AI. Built for graduate seminar onboarding.",
      "tags": ["D3", "history of learning", "interactive viz"],
      "repo": "https://github.com/Educatian/learning-theories-timeline",
      "live": "https://educatian.github.io/learning-theories-timeline/"
    },
    {
      "name": "counseling-graph-cscl",
      "title": "Counseling-Graph CSCL",
      "category": "immersive-analytics",
      "language": "TypeScript",
      "summary": "Knowledge-graph CSCL tool (Korean) for counseling and clinical psychology training. Renders concept networks from coursework artifacts and supports collaborative annotation.",
      "tags": ["CSCL", "knowledge graph", "counseling ed"],
      "repo": "https://github.com/Educatian/counseling-graph-cscl",
      "live": "https://educatian.github.io/counseling-graph-cscl/"
    },
    {
      "name": "videoanalysis",
      "title": "Multimodal Video Analysis Kit",
      "category": "immersive-analytics",
      "language": "Python",
      "summary": "Research kit for multimodal video analysis: timestamped pose/speech/affect features, exporters for downstream sequence and process-mining workflows.",
      "tags": ["multimodal", "pose", "MMLA"],
      "repo": "https://github.com/Educatian/videoanalysis",
      "live": ""
    },
    {
      "name": "ethicsedullm",
      "title": "Ethics-Ed LLM",
      "category": "ethics-infra",
      "language": "Python",
      "summary": "Small LLM fine-tuning recipe specialized for AI ethics in educational design. Includes evaluation prompts and refusal-style probes calibrated for graduate coursework.",
      "tags": ["LLM fine-tuning", "AI ethics"],
      "repo": "https://github.com/Educatian/ethicsedullm",
      "live": "https://educatian.github.io/ethicsedullm/"
    },
    {
      "name": "cybersentinel",
      "title": "CyberSentinel",
      "category": "ethics-infra",
      "language": "HTML",
      "summary": "Reachy Mini WiFi treated as a cybersecurity teaching surface. Module builder's guide for graduate-student instructional designers, with task scaffolds and reflection prompts.",
      "tags": ["Reachy Mini", "cybersecurity teaching", "ID guide"],
      "repo": "https://github.com/Educatian/cybersentinel",
      "live": "https://educatian.github.io/cybersentinel/"
    },
    {
      "name": "research-assistant-ai-workflow-en",
      "title": "Research-Assistant AI Workflow",
      "category": "ethics-infra",
      "language": "HTML",
      "summary": "Obsidian × Claude Code 7-day setup guide for PhDs and researchers. Daily lessons, code snippets, and reproducible folder layouts for an AI-augmented research stack.",
      "tags": ["Obsidian", "Claude Code", "research workflow"],
      "repo": "https://github.com/Educatian/research-assistant-ai-workflow-en",
      "live": "https://educatian.github.io/research-assistant-ai-workflow-en/"
    },
    {
      "name": "educatian.github.io",
      "title": "Educatian — Open Guides",
      "category": "ethics-infra",
      "language": "HTML",
      "summary": "Hub of self-contained guides covering education data × analysis matrix, RQ fit, LAK vs EDM, telemetry design, agentic XR workflow, ISD to LDT, and more. Each guide is a single static HTML page.",
      "tags": ["open guides", "hub", "research methods"],
      "repo": "https://github.com/Educatian/educatian.github.io",
      "live": "https://educatian.github.io/"
    }
  ]
};
