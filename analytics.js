const analyticsState = {
  data: null,
  loadingPromise: null,
  rendered: false,
};

function analyticsEscapeHtml(value = "") {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function analyticsFormatNumber(value) {
  return new Intl.NumberFormat("en-US").format(Number(value) || 0);
}

function analyticsFormatDecimal(value, digits = 1) {
  return Number(value || 0).toFixed(digits);
}

function analyticsFormatPercent(value) {
  return `${analyticsFormatDecimal(value, 1)}%`;
}

function analyticsFormatDate(value) {
  if (!value) {
    return "";
  }

  return new Date(value).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function analyticsFormatMonthYear(value) {
  if (!value) {
    return "";
  }

  return new Date(value).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
  });
}

function analyticsFormatGrowth(value) {
  if (value === null || value === undefined) {
    return "n/a";
  }
  return `${value > 0 ? "+" : ""}${analyticsFormatDecimal(value, 1)}%`;
}

function analyticsShortSource(url = "") {
  if (!url) {
    return "";
  }

  try {
    const parsed = new URL(url);
    return parsed.hostname.replace(/^www\./, "");
  } catch (error) {
    return url;
  }
}

function analyticsClearNode(node) {
  while (node.firstChild) {
    node.removeChild(node.firstChild);
  }
}

async function loadResearchAnalytics() {
  if (!analyticsState.loadingPromise) {
    analyticsState.loadingPromise = fetch("assets/research-analytics.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to load research analytics.");
        }
        return response.json();
      })
      .then((data) => {
        analyticsState.data = data;
        return data;
      });
  }

  return analyticsState.loadingPromise;
}

function renderAnalyticsMeta(data) {
  const note = document.getElementById("analytics-source-note");
  const linkRow = document.getElementById("analytics-link-row");

  if (!note || !linkRow) {
    return;
  }

  if (data.scholar?.available) {
    note.textContent = `Analytics snapshot as of ${analyticsFormatMonthYear(
      data.source.scholarGeneratedAt
    )}. Google Scholar profile for ${data.author.name} was refreshed on ${analyticsFormatDate(
      data.source.scholarGeneratedAt
    )} for citation totals, h-index, i10-index, annual citations, and cited-by counts. OpenAlex enrichment was refreshed on ${analyticsFormatDate(
      data.source.openalexGeneratedAt
    )} for venue distribution, open access, coauthor network, and topic clustering.`;
  } else {
    note.textContent = `Analytics snapshot as of ${analyticsFormatMonthYear(
      data.source.openalexGeneratedAt || data.generatedAt
    )}. OpenAlex author profile for ${data.author.name} was refreshed on ${analyticsFormatDate(
      data.source.openalexGeneratedAt || data.generatedAt
    )}.`;
  }

  const links = [
    {
      label: "OpenAlex Author",
      href: data.source.authorProfileUrl.replace("api.openalex.org/authors", "openalex.org"),
    },
    {
      label: "Scholar Profile",
      href: data.source.scholarProfileUrl,
    },
    {
      label: "ORCID",
      href: data.author.orcid,
    },
    {
      label: "Homepage",
      href: data.author.homepage,
    },
  ].filter((item) => item.href);

  linkRow.innerHTML = links
    .map(
      (item) => `
        <a class="analytics-link-chip" href="${analyticsEscapeHtml(item.href)}" target="_blank" rel="noreferrer">
          ${analyticsEscapeHtml(item.label)}
        </a>
      `
    )
    .join("");
}

function renderAnalyticsMetrics(data) {
  const root = document.getElementById("analytics-metric-grid");
  if (!root) {
    return;
  }

  const summary = data.summary;
  const sinceLabel = summary.sinceLabel || "Recent Period";
  const metrics = [
    {
      label: "Total Citations",
      value: analyticsFormatNumber(summary.totalCitations),
      note: `${analyticsFormatNumber(summary.worksCount)} listed works | ${sinceLabel}: ${analyticsFormatNumber(
        summary.sinceYearCitations
      )}`,
    },
    {
      label: "h-index",
      value: analyticsFormatNumber(summary.hIndex),
      note: `${data.source.summaryProvider} | ${sinceLabel}: ${analyticsFormatNumber(summary.sinceYearHIndex)}`,
    },
    {
      label: "i10-index",
      value: analyticsFormatNumber(summary.i10Index),
      note: `${data.source.summaryProvider} | ${sinceLabel}: ${analyticsFormatNumber(summary.sinceYearI10Index)}`,
    },
    {
      label: "Citations / Work",
      value: analyticsFormatDecimal(summary.citationsPerWork, 2),
      note: `${data.source.summaryProvider} citations across matched works`,
    },
    {
      label: "Citations / Work-Year",
      value: analyticsFormatDecimal(summary.meanCitationsPerWorkYear, 2),
      note: `Normalized from ${data.source.worksProvider.toLowerCase()}`,
    },
    {
      label: "3-Year Growth",
      value: analyticsFormatGrowth(summary.threeYearGrowthRate),
      note: `${analyticsFormatNumber(summary.recent3YearCitations)} vs ${analyticsFormatNumber(
        summary.previous3YearCitations
      )} citations | ${data.source.annualTrendProvider}`,
    },
    {
      label: "5-Year Growth",
      value: analyticsFormatGrowth(summary.fiveYearGrowthRate),
      note: `${analyticsFormatNumber(summary.recent5YearCitations)} vs ${analyticsFormatNumber(
        summary.previous5YearCitations
      )} citations | ${data.source.annualTrendProvider}`,
    },
    {
      label: "Open Access Rate",
      value: analyticsFormatPercent(data.openAccess.openAccessRate),
      note: `${analyticsFormatNumber(data.openAccess.openAccessWorks)} open works | ${data.source.openAccessProvider}`,
    },
  ];

  root.innerHTML = metrics
    .map(
      (item) => `
        <article class="analytics-metric-card">
          <span class="analytics-metric-label">${analyticsEscapeHtml(item.label)}</span>
          <strong class="analytics-metric-value">${analyticsEscapeHtml(item.value)}</strong>
          <span class="analytics-metric-note">${analyticsEscapeHtml(item.note)}</span>
        </article>
      `
    )
    .join("");
}

function renderAccessSummary(data) {
  const summaryRoot = document.getElementById("analytics-access-summary");
  const statusRoot = document.getElementById("analytics-status-list");

  if (!summaryRoot || !statusRoot) {
    return;
  }

  summaryRoot.innerHTML = `
    <div class="analytics-access-card">
      <span class="analytics-access-label">Open access works</span>
      <strong>${analyticsFormatNumber(data.openAccess.openAccessWorks)}</strong>
      <span>${analyticsFormatPercent(data.openAccess.openAccessRate)} of indexed works</span>
    </div>
    <div class="analytics-access-card">
      <span class="analytics-access-label">Repository full text</span>
      <strong>${analyticsFormatNumber(data.openAccess.repositoryFulltextWorks)}</strong>
      <span>Works with repository-hosted full text</span>
    </div>
  `;

  const maxCount = Math.max(
    1,
    ...data.openAccess.statusBreakdown.map((item) => item.count)
  );

  statusRoot.innerHTML = data.openAccess.statusBreakdown
    .map(
      (item) => `
        <div class="analytics-status-item">
          <div class="analytics-status-meta">
            <span>${analyticsEscapeHtml(item.status)}</span>
            <strong>${analyticsFormatNumber(item.count)}</strong>
          </div>
          <div class="analytics-status-track">
            <span class="analytics-status-fill status-${analyticsEscapeHtml(
              item.status
            )}" style="width:${(item.count / maxCount) * 100}%"></span>
          </div>
        </div>
      `
    )
    .join("");
}

function renderTopWorks(data) {
  const root = document.getElementById("analytics-top-works");
  if (!root) {
    return;
  }

  const maxCitations = Math.max(
    1,
    ...data.topCitedWorks.map((item) => item.citations)
  );

  root.innerHTML = data.topCitedWorks
    .map(
      (item) => `
        <article class="analytics-bar-card">
          <div class="analytics-bar-topline">
            <span class="analytics-bar-title">${analyticsEscapeHtml(item.title)}</span>
            <span class="analytics-bar-value">${analyticsFormatNumber(item.citations)}</span>
          </div>
          <div class="analytics-bar-meta">${analyticsEscapeHtml(item.source)} | ${analyticsEscapeHtml(
            String(item.year || "")
          )} | ${analyticsEscapeHtml(item.citationSource || "OpenAlex")}</div>
          <div class="analytics-bar-track">
            <span class="analytics-bar-fill" style="width:${Math.max(
              12,
              (item.citations / maxCitations) * 100
            )}%"></span>
          </div>
        </article>
      `
    )
    .join("");
}

function renderSourceDistribution(data) {
  const root = document.getElementById("analytics-source-distribution");
  const chips = document.getElementById("analytics-type-chip-row");
  if (!root || !chips) {
    return;
  }

  const maxCount = Math.max(
    1,
    ...data.sourceDistribution.topSources.map((item) => item.count)
  );

  chips.innerHTML = data.sourceDistribution.typeBreakdown
    .map(
      (item) => `
        <span class="analytics-type-chip">
          ${analyticsEscapeHtml(item.type)} <strong>${analyticsFormatNumber(item.count)}</strong>
        </span>
      `
    )
    .join("");

  root.innerHTML = data.sourceDistribution.topSources
    .map(
      (item) => `
        <article class="analytics-bar-card">
          <div class="analytics-bar-topline">
            <span class="analytics-bar-title">${analyticsEscapeHtml(item.name)}</span>
            <span class="analytics-bar-value">${analyticsFormatNumber(item.count)}</span>
          </div>
          <div class="analytics-bar-meta">${analyticsEscapeHtml(item.type)} | ${analyticsFormatNumber(
            item.citations
          )} citations</div>
          <div class="analytics-bar-track">
            <span class="analytics-bar-fill is-secondary" style="width:${Math.max(
              12,
              (item.count / maxCount) * 100
            )}%"></span>
          </div>
        </article>
      `
    )
    .join("");
}

function renderWorkTable(data) {
  const root = document.getElementById("analytics-work-table");
  if (!root) {
    return;
  }

  root.innerHTML = data.works
    .map(
      (item) => `
        <tr>
          <td>
            ${
              item.url || item.scholarRecordUrl
                ? `<a href="${analyticsEscapeHtml(
                    item.url || item.scholarRecordUrl
                  )}" target="_blank" rel="noreferrer">${analyticsEscapeHtml(
                    item.title
                  )}</a>`
                : analyticsEscapeHtml(item.title)
            }
          </td>
          <td>${analyticsEscapeHtml(String(item.year || ""))}</td>
          <td>${analyticsEscapeHtml(item.source)}</td>
          <td>${analyticsFormatNumber(item.citations)}</td>
          <td>${analyticsFormatDecimal(item.citationsPerYear, 2)}</td>
          <td><span class="analytics-access-pill ${
            item.oaStatus === "unknown" ? "is-unknown" : item.isOpenAccess ? "is-open" : "is-closed"
          }">${analyticsEscapeHtml(item.oaStatus)}</span></td>
        </tr>
      `
    )
    .join("");
}

// Damped log-linear (exponential) citation forecast.
// Citation accrual for an active researcher grows multiplicatively, so we fit
// ln(citations) ~ year over the most recent complete years, then project the
// growth rate forward with geometric damping (so it decelerates rather than
// exploding). The latest calendar year is treated as PARTIAL — its YTD count is
// annualized (scaled by the fraction of the year elapsed) and used as the
// grounded central value for the current year. Returns null when there are too
// few points to fit. `opts.now` is injectable for testing.
function computeCitationForecast(annualCitations, opts = {}) {
  const now = opts.now || new Date();
  const horizon = opts.horizon ?? 3; // years projected beyond last complete year
  const damping = opts.damping ?? 0.7; // geometric decay applied to the growth rate
  const z = opts.z ?? 1.28; // ~80% interval on the log-residual scale
  const recentWindow = opts.recentWindow ?? 5; // complete years used to fit the rate

  const points = (annualCitations || [])
    .filter((d) => d.year && d.citations >= 0)
    .slice()
    .sort((a, b) => a.year - b.year);
  if (points.length < 4) {
    return null;
  }

  const currentYear = now.getFullYear();
  const last = points[points.length - 1];
  let partial = null;
  let complete = points;
  if (last.year === currentYear) {
    const start = new Date(currentYear, 0, 1);
    const end = new Date(currentYear + 1, 0, 1);
    const fraction = Math.min(0.99, Math.max(0.04, (now - start) / (end - start)));
    partial = {
      year: last.year,
      actual: last.citations,
      fraction,
      annualized: Math.round(last.citations / fraction),
    };
    complete = points.slice(0, -1);
  }

  const positive = complete.filter((d) => d.citations > 0);
  if (positive.length < 3) {
    return null;
  }

  const fit = positive.slice(-recentWindow);
  const baseYear = fit[0].year;
  const xs = fit.map((d) => d.year - baseYear);
  const ys = fit.map((d) => Math.log(d.citations));
  const n = xs.length;
  const meanX = xs.reduce((a, b) => a + b, 0) / n;
  const meanY = ys.reduce((a, b) => a + b, 0) / n;
  let sxx = 0;
  let sxy = 0;
  for (let i = 0; i < n; i += 1) {
    sxx += (xs[i] - meanX) ** 2;
    sxy += (xs[i] - meanX) * (ys[i] - meanY);
  }
  const slope = sxx ? sxy / sxx : 0;
  const intercept = meanY - slope * meanX;
  let sse = 0;
  for (let i = 0; i < n; i += 1) {
    const predicted = intercept + slope * xs[i];
    sse += (ys[i] - predicted) ** 2;
  }
  const seLog = Math.sqrt(sse / Math.max(1, n - 2));
  const growthRate = Math.exp(slope) - 1;

  const anchor = complete[complete.length - 1];
  const forecast = [];
  let running = anchor.citations;
  for (let k = 1; k <= horizon; k += 1) {
    const rate = growthRate * Math.pow(damping, k - 1);
    let central = running * (1 + rate);
    const year = anchor.year + k;
    if (partial && year === partial.year) {
      central = partial.annualized; // grounded by observed YTD
    }
    running = central;
    const halfWidth = z * seLog * Math.sqrt(k);
    forecast.push({
      year,
      citations: Math.round(central),
      lower: Math.round(central * Math.exp(-halfWidth)),
      upper: Math.round(central * Math.exp(halfWidth)),
      projected: true,
    });
  }

  return { growthRate, seLog, anchor: { year: anchor.year, citations: anchor.citations }, partial, forecast };
}

function renderAnnualCitationsChart(data) {
  const root = document.getElementById("annual-citations-chart");
  if (!root || !window.d3) {
    return;
  }

  analyticsClearNode(root);
  const width = Math.max(620, root.clientWidth || 620);
  const height = 300;
  const margin = { top: 28, right: 18, bottom: 42, left: 52 };

  const actuals = data.annualCitations || [];
  const forecast = computeCitationForecast(actuals);
  const partialYear = forecast?.partial?.year ?? null;

  // Forecast line/band run from the last complete actual (anchor) through the
  // projected years so the dashed path connects continuously to the solid one.
  const forecastPath = forecast
    ? [{ year: forecast.anchor.year, citations: forecast.anchor.citations, lower: forecast.anchor.citations, upper: forecast.anchor.citations }, ...forecast.forecast]
    : [];

  const svg = d3
    .select(root)
    .append("svg")
    .attr("viewBox", `0 0 ${width} ${height}`)
    .attr("role", "img")
    .attr("aria-label", "Annual citation trend with projection");

  const allYears = [...actuals.map((d) => d.year), ...forecastPath.map((d) => d.year)];
  const yMaxValue = Math.max(
    d3.max(actuals, (d) => d.citations) || 0,
    d3.max(forecastPath, (d) => d.upper || d.citations) || 0
  );

  const x = d3
    .scaleLinear()
    .domain([Math.min(...allYears), Math.max(...allYears)])
    .range([margin.left, width - margin.right]);

  const y = d3
    .scaleLinear()
    .domain([0, yMaxValue])
    .nice()
    .range([height - margin.bottom, margin.top]);

  svg
    .append("g")
    .attr("transform", `translate(0,${height - margin.bottom})`)
    .call(d3.axisBottom(x).tickFormat(d3.format("d")).ticks(Math.min(10, allYears.length)))
    .call((g) => g.selectAll("text").attr("fill", "#6f6a64"))
    .call((g) => g.selectAll("line,path").attr("stroke", "#d5d0c7"));

  svg
    .append("g")
    .attr("transform", `translate(${margin.left},0)`)
    .call(d3.axisLeft(y).ticks(5))
    .call((g) => g.selectAll("text").attr("fill", "#6f6a64"))
    .call((g) => g.selectAll("line,path").attr("stroke", "#d5d0c7"));

  svg
    .append("g")
    .attr("stroke", "#ece7df")
    .selectAll("line")
    .data(y.ticks(5))
    .join("line")
    .attr("x1", margin.left)
    .attr("x2", width - margin.right)
    .attr("y1", (d) => y(d))
    .attr("y2", (d) => y(d));

  // Projection uncertainty band (~80% interval) drawn behind the lines.
  if (forecastPath.length > 1) {
    const band = d3
      .area()
      .x((d) => x(d.year))
      .y0((d) => y(d.lower))
      .y1((d) => y(d.upper))
      .curve(d3.curveMonotoneX);

    svg
      .append("path")
      .datum(forecastPath)
      .attr("fill", "#c69a53")
      .attr("fill-opacity", 0.16)
      .attr("d", band);
  }

  const line = d3
    .line()
    .x((d) => x(d.year))
    .y((d) => y(d.citations))
    .curve(d3.curveMonotoneX);

  // Actual citations (solid crimson).
  svg
    .append("path")
    .datum(actuals)
    .attr("fill", "none")
    .attr("stroke", "#8b1e2d")
    .attr("stroke-width", 3)
    .attr("d", line);

  // Projected citations (dashed gold).
  if (forecastPath.length > 1) {
    svg
      .append("path")
      .datum(forecastPath)
      .attr("fill", "none")
      .attr("stroke", "#c69a53")
      .attr("stroke-width", 2.5)
      .attr("stroke-dasharray", "6 5")
      .attr("d", line);
  }

  // Actual points; the partial current year gets a hollow dashed ring.
  svg
    .append("g")
    .selectAll("circle")
    .data(actuals)
    .join("circle")
    .attr("cx", (d) => x(d.year))
    .attr("cy", (d) => y(d.citations))
    .attr("r", (d) => (d.year === partialYear ? 5 : 4.5))
    .attr("fill", (d) => (d.year === partialYear ? "#fffdf9" : "#fff7f2"))
    .attr("stroke", "#8b1e2d")
    .attr("stroke-width", 2)
    .attr("stroke-dasharray", (d) => (d.year === partialYear ? "3 2" : null))
    .append("title")
    .text((d) =>
      d.year === partialYear
        ? `${d.year} year-to-date: ${analyticsFormatNumber(d.citations)} citations so far (partial year)`
        : `${d.year}: ${analyticsFormatNumber(d.citations)} citations`
    );

  // Projected points (hollow gold) with the interval in the tooltip.
  if (forecast) {
    svg
      .append("g")
      .selectAll("circle")
      .data(forecast.forecast)
      .join("circle")
      .attr("cx", (d) => x(d.year))
      .attr("cy", (d) => y(d.citations))
      .attr("r", 4)
      .attr("fill", "#fffaf0")
      .attr("stroke", "#c69a53")
      .attr("stroke-width", 2)
      .append("title")
      .text(
        (d) =>
          `${d.year} projected: ~${analyticsFormatNumber(d.citations)} citations (≈80% range ${analyticsFormatNumber(
            d.lower
          )}–${analyticsFormatNumber(d.upper)})`
      );
  }

  // Legend.
  const legend = svg.append("g").attr("transform", `translate(${margin.left},14)`);
  const legendItems = [
    { label: "Actual", color: "#8b1e2d", dashed: false },
  ];
  if (forecast) {
    const pct = Math.round((forecast.growthRate || 0) * 100);
    legendItems.push({ label: `Projected (~${pct}%/yr, damped)`, color: "#c69a53", dashed: true });
  }
  let offset = 0;
  legendItems.forEach((item) => {
    const g = legend.append("g").attr("transform", `translate(${offset},0)`);
    g.append("line")
      .attr("x1", 0)
      .attr("x2", 22)
      .attr("y1", 0)
      .attr("y2", 0)
      .attr("stroke", item.color)
      .attr("stroke-width", item.dashed ? 2.5 : 3)
      .attr("stroke-dasharray", item.dashed ? "6 5" : null);
    const text = g
      .append("text")
      .attr("x", 28)
      .attr("y", 4)
      .attr("fill", "#6f6a64")
      .style("font-size", "11px")
      .text(item.label);
    offset += 28 + (item.label.length * 6.2) + 24;
    return text;
  });
}

function renderTopicCluster(data) {
  const root = document.getElementById("analytics-topic-cluster");
  if (!root || !window.d3) {
    return;
  }

  analyticsClearNode(root);
  const width = Math.max(420, root.clientWidth || 420);
  const height = 360;

  const svg = d3
    .select(root)
    .append("svg")
    .attr("viewBox", `0 0 ${width} ${height}`)
    .attr("role", "img")
    .attr("aria-label", "Topic cluster bubble chart");

  const color = d3
    .scaleOrdinal()
    .domain(["topic", "keyword"])
    .range(["#8b1e2d", "#c69a53"]);

  const hierarchy = d3
    .hierarchy({ children: data.topicCluster })
    .sum((d) => d.count);

  const packed = d3.pack().size([width, height]).padding(8)(hierarchy);

  const nodes = svg
    .selectAll("g")
    .data(packed.leaves())
    .join("g")
    .attr("transform", (d) => `translate(${d.x},${d.y})`);

  nodes
    .append("circle")
    .attr("r", (d) => d.r)
    .attr("fill", (d) => color(d.data.type))
    .attr("fill-opacity", 0.85);

  nodes
    .append("title")
    .text((d) => `${d.data.label}: ${analyticsFormatNumber(d.data.count)} signals`);

  nodes
    .append("text")
    .attr("text-anchor", "middle")
    .attr("fill", "#fffaf5")
    .style("font-size", (d) => `${Math.max(10, Math.min(16, d.r / 2.8))}px`)
    .style("font-weight", 600)
    .selectAll("tspan")
    .data((d) => {
      const words = d.data.label.split(/\s+/);
      const lines = [];
      while (words.length) {
        lines.push(words.splice(0, words.length > 3 ? 2 : words.length).join(" "));
      }
      return lines.slice(0, 3);
    })
    .join("tspan")
    .attr("x", 0)
    .attr("dy", (d, index) => (index === 0 ? "0" : "1.1em"))
    .text((d) => d);
}

function renderCoauthorNetwork(data) {
  const root = document.getElementById("analytics-network");
  if (!root || !window.d3) {
    return;
  }

  analyticsClearNode(root);
  const width = Math.max(540, root.clientWidth || 540);
  const height = 420;
  const svg = d3
    .select(root)
    .append("svg")
    .attr("viewBox", `0 0 ${width} ${height}`)
    .attr("role", "img")
    .attr("aria-label", "Coauthor network");

  const nodes = data.coauthorNetwork.nodes.map((item) => ({ ...item }));
  const links = data.coauthorNetwork.links.map((item) => ({ ...item }));
  const radius = d3
    .scaleSqrt()
    .domain([1, d3.max(nodes, (d) => d.works) || 1])
    .range([7, 28]);

  const linkWidth = d3
    .scaleLinear()
    .domain([1, d3.max(links, (d) => d.weight) || 1])
    .range([1, 5]);

  const simulation = d3
    .forceSimulation(nodes)
    .force(
      "link",
      d3.forceLink(links).id((d) => d.id).distance((d) => 120 - Math.min(70, d.weight * 8))
    )
    .force("charge", d3.forceManyBody().strength(-260))
    .force("center", d3.forceCenter(width / 2, height / 2))
    .force("collision", d3.forceCollide().radius((d) => radius(d.works) + 6));

  const link = svg
    .append("g")
    .attr("stroke", "#cfc8bc")
    .attr("stroke-opacity", 0.82)
    .selectAll("line")
    .data(links)
    .join("line")
    .attr("stroke-width", (d) => linkWidth(d.weight));

  const node = svg
    .append("g")
    .selectAll("circle")
    .data(nodes)
    .join("circle")
    .attr("r", (d) => radius(d.works))
    .attr("fill", (d) => (d.group === "self" ? "#8b1e2d" : "#c8a573"))
    .attr("stroke", "#fffaf5")
    .attr("stroke-width", 2)
    .call(
      d3
        .drag()
        .on("start", (event) => {
          if (!event.active) {
            simulation.alphaTarget(0.3).restart();
          }
          event.subject.fx = event.subject.x;
          event.subject.fy = event.subject.y;
        })
        .on("drag", (event) => {
          event.subject.fx = event.x;
          event.subject.fy = event.y;
        })
        .on("end", (event) => {
          if (!event.active) {
            simulation.alphaTarget(0);
          }
          event.subject.fx = null;
          event.subject.fy = null;
        })
    );

  node
    .append("title")
    .text(
      (d) =>
        `${d.label}\nCollaborative works: ${analyticsFormatNumber(d.works)}\nLinked citations: ${analyticsFormatNumber(
          d.citations
        )}${d.institution ? `\n${d.institution}` : ""}`
    );

  const labels = svg
    .append("g")
    .selectAll("text")
    .data(nodes.filter((d) => d.group === "self" || d.works >= 3))
    .join("text")
    .attr("font-size", 11)
    .attr("font-weight", 600)
    .attr("fill", "#342f29")
    .attr("text-anchor", "middle")
    .text((d) => d.label);

  simulation.on("tick", () => {
    link
      .attr("x1", (d) => d.source.x)
      .attr("y1", (d) => d.source.y)
      .attr("x2", (d) => d.target.x)
      .attr("y2", (d) => d.target.y);

    node.attr("cx", (d) => d.x).attr("cy", (d) => d.y);

    labels
      .attr("x", (d) => d.x)
      .attr("y", (d) => d.y + radius(d.works) + 16);
  });
}

function renderAnalyticsDashboard(data) {
  renderAnalyticsMeta(data);
  renderAnalyticsMetrics(data);
  renderAccessSummary(data);
  renderTopWorks(data);
  renderSourceDistribution(data);
  renderWorkTable(data);
  renderAnnualCitationsChart(data);
  renderTopicCluster(data);
  renderCoauthorNetwork(data);

  const loading = document.getElementById("analytics-loading");
  const dashboard = document.getElementById("analytics-dashboard");
  if (loading) {
    loading.hidden = true;
  }
  if (dashboard) {
    dashboard.hidden = false;
  }

  analyticsState.rendered = true;
  document.dispatchEvent(new CustomEvent("panel:content-updated"));
}

async function maybeRenderAnalytics(force = false) {
  const panel = document.querySelector('.content-panel[data-panel="analytics"]');
  if (!panel) {
    return;
  }

  const isActive = panel.classList.contains("is-active");
  if (!isActive && !force) {
    return;
  }

  const loading = document.getElementById("analytics-loading");
  if (loading && !analyticsState.rendered) {
    loading.hidden = false;
  }

  try {
    const data = analyticsState.data || (await loadResearchAnalytics());
    renderAnalyticsDashboard(data);
  } catch (error) {
    if (loading) {
      loading.hidden = false;
      loading.textContent = "Research analytics could not be loaded right now.";
    }
  }
}

function initializeAnalytics() {
  if (!document.getElementById("analytics-dashboard")) {
    return;
  }

  document.addEventListener("panel:activated", (event) => {
    if (event.detail?.panel === "analytics") {
      maybeRenderAnalytics(true);
    }
  });

  let resizeTimer = null;
  window.addEventListener("resize", () => {
    const panel = document.querySelector('.content-panel[data-panel="analytics"]');
    if (!panel || !panel.classList.contains("is-active") || !analyticsState.data) {
      return;
    }

    window.clearTimeout(resizeTimer);
    resizeTimer = window.setTimeout(() => {
      renderAnalyticsDashboard(analyticsState.data);
    }, 180);
  });

  const panel = document.querySelector('.content-panel[data-panel="analytics"]');
  if (panel?.classList.contains("is-active")) {
    maybeRenderAnalytics(true);
  } else {
    loadResearchAnalytics().catch(() => {});
  }
}

document.addEventListener("DOMContentLoaded", initializeAnalytics);
