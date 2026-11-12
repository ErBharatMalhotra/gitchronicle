# 🚀 GitChronicle — COPY-PASTE THIS PROMPT INTO TAB 2

> **Project:** GitChronicle (Developer Intelligence & Percentile Benchmark)  
> **Target:** `https://gitchronicle.bharatdn.com`  
> **Working Dir:** `D:\new idea\GitChronicle`

---

## 👇 PASTE THIS EXACT PROMPT IN YOUR SECOND TERMINAL TAB:

```bash
cd "D:\new idea\GitChronicle"

# 1. Initialize Next.js 15 + TypeScript + Tailwind + App Router
npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir --import-alias "@/*" --use-npm --turbopack

# 2. Install core dependencies
npm i @octokit/graphql @octokit/rest @tremor/react recharts date-fns lucide-react clsx tailwind-merge framer-motion
npm i -D @types/node

# 3. Configure Git: YOUR NAME ONLY — NO CO-AUTHORED TRAILERS
git config user.name "ErBharatMalhotra"
git config user.email "bharat@bharatdn.com"

# Disable any co-authored-by footers globally for this repo
git config commit.trailer "false"
git config commit.cleanup "strip"

# 4. First commit: Scaffold
git add .
git commit -m "chore: scaffold GitChronicle — Next.js 15 + Tailwind v4 + TypeScript"
git push -u origin main

# 5. Open the plan for reference
code EXECUTION_PLAN.md
```

---

## 🎯 IMMEDIATE NEXT STEPS (After scaffold):
1. **Create `/lib/github.ts`** — Unified GraphQL Query (1 point cost): Profile + Top 50 Repos + Full Contribution Calendar
2. **Create `/lib/engine/percentile.ts`** — Global Percentile Engine (Top 1%, 5%, 15%, 35% curves)
3. **Create `/lib/engine/cadence.ts`** — Developer Rhythm Matrix (Day/Hour Heatmap)
4. **Create `/app/api/user/[username]/route.ts`** — Edge-cached API (6hr stale-while-revalidate)
5. **Create `/app/badge/[username]/route.ts`** — Dynamic SVG Badge Endpoint for READMEs
6. **Create `/components/dashboard/DevDossier.tsx`** — Dark-mode Dashboard with Tremor/Recharts

---

## ⚡ GIT RULES (ENFORCED IN THIS REPO):
| Rule | Config |
|------|--------|
| **Author Name** | `ErBharatMalhotra` |
| **Author Email** | `bharat@bharatdn.com` |
| **No Co-Authored-By** | `commit.trailer=false` + `commit.cleanup=strip` |
| **No AI Footers** | Explicitly disabled |
| **Commit Style** | Conventional Commits (`feat:`, `fix:`, `chore:`, `refactor:`) |

---

## 📋 REFERENCE FILES IN THIS FOLDER:
- `README.md` — Product PRD & Vision
- `EXECUTION_PLAN.md` — 14-Day Sprint Breakdown

**Happy Building! 📊🚀**