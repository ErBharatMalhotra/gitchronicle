import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";
import { fetchDeveloperProfile } from "@/lib/github";
import { buildDeveloperDossier } from "@/lib/dossier";

export const runtime = "edge";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const username = searchParams.get("username") || "ErBharatMalhotra";

    const profileData = await fetchDeveloperProfile(username);
    const dossier = buildDeveloperDossier(profileData.user, profileData.isCached);

    const { user, percentile, cadence, contributions } = dossier;

    return new ImageResponse(
      (
        <div
          style={{
            height: "100%",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            backgroundColor: "#0d1117",
            padding: "50px 60px",
            fontFamily: "system-ui, sans-serif",
            color: "#e6edf3",
            position: "relative",
          }}
        >
          {/* Ambient glow */}
          <div
            style={{
              position: "absolute",
              top: "-100px",
              right: "-100px",
              width: "400px",
              height: "400px",
              borderRadius: "9999px",
              backgroundColor: percentile.badgeColor,
              opacity: 0.15,
            }}
          />

          {/* Top Header */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <div
                style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "10px",
                  background: "linear-gradient(135deg, #58a6ff, #a371f7)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: 900,
                  fontSize: "20px",
                  color: "#0d1117",
                }}
              >
                GC
              </div>
              <span style={{ fontSize: "24px", fontWeight: "bold", letterSpacing: "-0.5px" }}>
                GitChronicle
              </span>
            </div>
            <div
              style={{
                fontSize: "16px",
                color: "#58a6ff",
                fontFamily: "monospace",
                textTransform: "uppercase",
              }}
            >
              gitchronicle.bharatdn.com
            </div>
          </div>

          {/* Profile Card Center */}
          <div style={{ display: "flex", alignItems: "center", gap: "32px", margin: "20px 0" }}>
            {/* Avatar */}
            <img
              src={user.avatarUrl}
              alt={user.name}
              style={{
                width: "120px",
                height: "120px",
                borderRadius: "24px",
                border: `3px solid ${percentile.badgeColor}`,
              }}
            />

            {/* User Meta */}
            <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                <span style={{ fontSize: "38px", fontWeight: 900, color: "#ffffff" }}>
                  {user.name}
                </span>
                <span
                  style={{
                    fontSize: "14px",
                    fontWeight: 800,
                    padding: "6px 14px",
                    borderRadius: "9999px",
                    backgroundColor: percentile.badgeColor,
                    color: "#0d1117",
                    textTransform: "uppercase",
                  }}
                >
                  {percentile.tier}
                </span>
              </div>
              <span style={{ fontSize: "20px", color: "#8b949e", fontFamily: "monospace" }}>
                @{user.login} · {percentile.badgeName}
              </span>
            </div>
          </div>

          {/* Stats Bar */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              backgroundColor: "#161b22",
              border: "1px solid #30363d",
              borderRadius: "16px",
              padding: "20px 30px",
            }}
          >
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span style={{ fontSize: "14px", color: "#8b949e" }}>Global Percentile</span>
              <span style={{ fontSize: "28px", fontWeight: "bold", color: "#ffd700" }}>
                Top {percentile.percentileRank}%
              </span>
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span style={{ fontSize: "14px", color: "#8b949e" }}>Yearly Contributions</span>
              <span style={{ fontSize: "28px", fontWeight: "bold", color: "#58a6ff" }}>
                {contributions.totalLastYear.toLocaleString()}
              </span>
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span style={{ fontSize: "14px", color: "#8b949e" }}>Total Stars</span>
              <span style={{ fontSize: "28px", fontWeight: "bold", color: "#e6b450" }}>
                {user.totalStars.toLocaleString()}
              </span>
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span style={{ fontSize: "14px", color: "#8b949e" }}>Rhythm Archetype</span>
              <span style={{ fontSize: "28px", fontWeight: "bold", color: "#3fb950" }}>
                {cadence.archetype}
              </span>
            </div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (e: unknown) {
    const errorMsg = e instanceof Error ? e.message : String(e);
    return new Response(`Failed to generate OG image: ${errorMsg}`, { status: 500 });
  }
}
