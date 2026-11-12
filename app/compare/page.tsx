import { Metadata } from "next";
import { fetchDeveloperProfile } from "@/lib/github";
import { buildDeveloperDossier } from "@/lib/dossier";
import { compareDevelopers } from "@/lib/analytics/comparator";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CompareView } from "@/components/CompareView";
import { Users, ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";

interface Props {
  searchParams: Promise<{ u1?: string; u2?: string }>;
}

export const metadata: Metadata = {
  title: "Dev vs Dev Comparison Matrix",
  description: "Compare two GitHub developers side-by-side: commit volume, global percentile ranking, repository health, and cadence rhythms.",
};

const COMPARISON_MATCHUPS = [
  { u1: "ErBharatMalhotra", u2: "shadcn" },
  { u1: "shadcn", u2: "leerob" },
  { u1: "torvalds", u2: "tj" },
];

export default async function ComparePage({ searchParams }: Props) {
  const params = await searchParams;
  const u1 = (params.u1 || "ErBharatMalhotra").trim();
  const u2 = (params.u2 || "shadcn").trim();

  const [profile1, profile2] = await Promise.all([
    fetchDeveloperProfile(u1),
    fetchDeveloperProfile(u2),
  ]);

  const dossier1 = buildDeveloperDossier(profile1.user, profile1.isCached);
  const dossier2 = buildDeveloperDossier(profile2.user, profile2.isCached);
  const comparison = compareDevelopers(dossier1, dossier2);

  return (
    <div className="min-h-screen flex flex-col bg-[#0d1117] text-[#e6edf3]">
      <Header />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Title */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#161b22] border border-[#30363d] text-xs font-semibold text-[#a371f7]">
            <Users className="h-3.5 w-3.5" /> Dev vs Dev Comparison Matrix
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Head-to-Head Developer Battle
          </h1>
          <p className="text-xs sm:text-sm text-[#8b949e]">
            Direct side-by-side benchmark across annual commits, stars, repository health index, and cadence consistency.
          </p>
        </div>

        {/* Input Selector Form */}
        <div className="max-w-xl mx-auto bg-[#161b22] p-4 rounded-2xl border border-[#30363d] shadow-lg">
          <form action="/compare" method="GET" className="flex flex-col sm:flex-row items-center gap-3">
            <div className="relative flex-1 w-full">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-mono text-[#6e7681]">@</span>
              <input
                type="text"
                name="u1"
                defaultValue={u1}
                placeholder="developer 1"
                className="w-full pl-7 pr-3 py-2 bg-[#0d1117] border border-[#30363d] rounded-lg text-xs font-mono text-white placeholder-[#6e7681] focus:outline-none focus:border-[#58a6ff]"
              />
            </div>

            <span className="text-xs font-bold text-[#8b949e] px-1">VS</span>

            <div className="relative flex-1 w-full">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-mono text-[#6e7681]">@</span>
              <input
                type="text"
                name="u2"
                defaultValue={u2}
                placeholder="developer 2"
                className="w-full pl-7 pr-3 py-2 bg-[#0d1117] border border-[#30363d] rounded-lg text-xs font-mono text-white placeholder-[#6e7681] focus:outline-none focus:border-[#a371f7]"
              />
            </div>

            <button
              type="submit"
              className="w-full sm:w-auto px-5 py-2 rounded-lg bg-gradient-to-r from-[#58a6ff] to-[#a371f7] text-[#0d1117] font-bold text-xs hover:opacity-90 transition-opacity shadow-md flex items-center justify-center gap-1.5"
            >
              <span>Battle</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </form>

          {/* Preset Matchups */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-3 pt-3 border-t border-[#21262d] text-xs">
            <span className="text-[11px] text-[#6e7681] flex items-center gap-1">
              <Sparkles className="h-3 w-3 text-[#e6b450]" /> Try popular:
            </span>
            {COMPARISON_MATCHUPS.map((matchup, idx) => (
              <Link
                key={idx}
                href={`/compare?u1=${matchup.u1}&u2=${matchup.u2}`}
                className="text-[11px] font-mono text-[#8b949e] hover:text-[#58a6ff] bg-[#0d1117] px-2 py-0.5 rounded border border-[#30363d]"
              >
                @{matchup.u1} vs @{matchup.u2}
              </Link>
            ))}
          </div>
        </div>

        {/* Comparison Render */}
        <CompareView comparison={comparison} />
      </main>

      <Footer />
    </div>
  );
}
