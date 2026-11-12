import { GitHubRepositoryNode, RepoHealthItem } from "../types";

/**
 * Repository Health Auditor
 * Evaluates open-source health and hygiene (0 - 100)
 */

export function auditRepositoryHealth(repo: GitHubRepositoryNode): RepoHealthItem {
  let score = 0;
  const recommendations: string[] = [];

  // 1. License Check (+25 pts)
  const hasLicense = !!repo.licenseInfo?.spdxId;
  const licenseName = repo.licenseInfo?.name || repo.licenseInfo?.spdxId || null;
  if (hasLicense) {
    score += 25;
  } else {
    recommendations.push("Add an open-source license (e.g. MIT, Apache-2.0) to clarify reuse rights.");
  }

  // 2. Freshness & Recency (+25 pts)
  const lastPushDate = repo.pushedAt ? new Date(repo.pushedAt) : new Date(0);
  const now = new Date();
  const daysSinceLastPush = Math.max(
    0,
    Math.floor((now.getTime() - lastPushDate.getTime()) / (1000 * 60 * 60 * 24))
  );

  const hasRecentActivity = daysSinceLastPush <= 90;
  if (daysSinceLastPush <= 30) {
    score += 25;
  } else if (daysSinceLastPush <= 90) {
    score += 18;
  } else if (daysSinceLastPush <= 180) {
    score += 10;
    recommendations.push("Repository is becoming dormant (no commits in >90 days). Push an update or add maintenance status.");
  } else {
    score += 3;
    recommendations.push("Inactive for >6 months. Consider archiving if no longer maintained.");
  }

  // 3. Issue Resolution Velocity (+20 pts)
  const openIssues = repo.openIssues?.totalCount || 0;
  const closedIssues = repo.closedIssues?.totalCount || 0;
  const totalIssues = openIssues + closedIssues;

  let issueVelocity = 100;
  if (totalIssues > 0) {
    issueVelocity = Math.round((closedIssues / totalIssues) * 100);
    if (issueVelocity >= 80) {
      score += 20;
    } else if (issueVelocity >= 50) {
      score += 14;
    } else {
      score += 8;
      recommendations.push(`High backlog: ${openIssues} open issues vs ${closedIssues} closed. Triage pending issues.`);
    }
  } else {
    // If no issues exist, award partial credit
    score += 16;
  }

  // 4. Documentation & Metadata (+15 pts)
  const hasDescription = !!repo.description && repo.description.trim().length > 10;
  const hasLanguage = !!repo.primaryLanguage?.name;

  if (hasDescription && hasLanguage) {
    score += 15;
  } else if (hasDescription || hasLanguage) {
    score += 8;
    if (!hasDescription) {
      recommendations.push("Add a repository description and tags for better search discovery.");
    }
  } else {
    recommendations.push("Missing repository description. Explain what this project does!");
  }

  // 5. Community & Stars (+15 pts)
  const stars = repo.stargazerCount || 0;
  const forks = repo.forkCount || 0;

  if (stars >= 50 || forks >= 10) {
    score += 15;
  } else if (stars >= 10 || forks >= 2) {
    score += 10;
  } else if (stars >= 1) {
    score += 6;
  } else {
    score += 2;
  }

  // Clamp 0 - 100
  const overallScore = Math.min(100, Math.max(0, Math.round(score)));

  // Grade & Status
  let grade: RepoHealthItem["grade"] = "B";
  let status: RepoHealthItem["status"] = "Good";

  if (overallScore >= 90) {
    grade = "A+";
    status = "Excellent";
  } else if (overallScore >= 80) {
    grade = "A";
    status = "Excellent";
  } else if (overallScore >= 65) {
    grade = "B";
    status = "Good";
  } else if (overallScore >= 50) {
    grade = "C";
    status = "Fair";
  } else {
    grade = "D";
    status = "Needs Attention";
  }

  return {
    name: repo.name,
    url: repo.url || `https://github.com/${repo.name}`,
    stars,
    forks,
    language: repo.primaryLanguage?.name || "Plain Text",
    languageColor: repo.primaryLanguage?.color || "#8b949e",
    overallScore,
    grade,
    status,
    hasLicense,
    licenseName,
    hasRecentActivity,
    daysSinceLastPush,
    issueResolutionVelocity: issueVelocity,
    openIssuesCount: openIssues,
    closedIssuesCount: closedIssues,
    recommendations,
  };
}

export function auditAllRepositories(repos: GitHubRepositoryNode[]): {
  auditedRepos: RepoHealthItem[];
  averageHealthScore: number;
} {
  if (!repos || repos.length === 0) {
    return { auditedRepos: [], averageHealthScore: 70 };
  }

  const auditedRepos = repos.map(auditRepositoryHealth);
  const totalScore = auditedRepos.reduce((acc, r) => acc + r.overallScore, 0);
  const averageHealthScore = Math.round(totalScore / auditedRepos.length);

  return {
    auditedRepos,
    averageHealthScore,
  };
}
