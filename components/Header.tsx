"use client";

import Link from "next/link";
import { useState } from "react";
import { Search, Github, GitFork, Sparkles, BarChart3, Users, CodeXml } from "lucide-react";
import { useRouter } from "next/navigation";

export function Header() {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/u/${encodeURIComponent(query.trim())}`);
      setQuery("");
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#30363d] bg-[#0d1117]/85 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-[#58a6ff] via-[#a371f7] to-[#f778ba] p-[2px] shadow-lg shadow-[#58a6ff]/20">
            <div className="h-full w-full bg-[#0d1117] rounded-[10px] flex items-center justify-center group-hover:bg-[#161b22] transition-colors">
              <BarChart3 className="h-4.5 w-4.5 text-[#58a6ff] group-hover:scale-110 transition-transform" />
            </div>
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-lg tracking-tight bg-gradient-to-r from-white via-[#e6edf3] to-[#8b949e] bg-clip-text text-transparent">
              GitChronicle
            </span>
            <span className="text-[10px] text-[#58a6ff] -mt-1 font-mono tracking-widest uppercase">
              Developer Intelligence
            </span>
          </div>
        </Link>

        {/* Global Quick Search Bar */}
        <form onSubmit={handleSearch} className="hidden sm:flex items-center flex-1 max-w-sm mx-4">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[#6e7681]" />
            <input
              type="text"
              placeholder="Search GitHub user (e.g. torvalds)..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full h-9 pl-9 pr-4 rounded-lg bg-[#161b22] border border-[#30363d] text-xs text-[#e6edf3] placeholder-[#6e7681] focus:outline-none focus:border-[#58a6ff] focus:ring-1 focus:ring-[#58a6ff] transition-all"
            />
          </div>
        </form>

        {/* Nav Links */}
        <nav className="flex items-center gap-3">
          <Link
            href="/compare"
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#c9d1d9] hover:text-white bg-[#161b22] hover:bg-[#21262d] border border-[#30363d] rounded-lg transition-colors"
          >
            <Users className="h-3.5 w-3.5 text-[#a371f7]" />
            <span className="hidden sm:inline">Dev vs Dev</span>
          </Link>

          <a
            href="https://readme.bharatdn.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#c9d1d9] hover:text-[#10b981] bg-[#161b22] hover:bg-[#10b981]/10 border border-[#30363d] hover:border-[#10b981]/30 rounded-lg transition-colors"
          >
            <CodeXml className="h-3.5 w-3.5 text-[#10b981]" />
            <span className="hidden sm:inline">Craft README</span>
          </a>

          <a
            href="https://github.com/ErBharatMalhotra/GitChronicle"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#c9d1d9] hover:text-white bg-[#21262d] hover:bg-[#30363d] rounded-lg transition-colors"
          >
            <Github className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Star on GitHub</span>
          </a>
        </nav>
      </div>
    </header>
  );
}
