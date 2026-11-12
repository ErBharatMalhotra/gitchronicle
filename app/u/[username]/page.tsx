import { Metadata } from "next";
import { notFound } from "next/navigation";
import { fetchDeveloperProfile } from "@/lib/github";
import { buildDeveloperDossier } from "@/lib/dossier";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ProfileHeader } from "@/components/ProfileHeader";
import { PercentileBadge } from "@/components/PercentileBadge";
import { ContributionHeatmap } from "@/components/ContributionHeatmap";
import { CadenceMatrix } from "@/components/CadenceMatrix";
import { LanguageRadar } from "@/components/LanguageRadar";
import { ActivityDistribution } from "@/components/ActivityDistribution";
import { RepoHealthCard } from "@/components/RepoHealthCard";
import { ConfettiTrigger } from "@/components/ConfettiTrigger";
import { BASE_URL } from "@/lib/utils";
import { ShieldCheck, Sparkles, Share2, Layers } from "lucide-react";

interface Props {
  params: Promise<{ username: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { username } = await params;
  const decodedUsername = decodeURIComponent(username);

  return {
    title: `${decodedUsername}'s Developer Dossier & Benchmark | GitChronicle`,
    description: `Inspect ${decodedUsername}'s GitHub percentile ranking, cadence rhythm matrix, repository health index, and developer DNA on GitChronicle.`,
    openGraph: {
      title: `${decodedUsername} - Top GitHub Developer Dossier | GitChronicle`,
      description: `Inspect ${decodedUsername}'s GitHub percentile ranking, cadence rhythm matrix, and developer DNA on GitChronicle.`,
      url: `${BASE_URL}/u/${decodedUsername}`,
      siteName: "GitChronicle",
      images: [
        {
          url: `${BASE_URL}/api/og?username=${encodeURIComponent(decodedUsername)}`,
          width: 1200,
          height: 630,
          alt: `${decodedUsername}'s GitChronicle Dossier`,
        },
      ],
      type: "profile",
    },
    twitter: {
      card: "summary_large_image",
      title: `${decodedUsername}'s Developer Dossier | GitChronicle`,
      description: `Inspect ${decodedUsername}'s GitHub percentile ranking, cadence rhythm matrix, and repository health on GitChronicle.`,
      images: [`${BASE_URL}/api/og?username=${encodeURIComponent(decodedUsername)}`],
    },
  };
}

export default async function UserDossierPage({ params }: Props) {
  const { username } = await params;
  const decodedUsername = decodeURIComponent(username);

  const profileData = await fetchDeveloperProfile(decodedUsername);

  if (!profileData || !profileData.user) {
    notFound();
  }

  const dossier = buildDeveloperDossier(profileData.user, profileData.isCached);

  return (
    <div className="min-h-screen flex flex-col bg-[#0d1117] text-[#e6edf3]">
      <Header />
      <ConfettiTrigger tier={dossier.percentile.tier} />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Profile Hero Header */}
        <ProfileHeader dossier={dossier} />

        {/* Global Percentile Benchmark Card */}
        <PercentileBadge
          percentile={dossier.percentile}
          username={dossier.user.login}
        />

        {/* 365-Day Contribution Calendar Heatmap */}
        <ContributionHeatmap calendar={dossier.contributions.calendar} />

        {/* Two-Column Analytics Engine Section: Rhythm Matrix & Language Mastery */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <CadenceMatrix cadence={dossier.cadence} />
          <LanguageRadar languages={dossier.languages} />
        </div>

        {/* Activity Distribution */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <ActivityDistribution contributions={dossier.contributions} />
          </div>

          {/* Repo Health Overview Banner */}
          <div className="lg:col-span-2 p-6 rounded-2xl bg-[#161b22] border border-[#30363d] shadow-xl flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="h-5 w-5 text-[#3fb950]" />
                  <h3 className="text-base font-bold text-white">
                    Repository Health Index
                  </h3>
                </div>
                <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-[#3fb950]/20 text-[#3fb950] border border-[#3fb950]/30">
                  Average Score: {dossier.averageRepoHealth}/100
                </span>
              </div>
              <p className="text-xs text-[#8b949e] leading-relaxed mb-4">
                Automated hygiene assessment of public repositories evaluated across 5 dimensions:
                license validity, commit recency in past 90 days, issue triage velocity, project documentation, and community traction.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3 border-t border-[#30363d]">
              <div className="p-3 rounded-xl bg-[#0d1117] text-center border border-[#21262d]">
                <p className="text-[10px] text-[#8b949e]">Audited Repos</p>
                <p className="text-sm font-bold text-[#e6edf3] font-mono mt-0.5">
                  {dossier.topRepos.length}
                </p>
              </div>
              <div className="p-3 rounded-xl bg-[#0d1117] text-center border border-[#21262d]">
                <p className="text-[10px] text-[#8b949e]">Licensed</p>
                <p className="text-sm font-bold text-[#3fb950] font-mono mt-0.5">
                  {dossier.topRepos.filter((r) => r.hasLicense).length} / {dossier.topRepos.length}
                </p>
              </div>
              <div className="p-3 rounded-xl bg-[#0d1117] text-center border border-[#21262d]">
                <p className="text-[10px] text-[#8b949e]">Active (&lt;90d)</p>
                <p className="text-sm font-bold text-[#58a6ff] font-mono mt-0.5">
                  {dossier.topRepos.filter((r) => r.hasRecentActivity).length}
                </p>
              </div>
              <div className="p-3 rounded-xl bg-[#0d1117] text-center border border-[#21262d]">
                <p className="text-[10px] text-[#8b949e]">High Grade (A/A+)</p>
                <p className="text-sm font-bold text-[#e6b450] font-mono mt-0.5">
                  {dossier.topRepos.filter((r) => r.grade === "A+" || r.grade === "A").length}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Top Repositories Grid */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
              <Layers className="h-4 w-4 text-[#58a6ff]" />
              Repository Health Scorecards
            </h3>
            <span className="text-xs text-[#8b949e]">
              Showing top {dossier.topRepos.length} repos by stars
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {dossier.topRepos.map((repo) => (
              <RepoHealthCard key={repo.name} repo={repo} />
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
