"use client";

import { useState, useMemo } from "react";
import { ContributionCalendar } from "@/lib/types";
import { getContributionColor, formatNumber } from "@/lib/utils";

interface HeatmapProps {
  calendar: ContributionCalendar;
}

const MONTH_NAMES = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

const DAY_LABELS = ["", "Mon", "", "Wed", "", "Fri", ""];

export function ContributionHeatmap({ calendar }: HeatmapProps) {
  const [hoveredDay, setHoveredDay] = useState<{
    date: string;
    count: number;
    x: number;
    y: number;
  } | null>(null);

  const weeks = calendar.weeks || [];

  // Find month labels for column headers
  const monthLabels = useMemo(() => {
    const labels: { label: string; col: number }[] = [];
    let lastMonth = -1;
    weeks.forEach((week, colIndex) => {
      const firstDay = week.contributionDays[0];
      if (firstDay) {
        const date = new Date(firstDay.date);
        const month = date.getMonth();
        if (month !== lastMonth) {
          labels.push({ label: MONTH_NAMES[month], col: colIndex });
          lastMonth = month;
        }
      }
    });
    return labels;
  }, [weeks]);

  const cellSize = 11;
  const gap = 2;
  const totalWidth = weeks.length * (cellSize + gap);

  return (
    <div className="p-5 rounded-2xl bg-[#161b22] border border-[#30363d] shadow-xl">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-bold text-[#e6edf3] flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-[#39d353]"></span>
          {formatNumber(calendar.totalContributions)} contributions in the last year
        </h3>
      </div>

      <div className="overflow-x-auto scrollbar-hide">
        <div className="relative" style={{ minWidth: `${totalWidth + 32}px` }}>
          {/* Month Labels */}
          <div className="flex text-[10px] text-[#8b949e] mb-2 pl-7">
            {monthLabels.map((m, i) => (
              <div
                key={i}
                className="absolute"
                style={{ left: `${m.col * (cellSize + gap) + 28}px` }}
              >
                {m.label}
              </div>
            ))}
          </div>

          <div className="flex gap-0.5 mt-5">
            {/* Day-of-week labels */}
            <div className="flex flex-col gap-0.5 pr-1.5 mt-0.5">
              {DAY_LABELS.map((label, i) => (
                <div
                  key={i}
                  className="text-[10px] text-[#8b949e] flex items-center justify-end"
                  style={{ height: `${cellSize}px`, width: "22px" }}
                >
                  {label}
                </div>
              ))}
            </div>

            {/* Calendar Grid */}
            {weeks.map((week, colIndex) => (
              <div key={colIndex} className="flex flex-col gap-0.5">
                {week.contributionDays.map((day, rowIndex) => (
                  <div
                    key={`${colIndex}-${rowIndex}`}
                    className="rounded-[2px] transition-all duration-75 hover:ring-2 hover:ring-[#58a6ff] hover:ring-offset-1 hover:ring-offset-[#0d1117] cursor-pointer"
                    style={{
                      width: `${cellSize}px`,
                      height: `${cellSize}px`,
                      backgroundColor: day.color || getContributionColor(day.contributionCount),
                    }}
                    onMouseEnter={(e) => {
                      const rect = e.currentTarget.getBoundingClientRect();
                      setHoveredDay({
                        date: day.date,
                        count: day.contributionCount,
                        x: rect.left + rect.width / 2,
                        y: rect.top - 10,
                      });
                    }}
                    onMouseLeave={() => setHoveredDay(null)}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center justify-end gap-1.5 mt-3 text-[10px] text-[#8b949e]">
        <span>Less</span>
        {[0, 3, 6, 9, 12].map((n) => (
          <div
            key={n}
            className="w-[10px] h-[10px] rounded-[2px]"
            style={{ backgroundColor: getContributionColor(n) }}
          />
        ))}
        <span>More</span>
      </div>

      {/* Tooltip */}
      {hoveredDay && (
        <div
          className="fixed z-[999] px-3 py-1.5 bg-[#21262d] text-[#e6edf3] text-xs rounded-lg shadow-xl border border-[#30363d] pointer-events-none"
          style={{
            left: `${hoveredDay.x}px`,
            top: `${hoveredDay.y - 40}px`,
            transform: "translateX(-50%)",
          }}
        >
          <span className="font-semibold">{hoveredDay.count} contributions</span>{" "}
          <span className="text-[#8b949e]">on {hoveredDay.date}</span>
        </div>
      )}
    </div>
  );
}
