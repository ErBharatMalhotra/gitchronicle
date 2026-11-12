"use client";

import Image from "next/image";
import { MapPin, Building2, Globe, Twitter, CalendarDays, Users, Star, GitFork, ExternalLink, Copy, Share2, Sparkles } from "lucide-react";
import { DeveloperDossier } from "@/lib/types";
import { formatNumber, formatDate, BASE_URL } from "@/lib/utils";
import { useState } from "react";

interface ProfileHeaderProps {
  dossier: DeveloperDossier;
}

export function ProfileHeader({ dossier }: ProfileHeaderProps) {
  const [copied, setCopied] = useState(false);
  const { user, percentile, contributions } = dossier;

  const profileUrl = `${BASE_URL}/u/${user.login}`;
  const badgeUrl = `${BASE_URL}/badge/${user.login}.svg`;
  const embedMarkdown = `[![GitChronicle](${badgeUrl})](${profileUrl})`;

  const copyEmbed = () => {
    navigator.clipboard.writeText(embedMarkdown).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="relative overflow-hidden glass-panel p-6 sm:p-8">
      {/* Ambient Gradient Background Glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute -left-20 -top-20 w-80 h-80 rounded-full blur-[100px] opacity-25"
          style={{ backgroundColor: percentile.badgeColor }}
        />
        <div
          className="absolute -right-20 -bottom-20 w-80 h-80 rounded-full blur-[100px] opacity-20"
          style={{ backgroundColor: "#bc8cff" }}
        />
      </div>

      <div className="relative z-10">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-6 border-b border-[#30363d]/60">
          <div className="flex items-center gap-5">
            {/* Avatar */}
            <div className="relative group">
              <div
                className="h-24 w-24 sm:h-28 sm:w-28 rounded-2xl overflow-hidden border-2 shadow-2xl relative"
                style={{ borderColor: percentile.badgeColor, boxShadow: `0 0 30px ${percentile.badgeColor}30` }}
              >
                <Image
                  src={user.avatarUrl}
                  alt={`${user.name}'s avatar`}
                  width={112}
                  height={112}
                  className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                  priority
                  unoptimized
                />
              </div>
            </div>

            {/* User Bio & Meta */}
            <div>
              <div className="flex flex-wrap items-center gap-3 mb-1">
                <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                  {user.name}
                </h1>
                <span className="text-xs font-mono px-2.5 py-1 rounded-full bg-[#21262d] text-[#8b949e] border border-[#30363d]">
                  @{user.login}
                </span>
              </div>

              {user.bio && (
                <p className="text-sm text-[#c9d1d9] leading-relaxed max-w-xl mb-3">
                  {user.bio}
                </p>
              )}

              <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-[#8b949e]">
                {user.company && (
                  <span className="flex items-center gap-1.5 text-[#e6edf3]">
                    <Building2 className="h-3.5 w-3.5 text-[#58a6ff]" /> {user.company}
                  </span>
                )}
                {user.location && (
                  <span className="flex items-center gap-1.5 text-[#e6edf3]">
                    <MapPin className="h-3.5 w-3.5 text-[#f778ba]" /> {user.location}
                  </span>
                )}
                {user.websiteUrl && (
                  <a href={user.websiteUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-[#58a6ff] hover:underline">
                    <Globe className="h-3.5 w-3.5" /> {user.websiteUrl.replace(/^https?:\/\//, "")}
                  </a>
                )}
                <span className="flex items-center gap-1.5">
                  <CalendarDays className="h-3.5 w-3.5 text-[#bc8cff]" /> Joined {formatDate(user.createdAt)}
                </span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2.5 w-full md:w-auto justify-end">
            <button
              onClick={copyEmbed}
              className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold bg-[#21262d] hover:bg-[#30363d] text-[#e6edf3] border border-[#30363d] rounded-xl transition-all shadow-md active:scale-95"
            >
              {copied ? (
                <>✓ Copied Markdown</>
              ) : (
                <>
                  <Copy className="h-3.5 w-3.5 text-[#58a6ff]" /> Embed Badge
                </>
              )}
            </button>
            <a
              href={`https://github.com/${user.login}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold bg-gradient-to-r from-[#58a6ff] to-[#bc8cff] hover:opacity-90 text-[#090d16] rounded-xl transition-all shadow-lg shadow-[#58a6ff]/20 active:scale-95"
            >
              <ExternalLink className="h-3.5 w-3.5" /> GitHub Profile
            </a>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5 mt-6">
          {[
            { label: "Followers", value: user.followersCount, icon: <Users className="h-4 w-4 text-[#58a6ff]" /> },
            { label: "Following", value: user.followingCount, icon: <Users className="h-4 w-4 text-[#8b949e]" /> },
            { label: "Public Repos", value: user.publicReposCount, icon: <GitFork className="h-4 w-4 text-[#bc8cff]" /> },
            { label: "Total Stars", value: user.totalStars, icon: <Star className="h-4 w-4 text-[#d29922]" /> },
            { label: "Total Forks", value: user.totalForks, icon: <GitFork className="h-4 w-4 text-[#3fb950]" /> },
            { label: "Commits & PRs", value: contributions.totalLastYear, icon: <Sparkles className="h-4 w-4 text-[#f778ba]" /> },
          ].map((stat) => (
            <div key={stat.label} className="p-3.5 rounded-xl bg-[#090d16]/60 border border-[#30363d]/80 flex flex-col items-center justify-center text-center shadow-inner group hover:border-[#58a6ff]/40 transition-colors">
              <span className="flex items-center gap-1.5 text-[11px] text-[#8b949e] mb-1 font-medium">
                {stat.icon} {stat.label}
              </span>
              <span className="text-base sm:text-lg font-black text-white font-mono tracking-tight">
                {formatNumber(stat.value)}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
