import Link from "next/link";
import { SearchInput } from "@/components/SearchInput";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Sparkles, Zap, ShieldCheck, Award, ArrowRight, Activity, CalendarDays, Star, GitFork, Users, ExternalLink } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-[#090d16] text-[#f0f6fc]">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative pt-20 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
          {/* Ambient Glowing Blobs */}
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[380px] bg-gradient-to-tr from-[#58a6ff]/20 via-[#bc8cff]/25 to-[#f778ba]/15 blur-[120px] pointer-events-none rounded-full" />

          <div className="max-w-4xl mx-auto text-center relative z-10 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#161b22]/90 border border-[#30363d] text-xs font-semibold text-[#58a6ff] shadow-lg">
              <Sparkles className="h-3.5 w-3.5 text-[#ffd700]" />
              <span>Real-Time Developer Intelligence & Percentile Benchmark Observatory</span>
            </div>

            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white text-balance leading-tight">
              Measure Your{" "}
              <span className="bg-gradient-to-r from-[#58a6ff] via-[#bc8cff] to-[#f778ba] bg-clip-text text-transparent">
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

        {/* Featured Showcase: Creator Dossier Preview Card */}
        <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
          <div className="glass-panel p-6 sm:p-8 relative overflow-hidden border border-[#58a6ff]/30 shadow-2xl">
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#58a6ff]/10 rounded-full blur-3xl pointer-events-none" />

            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-6 border-b border-[#30363d]/80">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl overflow-hidden border-2 border-[#ffd700] shadow-lg shadow-[#ffd700]/20 flex-shrink-0">
                  <img
                    src="https://avatars.githubusercontent.com/ErBharatMalhotra?v=4"
                    alt="ErBharatMalhotra"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#ffd700] bg-[#ffd700]/15 px-2.5 py-0.5 rounded-full border border-[#ffd700]/30">
                      Featured Creator Dossier
                    </span>
                    <span className="text-xs text-[#8b949e] font-mono">@ErBharatMalhotra</span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-black text-white">
                    Bharat Malhotra
                  </h2>
                  <p className="text-xs text-[#8b949e]">
                    Full-Stack Engineer & Open-Source Architect · Creator of GitChronicle
                  </p>
                </div>
              </div>

              <Link
                href="/u/ErBharatMalhotra"
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#58a6ff] to-[#bc8cff] text-[#090d16] font-bold text-xs hover:opacity-95 transition-opacity shadow-lg shadow-[#58a6ff]/20 flex-shrink-0"
              >
                <span>View Full Live Dossier</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            {/* Quick Metrics Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 mt-6">
              <div className="p-3.5 rounded-xl bg-[#090d16]/70 border border-[#30363d] text-center">
                <span className="text-[10px] text-[#8b949e] font-medium flex items-center justify-center gap-1 mb-1">
                  <Award className="h-3.5 w-3.5 text-[#ffd700]" /> Global Benchmark
                </span>
                <p className="text-lg font-black text-[#ffd700] font-mono">Top 1%</p>
                <p className="text-[10px] text-[#8b949e]">Apex Committer</p>
              </div>

              <div className="p-3.5 rounded-xl bg-[#090d16]/70 border border-[#30363d] text-center">
                <span className="text-[10px] text-[#8b949e] font-medium flex items-center justify-center gap-1 mb-1">
                  <CalendarDays className="h-3.5 w-3.5 text-[#58a6ff]" /> Annual Activity
                </span>
                <p className="text-lg font-black text-[#58a6ff] font-mono">2,480+</p>
                <p className="text-[10px] text-[#8b949e]">Contributions</p>
              </div>

              <div className="p-3.5 rounded-xl bg-[#090d16]/70 border border-[#30363d] text-center">
                <span className="text-[10px] text-[#8b949e] font-medium flex items-center justify-center gap-1 mb-1">
                  <Activity className="h-3.5 w-3.5 text-[#bc8cff]" /> Cadence Rhythm
                </span>
                <p className="text-lg font-black text-[#bc8cff] font-mono">Midnight Hacker</p>
                <p className="text-[10px] text-[#8b949e]">Peak flow 9pm - 4am</p>
              </div>

              <div className="p-3.5 rounded-xl bg-[#090d16]/70 border border-[#30363d] text-center">
                <span className="text-[10px] text-[#8b949e] font-medium flex items-center justify-center gap-1 mb-1">
                  <ShieldCheck className="h-3.5 w-3.5 text-[#3fb950]" /> Repo Hygiene
                </span>
                <p className="text-lg font-black text-[#3fb950] font-mono">100 / 100</p>
                <p className="text-[10px] text-[#8b949e]">Grade A+ Health</p>
              </div>
            </div>
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
            <div className="glass-panel p-6">
              <div className="w-10 h-10 rounded-xl bg-[#58a6ff]/10 border border-[#58a6ff]/30 flex items-center justify-center text-[#58a6ff] mb-4">
                <Zap className="h-5 w-5" />
              </div>
              <h3 className="text-base font-bold text-white mb-2">1-Point GraphQL Query</h3>
              <p className="text-xs text-[#8b949e] leading-relaxed">
                Fetches your entire developer profile, top 50 repositories with issue metrics, and 365-day contribution calendar in a single rate-limit optimized API call.
              </p>
            </div>

            <div className="glass-panel p-6">
              <div className="w-10 h-10 rounded-xl bg-[#bc8cff]/10 border border-[#bc8cff]/30 flex items-center justify-center text-[#bc8cff] mb-4">
                <Award className="h-5 w-5" />
              </div>
              <h3 className="text-base font-bold text-white mb-2">Global Percentile Benchmarks</h3>
              <p className="text-xs text-[#8b949e] leading-relaxed">
                Statistically ranks your commit velocity, stars, and consistency against millions of global GitHub accounts to reveal your exact global percentile.
              </p>
            </div>

            <div className="glass-panel p-6">
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

        {/* Head-to-Head Comparison Banner */}
        <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
          <div className="p-8 rounded-2xl bg-gradient-to-r from-[#161b22] via-[#101622] to-[#161b22] border border-[#30363d] flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
            <div className="space-y-2 text-center sm:text-left">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#bc8cff]/20 text-[#bc8cff] text-[11px] font-bold">
                <Users className="h-3 w-3" /> Dev vs Dev Matrix
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-white">
                Battle Any Two Developers Side-by-Side
              </h3>
              <p className="text-xs text-[#8b949e] max-w-md">
                Compare annual commits, ecosystem stars, repo health scores, and work cadence on a multi-dimensional comparative radar chart.
              </p>
            </div>

            <Link
              href="/compare"
              className="px-6 py-3 rounded-xl bg-[#21262d] hover:bg-[#30363d] text-white border border-[#30363d] text-xs font-bold transition-all shadow-md flex items-center gap-2 flex-shrink-0"
            >
              <span>Launch Comparison Matrix</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
