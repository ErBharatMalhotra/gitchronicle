import { NextRequest, NextResponse } from "next/server";
import { fetchDeveloperProfile } from "@/lib/github";
import { buildDeveloperDossier } from "@/lib/dossier";

export const runtime = "nodejs";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ username: string }> }
) {
  try {
    const { username } = await params;
    const login = decodeURIComponent(username);

    const profileData = await fetchDeveloperProfile(login);

    if (!profileData || !profileData.user) {
      return NextResponse.json(
        { error: "Developer profile not found" },
        { status: 404 }
      );
    }

    const dossier = buildDeveloperDossier(profileData.user, profileData.isCached);

    return NextResponse.json(dossier, {
      status: 200,
      headers: {
        "Cache-Control": "public, max-age=3600, s-maxage=21600, stale-while-revalidate=86400",
        "Access-Control-Allow-Origin": "*",
      },
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Internal Server Error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
