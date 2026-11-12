"use client";

import { CadenceRhythm } from "@/lib/types";
import { Moon, Sun, Zap, Activity, Clock, Calendar } from "lucide-react";

interface CadenceMatrixProps {
  cadence: CadenceRhythm;
}

const DAY_NAMES = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const HOUR_LABELS = [
  "12a", "1a", "2a", "3a", "4a", "5a", "6a", "7a",
  "8a", "9a", "10a", "11a", "12p", "1p", "2p", "3p",
  "4p", "5p", "6p", "7p", "8p", "9p", "10p", "11p",
];

const ArchetypeIcons = {
  "Early Bird": Sun,
  "Midday Sprinter": Zap,
  "Midnight Hacker": Moon,
  "All-Day Architect": Activity,
};

function getHeatColor(value: number, max: number): string {
  if (max === 0) return "#161b22";
  const ratio = value / max;
  if (ratio === 0) return "#161b22";
  if (ratio < 0.1) return "#0e4429";
  if (ratio < 0.25) return "#006d32";
  if (ratio < 0.5) return "#26a641";
  if (ratio < 0.75) return "#39d353";
  return "#57f26e";
}

export function CadenceMatrix({ cadence }: CadenceMatrixProps) {
  const matrix = cadence.matrix;
  const max = Math.max(...matrix.flatMap((row) => row));

  const ArchIcon = ArchetypeIcons[cadence.archetype] || Zap;

  const archetypeColor = {
    "Early Bird": "#e6b450",
    "Midday Sprinter": "#58a6ff",
    "Midnight Hacker": "#a371f7",
    "All-Day Architect": "#3fb950",
  }[cadence.archetype] || "#58a6ff";

  return (
    <div className="p-5 rounded-2xl bg-[#161b22] border border-[#30363d] shadow-xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-5">
        <h3 className="text-sm font-bold text-[#e6edf3]">
          Developer Cadence Rhythm Matrix
        </h3>

        {/* Archetype Card */}
        <div
          className="flex items-center gap-2.5 px-3 py-2 rounded-xl border"
          style={{
            backgroundColor: `${archetypeColor}15`,
            borderColor: `${archetypeColor}40`,
          }}
        >
          <ArchIcon className="h-4 w-4 flex-shrink-0" style={{ color: archetypeColor }} />
          <div>
            <p className="text-xs font-bold" style={{ color: archetypeColor }}>
              {cadence.archetype}
            </p>
            <p className="text-[10px] text-[#8b949e] max-w-[180px] leading-tight">
              {cadence.archetypeDescription.slice(0, 60)}...
            </p>
          </div>
        </div>
      </div>

      {/* Heatmap Grid */}
      <div className="overflow-x-auto scrollbar-hide">
        <div className="min-w-[480px]">
          {/* Hour labels */}
          <div className="flex ml-10 mb-1">
            {HOUR_LABELS.map((label, h) => (
              <div
                key={h}
                className="flex-1 text-center text-[9px] text-[#6e7681]"
                style={{ minWidth: "0" }}
              >
                {h % 3 === 0 ? label : ""}
              </div>
            ))}
          </div>

          {/* Grid rows */}
          {matrix.map((row, day) => (
            <div key={day} className="flex items-center gap-1 mb-1">
              <span className="text-[10px] text-[#8b949e] w-10 text-right pr-1.5 flex-shrink-0">
                {DAY_NAMES[day]}
              </span>
              {row.map((value, hour) => (
                <div
                  key={hour}
                  className="flex-1 h-[14px] rounded-[2px] transition-all duration-75 hover:scale-110 cursor-default relative group"
                  style={{
                    backgroundColor: getHeatColor(value, max),
                    minWidth: "0",
                  }}
                  title={`${DAY_NAMES[day]} ${HOUR_LABELS[hour]}: ${value.toFixed(1)} commits`}
                />
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-5 pt-4 border-t border-[#30363d]">
        <div className="text-center">
          <div className="text-[10px] text-[#8b949e] mb-1 flex items-center justify-center gap-1">
            <Clock className="h-3 w-3" />
            Peak Hour
          </div>
          <p className="text-sm font-bold text-[#e6edf3]">{HOUR_LABELS[cadence.peakHour]}</p>
        </div>

        <div className="text-center">
          <div className="text-[10px] text-[#8b949e] mb-1 flex items-center justify-center gap-1">
            <Calendar className="h-3 w-3" />
            Peak Day
          </div>
          <p className="text-sm font-bold text-[#e6edf3]">{cadence.peakDayName}</p>
        </div>

        <div className="text-center">
          <div className="text-[10px] text-[#8b949e] mb-1">Current Streak</div>
          <p className="text-sm font-bold text-[#58a6ff]">
            {cadence.activeStreaks.current}
            <span className="text-[10px] text-[#8b949e] font-normal"> days</span>
          </p>
        </div>

        <div className="text-center">
          <div className="text-[10px] text-[#8b949e] mb-1">Weekday</div>
          <p className="text-sm font-bold text-[#e6edf3]">
            {cadence.weekdayVsWeekend.weekdayPercentage}
            <span className="text-[10px] text-[#8b949e] font-normal">%</span>
          </p>
        </div>
      </div>
    </div>
  );
}
