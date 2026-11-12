import { GitHubUser } from "./types";
import { cache } from "./cache";
import { generateMockProfile } from "./mock-data";

const GITHUB_GRAPHQL_URL = "https://api.github.com/graphql";
const CACHE_KEY_PREFIX = "gc:profile:";
const CACHE_TTL_MS = 6 * 60 * 60 * 1000; // 6 hours

/**
 * Unified GraphQL Query — Rate-Limit Cost: 1 Point
 * Fetches full profile, top 50 repos (with languages, issues, license, activity),
 * complete contribution calendar, and PR data in a single call.
 */
const DEVELOPER_DOSSIER_QUERY = `
query GetUserDeveloperDossier($login: String!) {
  user(login: $login) {
    login
    name
    avatarUrl
    bio
    company
    location
    twitterUsername
    websiteUrl
    createdAt
    followers { totalCount }
    following { totalCount }
    repositories(
      first: 50
      orderBy: { field: STARGAZERS, direction: DESC }
      isFork: false
      ownerAffiliations: OWNER
    ) {
      nodes {
        name
        description
        url
        stargazerCount
        forkCount
        primaryLanguage { name color }
        languages(first: 10, orderBy: { field: SIZE, direction: DESC }) {
          edges {
            size
            node { name color }
          }
        }
        hasIssuesEnabled
        licenseInfo { spdxId name }
        openIssues: issues(states: OPEN) { totalCount }
        closedIssues: issues(states: CLOSED) { totalCount }
        pushedAt
        updatedAt
        isArchived
        defaultBranchRef {
          target {
            ... on Commit {
              history(first: 1) {
                totalCount
                nodes { committedDate }
              }
            }
          }
        }
      }
    }
    contributionsCollection {
      totalCommitContributions
      totalPullRequestContributions
      totalIssueContributions
      totalPullRequestReviewContributions
      contributionCalendar {
        totalContributions
        weeks {
          contributionDays {
            date
            contributionCount
            weekday
            color
          }
        }
      }
    }
    pullRequests(first: 20, orderBy: { field: CREATED_AT, direction: DESC }) {
      totalCount
      nodes {
        state
        createdAt
        mergedAt
      }
    }
  }
}
`;

function getGitHubToken(): string | null {
  return process.env.GITHUB_TOKEN || process.env.GH_TOKEN || null;
}

interface GraphQLResponse {
  data?: { user?: GitHubUser };
  errors?: Array<{ message: string; type: string }>;
  message?: string;
}

async function fetchGitHubGraphQL(login: string): Promise<GitHubUser | null> {
  const token = getGitHubToken();

  if (!token) {
    console.warn(
      "[GitChronicle] No GITHUB_TOKEN or GH_TOKEN set. Using mock data for:",
      login
    );
    return null;
  }

  try {
    const response = await fetch(GITHUB_GRAPHQL_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        "User-Agent": "GitChronicle/1.0",
      },
      body: JSON.stringify({
        query: DEVELOPER_DOSSIER_QUERY,
        variables: { login },
      }),
      cache: "no-store",
    });

    if (!response.ok) {
      console.error(
        `[GitChronicle] GitHub API responded with ${response.status}: ${response.statusText}`
      );
      return null;
    }

    const json: GraphQLResponse = await response.json();

    if (json.errors) {
      const notFound = json.errors.some((e) => e.type === "NOT_FOUND");
      if (notFound) {
        return null;
      }
      console.error("[GitChronicle] GraphQL errors:", json.errors);
      return null;
    }

    if (!json.data?.user) {
      return null;
    }

    return json.data.user;
  } catch (error) {
    console.error("[GitChronicle] GitHub API fetch error:", error);
    return null;
  }
}

export async function fetchDeveloperProfile(
  login: string
): Promise<{ user: GitHubUser; isCached: boolean; isMock: boolean }> {
  const cacheKey = `${CACHE_KEY_PREFIX}${login.toLowerCase()}`;

  // 1. Check cache first
  const cached = await cache.get<GitHubUser>(cacheKey);
  if (cached.data && !cached.isStale) {
    return { user: cached.data, isCached: true, isMock: false };
  }

  // 2. Attempt live GitHub API fetch
  const liveUser = await fetchGitHubGraphQL(login);

  if (liveUser) {
    // Warm the cache for next requests
    await cache.set(cacheKey, liveUser, CACHE_TTL_MS);
    return { user: liveUser, isCached: false, isMock: false };
  }

  // 3. If stale cache exists, serve it
  if (cached.data) {
    return { user: cached.data, isCached: true, isMock: false };
  }

  // 4. Fallback to mock data (resilient mode)
  const mockUser = generateMockProfile(login);
  return { user: mockUser, isCached: false, isMock: true };
}
