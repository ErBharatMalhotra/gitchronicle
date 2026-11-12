"use client";

import { LanguageStat } from "@/lib/types";
import { formatNumber } from "@/lib/utils";
import { Code2 } from "lucide-react";
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
} from "recharts";

interface LanguageRadarProps {
  languages: LanguageStat[];
}

export function LanguageRadar({ languages }: LanguageRadarProps) {
  if (!languages || languages.length === 0) {
    return (
      <div className="p-5 rounded-2xl bg-[#161b22] border border-[#30363d] shadow-xl text-center py-12">
        <Code2 className="h-8 w-8 text-[#6e7681] mx-auto mb-2" />
        <p className="text-xs text-[#8b949e]">No language statistics available</p>
      </div>
    );
  }

  // Format data for radar
  const radarData = languages.slice(0, 6).map((lang) => ({
    language: lang.name,
    percentage: lang.percentage,
    fullMark: 100,
  }));

  return (
    <div className="p-5 rounded-2xl bg-[#161b22] border border-[#30363d] shadow-xl flex flex-col justify-between">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-bold text-[#e6edf3] flex items-center gap-2">
          <Code2 className="h-4 w-4 text-[#58a6ff]" />
          Language Mastery
        </h3>
        <span className="text-[10px] text-[#8b949e] font-mono">
          Top {languages.length} Languages
        </span>
      </div>

      {/* Radar Chart Visualizer */}
      <div className="w-full h-52 -my-2">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart cx="50%" cy="50%" outerRadius="70%" data={radarData}>
            <PolarGrid stroke="#30363d" />
            <PolarAngleAxis
              dataKey="language"
              tick={{ fill: "#8b949e", fontSize: 10 }}
            />
            <PolarRadiusAxis
              angle={30}
              domain={[0, 100]}
              tick={{ fill: "#6e7681", fontSize: 8 }}
            />
            <Radar
              name="Mastery"
              dataKey="percentage"
              stroke="#58a6ff"
              fill="#58a6ff"
              fillOpacity={0.35}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>

      {/* Proportional Language Bar */}
      <div className="mt-3">
        <div className="flex h-2.5 w-full rounded-full overflow-hidden mb-3.5 bg-[#21262d]">
          {languages.map((lang) => (
            <div
              key={lang.name}
              style={{
                width: `${lang.percentage}%`,
                backgroundColor: lang.color,
              }}
              className="h-full transition-all hover:opacity-80"
              title={`${lang.name}: ${lang.percentage}%`}
            />
          ))}
        </div>

        {/* Breakdown List */}
        <div className="grid grid-cols-2 gap-2">
          {languages.map((lang) => (
            <div
              key={lang.name}
              className="flex items-center justify-between text-xs p-1.5 rounded-lg bg-[#0d1117] border border-[#21262d]"
            >
              <div className="flex items-center gap-2 min-w-0">
                <span
                  className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                  style={{ backgroundColor: lang.color }}
                />
                <span className="text-[#e6edf3] truncate text-[11px] font-medium">
                  {lang.name}
                </span>
              </div>
              <span className="text-[#8b949e] font-mono text-[10px] ml-1">
                {lang.percentage}%
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
