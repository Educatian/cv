const siteData = window.__cvSiteData || {};

const stats = siteData.stats || [
  { value: "57", label: "Journal articles" },
  { value: "21", label: "Conference proceedings" },
  { value: "8", label: "Book chapters" },
  { value: "70", label: "Presentations" },
  { value: "$107K+", label: "Funded awards" },
];

const focusAreas = siteData.focusAreas || [
  "Generative AI in education",
  "Extended reality",
  "Learning analytics",
  "Game-based learning",
  "Teacher education",
  "Inclusive STEM design",
];

const affiliations = siteData.affiliations || [
  {
    acronym: "AERA",
    name: "American Educational Research Association",
    label: "Research Association",
    logo: "assets/affiliation-logos/aera.png",
    alt: "AERA logo",
    url: "https://www.aera.net/",
    theme: "sand",
  },
  {
    acronym: "AECT",
    name: "Association for Education Communications and Technology",
    label: "Professional Association",
    logo: "assets/affiliation-logos/aect.png",
    alt: "AECT logo",
    url: "https://www.aect.org/",
    theme: "sky",
  },
  {
    acronym: "ISLS",
    name: "International Society of the Learning Sciences",
    label: "Scholarly Society",
    logo: "assets/affiliation-logos/isls.png",
    alt: "ISLS logo",
    url: "https://www.isls.org/",
    theme: "sage",
  },
  {
    acronym: "iLRN",
    name: "Immersive Learning Research Network",
    label: "Research Network",
    logo: "assets/affiliation-logos/ilrn.png",
    alt: "Immersive Learning Research Network logo",
    url: "https://www.immersivelrn.org/",
    theme: "night",
  },
];

const honors = siteData.honors || [
  "2026 Nellie Rose McCrory Faculty Excellence Award - Research Division",
  "2026 William T. Grant Foundation Scholars Program Finalist",
  "2025 Dean's Merit Award in Research Excellence",
  "2024 Outstanding iLEAD Paper Award",
];

const grantPortfolio = siteData.grantPortfolio || {
  fundedTotal: 107459,
  pendingTotal: 638536,
  fundedCount: 12,
  pendingCount: 4,
};

const news = siteData.news || [
  {
    date: "Apr 2026",
    type: "Conference",
    text:
      "AERA 2026 features multiple presentations on XR learning dynamics, teacher simulation, cognitive diagnostic modeling, and immersive analytics.",
  },
  {
    date: "2026",
    type: "Publication",
    text:
      "Published work includes AI ethics in higher education and a reproducible microgenetic pipeline for VR safety-training behavior analysis.",
  },
  {
    date: "Jan 2026",
    type: "Grant",
    text:
      "Launched AL-GET as Lead PI to explore AI-enhanced personalized STEM learning through the Alabama Generative Engineering Textbook initiative.",
  },
  {
    date: "Jan 2026",
    type: "Grant",
    text:
      "Began the Cyber Sentinel Co-Pilot project to support Alabama secondary teacher training with large language models.",
  },
  {
    date: "2025",
    type: "Award",
    text:
      "Received the Dean's Merit Award in Research Excellence and joined the THRIVE Fellowship cohort at The University of Alabama.",
  },
  {
    date: "2024",
    type: "Award",
    text:
      "Earned the Outstanding iLEAD Paper Award at the Immersive Learning Research Network conference.",
  },
];

const initiatives = siteData.initiatives || [
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

const publications = siteData.publications || [
  {
    year: "2026",
    title:
      "An ethical framework for conversational AI in higher education: Toward an evidence-based ethical governance",
    authors: "Uddin, M., Moon, J., & Abu, S.",
    venue: "AI & Ethics",
    link: "https://doi.org/10.1007/s43681-026-01056-9",
    tags: ["GenAI", "Ethics", "Higher Ed"],
    image:
      "https://static-content.springer.com/image/art%3A10.1007%2Fs43681-026-01056-9/MediaObjects/43681_2026_1056_Fig1_HTML.png",
    imageAlt: "Figure preview from the AI & Ethics article",
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
    image:
      "https://static-content.springer.com/image/art%3A10.1007%2Fs41237-025-00286-1/MediaObjects/41237_2025_286_Fig1_HTML.png",
    imageAlt: "Figure preview from the Behaviormetrika article",
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
    note: "corresponding author",
  },
  {
    year: "2024",
    title:
      "Game-based performance tasks for assessing representational flexibility of autistic adolescents in a virtual world",
    authors: "Moon, J., Ke, F., & Sokolikj, Z.",
    venue: "Technology, Knowledge, and Learning",
    link: "https://doi.org/10.1007/s10758-024-09806-6",
    tags: ["Game-Based", "Autism", "XR"],
    note: "corresponding author",
    image:
      "https://static-content.springer.com/image/art%3A10.1007%2Fs10758-024-09806-6/MediaObjects/10758_2024_9806_Fig1_HTML.png",
    imageAlt: "Figure preview from the Technology, Knowledge and Learning article",
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
    image:
      "https://static-content.springer.com/image/art%3A10.1186%2Fs41239-024-00476-z/MediaObjects/41239_2024_476_Fig1_HTML.png",
    imageAlt:
      "Figure preview from the International Journal of Educational Technology in Higher Education article",
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
    image:
      "https://static-content.springer.com/image/art%3A10.1007%2Fs10803-023-06021-7/MediaObjects/10803_2023_6021_Fig1_HTML.png",
    imageAlt:
      "Figure preview from the Journal of Autism and Developmental Disorders article",
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

const completeJournalArticles = siteData.completeJournalArticles || [
  {
    year: "2026",
    category: "International",
    citation:
      "Aldemir, T., Bicer, Al., Kilinc, S., Moon, J., & Kwok, M. (Minor revision, 2026). Challenges, solutions, and PD needs for integrating AI: Insights from a two-week AI literacy module with preservice teachers. Cogent Education [ESCI-indexed]",
    link: "",
  },
  {
    year: "2026",
    category: "International",
    citation:
      "* Jeong, Y., Lee, Y., Byun, G., & Moon, J. (Minor revision, 2026). Navigating practitioner roles in generative AI-enhanced educational game design: A collective autoethnography. Simulation & Gaming [ESCI-indexed]",
    link: "",
  },
  {
    year: "2026",
    category: "International",
    citation:
      "* Uddin, M., Moon, J.& Abu, S. (2026). An ethical framework for conversational AI in higher education: Toward an evidence-based ethical governance. AI & Ethics. https://doi.org/10.1007/s43681-026-01056-9",
    link: "https://doi.org/10.1007/s43681-026-01056-9",
  },
  {
    year: "2026",
    category: "International",
    citation:
      "‡ * Moon, J., Awoyemi, I., Abu, S., Marchiori, S., & Song, S. (2026). Decoding immersive learning states: A reproducible microgenetic pipeline for behavioral data in virtual reality safety training. Behaviormetrika. https://doi.org/10.1007/s41237-025-00286-1 [SCOPUS-indexed]",
    link: "https://doi.org/10.1007/s41237-025-00286-1",
  },
  {
    year: "2025",
    category: "International",
    citation:
      "Moon, J., Jung, Y., Kim, S., Bae, Y., & Schneider, B. (2025). Fostering innovation at the intersection of maker education and extended reality (XR). Computers and Education: X Reality. https://doi.org/10.1016/j.cexr.2025.100124 [ESCI-indexed]",
    link: "https://doi.org/10.1016/j.cexr.2025.100124",
  },
  {
    year: "2025",
    category: "International",
    citation:
      "Hong, S., Eom, T., & Moon, J. (2025). Virtual reality simulation to foster authentic learning in pre-service teacher education: A systematic literature review. Educational Research Review https://doi.org/10.1016/j.edurev.2025.100743 [SSCI-indexed; IF = 10.6, IF5 = 14.9]",
    link: "https://doi.org/10.1016/j.edurev.2025.100743",
  },
  {
    year: "2025",
    category: "International",
    citation:
      "Aldemir, T., Kilinc, S., Bicer, A., Moon, J., Kwok, M. (2025). Exploring emergent AI-TPACK competencies in a two-week AI literacy module for preservice teachers. Teaching and Teacher Education https://doi.org/10.1016/j.tate.2025.105231 [SSCI-indexed; IF = 3.9, IF5 = 4.9]",
    link: "https://doi.org/10.1016/j.tate.2025.105231",
  },
  {
    year: "2025",
    category: "International",
    citation:
      "* Marchiori, R., Song, S., Moon, J., Awoyemi, I., Ghooreian, A., & Ramenzapour, E. (2025). A systematic review of technology-enhanced learning approaches to foster construction engineering and management competencies. Computer Applications in Engineering Education https://doi.org/10.1002/cae.70074 [SCIE-indexed; IF = 2.2, IF5 = 2.6]",
    link: "https://doi.org/10.1002/cae.70074",
  },
  {
    year: "2025",
    category: "International",
    citation:
      "* ‡ Hong, S., Moon, J., Eom, T., Awoyemi, I., & Hwang, J. (2025). Generative AI-enhanced teacher simulation: A mixed-methods analysis of usability and instructional utility for course integration. Education Sciences https://doi.org/10.3390/educsci15080997 [ESCI-indexed; IF = 2.6, IF5 = 2.7]",
    link: "https://doi.org/10.3390/educsci15080997",
  },
  {
    year: "2025",
    category: "International",
    citation:
      "‡ Moon, J., Jung, Y., Bae, H., Lee, U., & Kim, K. (2025). Socio-material interactions: A multi-case study on AI chatbot integration in asynchronous online learning. Innovation in Education and Teaching International http://dx.doi.org/10.1080/14703297.2025.2534189 [SSCI-indexed; IF = 4.9, IF5 = 3.5]",
    link: "http://dx.doi.org/10.1080/14703297.2025.2534189",
  },
  {
    year: "2025",
    category: "International",
    citation:
      "Aldemir, T., Moon, J., Bicer, A., Byun, G., Carlos Manrique, P., & Vivek, S. (2025). How Non-CS preservice teachers conceptualize and engage with computational thinking through 3D game design: Insights from an extended reality (XR)-enhanced maker experience. Computers & Education: X Reality https://doi.org/10.1016/j.cexr.2025.100099 [ESCI-indexed]",
    link: "https://doi.org/10.1016/j.cexr.2025.100099",
  },
  {
    year: "2025",
    category: "International",
    citation:
      "‡ Lim, J., Lee, U., Koh, J., Jung, Y., Jung, H., Lee, Y., Byun, G., Jang, Y., Lee, S., & Moon, J. (2025). Development and implementation of a generative artificial intelligence-enhanced simulation to enhance problem-solving skills for pre-service teachers. Computers & Education https://doi.org/10.1016/j.compedu.2025.105306 [SSCI-, SCIE-indexed; IF = 10.5, IF5 = 13.0]",
    link: "https://doi.org/10.1016/j.compedu.2025.105306",
  },
  {
    year: "2025",
    category: "International",
    citation:
      "Park, Y., Moon, J., & Na, H. (2025). Elementary STEM teachers' open educational resources and TPACK in a professional learning network: A case study. Online Learning Journal, 29(1), 192-215. https://doi.org/10.24059/olj.v29i1.4102 [ESCI-indexed; IF = 2.3, IF5 = 3.7]",
    link: "https://doi.org/10.24059/olj.v29i1.4102",
  },
  {
    year: "2025",
    category: "International",
    citation:
      "Marchiori, R., Song, S., & Moon, J. (2025). Developing heat stress training programs: A training-driven assessment approach to enhance safety in the construction industry. Journal of Safety Research, 92, 262-271. https://doi.org/10.1016/j.jsr.2024.11.027 [SSCI-indexed; IF = 4.4, IF5 = 4.7]",
    link: "https://doi.org/10.1016/j.jsr.2024.11.027",
  },
  {
    year: "2024",
    category: "International",
    citation:
      "‡ Moon, J., Ke, F., & Sokolikj, Z. (2024). Game-based performance tasks for assessing representational flexibility of autistic adolescents in a virtual world. Technology, Knowledge, and Learning https://doi.org/10.1007/s10758-024-09806-6 [ESCI-indexed; IF = 3.5, IF5 = 4.2]",
    link: "https://doi.org/10.1007/s10758-024-09806-6",
  },
  {
    year: "2024",
    category: "International",
    citation:
      "Lee, U., Jung, Y., Koh, J., Lee, Y., Byun, G., Lee, H., Eun, S., Moon, J., Lim, C., & Kim, H. (2024). I see you: Teacher analytics with GPT-4 vision-powered observational assessment. Smart Learning Environments https://doi.org/10.1186/s40561-024-00335-4 [ESCI-indexed; IF = 12.1, IF5 = 10.1]",
    link: "https://doi.org/10.1186/s40561-024-00335-4",
  },
  {
    year: "2024",
    category: "International",
    citation:
      "Bae, H., Hur, J., Park, J., Choi, G. W., & Moon, J. (2024). Pre-service teachers' dual perspectives on generative AI: Benefits, challenges, and integrating into teaching and learning. Online Learning https://doi.org/10.24059/olj.v28i3.4543 [ESCI-indexed; IF = 2.3, IF5 = 3.7]",
    link: "https://doi.org/10.24059/olj.v28i3.4543",
  },
  {
    year: "2024",
    category: "International",
    citation:
      "‡ Moon, J., Lee, U., Koh, J., Jeong, Y., Byun, G., Lee, Y., & Lim, J. (2024). Generative artificial intelligence in educational game design: Nuanced challenges, design implications, and future research. Technology, Knowledge, and Learning https://doi.org/10.1007/s10758-024-09756-z [ESCI-indexed; IF = 3.5, IF5 = 4.2]",
    link: "https://doi.org/10.1007/s10758-024-09756-z",
  },
  {
    year: "2024",
    category: "International",
    citation:
      "‡ Moon, J., McNeill, L., Edmonds, C., Banihashem, K., & Noroozi, O. (2024). Using learning analytics to explore peer learning patterns in asynchronous gamified environments. International Journal of Educational Technology in Higher Education https://doi.org/10.1186/s41239-024-00476-z [SSCI-indexed; IF = 16.7, IF5 = 15.5]",
    link: "https://doi.org/10.1186/s41239-024-00476-z",
  },
  {
    year: "2024",
    category: "International",
    citation:
      "‡ Moon, J., Yeo, S., Banihashem, K., & Noroozi, O. (2024). Using multimodal learning analytics as a formative assessment tool: Exploring collaborative dynamics in mathematics teacher education. Journal of Computer Assisted Learning https://doi.org/10.1111/jcal.13028 [SSCI-indexed; IF = 4.6, IF5 = 5.8]",
    link: "https://doi.org/10.1111/jcal.13028",
  },
  {
    year: "2024",
    category: "International",
    citation:
      "Yeo, S., Moon, J., & Kim, D. J. (2024). Transforming mathematics education with AI: Innovations, implementations, and insights. The Mathematical Education https://doi.org/10.7468/mathedu.2024.63.2.387 [KCI-indexed; IF5 = 1.28]",
    link: "https://doi.org/10.7468/mathedu.2024.63.2.387",
  },
  {
    year: "2024",
    category: "International",
    citation:
      "‡ * Awoyemi, I. D., Mercado, F., & Moon, J. (2024). A narrative review of immersive virtual reality to enhance high school students' mathematics competence. The Mathematical Education https://doi.org/10.7468/mathedu.2024.63.2.1 [KCI-indexed; IF5 = 1.28]",
    link: "https://doi.org/10.7468/mathedu.2024.63.2.1",
  },
  {
    year: "2024",
    category: "International",
    citation:
      "Choi, G. W., Lim, J., Kim, S., Moon, J., & Jung, Y. (2024). A case study of South Korean elementary school teachers' emergence remote teaching. Knowledge Management & e-learning: International Journal, 16(2), 259-285. https://doi.org/10.34105/j.kmel.2024.16.013 [ESCI-indexed; IF = 2.8, IF5 = 2.7]",
    link: "https://doi.org/10.34105/j.kmel.2024.16.013",
  },
  {
    year: "2024",
    category: "International",
    citation:
      "McNeill, L., Moon, J., Edmonds, C. (2024). Student engagement in a gamified online learning environment: A data mining approach. Journal of Applied Instructional Design https://doi.org/10.59668/1269.15624",
    link: "https://doi.org/10.59668/1269.15624",
  },
  {
    year: "2024",
    category: "International",
    citation:
      "Choi, G. W., Lee, D., Kim, S. H., & Moon, J. (2024). Utilizing generative artificial intelligence for instructional design: Exploring strengths, weakness, opportunities, and threats. TechTrends https://doi.org/10.1007/s11528-024-00967-w [ESCI-indexed; IF = 3.8, IF5 = 3.7]",
    link: "https://doi.org/10.1007/s11528-024-00967-w",
  },
  {
    year: "2024",
    category: "International",
    citation:
      "‡ * Moon, J., Yeo, S., Si, Q., & Ljeluola, A. S. (2024). A scoping review of game-based learning on mathematics teacher education. International Journal of Mathematical Education in Science and Technology https://doi.org/10.1080/0020739X.2024.2337934 [ESCI-indexed; IF = 0.6, IF5 = 0.9]",
    link: "https://doi.org/10.1080/0020739X.2024.2337934",
  },
  {
    year: "2024",
    category: "International",
    citation:
      "‡ Moon, J., Ke, F., Sokolikj, Z., & Chakraborty, S. (2024). Applying multimodal data fusion to track autistic adolescents' representational flexibility development during virtual reality-based training. Computers & Education: X Reality, 4, 100063. https://doi.org/10.1016/j.cexr.2024.100063",
    link: "https://doi.org/10.1016/j.cexr.2024.100063",
  },
  {
    year: "2024",
    category: "International",
    citation:
      "Banihashem, K., Kerman, N. T., Noroozi, O., Moon, J., & Drachsler, H. (2024). Peer-generated or AI-generated feedback? An empirical study in the context of essay writing. International Journal of Educational Technology in Higher Education, 21, 23. https://doi.org/10.1186/s41239-024-00455-4 [SSCI-indexed; IF = 16.7, IF5 = 15.5]",
    link: "https://doi.org/10.1186/s41239-024-00455-4",
  },
  {
    year: "2024",
    category: "International",
    citation:
      "* Na, C., Lee, D., Moon, J., & Shin, Y. (2024). Modeling undergraduate students' learning dynamics between self-regulated learning patterns and community of inquiry. Education and Information Technologies https://doi.org/10.1007/s10639-024-12527-z [SSCI-indexed; IF = 5.4, IF5 = 5.7]",
    link: "https://doi.org/10.1007/s10639-024-12527-z",
  },
  {
    year: "2024",
    category: "International",
    citation:
      "Dai, C., Ke, F., Pan, Y., Moon, J., & Liu, Z. (2024). Effects of artificial intelligence-powered virtual agents on learning outcomes in simulation-based learning: A meta-analysis. Educational Psychology Review, 36, 31. https://doi.org/10.1007/s10648-024-09855-4 [SSCI-indexed; IF = 8.8, IF5 = 14.2]",
    link: "https://doi.org/10.1007/s10648-024-09855-4",
  },
  {
    year: "2024",
    category: "International",
    citation:
      "‡ Moon, J. (2024). Learning experience design of a verbal prompt in virtual reality-based training for children with autism. Research in Learning Technology, 32. https://dx.doi.org/10.25304/rlt.v32.3129 [ESCI-indexed; IF = 1.2, IF5 = 2.1]",
    link: "https://dx.doi.org/10.25304/rlt.v32.3129",
  },
  {
    year: "2023",
    category: "International",
    citation:
      "Glaser, N., Schmidt, M., Thull, C., Tennant, A., Moon, J., & Ousley, C. (2023). Learner experience design and unpacking sociocultural, technological, and pedagogical design considerations of spherical video-based virtual reality systems for autistic learners: A systematic literature review. Journal of Autism and Developmental Disorders https://doi.org/10.1007/s10803-023-06168-3 [SSCI-indexed; IF = 2.8, IF5 = 4.3]",
    link: "https://doi.org/10.1007/s10803-023-06168-3",
  },
  {
    year: "2023",
    category: "International",
    citation:
      "* Lee, U., Jung, H., Jeon, Y., Soh, Y., Hwang, W., Moon, J., Kim, H. (2023). Few-shot is enough: Exploring ChatGPT prompt engineering method for automatic question generation in English education. Education and Information Technologies https://doi.org/10.1007/s10639-023-12249-8 [SSCI-indexed; IF = 5.4, IF5 = 5.7]",
    link: "https://doi.org/10.1007/s10639-023-12249-8",
  },
  {
    year: "2023",
    category: "International",
    citation:
      "‡ Moon, J., Choi, G. W., & Seo, J. (2023). Revisiting multimedia learning design principles in virtual reality-based learning environments for autistic individuals. Virtual Reality, 27, 3101-3113. https://doi.org/10.1007/s10055-023-00856-2 [SCIE-indexed; IF = 5.0, IF5 = 6.6]",
    link: "https://doi.org/10.1007/s10055-023-00856-2",
  },
  {
    year: "2023",
    category: "International",
    citation:
      "‡ Moon, J., & Ke, F. (2023). Effects of adaptive prompts in virtual reality-based social skills training for children with autism. Journal of Autism and Developmental Disorders. https://doi.org/10.1007/s10803-023-06021-7 [SSCI-indexed; IF = 2.8, IF5 = 4.3]",
    link: "https://doi.org/10.1007/s10803-023-06021-7",
  },
  {
    year: "2023",
    category: "International",
    citation:
      "Liu, Z., & Moon, J. (2023). A framework for applying sequential data analytics to design personalized digital game-based learning for computing education. Journal of Educational Technology & Society, 26(2), 181-197. https://doi.org/10.30191/ETS.202304_26(2).0013 [SSCI-indexed; IF = 6.0, IF5 = 6.3]",
    link: "https://doi.org/10.30191/ETS.202304_26(2).0013",
  },
  {
    year: "2023",
    category: "International",
    citation:
      "‡ Moon, J., Lee, D., Choi, G. W., Seo, J., Do, J., & Lim, T. (2023). Learning analytics in seamless learning environments: A systematic review. Interactive Learning Environments. https://doi.org/10.1080/10494820.2023.2170422 [SSCI-indexed; IF = 5.3, IF5 = 6.2]",
    link: "https://doi.org/10.1080/10494820.2023.2170422",
  },
  {
    year: "2022",
    category: "International",
    citation:
      "Ke, F., Moon, J., & Sokolikj, Z. (2022). Designing and deploying a virtual social sandbox for children with autism. Disability and Rehabilitation: Assistive Technology, 19(4), 1178-1209. https://doi.org/10.1080/17483107.2022.2156630 [SSCI-indexed; IF = 2.2, IF5 = 2.7]",
    link: "https://doi.org/10.1080/17483107.2022.2156630",
  },
  {
    year: "2022",
    category: "International",
    citation:
      "* Yu, J., Ma, W., Moon, J., & Denham, A. (2022). Developing a stealth assessment system using a continuous conjunctive model. Journal of Learning Analytics, 9(3), 11-31. https://doi.org/10.18608/jla.2022.7639 [ESCI-indexed; IF = 3.6, IF5 = 4.8]",
    link: "https://doi.org/10.18608/jla.2022.7639",
  },
  {
    year: "2022",
    category: "International",
    citation:
      "‡ Moon, J., Ke, F., Sokolikj, Z., & Dahlstrom-Hakki, I. (2022). Multimodal data fusion to track students' distress during educational gameplay. Journal of Learning Analytics, 9(3), 75-87. https://doi.org/10.18608/jla.2022.7631 [ESCI-indexed; IF = 3.6, IF5 = 4.8]",
    link: "https://doi.org/10.18608/jla.2022.7631",
  },
  {
    year: "2022",
    category: "International",
    citation:
      "Seo, J., Moon, J., Choi, G. W., & Do, J. (2022). A scoping review of three computational approaches to ethnographic research in digital learning environments. TechTrends, 66, 102-111. https://doi.org/10.1007/s11528-021-00689-3 [ESCI-indexed; IF = 3.8, IF5 = 3.7]",
    link: "https://doi.org/10.1007/s11528-021-00689-3",
  },
  {
    year: "2022",
    category: "International",
    citation:
      "Ke, F., Moon, J., & Sokolikj, Z. (2022). Virtual reality-based social skills training for children with autism spectrum disorder. Journal of Special Education Technology, 37(1), 49-62. https://doi.org/10.1177/0162643420945603 [SSCI-indexed; IF = 1.5, IF5 = 2.3]",
    link: "https://doi.org/10.1177/0162643420945603",
  },
  {
    year: "2022",
    category: "International",
    citation:
      "‡ Moon, J., Lee, S., & Xu, X. (2022). Exploring pre-service teachers' technology-integration belief and scientific inquiry in a teacher-development course. International Journal of Technology and Design Education, 32, 1777-1798. https://doi.org/10.1007/s10798-021-09672-8 [SCIE- and SSCI-indexed; IF = 2.7, IF5 = 2.8]",
    link: "https://doi.org/10.1007/s10798-021-09672-8",
  },
  {
    year: "2021",
    category: "International",
    citation:
      "‡ Moon, J., & Park, Y. (2021). A scoping review on open educational resources to support interactions of learners with disabilities. The International Review of Research in Open and Distributed Learning https://doi.org/10.19173/irrodl.v22i1.5110 [SSCI-indexed; IF = 1.9, IF5 = 2.8]",
    link: "https://doi.org/10.19173/irrodl.v22i1.5110",
  },
  {
    year: "2021",
    category: "International",
    citation:
      "Tlili, A., Chang, M., Moon, J., Liu, Z., Burgos, D., Chen, N. S., & Kinshuk (2021). A systematic literature review of empirical studies on learning analytics in educational games. International Journal of Interactive Multimedia and Artificial Intelligence, 7(2). http://dx.doi.org/10.9781/ijimai.2021.03.003 [SCIE-indexed; IF = 2.4, IF5 = 2.2]",
    link: "http://dx.doi.org/10.9781/ijimai.2021.03.003",
  },
  {
    year: "2020",
    category: "International",
    citation:
      "‡ Moon, J., Ke, F., & Sokolikj, Z. (2020). Automatic assessment of cognitive and emotional states in virtual reality-based flexibility training for adolescents with autism. British Journal of Educational Technology, 51(5), 1766-1784. https://dx.doi.org/10.1111/bjet.13005 [SSCI-indexed; IF = 8.1, IF5 = 8.1]",
    link: "https://dx.doi.org/10.1111/bjet.13005",
  },
  {
    year: "2020",
    category: "International",
    citation:
      "Liu, Z., Moon, J., Kim, B., & Dai, C. (2020). Integrating adaptivity to educational games: A combination of bibliometric and meta-analytic review. Educational Technology Research and Development, 68, 1931-1959. https://doi.org/10.1007/s11423-020-09791-4 [SSCI-indexed; IF = 4.2, IF5 = 5.3]",
    link: "https://doi.org/10.1007/s11423-020-09791-4",
  },
  {
    year: "2020",
    category: "International",
    citation:
      "‡ Moon, J., & Ryu, J. (2020). The effects of social and cognitive cues on learning comprehension, eye-gaze pattern, and cognitive load in video instruction. Journal of Computing in Higher Education, 33, 39-63. https://doi.org/10.1007/s12528-020-09255-x [SSCI-indexed; IF = 4.9, IF5 = 5.2]",
    link: "https://doi.org/10.1007/s12528-020-09255-x",
  },
  {
    year: "2020",
    category: "International",
    citation:
      "‡ Moon, J., & Ke, F. (2020). Exploring the relationships among middle school students' peer interactions, task efficiency, and learning engagement in game-based learning. Simulation & Gaming, 51(3), 310-335. https://doi.org/10.1177/1046878120907940 [ESCI-indexed; IF = 1.8, IF5 = 2.7]",
    link: "https://doi.org/10.1177/1046878120907940",
  },
  {
    year: "2020",
    category: "International",
    citation:
      "Moon, J., Do, J., Lee, D., & Choi, G. (2020). A conceptual framework for teaching computational thinking in personalized OERs. Smart Learning Environments, 7(6). https://doi.org/10.1186/s40561-019-0108-z [ESCI-indexed; IF = 12.1, IF5 = 10.1]",
    link: "https://doi.org/10.1186/s40561-019-0108-z",
  },
  {
    year: "2019",
    category: "International",
    citation:
      "‡ Moon, J., & Ke, F. (2019). In-game actions to promote game-based math learning engagement. Journal of Educational Computing Research, 58(4), 863-885. https://doi.org/10.1177/0735633119878611 [SSCI-indexed; IF = 4.9, IF5 = 6.0]",
    link: "https://doi.org/10.1177/0735633119878611",
  },
  {
    year: "2019",
    category: "International",
    citation:
      "‡ Moon, J., & Ke, F. (2019). Exploring the treatment integrity of virtual reality-based social skills training for children with high-functioning autism. Interactive Learning Environment, 29(6), 939-953. http://dx.doi.org/10.1080/10494820.2019.1613665 [SSCI-indexed; IF = 5.3, IF5 = 6.2]",
    link: "http://dx.doi.org/10.1080/10494820.2019.1613665",
  },
  {
    year: "2018",
    category: "International",
    citation:
      "Ke, F., & Moon, J. (2018). Virtual collaborative gaming as social skills training for high-functioning autistic children. British Journal of Educational Technology, 49(4), 728-741. https://doi.org/10.1111/bjet.12626 [SSCI-indexed; IF = 8.1, IF5 = 8.1]",
    link: "https://doi.org/10.1111/bjet.12626",
  },
  {
    year: "2018",
    category: "International",
    citation:
      "‡ Moon, J. (2018). Reviews of social embodiment for design of non-player characters in virtual reality-based social skill training for autistic children. Multimodal Technologies and Interaction, 2(3), 53-62. https://doi.org/10.3390/mti2030053 [ESCI-indexed; IF = 2.4, IF5 = 2.7]",
    link: "https://doi.org/10.3390/mti2030053",
  },
  {
    year: "2020",
    category: "Korean",
    citation:
      "Do, J., Kim, S., & Moon, J. (2020). Exploring synchronous online course cases on secondary schools via semantic network analysis. Journal of Qualitative Inquiry, 6(3), 637-681. http://www.riss.kr/link?id=A107079753",
    link: "http://www.riss.kr/link?id=A107079753",
  },
  {
    year: "2013",
    category: "Korean",
    citation:
      "Ryu, J., & Moon, J. (2013). The effects of line length and information seeking in e-book for learning on eye-fixation time, cognitive load, and comprehension. The Korea Educational Review, 19(3), 293-313. http://uci.or.kr/G704-001273.2013.19.3.007",
    link: "http://uci.or.kr/G704-001273.2013.19.3.007",
  },
  {
    year: "2013",
    category: "Korean",
    citation:
      "Ryu, J., Jung, H., & Moon, J. (2013). Needs analysis of distance education students for using e-textbooks on smart pads. The Journal of the Korea Content, 13(10), 594-603. http://doi.org/10.5392/JKCA.2013.13.10.594",
    link: "http://doi.org/10.5392/JKCA.2013.13.10.594",
  },
];

const grants = siteData.grants || {
  funded: [
    {
      title:
        "The Alabama Generative Engineering Textbook (AL-GET): AI-enhanced Personalized Learning for STEM Education",
      meta: "Lead PI | Office of Sponsored Program, The University of Alabama | Jan 2026 - Dec 2026",
      amount: "$15,000",
      amountValue: 15000,
    },
    {
      title:
        "Large Language Model-based Cyber Sentinel Co-Pilot: Professional Development for Alabama Secondary Teacher Training",
      meta: "Lead PI with Fang Luo and Jimmy Hardin | COE RisingTide Grant | Jan 2026 - May 2027",
      amount: "$30,000",
      amountValue: 30000,
    },
    {
      title: "TeachPlay: AI-Enhanced Educational Gamelet Design",
      meta: "Alabama Commission on Higher Education | Sep 2025 - Aug 2026",
      amount: "$5,000",
      amountValue: 5000,
    },
    {
      title: "The Institute for Social Science Research THRIVE Fellowship",
      meta: "The University of Alabama | Sep 2025 - Aug 2026 | team fund",
      amount: "$15,000",
      amountValue: 15000,
    },
    {
      title:
        "Enhancing Teacher Problem-Solving and Classroom Management Skills through an Open-Access AI-Powered 3D Simulation Platform",
      meta: "Lead PI | OSP CREATE Program | Jan 2025 - Dec 2025",
      amount: "$4,000",
      amountValue: 4000,
    },
    {
      title:
        "Examining Preservice Teachers' Digital Literacy Development and Learning Engagement via Art Integrated Technology-Enhanced Learning",
      meta: "Lead PI with collaborators | Collaborative Arts Research Initiative | Jan 2022 - Dec 2024",
      amount: "$15,000",
      amountValue: 15000,
    },
  ],
  pending: [
    {
      title: "Immersive Remembrance: AI-Driven Archival Retrieval for VR Learning",
      meta: "Lead PI | Institute of Museum and Library Services | Sep 2026 - Aug 2029",
      amount: "$478,690",
      amountValue: 478690,
    },
    {
      title:
        "Shift the Lens: Uncovering Students' Assets in Written Math Work via Multimodal AI",
      meta: "Lead PI | Advanced Innovative Math Solutions Collaboratory | Jun 2026 - May 2027",
      amount: "$50,000",
      amountValue: 50000,
    },
    {
      title:
        "Data-informed Adaptive Teaching Analytics (DATA): Leveraging Artificial Intelligence for Adaptive Teaching and Generative Learning",
      meta: "PI with collaborators | National Science Foundation RITEL | Jul 2026 - Jun 2029",
      amount: "$109,846",
      amountValue: 109846,
    },
    {
      title:
        "Collaborative Research: Phase I CAMEL-CN: Connecting Human Sensing with Math Understanding to Build Novel RF Datasets and Instructional Sequences",
      meta: "Key personnel and external evaluator | Jan 2027 - Dec 2029",
      amount: "pending",
      amountValue: null,
    },
  ],
};

const workingPapers = siteData.workingPapers || [];
const workingPaperSummary = siteData.workingPaperSummary || {
  total: workingPapers.length,
  submittedOrUnderReview: workingPapers.filter(
    (item) => item.bucket === "Submitted or Under Review"
  ).length,
  inPreparation: workingPapers.filter((item) => item.bucket === "In Preparation").length,
};

const mentoringMetrics = siteData.mentoringMetrics || [
  { value: "5", label: "doctoral chairs or co-chairs" },
  { value: "9", label: "doctoral committee appointments" },
  { value: "7", label: "current course advisees" },
  { value: "10", label: "research mentees across projects" },
];

const editorialRoles = siteData.editorialRoles || [
  {
    badge: "BIT",
    label: "Journal",
    role: "Associate Editor",
    title: "Behaviour & Information Technology",
    years: "2025-present",
    theme: "crimson",
  },
  {
    badge: "ijCSCL",
    label: "Journal",
    role: "Editorial Board",
    title: "International Journal of Computer-Supported Collaborative Learning",
    years: "2026-present",
    theme: "charcoal",
  },
  {
    badge: "AILE",
    label: "Journal",
    role: "Editorial Board",
    title: "Artificial Intelligence in Language Education",
    years: "2025-present",
    theme: "stone",
  },
  {
    badge: "JAID",
    label: "Special Issue",
    role: "Special Issue Editor",
    title: "Journal of Applied Instructional Design",
    years: "2024-2025",
    theme: "crimson",
  },
  {
    badge: "CEXR",
    label: "Special Issue",
    role: "Special Issue Editor",
    title: "Computers and Education: X Reality",
    years: "2024-present",
    theme: "charcoal",
  },
];

const leadershipRoles = siteData.leadershipRoles || [
  {
    badge: "APSCE",
    label: "Society",
    role: "Chair",
    title: "APSCE SIG Educational Games and Gamification",
    years: "2023-present",
    theme: "crimson",
  },
  {
    badge: "iLRN",
    label: "Network",
    role: "Co-Chair",
    title: "Immersive Learning Research Network",
    years: "2021-present",
    theme: "charcoal",
  },
  {
    badge: "AERA",
    label: "SIG",
    role: "Communication Officer",
    title: "AERA SIG Instructional Technology",
    years: "2022-2023",
    theme: "stone",
  },
  {
    badge: "ICCE",
    label: "Conference",
    role: "Program Co-Chair",
    title: "ICCE Educational Gamification and Game-based Learning Section",
    years: "2022-2023",
    theme: "crimson",
  },
  {
    badge: "iLRN",
    label: "Conference",
    role: "Program Co-Chair",
    title: "iLRN Practitioner Stream",
    years: "2022-2023",
    theme: "charcoal",
  },
];

const talks = siteData.talks || [
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

const contact = siteData.contact || {
  email: "jmoon19@ua.edu",
  homepage: "https://jmoon.people.ua.edu",
  researchgate: "https://www.researchgate.net/profile/Jewoong-Moon",
  labWebsite: "https://adielab.ua.edu",
  universityAddress:
    "Department of Educational Leadership, Policy, and Technology Studies Autherine Lucy Hall 315E The University of Alabama Tuscaloosa, Alabama",
};

const profile = siteData.profile || {
  name: "Dr. Jewoong Moon",
  eyebrow: "Instructional Technology | College of Education",
  heroTitleMeta: "Assistant Professor of Instructional Technology",
  heroSummary:
    "Research at The University of Alabama focused on generative AI, extended reality, game-based learning, and learning analytics for adaptive, inclusive, and computationally rich educational environments.",
  heroPanelTitle:
    "A research agenda centered on teacher learning, immersive simulation, AI-enhanced pedagogy, and evidence-rich models of how learners act, adapt, and solve problems across digital settings.",
  roleLine: "Assistant Professor",
  affiliationLines: [
    "Department of Educational Leadership, Policy, and Technology Studies",
    "The University of Alabama",
  ],
  officeLocation: "Autherine Lucy Hall 315E, Tuscaloosa, Alabama",
  department: "Department of Educational Leadership, Policy, and Technology Studies",
  institution: "The University of Alabama",
  email: contact.email,
  homepage: contact.homepage,
  researchgate: contact.researchgate,
  labWebsite: contact.labWebsite,
  cvDownloadPath: "CV_202605_MOON.docx",
  cvDownloadFilename: "CV_202605_MOON.docx",
};

const overview = siteData.overview || {
  title: "Research at the intersection of AI, XR, analytics, and learning experience design",
  paragraphs: [
    "Dr. Jewoong Moon studies how computationally rich learning environments can better support teacher education, inclusive STEM learning, and adaptive educational experiences. His work integrates generative AI, virtual and mixed reality, game-based learning, and multimodal analytics to model learning dynamics and design new forms of feedback, assessment, and immersive instruction.",
    "This portfolio brings the CV into a concise web format: research themes, current initiatives, selected publications, grant activity, mentoring, and academic leadership in one navigable profile.",
  ],
};

const appointmentsEducation = siteData.appointmentsEducation || [
  {
    year: "2021-present",
    title: "Assistant Professor",
    detail: "Instructional Technology, The University of Alabama",
    institution: "The University of Alabama",
    logo: "assets/institution-logos/ua-capstone-a-crimson.svg",
    logoAlt: "The University of Alabama logo",
    logoTheme: "ua",
  },
  {
    year: "2021",
    title: "PhD",
    detail: "Instructional Systems and Learning Technologies, Florida State University",
    institution: "Florida State University",
    logo: "assets/institution-logos/fsu-wordmark-gold.svg",
    logoAlt: "Florida State University logo",
    logoTheme: "fsu",
  },
  {
    year: "2014",
    title: "MA",
    detail: "Educational Technology, Chonnam National University",
    institution: "Chonnam National University",
    logo: "assets/institution-logos/chonnam-national-university.png",
    logoAlt: "Chonnam National University logo",
    logoTheme: "cnu",
  },
  {
    year: "2012",
    title: "BEd",
    detail: "Educational Foundations, Chonnam National University",
    institution: "Chonnam National University",
    logo: "assets/institution-logos/chonnam-national-university.png",
    logoAlt: "Chonnam National University logo",
    logoTheme: "cnu",
  },
];

const teaching = siteData.teaching || {
  teachingPortfolio: [
    "AIL 689 Practicum in Instructional Technology",
    "AIL 690 Seminar in Instructional Technology",
    "AIL 699 Dissertation Research",
    "AIL 605 Interactive Multimedia Processes",
    "AIL 606 Software Technology",
    "INTE534 Issues and Trends of Instructional Technology",
    "INTE535 Analysis, Implementation, and Evaluation of Assistive Technology",
    "CAT100, CAT200, and CAT250 undergraduate computing courses",
  ],
  courseDevelopment: [
    "Developed AIL 691 AI, Learning, and Instructional Systems",
    "Developed AIL 692 Introduction to Literature Synthesis in Instructional Technology Research",
    "Redesigned doctoral and masters courses across instructional technology and assistive technology",
    "Chair or co-chair for five doctoral dissertations",
    "Committee member across nine doctoral dissertations and one masters thesis",
    "Advises and mentors doctoral, masters, and undergraduate researchers across education, nursing, and engineering",
  ],
  earlierTeachingNote:
    "Earlier teaching at Florida State University included graduate instruction in multimedia development and instructional systems research writing.",
};

const serviceReviewCopy =
  siteData.serviceReviewCopy ||
  "Review service includes journals such as Computers & Education, British Journal of Educational Technology, IEEE Transactions on Learning Technologies, Journal of Learning Analytics, and Virtual Reality, alongside grant review for the National Science Foundation and the Swiss National Science Foundation.";

let activeFilter = "All";
let publicationSearchQuery = "";
let currentPublicationPage = 1;
const publicationsPerPage = 6;
let currentCompletePublicationPage = 1;
const completePublicationsPerPage = 10;
let activeWorkingPaperFilter = "All";
let currentWorkingPaperPage = 1;
const workingPapersPerPage = 8;
const abstractCache = new Map();
const abstractRecordCache = new Map();
let publicationRecordsCache = null;
let publicationLookupCache = null;
let abstractLibraryPromise = null;

const journalFrontProfiles = {
  "AI & Ethics": {
    publisher: "Springer Nature",
    masthead: "AI & Ethics",
    spotlight: "Ethics, governance, and policy",
    theme: "theme-ink",
    coverImage:
      "https://media.springernature.com/w68/springer-static/cover/journal/43681/6/2.jpg?as=webp",
  },
  Behaviormetrika: {
    publisher: "Springer Nature",
    masthead: "Behaviormetrika",
    spotlight: "Quantitative methods and modeling",
    theme: "theme-stone",
    coverImage:
      "https://media.springernature.com/w68/springer-static/cover/journal/41237/53/1.jpg?as=webp",
  },
  "Computers and Education: X Reality": {
    publisher: "Elsevier",
    masthead: "C&E:X Reality",
    spotlight: "XR, simulation, and design",
    theme: "theme-gold",
    coverImage: "https://ars.els-cdn.com/content/image/X29496780.jpg",
  },
  "Computers & Education: X Reality": {
    publisher: "Elsevier",
    masthead: "C&E:X Reality",
    spotlight: "XR, simulation, and design",
    theme: "theme-gold",
    coverImage: "https://ars.els-cdn.com/content/image/X29496780.jpg",
  },
  "Educational Research Review": {
    publisher: "Elsevier",
    masthead: "Educational Research Review",
    spotlight: "Review scholarship and synthesis",
    theme: "theme-sand",
    coverImage: "https://ars.els-cdn.com/content/image/X1747938X.jpg",
  },
  "Teaching and Teacher Education": {
    publisher: "Elsevier",
    masthead: "Teaching and Teacher Education",
    spotlight: "Teacher learning, practice, and preparation",
    theme: "theme-crimson",
    coverImage: "assets/journal-covers/tate.jpg",
  },
  "Education Sciences": {
    publisher: "MDPI",
    masthead: "Education Sciences",
    spotlight: "Instruction, learning, and systems",
    theme: "theme-crimson",
    coverImage: "assets/journal-covers/educationsciences.png",
  },
  "Innovation in Education and Teaching International": {
    publisher: "Taylor & Francis",
    masthead: "Innovation in Education and Teaching International",
    spotlight: "Digital pedagogy and innovation",
    theme: "theme-plum",
    coverImage: "assets/journal-covers/IETI.jpg",
  },
  "Computer Applications in Engineering Education": {
    publisher: "Wiley",
    masthead: "Computer Applications in Engineering Education",
    spotlight: "Engineering education, simulation, and computation",
    theme: "theme-navy",
    coverImage: "assets/journal-covers/caee.jpeg",
  },
  "Journal of Safety Research": {
    publisher: "Elsevier",
    masthead: "Journal of Safety Research",
    spotlight: "Safety, health, and risk research",
    theme: "theme-stone",
    coverImage: "assets/journal-covers/JSR.jpeg",
  },
  "Smart Learning Environments": {
    publisher: "SpringerOpen",
    masthead: "Smart Learning Environments",
    spotlight: "AI-enhanced learning systems and analytics",
    theme: "theme-cobalt",
    coverImage: "assets/journal-covers/SLE.jpeg",
  },
  "Online Learning": {
    publisher: "OLC",
    masthead: "Online Learning",
    spotlight: "Online teaching, networks, and digital pedagogy",
    theme: "theme-cobalt",
    coverImage: "assets/journal-covers/olj.webp",
  },
  "Online Learning Journal": {
    publisher: "OLC",
    masthead: "Online Learning",
    spotlight: "Online teaching, networks, and digital pedagogy",
    theme: "theme-cobalt",
    coverImage: "assets/journal-covers/olj.webp",
  },
  "Cogent Education": {
    publisher: "Taylor & Francis",
    masthead: "Cogent Education",
    spotlight: "Teacher learning, literacy, and pedagogy",
    theme: "theme-forest",
    coverImage: "assets/journal-covers/cogenteducation.jpg",
  },
  "Simulation & Gaming": {
    publisher: "SAGE",
    masthead: "Simulation & Gaming",
    spotlight: "Simulation, play, and professional learning",
    theme: "theme-cobalt",
    coverImage: "assets/journal-covers/simulationgaming.png",
  },
  "Computers & Education": {
    publisher: "Elsevier",
    masthead: "Computers & Education",
    spotlight: "Learning technologies in context",
    theme: "theme-gold",
    coverImage: "https://ars.els-cdn.com/content/image/X03601315.jpg",
  },
  "Technology, Knowledge, and Learning": {
    publisher: "Springer Nature",
    masthead: "Technology, Knowledge and Learning",
    spotlight: "Learning experience design and knowledge building",
    theme: "theme-teal",
    coverImage:
      "https://media.springernature.com/w68/springer-static/cover/journal/10758/31/1.jpg?as=webp",
  },
  "International Journal of Educational Technology in Higher Education": {
    publisher: "SpringerOpen",
    masthead: "ETHE",
    spotlight: "Higher education and learning analytics",
    theme: "theme-cobalt",
    coverImage:
      "https://media.springernature.com/w68/springer-static/cover/journal/41239/22/1.jpg?as=webp",
  },
  "Journal of Autism and Developmental Disorders": {
    publisher: "Springer Nature",
    masthead: "J Autism Dev Disorders",
    spotlight: "Autism, development, and intervention",
    theme: "theme-forest",
    coverImage:
      "https://media.springernature.com/w68/springer-static/cover/journal/10803/56/4.jpg?as=webp",
  },
  "British Journal of Educational Technology": {
    publisher: "Wiley",
    masthead: "BJET",
    spotlight: "Educational technology and experience design research",
    theme: "theme-navy",
  },
  "Interactive Learning Environments": {
    publisher: "Taylor & Francis (Routledge)",
    masthead: "Interactive Learning Environments",
    spotlight: "Interactive systems, immersive learning, and learner analytics",
    theme: "theme-cobalt",
    coverImage: "assets/journal-covers/ile.webp",
  },
  "ZDM – International Journal on Mathematics Education": {
    publisher: "Springer Nature",
    masthead: "ZDM Mathematics Education",
    spotlight: "Mathematics education research and theory",
    theme: "theme-gold",
    coverImage: "assets/journal-covers/zdm.jpg",
  },
  "ZDM - International Journal on Mathematics Education": {
    publisher: "Springer Nature",
    masthead: "ZDM Mathematics Education",
    spotlight: "Mathematics education research and theory",
    theme: "theme-gold",
    coverImage: "assets/journal-covers/zdm.jpg",
  },
};

const serviceThumbProfiles = {
  "Behaviour & Information Technology": {
    image: "assets/service-thumbs/bit-cover.svg",
    alt: "Behaviour & Information Technology thumbnail",
    surface: "cover",
    fit: "cover",
  },
  "International Journal of Computer-Supported Collaborative Learning": {
    image: "assets/service-thumbs/ijcscl-cover.svg",
    alt: "International Journal of Computer-Supported Collaborative Learning thumbnail",
    surface: "cover",
    fit: "cover",
  },
  "Artificial Intelligence in Language Education": {
    image: "assets/service-thumbs/aile-cover.svg",
    alt: "Artificial Intelligence in Language Education thumbnail",
    surface: "cover",
    fit: "cover",
  },
  "Journal of Applied Instructional Design": {
    image: "assets/service-thumbs/jaid-cover.svg",
    alt: "Journal of Applied Instructional Design thumbnail",
    surface: "cover",
    fit: "cover",
  },
  "Computers and Education: X Reality": {
    image: journalFrontProfiles["Computers and Education: X Reality"].coverImage,
    alt: "Computers and Education: X Reality cover",
    surface: "cover",
    fit: "cover",
  },
  "Computers & Education: X Reality": {
    image: journalFrontProfiles["Computers & Education: X Reality"].coverImage,
    alt: "Computers and Education: X Reality cover",
    surface: "cover",
    fit: "cover",
  },
  "ICCE Educational Gamification and Game-based Learning Section": {
    image: "assets/service-thumbs/icce-logo.svg",
    alt: "ICCE thumbnail",
    surface: "logo",
    fit: "contain",
  },
  "iLRN Practitioner Stream": {
    image: "assets/affiliation-logos/ilrn.png",
    alt: "iLRN logo",
    surface: "logo",
    fit: "contain",
  },
  "AERA SIG Instructional Technology": {
    image: "assets/affiliation-logos/aera.png",
    alt: "AERA logo",
    surface: "logo",
    fit: "contain",
  },
  "APSCE SIG Educational Games and Gamification": {
    image: "assets/service-thumbs/apsce-logo.svg",
    alt: "APSCE thumbnail",
    surface: "logo",
    fit: "contain",
  },
  "Immersive Learning Research Network (iLRN)": {
    image: "assets/affiliation-logos/ilrn.png",
    alt: "Immersive Learning Research Network logo",
    surface: "logo",
    fit: "contain",
  },
};

function getJournalFrontConfig(item) {
  return (
    journalFrontProfiles[item.venue] || {
      publisher: "Peer-reviewed journal",
      masthead: item.venue,
      spotlight: "Research article",
      theme: "theme-default",
    }
  );
}

function normalizeLink(link = "") {
  return link
    .trim()
    .replace(/^http:\/\//, "https://")
    .replace("https://dx.doi.org/", "https://doi.org/")
    .replace(/\/$/, "");
}

function escapeHtml(value = "") {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function slugify(value = "") {
  return value
    .toLowerCase()
    .replace(/^https?:\/\/doi\.org\//, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function cleanCitationText(citation = "") {
  return citation.replace(/^[*‡\s]+/, "").replace(/\s+/g, " ").trim();
}

function extractCitationYearMatch(citation = "") {
  return cleanCitationText(citation).match(/\([^)]*\d{4}\)\.\s*/);
}

function extractDoi(value = "") {
  const match = value.match(/10\.\d{4,9}\/[-._;()/:A-Z0-9]+/i);
  return match ? match[0].replace(/[)\].,;]+$/, "") : "";
}

function extractAuthorsFromCitation(citation = "") {
  const cleaned = cleanCitationText(citation);
  const yearMatch = extractCitationYearMatch(citation);

  if (!yearMatch) {
    return "";
  }

  return cleaned.slice(0, yearMatch.index).trim();
}

function extractTitleFromCitation(citation = "") {
  const cleaned = cleanCitationText(citation);
  const yearMatch = extractCitationYearMatch(citation);

  if (!yearMatch) {
    return "";
  }

  const afterYear = cleaned.slice(yearMatch.index + yearMatch[0].length);
  const titleEnd = afterYear.indexOf(". ");

  if (titleEnd === -1) {
    return "";
  }

  return afterYear.slice(0, titleEnd).trim();
}

function extractVenueFromCitation(citation = "") {
  const cleaned = cleanCitationText(citation);
  const matchedVenue = Object.keys(journalFrontProfiles).find((venue) =>
    cleaned.includes(venue)
  );

  if (matchedVenue) {
    return matchedVenue;
  }

  const yearMatch = extractCitationYearMatch(citation);

  if (!yearMatch) {
    return "";
  }

  const afterYear = cleaned.slice(yearMatch.index + yearMatch[0].length);
  const titleEnd = afterYear.indexOf(". ");

  if (titleEnd === -1) {
    return "";
  }

  const afterTitle = afterYear.slice(titleEnd + 2);
  const venueChunk = afterTitle
    .split("https://")[0]
    .split("http://")[0]
    .split("[")[0]
    .trim();

  if (!venueChunk) {
    return "";
  }

  return venueChunk.split(",")[0].trim();
}

function parsePublicationStatus(citation = "") {
  const match = citation.match(
    /\((Accepted|In Press|Minor revision|Major revision|Revise and resubmit|Under review|Submitted),\s*(?:19|20)\d{2}\)/i
  );

  if (!match) {
    return "";
  }

  return match[1].charAt(0).toUpperCase() + match[1].slice(1).toLowerCase();
}

function buildPublicationLookupKey({ year = "", title = "", venue = "", citation = "" }) {
  const resolvedTitle = title || extractTitleFromCitation(citation);
  const resolvedVenue = venue || extractVenueFromCitation(citation);
  return `${year}::${slugify(resolvedTitle || resolvedVenue || citation)}`;
}

function getPublicationLookups() {
  if (!publicationLookupCache) {
    const byLink = new Map();
    const byKey = new Map();

    publications.forEach((entry) => {
      const normalizedLink = normalizeLink(entry.link);
      if (normalizedLink) {
        byLink.set(normalizedLink, entry);
      }

      byKey.set(buildPublicationLookupKey(entry), entry);
    });

    publicationLookupCache = { byLink, byKey };
  }

  return publicationLookupCache;
}

function renderJournalFrontThumb(item) {
  const front = getJournalFrontConfig(item);
  const featureLabel = item.tags.slice(0, 2).join(" / ") || "Research article";

  if (front.coverImage) {
    return `
      <img
        class="journal-cover-image"
        src="${front.coverImage}"
        alt="${front.masthead} journal cover"
        loading="lazy"
      />
    `;
  }

  const fallbackFront = `
    <div class="journal-front ${front.theme}">
      <div class="journal-front-topline">${front.publisher}</div>
      <div class="journal-front-masthead">${front.masthead}</div>
      <div class="journal-front-rule"></div>
      <div class="journal-front-spotlight">${front.spotlight}</div>
      <p class="journal-front-article">${item.title}</p>
      <div class="journal-front-footer">
        <span>${item.year}</span>
        <span>${featureLabel}</span>
      </div>
    </div>
  `;

  if (item.doi) {
    return `
      <div
        class="journal-thumb-dynamic"
        data-publication-thumb-doi="${escapeHtml(item.doi)}"
        data-publication-thumb-alt="${escapeHtml(`${front.masthead} journal thumbnail`)}"
      >
        ${fallbackFront}
      </div>
    `;
  }

  return fallbackFront;
}

async function hydratePublicationThumbnailNode(node) {
  const doi = node.dataset.publicationThumbDoi;
  if (!doi) {
    return;
  }

  const record = await fetchAbstractRecord(doi);
  const thumbnailUrl = record?.thumbnailUrl || record?.coverImage || record?.imageUrl || "";
  if (!thumbnailUrl) {
    return;
  }

  const alt = node.dataset.publicationThumbAlt || "Journal thumbnail";
  node.outerHTML = `
    <img
      class="journal-cover-image"
      src="${escapeHtml(thumbnailUrl)}"
      alt="${escapeHtml(alt)}"
      loading="lazy"
    />
  `;
}

async function hydratePublicationThumbnails(root = document) {
  const nodes = Array.from(root.querySelectorAll("[data-publication-thumb-doi]"));
  await Promise.all(nodes.map(hydratePublicationThumbnailNode));
  if (nodes.length) {
    document.dispatchEvent(new CustomEvent("panel:content-updated"));
  }
}

function getServiceThumbProfile(item) {
  return serviceThumbProfiles[item.title] || null;
}

function renderServiceThumb(item) {
  const profile = getServiceThumbProfile(item);

  if (!profile?.image) {
    return `
      <div class="service-thumb theme-${item.theme}">
        <span class="service-thumb-label">${escapeHtml(item.label)}</span>
        <strong class="service-thumb-badge">${escapeHtml(item.badge)}</strong>
        <span class="service-thumb-rule"></span>
        <span class="service-thumb-years">${escapeHtml(item.years)}</span>
      </div>
    `;
  }

  return `
    <div class="service-thumb theme-${item.theme} has-art art-${profile.surface}">
      <div class="service-thumb-media">
        <img
          class="service-thumb-image ${profile.fit === "contain" ? "is-contain" : ""}"
          src="${profile.image}"
          alt="${escapeHtml(profile.alt || `${item.title} thumbnail`)}"
          loading="lazy"
        />
      </div>
      <div class="service-thumb-topline">
        <span class="service-thumb-label">${escapeHtml(item.label)}</span>
        <strong class="service-thumb-badge service-thumb-badge-chip">${escapeHtml(item.badge)}</strong>
      </div>
      <div class="service-thumb-bottomline">
        <span class="service-thumb-years">${escapeHtml(item.years)}</span>
      </div>
    </div>
  `;
}

function decodeAbstractInvertedIndex(invertedIndex) {
  if (!invertedIndex) {
    return "";
  }

  const words = [];
  Object.entries(invertedIndex).forEach(([word, positions]) => {
    positions.forEach((position) => {
      words[position] = word;
    });
  });

  return words
    .filter(Boolean)
    .join(" ")
    .replace(/\s+([,.;:?!])/g, "$1")
    .trim();
}

function stripMarkup(value = "") {
  return value
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&")
    .replace(/\s+/g, " ")
    .trim();
}

async function loadAbstractLibrary() {
  if (!abstractLibraryPromise) {
    abstractLibraryPromise = fetch("assets/publication-abstracts.json")
      .then((response) => (response.ok ? response.json() : {}))
      .catch(() => ({}));
  }

  return abstractLibraryPromise;
}

async function fetchAbstractRecord(doi) {
  if (!doi) {
    return null;
  }

  if (abstractRecordCache.has(doi)) {
    return abstractRecordCache.get(doi);
  }

  const abstractLibrary = await loadAbstractLibrary();
  const record =
    abstractLibrary && Object.prototype.hasOwnProperty.call(abstractLibrary, doi)
      ? abstractLibrary[doi]
      : null;

  abstractRecordCache.set(doi, record);
  return record;
}

async function fetchAbstractText(doi) {
  if (!doi) {
    return "";
  }

  if (abstractCache.has(doi)) {
    return abstractCache.get(doi);
  }

  const storedRecord = await fetchAbstractRecord(doi);
  if (storedRecord) {
    const storedAbstract = storedRecord.abstract || "";
    abstractCache.set(doi, storedAbstract);
    return storedAbstract;
  }

  let abstractText = "";

  try {
    const openAlexUrl = new URL("https://api.openalex.org/works");
    openAlexUrl.searchParams.set("filter", `doi:https://doi.org/${doi}`);

    const openAlexResponse = await fetch(openAlexUrl.toString());
    if (openAlexResponse.ok) {
      const openAlexData = await openAlexResponse.json();
      abstractText = decodeAbstractInvertedIndex(
        openAlexData.results?.[0]?.abstract_inverted_index
      );
    }
  } catch (error) {
    abstractText = "";
  }

  if (!abstractText) {
    try {
      const crossrefResponse = await fetch(
        `https://api.crossref.org/works/${encodeURIComponent(doi)}`
      );

      if (crossrefResponse.ok) {
        const crossrefData = await crossrefResponse.json();
        abstractText = stripMarkup(crossrefData.message?.abstract || "");
      }
    } catch (error) {
      abstractText = "";
    }
  }

  abstractCache.set(doi, abstractText);
  return abstractText;
}

function getAbstractFallback(item) {
  if (!item.doi && /(Minor revision|Major revision|Revise and resubmit)/i.test(item.citation || "")) {
    return "Manuscript is under revision; public abstract will appear after indexing.";
  }

  if (!item.doi && /(Accepted|In Press)/i.test(item.citation || "")) {
    return "Abstract will appear after the manuscript is publicly indexed.";
  }

  if (!item.doi) {
    return "Abstract unavailable for this publication record.";
  }

  return "Loading abstract...";
}

async function hydratePublicationAbstracts() {
  const abstractNodes = Array.from(
    document.querySelectorAll("[data-publication-doi]")
  );

  await Promise.all(
    abstractNodes.map(async (node) => {
      const doi = node.dataset.publicationDoi;
      if (!doi) {
        return;
      }

      const abstractText = await fetchAbstractText(doi);
      node.textContent =
        abstractText || "Abstract unavailable for this publication record.";
      node.classList.remove("is-loading");
      node.classList.toggle("is-empty", !abstractText);
    })
  );
}

function buildPublicationRecord(item) {
  const lookups = getPublicationLookups();
  const citation = cleanCitationText(item.citation);
  const parsedTitle = extractTitleFromCitation(item.citation);
  const parsedVenue = extractVenueFromCitation(item.citation);
  const normalizedLink = normalizeLink(item.link);
  const detailed =
    (normalizedLink ? lookups.byLink.get(normalizedLink) : null) ||
    lookups.byKey.get(
      buildPublicationLookupKey({
        year: item.year,
        title: parsedTitle,
        venue: parsedVenue,
        citation: item.citation,
      })
    );
  const venue = detailed?.venue || parsedVenue;
  const tags = detailed?.tags || [item.category];
  const link = item.link || detailed?.link || "";
  const doi =
    extractDoi(link) || extractDoi(detailed?.link || "") || extractDoi(citation);
  const title = detailed?.title || parsedTitle || venue;
  const authors = detailed?.authors || extractAuthorsFromCitation(item.citation);

  return {
    id: slugify(doi || `${item.year}-${title}-${venue}`),
    year: item.year,
    category: item.category,
    citation,
    link,
    note: detailed?.note || "",
    status: detailed?.status || parsePublicationStatus(citation),
    title,
    authors,
    venue,
    tags,
    doi,
    showCitation: !detailed,
  };
}

function getAllPublicationRecords() {
  if (!publicationRecordsCache) {
    publicationRecordsCache = completeJournalArticles.map(buildPublicationRecord);
  }

  return publicationRecordsCache;
}

function getPublicationDetailUrl(item) {
  return `publication.html?id=${encodeURIComponent(item.id)}`;
}

function renderProfile() {
  const heroName = document.getElementById("hero-name");
  const heroEyebrow = document.getElementById("hero-eyebrow");
  const heroTitleMeta = document.getElementById("hero-title-meta");
  const heroSummary = document.getElementById("hero-summary");
  const heroPanelTitle = document.getElementById("hero-panel-title");
  const heroActions = document.getElementById("hero-actions");
  const profileRoleLine = document.getElementById("profile-role-line");
  const profileAffiliationLines = document.getElementById("profile-affiliation-lines");

  if (heroName) {
    heroName.textContent = profile.name;
  }
  if (heroEyebrow) {
    heroEyebrow.textContent = profile.eyebrow;
  }
  if (heroTitleMeta) {
    heroTitleMeta.textContent = profile.heroTitleMeta;
  }
  if (heroSummary) {
    heroSummary.textContent = profile.heroSummary;
  }
  if (heroPanelTitle) {
    heroPanelTitle.textContent = profile.heroPanelTitle;
  }
  if (profileRoleLine) {
    profileRoleLine.textContent = profile.roleLine;
  }
  if (profileAffiliationLines) {
    profileAffiliationLines.innerHTML = (profile.affiliationLines || [])
      .map((line) => `<p class="affiliation-line">${escapeHtml(line)}</p>`)
      .join("");
  }
  if (heroActions) {
    const actions = [
      profile.email
        ? `<a class="button button-primary" href="mailto:${escapeHtml(profile.email)}">Contact</a>`
        : "",
      profile.cvDownloadPath
        ? `<a class="button" href="${escapeHtml(profile.cvDownloadPath)}" download="${escapeHtml(profile.cvDownloadFilename || "Jewoong_Moon_CV.docx")}">Download Current CV</a>`
        : "",
      profile.labWebsite
        ? `<a class="button" href="${escapeHtml(profile.labWebsite)}" target="_blank" rel="noreferrer">ADIE Lab</a>`
        : "",
    ].filter(Boolean);

    heroActions.innerHTML = actions.join("");
  }
}

function renderContactDetails() {
  const list = document.getElementById("contact-list");
  if (!list) {
    return;
  }

  const items = [
    profile.email
      ? `<li><a href="mailto:${escapeHtml(profile.email)}">${escapeHtml(profile.email)}</a></li>`
      : "",
    profile.homepage
      ? `<li><a href="${escapeHtml(profile.homepage)}" target="_blank" rel="noreferrer">Personal homepage</a></li>`
      : "",
    profile.researchgate
      ? `<li><a href="${escapeHtml(profile.researchgate)}" target="_blank" rel="noreferrer">ResearchGate</a></li>`
      : "",
    profile.labWebsite
      ? `<li><a href="${escapeHtml(profile.labWebsite)}" target="_blank" rel="noreferrer">ADIE Lab</a></li>`
      : "",
    profile.officeLocation ? `<li>${escapeHtml(profile.officeLocation)}</li>` : "",
  ].filter(Boolean);

  list.innerHTML = items.join("");
}

function renderResearchExpertise() {
  const list = document.getElementById("expertise-list");
  if (!list) {
    return;
  }

  list.innerHTML = focusAreas
    .map((item) => `<li>${escapeHtml(item)}</li>`)
    .join("");
}

function renderAppointmentsEducation() {
  const list = document.getElementById("appointment-list");
  if (!list) {
    return;
  }

  list.innerHTML = appointmentsEducation
    .map(
      (item) => `
        <li class="credential-item">
          <div class="credential-logo credential-logo-${escapeHtml(item.logoTheme || "ua")}">
            <img src="${escapeHtml(item.logo || "")}" alt="${escapeHtml(item.logoAlt || item.institution || "Institution logo")}" loading="lazy" />
          </div>
          <div class="credential-copy">
            <span class="timeline-year">${escapeHtml(item.year || "")}</span>
            <span class="credential-title">${escapeHtml(item.title || "")}</span>
            <span class="timeline-detail">${escapeHtml(item.detail || "")}</span>
          </div>
        </li>
      `
    )
    .join("");
}

function renderOverview() {
  const heading = document.getElementById("overview-heading");
  const copy = document.getElementById("overview-copy");

  if (heading) {
    heading.textContent = overview.title;
  }

  if (copy) {
    copy.innerHTML = (overview.paragraphs || [])
      .map((paragraph) => `<p class="lead-paragraph">${escapeHtml(paragraph)}</p>`)
      .join("");
  }
}

function renderTeachingSection() {
  const recentTeachingList = document.getElementById("recent-teaching-list");
  const courseDevelopmentList = document.getElementById("course-development-list");
  const earlierTeachingNote = document.getElementById("earlier-teaching-note");

  if (recentTeachingList) {
    recentTeachingList.innerHTML = (teaching.teachingPortfolio || [])
      .map((item) => `<li>${escapeHtml(item)}</li>`)
      .join("");
  }

  if (courseDevelopmentList) {
    courseDevelopmentList.innerHTML = (teaching.courseDevelopment || [])
      .map((item) => `<li>${escapeHtml(item)}</li>`)
      .join("");
  }

  if (earlierTeachingNote) {
    earlierTeachingNote.textContent = teaching.earlierTeachingNote || "";
  }
}

function renderServiceReview() {
  const copy = document.getElementById("service-review-copy");
  if (copy) {
    copy.textContent = serviceReviewCopy;
  }
}

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

function renderScholarSnapshot() {
  const root = document.getElementById("scholar-metrics");
  const link = document.getElementById("scholar-profile-link");

  if (!root) {
    return;
  }

  fetch("assets/research-analytics.json")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Scholar metrics unavailable");
      }
      return response.json();
    })
    .then((data) => {
      const summary = data.summary || {};
      const source = data.source || {};
      const sinceLabel = summary.sinceLabel || "recent";
      const metrics = [
        {
          value: summary.totalCitations,
          label: "Citations",
          note: `${sinceLabel}: ${summary.sinceYearCitations?.toLocaleString?.() || "n/a"}`,
        },
        {
          value: summary.hIndex,
          label: "h-index",
          note: `${sinceLabel}: ${summary.sinceYearHIndex ?? "n/a"}`,
        },
        {
          value: summary.i10Index,
          label: "i10-index",
          note: `${sinceLabel}: ${summary.sinceYearI10Index ?? "n/a"}`,
        },
      ];

      if (link && source.scholarProfileUrl) {
        link.href = source.scholarProfileUrl;
      }

      root.innerHTML = metrics
        .map(
          (item) => `
            <article class="scholar-metric">
              <strong>${Number(item.value || 0).toLocaleString()}</strong>
              <span>${item.label}</span>
              <small>${item.note}</small>
            </article>
          `
        )
        .join("");
    })
    .catch(() => {
      root.innerHTML = `
        <article class="scholar-metric">
          <strong>Live</strong>
          <span>Scholar metrics</span>
          <small>Open the Scholar profile for current citation totals.</small>
        </article>
      `;
    });
}

function renderFocusAreas() {
  const row = document.getElementById("focus-chips");
  row.innerHTML = focusAreas
    .map((item) => `<span class="focus-chip">${item}</span>`)
    .join("");
}

function parseHonor(raw) {
  let text = String(raw).trim().replace(/\.$/, "");
  let accolade = null;

  const finalistPrefix = text.match(
    /^Finalist\s*\(([^)]*finalists?[^)]*)\)\.\s*(.+)$/i
  );
  if (finalistPrefix) {
    accolade = "Finalist";
    const ratio = finalistPrefix[1].match(/(\d+)\s+finalists?\s+from\s+(\d+)/i);
    if (ratio) accolade = `Finalist · ${ratio[1]} of ${ratio[2]}`;
    text = finalistPrefix[2].replace(/\.$/, "");
  }

  let year = null;
  const yearMatch = text.match(/\((\d{4}(?:-\d{4})?)\)/);
  if (yearMatch) year = yearMatch[1];

  let cleaned = text.replace(/\s*\((\d{4}(?:-\d{4})?)\)\s*/g, "|Y|");
  cleaned = cleaned.replace(/\s+(\d{4})\s*\.?$/, "");

  const parts = cleaned.split("|Y|");
  let title = parts[0].trim().replace(/[,.\s]+$/, "");
  let org = (parts[1] || "")
    .trim()
    .replace(/^[,.\s]+/, "")
    .replace(/[,.\s]+$/, "");

  if (/^Finalist$/i.test(title) && org) {
    accolade = accolade || "Finalist";
    const orgParts = org.split(/,\s+/);
    title = orgParts[0].trim();
    org = orgParts.slice(1).join(", ").trim();
  }

  return { year, title, org, accolade, raw: text };
}

function renderHonors() {
  const list = document.getElementById("honor-list");
  list.innerHTML = honors
    .map((item) => {
      const h = parseHonor(item);
      const year = h.year
        ? `<span class="honor-year">${escapeHtml(h.year)}</span>`
        : `<span class="honor-year honor-year-empty">—</span>`;
      const title = `<span class="honor-title">${escapeHtml(h.title || item)}</span>`;
      const org = h.org
        ? `<span class="honor-org">${escapeHtml(h.org)}</span>`
        : "";
      const tag = h.accolade
        ? `<span class="honor-tag">${escapeHtml(h.accolade)}</span>`
        : "";
      return `<li class="honor-card">${year}<div class="honor-body">${title}${org}${tag}</div></li>`;
    })
    .join("");
}

function renderAffiliations() {
  const list = document.getElementById("affiliation-list");
  list.innerHTML = affiliations
    .map(
      (item) => `
        <li class="affiliation-item">
          <a
            class="affiliation-card affiliation-theme-${item.theme}"
            href="${item.url}"
            target="_blank"
            rel="noreferrer"
          >
            <div class="affiliation-logo-shell">
              <img class="affiliation-logo" src="${item.logo}" alt="${item.alt}" loading="lazy" />
            </div>
            <div class="affiliation-copy">
              <span class="affiliation-acronym">${item.acronym}</span>
              <span class="affiliation-name">${item.name}</span>
              <span class="affiliation-label">${item.label}</span>
            </div>
          </a>
        </li>
      `
    )
    .join("");
}

function renderNews() {
  const list = document.getElementById("news-list");
  list.innerHTML = news
    .map(
      (item) => `
        <li class="news-item">
          <div class="news-meta">
            <span class="news-date">${item.date}</span>
            <span class="news-type">${item.type}</span>
          </div>
          <p class="news-copy">${item.text}</p>
        </li>
      `
    )
    .join("");
}

function renderProjects() {
  const root = document.getElementById("project-deck");
  if (!root) return;
  const data =
    (typeof window !== "undefined" && window.__cvProjects) || {
      categories: [],
      projects: [],
    };
  const categories = data.categories || [];
  const projects = data.projects || [];

  root.innerHTML = categories
    .map((cat) => {
      const items = projects.filter((p) => p.category === cat.id);
      if (!items.length) return "";
      const cards = items
        .map((p) => {
          const lang = p.language
            ? `<span class="project-lang">${escapeHtml(p.language)}</span>`
            : "";
          const tags = (p.tags || [])
            .map(
              (t) =>
                `<span class="project-tag">${escapeHtml(t)}</span>`
            )
            .join("");
          const live = p.live
            ? `<a class="project-link project-link-live" href="${escapeHtml(p.live)}" target="_blank" rel="noreferrer">Live demo &rarr;</a>`
            : "";
          const repo = p.repo
            ? `<a class="project-link project-link-repo" href="${escapeHtml(p.repo)}" target="_blank" rel="noreferrer">Source &rarr;</a>`
            : "";
          return `
            <article class="project-card">
              <header class="project-head">
                <h4 class="project-title">${escapeHtml(p.title || p.name)}</h4>
                ${lang}
              </header>
              <p class="project-summary">${escapeHtml(p.summary || "")}</p>
              <div class="project-tag-row">${tags}</div>
              <div class="project-link-row">${live}${repo}</div>
            </article>
          `;
        })
        .join("");
      return `
        <section class="project-category">
          <header class="project-category-head">
            <h3>${escapeHtml(cat.label)}</h3>
            <p>${escapeHtml(cat.summary || "")}</p>
          </header>
          <div class="project-grid">${cards}</div>
        </section>
      `;
    })
    .join("");
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
  if (!filterRoot) {
    return;
  }
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
      currentPublicationPage = 1;
      renderFilters();
      renderPublications();
    });
  });
}

function enablePublicationSearch() {
  const input = document.getElementById("publication-search");

  if (!input) {
    return;
  }

  input.addEventListener("input", () => {
    publicationSearchQuery = input.value.trim().toLowerCase();
    currentPublicationPage = 1;
    renderPublications();
  });
}

function getVisiblePublicationRecords() {
  const query = publicationSearchQuery;

  return getAllPublicationRecords().filter((item) => {
    const matchesFilter =
      activeFilter === "All" || (item.tags || []).includes(activeFilter);

    if (!matchesFilter) {
      return false;
    }

    if (!query) {
      return true;
    }

    const searchable = [
      item.title,
      item.authors,
      item.venue,
      item.year,
      item.citation,
      ...(item.tags || []),
    ]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();

    return searchable.includes(query);
  });
}

function renderPublications() {
  const list = document.getElementById("publication-list");
  if (!list) {
    return;
  }

  const visibleItems = getVisiblePublicationRecords();

  const totalPages = Math.max(
    1,
    Math.ceil(visibleItems.length / publicationsPerPage)
  );
  currentPublicationPage = Math.min(currentPublicationPage, totalPages);

  const startIndex = (currentPublicationPage - 1) * publicationsPerPage;
  const pagedItems = visibleItems.slice(
    startIndex,
    startIndex + publicationsPerPage
  );

  if (!pagedItems.length) {
    list.innerHTML = `
      <li class="publication-empty">
        No publications match the current search and filter.
      </li>
    `;
    renderPublicationPagination(totalPages);
    document.dispatchEvent(new CustomEvent("panel:content-updated"));
    return;
  }

  list.innerHTML = pagedItems
    .map(
      (item) => `
        <li class="publication-item has-thumb">
          <div class="publication-thumb is-journal-front">
            ${renderJournalFrontThumb(item)}
          </div>
          <div class="publication-body">
            <div class="publication-meta">
              <span class="publication-year">${item.year}</span>
              ${
                item.status
                  ? `<span class="publication-status">${escapeHtml(item.status)}</span>`
                  : ""
              }
              ${
                item.note
                  ? `<span class="publication-note">${escapeHtml(item.note)}</span>`
                  : ""
              }
              ${item.tags
                .map((tag) => `<span class="tag-pill">${escapeHtml(tag)}</span>`)
                .join("")}
            </div>
            <h3 class="publication-title">
              ${
                item.link
                  ? `<a href="${escapeHtml(item.link)}" target="_blank" rel="noreferrer">${escapeHtml(item.title || item.venue)}</a>`
                  : `${escapeHtml(item.title || item.venue)}`
              }
            </h3>
            ${item.authors ? `<p class="publication-authors">${escapeHtml(item.authors)}</p>` : ""}
            ${item.venue ? `<p class="publication-venue">${escapeHtml(item.venue)}</p>` : ""}
            <p
              class="publication-abstract publication-abstract-preview ${item.doi ? "is-loading" : "is-empty"}"
              data-publication-doi="${escapeHtml(item.doi || "")}"
            >${escapeHtml(getAbstractFallback(item))}</p>
            <div class="publication-actions">
              ${
                item.link
                  ? `<a class="publication-link" href="${escapeHtml(item.link)}" target="_blank" rel="noreferrer">Journal page</a>`
                  : ""
              }
              <a class="publication-link is-primary" href="${getPublicationDetailUrl(item)}">Read more</a>
            </div>
          </div>
        </li>
      `
    )
    .join("");

  renderPublicationPagination(totalPages);
  hydratePublicationAbstracts();
  hydratePublicationThumbnails(list);
  document.dispatchEvent(new CustomEvent("panel:content-updated"));
}

function renderPublicationPagination(totalPages) {
  const root = document.getElementById("publication-pagination");

  if (!root) {
    return;
  }

  if (totalPages <= 1) {
    root.innerHTML = "";
    return;
  }

  root.innerHTML = Array.from({ length: totalPages }, (_, index) => {
    const page = index + 1;
    return `
      <button
        type="button"
        class="page-number ${page === currentPublicationPage ? "is-active" : ""}"
        data-publication-page="${page}"
      >
        ${page}
      </button>
    `;
  }).join("");

  root.querySelectorAll("[data-publication-page]").forEach((button) => {
    button.addEventListener("click", () => {
      currentPublicationPage = Number(button.dataset.publicationPage);
      renderPublications();
    });
  });
}

function renderCompletePublications() {
  const list = document.getElementById("complete-publication-list");

  if (!list) {
    return;
  }

  const totalPages = Math.max(
    1,
    Math.ceil(completeJournalArticles.length / completePublicationsPerPage)
  );
  currentCompletePublicationPage = Math.min(
    currentCompletePublicationPage,
    totalPages
  );

  const startIndex =
    (currentCompletePublicationPage - 1) * completePublicationsPerPage;
  const pagedItems = completeJournalArticles.slice(
    startIndex,
    startIndex + completePublicationsPerPage
  );

  list.innerHTML = pagedItems
    .map(
      (item, index) => `
        <li class="complete-publication-item">
          <span class="complete-publication-marker">${startIndex + index + 1}</span>
          <div class="complete-publication-body">
            <div class="complete-publication-meta">
              <span class="publication-year">${item.year}</span>
              <span class="complete-publication-category">${item.category}</span>
            </div>
            <p class="complete-publication-citation">${item.citation}</p>
            ${
              item.link
                ? `<a class="complete-publication-link" href="${item.link}" target="_blank" rel="noreferrer">View journal record</a>`
                : `<span class="complete-publication-status">Record available upon publication</span>`
            }
          </div>
        </li>
      `
    )
    .join("");

  renderCompletePublicationPagination(totalPages);
}

function renderCompletePublicationPagination(totalPages) {
  const root = document.getElementById("complete-publication-pagination");

  if (!root) {
    return;
  }

  if (totalPages <= 1) {
    root.innerHTML = "";
    return;
  }

  root.innerHTML = Array.from({ length: totalPages }, (_, index) => {
    const page = index + 1;
    return `
      <button
        type="button"
        class="page-number ${page === currentCompletePublicationPage ? "is-active" : ""}"
        data-complete-publication-page="${page}"
      >
        ${page}
      </button>
    `;
  }).join("");

  root
    .querySelectorAll("[data-complete-publication-page]")
    .forEach((button) => {
      button.addEventListener("click", () => {
        currentCompletePublicationPage = Number(
          button.dataset.completePublicationPage
        );
        renderCompletePublications();
      });
    });
}

function getVisibleWorkingPapers() {
  if (activeWorkingPaperFilter === "All") {
    return workingPapers;
  }

  return workingPapers.filter((item) => item.bucket === activeWorkingPaperFilter);
}

function renderWorkingPaperSummary() {
  const root = document.getElementById("working-paper-summary");
  if (!root) {
    return;
  }

  const metrics = [
    ["Total", workingPaperSummary.total || workingPapers.length],
    ["Submitted / review", workingPaperSummary.submittedOrUnderReview || 0],
    ["In preparation", workingPaperSummary.inPreparation || 0],
  ];

  root.innerHTML = metrics
    .map(
      ([label, value]) => `
        <span class="working-paper-metric">
          <strong>${Number(value || 0).toLocaleString()}</strong>
          <span>${escapeHtml(label)}</span>
        </span>
      `
    )
    .join("");
}

function renderWorkingPaperFilters() {
  document.querySelectorAll("[data-working-filter]").forEach((button) => {
    button.classList.toggle(
      "is-active",
      button.dataset.workingFilter === activeWorkingPaperFilter
    );

    button.onclick = () => {
      activeWorkingPaperFilter = button.dataset.workingFilter || "All";
      currentWorkingPaperPage = 1;
      renderWorkingPaperFilters();
      renderWorkingPapers();
    };
  });
}

function renderWorkingPapers() {
  const list = document.getElementById("working-paper-list");
  if (!list) {
    return;
  }

  if (!workingPapers.length) {
    list.innerHTML = `<li class="publication-empty">No working papers are available in the current CV data.</li>`;
    renderWorkingPaperPagination(1);
    return;
  }

  const visibleItems = getVisibleWorkingPapers();
  const totalPages = Math.max(1, Math.ceil(visibleItems.length / workingPapersPerPage));
  currentWorkingPaperPage = Math.min(currentWorkingPaperPage, totalPages);
  const startIndex = (currentWorkingPaperPage - 1) * workingPapersPerPage;
  const pagedItems = visibleItems.slice(startIndex, startIndex + workingPapersPerPage);

  list.innerHTML = pagedItems
    .map(
      (item, index) => `
        <li class="working-paper-item">
          <span class="working-paper-index">${startIndex + index + 1}</span>
          <div class="working-paper-body">
            <div class="working-paper-meta">
              <span class="publication-year">${escapeHtml(item.year || "Pipeline")}</span>
              <span class="working-paper-status">${escapeHtml(item.status || item.bucket || "Working paper")}</span>
              <span class="complete-publication-category">${escapeHtml(item.type || "Manuscript")}</span>
            </div>
            <h4 class="working-paper-title">${escapeHtml(item.title || item.citation || "Working paper")}</h4>
            ${item.authors ? `<p class="publication-authors">${escapeHtml(item.authors)}</p>` : ""}
            ${item.venue ? `<p class="publication-venue">${escapeHtml(item.venue)}</p>` : ""}
            <p class="working-paper-citation">${escapeHtml(item.citation || "")}</p>
          </div>
        </li>
      `
    )
    .join("");

  renderWorkingPaperPagination(totalPages);
  document.dispatchEvent(new CustomEvent("panel:content-updated"));
}

function renderWorkingPaperPagination(totalPages) {
  const root = document.getElementById("working-paper-pagination");
  if (!root) {
    return;
  }

  if (totalPages <= 1) {
    root.innerHTML = "";
    return;
  }

  root.innerHTML = Array.from({ length: totalPages }, (_, index) => {
    const page = index + 1;
    return `
      <button
        type="button"
        class="page-number ${page === currentWorkingPaperPage ? "is-active" : ""}"
        data-working-paper-page="${page}"
      >
        ${page}
      </button>
    `;
  }).join("");

  root.querySelectorAll("[data-working-paper-page]").forEach((button) => {
    button.addEventListener("click", () => {
      currentWorkingPaperPage = Number(button.dataset.workingPaperPage);
      renderWorkingPapers();
    });
  });
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

function formatCurrencyShort(value) {
  if (value >= 1000000) {
    return `$${(value / 1000000).toFixed(1)}M`;
  }

  if (value >= 1000) {
    return `$${Math.round(value / 1000)}K`;
  }

  return `$${value}`;
}

function renderGrantDashboard() {
  const totalPortfolio =
    grantPortfolio.fundedTotal + grantPortfolio.pendingTotal;
  const fundedShare = (grantPortfolio.fundedTotal / totalPortfolio) * 100;
  const pendingShare = (grantPortfolio.pendingTotal / totalPortfolio) * 100;

  const metrics = document.getElementById("grant-metrics");
  metrics.innerHTML = `
    <div class="grant-metric-card">
      <span class="grant-metric-label">Awarded Total</span>
      <strong>${formatCurrencyShort(grantPortfolio.fundedTotal)}</strong>
      <span class="grant-metric-sub">${grantPortfolio.fundedCount} funded awards in CV</span>
    </div>
    <div class="grant-metric-card">
      <span class="grant-metric-label">Pending Total</span>
      <strong>${formatCurrencyShort(grantPortfolio.pendingTotal)}</strong>
      <span class="grant-metric-sub">${grantPortfolio.pendingCount} active proposals</span>
    </div>
    <div class="grant-metric-card">
      <span class="grant-metric-label">Portfolio Total</span>
      <strong>${formatCurrencyShort(totalPortfolio)}</strong>
      <span class="grant-metric-sub">Awarded and pending combined</span>
    </div>
  `;

  const stack = document.getElementById("grant-stack");
  stack.innerHTML = `
    <div class="grant-stack-bar" aria-label="Funding totals comparison">
      <span class="grant-stack-segment funded" style="width: ${fundedShare}%"></span>
      <span class="grant-stack-segment pending" style="width: ${pendingShare}%"></span>
    </div>
    <div class="grant-stack-notes">
      <span>Funded share: ${fundedShare.toFixed(1)}%</span>
      <span>Pending share: ${pendingShare.toFixed(1)}%</span>
    </div>
  `;

  renderGrantBars("funded-bars", grants.funded, "funded");
  renderGrantBars("pending-bars", grants.pending, "pending");
}

function renderGrantBars(targetId, items, status) {
  const root = document.getElementById(targetId);
  const numericItems = items.filter((item) => typeof item.amountValue === "number");
  const maxValue = numericItems.length
    ? Math.max(...numericItems.map((item) => item.amountValue))
    : 1;

  root.innerHTML = items
    .map((item) => {
      const width =
        typeof item.amountValue === "number"
          ? Math.max(16, (item.amountValue / maxValue) * 100)
          : 28;

      return `
        <article class="grant-bar-card">
          <div class="grant-bar-topline">
            <span class="grant-bar-title">${item.title}</span>
            <span class="grant-bar-amount">${item.amount}</span>
          </div>
          <div class="grant-bar-track">
            <span class="grant-bar-fill ${status} ${
              typeof item.amountValue === "number" ? "" : "is-unknown"
            }" style="width: ${width}%"></span>
          </div>
          <p class="grant-bar-meta">${item.meta}</p>
        </article>
      `;
    })
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

function renderServiceCards(targetId, items) {
  const list = document.getElementById(targetId);
  list.innerHTML = items
    .map(
      (item) => `
        <li>
          <article class="service-card">
            ${renderServiceThumb(item)}
            <div class="service-card-body">
              <p class="service-role">${item.role}</p>
              <h4 class="service-title">${item.title}</h4>
              <p class="service-meta-line">
                <span class="service-meta-pill">${item.label}</span>
                <span class="service-years">${item.years}</span>
              </p>
            </div>
          </article>
        </li>
      `
    )
    .join("");
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

function enablePanelNavigation() {
  const deck = document.getElementById("content-deck");
  const panels = Array.from(document.querySelectorAll(".content-panel"));
  const tabs = Array.from(document.querySelectorAll("[data-panel-target]"));

  if (!deck || !panels.length || !tabs.length) {
    return;
  }

  function syncDeckHeight() {
    const activePanel = deck.querySelector(".content-panel.is-active");
    if (!activePanel) {
      return;
    }

    deck.style.height = `${activePanel.offsetHeight}px`;
  }

  function activatePanel(panelName) {
    const targetPanel =
      panels.find((panel) => panel.dataset.panel === panelName) || panels[0];

    panels.forEach((panel) => {
      panel.classList.toggle("is-active", panel === targetPanel);
    });

    tabs.forEach((tab) => {
      tab.classList.toggle(
        "is-active",
        tab.dataset.panelTarget === targetPanel.dataset.panel
      );
    });

    targetPanel.querySelectorAll(".reveal").forEach((node) => {
      node.classList.add("is-visible");
    });

    requestAnimationFrame(syncDeckHeight);
    document.dispatchEvent(
      new CustomEvent("panel:activated", {
        detail: { panel: targetPanel.dataset.panel },
      })
    );
  }

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      activatePanel(tab.dataset.panelTarget);
    });
  });

  const hashTarget = window.location.hash.replace("#", "");
  const validHash = panels.some((panel) => panel.dataset.panel === hashTarget);

  activatePanel(validHash ? hashTarget : "overview");
  window.addEventListener("resize", syncDeckHeight);
  document.addEventListener("panel:content-updated", syncDeckHeight);
}

window.__cvSite = {
  escapeHtml,
  fetchAbstractRecord,
  fetchAbstractText,
  getAbstractFallback,
  getAllPublicationRecords,
  getPublicationDetailUrl,
  hydratePublicationThumbnails,
  renderJournalFrontThumb,
};

if (document.getElementById("content-deck")) {
  renderProfile();
  renderContactDetails();
  renderResearchExpertise();
  renderAppointmentsEducation();
  renderOverview();
  renderStats();
  renderScholarSnapshot();
  renderFocusAreas();
  renderHonors();
  renderAffiliations();
  renderNews();
  renderProjects();
  renderInitiatives();
  renderFilters();
  enablePublicationSearch();
  renderPublications();
  renderCompletePublications();
  renderWorkingPaperSummary();
  renderWorkingPaperFilters();
  renderWorkingPapers();
  renderGrantList("funded-list", grants.funded);
  renderGrantList("pending-list", grants.pending);
  renderGrantDashboard();
  renderTeachingSection();
  renderMentoringMetrics();
  renderServiceCards("editorial-list", editorialRoles);
  renderServiceCards("leadership-list", leadershipRoles);
  renderServiceReview();
  renderTalks();
  enableRevealMotion();
  enablePanelNavigation();
  enableThemeToggle();
}

function enableThemeToggle() {
  const button = document.getElementById("theme-toggle");
  if (!button) return;
  const root = document.documentElement;
  const updateLabel = () => {
    const isDark = root.getAttribute("data-theme") === "dark";
    button.setAttribute("aria-pressed", String(isDark));
    button.setAttribute(
      "aria-label",
      isDark ? "Switch to light mode" : "Switch to dark mode"
    );
    button.setAttribute(
      "title",
      isDark ? "Switch to light mode" : "Switch to dark mode"
    );
  };
  updateLabel();
  button.addEventListener("click", () => {
    const next =
      root.getAttribute("data-theme") === "dark" ? "light" : "dark";
    root.setAttribute("data-theme", next);
    try {
      localStorage.setItem("theme", next);
    } catch (e) {}
    updateLabel();
  });
}
