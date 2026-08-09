(function () {
  const ROTATION_MS = 9000;

  function escapeHtml(value) {
    return String(value || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  function imageUrl(project, base) {
    return `${base}${encodeURIComponent(project.image).replace(/%2F/g, "/")}`;
  }

  function links(project, compact) {
    const live = project.live
      ? `<a class="fp-action fp-action-secondary" href="${escapeHtml(project.live)}" target="_blank" rel="noopener noreferrer">Live demo</a>`
      : "";
    const repo = project.repo
      ? `<a class="fp-action fp-action-secondary" href="${escapeHtml(project.repo)}" target="_blank" rel="noopener noreferrer">Source</a>`
      : "";
    return `<button class="fp-action fp-action-primary" type="button" data-fp-case="${escapeHtml(project.id)}">View case study</button>${compact ? "" : live + repo}`;
  }

  function meta(project) {
    return `<dl class="fp-meta">
      <div><dt>Role</dt><dd>${escapeHtml(project.role)}</dd></div>
      <div><dt>Status</dt><dd>${escapeHtml(project.status)}</dd></div>
      <div><dt>Research area</dt><dd>${escapeHtml(project.researchArea)}</dd></div>
      <div><dt>Outcome</dt><dd>${escapeHtml(project.outcome)}</dd></div>
    </dl>`;
  }

  function initShowcase(host) {
    const projects = Array.isArray(window.__featuredProjects) ? window.__featuredProjects : [];
    if (projects.length < 3) return;

    const base = host.dataset.imageBase || "";
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let index = 0;
    let paused = reducedMotion.matches;
    let timer = null;

    host.innerHTML = `
      <div class="fp-render" data-fp-render></div>
      <div class="fp-controls" aria-label="Featured project rotation controls">
        <button type="button" data-fp-previous>Previous project</button>
        <span class="fp-position" data-fp-position aria-live="polite"></span>
        <button type="button" data-fp-toggle>${paused ? "Start rotation" : "Pause rotation"}</button>
        <button type="button" data-fp-next>Next project</button>
      </div>
      <dialog class="fp-dialog" data-fp-dialog aria-labelledby="fp-dialog-title">
        <div class="fp-dialog-shell" data-fp-dialog-content></div>
      </dialog>`;

    const renderRoot = host.querySelector("[data-fp-render]");
    const position = host.querySelector("[data-fp-position]");
    const toggle = host.querySelector("[data-fp-toggle]");
    const dialog = host.querySelector("[data-fp-dialog]");
    const dialogContent = host.querySelector("[data-fp-dialog-content]");

    function ordered() {
      return projects.map((_, offset) => projects[(index + offset) % projects.length]);
    }

    function openCase(projectId) {
      const project = projects.find((item) => item.id === projectId);
      if (!project) return;
      dialogContent.innerHTML = `
        <button class="fp-dialog-close" type="button" data-fp-close>Close</button>
        <img src="${imageUrl(project, base)}" width="960" height="600" alt="${escapeHtml(project.imageAlt)}">
        <div class="fp-dialog-copy">
          <p class="fp-kicker">${escapeHtml(project.status)}</p>
          <h2 id="fp-dialog-title">${escapeHtml(project.title)}</h2>
          <p class="fp-dialog-summary">${escapeHtml(project.summary)}</p>
          <dl class="fp-meta fp-dialog-meta">
            <div><dt>Audience / problem</dt><dd>${escapeHtml(project.audience)}</dd></div>
            <div><dt>My role</dt><dd>${escapeHtml(project.role)}</dd></div>
            <div><dt>Research area</dt><dd>${escapeHtml(project.researchArea)}</dd></div>
            <div><dt>Contribution</dt><dd>${escapeHtml(project.outcome)}</dd></div>
          </dl>
          <div class="fp-actions">
            ${project.live ? `<a class="fp-action fp-action-primary" href="${escapeHtml(project.live)}" target="_blank" rel="noopener noreferrer">Open live project</a>` : ""}
            ${project.repo ? `<a class="fp-action fp-action-secondary" href="${escapeHtml(project.repo)}" target="_blank" rel="noopener noreferrer">View source</a>` : ""}
          </div>
        </div>`;
      dialogContent.querySelector("[data-fp-close]").addEventListener("click", () => dialog.close());
      dialog.showModal();
    }

    function render() {
      const items = ordered();
      const lead = items[0];
      const supports = items.slice(1, 3);
      renderRoot.innerHTML = `
        <div class="fp-stage">
          <a class="fp-lead-media" href="${escapeHtml(lead.live || lead.repo)}" target="_blank" rel="noopener noreferrer" aria-label="Open ${escapeHtml(lead.title)}">
            <img src="${imageUrl(lead, base)}" width="960" height="600" alt="${escapeHtml(lead.imageAlt)}">
          </a>
          <div class="fp-lead-copy">
            <p class="fp-kicker">${escapeHtml(lead.status)}</p>
            <h3>${escapeHtml(lead.title)}</h3>
            <p class="fp-summary">${escapeHtml(lead.summary)}</p>
            ${meta(lead)}
            <div class="fp-actions">${links(lead, false)}</div>
          </div>
        </div>
        <div class="fp-support-grid">
          ${supports.map((project) => `<article class="fp-support-card">
            <a class="fp-support-media" href="${escapeHtml(project.live || project.repo)}" target="_blank" rel="noopener noreferrer" aria-label="Open ${escapeHtml(project.title)}">
              <img src="${imageUrl(project, base)}" width="640" height="400" alt="${escapeHtml(project.imageAlt)}" loading="lazy">
            </a>
            <div class="fp-support-copy">
              <p class="fp-kicker">${escapeHtml(project.status)}</p>
              <h3>${escapeHtml(project.title)}</h3>
              <p>${escapeHtml(project.outcome)}</p>
              <div class="fp-actions">${links(project, true)}</div>
            </div>
          </article>`).join("")}
        </div>`;
      position.textContent = `${index + 1} of ${projects.length}`;
      renderRoot.querySelectorAll("[data-fp-case]").forEach((button) => {
        button.addEventListener("click", () => openCase(button.dataset.fpCase));
      });
    }

    function stopTimer() {
      if (timer) window.clearInterval(timer);
      timer = null;
    }

    function startTimer() {
      stopTimer();
      if (paused || reducedMotion.matches) return;
      timer = window.setInterval(() => {
        index = (index + 1) % projects.length;
        render();
      }, ROTATION_MS);
    }

    function rotate(delta) {
      index = (index + delta + projects.length) % projects.length;
      render();
      startTimer();
    }

    host.querySelector("[data-fp-previous]").addEventListener("click", () => rotate(-1));
    host.querySelector("[data-fp-next]").addEventListener("click", () => rotate(1));
    toggle.addEventListener("click", () => {
      paused = !paused;
      toggle.textContent = paused ? "Start rotation" : "Pause rotation";
      startTimer();
    });
    dialog.addEventListener("click", (event) => {
      if (event.target === dialog) dialog.close();
    });
    reducedMotion.addEventListener("change", (event) => {
      if (event.matches) {
        paused = true;
        toggle.textContent = "Start rotation";
      }
      startTimer();
    });
    document.addEventListener("visibilitychange", () => {
      if (document.hidden) stopTimer();
      else startTimer();
    });

    render();
    startTimer();
  }

  function init() {
    document.querySelectorAll("[data-featured-projects]").forEach(initShowcase);
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
