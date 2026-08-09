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
      "live": "https://thecrimsonthread.vercel.app",
      "thumb": "assets/img/projects/thecrimsonthread.png"
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
      "name": "ethobot3.2",
      "title": "Ethobot 3.2 — AI Ethics Education Assistant",
      "category": "agents",
      "language": "JavaScript",
      "summary": "Bilingual AI ethics learning environment with Socratic reasoning coaching, role-based ethical dilemmas, learner reflection, and teacher-facing analytics.",
      "tags": ["AI ethics", "Socratic dialogue", "bilingual"],
      "repo": "https://github.com/Educatian/ethobot3.2",
      "live": "https://ethobot32.vercel.app",
      "thumb": "assets/img/projects/ethobot32.webp"
    },
    {
      "name": "TINA1.01",
      "title": "TINA — Teacher Identity Navigation Assistant",
      "category": "agents",
      "language": "TypeScript",
      "summary": "Conversational assistant that walks pre-service and in-service teachers through reflective prompts on professional identity formation, with voice input, Hugging Face inference fallback, and PDF/DOCX export of the reflection record.",
      "tags": ["teacher identity", "reflection", "voice + LLM"],
      "repo": "https://github.com/Educatian/TINA1.01",
      "live": "https://tina-adie1.netlify.app",
      "thumb": "assets/img/projects/tina.png"
    },
    {
      "name": "sail",
      "title": "SAIL - Self-Regulated AI Learning Mentor",
      "category": "agents",
      "language": "TypeScript",
      "summary": "Self-regulated learning mentor for college and graduate students. Students plan a focused study session, work with Marin through Socratic prompts and graded hints, reflect on calibration and strategy use, and optionally contribute privacy-preserving spatial/context telemetry for research.",
      "tags": ["SRL", "AI mentor", "learning analytics", "telemetry"],
      "repo": "https://github.com/Educatian/sail",
      "live": "https://sail-dia.pages.dev",
      "thumb": "assets/img/projects/sail.png",
      "screenshots": [
        { "label": "Home", "src": "assets/img/projects/sail-home.png" },
        { "label": "Goal studio", "src": "assets/img/projects/sail-goal-studio.png" },
        { "label": "Active mentor", "src": "assets/img/projects/sail-mentor.png" },
        { "label": "Reflection", "src": "assets/img/projects/sail-reflection.png" },
        { "label": "Dashboard", "src": "assets/img/projects/sail-dashboard.png" },
        { "label": "Location context", "src": "assets/img/projects/sail-map-location.png" }
      ]
    },
    {
      "name": "virtual-makerspace",
      "title": "Virtual Makerspace",
      "category": "immersive-analytics",
      "language": "TypeScript",
      "summary": "VR research prototype built on the Meta Immersive Web SDK. Captures learning-behavior telemetry in a maker setting for downstream multimodal learning analytics.",
      "tags": ["VR", "Meta IWSDK", "MMLA"],
      "repo": "https://github.com/Educatian/virtual-makerspace",
      "live": "https://virtual-makerspace.pages.dev",
      "thumb": "assets/img/projects/virtual-makerspace.png"
    },
    {
      "name": "chalk-and-chance",
      "title": "Chalk & Chance — Teacher Simulation",
      "category": "immersive-analytics",
      "language": "Godot 4",
      "summary": "Browser-playable pixel classroom simulation for deliberate teaching practice. LLM-driven students that won't just accept an answer, proximity & withitness mechanics, lesson-under-pressure timing, seating-by-task, and a scored debrief with badges built around seven core teaching moves (Elicit, Extend, Revoice, Tell/Model, Praise, Redirect, Wait).",
      "tags": ["teacher simulation", "Godot 4", "LLM students", "deliberate practice"],
      "repo": "",
      "live": "https://chalk-and-chance.pages.dev/",
      "thumb": "assets/img/projects/chalk-and-chance.png"
    },
    {
      "name": "discourse-lens",
      "title": "Discourse Lens",
      "category": "immersive-analytics",
      "language": "Python",
      "summary": "Cross-field discourse map of Learning Sciences vs Educational Technology journal abstracts (2015–2025). MPNet embeddings, BERTopic, LLM-tagged threads, bootstrap inference, sensitivity sweeps.",
      "tags": ["BERTopic", "MPNet", "bibliometrics"],
      "repo": "https://github.com/Educatian/discourse-lens",
      "live": "https://educatian.github.io/discourse-lens/",
      "thumb": "assets/img/projects/discourse-lens.png"
    },
    {
      "name": "learning-theories-timeline",
      "title": "Learning Theories Timeline",
      "category": "immersive-analytics",
      "language": "JavaScript",
      "summary": "Interactive D3 timeline of learning theories, instructional design, AIED, learning analytics, EDM, QE, VR, and agentic AI. Built for graduate seminar onboarding.",
      "tags": ["D3", "history of learning", "interactive viz"],
      "repo": "https://github.com/Educatian/learning-theories-timeline",
      "live": "https://educatian.github.io/learning-theories-timeline/",
      "thumb": "assets/img/projects/learning-theories-timeline.png"
    },
    {
      "name": "counseling-graph-cscl",
      "title": "Counseling-Graph CSCL",
      "category": "immersive-analytics",
      "language": "TypeScript",
      "summary": "Knowledge-graph CSCL tool (Korean) for counseling and clinical psychology training. Renders concept networks from coursework artifacts and supports collaborative annotation.",
      "tags": ["CSCL", "knowledge graph", "counseling ed"],
      "repo": "https://github.com/Educatian/counseling-graph-cscl",
      "live": "https://educatian.github.io/counseling-graph-cscl/",
      "thumb": "assets/img/projects/counseling-graph-cscl.png"
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
      "live": ""
    },
    {
      "name": "cybersentinel",
      "title": "CyberSentinel",
      "category": "ethics-infra",
      "language": "HTML",
      "summary": "Reachy Mini WiFi treated as a cybersecurity teaching surface. Module builder's guide for graduate-student instructional designers, with task scaffolds and reflection prompts.",
      "tags": ["Reachy Mini", "cybersecurity teaching", "ID guide"],
      "repo": "https://github.com/Educatian/cybersentinel",
      "live": "https://educatian.github.io/cybersentinel/",
      "thumb": "assets/img/projects/cybersentinel.png"
    },
    {
      "name": "research-assistant-ai-workflow-en",
      "title": "Research-Assistant AI Workflow",
      "category": "ethics-infra",
      "language": "HTML",
      "summary": "Obsidian × Claude Code 7-day setup guide for PhDs and researchers. Daily lessons, code snippets, and reproducible folder layouts for an AI-augmented research stack.",
      "tags": ["Obsidian", "Claude Code", "research workflow"],
      "repo": "https://github.com/Educatian/research-assistant-ai-workflow-en",
      "live": "https://educatian.github.io/research-assistant-ai-workflow-en/",
      "thumb": "assets/img/projects/research-assistant-ai-workflow-en.png"
    },
    {
      "name": "educatian.github.io",
      "title": "Educatian — Open Guides",
      "category": "ethics-infra",
      "language": "HTML",
      "summary": "Hub of self-contained guides covering education data × analysis matrix, RQ fit, LAK vs EDM, telemetry design, agentic XR workflow, ISD to LDT, and more. Each guide is a single static HTML page.",
      "tags": ["open guides", "hub", "research methods"],
      "repo": "https://github.com/Educatian/educatian.github.io",
      "live": "https://educatian.github.io/",
      "thumb": "assets/img/projects/educatian-hub.png"
    },
    {
      "name": "Swarm_ID",
      "title": "Design Tension Studio",
      "category": "immersive-analytics",
      "language": "JavaScript",
      "summary": "Instructional-design studio that turns design tension into a living network. Maps human judgment, institutional friction, and AI reasoning across policy, platform, evidence, and scale on one responsive D3 force graph.",
      "tags": ["D3 network", "design tensions", "ID studio"],
      "repo": "https://github.com/Educatian/Swarm_ID",
      "live": "https://swarmid.vercel.app",
      "thumb": "assets/img/projects/swarm-id.png"
    },
    {
      "name": "aiedobservatory",
      "title": "AI Education Policy Observatory",
      "category": "ethics-infra",
      "language": "HTML",
      "summary": "Independent policy-surveillance workspace making AI-in-education policy legible: state-by-state guidance on AI use, assessment, privacy, and implementation, traced back to source documents. 51 states and 248+ documents tracked.",
      "tags": ["AI policy", "policy atlas", "K-12 + HE"],
      "repo": "https://github.com/Educatian/aiedobservatory",
      "live": "https://aiedobservatory-five.vercel.app",
      "thumb": "assets/img/projects/aiedobservatory.png"
    },
    {
      "name": "fieldexplorer1.0",
      "title": "FieldExplorer",
      "category": "immersive-analytics",
      "language": "TypeScript",
      "summary": "Digital curator for the Learning Sciences: explore the academic field as a navigable research space rather than a flat list, linking journals, conferences, topics, and comparison metrics in one canvas. 64 journals, 23 conferences, 18 categories.",
      "tags": ["field map", "Learning Sciences", "research network"],
      "repo": "https://github.com/Educatian/fieldexplorer1.0",
      "live": "https://fieldexplorer10.vercel.app",
      "thumb": "assets/img/projects/fieldexplorer.png"
    },
    {
      "name": "code-defense-lab-mvp",
      "title": "Code Defense Lab",
      "category": "ethics-infra",
      "language": "JavaScript",
      "summary": "Academic-integrity surface for the AI era: 'AI use is allowed, understanding is required.' Six short checkpoints help students defend the code they submit even when AI helped write it, with professor and student workspaces and a results view.",
      "tags": ["academic integrity", "AI use", "CS education"],
      "repo": "https://github.com/Educatian/code-defense-lab-mvp",
      "live": "https://educatian.github.io/code-defense-lab-mvp/",
      "thumb": "assets/img/projects/code-defense-lab.png"
    },
    {
      "name": "peerpilot-mvp",
      "title": "PeerPilot",
      "category": "agents",
      "language": "JavaScript",
      "summary": "Peer-review training ground for graduate researchers. Read a manuscript, write a structured review, and compare with experts; Reviewer Mode and Author Mode rehearse both sides of editorial critique, with an instructor portal.",
      "tags": ["peer review", "researcher training", "blind review"],
      "repo": "https://github.com/Educatian/peerpilot-mvp",
      "live": "https://educatian.github.io/peerpilot-mvp/",
      "thumb": "assets/img/projects/peerpilot.png"
    },
    {
      "name": "datasandbox-toolkit",
      "title": "DataSandbox Toolkit",
      "category": "immersive-analytics",
      "language": "TypeScript",
      "summary": "Build a dashboard, build data literacy. Nine scaffolded activities take graduate students from framing an answerable data question to a live Vega-Lite workbench and an AI stakeholder critic, authored over real data the whole way (TAMU EHRD 689).",
      "tags": ["data literacy", "Vega-Lite", "dashboard authoring"],
      "repo": "https://github.com/Educatian/datasandbox3.1",
      "live": "https://datasandbox-toolkit.pages.dev",
      "thumb": "assets/img/projects/datasandbox-toolkit.png"
    },
    {
      "name": "TeachPlay",
      "title": "TeachPlay — AI-Enhanced Educational Game Design",
      "category": "agents",
      "language": "HTML",
      "summary": "A twelve-session University of Alabama microcredential handbook and learner platform that connects educational-game objectives, prototypes, playtesting, evidence review, and verifiable credentials.",
      "tags": ["game design", "microcredential", "evidence portfolio"],
      "repo": "https://github.com/Educatian/TeachPlay",
      "live": "https://teachplay.dev/",
      "thumb": "assets/img/projects/teachplay.webp"
    },
    {
      "name": "counselcue",
      "title": "CounselCue — VR Counselor Training",
      "category": "immersive-analytics",
      "language": "C# / Unity",
      "summary": "Korean one-to-one counselor-training simulation for practicing how counseling micro-skills, gaze, posture, facial movement, and response timing work together in relational delivery.",
      "tags": ["VR simulation", "counselor education", "embodied interaction"],
      "repo": "https://github.com/Educatian/counselcue",
      "live": "https://educatian.github.io/counselcue/",
      "thumb": "assets/img/projects/counselcue.webp"
    },
    {
      "name": "korean-classroom-ai-teacher-training-sim",
      "title": "Korean Classroom VR Teacher Response Simulator",
      "category": "immersive-analytics",
      "language": "C# / Unity",
      "summary": "Teacher-education prototype for rehearsing responses to elementary students showing emotional and behavioral distress in a realistic Korean classroom, with affect dynamics and evidence-centered debriefing.",
      "tags": ["VR teacher simulation", "SEL", "evidence-centered design"],
      "repo": "https://github.com/Educatian/korean-classroom-ai-teacher-training-sim",
      "live": "",
      "thumb": "assets/img/projects/korean-vr-teacher-sim.webp"
    },
    {
      "name": "vr-safety-training",
      "title": "VR Safety Training Explorer",
      "category": "immersive-analytics",
      "language": "C# / Unity",
      "summary": "OpenXR safety-training campus with five workplace zones, hands-on hazard controls, deterministic assessment, telemetry, and grounded Rocketbox NPC coaching.",
      "tags": ["OpenXR", "safety training", "NPC coaching"],
      "repo": "https://github.com/Educatian/vr-safety-training",
      "live": "",
      "thumb": "assets/img/projects/vr-safety-training.webp"
    },
    {
      "name": "GeckoGripLabUnity",
      "title": "GeckoGrip Lab",
      "category": "immersive-analytics",
      "language": "C# / Unity",
      "summary": "Interactive Unity learning lab for exploring bio-inspired directional dry adhesion through gecko-foot structures, pad cartridges, surface coupons, and shear testing.",
      "tags": ["bio-inspired design", "Unity lab", "engineering education"],
      "repo": "https://github.com/Educatian/GeckoGripLabUnity",
      "live": "",
      "thumb": "assets/img/projects/geckogrip.webp"
    },
    {
      "name": "PineMorphLabUnity",
      "title": "PineMorph Lab",
      "category": "immersive-analytics",
      "language": "C# / Unity",
      "summary": "Interactive engineering lab that models pine-cone-inspired bilayer actuation and lets learners vary design inputs, run a test, and inspect the resulting deformation.",
      "tags": ["biomimicry", "Unity lab", "mechanical engineering"],
      "repo": "https://github.com/Educatian/PineMorphLabUnity",
      "live": "",
      "thumb": "assets/img/projects/pinemorph.webp"
    },
    {
      "name": "ConcussionVRPrototypeUnity",
      "title": "Concussion VR Prototype",
      "category": "immersive-analytics",
      "language": "C# / Unity",
      "summary": "Immersive rehabilitation research prototype combining a calm virtual environment with gaze-stabilization, memory, and reaction activities for iterative expert review.",
      "tags": ["VR health", "gaze interaction", "rehabilitation prototype"],
      "repo": "https://github.com/Educatian/ConcussionVRPrototypeUnity",
      "live": "",
      "thumb": "assets/img/projects/concussion-vr.webp"
    },
    {
      "name": "nrf-sel-stage",
      "title": "NRF SEL Simulation Stage",
      "category": "immersive-analytics",
      "language": "JavaScript / Godot",
      "summary": "WebXR social-emotional-learning simulation stage for co-investigator testing, including facial Action Unit inspection and controlled scenario rehearsal.",
      "tags": ["WebXR", "SEL", "facial action units"],
      "repo": "https://github.com/Educatian/nrf-sel-stage",
      "live": "https://educatian.github.io/nrf-sel-stage/"
    },
    {
      "name": "korea-compnlp-handson",
      "title": "Computational NLP Hands-on",
      "category": "immersive-analytics",
      "language": "Jupyter Notebook",
      "summary": "Korean-language computational NLP workshop materials and Colab exercises for education researchers, covering a reproducible path from text preparation to analysis.",
      "tags": ["computational NLP", "Colab", "research methods"],
      "repo": "https://github.com/Educatian/korea-compnlp-handson",
      "live": "",
      "thumb": "assets/img/projects/korea-compnlp.webp"
    },
    {
      "name": "cipherfell",
      "title": "Cipherfell",
      "category": "ethics-infra",
      "language": "HTML / JavaScript",
      "summary": "Medieval-village mystery RPG that teaches cybersecurity mental models—authentication, encryption, least privilege, and OSINT—without placing computers on screen.",
      "tags": ["cybersecurity", "game-based learning", "stealth assessment"],
      "repo": "https://github.com/Educatian/cipherfell",
      "live": "https://cipherfell.pages.dev",
      "thumb": "assets/img/projects/cipherfell.webp"
    },
    {
      "name": "algopolis",
      "title": "Algopolis",
      "category": "ethics-infra",
      "language": "HTML / JavaScript",
      "summary": "Three-dimensional strategy simulation in which learners design the algorithm governing a city while reasoning about computational thinking and AI ethics trade-offs.",
      "tags": ["AI ethics", "computational thinking", "strategy simulation"],
      "repo": "https://github.com/Educatian/algopolis",
      "live": "https://ancient-pebble-944.higgsfield.gg/",
      "thumb": "assets/img/projects/algopolis.webp"
    },
    {
      "name": "kels-curator-bot",
      "title": "KELS Curator Bot",
      "category": "ethics-infra",
      "language": "JavaScript",
      "summary": "Discord research-community curator that supports private reading queues, public digests, onboarding threads, safety rails, and repeatable knowledge-sharing workflows.",
      "tags": ["research community", "Discord automation", "knowledge curation"],
      "repo": "https://github.com/Educatian/kels-curator-bot",
      "live": "https://educatian.github.io/kels-curator-bot/",
      "thumb": "assets/img/projects/kels-curator.webp"
    },
    {
      "name": "spaceinvaders",
      "title": "Space Invaders Learning Gamelets",
      "category": "immersive-analytics",
      "language": "GDScript / Godot",
      "summary": "Browser-playable Godot gamelets that connect arcade mechanics with orbital-motion and physics-learning activities used as worked examples in TeachPlay.",
      "tags": ["educational gamelets", "Godot", "physics learning"],
      "repo": "https://github.com/Educatian/spaceinvaders",
      "live": "https://educatian.github.io/spaceinvaders/",
      "thumb": "assets/img/projects/spaceinvaders.webp"
    },
    {
      "name": "codex_collaboratione-learn",
      "title": "Codex Collaboration for E-Learning",
      "category": "ethics-infra",
      "language": "HTML",
      "summary": "Open tutorial for building interactive e-learning with Codex, covering iterative instructional design, web deployment, and SCORM packaging.",
      "tags": ["Codex", "SCORM", "instructional design workflow"],
      "repo": "https://github.com/Educatian/codex_collaboratione-learn",
      "live": ""
    },
    {
      "name": "CRAFT-",
      "title": "CRAFT — Runtime and Authoring Framework for Training",
      "category": "ethics-infra",
      "language": "Python",
      "summary": "Experimental runtime and authoring framework for creating structured AI-supported training experiences and reusable instructional workflows.",
      "tags": ["authoring framework", "training", "AI workflow"],
      "repo": "https://github.com/Educatian/CRAFT-",
      "live": ""
    },
    {
      "name": "civilform",
      "title": "CivilForm",
      "category": "agents",
      "language": "JavaScript",
      "summary": "AI evaluation and feedback prototype for civil-engineering students' Autodesk Revit projects, using vision-assisted review to support formative design critique.",
      "tags": ["engineering education", "design feedback", "Gemini Vision"],
      "repo": "https://github.com/Educatian/civilform",
      "live": ""
    },
    {
      "name": "CoReg_Companion",
      "title": "CoReg Companion",
      "category": "agents",
      "language": "TypeScript",
      "summary": "Co-regulated learning companion prototype with coaching dialogue, learning goals, adaptive scaffolding, and structured reflection for student learning sessions.",
      "tags": ["co-regulated learning", "AI companion", "adaptive scaffolding"],
      "repo": "https://github.com/Educatian/CoReg_Companion",
      "live": ""
    }
  ]
};
