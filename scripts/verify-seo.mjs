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

// A missing record must return a real 404 (not a soft 404) without service metadata.
for (const path of [`/products/${categories[0].id}/missing-equipment-seo-check`, '/products/missing-category-seo-check']) {
  const missing = await fetch(origin + path);
  const missingHtml = await missing.text();
  assert.equal(missing.status, 404, path);
  assert.ok(!missingHtml.includes('"@type":"Service"'), path);
}

// Blog posts resolve, renamed posts 308 to their current URL, and unknown slugs 404.
const blogs = readdirSync('src/content/blogs')
  .filter(name => /^blog\d+\.json$/.test(name))
  .map(name => JSON.parse(readFileSync(`src/content/blogs/${name}`, 'utf8')));
const blogPath = title => `/blogs/${encodeURIComponent(title)}`;
for (let i = 0; i < blogs.length; i += 4) {
  await Promise.all(blogs.slice(i, i + 4).map(async blog => {
    const response = await fetch(origin + blogPath(blog.title), { redirect: 'manual' });
    assert.equal(response.status, 200, blogPath(blog.title));
    for (const oldTitle of blog.oldTitles || []) {
      const renamed = await fetch(origin + blogPath(oldTitle), { redirect: 'manual' });
      assert.equal(renamed.status, 308, blogPath(oldTitle));
      assert.equal(new URL(renamed.headers.get('location'), origin).pathname, blogPath(blog.title), blogPath(oldTitle));
    }
  }));
}
const missingBlog = await fetch(`${origin}/blogs/missing-blog-seo-check`, { redirect: 'manual' });
assert.equal(missingBlog.status, 404, '/blogs/missing-blog-seo-check');
console.log(`PASS: ${products.length} equipment pages, ${categories.length} categories, 2 service pages, ${blogs.length} blog posts; canonical/OG/schema/breadcrumb agreement, single H1, titles, sitemap coverage, blog redirects and missing-record handling.`);
