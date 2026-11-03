# Course information shared with the Lab

Edit course descriptions, groups, access labels and image paths in `assets/teaching-design.js`. University course titles and degree/term information come from the canonical CV DOCX through `assets/site-data.generated.json`. Update thumbnail files under `assets/teaching/`.

The existing regeneration workflow watches those source files. It checks and exports `assets/teaching-design.generated.json`, including the developed-course records and content hashes for local images, then publishes the updated static site. Do not edit the generated JSON by hand. `node scripts/export-teaching-design.mjs` produces the same export locally.

The Lab fetches this JSON with cache revalidation when loaded, when the visitor returns to the page, when the network reconnects, and every five minutes while visible. Relative thumbnails resolve against the personal website, so new images do not need a second Lab upload. Image content hashes invalidate replaced files even if the filename stays the same.

The Lab's bundled catalog and thumbnails remain the initial/offline fallback. Failed or invalid responses retain the last valid data. A live update preserves expanded course details and keyboard focus where the course remains present.

OpenStory currently has `access: "To be announced"` and no course URL. Keep its course address out of the public catalog and thumbnail artwork until the owner authorizes announcing access. The Lab suppresses clickable URLs on any course marked To be announced.

Validate the exporter with `node --test scripts/export-teaching-design.test.mjs`.
