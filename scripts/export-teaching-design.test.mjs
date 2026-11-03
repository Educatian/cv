import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import {buildTeachingExport} from './export-teaching-design.mjs';

test('course metadata and image-only edits both change the export revision', () => {
  const base = path.resolve('work/course-export-tests');
  fs.mkdirSync(base, {recursive:true});
  const root = fs.mkdtempSync(path.join(base, 'fixture-'));
  assert.ok(root.startsWith(base + path.sep));
  try {
    fs.mkdirSync(path.join(root,'assets/teaching'), {recursive:true});
    fs.writeFileSync(path.join(root,'assets/site-data.generated.json'), JSON.stringify({teaching:{developedCourses:[]}}));
    const source = title => `window.__cvTeachingDesign = ${JSON.stringify({universityCourses:[],openCourses:[{code:'Example',title,image:'assets/teaching/example.svg'}],plannedCourses:[]})};`;
    fs.writeFileSync(path.join(root,'assets/teaching-design.js'),source('First title'));
    fs.writeFileSync(path.join(root,'assets/teaching/example.svg'),'<svg>first</svg>');
    const first = buildTeachingExport(root);
    assert.deepEqual(buildTeachingExport(root),first,'unchanged input is deterministic');
    fs.writeFileSync(path.join(root,'assets/teaching-design.js'),source('Updated title'));
    const renamed = buildTeachingExport(root);
    assert.notEqual(renamed.revision,first.revision);
    assert.equal(renamed.imageVersions['assets/teaching/example.svg'],first.imageVersions['assets/teaching/example.svg']);
    fs.writeFileSync(path.join(root,'assets/teaching/example.svg'),'<svg>replacement</svg>');
    const replaced = buildTeachingExport(root);
    assert.notEqual(replaced.revision,renamed.revision);
    assert.notEqual(replaced.imageVersions['assets/teaching/example.svg'],renamed.imageVersions['assets/teaching/example.svg']);
    fs.unlinkSync(path.join(root,'assets/teaching/example.svg'));
    assert.throws(()=>buildTeachingExport(root),/ENOENT/,'missing local media cannot silently publish');
  } finally {
    assert.ok(path.resolve(root).startsWith(base + path.sep));
    fs.rmSync(root,{recursive:true});
  }
});
