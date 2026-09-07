import { NextResponse } from "next/server";

import { getClickCounts } from "@/lib/clicks";

// 집계는 항상 최신 값이어야 하므로 캐시하지 않습니다.
export const dynamic = "force-dynamic";

/** GET /api/links/clicks — 모든 링크의 누적 클릭 수를 한 번에 돌려줍니다. */
export async function GET() {
  const counts = await getClickCounts();
  return NextResponse.json({ ok: true, counts });
}
