"use client";

import { useEffect, useRef } from "react";

import type { LinkItem } from "@/lib/profile";

type Props = {
  link: LinkItem;
  /** 누적 클릭 수. DB 미연결 시 undefined 라 배지를 그리지 않습니다. */
  clickCount?: number;
  /** 클릭을 상위(LinkList)에 알립니다. 집계와 표시는 그쪽이 맡습니다. */
  onActivate: (id: string) => void;
};

export default function LinkCard({ link, clickCount, onActivate }: Props) {
  const anchorRef = useRef<HTMLAnchorElement>(null);
  const mailUser = link.mail?.user;
  const mailDomain = link.mail?.domain;

  // 메일 주소는 서버 HTML에 남기지 않으려고 하이드레이션 후 DOM 에 직접 꽂습니다.
  // state 로 두면 첫 렌더가 서버와 달라져 하이드레이션이 어긋납니다.
  useEffect(() => {
    const anchor = anchorRef.current;
    if (!anchor || !mailUser || !mailDomain) return;

    anchor.href = `mailto:${mailUser}@${mailDomain}`;
  }, [mailUser, mailDomain]);

  const isExternal = link.url !== undefined && /^https?:/i.test(link.url);

  return (
    <a
      ref={anchorRef}
      href={link.url}
      onClick={() => onActivate(link.id)}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
      className="relative flex items-center justify-center rounded-2xl border border-white/10 bg-white/[0.06] px-14 py-4.5 text-center text-[15px] font-semibold tracking-tight shadow-card backdrop-blur-md transition duration-200 ease-out hover:-translate-y-0.5 hover:border-white/20 hover:bg-white/[0.1] hover:shadow-card-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent active:translate-y-0"
    >
      <span className="truncate">{link.label}</span>

      {clickCount !== undefined && (
        <span
          className="absolute right-5 text-[11px] font-medium tabular-nums text-muted/70"
          title="클릭 수"
        >
          {clickCount.toLocaleString("ko-KR")}회
        </span>
      )}
    </a>
  );
}
