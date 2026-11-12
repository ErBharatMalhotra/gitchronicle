import Link from "next/link";
import { SearchInput } from "@/components/SearchInput";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Sparkles, Zap, ShieldCheck, Award, GitBranch, ArrowRight, ExternalLink } from "lucide-react";

export default function Home() {
  const trendingDevs = [
    { login: "ErBharatMalhotra", role: "Creator & Architect", tier: "Top 1%", color: "#ffd700" },
    { login: "shadcn", role: "UI / Design Systems", tier: "Top 1%", color: "#ffd700" },
    { login: "leerob", role: "Vercel VP of DX", tier: "Top 1%", color: "#ffd700" },
    { login: "torvalds", role: "Linux & Git Creator", tier: "Top 1%", color: "#ffd700" },
    { login: "sindresorhus", role: "OSS Luminary", tier: "Top 1%", color: "#ffd700" },
    { login: "tj", role: "Apex Creator", tier: "Top 1%", color: "#ffd700" },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#0d1117] text-[#e6edf3]">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative pt-20 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
          {/* Ambient Glowing Blobs */}
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-[#58a6ff]/20 via-[#a371f7]/25 to-[#f778ba]/15 blur-[120px] pointer-events-none rounded-full" />

          <div className="max-w-4xl mx-auto text-center relative z-10 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#161b22] border border-[#30363d] text-xs font-medium text-[#58a6ff]">
              <Sparkles className="h-3.5 w-3.5 text-[#e6b450]" />
              <span>Free, Open-Source Real-Time Developer Intelligence Dashboard</span>
            </div>

            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white text-balance">
              Measure Your{" "}
              <span className="bg-gradient-to-r from-[#58a6ff] via-[#a371f7] to-[#f778ba] bg-clip-text text-transparent">
                Developer DNA
              </span>
            </h1>

            <p className="text-base sm:text-lg text-[#8b949e] max-w-2xl mx-auto text-balance leading-relaxed">
              Global percentile benchmarks, work cadence rhythm heatmaps, and automated repository health audits.
              Zero setup required. Enter any GitHub handle to inspect instantly.
            </p>

            {/* Search Component */}
            <div className="pt-4">
              <SearchInput />
            </div>
          </div>
        </section>

        {/* Trending / Featured Developer Dossiers */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-[#30363d]/60">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
            <div>
              <h2 className="text-xl font-bold text-white tracking-tight">
                Featured Developer Dossiers
              </h2>
              <p className="text-xs text-[#8b949e] mt-0.5">
                Inspect live global benchmark scores for top open-source luminaries.
              </p>
            </div>
            <Link
              href="/compare"
              className="flex items-center gap-2 text-xs font-semibold text-[#58a6ff] hover:underline"
            >
              <span>Compare any two developers</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {trendingDevs.map((dev) => (
              <Link
                key={dev.login}
                href={`/u/${dev.login}`}
                className="group p-5 rounded-xl bg-[#161b22] hover:bg-[#21262d] border border-[#30363d] hover:border-[#58a6ff]/50 transition-all duration-300 shadow-lg flex items-center justify-between"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-12 h-12 rounded-xl bg-[#0d1117] border border-[#30363d] overflow-hidden flex-shrink-0 group-hover:scale-105 transition-transform">
                    <img
                      src={`https://avatars.githubusercontent.com/${dev.login}?v=4`}
                      alt={dev.login}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white group-hover:text-[#58a6ff] transition-colors">
                      @{dev.login}
                    </h3>
                    <p className="text-[11px] text-[#8b949e]">{dev.role}</p>
                  </div>
                </div>

                <span
                  className="px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase"
                  style={{
                    backgroundColor: `${dev.color}20`,
                    color: dev.color,
                    border: `1px solid ${dev.color}40`,
                  }}
                >
                  {dev.tier}
                </span>
              </Link>
            ))}
          </div>
        </section>

        {/* Feature Highlights Grid */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-[#30363d]/60">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Engineered for Precision & Speed
            </h2>
            <p className="text-sm text-[#8b949e] mt-2">
              Everything you need to understand your developer profile, packaged in a zero-bloat web app.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-[#161b22] border border-[#30363d]">
              <div className="w-10 h-10 rounded-xl bg-[#58a6ff]/10 border border-[#58a6ff]/30 flex items-center justify-center text-[#58a6ff] mb-4">
                <Zap className="h-5 w-5" />
              </div>
              <h3 className="text-base font-bold text-white mb-2">1-Point GraphQL Query</h3>
              <p className="text-xs text-[#8b949e] leading-relaxed">
                Fetches your entire developer profile, top 50 repositories with issue metrics, and 365-day contribution calendar in a single rate-limit optimized API call.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#161b22] border border-[#30363d]">
              <div className="w-10 h-10 rounded-xl bg-[#a371f7]/10 border border-[#a371f7]/30 flex items-center justify-center text-[#a371f7] mb-4">
                <Award className="h-5 w-5" />
              </div>
              <h3 className="text-base font-bold text-white mb-2">Global Percentile Benchmarks</h3>
              <p className="text-xs text-[#8b949e] leading-relaxed">
                Statistically ranks your commit velocity, stars, and consistency against millions of global GitHub accounts to reveal your exact global percentile.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#161b22] border border-[#30363d]">
              <div className="w-10 h-10 rounded-xl bg-[#3fb950]/10 border border-[#3fb950]/30 flex items-center justify-center text-[#3fb950] mb-4">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <h3 className="text-base font-bold text-white mb-2">Repository Health Audits</h3>
              <p className="text-xs text-[#8b949e] leading-relaxed">
                Scores every repository from 0-100 based on license hygiene, activity recency, issue resolution speed, and documentation completeness.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
