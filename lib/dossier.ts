import { GitHubUser, DeveloperDossier } from "./types";
import { calculatePercentile } from "./analytics/percentile";
import { analyzeCadence } from "./analytics/cadence";
import { auditAllRepositories } from "./analytics/health";
import { aggregateLanguages } from "./analytics/languages";

export function buildDeveloperDossier(
  user: GitHubUser,
  isCached: boolean = false
): DeveloperDossier {
  const repos = user.repositories?.nodes || [];
  const calendar = user.contributionsCollection?.contributionCalendar;

  // Calculate totals
  const totalStars = repos.reduce((acc, r) => acc + (r.stargazerCount || 0), 0);
  const totalForks = repos.reduce((acc, r) => acc + (r.forkCount || 0), 0);

  const totalLastYear = calendar?.totalContributions || 0;
  const commits = user.contributionsCollection?.totalCommitContributions || Math.floor(totalLastYear * 0.8);
  const pullRequests = user.contributionsCollection?.totalPullRequestContributions || user.pullRequests?.totalCount || 0;
  const reviews = user.contributionsCollection?.totalPullRequestReviewContributions || 0;
  const issues = user.contributionsCollection?.totalIssueContributions || 0;

  // Run analytics engines
  const cadence = analyzeCadence(calendar);
  const percentile = calculatePercentile({
    yearlyContributions: totalLastYear,
    totalStars,
    totalRepos: repos.length,
    followers: user.followers?.totalCount || 0,
    longestStreak: cadence.activeStreaks.longest,
  });
  const { auditedRepos, averageHealthScore } = auditAllRepositories(repos);
  const languages = aggregateLanguages(repos);

  return {
    user: {
      login: user.login,
      name: user.name || user.login,
      avatarUrl: user.avatarUrl,
      bio: user.bio || "Full-stack builder crafting high-impact open source.",
      company: user.company,
      location: user.location,
      twitterUsername: user.twitterUsername,
      websiteUrl: user.websiteUrl,
      createdAt: user.createdAt,
      followersCount: user.followers?.totalCount || 0,
      followingCount: user.following?.totalCount || 0,
      publicReposCount: repos.length,
      totalStars,
      totalForks,
    },
    contributions: {
      totalLastYear,
      commits,
      pullRequests,
      reviews,
      issues,
      calendar: calendar || { totalContributions: 0, weeks: [] },
    },
    percentile,
    cadence,
    languages,
    topRepos: auditedRepos.slice(0, 12),
    averageRepoHealth: averageHealthScore,
    fetchedAt: new Date().toISOString(),
    isCached,
  };
}
