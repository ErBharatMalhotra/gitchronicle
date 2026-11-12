import { GitHubRepositoryNode, LanguageStat } from "../types";

const FALLBACK_LANG_COLORS: Record<string, string> = {
  TypeScript: "#3178c6",
  JavaScript: "#f1e05a",
  Python: "#3572A5",
  Rust: "#dea584",
  Go: "#00ADD8",
  Java: "#b07219",
  "C++": "#f34b7d",
  C: "#555555",
  "C#": "#178600",
  Ruby: "#701516",
  PHP: "#4F5D95",
  Swift: "#F05138",
  Kotlin: "#A97BFF",
  HTML: "#e34c26",
  CSS: "#563d7c",
  Vue: "#41b883",
  Svelte: "#ff3e00",
  Shell: "#89e051",
  Dart: "#00B4AB",
  Lua: "#000080",
};

export function aggregateLanguages(repos: GitHubRepositoryNode[]): LanguageStat[] {
  const byteMap: Map<string, { bytes: number; color: string; repoCount: number }> = new Map();

  for (const repo of repos) {
    if (repo.languages?.edges && repo.languages.edges.length > 0) {
      for (const edge of repo.languages.edges) {
        const name = edge.node.name;
        const color = edge.node.color || FALLBACK_LANG_COLORS[name] || "#8b949e";
        const current = byteMap.get(name) || { bytes: 0, color, repoCount: 0 };
        current.bytes += edge.size;
        current.repoCount += 1;
        byteMap.set(name, current);
      }
    } else if (repo.primaryLanguage) {
      const name = repo.primaryLanguage.name;
      const color = repo.primaryLanguage.color || FALLBACK_LANG_COLORS[name] || "#8b949e";
      const current = byteMap.get(name) || { bytes: 0, color, repoCount: 0 };
      current.bytes += 50000; // Estimated baseline
      current.repoCount += 1;
      byteMap.set(name, current);
    }
  }

  const totalBytes = Array.from(byteMap.values()).reduce((sum, item) => sum + item.bytes, 0) || 1;

  const result: LanguageStat[] = Array.from(byteMap.entries())
    .map(([name, data]) => ({
      name,
      color: data.color,
      bytes: data.bytes,
      percentage: parseFloat(((data.bytes / totalBytes) * 100).toFixed(1)),
      repoCount: data.repoCount,
    }))
    .sort((a, b) => b.bytes - a.bytes)
    .slice(0, 8); // Top 8 languages

  return result;
}
