# SEO Implementation Plan

## Overview
Comprehensive SEO improvements for reverb256.ca portfolio site.

**Audit Date:** 2026-03-10
**Priority Order:** Technical → On-Page → Content → Authority

---

## Phase 1: Critical Technical SEO (Week 1)

### 1.1 Install & Configure Sitemap Plugin

**Priority:** CRITICAL
**Impact:** High — Enables Google to discover all pages
**Effort:** 5 minutes

```bash
npx astro add sitemap
```

Then update `astro.config.mjs`:

```javascript
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://reverb256.ca',
  integrations: [sitemap()],
});
```

**Verification:**
- Build the site: `npm run build`
- Check `dist/sitemap-index.xml` exists
- Visit https://reverb256.ca/sitemap-index.xml after deploy

---

### 1.2 Add Open Graph & Twitter Card Tags

**Priority:** CRITICAL
**Impact:** High — Social media previews on Twitter, Discord, Slack
**Effort:** 15 minutes

**Create `src/components/SEO.astro`:**

```astro
---
---
<!-- Add to <head> -->
<meta property="og:type" content="website" />
<meta property="og:site_name" content="Reverb256" />
<meta property="og:title" content={title} />
<meta property="og:description" content={description} />
<meta property="og:image" content="https://reverb256.ca/og-image.jpg" />
<meta property="og:url" content={canonicalURL} />
<meta property="og:locale" content="en_CA" />

<!-- Twitter Card (large image summary) -->
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content={title} />
<meta name="twitter:description" content={description} />
<meta name="twitter:image" content="https://reverb256.ca/og-image.jpg" />
```

**Update `Layout.astro` frontmatter to accept SEO props:**

```astro
---
interface Props {
  title: string;
  description?: string;
  image?: string;
  canonical?: string;
}

const {
  title,
  description = "Developer portfolio | Reverb256 - Building with Rust, TypeScript, and NixOS",
  image = "/og-image.jpg",
  canonical = new URL(Astro.url.pathname, Astro.site).href
} = Astro.props;

const fullTitle = `${title} | Reverb256`;
---
```

---

### 1.3 Create Open Graph Image (1200×630px)

**Priority:** HIGH
**Impact:** Medium — Visual appeal in social shares
**Effort:** 30 minutes

**Requirements:**
- Dimensions: 1200×630px (1.91:1 aspect ratio)
- Format: JPG or PNG
- File size: < 8MB (ideally < 200KB for performance)
- Content: Name, tagline, minimal design

**Design Suggestion:**
```bash
# Using ImageMagick or design tool
# Background: Base16 theme gradient
# Text: "Reverb256" (large), "Developer Portfolio" (small)
# Accent: Terminal-style prompt or code snippet
```

**Save as:** `public/og-image.jpg` and `public/og-image.png`

**After creation, test at:**
- https://cards-dev.twitter.com/validator
- https://www.linkedin.com/post-inspector/

---

### 1.4 Add Canonical Tags

**Priority:** HIGH
**Impact:** Medium — Prevents duplicate content issues
**Effort:** 10 minutes

**Already computed in Layout.astro frontmatter:**
```astro
const canonical = new URL(Astro.url.pathname, Astro.site).href;
```

**Add to `<head>`:**
```astro
<link rel="canonical" href={canonical} />
```

---

## Phase 2: Structured Data (Schema Markup)

### 2.1 Add Person Schema (JSON-LD)

**Priority:** MEDIUM
**Impact:** Medium — Rich results in Google Knowledge Panel
**Effort:** 15 minutes

**Add to `Layout.astro` before `</head>`:**

```astro
<script type="application/ld+json" set:html={JSON.stringify({
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Reverb256",
  "url": "https://reverb256.ca",
  "sameAs": [
    "https://github.com/reverb256",
    "https://twitter.com/reverb256" // if exists
  ],
  "jobTitle": "Software Developer",
  "knowsAbout": [
    "Rust Programming",
    "TypeScript",
    "NixOS",
    "Kubernetes",
    "AI/ML",
    "Web Development"
  ],
  "worksFor": {
    "@type": "Organization",
    "name": "Independent"
  }
})}></script>
```

### 2.2 Add WebSite Schema

**Add alongside Person schema:**

```astro
<script type="application/ld+json" set:html={JSON.stringify({
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Reverb256",
  "url": "https://reverb256.ca/",
  "description": "Personal portfolio and development blog",
  "potentialAction": {
    "@type": "SearchAction",
    "target": {
      "@type": "EntryPoint",
      "urlTemplate": "https://reverb256.ca/search?q={search_term_string}"
    },
    "query-input": "required name=search_term_string"
  }
})}></script>
```

---

## Phase 3: On-Page Optimization

### 3.1 Unique Meta Descriptions Per Page

**Priority:** HIGH
**Impact:** High — CTR from search results
**Effort:** 20 minutes

**Update each page's frontmatter:**

| Page | Description (155-160 chars) |
|------|------------------------------|
| **Home** | "Software developer portfolio showcasing projects in Rust, TypeScript, and NixOS. Building privacy-first AI tools, contributing to open source, and learning in public." |
| **Blog** | "Technical writing about development, infrastructure, and AI. Topics include NixOS cluster management, Rust patterns, Kubernetes, and building local-first applications." |
| **Now** | "Current status and focus areas. What I'm building, learning, and exploring right now. Updated March 2026. Open to remote opportunities." |
| **Setup** | "Tour of my development environment: 4-host NixOS cluster, GPU workstations, local AI stack, and the tools I use daily for software development." |
| **Bookmarks** | "Curated collection of development resources, tools, and learning materials. Essential links for Rust, NixOS, Kubernetes, and AI development." |

**Implementation in each page:**
```astro
---
const metaDescription = "Your unique description here (155-160 chars)";
---
<Layout title="Page Name" description={metaDescription}>
```

### 3.2 Optimize Title Tags

**Priority:** MEDIUM
**Impact:** Medium — CTR and ranking
**Effort:** 10 minutes

**Current → Recommended:**

| Page | Current | Recommended (50-60 chars) |
|------|---------|---------------------------|
| Home | `Home | Reverb256` | `Home | Reverb256` (OK, or `Reverb256 | Developer Portfolio`) |
| Blog | `Blog | Reverb256` | `Blog | Reverb256` (OK) |
| Now | `Now | Reverb256` | `Now | Reverb256` (OK — /now page convention) |
| Setup | `Setup | Reverb256` | `Desk Tour & Setup | Reverb256` |
| Bookmarks | `Bookmarks | Reverb256` | `Developer Resources | Reverb256` |

---

### 3.3 Add robots.txt

**Priority:** LOW
**Impact:** Low — Best practice
**Effort:** 5 minutes

**Create `public/robots.txt`:**

```txt
User-agent: *
Allow: /

# Sitemap
Sitemap: https://reverb256.ca/sitemap-index.xml

# Disallow if any (currently none)
# Disallow: /private/
```

---

## Phase 4: Performance & Core Web Vitals

### 4.1 Font Optimization (Prevent CLS)

**Priority:** MEDIUM
**Impact:** High — CLS < 0.1 requirement
**Effort:** 10 minutes

**In `Layout.astro` `<head>`, add preload:**

```astro
<link
  rel="preload"
  href="/fonts/JetBrainsMono.woff2"
  as="font"
  type="font/woff2"
  crossorigin
/>
```

**In CSS, ensure `font-display: swap`:**

```css
@font-face {
  font-family: 'JetBrains Mono';
  src: url('/fonts/JetBrainsMono.woff2') format('woff2');
  font-display: swap; /* Critical for CLS */
  font-weight: 400 700;
}
```

---

### 4.2 Image Optimization

**Priority:** MEDIUM
**Impact:** Medium — LCP < 2.5s
**Effort:** Varies

**Actions:**
1. Convert all images to WebP format
2. Add `width` and `height` attributes to prevent CLS
3. Lazy-load below-fold images

```astro
<img
  src="/projects/frostbite-gazette.webp"
  alt="Frostbite Gazette project screenshot"
  width="800"
  height="450"
  loading="lazy"
  decoding="async"
/>
```

---

## Phase 5: Post-Deployment

### 5.1 Submit Sitemap to Google Search Console

1. Go to https://search.google.com/search-console
2. Add property: `https://reverb256.ca`
3. Verify ownership (HTML file or DNS)
4. Go to **Sitemaps** section
5. Submit: `sitemap-index.xml`

### 5.2 Submit to Bing Webmaster Tools

1. Go to https://www.bing.com/webmasters
2. Add site and verify
3. Submit sitemap

### 5.3 Monitor Core Web Vitals

1. In Search Console, check **Core Web Vitals** report
2. Address any failing URLs
3. Use PageSpeed Insights for specific issues: https://pagespeed.web.dev

---

## Implementation Checklist

- [x] Install @astrojs/sitemap
- [x] Add `site: 'https://reverb256.ca'` to astro.config.mjs
- [x] Update Layout.astro with SEO props
- [x] Create OG image (1200×630px) — **SVG + PNG generated**
- [x] Add canonical tag to Layout.astro
- [x] Add Person schema to Layout.astro
- [x] Add WebSite schema to Layout.astro
- [x] Update all page meta descriptions
- [x] Create robots.txt (already existed)
- [x] Add font preloads — **Inter + Fira Code preloaded**
- [ ] Convert images to WebP — **Low priority (no static images to optimize)**
- [ ] Deploy changes — **Ready to deploy**
- [ ] Submit sitemap to Google Search Console — **Post-deploy**
- [ ] Submit sitemap to Bing Webmaster Tools — **Post-deploy**
- [ ] Test OG image on Twitter Card Validator — **Post-deploy**
- [ ] Run PageSpeed Insights audit — **Post-deploy**

---

## Expected Outcomes

| Metric | Before | After |
|--------|--------|-------|
| Indexed Pages | Unknown | ✅ All 9 pages in sitemap |
| Social Share Preview | None | ✅ OG tags + PNG image (93KB) |
| CLS (Cumulative Layout Shift) | > 0.1 risk | ✅ Font preloads + display:swap |
| Meta Description Uniqueness | 20% | ✅ 100% unique |
| Search Console Coverage | Not monitored | ⏳ Submit after deploy |
| Schema Markup | None | ✅ Person + WebSite |

---

## Priority Order Summary

1. **Week 1:** ✅ Sitemap + ✅ Open Graph + ✅ Canonical + ✅ OG image
2. **Week 2:** ✅ Schema markup + ✅ Meta descriptions
3. **Week 3:** ✅ Performance optimization (fonts, images)
4. **Week 4:** ⏳ Deploy, submit to search consoles, monitor

---

## Deployment Checklist

### Pre-Deploy Verification ✅

- [x] Build succeeds locally (`npm run build`)
- [x] Sitemap generated at `dist/sitemap-index.xml`
- [x] All 9 pages built successfully
- [x] OG image (PNG) included in dist/
- [x] OG tags present in HTML
- [x] Canonical tags present
- [x] Schema markup (JSON-LD) present
- [x] Font preloads configured

### Deploy Steps

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "feat: comprehensive SEO implementation"
   git push origin main
   ```

2. **Wait for GitHub Pages deployment**
   - Visit https://github.com/reverb256/astro-portfolio/actions
   - Verify workflow completes successfully

3. **Verify live site**
   - Visit https://reverb256.ca
   - Check all pages load correctly
   - View page source and verify meta tags

### Post-Deploy Actions

#### 1. Test Open Graph Image
- **Twitter Card Validator:** https://cards-dev.twitter.com/validator
  - Enter: https://reverb256.ca
  - Verify large image card displays correctly

- **LinkedIn Post Inspector:** https://www.linkedin.com/post-inspector/
  - Enter: https://reverb256.ca
  - Verify preview displays

- **Facebook Sharing Debugger:** https://developers.facebook.com/tools/debug/
  - Enter: https://reverb256.ca
  - Verify preview displays

#### 2. Submit Sitemap to Search Engines

**Google Search Console:**
1. Go to https://search.google.com/search-console
2. Add property: `https://reverb256.ca`
3. Verify ownership (HTML file upload recommended)
4. Go to **Sitemaps** section
5. Submit: `sitemap-index.xml`
6. Monitor **Coverage** report for indexing status

**Bing Webmaster Tools:**
1. Go to https://www.bing.com/webmasters
2. Add site and verify
3. Go to **Sitemaps** section
4. Submit: `https://reverb256.ca/sitemap-index.xml`

#### 3. Run Performance Audit

**PageSpeed Insights:**
1. Go to https://pagespeed.web.dev
2. Enter: https://reverb256.ca
3. Check both Mobile and Desktop scores
4. Target: LCP < 2.5s, INP < 200ms, CLS < 0.1

**Lighthouse (Chrome DevTools):**
1. Open Chrome DevTools (F12)
2. Go to Lighthouse tab
3. Run audit with "SEO" category
4. Target: 90+ SEO score

---

## Files Created/Modified

### Created
- `public/og-image.svg` — Vector OG image source
- `public/og-image.png` — Raster OG image for social platforms (93KB)
- `scripts/convert-og-image.cjs` — Image conversion utility

### Modified
- `astro.config.mjs` — Added sitemap integration
- `src/layouts/Layout.astro` — Comprehensive SEO meta tags + schema
- `src/pages/index.astro` — Unique meta description
- `src/pages/blog/index.astro` — Unique meta description
- `src/pages/now/index.astro` — Unique meta description
- `src/pages/setup/index.astro` — Unique meta description
- `src/pages/bookmarks/index.astro` — Unique meta description
- `src/pages/blog/[slug].astro` — Dynamic meta descriptions per post

---

## SEO Summary

### What's Implemented

| SEO Element | Status | Details |
|-------------|--------|---------|
| **XML Sitemap** | ✅ | Auto-generated via @astrojs/sitemap |
| **Robots.txt** | ✅ | Allows all, references sitemap |
| **Canonical Tags** | ✅ | Self-referencing on all pages |
| **Meta Descriptions** | ✅ | Unique 155-char for all pages |
| **Title Tags** | ✅ | Optimized format with branding |
| **Open Graph** | ✅ | All 6 tags + locale (en_CA) |
| **Twitter Cards** | ✅ | Large image card type |
| **Person Schema** | ✅ | JSON-LD with knowAbout array |
| **WebSite Schema** | ✅ | JSON-LD with searchAction |
| **Font Optimization** | ✅ | Preload critical fonts + display:swap |
| **OG Image** | ✅ | 1200×630px PNG, 93KB |

### Social Share Preview

When someone shares https://reverb256.ca on:
- **Twitter/X:** Large card with image, title, description
- **LinkedIn:** Professional preview with all metadata
- **Facebook:** Full preview with OG image
- **Discord/Slack:** Rich unfurl with image preview
