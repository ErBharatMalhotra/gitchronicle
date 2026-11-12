import { GitHubUser } from "./types";

/**
 * Realistic Mock Profiles for fallback and demonstration
 * Ensures GitChronicle is 100% resilient and rate-limit immune
 */

export function generateMockProfile(login: string): GitHubUser {
  const normalized = login.toLowerCase();

  const isBharat = normalized === "erbharatmalhotra" || normalized === "bharat";
  const isShadcn = normalized === "shadcn";
  const isLeeRob = normalized === "leerob";
  const isTorvalds = normalized === "torvalds";

  const name = isBharat
    ? "Bharat Malhotra"
    : isShadcn
    ? "shadcn"
    : isLeeRob
    ? "Lee Robinson"
    : isTorvalds
    ? "Linus Torvalds"
    : login;

  const bio = isBharat
    ? "Full-stack engineer & open-source architect. Building GitChronicle, cloud-native platforms, and developer tooling."
    : isShadcn
    ? "Design systems & UI engineer. Creator of shadcn/ui. Building accessible, customizable components."
    : isLeeRob
    ? "VP of Developer Experience. Building the future of the web with Next.js, React, and server-driven architectures."
    : isTorvalds
    ? "Creator of Linux and Git. Finnish-American software engineer."
    : `Passionate software engineer and open-source enthusiast crafting software at ${login}.`;

  const totalStars = isBharat
    ? 1420
    : isShadcn
    ? 89400
    : isLeeRob
    ? 12500
    : isTorvalds
    ? 198000
    : Math.floor(Math.abs(hash(login) % 650) + 120);

  const totalContributions = isBharat
    ? 2480
    : isShadcn
    ? 4230
    : isLeeRob
    ? 1890
    : isTorvalds
    ? 3890
    : Math.floor(Math.abs(hash(login) % 1800) + 250);

  const primaryLang = isTorvalds ? "C" : isShadcn ? "TypeScript" : isBharat ? "TypeScript" : "TypeScript";

  // Build calendar weeks
  const weeks = [];
  const now = new Date();
  const dayMs = 24 * 60 * 60 * 1000;

  for (let w = 52; w >= 0; w--) {
    const days = [];
    for (let d = 0; d < 7; d++) {
      const daysAgo = w * 7 + (6 - d);
      const date = new Date(now.getTime() - daysAgo * dayMs);
      const dateStr = date.toISOString().split("T")[0];

      // Procedural contribution distribution based on seed
      const seed = Math.sin(daysAgo * 12.9898 + hash(login)) * 43758.5453;
      const factor = Math.abs(seed - Math.floor(seed));
      let count = 0;
      if (factor > 0.45) {
        count = Math.floor(factor * 9);
      }
      if (factor > 0.88) {
        count = Math.floor(factor * 18);
      }

      days.push({
        date: dateStr,
        contributionCount: count,
        weekday: d,
        color: count === 0 ? "#161b22" : count < 4 ? "#0e4429" : count < 8 ? "#006d32" : count < 12 ? "#26a641" : "#39d353",
      });
    }
    weeks.push({ contributionDays: days });
  }

  return {
    login,
    name,
    avatarUrl: `https://avatars.githubusercontent.com/${login}?v=4`,
    bio,
    company: isBharat ? "@BharatDN" : isLeeRob ? "@Vercel" : isTorvalds ? "Linux Foundation" : null,
    location: isBharat ? "Delhi, India" : isLeeRob ? "San Francisco, CA" : isTorvalds ? "Portland, OR" : "Global",
    twitterUsername: isBharat ? "ErBharatMalhotra" : isShadcn ? "shadcn" : isLeeRob ? "leeerob" : null,
    websiteUrl: isBharat ? "https://gitchronicle.bharatdn.com" : isLeeRob ? "https://leerob.io" : null,
    createdAt: isTorvalds ? "2011-09-03T00:00:00Z" : "2018-04-15T12:00:00Z",
    followers: { totalCount: Math.floor(totalStars * 1.8 + 420) },
    following: { totalCount: 142 },
    repositories: {
      nodes: [
        {
          name: isBharat ? "GitChronicle" : isShadcn ? "ui" : isTorvalds ? "linux" : "next-saas-starter",
          description: isBharat
            ? "Real-Time Developer Intelligence & Percentile Benchmark Dashboard."
            : "Beautifully designed components that you can copy and paste into your apps.",
          url: `https://github.com/${login}/repo1`,
          stargazerCount: Math.floor(totalStars * 0.65),
          forkCount: Math.floor(totalStars * 0.18),
          primaryLanguage: { name: primaryLang, color: "#3178c6" },
          languages: {
            edges: [
              { size: 520000, node: { name: "TypeScript", color: "#3178c6" } },
              { size: 240000, node: { name: "React", color: "#61dafb" } },
              { size: 110000, node: { name: "Tailwind CSS", color: "#38bdf8" } },
            ],
          },
          hasIssuesEnabled: true,
          licenseInfo: { spdxId: "MIT", name: "MIT License" },
          openIssues: { totalCount: 14 },
          closedIssues: { totalCount: 182 },
          pushedAt: new Date(Date.now() - 2 * dayMs).toISOString(),
          updatedAt: new Date(Date.now() - 1 * dayMs).toISOString(),
          isArchived: false,
          defaultBranchRef: {
            target: {
              history: {
                totalCount: 420,
                nodes: [
                  { committedDate: new Date(Date.now() - 2 * dayMs).toISOString() },
                  { committedDate: new Date(Date.now() - 4 * dayMs).toISOString() },
                ],
              },
            },
          },
        },
        {
          name: isBharat ? "cloud-agentic-pipeline" : "turbopack-starter",
          description: "Production-grade autonomous agent and continuous evaluation orchestration pipeline.",
          url: `https://github.com/${login}/repo2`,
          stargazerCount: Math.floor(totalStars * 0.22),
          forkCount: Math.floor(totalStars * 0.05),
          primaryLanguage: { name: "TypeScript", color: "#3178c6" },
          languages: {
            edges: [
              { size: 310000, node: { name: "TypeScript", color: "#3178c6" } },
              { size: 95000, node: { name: "Python", color: "#3572A5" } },
            ],
          },
          hasIssuesEnabled: true,
          licenseInfo: { spdxId: "Apache-2.0", name: "Apache License 2.0" },
          openIssues: { totalCount: 3 },
          closedIssues: { totalCount: 45 },
          pushedAt: new Date(Date.now() - 8 * dayMs).toISOString(),
          updatedAt: new Date(Date.now() - 5 * dayMs).toISOString(),
          isArchived: false,
        },
        {
          name: "developer-benchmarks",
          description: "High-performance statistics and benchmark engines for developer performance analysis.",
          url: `https://github.com/${login}/repo3`,
          stargazerCount: Math.floor(totalStars * 0.13),
          forkCount: Math.floor(totalStars * 0.02),
          primaryLanguage: { name: "Go", color: "#00ADD8" },
          languages: {
            edges: [
              { size: 280000, node: { name: "Go", color: "#00ADD8" } },
              { size: 50000, node: { name: "Shell", color: "#89e051" } },
            ],
          },
          hasIssuesEnabled: true,
          licenseInfo: { spdxId: "MIT", name: "MIT License" },
          openIssues: { totalCount: 1 },
          closedIssues: { totalCount: 38 },
          pushedAt: new Date(Date.now() - 14 * dayMs).toISOString(),
          updatedAt: new Date(Date.now() - 12 * dayMs).toISOString(),
          isArchived: false,
        },
      ],
    },
    contributionsCollection: {
      totalCommitContributions: Math.floor(totalContributions * 0.78),
      totalPullRequestContributions: Math.floor(totalContributions * 0.12),
      totalIssueContributions: Math.floor(totalContributions * 0.06),
      totalPullRequestReviewContributions: Math.floor(totalContributions * 0.04),
      contributionCalendar: {
        totalContributions,
        weeks,
      },
    },
    pullRequests: {
      totalCount: Math.floor(totalContributions * 0.12),
      nodes: [
        {
          state: "MERGED",
          createdAt: new Date(Date.now() - 3 * dayMs).toISOString(),
          mergedAt: new Date(Date.now() - 2 * dayMs).toISOString(),
        },
        {
          state: "MERGED",
          createdAt: new Date(Date.now() - 7 * dayMs).toISOString(),
          mergedAt: new Date(Date.now() - 6 * dayMs).toISOString(),
        },
        {
          state: "OPEN",
          createdAt: new Date(Date.now() - 1 * dayMs).toISOString(),
          mergedAt: null,
        },
      ],
    },
  };
}

function hash(str: string): number {
  let h = 0;
  for (let i = 0; i < str.length; i++) {
    h = (Math.imul(31, h) + str.charCodeAt(i)) | 0;
  }
  return h;
}
