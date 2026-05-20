import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, "..");
const ABSTRACTS_PATH = path.join(ROOT, "assets", "publication-abstracts.json");

const USER_AGENT =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36";

const META_SELECTORS = [
  'meta[name="citation_abstract"]',
  'meta[name="dc.Description"]',
  'meta[name="dc.description"]',
  'meta[name="Description"]',
  'meta[name="description"]',
  'meta[property="og:description"]',
  'meta[name="twitter:description"]',
];

const IMAGE_SELECTORS = [
  'meta[property="og:image"]',
  'meta[property="og:image:secure_url"]',
  'meta[name="twitter:image"]',
  'meta[name="twitter:image:src"]',
  'meta[name="citation_cover_image_url"]',
  'meta[name="citation_image"]',
];

const URL_OVERRIDES = {
  // The CV currently contains an outdated DOI for this article.
  "10.7468/mathedu.2024.63.2.1": {
    url: "https://www.kci.go.kr/kciportal/landing/article.kci?arti_id=ART003087565",
    resolvedDoi: "10.7468/mathedu.2024.63.2.295",
  },
};

function getThumbnailRecoveryLimit() {
  const arg = process.argv.find((value) => value.startsWith("--thumbnail-limit="));
  const raw = arg ? arg.split("=", 2)[1] : process.env.CV_THUMBNAIL_RECOVERY_LIMIT || "0";
  const parsed = Number.parseInt(raw, 10);
  return Number.isFinite(parsed) && parsed >= 0 ? parsed : 0;
}

function normalizeWhitespace(value = "") {
  return value.replace(/\s+/g, " ").trim();
}

function normalizeAbstractText(value = "") {
  const text = normalizeWhitespace(value)
    .replace(/^(abstract|초록)\s*/i, "")
    .replace(/\s*(keywords?|키워드)\s*[:：].*$/i, "")
    .trim();

  return text;
}

function looksLikeAbstract(value = "") {
  const text = normalizeAbstractText(value);
  if (text.length < 140 || text.length > 8000) {
    return false;
  }

  const lowered = text.toLowerCase();
  const blockedFragments = [
    "just a moment",
    "performing security verification",
    "enable javascript",
    "cookie",
    "access denied",
    "download pdf",
    "rights reserved",
    "site not found",
    "doi not found",
    "reference number:",
    "web firewall security policies",
  ];

  return !blockedFragments.some((fragment) => lowered.includes(fragment));
}

function bestCandidate(candidates) {
  const unique = [
    ...new Set(
      candidates
        .map((candidate) => normalizeAbstractText(candidate))
        .filter(Boolean)
    ),
  ];
  const filtered = unique.filter(looksLikeAbstract);
  filtered.sort((left, right) => right.length - left.length);
  return filtered[0] || "";
}

function normalizeImageUrl(baseUrl, value = "") {
  const trimmed = normalizeWhitespace(value);
  if (!trimmed || trimmed.startsWith("data:")) {
    return "";
  }

  try {
    return new URL(trimmed, baseUrl).toString();
  } catch (error) {
    return "";
  }
}

function scoreImageCandidate(imageUrl = "") {
  const lowered = imageUrl.toLowerCase();
  let score = 0;

  if (
    ["cover", "journal", "issue", "article", "mediaobjects", "els-cdn", "static-content"].some(
      (fragment) => lowered.includes(fragment)
    )
  ) {
    score += 4;
  }

  if (
    ["logo", "icon", "favicon", "apple-touch", "placeholder", "spinner"].some((fragment) =>
      lowered.includes(fragment)
    )
  ) {
    score -= 6;
  }

  if (/\.(jpe?g|png|webp)([?#].*)?$/i.test(lowered)) {
    score += 2;
  }

  if (lowered.endsWith(".svg") || lowered.includes(".svg?")) {
    score -= 2;
  }

  return score;
}

function bestImageCandidate(candidates) {
  const unique = [...new Set(candidates.filter(Boolean))];
  unique.sort((left, right) => scoreImageCandidate(right) - scoreImageCandidate(left));
  return unique[0] || "";
}

async function loadLibrary() {
  const raw = await fs.readFile(ABSTRACTS_PATH, "utf8");
  return JSON.parse(raw);
}

async function saveLibrary(library) {
  await fs.writeFile(ABSTRACTS_PATH, `${JSON.stringify(library, null, 2)}\n`, "utf8");
}

async function createBrowserContext(browser) {
  const context = await browser.newContext({
    userAgent: USER_AGENT,
    viewport: { width: 1440, height: 900 },
    locale: "en-US",
    timezoneId: "America/Chicago",
  });

  await context.route("**/*", (route) => {
    const blockedTypes = new Set(["image", "media", "font", "stylesheet"]);
    if (blockedTypes.has(route.request().resourceType())) {
      route.abort();
      return;
    }

    route.continue();
  });

  await context.addInitScript(() => {
    Object.defineProperty(navigator, "webdriver", { get: () => undefined });
    Object.defineProperty(navigator, "languages", { get: () => ["en-US", "en"] });
    Object.defineProperty(navigator, "platform", { get: () => "Win32" });
    window.chrome = { runtime: {} };
  });

  return context;
}

async function waitOutChallenge(page) {
  for (let attempt = 0; attempt < 6; attempt += 1) {
    const title = await page.title().catch(() => "");
    const bodyText = await page.locator("body").innerText().catch(() => "");
    const isChallenge =
      /just a moment/i.test(title) ||
      /performing security verification|checking your browser|enable javascript and cookies/i.test(
        bodyText
      );

    if (!isChallenge) {
      return;
    }

    await page.waitForTimeout(2500);
  }
}

function extractKciAbstractFromText(text) {
  const normalized = normalizeWhitespace(text);
  const exportMatch = normalized.match(
    /\bAB\s*-\s*(.+?)(?=\s+\bKW\s*-|\s+\bDO\s*-|\s+\bUR\s*-|\s+\bER\s*-)/i
  );
  if (exportMatch) {
    return bestCandidate([exportMatch[1]]);
  }

  const sectionMatch = normalized.match(
    /Abstract(?:\s+Go to)?\s+(.+?)(?=\s+(?:Keywords?|키워드|References|참고문헌|TOP)\b)/i
  );
  return sectionMatch ? bestCandidate([sectionMatch[1]]) : "";
}

async function extractPublisherSpecificAbstract(page) {
  const currentUrl = page.url();

  if (/tandfonline\.com/i.test(currentUrl)) {
    const abstract = await page
      .locator("#abstractId1, .hlFld-Abstract")
      .first()
      .innerText()
      .catch(() => "");
    return bestCandidate([abstract]);
  }

  if (/kci\.go\.kr|jksmea\.org/i.test(currentUrl)) {
    const bodyText = await page.locator("body").innerText().catch(() => "");
    return extractKciAbstractFromText(bodyText);
  }

  return "";
}

async function extractMetaAbstract(page) {
  const candidates = [];

  for (const selector of META_SELECTORS) {
    const content = await page.locator(selector).first().getAttribute("content").catch(() => null);
    if (content) {
      candidates.push(content);
    }
  }

  return bestCandidate(candidates);
}

async function extractThumbnail(page) {
  const candidates = [];

  for (const selector of IMAGE_SELECTORS) {
    const content = await page.locator(selector).first().getAttribute("content").catch(() => null);
    if (content) {
      candidates.push(normalizeImageUrl(page.url(), content));
    }
  }

  const linkImage = await page
    .locator('link[rel="image_src" i]')
    .first()
    .getAttribute("href")
    .catch(() => null);
  if (linkImage) {
    candidates.push(normalizeImageUrl(page.url(), linkImage));
  }

  const jsonLdImages = await page.evaluate(() => {
    const values = [];

    function visit(node) {
      if (!node || typeof node !== "object") {
        return;
      }

      const image = node.image;
      if (typeof image === "string") {
        values.push(image);
      } else if (Array.isArray(image)) {
        image.forEach((item) => visit({ image: item }));
      } else if (image && typeof image === "object") {
        const contentUrl = image.contentUrl || image.url;
        if (typeof contentUrl === "string") {
          values.push(contentUrl);
        }
      }

      if (Array.isArray(node)) {
        node.forEach(visit);
        return;
      }

      Object.values(node).forEach(visit);
    }

    document.querySelectorAll('script[type="application/ld+json"]').forEach((scriptNode) => {
      try {
        visit(JSON.parse(scriptNode.textContent || ""));
      } catch (error) {
        // Ignore malformed JSON-LD blocks.
      }
    });

    return values;
  });

  jsonLdImages.forEach((image) => candidates.push(normalizeImageUrl(page.url(), image)));

  return bestImageCandidate(candidates);
}

async function extractJsonLdAbstract(page) {
  const candidates = await page.evaluate(() => {
    const values = [];

    function visit(node) {
      if (!node || typeof node !== "object") {
        return;
      }

      if (typeof node.abstract === "string") {
        values.push(node.abstract);
      }

      if (typeof node.description === "string") {
        values.push(node.description);
      }

      if (Array.isArray(node)) {
        node.forEach(visit);
        return;
      }

      Object.values(node).forEach(visit);
    }

    document.querySelectorAll('script[type="application/ld+json"]').forEach((scriptNode) => {
      try {
        visit(JSON.parse(scriptNode.textContent || ""));
      } catch (error) {
        // Ignore malformed JSON-LD blocks.
      }
    });

    return values;
  });

  return bestCandidate(candidates);
}

async function extractDomAbstract(page) {
  const candidates = await page.evaluate(() => {
    const collected = [];
    const selector = '[id*="abstract" i], [class*="abstract" i], section, article, div';

    document.querySelectorAll(selector).forEach((node) => {
      const idOrClass = `${node.id || ""} ${node.className || ""}`.toLowerCase();
      const heading = Array.from(node.querySelectorAll("h1,h2,h3,h4,strong,b"))
        .map((headingNode) => (headingNode.textContent || "").toLowerCase())
        .join(" ");

      if (!idOrClass.includes("abstract") && !heading.includes("abstract")) {
        return;
      }

      const text = (node.textContent || "").replace(/\s+/g, " ").trim();
      collected.push(text);
    });

    return collected;
  });

  return bestCandidate(candidates);
}

async function extractRegexAbstract(page) {
  const bodyText = await page.locator("body").innerText().catch(() => "");
  const normalized = normalizeWhitespace(bodyText);
  const match = normalized.match(
    /abstract[:\s]+(.+?)(?:keywords?|introduction|references|conclusion|background|methods)/i
  );

  return match ? bestCandidate([match[1]]) : "";
}

async function extractAbstractWithPlaywright(page) {
  return (
    (await extractPublisherSpecificAbstract(page)) ||
    (await extractMetaAbstract(page)) ||
    (await extractJsonLdAbstract(page)) ||
    (await extractDomAbstract(page)) ||
    (await extractRegexAbstract(page))
  );
}

async function navigateToRecord(page, doi) {
  const override = URL_OVERRIDES[doi];
  const targetUrl = override?.url || `https://doi.org/${doi}`;

  await page.goto(targetUrl, {
    waitUntil: "domcontentloaded",
    timeout: 15000,
  });
  await page.waitForLoadState("networkidle", { timeout: 2500 }).catch(() => {});
  await waitOutChallenge(page);
  await page.waitForTimeout(600);

  const scienceDirectPiiMatch = page.url().match(/sciencedirect\.com\/science\/article\/pii\/([^?/#]+)/i);
  if (scienceDirectPiiMatch && !/\/science\/article\/abs\/pii\//i.test(page.url())) {
    await page.goto(`https://www.sciencedirect.com/science/article/abs/pii/${scienceDirectPiiMatch[1]}`, {
      waitUntil: "domcontentloaded",
      timeout: 15000,
    });
    await page.waitForLoadState("networkidle", { timeout: 2500 }).catch(() => {});
    await waitOutChallenge(page);
    await page.waitForTimeout(600);
  }

  return override;
}

async function scrapeAbstract(context, doi) {
  const page = await context.newPage();
  page.setDefaultTimeout(5000);

  try {
    const override = await navigateToRecord(page, doi);
    const abstract = await extractAbstractWithPlaywright(page);

    return {
      abstract,
      thumbnailUrl: await extractThumbnail(page),
      finalUrl: page.url(),
      override,
      title: await page.title().catch(() => ""),
    };
  } finally {
    await page.close();
  }
}

async function main() {
  const library = await loadLibrary();
  const entries = Object.entries(library);
  const missingAbstractTargets = entries.filter(([, record]) => !record.abstract);
  const missingThumbnailTargets = entries
    .filter(([, record]) => record.abstract && !record.thumbnailUrl)
    .slice(0, getThumbnailRecoveryLimit());
  const targets = [...missingAbstractTargets, ...missingThumbnailTargets];

  if (!targets.length) {
    console.log("No missing abstracts or thumbnails found.");
    return;
  }

  const browser = await chromium.launch({
    headless: true,
    args: ["--disable-blink-features=AutomationControlled"],
  });

  const context = await createBrowserContext(browser);
  let updated = 0;

  try {
    for (const [doi, record] of targets) {
      console.log(`Trying Playwright for ${doi}`);

      try {
        const result = await scrapeAbstract(context, doi);
        if (!result.abstract && !result.thumbnailUrl) {
          console.log(`No abstract or thumbnail extracted for ${doi} (${result.finalUrl})`);
          continue;
        }

        library[doi] = {
          ...record,
          ...(result.abstract
            ? {
                abstract: result.abstract,
                source: "playwright",
              }
            : {}),
          ...(result.thumbnailUrl
            ? {
                thumbnailUrl: result.thumbnailUrl,
                thumbnailSource: "playwright",
              }
            : {}),
          ...(result.override?.resolvedDoi ? { resolvedDoi: result.override.resolvedDoi } : {}),
          ...(result.finalUrl ? { resolvedUrl: result.finalUrl } : {}),
        };

        await saveLibrary(library);
        updated += 1;
        console.log(`Updated ${doi}`);
      } catch (error) {
        console.log(`Playwright failed for ${doi}: ${String(error)}`);
      }
    }
  } finally {
    await context.close();
    await browser.close();
  }

  const total = Object.keys(library).length;
  const withAbstract = Object.values(library).filter((record) => record.abstract).length;

  console.log(`Playwright updated ${updated} records`);
  console.log(`Abstract coverage is now ${withAbstract}/${total}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
