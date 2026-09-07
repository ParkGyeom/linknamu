"use client";

import { useCallback, useEffect, useState } from "react";

import LinkCard from "@/components/LinkCard";
import type { LinkItem } from "@/lib/profile";

type Props = {
  links: LinkItem[];
  /** DB 연결이 없으면 클릭 수를 아예 표시하지 않습니다. */
  showClickCounts: boolean;
};

export default function LinkList({ links, showClickCounts }: Props) {
  // 집계를 여기서 한 번만 들고 있습니다. 서버 렌더를 DB 왕복으로 막지 않으려고
  // 마운트 후에 가져오며, 그 전까지는 아래 ?? 0 때문에 모두 "0회"로 보입니다.
  const [counts, setCounts] = useState<Record<string, number>>({});

  useEffect(() => {
    if (!showClickCounts) return;

    const controller = new AbortController();

    void fetch("/api/links/clicks", { signal: controller.signal })
      .then((res) => (res.ok ? res.json() : null))
      .then((data: { ok: boolean; counts: Record<string, number> } | null) => {
        if (data?.ok) setCounts(data.counts);
      })
      .catch(() => {
        // 집계는 부가 기능이므로, 실패하면 0회인 채로 둡니다.
      });

    return () => controller.abort();
  }, [showClickCounts]);

  // 링크 이동을 막지 않도록, 화면은 먼저 1 올리고 서버 값이 오면 맞춰 둡니다.
  const handleActivate = useCallback((id: string) => {
    setCounts((prev) => ({ ...prev, [id]: (prev[id] ?? 0) + 1 }));

    void fetch(`/api/links/${id}/click`, { method: "POST", keepalive: true })
      .then((res) => (res.ok ? res.json() : null))
      .then((data: { ok: boolean; count: number | null } | null) => {
        if (data?.ok && typeof data.count === "number") {
          setCounts((prev) => ({ ...prev, [id]: data.count as number }));
        }
      })
      .catch(() => {
        // 집계 실패가 링크 이동을 막지 않도록 조용히 무시합니다.
      });
  }, []);

  return (
    <nav aria-label="링크 목록" className="flex flex-col gap-4 sm:gap-[18px]">
      {links.map((link) => (
        <LinkCard
          key={link.id}
          link={link}
          clickCount={showClickCounts ? (counts[link.id] ?? 0) : undefined}
          onActivate={handleActivate}
        />
      ))}
    </nav>
  );
}
