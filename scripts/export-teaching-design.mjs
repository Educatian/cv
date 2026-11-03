import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import {createHash} from 'node:crypto';
import {fileURLToPath, pathToFileURL} from 'node:url';

const defaultRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const sourceBase = new URL('https://educatian.github.io/cv/');
const hash = bytes => createHash('sha256').update(bytes).digest('hex');

export function buildTeachingExport(root = defaultRoot) {
  const context = {window: {}};
  vm.runInNewContext(fs.readFileSync(path.join(root, 'assets/teaching-design.js'), 'utf8'), context, {timeout: 1000});
  const catalog = JSON.parse(JSON.stringify(context.window.__cvTeachingDesign));
  for (const key of ['universityCourses', 'openCourses', 'plannedCourses']) {
    if (!Array.isArray(catalog?.[key]) || catalog[key].some(course => !course || typeof course.code !== 'string' || !course.code.trim())) {
      throw new Error(`Invalid teaching catalog: ${key}`);
    }
  }
  const developedCourses = JSON.parse(fs.readFileSync(path.join(root, 'assets/site-data.generated.json'), 'utf8')).teaching?.developedCourses;
  if (!Array.isArray(developedCourses)) throw new Error('Missing developed course records from the CV');
  const imageVersions = {};
  for (const course of [...catalog.universityCourses, ...catalog.openCourses, ...catalog.plannedCourses]) {
    if (!course.image) continue;
    const url = new URL(course.image, sourceBase);
    if (url.origin !== sourceBase.origin || !url.pathname.startsWith(sourceBase.pathname)) continue;
    const relative = decodeURIComponent(url.pathname.slice(sourceBase.pathname.length));
    const imagePath = path.resolve(root, relative);
    if (!imagePath.startsWith(path.resolve(root) + path.sep)) throw new Error('Course image is outside the website');
    imageVersions[course.image] = hash(fs.readFileSync(imagePath)).slice(0, 16);
  }
  const content = {catalog, developedCourses, imageVersions};
  return {schemaVersion: 1, revision: hash(JSON.stringify(content)).slice(0, 20), ...content};
}

export function writeTeachingExport(root = defaultRoot) {
  const data = buildTeachingExport(root);
  fs.writeFileSync(path.join(root, 'assets/teaching-design.generated.json'), JSON.stringify(data, null, 2) + '\n');
  const page = path.join(root, 'index.html');
  const html = fs.readFileSync(page, 'utf8');
  const updated = html.replace(/(src="assets\/teaching-design\.js)(?:\?[^"\s]*)?"/, `$1?v=${data.revision}"`);
  if (updated !== html) fs.writeFileSync(page, updated);
  return data;
}

if (process.argv[1] && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href) {
  const data = writeTeachingExport();
  console.log(`Exported teaching catalog ${data.revision}; ${Object.keys(data.imageVersions).length} versioned images`);
}
