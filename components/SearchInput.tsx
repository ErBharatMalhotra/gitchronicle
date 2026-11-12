"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, Sparkles, Terminal } from "lucide-react";

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

  const handleSelectDemo = (name: string) => {
    setUsername(name);
    router.push(`/u/${encodeURIComponent(name)}`);
  };

  return (
    <div className={`w-full max-w-2xl mx-auto ${className}`}>
      <form onSubmit={handleSearch} className="relative group">
        <div className="absolute -inset-0.5 bg-gradient-to-r from-[#58a6ff] via-[#bc8cff] to-[#f778ba] rounded-2xl blur opacity-35 group-hover:opacity-85 transition duration-300"></div>

        <div className="relative flex items-center bg-[#101622] border border-[#30363d] rounded-xl p-1.5 shadow-2xl transition-all focus-within:border-[#58a6ff]">
          <div className="pl-3.5 pr-2 text-[#8b949e] flex items-center gap-1.5">
            <Terminal className="h-4 w-4 text-[#58a6ff]" />
            <span className="text-sm font-mono text-[#6e7681]">github.com/</span>
          </div>

          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="enter any GitHub handle (e.g. ErBharatMalhotra)"
            className="flex-1 bg-transparent py-2.5 px-2 text-sm sm:text-base text-[#e6edf3] placeholder-[#6e7681] focus:outline-none font-mono"
            autoFocus
          />

          <button
            type="submit"
            className="flex items-center gap-2 px-6 py-2.5 rounded-lg bg-gradient-to-r from-[#58a6ff] to-[#bc8cff] hover:opacity-95 text-[#090d16] font-bold text-sm transition-all duration-200 shadow-lg shadow-[#58a6ff]/25 active:scale-95"
          >
            <span>Analyze</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </form>

      {/* Flagship Creator Demo Pill */}
      <div className="flex items-center justify-center gap-2 mt-4 text-xs">
        <span className="text-[#6e7681] flex items-center gap-1">
          <Sparkles className="h-3.5 w-3.5 text-[#ffd700]" />
          <span>Quick Demo:</span>
        </span>
        <button
          onClick={() => handleSelectDemo("ErBharatMalhotra")}
          className="px-3 py-1 rounded-full bg-[#161b22] hover:bg-[#21262d] text-[#58a6ff] hover:text-[#79b8ff] border border-[#30363d] font-mono text-xs transition-colors flex items-center gap-1.5 shadow-sm"
        >
          <span>@ErBharatMalhotra</span>
          <span className="text-[10px] bg-[#ffd700]/20 text-[#ffd700] px-1.5 py-0.2 rounded font-sans font-bold">
            Creator
          </span>
        </button>
      </div>
    </div>
  );
}
