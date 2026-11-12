"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, ArrowRight, Sparkles, Terminal } from "lucide-react";

const SUGGESTIONS = [
  "ErBharatMalhotra",
  "shadcn",
  "leerob",
  "torvalds",
  "tj",
  "sindresorhus",
];

export function SearchInput({ className = "" }: { className?: string }) {
  const [username, setUsername] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const cleaned = username.trim().replace(/^@/, "");
    if (cleaned) {
      router.push(`/u/${encodeURIComponent(cleaned)}`);
    }
  };

  const handleSelectSuggestion = (name: string) => {
    setUsername(name);
    router.push(`/u/${encodeURIComponent(name)}`);
  };

  return (
    <div className={`w-full max-w-2xl mx-auto ${className}`}>
      <form onSubmit={handleSearch} className="relative group">
        <div className="absolute -inset-0.5 bg-gradient-to-r from-[#58a6ff] via-[#a371f7] to-[#f778ba] rounded-2xl blur opacity-30 group-hover:opacity-75 transition duration-300"></div>

        <div className="relative flex items-center bg-[#161b22] border border-[#30363d] rounded-xl p-1.5 shadow-2xl transition-all focus-within:border-[#58a6ff]">
          <div className="pl-3.5 pr-2 text-[#8b949e] flex items-center gap-1.5">
            <Terminal className="h-4 w-4 text-[#58a6ff]" />
            <span className="text-sm font-mono text-[#6e7681]">github.com/</span>
          </div>

          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="enter any developer handle (e.g. ErBharatMalhotra)"
            className="flex-1 bg-transparent py-2.5 px-2 text-sm sm:text-base text-[#e6edf3] placeholder-[#6e7681] focus:outline-none font-mono"
            autoFocus
          />

          <button
            type="submit"
            className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-gradient-to-r from-[#58a6ff] to-[#a371f7] hover:from-[#79b8ff] hover:to-[#b78eff] text-[#0d1117] font-semibold text-sm transition-all duration-200 shadow-lg shadow-[#58a6ff]/25 active:scale-95"
          >
            <span>Analyze</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </form>

      {/* Suggested Handles */}
      <div className="flex flex-wrap items-center justify-center gap-2 mt-4 text-xs">
        <span className="text-[#6e7681] flex items-center gap-1">
          <Sparkles className="h-3.5 w-3.5 text-[#e6b450]" />
          <span>Try popular:</span>
        </span>
        {SUGGESTIONS.map((name) => (
          <button
            key={name}
            onClick={() => handleSelectSuggestion(name)}
            className="px-2.5 py-1 rounded-md bg-[#21262d] hover:bg-[#30363d] text-[#c9d1d9] hover:text-[#58a6ff] border border-[#30363d]/60 font-mono text-[11px] transition-colors"
          >
            @{name}
          </button>
        ))}
      </div>
    </div>
  );
}
