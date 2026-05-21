/**
 * Dark-mode WCAG contrast audit.
 *
 * Strategy:
 *   1. Boot a local static server.
 *   2. Open each page (panel) with localStorage.theme="dark" so the
 *      pre-paint script flips data-theme before first paint.
 *   3. In the page: collect every visible element that has direct text
 *      content; record its computed text color and bounding box.
 *   4. Capture a full-page screenshot.
 *   5. In Node: sample 4 perimeter pixels per element from the
 *      screenshot, take the median, and use that as the true rendered
 *      background. Compute WCAG ratio against the text color.
 *   6. Report all violations under AA (4.5 normal / 3.0 large).
 *
 * Usage:  node scripts/dark_contrast_audit.mjs [--page=index.html]
 */

import { chromium } from "playwright";
import { createServer } from "node:http";
import { readFile, writeFile, stat } from "node:fs/promises";
import { join, dirname, resolve, extname } from "node:path";
import { fileURLToPath } from "node:url";
import { PNG } from "pngjs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const ROOT = resolve(__dirname, "..");

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".mjs": "application/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".docx":
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
};

function startServer() {
  return new Promise((resolveServer) => {
    const server = createServer(async (req, res) => {
      let urlPath = decodeURIComponent(req.url.split("?")[0]);
      if (urlPath === "/") urlPath = "/index.html";
      const filePath = join(ROOT, urlPath);
      if (!filePath.startsWith(ROOT)) return res.writeHead(403).end();
      const stats = await stat(filePath).catch(() => null);
      if (!stats || !stats.isFile()) return res.writeHead(404).end();
      const body = await readFile(filePath);
      const mime =
        MIME[extname(filePath).toLowerCase()] || "application/octet-stream";
      res.writeHead(200, { "Content-Type": mime, "Cache-Control": "no-store" });
      res.end(body);
    });
    server.listen(0, "127.0.0.1", () => resolveServer({ server, port: server.address().port }));
  });
}

const PAGES = ["index.html", "publication.html"];
const TABS = [
  "overview",
  "news",
  "projects",
  "publications",
  "analytics",
  "grants",
  "teaching",
  "service",
];

const args = Object.fromEntries(
  process.argv.slice(2).map((a) => {
    const m = a.match(/^--([^=]+)=(.*)$/);
    return m ? [m[1], m[2]] : [a.replace(/^--/, ""), true];
  })
);

function srgbLin(c) {
  const v = c / 255;
  return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
}
function lum({ r, g, b }) {
  return 0.2126 * srgbLin(r) + 0.7152 * srgbLin(g) + 0.0722 * srgbLin(b);
}
function contrast(c1, c2) {
  const L1 = lum(c1),
    L2 = lum(c2);
  const a = Math.max(L1, L2),
    b = Math.min(L1, L2);
  return (a + 0.05) / (b + 0.05);
}
function parse(str) {
  const m = str.match(/rgba?\(([^)]+)\)/);
  if (!m) return null;
  const p = m[1].split(",").map((s) => parseFloat(s.trim()));
  return { r: p[0], g: p[1], b: p[2], a: p[3] ?? 1 };
}

async function auditPage(browser, baseUrl, pagePath, panel) {
  const context = await browser.newContext({
    viewport: { width: 1280, height: 900 },
    colorScheme: "dark",
    deviceScaleFactor: 1,
  });
  await context.addInitScript(() =>
    localStorage.setItem("theme", "dark")
  );
  const page = await context.newPage();
  const targetUrl = `${baseUrl}/${pagePath}${panel ? `#${panel}` : ""}`;
  await page.goto(targetUrl, { waitUntil: "networkidle" });
  await page.waitForTimeout(800);

  const themeAttr = await page.evaluate(() =>
    document.documentElement.getAttribute("data-theme")
  );

  // Collect candidates
  const candidates = await page.evaluate(() => {
    function getSelector(el) {
      if (el.id) return `#${el.id}`;
      const parts = [];
      let cur = el,
        depth = 0;
      while (cur && cur.nodeType === 1 && depth < 4) {
        let part = cur.tagName.toLowerCase();
        if (cur.classList.length)
          part += "." + Array.from(cur.classList).slice(0, 3).join(".");
        parts.unshift(part);
        if (cur.id) {
          parts[0] = `#${cur.id}`;
          break;
        }
        cur = cur.parentElement;
        depth++;
      }
      return parts.join(" > ");
    }
    function isLargeText(cs) {
      const px = parseFloat(cs.fontSize);
      const weight = parseInt(cs.fontWeight, 10) || 400;
      return px >= 24 || (px >= 18.66 && weight >= 700);
    }

    const all = Array.from(document.querySelectorAll("body *"));
    const results = [];
    for (const el of all) {
      if (!el.isConnected) continue;
      const rect = el.getBoundingClientRect();
      if (rect.width < 4 || rect.height < 4) continue;
      const hasDirectText = Array.from(el.childNodes).some(
        (n) => n.nodeType === 3 && n.textContent.trim().length > 0
      );
      if (!hasDirectText) continue;
      const cs = getComputedStyle(el);
      if (cs.visibility === "hidden" || cs.display === "none") continue;
      if (parseFloat(cs.opacity) < 0.1) continue;
      // Skip absolutely positioned offscreen things (e.g., skip-link)
      const isOffscreen =
        rect.bottom < 0 ||
        rect.right < 0 ||
        rect.top > window.innerHeight + 8000;
      if (isOffscreen) continue;
      results.push({
        selector: getSelector(el),
        color: cs.color,
        fontSize: cs.fontSize,
        fontWeight: cs.fontWeight,
        large: isLargeText(cs),
        rect: {
          x: rect.x,
          y: rect.y,
          width: rect.width,
          height: rect.height,
        },
        scrollY: window.scrollY,
        textSample: (el.textContent || "").trim().slice(0, 60),
        tag: el.tagName.toLowerCase(),
        classList: Array.from(el.classList),
      });
    }
    return results;
  });

  const shotBuffer = await page.screenshot({ fullPage: true });
  const png = PNG.sync.read(shotBuffer);

  function pxAt(x, y) {
    const xi = Math.floor(x),
      yi = Math.floor(y);
    if (xi < 0 || yi < 0 || xi >= png.width || yi >= png.height) return null;
    const idx = (yi * png.width + xi) * 4;
    return { r: png.data[idx], g: png.data[idx + 1], b: png.data[idx + 2], a: 1 };
  }

  await context.close();

  const violations = [];
  const seen = new Set();
  for (const c of candidates) {
    const fg = parse(c.color);
    if (!fg) continue;
    const absX = c.rect.x;
    const absY = c.rect.y + c.scrollY;
    // Sample 8 perimeter points (4 corners + 4 mid-edges) so we don't
    // hit text glyphs in the center.
    const inset = 2;
    const samples = [];
    const xs = [
      absX + inset,
      absX + c.rect.width / 2,
      absX + c.rect.width - inset,
    ];
    const ys = [
      absY + inset,
      absY + c.rect.height / 2,
      absY + c.rect.height - inset,
    ];
    for (const x of xs) {
      for (const y of ys) {
        if (x === xs[1] && y === ys[1]) continue; // skip center
        const p = pxAt(x, y);
        if (p) samples.push(p);
      }
    }
    if (!samples.length) continue;
    samples.sort((a, b) => lum(a) - lum(b));
    // For dark mode the bg is dark, so the median tends to be the bg;
    // taking the darkest of the perimeter samples is the safest bg estimate
    // because text glyphs (if they bleed into perimeter) skew lighter.
    const bg = samples[0];
    const ratio = contrast(fg, bg);
    const threshold = c.large ? 3.0 : 4.5;
    if (ratio < threshold) {
      const key = `${c.selector}|${c.color}|${c.fontSize}`;
      if (seen.has(key)) continue;
      seen.add(key);
      violations.push({
        selector: c.selector,
        ratio: Number(ratio.toFixed(2)),
        threshold,
        color: c.color,
        background: `rgb(${bg.r}, ${bg.g}, ${bg.b})`,
        fontSize: c.fontSize,
        fontWeight: c.fontWeight,
        textSample: c.textSample,
        tag: c.tag,
        classList: c.classList,
      });
    }
  }
  violations.sort((a, b) => a.ratio - b.ratio);
  return { url: targetUrl, themeAttr, violations };
}

async function main() {
  const { server, port } = await startServer();
  const baseUrl = `http://127.0.0.1:${port}`;
  console.log(`Local server: ${baseUrl}`);
  const browser = await chromium.launch();
  const report = { startedAt: new Date().toISOString(), pages: [] };
  const targets = args.page ? [args.page] : PAGES;
  for (const pagePath of targets) {
    if (pagePath === "index.html") {
      for (const tab of TABS) {
        console.log(`Auditing ${pagePath} #${tab}...`);
        report.pages.push({
          page: pagePath,
          tab,
          ...(await auditPage(browser, baseUrl, pagePath, tab)),
        });
      }
    } else {
      console.log(`Auditing ${pagePath}...`);
      report.pages.push({
        page: pagePath,
        ...(await auditPage(browser, baseUrl, pagePath, null)),
      });
    }
  }
  await browser.close();
  server.close();

  const seen = new Map();
  for (const p of report.pages) {
    for (const v of p.violations) {
      const k = `${v.selector}|${v.color}`;
      const existing = seen.get(k);
      if (!existing || v.ratio < existing.ratio) {
        seen.set(k, { ...v, on: `${p.page}${p.tab ? "#" + p.tab : ""}` });
      }
    }
  }
  const unique = Array.from(seen.values()).sort((a, b) => a.ratio - b.ratio);
  report.uniqueViolations = unique;

  const outPath = join(__dirname, "dark_contrast_report.json");
  await writeFile(outPath, JSON.stringify(report, null, 2), "utf-8");
  console.log(`\n${unique.length} unique violations -> ${outPath}\n`);
  for (const v of unique.slice(0, 30)) {
    console.log(
      `  ${v.ratio}:1 [need ${v.threshold}]  ${v.selector}\n    color=${v.color}  bg=${v.background}  font=${v.fontSize}/${v.fontWeight}\n    text="${v.textSample}"  on ${v.on}`
    );
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
