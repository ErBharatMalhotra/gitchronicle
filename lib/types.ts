export interface GitHubUser {
  login: string;
  name: string | null;
  avatarUrl: string;
  bio: string | null;
  company: string | null;
  location: string | null;
  twitterUsername: string | null;
  websiteUrl: string | null;
  createdAt: string;
  followers: { totalCount: number };
  following: { totalCount: number };
  repositories: {
    nodes: GitHubRepositoryNode[];
  };
  contributionsCollection: {
    totalCommitContributions: number;
    totalPullRequestContributions: number;
    totalIssueContributions: number;
    totalPullRequestReviewContributions: number;
    contributionCalendar: ContributionCalendar;
  };
  pullRequests: {
    totalCount: number;
    nodes: Array<{
      state: "OPEN" | "CLOSED" | "MERGED";
      createdAt: string;
      mergedAt: string | null;
    }>;
  };
}

export interface GitHubRepositoryNode {
  name: string;
  description: string | null;
  url: string;
  stargazerCount: number;
  forkCount: number;
  primaryLanguage: {
    name: string;
    color: string;
  } | null;
  languages?: {
    edges: Array<{
      size: number;
      node: {
        name: string;
        color: string;
      };
    }>;
  };
  hasIssuesEnabled: boolean;
  licenseInfo: {
    spdxId: string | null;
    name: string | null;
  } | null;
  openIssues?: { totalCount: number };
  closedIssues?: { totalCount: number };
  pushedAt: string;
  updatedAt: string;
  isArchived: boolean;
  defaultBranchRef?: {
    target?: {
      history?: {
        totalCount: number;
        nodes?: Array<{ committedDate: string }>;
      };
    };
  } | null;
}

export interface ContributionCalendar {
  totalContributions: number;
  weeks: Array<{
    contributionDays: Array<{
      date: string;
      contributionCount: number;
      weekday: number;
      color?: string;
    }>;
  }>;
}

export interface PercentileResult {
  percentileRank: number; // e.g. 1.8 meaning top 1.8%
  percentileScore: number; // e.g. 98.2 (100 - percentileRank)
  tier: "Top 1%" | "Top 5%" | "Top 15%" | "Top 35%" | "Top 50%" | "Developing";
  badgeName: string; // e.g. "Apex Committer", "Grandmaster", "Vanguard"
  badgeColor: string;
  badgeGradient: string;
  starsPercentile: number;
  commitsPercentile: number;
  consistencyPercentile: number;
  summary: string;
}

export interface CadenceRhythm {
  matrix: number[][]; // 7 days (Sun-Sat) x 24 hours (0-23)
  peakHour: number;
  peakDay: number;
  peakDayName: string;
  earlyBirdScore: number; // 05:00 - 11:00
  middaySprinterScore: number; // 11:00 - 18:00
  midnightHackerScore: number; // 21:00 - 04:00
  archetypeScore: number; // 0-100 normalized archetype strength
  archetype: "Early Bird" | "Midday Sprinter" | "Midnight Hacker" | "All-Day Architect";
  archetypeDescription: string;
  archetypeIcon: string;
  weekdayVsWeekend: {
    weekdayPercentage: number;
    weekendPercentage: number;
    verdict: "Weekday Heavy" | "Weekend Warrior" | "Balanced";
  };
  activeStreaks: {
    current: number;
    longest: number;
  };
}

export interface RepoHealthItem {
  name: string;
  url: string;
  stars: number;
  forks: number;
  language: string | null;
  languageColor: string;
  overallScore: number; // 0-100
  grade: "A+" | "A" | "B" | "C" | "D";
  status: "Excellent" | "Good" | "Fair" | "Needs Attention";
  hasLicense: boolean;
  licenseName: string | null;
  hasRecentActivity: boolean;
  daysSinceLastPush: number;
  issueResolutionVelocity: number; // 0-100%
  openIssuesCount: number;
  closedIssuesCount: number;
  recommendations: string[];
}

export interface LanguageStat {
  name: string;
  color: string;
  bytes: number;
  percentage: number;
  repoCount: number;
}

export interface DeveloperDossier {
  user: {
    login: string;
    name: string;
    avatarUrl: string;
    bio: string;
    company: string | null;
    location: string | null;
    twitterUsername: string | null;
    websiteUrl: string | null;
    createdAt: string;
    followersCount: number;
    followingCount: number;
    publicReposCount: number;
    totalStars: number;
    totalForks: number;
  };
  contributions: {
    totalLastYear: number;
    commits: number;
    pullRequests: number;
    reviews: number;
    issues: number;
    calendar: ContributionCalendar;
  };
  percentile: PercentileResult;
  cadence: CadenceRhythm;
  languages: LanguageStat[];
  topRepos: RepoHealthItem[];
  averageRepoHealth: number;
  fetchedAt: string;
  isCached: boolean;
}

export interface ComparisonResult {
  dev1: DeveloperDossier;
  dev2: DeveloperDossier;
  winnerPerCategory: {
    commits: string;
    stars: string;
    percentile: string;
    consistency: string;
    health: string;
    versatility: string;
  };
  overallLeader: string;
  radarData: Array<{
    category: string;
    [dev1Login: string]: number | string;
  }>;
}
