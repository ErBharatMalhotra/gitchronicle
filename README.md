# Project PRD: GitChronicle 📊
> **The Real-Time Developer Intelligence & Benchmark Dashboard**
> *Zero Setup · Rate-Limit Immune · Actionable Developer DNA*

---

## 1. Executive Summary & Value Proposition
Existing GitHub analytics either cater to macro open-source ecosystems (`OSSInsight`), or are static markdown badges (`github-readme-stats`). 

**GitChronicle** is a modern, web-first developer observatory. Any developer enters their GitHub username (or connects via OAuth) and instantly receives:
1. **Global Percentile Benchmarks** (e.g., *Top 4% active TypeScript committers globally*).
2. **Developer DNA & Work Cadence** (Night owl vs. early bird, churn velocity, PR turnaround speed).
3. **Repository Health Index** (Automated hygiene scores: test coverage badges, stale issues, release frequency, license audit).
4. **Interactive Shareable Dossier** (Clean, ad-free, watermark-free web portfolio link: `gitchronicle.dev/username`).

---

## 2. Market Gap & Competitor Differentiation

| Competitor | Their Flaw | GitChronicle Edge |
|---|---|---|
| **github-readme-stats** (80k ⭐) | Unmaintained, frequent Vercel rate-limit crashes, only renders static SVGs for README. | Web-first interactive dashboard with deep insights, caching layer, and drill-down analytics. |
| **OSSInsight** (2.5k ⭐) | Focuses on global repo trends / macro metrics. Not tailored for individual dev careers. | Hyper-personalized dev scorecard, percentile rankings, and portfolio generator. |
| **lowlighter/metrics** (17k ⭐) | Requires complex GitHub Actions YAML configuration. Non-interactive. | Zero setup: Enter username or 1-click OAuth. Zero YAML required. |
| **GitWrapped** | Only active 2 weeks in December. | 365-day live continuous developer growth tracking. |

---

## 3. Core Features & Functional Specs

### Phase 1: MVP (Days 1 - 7)
- **Instant Profile Ingestion:**
  - Public GitHub REST + GraphQL API querying for user details, public repos, language distribution, and commit calendar.
- **The Developer DNA Matrix:**
  - *Productivity Rhythm:* Day-of-week & hour-of-day heatmap (Early Bird / Midday Sprinter / Midnight Hacker).
  - *Language Mastery:* Dynamic wheel / radar chart showing language split by bytes and recent activity.
  - *Impact Metrics:* PR acceptance rate, Issue resolution time, Review turnaround speed.
- **Global Percentile Benchmarking:**
  - Benchmark user activity against statistical distributions (Commits, Stars, Consistency).
- **Public Shareable Link:**
  - Clean URL (`/u/[username]`) with dynamic OpenGraph (OG) image previews for seamless Twitter/LinkedIn unfurling.

### Phase 2: Deep Repo Health Audit (Days 8 - 14)
- **Repo Health Scorecard (0 - 100):**
  - Scored based on: Activity in last 90 days, presence of LICENSE, README quality, CI action status, open vs. closed issue velocity.
- **Comparison Engine ("Dev vs Dev"):**
  - Side-by-side battle / compare view between two developers with a comparative radar chart.

---

## 4. GitHub API Limit Survival Architecture (Crucial!)

### The Challenge:
- Unauthenticated limit: **60 requests/hr** per IP.
- Authenticated PAT limit: **5,000 requests/hr**.
- Search API limit: **30 requests/min**.

### GitChronicle's 3-Layer Caching Strategy:
1. **Smart GraphQL Single-Query Fetching:**
   - Instead of making 10-15 REST calls per user, a single GraphQL query fetches user details, pinned repos, commit calendar, and top language distributions in **1 point cost**.
2. **Edge Cache (Redis / Cloudflare KV / Next.js ISR):**
   - Profile data cached with `stale-while-revalidate` (TTL: 6 hours for general profiles, 15 minutes for logged-in users).
   - If 100 people visit `/u/ErBharatMalhotra`, only **1 API call** hits GitHub; the remaining 99 are served from edge cache.
3. **Optional User OAuth / PAT (Token Pooling):**
   - Allow users to "Sign In with GitHub" for extended rate limits and private repo insights.

---

## 5. Technology Stack
- **Framework:** Next.js 15 (App Router) + TypeScript
- **Styling & UI:** Tailwind CSS v4, Lucide React, Shadcn UI
- **Visualizations:** Tremor / Recharts / Canvas Confetti / Framer Motion
- **Caching & Storage:** Upstash Redis (Serverless KV)
- **Deployment:** Vercel / Cloudflare Pages

---

## 6. Viral Launch Strategy
1. **Day 1 (Reddit):** Launch on `r/webdev`, `r/SideProject`, and `r/reactjs` with title:
   > *"I built an open-source, rate-limit-proof developer analytics dashboard to benchmark your GitHub activity."*
2. **Day 2 (HackerNews):** "Show HN: GitChronicle – Real-time GitHub developer intelligence and percentile ranking".
3. **Day 3 (X / Twitter):** Tag tech influencers with their auto-generated percentile cards.
4. **README Badge:** Offer a free live SVG badge: `[![GitChronicle](https://gitchronicle.dev/badge/username.svg)](https://gitchronicle.dev/u/username)` which drives backlink traffic from thousands of user profile READMEs.
