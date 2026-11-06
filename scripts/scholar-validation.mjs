export function validateScholarProfile(data) {
  const fail = message => { throw new Error(`Invalid Scholar capture: ${message}. Previous data retained.`); };
  if (!data || !/jewoong\s+moon/i.test(data.author?.name || '')) fail('author identity missing');
  const summary = data.summary || {};
  for (const key of ['totalCitations','sinceYearCitations','hIndex','sinceYearHIndex','i10Index','sinceYearI10Index']) {
    if (!Number.isInteger(summary[key]) || summary[key] < 0) fail(`${key} missing`);
  }
  if (summary.totalCitations <= 0 || summary.hIndex <= 0 || !/^Since \d{4}$/.test(summary.sinceLabel || '')) fail('summary unavailable');
  for (const [all,recent] of [['totalCitations','sinceYearCitations'],['hIndex','sinceYearHIndex'],['i10Index','sinceYearI10Index']]) {
    if (summary[recent] > summary[all]) fail('inconsistent recent statistics');
  }
  if (!Array.isArray(data.works) || !data.works.length || data.worksCount !== data.works.length) fail('publication list missing');
  if (data.capture?.complete !== true) fail('publication pagination incomplete');
  if (data.works.some(w => !w.title?.trim() || !Number.isInteger(w.citations) || w.citations < 0)) fail('invalid publication');
  const citationCounts = data.works.map(w=>w.citations).sort((a,b)=>b-a);
  const hIndex = citationCounts.filter((n,i)=>n >= i+1).length;
  const i10Index = citationCounts.filter(n=>n >= 10).length;
  if (hIndex !== summary.hIndex || i10Index !== summary.i10Index) fail('publication counts disagree with profile indices');
  if (!Array.isArray(data.annualCitations) || !data.annualCitations.length || data.annualCitations.some(r=>!Number.isInteger(r.year)||r.year<1900||!Number.isInteger(r.citations)||r.citations<0)) fail('annual citations unavailable');
  if (new Set(data.annualCitations.map(r=>r.year)).size !== data.annualCitations.length) fail('duplicate citation years');
  return data;
}
