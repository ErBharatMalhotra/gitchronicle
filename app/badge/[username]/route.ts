import { NextRequest, NextResponse } from "next/server";
import { fetchDeveloperProfile } from "@/lib/github";
import { buildDeveloperDossier } from "@/lib/dossier";

export const runtime = "nodejs";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ username: string }> }
) {
  const { username } = await params;
  const login = username.replace(/\.svg$/i, "");

  const profileData = await fetchDeveloperProfile(login);
  const dossier = buildDeveloperDossier(profileData.user, profileData.isCached);

  const percentile = dossier.percentile;
  const tier = percentile.tier;
  const tierLabel = tier === "Developing" ? "Builder" : tier;
  const totalStars = dossier.user.totalStars;
  const contributions = dossier.contributions.totalLastYear;

  // Badge Color Palette
  let badgeGradientStart: string;
  let badgeGradientEnd: string;
  let textColor = "#000000";

  switch (tier) {
    case "Top 1%":
      badgeGradientStart = "#ffd700";
      badgeGradientEnd = "#ff8c00";
      textColor = "#000000";
      break;
    case "Top 5%":
      badgeGradientStart = "#d4aa00";
      badgeGradientEnd = "#cc7700";
      textColor = "#000000";
      break;
    case "Top 15%":
      badgeGradientStart = "#10b981";
      badgeGradientEnd = "#0ea5e9";
      textColor = "#ffffff";
      break;
    case "Top 35%":
      badgeGradientStart = "#3b82f6";
      badgeGradientEnd = "#8b5cf6";
      textColor = "#ffffff";
      break;
    case "Top 50%":
      badgeGradientStart = "#8b5cf6";
      badgeGradientEnd = "#ec4899";
      textColor = "#ffffff";
      break;
    default:
      badgeGradientStart = "#6b7280";
      badgeGradientEnd = "#4b5563";
      textColor = "#ffffff";
  }

  const leftText = "GitChronicle";
  const rightText = `${tierLabel} · ⭐ ${totalStars} · ${contributions} contributions`;

  // Calculate text widths
  const leftWidth = leftText.length * 7.5 + 20;
  const rightWidth = rightText.length * 6.0 + 24;
  const totalWidth = leftWidth + rightWidth;
  const height = 28;

  const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="${totalWidth}" height="${height}" role="img" aria-label="${leftText}: ${rightText}">
  <defs>
    <linearGradient id="right-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="${badgeGradientStart}" />
      <stop offset="100%" stop-color="${badgeGradientEnd}" />
    </linearGradient>
    <linearGradient id="left-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#0d1117" />
      <stop offset="100%" stop-color="#161b22" />
    </linearGradient>
    <clipPath id="r">
      <rect width="${totalWidth}" height="${height}" rx="5" />
    </clipPath>
  </defs>
  <g clip-path="url(#r)">
    <rect width="${leftWidth}" height="${height}" fill="url(#left-gradient)" />
    <rect x="${leftWidth}" width="${rightWidth}" height="${height}" fill="url(#right-gradient)" />
  </g>
  <g fill="${textColor}" text-anchor="middle" font-family="-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif" text-rendering="geometricPrecision" font-size="11">
    <text x="${leftWidth / 2}" y="${height / 2 + 4}" fill="#e6edf3" font-weight="700">${leftText}</text>
    <text x="${leftWidth + rightWidth / 2}" y="${height / 2 + 4}" font-weight="600">${escapeXml(rightText)}</text>
  </g>
</svg>`;

  return new NextResponse(svg, {
    status: 200,
    headers: {
      "Content-Type": "image/svg+xml; charset=utf-8",
      "Cache-Control": "public, max-age=14400, s-maxage=21600, stale-while-revalidate=86400",
      "Content-Disposition": "inline",
    },
  });
}

function escapeXml(unsafe: string): string {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}
