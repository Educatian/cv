function renderPublicationNotFound(root) {
  root.innerHTML = `
    <p class="section-label">Publication</p>
    <h1 class="publication-detail-title">Publication not found</h1>
    <p class="section-note">The requested record could not be matched to the current CV dataset.</p>
    <a class="button button-primary" href="index.html#publications">Return to Publications</a>
  `;
}

async function renderPublicationDetailPage() {
  const root = document.getElementById("publication-detail-root");
  const siteApi = window.__cvSite;

  if (!root || !siteApi) {
    return;
  }

  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");
  const publication = siteApi
    .getAllPublicationRecords()
    .find((item) => item.id === id);

  if (!publication) {
    renderPublicationNotFound(root);
    return;
  }

  document.title = `${publication.title} | Dr. Jewoong Moon`;

  root.innerHTML = `
    <div class="publication-detail-grid">
      <div class="publication-detail-cover">
        <div class="publication-thumb is-journal-front">
          ${siteApi.renderJournalFrontThumb(publication)}
        </div>
      </div>
      <div class="publication-detail-body">
        <p class="section-label">Publication</p>
        <div class="publication-meta">
          <span class="publication-year">${siteApi.escapeHtml(publication.year)}</span>
          <span class="complete-publication-category">${siteApi.escapeHtml(publication.category)}</span>
          ${
            publication.note
              ? `<span class="publication-note">${siteApi.escapeHtml(publication.note)}</span>`
              : ""
          }
          ${publication.tags
            .map((tag) => `<span class="tag-pill">${siteApi.escapeHtml(tag)}</span>`)
            .join("")}
        </div>
        <h1 class="publication-detail-title">${siteApi.escapeHtml(publication.title)}</h1>
        ${
          publication.authors
            ? `<p class="publication-detail-authors">${siteApi.escapeHtml(publication.authors)}</p>`
            : ""
        }
        ${
          publication.venue
            ? `<p class="publication-detail-venue">${siteApi.escapeHtml(publication.venue)}</p>`
            : ""
        }
        <div class="publication-detail-actions">
          ${
            publication.link
              ? `<a class="button button-primary" href="${publication.link}" target="_blank" rel="noreferrer">Journal page</a>`
              : ""
          }
          <a class="button" href="index.html#publications">Back to list</a>
        </div>
      </div>
    </div>

    <div class="publication-detail-sections">
      <section class="publication-detail-section">
        <h2>Abstract</h2>
        <p class="publication-detail-abstract ${publication.doi ? "is-loading" : "is-empty"}" id="publication-detail-abstract">
          ${siteApi.escapeHtml(siteApi.getAbstractFallback(publication))}
        </p>
      </section>
      <section class="publication-detail-section">
        <h2>Citation</h2>
        <p class="publication-detail-citation">${siteApi.escapeHtml(publication.citation)}</p>
      </section>
      ${
        publication.doi
          ? `<section class="publication-detail-section">
              <h2>DOI</h2>
              <p><a class="publication-link is-primary" href="https://doi.org/${publication.doi}" target="_blank" rel="noreferrer">https://doi.org/${publication.doi}</a></p>
            </section>`
          : ""
      }
    </div>
  `;

  if (publication.doi) {
    const abstractNode = document.getElementById("publication-detail-abstract");
    const abstractText = await siteApi.fetchAbstractText(publication.doi);
    abstractNode.textContent =
      abstractText || "Abstract unavailable for this publication record.";
    abstractNode.classList.remove("is-loading");
    abstractNode.classList.toggle("is-empty", !abstractText);
  }
}

document.addEventListener("DOMContentLoaded", renderPublicationDetailPage);
