"use client";

import { GitCommit, GitPullRequest, MessageSquare, AlertCircle } from "lucide-react";
import { formatNumber } from "@/lib/utils";

interface ActivityItem {
  label: string;
  count: number;
  icon: React.ReactNode;
  color: string;
  description: string;
}

interface ActivityDistributionProps {
  contributions: {
    commits: number;
    pullRequests: number;
    reviews: number;
    issues: number;
  };
}

export function ActivityDistribution({
  contributions,
}: ActivityDistributionProps) {
  const activities: ActivityItem[] = [
    {
      label: "Commits",
      count: contributions.commits,
      icon: <GitCommit className="h-4 w-4" />,
      color: "#58a6ff",
      description: "Code pushed to repositories",
    },
    {
      label: "Pull Requests",
      count: contributions.pullRequests,
      icon: <GitPullRequest className="h-4 w-4" />,
      color: "#3fb950",
      description: "PRs opened & merged",
    },
    {
      label: "Reviews",
      count: contributions.reviews,
      icon: <MessageSquare className="h-4 w-4" />,
      color: "#a371f7",
      description: "Code reviews given",
    },
    {
      label: "Issues",
      count: contributions.issues,
      icon: <AlertCircle className="h-4 w-4" />,
      color: "#f778ba",
      description: "Issues opened & discussed",
    },
  ];

  const total = activities.reduce((sum, a) => sum + a.count, 0) || 1;

  return (
    <div className="p-5 rounded-2xl bg-[#161b22] border border-[#30363d] shadow-xl">
      <h3 className="text-sm font-bold text-[#e6edf3] mb-4">Activity Distribution</h3>

      <div className="space-y-3">
        {activities.map((activity) => {
          const pct = ((activity.count / total) * 100).toFixed(1);
          return (
            <div key={activity.label} className="group">
              <div className="flex items-center justify-between text-xs mb-1.5">
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${activity.color}20` }}>
                    {activity.icon}
                  </span>
                  <span className="font-medium text-[#e6edf3]">{activity.label}</span>
                </div>
                <span className="font-mono text-[#8b949e]">{formatNumber(activity.count)}</span>
              </div>
              <div className="w-full h-2 bg-[#21262d] rounded-full overflow-hidden relative group-hover:opacity-100 transition-opacity">
                <div
                  className="h-full rounded-full transition-all duration-700 ease-out"
                  style={{
                    width: `${pct}%`,
                    backgroundColor: activity.color,
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>

      <p className="text-xs text-[#6e7681] mt-4 text-center">
        Total tracked activity: <span className="font-mono text-[#e6edf3]">{formatNumber(total)}</span>
      </p>
    </div>
  );
}