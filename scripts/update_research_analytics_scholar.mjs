import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, "..");
const OUTPUT_PATH = path.join(ROOT, "assets", "research-analytics-scholar.json");

const PROFILE_URL = "https://scholar.google.com/citations?user=b-epW38AAAAJ&hl=en&oi=ao";
const USER_AGENT =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36";

function normalizeWhitespace(value = "") {
  return value.replace(/\s+/g, " ").trim();
}

function parseInteger(value = "") {
  const digits = String(value).replace(/[^\d]/g, "");
  return Number.parseInt(digits, 10) || 0;
}

function absoluteScholarUrl(href = "") {
  if (!href) {
    return "";
  }

  try {
    return new URL(href, "https://scholar.google.com").toString();
  } catch (error) {
    return href;
  }
}

async function createBrowserContext(browser) {
  const context = await browser.newContext({
    userAgent: USER_AGENT,
    viewport: { width: 1480, height: 1200 },
    locale: "en-US",
    timezoneId: "America/Chicago",
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
  for (let attempt = 0; attempt < 8; attempt += 1) {
    const title = await page.title().catch(() => "");
    const bodyText = await page.locator("body").innerText().catch(() => "");
    const isChallenge =
      /unusual traffic|sorry/i.test(title) ||
      /not a robot|unusual traffic|detected unusual traffic|sorry/i.test(bodyText);

    if (!isChallenge) {
      return;
    }

    await page.waitForTimeout(2500);
  }
}

async function expandAllRows(page) {
  const button = page.locator("#gsc_bpf_more");

  for (let attempt = 0; attempt < 30; attempt += 1) {
    const exists = (await button.count().catch(() => 0)) > 0;
    if (!exists) {
      return;
    }

    const rowCount = await page.locator("#gsc_a_b .gsc_a_tr").count();
    const disabled = await button.isDisabled().catch(() => true);
    if (disabled) {
      return;
    }

    await button.scrollIntoViewIfNeeded().catch(() => {});
    await button.click({ timeout: 8000 });
    await page
      .waitForFunction(
        (previousCount) => document.querySelectorAll("#gsc_a_b .gsc_a_tr").length > previousCount,
        rowCount,
        { timeout: 15000 }
      )
      .catch(() => {});
    await page.waitForTimeout(800);
  }
}

async function extractScholarProfile(page) {
  return page.evaluate((profileUrl) => {
    const normalize = (value = "") => value.replace(/\s+/g, " ").trim();
    const toInt = (value = "") => Number.parseInt(String(value).replace(/[^\d]/g, ""), 10) || 0;
    const absoluteUrl = (href = "") => {
      if (!href) {
        return "";
      }
      try {
        return new URL(href, "https://scholar.google.com").toString();
      } catch (error) {
        return href;
      }
    };

    const statRows = Array.from(document.querySelectorAll("#gsc_rsb_st tr")).slice(1);
    const stats = statRows.map((row) => {
      const cells = row.querySelectorAll("td");
      return {
        label: normalize(cells[0]?.textContent || ""),
        all: toInt(cells[1]?.textContent || ""),
        recent: toInt(cells[2]?.textContent || ""),
      };
    });

    const headerCells = document.querySelectorAll("#gsc_rsb_st thead th");
    const sinceLabel = normalize(headerCells[2]?.textContent || "");

    const summaryByLabel = Object.fromEntries(stats.map((item) => [item.label.toLowerCase(), item]));
    const years = Array.from(document.querySelectorAll(".gsc_g_t")).map((node) =>
      toInt(node.textContent || "")
    );
    const citations = Array.from(document.querySelectorAll(".gsc_g_al")).map((node) =>
      toInt(node.textContent || "")
    );

    const annualCitations = years
      .map((year, index) => ({
        year,
        citations: citations[index] || 0,
      }))
      .filter((item) => item.year);

    const publicAccess = (() => {
      const panel = document.querySelector("#gsc_lwp");
      if (!panel) {
        return null;
      }

      const numbers = (normalize(panel.textContent || "").match(/\d+/g) || []).map((value) => toInt(value));

      return {
        available: numbers[0] || 0,
        notAvailable: numbers[1] || 0,
      };
    })();

    const works = Array.from(document.querySelectorAll("#gsc_a_b .gsc_a_tr")).map((row, index) => {
      const titleLink = row.querySelector(".gsc_a_at");
      const citedByLink = row.querySelector("a.gsc_a_ac");
      const grayLines = row.querySelectorAll(".gs_gray");
      const rawVenue = normalize(grayLines[1]?.textContent || "");
      const year = toInt(row.querySelector(".gsc_a_y")?.textContent || "");
      const venue = rawVenue.replace(new RegExp(`([,\\s]+${year})$`), "").trim() || rawVenue;

      return {
        id: `scholar-${index + 1}`,
        title: normalize(titleLink?.textContent || ""),
        authors: normalize(grayLines[0]?.textContent || ""),
        venue,
        rawVenue,
        citations: toInt(row.querySelector(".gsc_a_ac")?.textContent || ""),
        year,
        recordUrl: absoluteUrl(titleLink?.getAttribute("href") || ""),
        citedByUrl: absoluteUrl(citedByLink?.getAttribute("href") || ""),
      };
    });

    const homepageLink =
      document.querySelector("#gsc_prf_ivh a") ||
      document.querySelector("a#gsc_prf_ivh") ||
      document.querySelector("#gsc_prf_ivh")?.closest("a");

    return {
      generatedAt: new Date().toISOString(),
      profileUrl,
      author: {
        name: normalize(document.querySelector("#gsc_prf_in")?.textContent || ""),
        affiliation: normalize(document.querySelector(".gsc_prf_il")?.textContent || ""),
        verifiedEmail: normalize(document.querySelector("#gsc_prf_ivh")?.textContent || ""),
        homepage: absoluteUrl(homepageLink?.getAttribute("href") || ""),
        interests: Array.from(document.querySelectorAll(".gsc_prf_inta")).map((node) =>
          normalize(node.textContent || "")
        ),
      },
      summary: {
        totalCitations: summaryByLabel["citations"]?.all || 0,
        sinceYearCitations: summaryByLabel["citations"]?.recent || 0,
        hIndex: summaryByLabel["h-index"]?.all || 0,
        sinceYearHIndex: summaryByLabel["h-index"]?.recent || 0,
        i10Index: summaryByLabel["i10-index"]?.all || 0,
        sinceYearI10Index: summaryByLabel["i10-index"]?.recent || 0,
        sinceLabel,
      },
      annualCitations,
      publicAccess,
      works,
    };
  }, PROFILE_URL);
}

async function main() {
  const browser = await chromium.launch({
    headless: true,
    args: ["--disable-blink-features=AutomationControlled"],
  });

  const context = await createBrowserContext(browser);
  const page = await context.newPage();
  page.setDefaultTimeout(15000);

  try {
    await page.goto(PROFILE_URL, {
      waitUntil: "domcontentloaded",
      timeout: 60000,
    });
    await page.waitForLoadState("networkidle", { timeout: 15000 }).catch(() => {});
    await waitOutChallenge(page);
    await expandAllRows(page);

    const payload = await extractScholarProfile(page);
    payload.worksCount = payload.works.length;

    await fs.writeFile(OUTPUT_PATH, `${JSON.stringify(payload, null, 2)}\n`, "utf8");

    console.log(`Wrote ${OUTPUT_PATH}`);
    console.log(`Scholar works captured: ${payload.worksCount}`);
    console.log(
      `Summary: ${payload.summary.totalCitations} citations, h-index ${payload.summary.hIndex}, i10-index ${payload.summary.i10Index}`
    );
  } finally {
    await context.close();
    await browser.close();
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
