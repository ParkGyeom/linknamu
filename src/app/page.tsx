import LinkList from "@/components/LinkList";
import ProfileHeader from "@/components/ProfileHeader";
import { links, profile } from "@/lib/profile";

// 클릭 수는 브라우저가 마운트 후 따로 가져오므로 이 페이지는 DB 를 기다리지 않습니다.
// 다만 MONGODB_URI 유무는 빌드 시점이 아니라 요청 시점에 확인해야 합니다.
export const dynamic = "force-dynamic";

export default function Home() {
  const showClickCounts = Boolean(process.env.MONGODB_URI);

  return (
    <main className="mx-auto flex w-full max-w-[400px] flex-1 flex-col px-7 pt-20 pb-14 sm:px-8 sm:pt-24">
      {/* 상단: 원형 프로필 사진 + 이름 + 한 줄 소개 */}
      <ProfileHeader profile={profile} />

      {/* 하단: 링크 카드 세로 목록 */}
      <div className="mt-14">
        <LinkList links={links} showClickCounts={showClickCounts} />
      </div>

      <footer className="mt-auto pt-20 text-center text-[11px] text-muted/70">
        🌳 링크나무로 만든 페이지
      </footer>
    </main>
  );
}
