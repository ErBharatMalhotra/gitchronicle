import Link from "next/link";
import { Heart, Github, ExternalLink, ShieldCheck, Zap } from "lucide-react";

export function Footer() {
  return (
    <footer className="w-full border-t border-[#30363d] bg-[#0d1117] mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand Col */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2">
              <span className="font-bold text-base bg-gradient-to-r from-white to-[#8b949e] bg-clip-text text-transparent">
                GitChronicle
              </span>
              <span className="text-[10px] font-mono uppercase bg-[#1f3a5f] text-[#58a6ff] px-2 py-0.5 rounded-full border border-[#58a6ff]/30">
                v1.0 Free & Open Source
              </span>
            </div>
            <p className="text-xs text-[#8b949e] max-w-sm leading-relaxed">
              Real-time developer intelligence observatory and percentile benchmarking dashboard.
              Zero setup, rate-limit immune, and designed for engineers who build in public.
            </p>
            <div className="text-xs text-[#6e7681] pt-1">
              Hosted on{" "}
              <a
                href="https://gitchronicle.bharatdn.com"
                className="text-[#58a6ff] hover:underline"
              >
                gitchronicle.bharatdn.com
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-semibold text-[#e6edf3] uppercase tracking-wider mb-3">
              Explore Benchmarks
            </h4>
            <ul className="space-y-2 text-xs text-[#8b949e]">
              <li>
                <Link href="/u/ErBharatMalhotra" className="hover:text-[#58a6ff] transition-colors">
                  Bharat Malhotra (Creator)
                </Link>
              </li>
              <li>
                <Link href="/u/shadcn" className="hover:text-[#58a6ff] transition-colors">
                  shadcn
                </Link>
              </li>
              <li>
                <Link href="/u/leerob" className="hover:text-[#58a6ff] transition-colors">
                  Lee Robinson
                </Link>
              </li>
              <li>
                <Link href="/u/torvalds" className="hover:text-[#58a6ff] transition-colors">
                  Linus Torvalds
                </Link>
              </li>
              <li>
                <Link href="/compare" className="hover:text-[#58a6ff] transition-colors">
                  Dev vs Dev Comparison
                </Link>
              </li>
            </ul>
          </div>

          {/* Architecture Specs */}
          <div>
            <h4 className="text-xs font-semibold text-[#e6edf3] uppercase tracking-wider mb-3">
              Architecture & API
            </h4>
            <ul className="space-y-2 text-xs text-[#8b949e]">
              <li className="flex items-center gap-1.5">
                <Zap className="h-3.5 w-3.5 text-[#e6b450]" />
                <span>1-Point GraphQL Query</span>
              </li>
              <li className="flex items-center gap-1.5">
                <ShieldCheck className="h-3.5 w-3.5 text-[#3fb950]" />
                <span>6hr Edge SWR Cache</span>
              </li>
              <li>
                <a
                  href="/badge/ErBharatMalhotra.svg"
                  target="_blank"
                  className="hover:text-[#58a6ff] transition-colors flex items-center gap-1"
                >
                  <span>Dynamic SVG Badges</span>
                  <ExternalLink className="h-3 w-3" />
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/ErBharatMalhotra/GitChronicle"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#58a6ff] transition-colors flex items-center gap-1"
                >
                  <span>GitHub Repository</span>
                  <ExternalLink className="h-3 w-3" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-[#21262d] pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#6e7681]">
          <p>© {new Date().getFullYear()} GitChronicle. Free, MIT Licensed software by ErBharatMalhotra.</p>
          <div className="flex items-center gap-1">
            <span>Built with precision for the global developer ecosystem.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
