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

const affiliations = [
  "American Educational Research Association (AERA)",
  "Association for Education Communications and Technology (AECT)",
  "International Society of the Learning Sciences (ISLS)",
  "Immersive Learning Research Network (iLRN)",
];

const honors = [
  "2026 Nellie Rose McCrory Faculty Excellence Award - Research Division",
  "2026 William T. Grant Foundation Scholars Program Finalist",
  "2025 Dean's Merit Award in Research Excellence",
  "2024 Outstanding iLEAD Paper Award",
];

const grantPortfolio = {
  fundedTotal: 107459,
  pendingTotal: 638536,
  fundedCount: 12,
  pendingCount: 4,
};

const news = [
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

const completeJournalArticles = [
  {
    year: "2026",
    category: "International",
    citation:
      "Aldemir, T., Bicer, Al., Kilinc, S., Moon, J., & Kwok, M. (Accepted, 2026). Challenges, solutions, and PD needs for integrating AI: Insights from a two-week AI literacy module with preservice teachers. Cogent Education [ESCI-indexed]",
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

const grants = {
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

const mentoringMetrics = [
  { value: "5", label: "doctoral chairs or co-chairs" },
  { value: "9", label: "doctoral committee appointments" },
  { value: "7", label: "current course advisees" },
  { value: "10", label: "research mentees across projects" },
];

const editorialRoles = [
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

const leadershipRoles = [
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
let currentPublicationPage = 1;
const publicationsPerPage = 6;
let currentCompletePublicationPage = 1;
const completePublicationsPerPage = 10;
const abstractCache = new Map();
let publicationRecordsCache = null;
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

  return `
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

async function fetchAbstractText(doi) {
  if (!doi) {
    return "";
  }

  if (abstractCache.has(doi)) {
    return abstractCache.get(doi);
  }

  const abstractLibrary = await loadAbstractLibrary();
  if (
    abstractLibrary &&
    Object.prototype.hasOwnProperty.call(abstractLibrary, doi)
  ) {
    const storedAbstract = abstractLibrary[doi].abstract || "";
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
  if (!item.doi && /(Accepted|In Press|Minor revision|Major revision)/i.test(item.citation || "")) {
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
  const detailedByLink = new Map(
    publications.map((entry) => [normalizeLink(entry.link), entry])
  );
  const detailed = detailedByLink.get(normalizeLink(item.link));
  const venue = detailed?.venue || extractVenueFromCitation(item.citation);
  const tags = detailed?.tags || [item.category];
  const citation = cleanCitationText(item.citation);
  const link = item.link || detailed?.link || "";
  const doi =
    extractDoi(link) || extractDoi(detailed?.link || "") || extractDoi(citation);
  const title = detailed?.title || extractTitleFromCitation(item.citation) || venue;
  const authors = detailed?.authors || extractAuthorsFromCitation(item.citation);

  return {
    id: slugify(doi || `${item.year}-${title}-${venue}`),
    year: item.year,
    category: item.category,
    citation,
    link,
    note: detailed?.note || "",
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

function renderAffiliations() {
  const list = document.getElementById("affiliation-list");
  list.innerHTML = affiliations.map((item) => `<li>${item}</li>`).join("");
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

function renderPublications() {
  const list = document.getElementById("publication-list");
  if (!list) {
    return;
  }

  const visibleItems = getAllPublicationRecords();

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
                item.note
                  ? `<span class="publication-note">${item.note}</span>`
                  : ""
              }
              ${item.tags
                .map((tag) => `<span class="tag-pill">${tag}</span>`)
                .join("")}
            </div>
            <h3 class="publication-title">
              ${
                item.link
                  ? `<a href="${item.link}" target="_blank" rel="noreferrer">${item.title || item.venue}</a>`
                  : `${item.title || item.venue}`
              }
            </h3>
            ${item.authors ? `<p class="publication-authors">${item.authors}</p>` : ""}
            ${item.venue ? `<p class="publication-venue">${item.venue}</p>` : ""}
            <p
              class="publication-abstract publication-abstract-preview ${item.doi ? "is-loading" : "is-empty"}"
              data-publication-doi="${escapeHtml(item.doi || "")}"
            >${escapeHtml(getAbstractFallback(item))}</p>
            <div class="publication-actions">
              ${
                item.link
                  ? `<a class="publication-link" href="${item.link}" target="_blank" rel="noreferrer">Journal page</a>`
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
            <div class="service-thumb theme-${item.theme}">
              <span class="service-thumb-label">${item.label}</span>
              <strong class="service-thumb-badge">${item.badge}</strong>
              <span class="service-thumb-rule"></span>
              <span class="service-thumb-years">${item.years}</span>
            </div>
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
}

window.__cvSite = {
  escapeHtml,
  fetchAbstractText,
  getAbstractFallback,
  getAllPublicationRecords,
  getPublicationDetailUrl,
  renderJournalFrontThumb,
};

if (document.getElementById("content-deck")) {
  renderStats();
  renderFocusAreas();
  renderHonors();
  renderAffiliations();
  renderNews();
  renderInitiatives();
  renderPublications();
  renderCompletePublications();
  renderGrantList("funded-list", grants.funded);
  renderGrantList("pending-list", grants.pending);
  renderGrantDashboard();
  renderMentoringMetrics();
  renderServiceCards("editorial-list", editorialRoles);
  renderServiceCards("leadership-list", leadershipRoles);
  renderTalks();
  enableRevealMotion();
  enablePanelNavigation();
}
