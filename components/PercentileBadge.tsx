"use client";

import { Award, Zap, Star, GitCommit, CheckCircle2 } from "lucide-react";
import { PercentileResult } from "@/lib/types";

interface PercentileBadgeProps {
  percentile: PercentileResult;
  username: string;
}

export function PercentileBadge({ percentile, username }: PercentileBadgeProps) {
  const getBadgeStyle = (tier: string) => {
    switch (tier) {
      case "Top 1%":
        return {
          pillBg: "bg-gradient-to-r from-yellow-400 via-amber-500 to-red-500",
          pillText: "text-black font-extrabold",
          glow: "shadow-yellow-500/20 border-yellow-500/40",
          barColor: "bg-gradient-to-r from-yellow-400 to-amber-500",
        };
      case "Top 5%":
        return {
          pillBg: "bg-gradient-to-r from-amber-400 via-yellow-500 to-orange-500",
          pillText: "text-black font-extrabold",
          glow: "shadow-amber-500/20 border-amber-500/40",
          barColor: "bg-gradient-to-r from-amber-400 to-orange-500",
        };
      case "Top 15%":
        return {
          pillBg: "bg-gradient-to-r from-emerald-400 via-teal-500 to-cyan-500",
          pillText: "text-black font-extrabold",
          glow: "shadow-emerald-500/20 border-emerald-500/40",
          barColor: "bg-gradient-to-r from-emerald-400 to-teal-500",
        };
      case "Top 35%":
        return {
          pillBg: "bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-500",
          pillText: "text-white font-bold",
          glow: "shadow-blue-500/20 border-blue-500/40",
          barColor: "bg-gradient-to-r from-blue-400 to-indigo-500",
        };
      case "Top 50%":
        return {
          pillBg: "bg-gradient-to-r from-purple-400 via-violet-500 to-pink-500",
          pillText: "text-white font-bold",
          glow: "shadow-purple-500/20 border-purple-500/40",
          barColor: "bg-gradient-to-r from-purple-400 to-pink-500",
        };
      default:
        return {
          pillBg: "bg-gradient-to-r from-gray-500 to-slate-600",
          pillText: "text-white font-bold",
          glow: "shadow-gray-500/20 border-gray-500/40",
          barColor: "bg-gray-400",
        };
    }
  };

  const style = getBadgeStyle(percentile.tier);

  return (
    <div className={`p-6 rounded-2xl bg-[#161b22] border ${style.glow} shadow-xl relative overflow-hidden`}>
      {/* Background ambient lighting */}
      <div
        className="absolute -right-12 -top-12 w-48 h-48 rounded-full blur-3xl opacity-20 pointer-events-none"
        style={{ backgroundColor: percentile.badgeColor }}
      />

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-5 border-b border-[#30363d]">
        <div className="flex items-center gap-3">
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center shadow-lg"
            style={{ backgroundColor: `${percentile.badgeColor}20`, border: `1px solid ${percentile.badgeColor}60` }}
          >
            <Award className="h-6 w-6" style={{ color: percentile.badgeColor }} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-xl font-bold text-white tracking-tight">{percentile.badgeName}</h3>
              <span className={`px-2.5 py-0.5 rounded-full text-xs uppercase tracking-wider ${style.pillBg} ${style.pillText}`}>
                {percentile.tier}
              </span>
            </div>
            <p className="text-xs text-[#8b949e] font-mono mt-0.5">
              Global Percentile: <span className="text-[#e6edf3] font-semibold">Top {percentile.percentileRank}%</span> (Rank Score {percentile.percentileScore}/100)
            </p>
          </div>
        </div>

        {/* Live Badge Preview Pill */}
        <div className="flex items-center gap-2 bg-[#0d1117] px-3 py-1.5 rounded-lg border border-[#30363d]">
          <span className="text-[10px] text-[#6e7681] font-mono">README BADGE</span>
          <span className="text-xs font-semibold" style={{ color: percentile.badgeColor }}>
            {percentile.tier} Developer
          </span>
        </div>
      </div>

      {/* Summary Narrative */}
      <p className="text-xs sm:text-sm text-[#c9d1d9] my-4 leading-relaxed bg-[#0d1117]/60 p-3.5 rounded-xl border border-[#30363d]/60">
        {percentile.summary}
      </p>

      {/* 3 Metric Dimension Progress Gauges */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-1">
        {/* Commits */}
        <div className="bg-[#0d1117] p-3 rounded-xl border border-[#30363d]/60">
          <div className="flex items-center justify-between text-xs mb-1.5">
            <span className="text-[#8b949e] flex items-center gap-1.5">
              <GitCommit className="h-3.5 w-3.5 text-[#58a6ff]" />
              <span>Commit Volume</span>
            </span>
            <span className="font-mono text-[#58a6ff] font-semibold">Top {(100 - percentile.commitsPercentile).toFixed(1)}%</span>
          </div>
          <div className="w-full bg-[#21262d] h-2 rounded-full overflow-hidden">
            <div
              className="bg-[#58a6ff] h-full rounded-full transition-all duration-500"
              style={{ width: `${percentile.commitsPercentile}%` }}
            />
          </div>
        </div>

        {/* Stars */}
        <div className="bg-[#0d1117] p-3 rounded-xl border border-[#30363d]/60">
          <div className="flex items-center justify-between text-xs mb-1.5">
            <span className="text-[#8b949e] flex items-center gap-1.5">
              <Star className="h-3.5 w-3.5 text-[#e6b450]" />
              <span>Ecosystem Impact</span>
            </span>
            <span className="font-mono text-[#e6b450] font-semibold">Top {(100 - percentile.starsPercentile).toFixed(1)}%</span>
          </div>
          <div className="w-full bg-[#21262d] h-2 rounded-full overflow-hidden">
            <div
              className="bg-[#e6b450] h-full rounded-full transition-all duration-500"
              style={{ width: `${percentile.starsPercentile}%` }}
            />
          </div>
        </div>

        {/* Consistency */}
        <div className="bg-[#0d1117] p-3 rounded-xl border border-[#30363d]/60">
          <div className="flex items-center justify-between text-xs mb-1.5">
            <span className="text-[#8b949e] flex items-center gap-1.5">
              <Zap className="h-3.5 w-3.5 text-[#3fb950]" />
              <span>Streak & Rhythm</span>
            </span>
            <span className="font-mono text-[#3fb950] font-semibold">Top {(100 - percentile.consistencyPercentile).toFixed(1)}%</span>
          </div>
          <div className="w-full bg-[#21262d] h-2 rounded-full overflow-hidden">
            <div
              className="bg-[#3fb950] h-full rounded-full transition-all duration-500"
              style={{ width: `${percentile.consistencyPercentile}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
