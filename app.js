(() => {
const siteData = window.__cvSiteData;
const requiredArrays = ["stats", "publications", "completeJournalArticles", "workingPapers", "bookChapters"];
if (!siteData || !requiredArrays.every(key => Array.isArray(siteData[key])) || !siteData.profile || !siteData.grants) {
  const mount = document.getElementById("content-deck") || document.getElementById("publication-detail-root");
  if (mount) mount.innerHTML = '<p role="status">CV data could not be loaded. Please reload this page or <a href="CV_202605_MOON.docx">download the CV</a>.</p>';
  return;
}

const stats = siteData.stats;

const focusAreas = siteData.focusAreas;

const affiliations = siteData.affiliations;

const honors = siteData.honors;

const grantPortfolio = siteData.grantPortfolio;

const news = siteData.news;

const initiatives = siteData.initiatives;

const publications = siteData.publications;

const completeJournalArticles = siteData.completeJournalArticles;

const grants = siteData.grants;

const workingPapers = siteData.workingPapers;
const bookChapters = siteData.bookChapters;
const workingPaperSummary = siteData.workingPaperSummary;

const mentoringMetrics = siteData.mentoringMetrics;

const editorialRoles = siteData.editorialRoles;

const leadershipRoles = siteData.leadershipRoles;

const talks = siteData.talks;

const contact = siteData.contact;

const profile = siteData.profile;

const overview = siteData.overview;

const appointmentsEducation = siteData.appointmentsEducation;

const labDirectorship = {
  year: "Current",
  title: "Director, AdDIE Lab",
  detail: "Adaptive Design of Immersive E-Learning Lab",
  institution: "The University of Alabama",
  logo: "assets/lab-logos/addie-symbol.svg",
  logoAlt: "AdDIE Lab Immersive Frame logo",
  logoTheme: "addie",
};

const teaching = siteData.teaching;

const teachingCourseFocus = {
  "AIL 689":
    "A field-based practicum focused on applying instructional technology knowledge through supervised professional work.",
  "AIL 690":
    "A graduate seminar examining current research, theories, and professional issues in instructional technology.",
  "AIL 699":
    "Faculty-supervised doctoral dissertation research, including study design, analysis, and scholarly writing.",
  "AIL 605":
    "Design and development of interactive multimedia experiences for teaching, learning, and training.",
  "AIL 606":
    "Software tools, systems, and development practices used to create technology-supported learning experiences.",
  "INTE 534":
    "Current issues, emerging technologies, and research trends shaping instructional technology practice.",
  "INTE 535":
    "Selection, implementation, and evaluation of assistive technologies that support accessible learning.",
  "CAT 100":
    "An introduction to computer concepts, digital literacy, and practical productivity applications.",
  "CAT 200":
    "Educational uses of computers and digital tools for classroom teaching and student learning.",
  "CAT 250":
    "Curriculum planning, instructional design, and teaching strategies for computer education.",
};

const serviceReviewCopy = siteData.serviceReviewCopy;

let activeFilter = "All";
let publicationSearchQuery = "";
let currentPublicationPage = 1;
const publicationsPerPage = 6;
let currentCompletePublicationPage = 1;
const completePublicationsPerPage = 10;
let activeWorkingPaperFilter = "All";
let currentWorkingPaperPage = 1;
const workingPapersPerPage = 8;
let bookChaptersExpanded = false;
const bookChapterCollapsedLimit = 4;
const abstractCache = new Map();
const abstractRecordCache = new Map();
let publicationRecordsCache = null;
let publicationLookupCache = null;
let abstractLibraryPromise = null;

const journalFrontProfiles = {
  "Journal of Research on Technology in Education": {
    publisher: "Taylor & Francis / ISTE",
    masthead: "Journal of Research on Technology in Education",
    spotlight: "Technology-enhanced teaching and learning",
    theme: "theme-cobalt",
    coverImage: "assets/journal-covers/jrte-official.jpg",
  },
  "AI & Society": {
    publisher: "Springer Nature",
    masthead: "AI & Society",
    spotlight: "Knowledge, culture, and communication",
    theme: "theme-ink",
    coverImage: "assets/journal-covers/ai-and-society.webp",
  },
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
    coverImage: "assets/journal-covers/cexr.webp",
  },
  "Computers & Education: X Reality": {
    publisher: "Elsevier",
    masthead: "C&E:X Reality",
    spotlight: "XR, simulation, and design",
    theme: "theme-gold",
    coverImage: "assets/journal-covers/cexr.webp",
  },
  "Educational Research Review": {
    publisher: "Elsevier",
    masthead: "Educational Research Review",
    spotlight: "Review scholarship and synthesis",
    theme: "theme-sand",
    coverImage: "https://ars.els-cdn.com/content/image/X1747938X.jpg",
  },
  "Educational Psychology Review": {
    publisher: "Springer Nature",
    masthead: "Educational Psychology Review",
    spotlight: "Integrative reviews in educational psychology",
    theme: "theme-gold",
    coverImage: "assets/journal-covers/educational-psychology-review.webp",
  },
  "Ethics & Behavior": {
    publisher: "Taylor & Francis",
    masthead: "Ethics & Behavior",
    spotlight: "Moral conduct, responsibility, and research ethics",
    theme: "theme-ink",
    coverImage: "assets/journal-covers/ethics-and-behavior.jpg",
  },
  "Ethics and Behavior": {
    publisher: "Taylor & Francis",
    masthead: "Ethics & Behavior",
    spotlight: "Moral conduct, responsibility, and research ethics",
    theme: "theme-ink",
    coverImage: "assets/journal-covers/ethics-and-behavior.jpg",
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
  "Journal of Applied Instructional Design": {
    publisher: "AECT",
    masthead: "JAID",
    spotlight: "Applied instructional design and practice",
    theme: "theme-cobalt",
    coverImage: "assets/journal-covers/jaid.webp",
  },
  "Educational Technology & Society": {
    publisher: "IFETS",
    masthead: "Educational Technology & Society",
    spotlight: "Educational technology, society, and learning systems",
    theme: "theme-crimson",
    coverImage: "assets/journal-covers/ets.jpg",
  },
  "Journal of Educational Technology & Society": {
    publisher: "IFETS",
    masthead: "Educational Technology & Society",
    spotlight: "Educational technology, society, and learning systems",
    theme: "theme-crimson",
    coverImage: "assets/journal-covers/ets.jpg",
  },
};

const serviceThumbProfiles = {
  "Behaviour & Information Technology": {
    image: "assets/service-thumbs/bit-cover-official.png",
    alt: "Official Behaviour & Information Technology journal cover",
    surface: "cover",
    fit: "cover",
    position: "left center",
  },
  "International Journal of Computer-Supported Collaborative Learning": {
    image: "assets/service-thumbs/ijcscl-cover-official.webp",
    alt: "Official International Journal of Computer-Supported Collaborative Learning cover",
    surface: "cover",
    fit: "cover",
  },
  "British Journal of Educational Technology": {
    image: "assets/service-thumbs/bjet-cover-official.jpg",
    alt: "Official British Journal of Educational Technology cover",
    surface: "cover",
    fit: "cover",
  },
  "Artificial Intelligence in Language Education": {
    image: "assets/service-thumbs/aile-cover-official.png",
    alt: "Official Artificial Intelligence in Language Education cover",
    surface: "cover",
    fit: "cover",
  },
  "Journal of Applied Instructional Design": {
    image: "assets/service-thumbs/jaid-cover-official.png",
    alt: "Official Journal of Applied Instructional Design cover",
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

function slugifyVenue(value = "") {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "");
}

const journalFrontProfileSlugIndex = (() => {
  const index = new Map();
  for (const key of Object.keys(journalFrontProfiles)) {
    const slug = slugifyVenue(key);
    if (!index.has(slug)) index.set(slug, key);
  }
  return index;
})();

function findJournalFrontProfile(venue) {
  if (!venue) return null;
  if (journalFrontProfiles[venue]) return journalFrontProfiles[venue];

  const baseVenue = venue.split(",")[0].trim();
  if (baseVenue && baseVenue !== venue && journalFrontProfiles[baseVenue]) {
    return journalFrontProfiles[baseVenue];
  }

  const slug = slugifyVenue(venue);
  const baseSlug = slugifyVenue(baseVenue);
  if (journalFrontProfileSlugIndex.has(slug)) {
    return journalFrontProfiles[journalFrontProfileSlugIndex.get(slug)];
  }
  if (baseSlug && journalFrontProfileSlugIndex.has(baseSlug)) {
    return journalFrontProfiles[journalFrontProfileSlugIndex.get(baseSlug)];
  }
  // singular/plural tolerance: "Environment" <-> "Environments"
  if (journalFrontProfileSlugIndex.has(slug + "s")) {
    return journalFrontProfiles[journalFrontProfileSlugIndex.get(slug + "s")];
  }
  if (slug.endsWith("s") && journalFrontProfileSlugIndex.has(slug.slice(0, -1))) {
    return journalFrontProfiles[journalFrontProfileSlugIndex.get(slug.slice(0, -1))];
  }
  return null;
}

function getJournalFrontConfig(item) {
  return (
    findJournalFrontProfile(item.venue) || {
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

function highlightSelfAuthor(html = "") {
  return html.replace(
    /(Moon,\s*J\.)/g,
    '<strong class="self-author">$1</strong>'
  );
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
        width="320"
        height="420"
        decoding="async"
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
      width="320"
      height="420"
      decoding="async"
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
          style="object-position: ${escapeHtml(profile.position || "center center")};"
          loading="lazy"
          width="320"
          height="180"
          decoding="async"
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
    profileRoleLine.textContent = `${profile.roleLine} · Director, AdDIE Lab`;
  }
  if (profileAffiliationLines) {
    profileAffiliationLines.innerHTML = (profile.affiliationLines || [])
      .map((line) => `<p class="affiliation-line">${escapeHtml(line)}</p>`)
      .join("");
  }
  if (heroActions) {
    const labIcon =
      '<img class="button-lab-icon" src="assets/lab-logos/addie-symbol.svg" width="22" height="22" alt="" aria-hidden="true">';
    const actions = [
      profile.labWebsite
        ? `<a class="button button-lab" href="${escapeHtml(profile.labWebsite)}" target="_blank" rel="noreferrer">${labIcon}AdDIE Lab · Director</a>`
        : "",
      profile.email
        ? `<a class="button button-primary" href="mailto:${escapeHtml(profile.email)}">Contact</a>`
        : "",
      profile.cvDownloadPath
        ? `<a class="button" href="${escapeHtml(profile.cvDownloadPath)}" download="${escapeHtml(profile.cvDownloadFilename || "Jewoong_Moon_CV.docx")}">Download Current CV</a>`
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

  list.innerHTML = [labDirectorship, ...appointmentsEducation]
    .map(
      (item) => `
        <li class="credential-item">
          <div class="credential-logo credential-logo-${escapeHtml(item.logoTheme || "ua")}">
            <img src="${escapeHtml(item.logo || "")}" alt="${escapeHtml(item.logoAlt || item.institution || "Institution logo")}" loading="lazy" width="190" height="48" decoding="async" />
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
      .map((item, index) => {
        const match = item.match(/^([A-Z]{2,5})\s*(\d{3,4})\s+(.+)$/);
        const code = match ? `${match[1]} ${match[2]}` : "Course";
        const title = match ? match[3] : item;
        const focus =
          teachingCourseFocus[code] ||
          `Coursework focused on ${title.replace(/[.!?]+$/, "").toLowerCase()}.`;
        const tooltipId = `course-tooltip-${index}`;

        return `
          <li class="course-tooltip-item">
            <span
              class="course-tooltip-trigger"
              tabindex="0"
              aria-describedby="${tooltipId}"
              aria-label="Course information for ${escapeHtml(code)} ${escapeHtml(title)}"
            >
              <span class="course-code">${escapeHtml(code)}</span>
              <span class="course-name">${escapeHtml(title)}</span>
              <span class="course-info-icon" aria-hidden="true">i</span>
            </span>
            <span class="course-tooltip" id="${tooltipId}" role="tooltip">
              <strong>${escapeHtml(code)} · Course focus</strong>
              <span>${escapeHtml(focus)}</span>
            </span>
          </li>
        `;
      })
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
              <img class="affiliation-logo" src="${item.logo}" alt="${item.alt}" loading="lazy" width="160" height="80" decoding="async" />
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
          const thumbnail = p.portfolioImage || p.thumb;
          const preview = thumbnail
            ? `<figure class="archive-project-preview"><a class="current-project-image" href="${escapeHtml(p.live || p.repo)}" target="_blank" rel="noopener noreferrer"><img src="${escapeHtml(thumbnail)}" width="1600" height="1000" alt="${escapeHtml(p.imageAlt || ("Project image from " + (p.title || p.name)))}" loading="lazy" decoding="async"></a>${p.thumbnailCaption ? `<figcaption>${escapeHtml(p.thumbnailCaption)}</figcaption>` : ""}</figure>`
            : "";
          return `
            <article class="project-card">
              ${preview}
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
        }" type="button" data-filter="${escapeHtml(tag)}" aria-pressed="${
          tag === activeFilter
        }">
          ${escapeHtml(tag)}
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
  const status = document.getElementById("publication-results-status");
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
    if (status) {
      status.textContent = "No publications match the current search and filter.";
    }
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
            ${item.authors ? `<p class="publication-authors">${highlightSelfAuthor(escapeHtml(item.authors))}</p>` : ""}
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

  if (status) {
    const endIndex = Math.min(startIndex + pagedItems.length, visibleItems.length);
    status.textContent = `Showing ${startIndex + 1}–${endIndex} of ${
      visibleItems.length
    } matching publications.`;
  }

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
        aria-label="Publication page ${page}"
        ${page === currentPublicationPage ? 'aria-current="page"' : ""}
      >
        ${page}
      </button>
    `;
  }).join("");

  root.querySelectorAll("[data-publication-page]").forEach((button) => {
    button.addEventListener("click", () => {
      currentPublicationPage = Number(button.dataset.publicationPage);
      renderPublications();
      document
        .querySelector('#publication-pagination [aria-current="page"]')
        ?.focus();
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
            <p class="complete-publication-citation">${highlightSelfAuthor(escapeHtml(item.citation || ""))}</p>
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
        aria-label="Complete publication page ${page}"
        ${page === currentCompletePublicationPage ? 'aria-current="page"' : ""}
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
        document
          .querySelector('#complete-publication-pagination [aria-current="page"]')
          ?.focus();
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
    const isActive =
      button.dataset.workingFilter === activeWorkingPaperFilter;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-pressed", String(isActive));

    button.onclick = () => {
      activeWorkingPaperFilter = button.dataset.workingFilter || "All";
      currentWorkingPaperPage = 1;
      renderWorkingPaperFilters();
      renderWorkingPapers();
    };
  });
}

function renderBookChapters() {
  const list = document.getElementById("book-chapter-list");
  if (!list) {
    return;
  }

  if (!bookChapters.length) {
    list.innerHTML = `<li class="publication-empty">No book chapters are available in the current CV data.</li>`;
    return;
  }

  const visibleItems = bookChaptersExpanded
    ? bookChapters
    : bookChapters.slice(0, bookChapterCollapsedLimit);
  const hasOverflow = bookChapters.length > bookChapterCollapsedLimit;

  list.innerHTML = `${visibleItems
    .map(
      (item, index) => `
        <li class="working-paper-item">
          <span class="working-paper-index">${index + 1}</span>
          <div class="working-paper-body">
            <div class="working-paper-meta">
              <span class="publication-year">${escapeHtml(item.year || "")}</span>
              <span class="working-paper-status">${escapeHtml(item.status || "Published")}</span>
              <span class="complete-publication-category">Book Chapter</span>
            </div>
            <h4 class="working-paper-title">${escapeHtml(item.title || "Book chapter")}</h4>
            ${item.authors ? `<p class="publication-authors">${highlightSelfAuthor(escapeHtml(item.authors))}</p>` : ""}
            ${item.venue ? `<p class="publication-venue">${escapeHtml(item.venue)}</p>` : ""}
            <p class="working-paper-citation">${highlightSelfAuthor(escapeHtml(item.citation || ""))}</p>
            ${item.link ? `<a class="publication-link" href="${escapeHtml(item.link)}" target="_blank" rel="noreferrer">DOI record</a>` : ""}
          </div>
        </li>
      `
    )
    .join("")}
    ${hasOverflow ? `<li class="publication-empty"><button class="publication-toggle" id="book-chapter-toggle" type="button" aria-expanded="${bookChaptersExpanded}">${bookChaptersExpanded ? "Show fewer" : `Show all (${bookChapters.length})`}</button></li>` : ""}`;

  document.getElementById("book-chapter-toggle")?.addEventListener("click", () => {
    bookChaptersExpanded = !bookChaptersExpanded;
    renderBookChapters();
  });
  document.dispatchEvent(new CustomEvent("panel:content-updated"));
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
            ${item.authors ? `<p class="publication-authors">${highlightSelfAuthor(escapeHtml(item.authors))}</p>` : ""}
            ${item.venue ? `<p class="publication-venue">${escapeHtml(item.venue)}</p>` : ""}
            <p class="working-paper-citation">${highlightSelfAuthor(escapeHtml(item.citation || ""))}</p>
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
        aria-label="Working paper page ${page}"
        ${page === currentWorkingPaperPage ? 'aria-current="page"' : ""}
      >
        ${page}
      </button>
    `;
  }).join("");

  root.querySelectorAll("[data-working-paper-page]").forEach((button) => {
    button.addEventListener("click", () => {
      currentWorkingPaperPage = Number(button.dataset.workingPaperPage);
      renderWorkingPapers();
      document
        .querySelector('#working-paper-pagination [aria-current="page"]')
        ?.focus();
    });
  });
}

const grantFunderMarks = {
  imls: {
    name: "Institute of Museum and Library Services",
    src: "assets/funder-logos/imls.png",
    shape: "is-wide",
  },
  nrf: {
    name: "National Research Foundation of Korea",
    src: "assets/funder-logos/nrf-korea.jpg",
    shape: "is-wide",
  },
  ua: {
    name: "The University of Alabama",
    src: "assets/funder-logos/ua.svg",
    shape: "is-symbol",
  },
  ache: {
    name: "Alabama Commission on Higher Education",
    src: "assets/funder-logos/ache.png",
    shape: "is-symbol",
  },
  sec: {
    name: "Southeastern Conference",
    src: "assets/funder-logos/sec.png",
    shape: "is-symbol",
  },
  aera: {
    name: "American Educational Research Association",
    src: "assets/funder-logos/aera.png",
    shape: "is-wide",
  },
  aims: {
    name: "Advancing Innovative Math Solutions Collaboratory",
    src: "assets/funder-logos/aims.png",
    shape: "is-wide",
  },
  nsf: {
    name: "National Science Foundation",
    src: "assets/funder-logos/nsf.png",
    shape: "is-symbol",
  },
  nih: {
    name: "National Institutes of Health",
    src: "assets/funder-logos/nih.png",
    shape: "is-symbol",
  },
};

function getGrantFunderMark(item) {
  const searchable = `${item.title || ""} ${item.meta || ""}`.toLowerCase();

  if (searchable.includes("museum and library services") || searchable.includes("imls")) {
    return grantFunderMarks.imls;
  }
  if (searchable.includes("national research foundation of korea") || searchable.includes("(nrf)")) {
    return grantFunderMarks.nrf;
  }
  if (searchable.includes("aera-nsf")) return grantFunderMarks.aera;
  if (searchable.includes("innovative math solutions") || searchable.includes("aims collaboratory")) {
    return grantFunderMarks.aims;
  }
  if (searchable.includes("national institutes of health") || searchable.includes("(nih)")) {
    return grantFunderMarks.nih;
  }
  if (
    searchable.includes("national science foundation") ||
    searchable.includes("nsf ritel") ||
    searchable.includes("camel-cn")
  ) {
    return grantFunderMarks.nsf;
  }
  if (searchable.includes("alabama commission on higher education")) {
    return grantFunderMarks.ache;
  }
  if (searchable.includes("sec faculty travel")) return grantFunderMarks.sec;
  return grantFunderMarks.ua;
}

function renderGrantFunderMark(item) {
  const funder = getGrantFunderMark(item);
  return `
    <span class="grant-funder-mark ${funder.shape}" title="${escapeHtml(
      funder.name
    )}">
      <img src="${escapeHtml(funder.src)}" alt="${escapeHtml(
        `${funder.name} logo`
      )}" loading="lazy" decoding="async" />
    </span>
  `;
}

function renderGrantList(targetId, items) {
  const list = document.getElementById(targetId);
  const withdrawnSection = list.closest(".grant-withdrawn-list");
  if (withdrawnSection) withdrawnSection.hidden = items.length === 0;
  list.innerHTML = items
    .map(
      (item) => `
        <li class="grant-list-item">
          ${renderGrantFunderMark(item)}
          <span class="grant-list-copy">
            <strong>${escapeHtml(item.title)}</strong>
            <span>${escapeHtml(item.meta)}</span>
            <span class="grant-list-amount">${escapeHtml(item.amount)}</span>
          </span>
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

function formatCurrencyExact(value) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(Number(value || 0));
}

function getCurrentGrantPortfolio() {
  return siteData.grantPortfolio || grantPortfolio;
}

function renderGrantDashboard() {
  const portfolio = getCurrentGrantPortfolio();
  const totalPortfolio = portfolio.fundedTotal + portfolio.pendingTotal;
  const fundedShare = totalPortfolio
    ? (portfolio.fundedTotal / totalPortfolio) * 100
    : 0;
  const pendingShare = totalPortfolio
    ? (portfolio.pendingTotal / totalPortfolio) * 100
    : 0;
  const fundedAmounts = grants.funded.filter(
    (item) => typeof item.amountValue === "number"
  );
  const largestFunded = fundedAmounts.reduce(
    (largest, item) =>
      !largest || item.amountValue > largest.amountValue ? item : largest,
    null
  );
  const concentrationShare =
    largestFunded && portfolio.fundedTotal
      ? (largestFunded.amountValue / portfolio.fundedTotal) * 100
      : 0;

  const summary = document.getElementById("grant-summary");
  if (summary) {
    const withdrawnNote = portfolio.withdrawnCount
      ? ` It also records ${portfolio.withdrawnCount} withdrawn proposal${
          portfolio.withdrawnCount === 1 ? "" : "s"
        }.`
      : "";
    summary.textContent = `The current CV records ${formatCurrencyExact(
      portfolio.fundedTotal
    )} across ${portfolio.fundedCount} funded awards and ${formatCurrencyExact(
      portfolio.pendingTotal
    )} across ${portfolio.pendingCount} active proposals.${withdrawnNote}`;
  }

  const metrics = document.getElementById("grant-metrics");
  metrics.innerHTML = `
    <div class="grant-metric-card">
      <span class="grant-metric-label">Awarded Total</span>
      <strong>${formatCurrencyExact(portfolio.fundedTotal)}</strong>
      <span class="grant-metric-sub">${portfolio.fundedCount} funded awards in the current CV</span>
    </div>
    <div class="grant-metric-card">
      <span class="grant-metric-label">Pending Total</span>
      <strong>${formatCurrencyExact(portfolio.pendingTotal)}</strong>
      <span class="grant-metric-sub">${portfolio.pendingCount} active proposals</span>
    </div>
    <div class="grant-metric-card">
      <span class="grant-metric-label">Portfolio Total</span>
      <strong>${formatCurrencyExact(totalPortfolio)}</strong>
      <span class="grant-metric-sub">Awarded and pending combined</span>
    </div>
  `;

  const stack = document.getElementById("grant-stack");
  stack.innerHTML = `
    <div class="grant-compare-row" role="img" aria-label="Funded awards: ${formatCurrencyExact(
      portfolio.fundedTotal
    )}, ${fundedShare.toFixed(1)} percent of the combined portfolio">
      <div class="grant-compare-label">
        <strong>Funded</strong>
        <span>${formatCurrencyExact(portfolio.fundedTotal)} · ${fundedShare.toFixed(1)}%</span>
      </div>
      <div class="grant-stack-bar" aria-hidden="true">
        <span class="grant-stack-segment funded" style="width: ${fundedShare}%"></span>
      </div>
    </div>
    <div class="grant-compare-row" role="img" aria-label="Pending proposals: ${formatCurrencyExact(
      portfolio.pendingTotal
    )}, ${pendingShare.toFixed(1)} percent of the combined portfolio">
      <div class="grant-compare-label">
        <strong>Pending</strong>
        <span>${formatCurrencyExact(portfolio.pendingTotal)} · ${pendingShare.toFixed(1)}%</span>
      </div>
      <div class="grant-stack-bar" aria-hidden="true">
        <span class="grant-stack-segment pending" style="width: ${pendingShare}%"></span>
      </div>
    </div>
  `;

  const concentration = document.getElementById("grant-concentration");
  if (concentration && largestFunded) {
    concentration.innerHTML = `
      <strong>Concentration context</strong>
      <span>${escapeHtml(largestFunded.title)} represents ${concentrationShare.toFixed(
        1
      )}% of funded dollars (${formatCurrencyExact(largestFunded.amountValue)}).</span>
    `;
  }

  const highlightedFunded = grants.funded.slice(0, 4);
  const highlightedPending = grants.pending.slice(0, 4);
  renderGrantBars("funded-bars", highlightedFunded, "funded");
  renderGrantBars("pending-bars", highlightedPending, "pending");

  const recordCount = document.getElementById("grant-record-count");
  if (recordCount) {
    recordCount.textContent = `${grants.funded.length} funded · ${grants.pending.length} pending`;
  }

  const allRecords = document.querySelector(".grant-all-records");
  const allRecordsToggle = allRecords?.querySelector(".grant-all-records-toggle");
  const allRecordsBody = allRecords?.querySelector(".grant-all-records-body");
  if (
    allRecords &&
    allRecordsToggle &&
    allRecordsBody &&
    !allRecords.dataset.toggleBound
  ) {
    const syncExpandedState = () => {
      const expanded = !allRecordsBody.hidden;
      allRecords.classList.toggle("is-open", expanded);
      allRecordsToggle.setAttribute("aria-expanded", String(expanded));
      document.dispatchEvent(new CustomEvent("panel:content-updated"));
    };

    allRecordsToggle.addEventListener("click", () => {
      allRecordsBody.hidden = !allRecordsBody.hidden;
      syncExpandedState();
    });

    allRecords.dataset.toggleBound = "true";
    syncExpandedState();
  }
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
          <div class="grant-bar-heading">
            ${renderGrantFunderMark(item)}
            <div class="grant-bar-copy">
              <div class="grant-bar-topline">
                <span class="grant-bar-title">${escapeHtml(item.title)}</span>
                <span class="grant-bar-amount">${escapeHtml(
                  typeof item.amountValue === "number"
                    ? formatCurrencyExact(item.amountValue)
                    : "Amount not disclosed"
                )}</span>
              </div>
              <p class="grant-bar-funder">${escapeHtml(
                getGrantFunderMark(item).name
              )}</p>
            </div>
          </div>
          <div class="grant-bar-track" role="img" aria-label="${escapeHtml(
            item.title
          )}: ${escapeHtml(
            typeof item.amountValue === "number"
              ? formatCurrencyExact(item.amountValue)
              : "amount not disclosed"
          )}">
            <span class="grant-bar-fill ${status} ${
              typeof item.amountValue === "number" ? "" : "is-unknown"
            }" style="width: ${width}%" aria-hidden="true"></span>
          </div>
          <p class="grant-bar-meta">${escapeHtml(item.meta)}</p>
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
      (item) => {
        const title = item.url
          ? `<a href="${escapeHtml(item.url)}" target="_blank" rel="noopener noreferrer">${escapeHtml(item.title)}</a>`
          : escapeHtml(item.title);
        return `
        <li>
          <article class="service-card">
            ${renderServiceThumb(item)}
            <div class="service-card-body">
              <p class="service-role">${item.role}</p>
              <h4 class="service-title">${title}</h4>
              <p class="service-meta-line">
                <span class="service-meta-pill">${item.label}</span>
                <span class="service-years">${item.years}</span>
              </p>
            </div>
          </article>
        </li>
      `;
      }
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
  const mobileSelect = document.getElementById("mobile-section-nav");

  if (!deck || !panels.length || !tabs.length) {
    return;
  }

  const validPanelNames = new Set(
    panels.map((panel) => panel.dataset.panel)
  );

  panels.forEach((panel) => {
    const panelName = panel.dataset.panel;
    panel.id = `panel-${panelName}`;
    panel.setAttribute("role", "tabpanel");
    panel.setAttribute("aria-labelledby", `tab-${panelName}`);
  });

  tabs.forEach((tab) => {
    const panelName = tab.dataset.panelTarget;
    tab.id = `tab-${panelName}`;
    tab.setAttribute("aria-controls", `panel-${panelName}`);
  });

  function syncDeckHeight() {
    const activePanel = deck.querySelector(".content-panel.is-active");
    if (!activePanel) {
      return;
    }

    deck.style.height = `${activePanel.offsetHeight}px`;
  }

  function activatePanel(panelName, options = {}) {
    const { historyMode = "none", focusTab = false } = options;
    const targetPanel =
      panels.find((panel) => panel.dataset.panel === panelName) || panels[0];
    const activePanelName = targetPanel.dataset.panel;

    panels.forEach((panel) => {
      const isActive = panel === targetPanel;
      panel.classList.toggle("is-active", isActive);
      panel.hidden = !isActive;
    });

    tabs.forEach((tab) => {
      const isActive = tab.dataset.panelTarget === activePanelName;
      tab.classList.toggle("is-active", isActive);
      tab.setAttribute("aria-selected", String(isActive));
      tab.tabIndex = isActive ? 0 : -1;
    });

    if (mobileSelect) {
      mobileSelect.value = activePanelName;
    }

    if (historyMode !== "none") {
      const nextUrl = new URL(window.location.href);
      nextUrl.hash = activePanelName;
      window.history[historyMode === "replace" ? "replaceState" : "pushState"](
        { panel: activePanelName },
        "",
        nextUrl
      );
    }

    const activeTab = tabs.find(
      (tab) => tab.dataset.panelTarget === activePanelName
    );
    if (focusTab && activeTab) {
      activeTab.focus();
    }

    targetPanel.querySelectorAll(".reveal").forEach((node) => {
      node.classList.add("is-visible");
    });

    requestAnimationFrame(syncDeckHeight);
    document.dispatchEvent(
      new CustomEvent("panel:activated", {
        detail: { panel: activePanelName },
      })
    );
  }

  function scrollToActivePanel() {
    const target =
      document.querySelector(".readme-column") ||
      document.getElementById("content-deck");
    if (!target) return;
    const header = document.querySelector(".site-header");
    const headerHeight = header ? header.offsetHeight : 0;
    const top =
      target.getBoundingClientRect().top + window.scrollY - headerHeight - 12;
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    window.scrollTo({ top, behavior: reduce ? "auto" : "smooth" });
  }

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      activatePanel(tab.dataset.panelTarget, { historyMode: "push" });
      scrollToActivePanel();
    });

    tab.addEventListener("keydown", (event) => {
      const currentIndex = tabs.indexOf(tab);
      let nextIndex = null;

      if (event.key === "ArrowRight" || event.key === "ArrowDown") {
        nextIndex = (currentIndex + 1) % tabs.length;
      } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
        nextIndex = (currentIndex - 1 + tabs.length) % tabs.length;
      } else if (event.key === "Home") {
        nextIndex = 0;
      } else if (event.key === "End") {
        nextIndex = tabs.length - 1;
      }

      if (nextIndex !== null) {
        event.preventDefault();
        activatePanel(tabs[nextIndex].dataset.panelTarget, {
          historyMode: "push",
          focusTab: true,
        });
      }
    });
  });

  if (mobileSelect) {
    mobileSelect.addEventListener("change", () => {
      activatePanel(mobileSelect.value, { historyMode: "push" });
      scrollToActivePanel();
    });
  }

  const panelFromLocation = () => {
    const hashTarget = decodeURIComponent(
      window.location.hash.replace("#", "")
    );
    return validPanelNames.has(hashTarget) ? hashTarget : "overview";
  };

  const initialPanel = panelFromLocation();

  activatePanel(initialPanel);
  if (initialPanel !== "overview") {
    requestAnimationFrame(scrollToActivePanel);
  }
  window.addEventListener("popstate", () => activatePanel(panelFromLocation()));
  window.addEventListener("hashchange", () =>
    activatePanel(panelFromLocation())
  );
  window.addEventListener("resize", syncDeckHeight);
  document.addEventListener("panel:content-updated", syncDeckHeight);
}

function renderDataStatus() {
  const root = document.getElementById("footer-data-status");
  if (!root) return;

  const generatedAt = new Date(siteData.generatedAt || "");
  if (Number.isNaN(generatedAt.getTime())) {
    root.textContent = "CV-derived profile data.";
    return;
  }

  const readable = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(generatedAt);

  root.innerHTML = `CV data refreshed <time datetime="${escapeHtml(
    generatedAt.toISOString()
  )}">${escapeHtml(readable)}</time>. The ADIE Lab site reads the same generated record.`;
}

function compactMobileProfileRail() {
  if (!window.matchMedia("(max-width: 760px)").matches) return;
  document
    .querySelectorAll(".profile-rail details[open]")
    .forEach((details) => details.removeAttribute("open"));
}

window.__cvSite = {
  escapeHtml,
  highlightSelfAuthor,
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
  renderBookChapters();
  renderWorkingPapers();
  renderGrantList("funded-list", grants.funded);
  renderGrantList("pending-list", grants.pending);
  renderGrantList("withdrawn-list", grants.withdrawn || []);
  renderGrantDashboard();
  renderTeachingSection();
  renderMentoringMetrics();
  renderServiceCards("editorial-list", editorialRoles);
  renderServiceCards("leadership-list", leadershipRoles);
  renderServiceReview();
  renderTalks();
  renderDataStatus();
  compactMobileProfileRail();
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
})();
