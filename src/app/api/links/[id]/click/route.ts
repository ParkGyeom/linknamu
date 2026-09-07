import { NextResponse } from "next/server";

import { recordClick } from "@/lib/clicks";
import { findLink } from "@/lib/profile";

/** POST /api/links/:id/click — 링크 클릭 수를 1 올립니다. */
export async function POST(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;

  if (!findLink(id)) {
    return NextResponse.json(
      { ok: false, error: "존재하지 않는 링크입니다." },
      { status: 404 },
    );
  }

  try {
    const count = await recordClick(id);
    return NextResponse.json({ ok: true, id, count });
  } catch (error) {
    console.error(`[linknamu] '${id}' 클릭 기록 실패:`, error);
    return NextResponse.json(
      { ok: false, error: "클릭 수를 기록하지 못했습니다." },
      { status: 500 },
    );
  }
}
