import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { resolve } from 'node:path';

// Run against `next dev` or a production server: node scripts/verify-seo.mjs [origin]
const origin = process.argv[2] || 'http://localhost:3000';
const site = 'https://mac-hadis.com';
const categories = readdirSync('src/content/categories')
  .filter(name => /^category\d+\.json$/.test(name))
  .map(name => JSON.parse(readFileSync(`src/content/categories/${name}`, 'utf8')));
const productImports = readFileSync('src/content/product_details/products.ts', 'utf8');
const products = [...productImports.matchAll(/from ['"](.+?\.json)['"]/g)]
  .map(([, path]) => JSON.parse(readFileSync(resolve('src/content/product_details', path), 'utf8')));
const productPaths = products.map(product => {
  const category = categories.find(item => item.title.replace(/\n/g, '').trim() === product.category);
  assert.ok(category, `Missing category for ${product.title}`);
  return `/products/${category.id}/${encodeURIComponent(product.title)}`;
});
const paths = [...productPaths, ...categories.map(c => `/products/${c.id}`), '/satei', '/factory-service'];
const unescape = text => text.replaceAll('&amp;', '&').replaceAll('&quot;', '"').replaceAll('&#x27;', "'");

async function checkPage(path) {
  const response = await fetch(origin + path);
  assert.equal(response.status, 200, path);
  const html = await response.text();
  const canonical = html.match(/<link rel="canonical" href="([^"]+)"/);
  assert.equal(unescape(canonical?.[1] || ''), site + path, `Canonical: ${path}`);
  const ogUrl = html.match(/<meta property="og:url" content="([^"]+)"/);
  assert.equal(unescape(ogUrl?.[1] || ''), site + path, `Open Graph: ${path}`);
  const title = html.match(/<title>(.*?)<\/title>/s)?.[1] || '';
  assert.equal((title.match(/ハディズ/g) || []).length, 1, `Brand duplication: ${path}`);
  assert.ok(!title.includes('\n'), `Metadata newline: ${path}`);
  const schemas = [...html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/gs)]
    .map(([, value]) => JSON.parse(value));
  const service = schemas.find(schema => schema['@type'] === 'Service');
  assert.equal(service?.url, site + path, `Service URL: ${path}`);
  assert.equal(service?.provider?.['@id'], `${site}/#organization`);
  const serialized = JSON.stringify(schemas);
  for (const type of ['Product', 'Offer', 'AggregateRating']) {
    assert.ok(!serialized.includes(`"@type":"${type}"`), `Unexpected ${type}: ${path}`);
  }
  assert.ok(!serialized.includes('"manufacturer"'), `Manufacturer: ${path}`);
  assert.ok(!serialized.includes('https://www.mac-hadis.com'), `Hostname: ${path}`);
  if (path.startsWith('/products/')) {
    assert.equal((html.match(/<h1\b/g) || []).length, 1, `H1 count: ${path}`);
    const breadcrumbs = schemas.find(schema => schema['@type'] === 'BreadcrumbList');
    assert.equal(breadcrumbs?.itemListElement.at(-1).item, site + path, `Breadcrumb: ${path}`);
  }
}

// Keep the local development server's compilation load bounded.
for (let i = 0; i < paths.length; i += 4) {
  await Promise.all(paths.slice(i, i + 4).map(checkPage));
}
const sitemapResponse = await fetch(`${origin}/sitemap.xml`);
assert.equal(sitemapResponse.status, 200);
const sitemap = await sitemapResponse.text();
const locations = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map(([, loc]) => unescape(loc));
assert.equal(new Set(locations).size, locations.length, 'Duplicate sitemap URLs');
for (const path of paths) assert.ok(locations.includes(site + path), `Sitemap missing ${path}`);

// A missing record must not emit indexable service metadata.
const missing = await fetch(`${origin}/products/${categories[0].id}/missing-equipment-seo-check`);
const missingHtml = await missing.text();
assert.ok(missing.status === 404 || /name="robots" content="[^"]*noindex/.test(missingHtml));
assert.ok(!missingHtml.includes('"@type":"Service"'));
console.log(`PASS: ${products.length} equipment pages, ${categories.length} categories, 2 service pages; canonical/OG/schema/breadcrumb agreement, single H1, titles, sitemap coverage and missing-record handling.`);
