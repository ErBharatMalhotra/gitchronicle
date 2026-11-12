# SPEC-DRIVEN EXECUTION PLAN: GitChronicle 📊
> **Target Subdomain:** `https://gitchronicle.bharatdn.com`  
> **Methodology:** Spec-Driven Development + Micro-Milestones  
> **Status:** Execution Ready  
> **License:** MIT (100% Free & Open Source)

---

## 🎯 1. Product Vision & Architecture Brief

**GitChronicle** is a live developer intelligence observatory and percentile benchmark platform. Unlike static SVG counters or macro big-data tools, GitChronicle tells the real story of how a developer codes, their productivity rhythms, and their global ranking without requiring any YAML workflows.

### Subdomain Strategy:
- **Primary:** `https://gitchronicle.bharatdn.com`
- Direct trust factor under `bharatdn.com`, giving your personal domain enterprise-grade developer tooling credibility.

---

## 📅 2. Sprint Agenda & Execution Timeline (14-Day Sprint)

```
┌────────────────────────────────────────────────────────────────────────┐
│ Phase 1: Ingestion & GraphQL Optimization (Days 1 - 4)                 │
│ ├─ Single-point GraphQL Schema for Full Profile + Commits              │
│ ├─ Redis / In-Memory Edge Cache Layer (6-hour stale-while-revalidate) │
│ └─ GitHub Public REST Fallbacks & Token Pool Support                   │
├────────────────────────────────────────────────────────────────────────┤
│ Phase 2: Analytics Engine & Percentile Algorithms (Days 5 - 8)         │
│ ├─ Developer Rhythm Matrix (Day/Hour activity distribution heatmap)    │
│ ├─ Global Percentile Curve Engine (Commit, Star, Velocity ranking)     │
│ ├─ Repo Health Auditor (License, README, CI status, Stale PR index)    │
│ └─ Dev vs Dev Comparison Matrix                                        │
├────────────────────────────────────────────────────────────────────────┤
│ Phase 3: Dashboard UI & Visualizations (Days 9 - 11)                   │
│ ├─ Dark-mode Developer Dossier layout (Tremor / Recharts)              │
│ ├─ Responsive Mobile Experience                                        │
│ └─ Dynamic Embeddable SVG Badges (`/badge/[user].svg`)                 │
├────────────────────────────────────────────────────────────────────────┤
│ Phase 4: Launch & Backlink Loop (Days 12 - 14)                         │
│ ├─ Edge OG Image Engine for Social Cards                               │
│ ├─ Deploy to `gitchronicle.bharatdn.com`                               │
│ └─ HackerNews "Show HN", Reddit, and Twitter Launch Campaign           │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 🧩 3. Key Technical Specifications (Spec-Kit)

### 1. Unified GraphQL Query (Rate-Limit Cost: 1 Point)
```graphql
query GetUserDeveloperDossier($login: String!) {
  user(login: $login) {
    name
    login
    avatarUrl
    bio
    createdAt
    followers { totalCount }
    repositories(first: 50, orderBy: {field: STARGAZERS, direction: DESC}, isFork: false) {
      nodes {
        name
        stargazerCount
        forkCount
        primaryLanguage { name color }
        hasIssuesEnabled
        licenseInfo { spdxId }
        defaultBranchRef {
          target {
            ... on Commit {
              history(first: 10) { totalCount }
            }
          }
        }
      }
    }
    contributionsCollection {
      contributionCalendar {
        totalContributions
        weeks {
          contributionDays {
            date
            contributionCount
            weekday
          }
        }
      }
    }
  }
}
```

### 2. Global Percentile Algorithm (Statistical Distribution)
Based on public GitHub distribution benchmarks:
- **Top 1%:** > 2,000 yearly contributions or > 1,000 stars
- **Top 5%:** > 800 yearly contributions or > 250 stars
- **Top 15%:** > 350 yearly contributions or > 50 stars
- **Top 35%:** > 150 yearly contributions
- **Top 50%:** > 50 yearly contributions

---

## 📋 4. Action Items Checklist for Bharat

- [ ] **Day 1:** Run `npx create-next-app@latest gitchronicle --typescript --tailwind --app` in `D:\new idea\GitChronicle`
- [ ] **Day 2:** Integrate the GraphQL unified query in `/lib/github.ts`.
- [ ] **Day 3:** Build the Percentile Calculation engine & Unit tests.
- [ ] **Day 4:** Build the Developer Cadence Heatmap component.
- [ ] **Day 5:** Build the dynamic SVG badge endpoint for READMEs.
- [ ] **Day 6:** Setup DNS on Cloudflare: `gitchronicle.bharatdn.com` $\rightarrow$ Vercel.
- [ ] **Day 7:** Launch and distribute on dev forums!
