(() => {
  const root = document.getElementById("teaching-portfolio");
  const data = window.__cvSiteData?.teaching;
  const design = window.__cvTeachingDesign;
  if (!root || !data || !design) return;
  const html = value => String(value ?? "").replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
  const history = data.courseHistory || [];
  const openCourses = new Set();
  const institutionLabel = name => name === "The University of Alabama" ? "University of Alabama" : name;
  const level = appointment => /doctoral/i.test(appointment.level) ? "Doctoral" : /master/i.test(appointment.level) ? "Master’s" : /undergraduate/i.test(appointment.level) ? "Undergraduate" : "Graduate";
  const university = (data.developedCourses || []).map(course => ({...course, ...design.universityCourses.find(item => item.code === course.code), status:"Developed", year:course.terms}));
  const card = (course, kind) => `
    <article class="design-course ${kind === "planned" ? "design-course-planned" : ""}">
      <img src="${html(course.image)}" alt="${html(course.imageAlt)}" width="960" height="540" loading="lazy" decoding="async">
      <div class="design-course-body">
        <div class="design-course-meta"><span>${html(course.code)}</span><span class="design-status ${kind === "planned" ? "is-planned" : ""}">${html(course.status)}${course.year ? ` · ${html(course.year)}` : ""}</span></div>
        <h4>${html(course.title)}</h4>
        ${course.subtitle ? `<p class="design-course-subtitle">${html(course.subtitle)}</p>` : ""}
        <p>${html(course.summary)}</p>
        ${course.topics ? `<ul class="design-topics" aria-label="Course themes">${course.topics.map(topic => `<li>${html(topic)}</li>`).join("")}</ul>` : ""}
        <details class="design-course-details"><summary>Course details</summary><div>
          <p>${html(course.detail || `${course.level}. Developed for ${course.institution} in ${course.terms}.`)}</p>
          ${course.url ? `<a class="teaching-course-link" href="${html(course.url)}" target="_blank" rel="noopener noreferrer">Explore ${html(course.code)} <span aria-hidden="true">↗</span></a>` : ""}
        </div></details>
        ${course.url ? `<a class="teaching-course-link design-primary-link" href="${html(course.url)}" target="_blank" rel="noopener noreferrer">Open course website <span aria-hidden="true">↗</span></a>` : ""}
        ${course.access ? `<p class="design-access-note">Course access: <strong>${html(course.access)}</strong></p>` : ""}
      </div>
    </article>`;
  root.innerHTML = `
    <div class="teaching-intro"><p>Teaching across doctoral, master’s, and undergraduate study, with course development that connects learning science, emerging technologies, and instructional practice.</p>
      <div class="teaching-totals" aria-label="Teaching portfolio summary"><span><strong>${history.length}</strong> courses taught or supported</span><span><strong>${university.length}</strong> UA courses developed</span><span><strong>${design.openCourses.length}</strong> open courses</span></div>
    </div>
    <section class="teaching-subsection" aria-labelledby="instructional-design-title">
      <div class="teaching-subheading"><div><span class="section-label">Course development</span><h3 id="instructional-design-title">Instructional Design</h3></div><p>University courses and open learning experiences designed by Jewoong Moon.</p></div>
      <h4 class="design-group-title">University of Alabama courses</h4>
      <div class="design-course-grid" data-design-group="university">${university.map(course => card(course,"university")).join("")}</div>
      <h4 class="design-group-title">Open courseware</h4>
      <div class="design-course-grid" data-design-group="open">${design.openCourses.map(course => card(course,"open")).join("")}</div>
      <h4 class="design-group-title">In development</h4>
      <div class="design-course-grid" data-design-group="planned">${design.plannedCourses.map(course => card(course,"planned")).join("")}</div>
    </section>
    <section class="teaching-subsection" aria-labelledby="teaching-history-title">
      <div class="teaching-subheading"><div><span class="section-label">Teaching experience</span><h3 id="teaching-history-title">Course history</h3></div><p>Browse course topics, teaching roles, and recorded terms.</p></div>
      <div class="teaching-controls">
        <label class="teaching-search">Search courses<input id="teaching-search" type="search" placeholder="Course code, topic, or year" autocomplete="off"></label>
        <label>Institution<select id="teaching-institution"><option value="all">All institutions</option>${[...new Set(history.map(item => item.institution))].map(name => `<option value="${html(name)}">${html(institutionLabel(name))}</option>`).join("")}</select></label>
        <label>Level<select id="teaching-level"><option value="all">All levels</option>${[...new Set(history.flatMap(item => item.appointments.map(level)))].map(name => `<option>${html(name)}</option>`).join("")}</select></label>
      </div>
      <div class="teaching-list-actions"><p id="teaching-result-count" role="status" aria-live="polite"></p><div><button type="button" id="teaching-expand">Expand shown</button><button type="button" id="teaching-collapse">Collapse shown</button><button type="button" id="teaching-reset">Reset filters</button></div></div>
      <div id="teaching-history-list"></div>
      <p class="section-note teaching-history-note">Terms reflect recorded teaching history. Course focus descriptions summarize the teaching areas.</p>
    </section>`;
  const list = document.getElementById("teaching-history-list");
  const search = document.getElementById("teaching-search");
  const institution = document.getElementById("teaching-institution");
  const levelSelect = document.getElementById("teaching-level");
  const notify = () => document.dispatchEvent(new CustomEvent("panel:content-updated"));
  function renderHistory() {
    const query = search.value.trim().toLocaleLowerCase();
    const records = history.filter(item => (institution.value === "all" || item.institution === institution.value) && (levelSelect.value === "all" || item.appointments.some(appointment => level(appointment) === levelSelect.value)) && `${item.code} ${item.title} ${item.institution} ${design.courseFocus[item.code] || ""} ${item.appointments.map(appointment => `${appointment.role} ${appointment.terms}`).join(" ")}`.toLocaleLowerCase().includes(query));
    document.getElementById("teaching-result-count").textContent = `${records.length} of ${history.length} courses`;
    list.innerHTML = records.length ? records.map(item => {
      const key = `${item.institution}:${item.code}`;
      return `<details class="teaching-history-course" data-course-key="${html(key)}" ${openCourses.has(key) ? "open" : ""}>
        <summary><span class="course-code">${html(item.code)}</span><span class="history-course-heading"><strong>${html(item.title)}</strong><span>${html(institutionLabel(item.institution))} · ${html([...new Set(item.appointments.map(level))].join(" / "))}</span></span><span class="history-expand-icon" aria-hidden="true">+</span></summary>
        <div class="history-course-body"><p>${html(design.courseFocus[item.code] || item.title)}</p><dl>${item.appointments.map(appointment => `<div><dt>${html(appointment.role)}</dt><dd>${html(appointment.level.replace(/\s*[-–]\s*/g," · "))}<span>${html(appointment.terms.replace(/(\d{4})-(\d{4})/g,"$1–$2"))}</span></dd></div>`).join("")}</dl></div>
      </details>`;
    }).join("") : '<p class="teaching-empty">No courses match these filters. Try another term or reset the filters.</p>';
    list.querySelectorAll("details").forEach(details => details.addEventListener("toggle", () => {
      if (details.open) openCourses.add(details.dataset.courseKey); else openCourses.delete(details.dataset.courseKey);
      notify();
    }));
    ["teaching-expand","teaching-collapse"].forEach(id => {document.getElementById(id).disabled = records.length === 0;});
    notify();
  }
  search.addEventListener("input",renderHistory);
  institution.addEventListener("change",renderHistory);
  levelSelect.addEventListener("change",renderHistory);
  document.getElementById("teaching-reset").addEventListener("click",() => {search.value="";institution.value="all";levelSelect.value="all";renderHistory();search.focus();});
  document.getElementById("teaching-expand").addEventListener("click",() => list.querySelectorAll("details").forEach(details => {details.open=true;}));
  document.getElementById("teaching-collapse").addEventListener("click",() => list.querySelectorAll("details").forEach(details => {details.open=false;}));
  root.querySelectorAll(".design-course-details").forEach(details => details.addEventListener("toggle",notify));
  renderHistory();
})();
