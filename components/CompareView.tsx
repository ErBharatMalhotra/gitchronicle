"use client";

import Image from "next/image";
import Link from "next/link";
import { ComparisonResult } from "@/lib/types";
import { formatNumber } from "@/lib/utils";
import { Trophy, Award, GitCommit, Star, Activity, ShieldCheck, Code2, Users, ArrowRight } from "lucide-react";
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface CompareViewProps {
  comparison: ComparisonResult;
}

export function CompareView({ comparison }: CompareViewProps) {
  const { dev1, dev2, winnerPerCategory, overallLeader, radarData } = comparison;

  const categories = [
    {
      key: "commits",
      label: "Annual Commits",
      icon: GitCommit,
      val1: dev1.contributions.commits,
      val2: dev2.contributions.commits,
      color: "#58a6ff",
    },
    {
      key: "stars",
      label: "Total Stars",
      icon: Star,
      val1: dev1.user.totalStars,
      val2: dev2.user.totalStars,
      color: "#e6b450",
    },
    {
      key: "percentile",
      label: "Percentile Rank",
      icon: Award,
      val1: `Top ${dev1.percentile.percentileRank}%`,
      val2: `Top ${dev2.percentile.percentileRank}%`,
      color: "#3fb950",
    },
    {
      key: "consistency",
      label: "Rhythm Score",
      icon: Activity,
      val1: `${dev1.cadence.archetypeScore}/100`,
      val2: `${dev2.cadence.archetypeScore}/100`,
      color: "#a371f7",
    },
    {
      key: "health",
      label: "Repo Health Avg",
      icon: ShieldCheck,
      val1: `${dev1.averageRepoHealth}/100`,
      val2: `${dev2.averageRepoHealth}/100`,
      color: "#39c5cf",
    },
    {
      key: "versatility",
      label: "Languages Used",
      icon: Code2,
      val1: dev1.languages.length,
      val2: dev2.languages.length,
      color: "#f778ba",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Head to Head Header Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative">
        {/* VS Badge in middle */}
        <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-[#0d1117] border-2 border-[#58a6ff] items-center justify-center font-black text-xs text-[#58a6ff] shadow-xl">
          VS
        </div>

        {/* Dev 1 Card */}
        <div
          className={`p-6 rounded-2xl bg-[#161b22] border transition-all ${
            overallLeader === dev1.user.login
              ? "border-[#58a6ff] shadow-lg shadow-[#58a6ff]/10"
              : "border-[#30363d]"
          }`}
        >
          {overallLeader === dev1.user.login && (
            <div className="flex items-center gap-1.5 text-xs font-bold text-[#58a6ff] mb-3 uppercase tracking-wider">
              <Trophy className="h-4 w-4" /> Overall Match Leader
            </div>
          )}
          <div className="flex items-center gap-4">
            <div className="h-16 w-16 rounded-xl overflow-hidden border border-[#30363d]">
              <Image
                src={dev1.user.avatarUrl}
                alt={dev1.user.name}
                width={64}
                height={64}
                className="w-full h-full object-cover"
                unoptimized
              />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">{dev1.user.name}</h2>
              <p className="text-xs text-[#8b949e] font-mono">@{dev1.user.login}</p>
              <span
                className="inline-block mt-2 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase"
                style={{
                  backgroundColor: `${dev1.percentile.badgeColor}20`,
                  color: dev1.percentile.badgeColor,
                  border: `1px solid ${dev1.percentile.badgeColor}40`,
                }}
              >
                {dev1.percentile.tier} · {dev1.percentile.badgeName}
              </span>
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-[#30363d] flex justify-between items-center text-xs">
            <span className="text-[#8b949e]">Full Dossier</span>
            <Link
              href={`/u/${dev1.user.login}`}
              className="text-[#58a6ff] hover:underline flex items-center gap-1 font-medium"
            >
              View Profile <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
        </div>

        {/* Dev 2 Card */}
        <div
          className={`p-6 rounded-2xl bg-[#161b22] border transition-all ${
            overallLeader === dev2.user.login
              ? "border-[#a371f7] shadow-lg shadow-[#a371f7]/10"
              : "border-[#30363d]"
          }`}
        >
          {overallLeader === dev2.user.login && (
            <div className="flex items-center gap-1.5 text-xs font-bold text-[#a371f7] mb-3 uppercase tracking-wider">
              <Trophy className="h-4 w-4" /> Overall Match Leader
            </div>
          )}
          <div className="flex items-center gap-4">
            <div className="h-16 w-16 rounded-xl overflow-hidden border border-[#30363d]">
              <Image
                src={dev2.user.avatarUrl}
                alt={dev2.user.name}
                width={64}
                height={64}
                className="w-full h-full object-cover"
                unoptimized
              />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">{dev2.user.name}</h2>
              <p className="text-xs text-[#8b949e] font-mono">@{dev2.user.login}</p>
              <span
                className="inline-block mt-2 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase"
                style={{
                  backgroundColor: `${dev2.percentile.badgeColor}20`,
                  color: dev2.percentile.badgeColor,
                  border: `1px solid ${dev2.percentile.badgeColor}40`,
                }}
              >
                {dev2.percentile.tier} · {dev2.percentile.badgeName}
              </span>
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-[#30363d] flex justify-between items-center text-xs">
            <span className="text-[#8b949e]">Full Dossier</span>
            <Link
              href={`/u/${dev2.user.login}`}
              className="text-[#a371f7] hover:underline flex items-center gap-1 font-medium"
            >
              View Profile <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
        </div>
      </div>

      {/* Comparative Radar Matrix */}
      <div className="p-6 rounded-2xl bg-[#161b22] border border-[#30363d] shadow-xl">
        <h3 className="text-sm font-bold text-[#e6edf3] mb-4 text-center">
          Multidimensional Developer Benchmark Comparison
        </h3>
        <div className="w-full h-72">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
              <PolarGrid stroke="#30363d" />
              <PolarAngleAxis dataKey="category" tick={{ fill: "#8b949e", fontSize: 11 }} />
              <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fill: "#6e7681", fontSize: 8 }} />
              <Radar
                name={dev1.user.login}
                dataKey={dev1.user.login}
                stroke="#58a6ff"
                fill="#58a6ff"
                fillOpacity={0.4}
              />
              <Radar
                name={dev2.user.login}
                dataKey={dev2.user.login}
                stroke="#a371f7"
                fill="#a371f7"
                fillOpacity={0.4}
              />
              <Legend wrapperStyle={{ paddingTop: "12px", fontSize: "12px" }} />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Category Battle Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories.map((cat) => {
          const Icon = cat.icon;
          const isDev1Winner = winnerPerCategory[cat.key as keyof typeof winnerPerCategory] === dev1.user.login;

          return (
            <div
              key={cat.key}
              className="p-4 rounded-xl bg-[#161b22] border border-[#30363d] shadow-md flex flex-col justify-between"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="flex items-center gap-1.5 text-xs text-[#8b949e] font-medium">
                  <Icon className="h-3.5 w-3.5" style={{ color: cat.color }} />
                  {cat.label}
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#21262d] text-[#c9d1d9]">
                  Winner: @{winnerPerCategory[cat.key as keyof typeof winnerPerCategory]}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2 border-t border-[#21262d]">
                <div
                  className={`p-2 rounded-lg text-center ${
                    isDev1Winner
                      ? "bg-[#58a6ff]/10 border border-[#58a6ff]/30 text-[#58a6ff]"
                      : "bg-[#0d1117] text-[#8b949e]"
                  }`}
                >
                  <p className="text-[10px] font-mono truncate mb-0.5">@{dev1.user.login}</p>
                  <p className="text-sm font-bold font-mono">
                    {typeof cat.val1 === "number" ? formatNumber(cat.val1) : cat.val1}
                  </p>
                </div>

                <div
                  className={`p-2 rounded-lg text-center ${
                    !isDev1Winner
                      ? "bg-[#a371f7]/10 border border-[#a371f7]/30 text-[#a371f7]"
                      : "bg-[#0d1117] text-[#8b949e]"
                  }`}
                >
                  <p className="text-[10px] font-mono truncate mb-0.5">@{dev2.user.login}</p>
                  <p className="text-sm font-bold font-mono">
                    {typeof cat.val2 === "number" ? formatNumber(cat.val2) : cat.val2}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
