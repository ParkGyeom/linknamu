"use client";

import { useEffect, useState } from "react";

import type { LinkItem } from "@/lib/profile";

type Props = {
  link: LinkItem;
  /** 서버에서 읽어 온 누적 클릭 수. DB 미연결 시 undefined */
  clickCount?: number;
};

export default function LinkCard({ link, clickCount }: Props) {
  const [count, setCount] = useState(clickCount);

  // 메일 항목은 주소를 서버 HTML에 남기지 않으려고 마운트 후에 조립합니다.
  // 그 전까지 href가 없어 링크로 동작하지 않지만, 하이드레이션 직후 복구됩니다.
  const [href, setHref] = useState(link.url);
  const mailUser = link.mail?.user;
  const mailDomain = link.mail?.domain;

  useEffect(() => {
    if (mailUser && mailDomain) {
      setHref(`mailto:${mailUser}@${mailDomain}`);
    }
  }, [mailUser, mailDomain]);

  const isExternal = href !== undefined && /^https?:/i.test(href);

  // 기본 이동은 그대로 두고, 집계 요청만 별도로 띄워 보냅니다.
  // keepalive 덕분에 같은 탭에서 페이지를 떠나도 요청이 유지됩니다.
  function handleClick() {
    setCount((prev) => (prev === undefined ? prev : prev + 1));

    void fetch(`/api/links/${link.id}/click`, {
      method: "POST",
      keepalive: true,
    }).catch(() => {
      // 집계 실패가 링크 이동을 막지 않도록 조용히 무시합니다.
    });
  }

  return (
    <a
      href={href}
      onClick={handleClick}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
      className="relative flex items-center justify-center rounded-2xl border border-white/10 bg-white/[0.06] px-14 py-4.5 text-center text-[15px] font-semibold tracking-tight shadow-card backdrop-blur-md transition duration-200 ease-out hover:-translate-y-0.5 hover:border-white/20 hover:bg-white/[0.1] hover:shadow-card-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent active:translate-y-0"
    >
      <span className="truncate">{link.label}</span>

      {count !== undefined && (
        <span
          className="absolute right-5 text-[11px] font-medium tabular-nums text-muted/70"
          title="클릭 수"
        >
          {count.toLocaleString("ko-KR")}회
        </span>
      )}
    </a>
  );
}
