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

export default async function ComparePage({ searchParams }: Props) {
  const params = await searchParams;
  const u1 = (params.u1 || "ErBharatMalhotra").trim();
  const u2 = (params.u2 || "developer").trim();

  const [profile1, profile2] = await Promise.all([
    fetchDeveloperProfile(u1),
    fetchDeveloperProfile(u2),
  ]);

  const dossier1 = buildDeveloperDossier(profile1.user, profile1.isCached);
  const dossier2 = buildDeveloperDossier(profile2.user, profile2.isCached);
  const comparison = compareDevelopers(dossier1, dossier2);

  return (
    <div className="min-h-screen flex flex-col bg-[#090d16] text-[#f0f6fc]">
      <Header />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Title */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#161b22] border border-[#30363d] text-xs font-semibold text-[#bc8cff]">
            <Users className="h-3.5 w-3.5" /> Dev vs Dev Comparison Matrix
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Head-to-Head Developer Battle
          </h1>
          <p className="text-xs sm:text-sm text-[#8b949e]">
            Direct side-by-side benchmark across annual commits, stars, repository health index, and cadence consistency.
          </p>
        </div>

        {/* Input Selector Form */}
        <div className="max-w-xl mx-auto glass-panel p-5 border border-[#30363d] shadow-xl">
          <form action="/compare" method="GET" className="flex flex-col sm:flex-row items-center gap-3">
            <div className="relative flex-1 w-full">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-mono text-[#6e7681]">@</span>
              <input
                type="text"
                name="u1"
                defaultValue={u1}
                placeholder="developer 1"
                className="w-full pl-7 pr-3 py-2 bg-[#090d16] border border-[#30363d] rounded-lg text-xs font-mono text-white placeholder-[#6e7681] focus:outline-none focus:border-[#58a6ff]"
              />
            </div>

            <span className="text-xs font-bold text-[#8b949e] px-1">VS</span>

            <div className="relative flex-1 w-full">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-mono text-[#6e7681]">@</span>
              <input
                type="text"
                name="u2"
                defaultValue={u2 === "developer" ? "" : u2}
                placeholder="developer 2"
                className="w-full pl-7 pr-3 py-2 bg-[#090d16] border border-[#30363d] rounded-lg text-xs font-mono text-white placeholder-[#6e7681] focus:outline-none focus:border-[#bc8cff]"
              />
            </div>

            <button
              type="submit"
              className="w-full sm:w-auto px-5 py-2 rounded-lg bg-gradient-to-r from-[#58a6ff] to-[#bc8cff] text-[#090d16] font-bold text-xs hover:opacity-90 transition-opacity shadow-md flex items-center justify-center gap-1.5"
            >
              <span>Battle</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </form>
        </div>

        {/* Comparison Render */}
        <CompareView comparison={comparison} />
      </main>

      <Footer />
    </div>
  );
}
