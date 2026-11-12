import { DeveloperDossier, ComparisonResult } from "../types";
import { calculatePercentile } from "./percentile";
import { auditAllRepositories } from "./health";
import { aggregateLanguages } from "./languages";

/**
 * Developer-vs-Developer Comparison Engine
 */
export function compareDevelopers(dev1: DeveloperDossier, dev2: DeveloperDossier): ComparisonResult {
  // Determine winners per category based on raw numbers (higher is better)
  const winners = {
    commits: dev1.contributions.commits > dev2.contributions.commits ? dev1.user.login : dev2.user.login,
    stars: dev1.user.totalStars > dev2.user.totalStars ? dev1.user.login : dev2.user.login,
    percentile: dev1.percentile.percentileRank < dev2.percentile.percentileRank ? dev1.user.login : dev2.user.login,
    consistency: dev1.cadence.archetypeScore > dev2.cadence.archetypeScore ? dev1.user.login : dev2.user.login,
    health: dev1.averageRepoHealth > dev2.averageRepoHealth ? dev1.user.login : dev2.user.login,
    versatility: dev1.languages.length > dev2.languages.length ? dev1.user.login : dev2.user.login,
  } as Record<string, string>;

  // Overall leader (most categories won)
  const tally: Record<string, number> = { [dev1.user.login]: 0, [dev2.user.login]: 0 };
  Object.values(winners).forEach((login) => {
    tally[login] = (tally[login] || 0) + 1;
  });

  const overallLeader = tally[dev1.user.login] >= tally[dev2.user.login] ? dev1.user.login : dev2.user.login;

  // Radar data for Chart.js / Recharts
  const radarData = [
    { category: "Commits", [dev1.user.login]: dev1.contributions.commits, [dev2.user.login]: dev2.contributions.commits },
    { category: "Stars", [dev1.user.login]: dev1.user.totalStars, [dev2.user.login]: dev2.user.totalStars },
    { category: "Consistency", [dev1.user.login]: dev1.cadence.archetypeScore, [dev2.user.login]: dev2.cadence.archetypeScore },
    { category: "Health", [dev1.user.login]: dev1.averageRepoHealth, [dev2.user.login]: dev2.averageRepoHealth },
    { category: "Versatility", [dev1.user.login]: dev1.languages.length, [dev2.user.login]: dev2.languages.length },
  ];

  return {
    dev1,
    dev2,
    winnerPerCategory: {
      commits: winners.commits,
      stars: winners.stars,
      percentile: winners.percentile,
      consistency: winners.consistency,
      health: winners.health,
      versatility: winners.versatility,
    },
    overallLeader,
    radarData,
  };
}
