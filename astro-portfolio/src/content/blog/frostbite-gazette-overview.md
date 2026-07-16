---
title: "Frostbite Gazette: AI-Curated Canadian Journalism"
description: "Building an automated news platform that filters 40+ RSS feeds through Groq AI for relevance, accountability, and Canadian focus on journalism."
date: 2026-03-01
tags: ["Astro", "Cloudflare", "AI"]
featured: true
readTime: 7
---

## The Problem

Canadian journalism is fragmented. National stories get covered by dozens of outlets, each with different angles, different biases, and different paywalls. Local stories often get missed entirely.

As someone who cares about staying informed — and as someone who builds things with AI — I wondered: could I build an automated system that aggregates, filters, and curates Canadian news using AI?

That's Frostbite Gazette.

## The Architecture

```
[40+ RSS Feeds] → [Cloudflare Workers] → [Groq AI Filter] → [Astro SSG] → [Cloudflare Pages]
```

The system runs on two free tiers:

- **Cloudflare Workers** (free: 100k requests/day) — fetches feeds, runs AI filtering
- **Cloudflare Pages** (free: unlimited static sites) — hosts the generated site
- **Groq** (free tier) — fast LLM inference for content analysis

### Data Flow

1. **Scheduled Worker** runs every hour via Cron Triggers
2. Fetches RSS/Atom feeds from 40+ Canadian news sources
3. Sends each article through Groq for classification and scoring
4. Filters for relevance, Canadian focus, and quality signals
5. Writes curated results to KV storage
6. Triggers Astro rebuild via Pages CI
7. Static site regenerates with new content

## The AI Pipeline

This is where the interesting work happens. Raw RSS feeds are noisy — lots of duplicates, opinion pieces masquerading as news, and low-quality content.

### Classification

Each article gets classified on three dimensions:

```typescript
interface ArticleClassification {
  relevance: number;    // 0-1: How relevant to Canadian readers
  accountability: number; // 0-1: Does it hold power to account?
  quality: number;      // 0-1: Factual, well-sourced reporting
  topics: string[];     // ["politics", "climate", "economy"]
  region: string;       // "national", "prairies", "bc", etc.
}
```

### The Prompt

The classification prompt is carefully structured:

```
You are a Canadian journalism curator. Analyze this news article:

Title: {title}
Source: {source}
Excerpt: {excerpt}

Score on these criteria (0.0-1.0):
1. RELEVANCE: How relevant to Canadian readers?
2. ACCOUNTABILITY: Does it hold power to account? Factual reporting over opinion.
3. QUALITY: Well-sourced, factual, balanced reporting?

Also identify:
- Primary topic (politics, economy, climate, health, tech, indigenous, justice, other)
- Geographic focus (national, bc, alberta, prairies, ontario, quebec, atlantic, north)

Respond in JSON only.
```

### Filtering Rules

Articles must meet minimum thresholds:

- **Relevance >= 0.7** — Must be relevant to Canadian readers
- **Accountability >= 0.5** — Prefer factual reporting over opinion
- **Quality >= 0.6** — Must be well-sourced and balanced

Articles that don't pass get filtered out. This typically reduces 200+ raw articles to 30-50 curated pieces per cycle.

## The Frontend

Frostbite Gazette is built with Astro for maximum performance:

- **Static generation** — Pages are pre-built, no server rendering
- **Zero JavaScript by default** — Astro's islands architecture means only interactive components ship JS
- **Fast — **Lighthouse 100/100 on performance

### Key Features

- **Topic filtering** — Browse by politics, climate, economy, etc.
- **Regional sections** — National, provincial, and territorial coverage
- **Source diversity** — Track which outlets contribute to each story
- **Minimal design** — Text-first, fast-loading, accessible

## Cloudflare Workers Implementation

The feed aggregator runs as a scheduled Worker:

```typescript
// Simplified version of the feed aggregator
export default {
  async scheduled(event: ScheduledEvent, env: Env) {
    const feeds = await loadFeedList(env.KV);
    const articles: Article[] = [];

    // Fetch all feeds in parallel
    const feedResults = await Promise.allSettled(
      feeds.map(url => fetchFeed(url))
    );

    // Collect successful results
    for (const result of feedResults) {
      if (result.status === 'fulfilled') {
        articles.push(...result.value);
      }
    }

    // Deduplicate by title similarity
    const unique = deduplicateArticles(articles);

    // Classify with Groq (batched for speed)
    const classified = await classifyBatch(unique, env.GROQ_API_KEY);

    // Filter and rank
    const curated = classified
      .filter(a => a.relevance >= 0.7 && a.quality >= 0.6)
      .sort((a, b) => (b.relevance + b.accountability) - (a.relevance + a.accountability))
      .slice(0, 50);

    // Store in KV for the Astro build to consume
    await env.KV.put('curated-articles', JSON.stringify(curated));
  }
};
```

### Why Groq

Speed matters when you're processing 200+ articles per cycle. Groq's LPU architecture gives me:

- **~500 tokens/sec** on Llama 3 8B
- **Classification in ~100ms per article**
- **Total pipeline in under 30 seconds**

For comparison, the same workload on a standard API would take 3-5 minutes. When you're running hourly, that difference adds up.

## Challenges and Learnings

### RSS Feeds Are Messy

No two RSS feeds are alike. Some use Atom, some use RSS 2.0. Some have full content, some have excerpts. Some are broken XML. Building a robust feed parser was half the work.

### AI Classification Isn't Perfect

The AI sometimes misclassifies satire as news, or misses regional relevance. I handle this with:

- **Manual overrides** — I can flag articles the AI got wrong
- **Confidence thresholds** — Low-confidence classifications get human review
- **Source reputation** — Outlets with consistent misclassification get adjusted weights

### Free Tier Limits

Cloudflare Workers free tier has limits:

- 100k requests/day (plenty for hourly feeds)
- 10ms CPU time per invocation (tight for AI calls, mitigated by batching)
- KV writes limited to 1k/day (only write the final curated set)

I haven't hit any of these limits yet.

## Results After One Month

- **~1,200 articles processed** from 40+ sources
- **~150 curated stories** published
- **~35 articles per day** pass quality filters
- **Average page load: < 1 second**
- **Cost: $0** (entirely on free tiers)

## What's Next

1. **Newsletter integration** — Daily digest email via Cloudflare Email Workers
2. **Source transparency scoring** — Rate outlets on bias, correction frequency, and sourcing
3. **Indigenous news coverage** — Dedicated section with AI-assisted cultural sensitivity checks
4. **Community submissions** — Let readers flag stories and suggest sources

Frostbite Gazette is proof that you can build a meaningful, AI-powered product on free infrastructure. The tools are there. The APIs are there. The only thing between you and a shipped product is the decision to start building.
