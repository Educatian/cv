const stats = [
  { value: "57", label: "Journal articles" },
  { value: "21", label: "Conference proceedings" },
  { value: "8", label: "Book chapters" },
  { value: "70", label: "Presentations" },
  { value: "$107K+", label: "Funded awards" },
];

const focusAreas = [
  "Generative AI in education",
  "Extended reality",
  "Learning analytics",
  "Game-based learning",
  "Teacher education",
  "Inclusive STEM design",
];

const honors = [
  "2026 Nellie Rose McCrory Faculty Excellence Award - Research Division",
  "2026 William T. Grant Foundation Scholars Program Finalist",
  "2025 Dean's Merit Award in Research Excellence",
  "2024 Outstanding iLEAD Paper Award",
];

const initiatives = [
  {
    name: "ReviewLens",
    badge: "2026",
    summary:
      "An AI-mediated simulation for learning scholarly peer review through epistemic immersion.",
    tags: ["peer review", "AI simulation"],
  },
  {
    name: "FieldExplorer",
    badge: "2026",
    summary:
      "A network-based visualization platform that supports novice researchers in academic decision-making.",
    tags: ["visual analytics", "research training"],
  },
  {
    name: "SpeakWise",
    badge: "2026",
    summary:
      "AI-mediated oral assessment for capturing real-time reasoning evidence traces.",
    tags: ["assessment", "AI"],
  },
  {
    name: "AL-GET",
    badge: "Funded",
    summary:
      "The Alabama Generative Engineering Textbook initiative for AI-enhanced personalized STEM learning.",
    tags: ["STEM", "adaptive learning"],
  },
  {
    name: "Cyber Sentinel Co-Pilot",
    badge: "Funded",
    summary:
      "Large language model-based professional development for Alabama secondary teacher training.",
    tags: ["teacher PD", "LLMs"],
  },
];

const publications = [
  {
    year: "2026",
    title:
      "An ethical framework for conversational AI in higher education: Toward an evidence-based ethical governance",
    authors: "Uddin, M., Moon, J., & Abu, S.",
    venue: "AI & Ethics",
    link: "https://doi.org/10.1007/s43681-026-01056-9",
    tags: ["GenAI", "Ethics", "Higher Ed"],
  },
  {
    year: "2026",
    title:
      "Decoding immersive learning states: A reproducible microgenetic pipeline for behavioral data in virtual reality safety training",
    authors: "Moon, J., Awoyemi, I., Abu, S., Marchiori, R., & Song, S.",
    venue: "Behaviormetrika",
    link: "https://doi.org/10.1007/s41237-025-00286-1",
    tags: ["XR", "Analytics", "Safety"],
    note: "corresponding author",
  },
  {
    year: "2025",
    title:
      "Fostering innovation at the intersection of maker education and extended reality (XR)",
    authors: "Moon, J., Jung, Y., Kim, S., Bae, Y., & Schneider, B.",
    venue: "Computers and Education: X Reality",
    link: "https://doi.org/10.1016/j.cexr.2025.100124",
    tags: ["XR", "Maker", "STEM"],
  },
  {
    year: "2025",
    title:
      "Virtual reality simulation to foster authentic learning in pre-service teacher education: A systematic literature review",
    authors: "Hong, S., Eom, T., & Moon, J.",
    venue: "Educational Research Review",
    link: "https://doi.org/10.1016/j.edurev.2025.100743",
    tags: ["XR", "Teacher Ed", "Review"],
  },
  {
    year: "2025",
    title:
      "Generative AI-enhanced teacher simulation: A mixed-methods analysis of usability and instructional utility for course integration",
    authors: "Hong, S., Moon, J., Eom, T., Awoyemi, I., & Hwang, J.",
    venue: "Education Sciences",
    link: "https://doi.org/10.3390/educsci15080997",
    tags: ["GenAI", "Teacher Ed", "Simulation"],
    note: "mentored collaboration",
  },
  {
    year: "2025",
    title:
      "Socio-material interactions: A multi-case study on AI chatbot integration in asynchronous online learning",
    authors: "Moon, J., Jung, Y., Bae, H., Lee, U., & Kim, K.",
    venue: "Innovation in Education and Teaching International",
    link: "http://dx.doi.org/10.1080/14703297.2025.2534189",
    tags: ["GenAI", "Analytics", "Online Learning"],
  },
  {
    year: "2025",
    title:
      "Development and implementation of a generative artificial intelligence-enhanced simulation to enhance problem-solving skills for pre-service teachers",
    authors:
      "Lim, J., Lee, U., Koh, J., Jung, Y., Jung, H., Lee, Y., Byun, G., Jang, Y., Lee, S., & Moon, J.",
    venue: "Computers & Education",
    link: "https://doi.org/10.1016/j.compedu.2025.105306",
    tags: ["GenAI", "Teacher Ed", "Simulation"],
  },
  {
    year: "2024",
    title:
      "Game-based performance tasks for assessing representational flexibility of autistic adolescents in a virtual world",
    authors: "Moon, J., Ke, F., & Sokolikj, Z.",
    venue: "Technology, Knowledge, and Learning",
    link: "https://doi.org/10.1007/s10758-024-09806-6",
    tags: ["Game-Based", "Autism", "XR"],
  },
  {
    year: "2024",
    title:
      "Generative artificial intelligence in educational game design: Nuanced challenges, design implications, and future research",
    authors: "Moon, J., Lee, U., Koh, J., Jeong, Y., Byun, G., Lee, Y., & Lim, J.",
    venue: "Technology, Knowledge, and Learning",
    link: "https://doi.org/10.1007/s10758-024-09756-z",
    tags: ["GenAI", "Game-Based", "Design"],
    note: "corresponding author",
  },
  {
    year: "2024",
    title:
      "Using learning analytics to explore peer learning patterns in asynchronous gamified environments",
    authors: "Moon, J., McNeill, L., Edmonds, C., Banihashem, K., & Noroozi, O.",
    venue: "International Journal of Educational Technology in Higher Education",
    link: "https://doi.org/10.1186/s41239-024-00476-z",
    tags: ["Analytics", "Game-Based", "Higher Ed"],
    note: "corresponding author",
  },
  {
    year: "2023",
    title:
      "Effects of adaptive prompts in virtual reality-based social skills training for children with autism",
    authors: "Moon, J. & Ke, F.",
    venue: "Journal of Autism and Developmental Disorders",
    link: "https://doi.org/10.1007/s10803-023-06021-7",
    tags: ["XR", "Autism", "Adaptive Learning"],
    note: "corresponding author",
  },
  {
    year: "2020",
    title:
      "Automatic assessment of cognitive and emotional states in virtual reality-based flexibility training for adolescents with autism",
    authors: "Moon, J., Ke, F., & Sokolikj, Z.",
    venue: "British Journal of Educational Technology",
    link: "https://dx.doi.org/10.1111/bjet.13005",
    tags: ["XR", "Analytics", "Autism"],
    note: "corresponding author",
  },
];

const grants = {
  funded: [
    {
      title:
        "The Alabama Generative Engineering Textbook (AL-GET): AI-enhanced Personalized Learning for STEM Education",
      meta: "Lead PI | Office of Sponsored Program, The University of Alabama | Jan 2026 - Dec 2026",
      amount: "$15,000",
    },
    {
      title:
        "Large Language Model-based Cyber Sentinel Co-Pilot: Professional Development for Alabama Secondary Teacher Training",
      meta: "Lead PI with Fang Luo and Jimmy Hardin | COE RisingTide Grant | Jan 2026 - May 2027",
      amount: "$30,000",
    },
    {
      title: "TeachPlay: AI-Enhanced Educational Gamelet Design",
      meta: "Alabama Commission on Higher Education | Sep 2025 - Aug 2026",
      amount: "$5,000",
    },
    {
      title: "The Institute for Social Science Research THRIVE Fellowship",
      meta: "The University of Alabama | Sep 2025 - Aug 2026 | team fund",
      amount: "$15,000",
    },
    {
      title:
        "Enhancing Teacher Problem-Solving and Classroom Management Skills through an Open-Access AI-Powered 3D Simulation Platform",
      meta: "Lead PI | OSP CREATE Program | Jan 2025 - Dec 2025",
      amount: "$4,000",
    },
    {
      title:
        "Examining Preservice Teachers' Digital Literacy Development and Learning Engagement via Art Integrated Technology-Enhanced Learning",
      meta: "Lead PI with collaborators | Collaborative Arts Research Initiative | Jan 2022 - Dec 2024",
      amount: "$15,000",
    },
  ],
  pending: [
    {
      title: "Immersive Remembrance: AI-Driven Archival Retrieval for VR Learning",
      meta: "Lead PI | Institute of Museum and Library Services | Sep 2026 - Aug 2029",
      amount: "$478,690",
    },
    {
      title:
        "Shift the Lens: Uncovering Students' Assets in Written Math Work via Multimodal AI",
      meta: "Lead PI | Advanced Innovative Math Solutions Collaboratory | Jun 2026 - May 2027",
      amount: "$50,000",
    },
    {
      title:
        "Data-informed Adaptive Teaching Analytics (DATA): Leveraging Artificial Intelligence for Adaptive Teaching and Generative Learning",
      meta: "PI with collaborators | National Science Foundation RITEL | Jul 2026 - Jun 2029",
      amount: "$109,846",
    },
    {
      title:
        "Collaborative Research: Phase I CAMEL-CN: Connecting Human Sensing with Math Understanding to Build Novel RF Datasets and Instructional Sequences",
      meta: "Key personnel and external evaluator | Jan 2027 - Dec 2029",
      amount: "pending",
    },
  ],
};

const mentoringMetrics = [
  { value: "5", label: "doctoral chairs or co-chairs" },
  { value: "9", label: "doctoral committee appointments" },
  { value: "7", label: "current course advisees" },
  { value: "10", label: "research mentees across projects" },
];

const editorialRoles = [
  "Associate Editor, Behaviour & Information Technology (2025-present)",
  "Editorial Board, International Journal of Computer-Supported Collaborative Learning (2026-present)",
  "Editorial Board, Artificial Intelligence in Language Education (2025-present)",
  "Special Issue Editor, Journal of Applied Instructional Design (2024-2025)",
  "Special Issue Editor, Computers and Education: X Reality (2024-present)",
];

const leadershipRoles = [
  "Chair, APSCE SIG Educational Games and Gamification (2023-present)",
  "Co-Chair, Immersive Learning Research Network (2021-present)",
  "Communication Officer, AERA SIG Instructional Technology (2022-2023)",
  "Conference Program Co-Chair, ICCE Educational Gamification and Game-based Learning Section (2022-2023)",
  "Conference Program Co-Chair, iLRN Practitioner Stream (2022-2023)",
];

const talks = [
  {
    title:
      "Teachers Designing AI: A Mentored Model of Situated Learning in the National AI Challenge",
    meta: "ICOLSEI 2026 | Seoul, South Korea",
  },
  {
    title:
      "FieldExplorer: A network-based visualization platform for supporting novice researchers' academic decision-making",
    meta: "Proposal to ICOLSEI 2026 | Seoul, South Korea",
  },
  {
    title:
      "SpeakWise: Capturing real-time reasoning evidence traces through AI-mediated oral assessment",
    meta: "Proposal to ICOLSEI 2026 | Seoul, South Korea",
  },
  {
    title:
      "ReviewLens: An AI-mediated simulation for learning scholarly peer review through epistemic immersion",
    meta: "iLEAD Stream, iLRN 2026 | Athens, Greece",
  },
  {
    title:
      "Cognitive diagnostic modeling from open educational game data: A cross-domain analysis in science learning",
    meta: "Poster Session, AERA 2026 | Los Angeles, United States",
  },
  {
    title:
      "The when before the how: Ethical and practical boundaries of AI in academic research writing",
    meta: "Panel Discussion, AECT 2025 | Las Vegas, United States",
  },
];

let activeFilter = "All";

function renderStats() {
  const list = document.getElementById("hero-stats");
  list.innerHTML = stats
    .map(
      (item) => `
        <li>
          <span class="metric-value">${item.value}</span>
          <span class="metric-label">${item.label}</span>
        </li>
      `
    )
    .join("");
}

function renderFocusAreas() {
  const row = document.getElementById("focus-chips");
  row.innerHTML = focusAreas
    .map((item) => `<span class="focus-chip">${item}</span>`)
    .join("");
}

function renderHonors() {
  const list = document.getElementById("honor-list");
  list.innerHTML = honors.map((item) => `<li>${item}</li>`).join("");
}

function renderInitiatives() {
  const grid = document.getElementById("initiative-grid");
  grid.innerHTML = initiatives
    .map(
      (item) => `
        <article class="repo-tile">
          <div class="repo-head">
            <span class="repo-nameplate">${item.name}</span>
            <span class="repo-badge">${item.badge}</span>
          </div>
          <p>${item.summary}</p>
          <div class="repo-foot">
            ${item.tags.map((tag) => `<span>${tag}</span>`).join("")}
          </div>
        </article>
      `
    )
    .join("");
}

function renderFilters() {
  const filterRoot = document.getElementById("publication-filters");
  const tags = ["All", ...new Set(publications.flatMap((item) => item.tags))];

  filterRoot.innerHTML = tags
    .map(
      (tag) => `
        <button class="filter-button ${
          tag === activeFilter ? "is-active" : ""
        }" type="button" data-filter="${tag}">
          ${tag}
        </button>
      `
    )
    .join("");

  filterRoot.querySelectorAll("[data-filter]").forEach((button) => {
    button.addEventListener("click", () => {
      activeFilter = button.dataset.filter;
      renderFilters();
      renderPublications();
    });
  });
}

function renderPublications() {
  const list = document.getElementById("publication-list");
  const visibleItems =
    activeFilter === "All"
      ? publications
      : publications.filter((item) => item.tags.includes(activeFilter));

  list.innerHTML = visibleItems
    .map(
      (item) => `
        <li class="publication-item">
          <div class="publication-meta">
            <span class="publication-year">${item.year}</span>
            ${
              item.note
                ? `<span class="publication-note">${item.note}</span>`
                : ""
            }
            ${item.tags
              .map((tag) => `<span class="tag-pill">${tag}</span>`)
              .join("")}
          </div>
          <h3 class="publication-title">
            <a href="${item.link}" target="_blank" rel="noreferrer">${item.title}</a>
          </h3>
          <p class="publication-authors">${item.authors}</p>
          <p class="publication-venue">${item.venue}</p>
        </li>
      `
    )
    .join("");
}

function renderGrantList(targetId, items) {
  const list = document.getElementById(targetId);
  list.innerHTML = items
    .map(
      (item) => `
        <li>
          <strong>${item.title}</strong>
          <span>${item.meta}</span>
          <span>${item.amount}</span>
        </li>
      `
    )
    .join("");
}

function renderMentoringMetrics() {
  const grid = document.getElementById("mentoring-metrics");
  grid.innerHTML = mentoringMetrics
    .map(
      (item) => `
        <div class="metric-tile">
          <strong>${item.value}</strong>
          <span>${item.label}</span>
        </div>
      `
    )
    .join("");
}

function renderSimpleList(targetId, items) {
  const list = document.getElementById(targetId);
  list.innerHTML = items.map((item) => `<li>${item}</li>`).join("");
}

function renderTalks() {
  const list = document.getElementById("talk-list");
  list.innerHTML = talks
    .map(
      (item) => `
        <li>
          <span class="talk-title">${item.title}</span>
          <span class="talk-meta">${item.meta}</span>
        </li>
      `
    )
    .join("");
}

function enableRevealMotion() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.18,
      rootMargin: "0px 0px -40px 0px",
    }
  );

  document.querySelectorAll(".reveal").forEach((node) => observer.observe(node));
}

renderStats();
renderFocusAreas();
renderHonors();
renderInitiatives();
renderFilters();
renderPublications();
renderGrantList("funded-list", grants.funded);
renderGrantList("pending-list", grants.pending);
renderMentoringMetrics();
renderSimpleList("editorial-list", editorialRoles);
renderSimpleList("leadership-list", leadershipRoles);
renderTalks();
enableRevealMotion();
