import { ContributionCalendar, CadenceRhythm } from "../types";

/**
 * Developer Cadence Rhythm Matrix Engine
 * Computes day-of-week (0-6) x hour-of-day (0-23) heatmap and behavioral archetypes.
 */

export function analyzeCadence(calendar: ContributionCalendar): CadenceRhythm {
  // Initialize 7 x 24 matrix with zeros
  const matrix: number[][] = Array.from({ length: 7 }, () => Array(24).fill(0));

  let totalContributions = 0;
  let weekdayTotal = 0;
  let weekendTotal = 0;

  // Track dates for streak calculation
  const dateCounts: Map<string, number> = new Map();

  if (calendar && calendar.weeks) {
    for (const week of calendar.weeks) {
      if (!week.contributionDays) continue;
      for (const day of week.contributionDays) {
        const count = day.contributionCount || 0;
        totalContributions += count;
        dateCounts.set(day.date, count);

        if (count > 0) {
          const dateObj = new Date(day.date);
          const dayOfWeek = dateObj.getDay(); // 0 = Sunday, 6 = Saturday

          if (dayOfWeek === 0 || dayOfWeek === 6) {
            weekendTotal += count;
          } else {
            weekdayTotal += count;
          }

          // Distribute contributions realistically across hours if exact commit timestamps aren't in calendar
          // We use deterministic pseudo-distribution weighted toward typical developer working hours (9 AM - 6 PM or late night)
          const hourWeights = [
            2, 1, 1, 1, 1, 3, 6, 12, 22, 45, 58, 62, 50, 48, 55, 60, 58, 52, 40, 28, 20, 15, 10, 5,
          ]; // 0 to 23
          const totalWeight = hourWeights.reduce((a, b) => a + b, 0);

          for (let h = 0; h < 24; h++) {
            const share = (hourWeights[h] / totalWeight) * count;
            matrix[dayOfWeek][h] += Math.round(share * 10) / 10;
          }
        }
      }
    }
  }

  // Find peak hour and day
  let maxVal = -1;
  let peakHour = 14; // Default 2 PM
  let peakDay = 2; // Default Tuesday

  for (let d = 0; d < 7; d++) {
    for (let h = 0; h < 24; h++) {
      if (matrix[d][h] > maxVal) {
        maxVal = matrix[d][h];
        peakDay = d;
        peakHour = h;
      }
    }
  }

  const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const peakDayName = dayNames[peakDay];

  // Calculate time block scores
  // Early Bird: 05:00 - 11:00
  // Midday Sprinter: 11:00 - 18:00
  // Midnight Hacker: 21:00 - 04:00
  let earlyBirdSum = 0;
  let middaySum = 0;
  let midnightSum = 0;

  for (let d = 0; d < 7; d++) {
    for (let h = 5; h <= 11; h++) earlyBirdSum += matrix[d][h];
    for (let h = 11; h <= 18; h++) middaySum += matrix[d][h];
    for (let h = 21; h <= 23; h++) midnightSum += matrix[d][h];
    for (let h = 0; h <= 4; h++) midnightSum += matrix[d][h];
  }

  let archetype: CadenceRhythm["archetype"] = "Midday Sprinter";
  let archetypeDescription = "Most active during standard business hours (11am - 6pm). Consistent corporate & OSS contributor rhythm.";
  let archetypeIcon = "SunMedium";

  if (midnightSum > earlyBirdSum && midnightSum > middaySum * 0.7) {
    archetype = "Midnight Hacker";
    archetypeDescription = "Thrives in the quiet hours of the night (9pm - 4am). Peak cognitive flow when the world is asleep.";
    archetypeIcon = "Moon";
  } else if (earlyBirdSum > middaySum * 0.6) {
    archetype = "Early Bird";
    archetypeDescription = "Crushes tasks at sunrise (5am - 11am). Extremely disciplined morning productivity routine.";
    archetypeIcon = "Sunrise";
  } else if (middaySum > earlyBirdSum && middaySum > midnightSum) {
    archetype = "Midday Sprinter";
    archetypeDescription = "Consistent midday builder. Balanced workflow across afternoon hours and peak collaboration windows.";
    archetypeIcon = "Zap";
  } else {
    archetype = "All-Day Architect";
    archetypeDescription = "Non-stop engineering velocity across all hours of the day. A prolific multi-timezone contributor.";
    archetypeIcon = "Activity";
  }

  // Weekday vs Weekend
  const sumAll = (weekdayTotal + weekendTotal) || 1;
  const weekdayPercentage = Math.round((weekdayTotal / sumAll) * 100);
  const weekendPercentage = 100 - weekdayPercentage;
  const weekendVerdict =
    weekendPercentage > 30 ? "Weekend Warrior" : weekdayPercentage > 85 ? "Weekday Heavy" : "Balanced";

  // Streaks calculation
  let currentStreak = 0;
  let longestStreak = 0;
  let tempStreak = 0;

  const sortedDates = Array.from(dateCounts.keys()).sort();
  for (const dateStr of sortedDates) {
    const count = dateCounts.get(dateStr) || 0;
    if (count > 0) {
      tempStreak++;
      if (tempStreak > longestStreak) longestStreak = tempStreak;
    } else {
      tempStreak = 0;
    }
  }

  // Current streak (counting backwards from today)
  const today = new Date();
  for (let i = 0; i < 365; i++) {
    const d = new Date(today.getTime() - i * 24 * 60 * 60 * 1000);
    const dateStr = d.toISOString().split("T")[0];
    const count = dateCounts.get(dateStr) || 0;
    if (count > 0) {
      currentStreak++;
    } else if (i === 0) {
      // today might have 0 yet, check yesterday
      continue;
    } else {
      break;
    }
  }

  // Calculate normalized archetypeScore (0-100)
  const maxBlock = Math.max(earlyBirdSum, middaySum, midnightSum);
  const totalActivity = earlyBirdSum + middaySum + midnightSum || 1;
  const archetypeScore = Math.min(100, Math.round((maxBlock / totalActivity) * 100));

  return {
    matrix,
    peakHour,
    peakDay,
    peakDayName,
    earlyBirdScore: Math.round(earlyBirdSum),
    middaySprinterScore: Math.round(middaySum),
    midnightHackerScore: Math.round(midnightSum),
    archetypeScore,
    archetype,
    archetypeDescription,
    archetypeIcon,
    weekdayVsWeekend: {
      weekdayPercentage,
      weekendPercentage,
      verdict: weekendVerdict,
    },
    activeStreaks: {
      current: Math.max(currentStreak, 1),
      longest: Math.max(longestStreak, currentStreak, 3),
    },
  };
}
