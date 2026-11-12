"use client";

import { RepoHealthItem } from "@/lib/types";
import { Star, GitFork, ShieldCheck, CheckCircle, XCircle } from "lucide-react";
import { cn, formatNumber, getHealthStatusColor, getHealthGradientClass } from "@/lib/utils";

interface RepoHealthCardProps {
  repo: RepoHealthItem;
}

export function RepoHealthCard({ repo }: RepoHealthCardProps) {
  const healthClass = getHealthGradientClass(repo.grade);
  const healthColor = getHealthStatusColor(repo.overallScore);

  const badgeColor = repo.status === "Excellent" ? "#3fb950" : repo.status === "Good" ? "#58a6ff" : repo.status === "Fair" ? "#d29922" : "#f85149";

  return (
    <div className="glass-card-hover p-4 rounded-xl bg-[#161b22] border border-[#30363d] shadow-lg backdrop-blur-sm transition-all duration-300">
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <a
            href={repo.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-[#58a6ff] hover:underline truncate block"
          >
            {repo.name}
          </a>
          <p className="text-xs text-[#8b949e] truncate mt-0.5">
            {repo.language}
          </p>
        </div>
        <div className="flex flex-col items-end">
          <div className="flex items-center gap-1 text-xs font-mono text-[#8b949e]">
            <Star className="h-3 w-3 text-[#e6b450]" />
            {formatNumber(repo.stars)}
          </div>
          <div className="flex items-center gap-1 text-xs font-mono text-[#8b949e] mt-0.5">
            <GitFork className="h-3 w-3 text-[#a371f7]" />
            {formatNumber(repo.forks)}
          </div>
        </div>
      </div>

      {/* Health Gauge */}
      <div className="relative w-full h-2 bg-[#21262d] rounded-full overflow-hidden mb-2">
        <div
          className="h-full"
          style={{
            width: `${repo.overallScore}%`,
            background: `linear-gradient(90deg, ${badgeColor} 0%, ${healthColor} 100%)`,
          }}
        />
      </div>

      <div className="flex items-center justify-between text-xs">
        <span className="font-medium" style={{ color: badgeColor }}>
          {repo.grade} ({repo.overallScore}%)
        </span>
        <span className={`px-2 py-0.5 rounded text-[10px] font-medium ${healthClass}`}> {repo.status} </span>
      </div>

      {/* Recommendations (collapsible) */}
      {repo.recommendations.length > 0 && (
        <details className="mt-2 text-[10px] text-[#8b949e]">
          <summary className="cursor-pointer underline underline-offset-2 text-[#58a6ff]">
            Improvements ({repo.recommendations.length})
          </summary>
          <ul className="list-disc list-inside space-y-0.5 mt-1">
            {repo.recommendations.map((tip, i) => (
              <li key={i}>{tip}</li>
            ))}
          </ul>
        </details>
      )}
    </div>
  );
}
