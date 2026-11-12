<div align="center">

# GitChronicle 📊
### Real-Time Developer Intelligence & Percentile Benchmark Observatory

[![Website](https://img.shields.io/badge/Live_Observatory-gitchronicle.bharatdn.com-58a6ff?style=for-the-badge&logo=vercel)](https://gitchronicle.bharatdn.com)
[![License: MIT](https://img.shields.io/badge/License-MIT-3fb950?style=for-the-badge)](LICENSE)
[![Next.js 15](https://img.shields.io/badge/Next.js-15_(App_Router)-white?style=for-the-badge&logo=nextdotjs)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178c6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org)
[![Tailwind CSS v4](https://img.shields.io/badge/Tailwind_CSS-v4-38bdf8?style=for-the-badge&logo=tailwindcss)](https://tailwindcss.com)

<p align="center">
  <b>Instant Profile Ingestion · Single-Point GraphQL Query · 6hr Edge Cache · Rate-Limit Immune</b>
</p>

[**Explore Live Dashboard**](https://gitchronicle.bharatdn.com) · [**Dev vs Dev Matrix**](https://gitchronicle.bharatdn.com/compare) · [**Get Profile Badge**](https://gitchronicle.bharatdn.com/u/ErBharatMalhotra)

---

</div>

## 💡 Overview

**GitChronicle** is a high-performance developer intelligence and percentile benchmark dashboard. Enter any GitHub username to instantly discover:

- 🏆 **Global Percentile Benchmarks:** Exact global ranking across active developers globally (Top 1%, Top 5%, Top 15%, Top 35%, Top 50%).
- ⚡ **Cadence Rhythm Matrix:** 7-day × 24-hour activity distribution heatmap revealing your developer archetype (*Early Bird*, *Midday Sprinter*, *Midnight Hacker*, *All-Day Architect*).
- 🛡️ **Repository Health Index:** Automated hygiene audits (0–100) scoring license validity, commit freshness, issue resolution speed, and documentation quality.
- 🎯 **Language Mastery:** Multi-dimensional radar charts and exact byte distributions across your public work.
- ⚔️ **Dev vs Dev Comparison:** Side-by-side battle matrix comparing two developer profiles across 6 key engineering dimensions.

---

## ⚡ Architectural Highlights

```
┌────────────────────────────────────────────────────────────────────────┐
│                        GitChronicle Architecture                       │
├────────────────────────────────────────────────────────────────────────┤
│  Client Request ──► Next.js 15 Edge Router                             │
│                           │                                            │
│                           ▼                                            │
│                  Layer 1: Memory & KV SWR Cache                        │
│                  (6-hr Fresh TTL / 24-hr Stale tolerance)              │
│                           │                                            │
│                 Cache Hit? ──► Return Cached Dossier (0 API Cost)      │
│                           │ No                                         │
│                           ▼                                            │
│                  Layer 2: Unified GraphQL Query                        │
│                  (Profile + Top 50 Repos + Calendar in 1-point call)   │
│                           │                                            │
│                           ▼                                            │
│                  Layer 3: Real-Time Analytics Engines                  │
│                  ├─ Percentile Algorithm                               │
│                  ├─ 7x24 Cadence Matrix Calculator                     │
│                  ├─ Repo Health Auditor (0-100)                        │
│                  └─ Language Mastery Calculator                        │
│                           │                                            │
│                           ▼                                            │
│                  Dark-Mode Glassmorphic Dossier UI                     │
└────────────────────────────────────────────────────────────────────────┘
```

### 1. Rate-Limit Immune GraphQL Engine
Instead of executing dozens of sequential REST API queries, GitChronicle uses a single unified GraphQL query that fetches user details, pinned repositories, 365-day contribution calendar, and language distributions at a **1-point cost**.

### 2. Edge Stale-While-Revalidate (SWR) Caching
All developer profiles are cached at the edge with a 6-hour fresh TTL and background revalidation. Even under high traffic, redundant GitHub API calls are eliminated.

---

## 🏷️ Embed Your Live Badge

Add your dynamic GitChronicle percentile badge directly to your GitHub Profile README:

```markdown
[![GitChronicle](https://gitchronicle.bharatdn.com/badge/YOUR_USERNAME.svg)](https://gitchronicle.bharatdn.com/u/YOUR_USERNAME)
```

Example preview:

```markdown
[![GitChronicle](https://gitchronicle.bharatdn.com/badge/ErBharatMalhotra.svg)](https://gitchronicle.bharatdn.com/u/ErBharatMalhotra)
```

---

## 🛠️ Tech Stack

- **Framework:** Next.js 15 (App Router, React 19)
- **Language:** TypeScript 5.8
- **Styling:** Tailwind CSS v4, PostCSS, Glassmorphism
- **Icons:** Lucide React
- **Data Visualizations:** Recharts, Canvas Confetti
- **GraphQL:** `@octokit/graphql`
- **Deployment:** Vercel / Cloudflare (`gitchronicle.bharatdn.com`)

---

## 🚀 Getting Started Locally

```bash
# Clone repository
git clone https://github.com/ErBharatMalhotra/gitchronicle.git
cd gitchronicle

# Install dependencies
npm install

# (Optional) Add your personal GitHub token for enhanced rate limits
# Create .env.local:
# GITHUB_TOKEN=ghp_your_token_here

# Run development server
npm run dev

# Open http://localhost:3000
```

---

## 👨‍💻 Creator & Author

Crafted by **Bharat Malhotra**:
- Website: [bharatdn.com](https://bharatdn.com)
- GitHub: [@ErBharatMalhotra](https://github.com/ErBharatMalhotra)
- Subdomain: [gitchronicle.bharatdn.com](https://gitchronicle.bharatdn.com)

---

## 📄 License

This project is open-source and free under the [MIT License](LICENSE).
