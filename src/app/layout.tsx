import type { Metadata } from "next";
import "./globals.css";

import { profile } from "@/lib/profile";

const PRETENDARD_CSS =
  "https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.css";

export const metadata: Metadata = {
  title: `${profile.name} | 링크나무`,
  description: profile.bio,
  openGraph: {
    title: `${profile.name} | 링크나무`,
    description: profile.bio,
    type: "profile",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ko" className="h-full antialiased">
      <body className="flex min-h-full flex-col">
        {/* 한글·영문을 함께 커버하는 둥근 산세리프. 동적 서브셋이라 필요한 글자만 받습니다. */}
        <link rel="preconnect" href="https://cdn.jsdelivr.net" crossOrigin="" />
        <link rel="stylesheet" href={PRETENDARD_CSS} />
        {children}
      </body>
    </html>
  );
}
