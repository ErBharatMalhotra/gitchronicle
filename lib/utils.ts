import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatNumber(num: number): string {
  if (num >= 1_000_000) {
    return `${(num / 1_000_000).toFixed(1)}M`;
  }
  if (num >= 1_000) {
    return `${(num / 1_000).toFixed(1)}K`;
  }
  return num.toLocaleString();
}

export function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });
}

export function formatRelativeTime(dateStr: string): string {
  const date = new Date(dateStr);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return "today";
  if (diffDays === 1) return "yesterday";
  if (diffDays < 7) return `${diffDays} days ago`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
  if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`;
  return `${Math.floor(diffDays / 365)} years ago`;
}

export function getHealthStatusColor(score: number): string {
  if (score >= 85) return "#3fb950";
  if (score >= 70) return "#58a6ff";
  if (score >= 50) return "#d29922";
  return "#f85149";
}

export function getHealthGradientClass(grade: string): string {
  switch (grade) {
    case "A+":
    case "A":
      return "repo-health-excellent";
    case "B":
      return "repo-health-good";
    case "C":
      return "repo-health-fair";
    case "D":
      return "repo-health-poor";
    default:
      return "repo-health-fair";
  }
}

export function getContributionColor(count: number): string {
  if (count === 0) return "#161b22";
  if (count <= 3) return "#0e4429";
  if (count <= 6) return "#006d32";
  if (count <= 9) return "#26a641";
  return "#39d353";
}

export const BASE_URL =
  process.env.NEXT_PUBLIC_BASE_URL || "https://gitchronicle.bharatdn.com";
