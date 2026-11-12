"use client";

import Image from "next/image";
import { MapPin, Building2, Globe, Twitter, CalendarDays, Users, Star, GitFork, ExternalLink, Copy, Share2 } from "lucide-react";
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
    <div className="relative overflow-hidden rounded-2xl bg-[#161b22] border border-[#30363d] shadow-xl">
      {/* Gradient Ambient Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -left-16 -top-16 w-64 h-64 rounded-full blur-3xl opacity-20"
          style={{ backgroundColor: percentile.badgeColor }}
        />
        <div className="absolute -right-16 -bottom-16 w-64 h-64 rounded-full blur-3xl opacity-10"
          style={{ backgroundColor: "#a371f7" }}
        />
      </div>

      <div className="relative p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row items-start gap-6">
          {/* Avatar */}
          <div className="relative group flex-shrink-0">
            <div
              className="h-24 w-24 sm:h-28 sm:w-28 rounded-2xl overflow-hidden border-2 border-[#30363d] shadow-2xl ring-2 ring-offset-2 ring-offset-[#161b22]"
              style={{ borderColor: `${percentile.badgeColor}80` }}
            >
              <Image
                src={user.avatarUrl}
                alt={`${user.name}'s avatar`}
                width={112}
                height={112}
                className="object-cover w-full h-full"
                priority
                unoptimized
              />
            </div>
          </div>

          {/* Info */}
          <div className="flex-1 min-w-0">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 mb-2">
              <div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  {user.name}
                </h1>
                <p className="text-sm text-[#8b949e] font-mono">@{user.login}</p>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 flex-shrink-0 mt-2 sm:mt-0">
                <button
                  onClick={copyEmbed}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-[#21262d] hover:bg-[#30363d] text-[#c9d1d9] border border-[#30363d] rounded-lg transition-colors"
                >
                  {copied ? (
                    <>✓ Copied</>
                  ) : (
                    <>
                      <Copy className="h-3 w-3" /> Embed Badge
                    </>
                  )}
                </button>
                <a
                  href={`https://github.com/${user.login}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-[#21262d] hover:bg-[#30363d] text-[#c9d1d9] border border-[#30363d] rounded-lg transition-colors"
                >
                  <ExternalLink className="h-3 w-3" /> GitHub
                </a>
              </div>
            </div>

            {user.bio && (
              <p className="text-sm text-[#c9d1d9] leading-relaxed mb-3 max-w-xl">
                {user.bio}
              </p>
            )}

            {/* Meta Info Row */}
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-[#8b949e]">
              {user.company && (
                <span className="flex items-center gap-1">
                  <Building2 className="h-3.5 w-3.5" /> {user.company}
                </span>
              )}
              {user.location && (
                <span className="flex items-center gap-1">
                  <MapPin className="h-3.5 w-3.5" /> {user.location}
                </span>
              )}
              {user.websiteUrl && (
                <a href={user.websiteUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-[#58a6ff] hover:underline">
                  <Globe className="h-3.5 w-3.5" /> {user.websiteUrl.replace(/^https?:\/\//, "")}
                </a>
              )}
              {user.twitterUsername && (
                <a href={`https://twitter.com/${user.twitterUsername}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-[#58a6ff] hover:underline">
                  <Twitter className="h-3.5 w-3.5" /> @{user.twitterUsername}
                </a>
              )}
              <span className="flex items-center gap-1">
                <CalendarDays className="h-3.5 w-3.5" /> Joined {formatDate(user.createdAt)}
              </span>
            </div>
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-3 mt-6 pt-5 border-t border-[#30363d]">
          {[
            { label: "Followers", value: user.followersCount, icon: <Users className="h-3.5 w-3.5 text-[#58a6ff]" /> },
            { label: "Following", value: user.followingCount, icon: <Users className="h-3.5 w-3.5 text-[#8b949e]" /> },
            { label: "Repos", value: user.publicReposCount, icon: <GitFork className="h-3.5 w-3.5 text-[#a371f7]" /> },
            { label: "Stars", value: user.totalStars, icon: <Star className="h-3.5 w-3.5 text-[#e6b450]" /> },
            { label: "Forks", value: user.totalForks, icon: <GitFork className="h-3.5 w-3.5 text-[#3fb950]" /> },
            { label: "Contributions", value: contributions.totalLastYear, icon: <CalendarDays className="h-3.5 w-3.5 text-[#f778ba]" /> },
          ].map((stat) => (
            <div key={stat.label} className="flex flex-col items-center justify-center p-2 rounded-lg bg-[#0d1117] border border-[#21262d]">
              <span className="flex items-center gap-1 text-[10px] text-[#8b949e] mb-0.5">
                {stat.icon} {stat.label}
              </span>
              <span className="text-sm font-bold text-[#e6edf3] font-mono">
                {formatNumber(stat.value)}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
