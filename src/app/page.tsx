import LinkList from "@/components/LinkList";
import ProfileHeader from "@/components/ProfileHeader";
import { getClickCounts } from "@/lib/clicks";
import { links, profile } from "@/lib/profile";

// 클릭 수는 매 요청마다 최신 값을 보여 줍니다.
export const dynamic = "force-dynamic";

export default async function Home() {
  const clickCounts = await getClickCounts();
  const showClickCounts = Boolean(process.env.MONGODB_URI);

  return (
    <main className="mx-auto flex w-full max-w-[400px] flex-1 flex-col px-7 pt-20 pb-14 sm:px-8 sm:pt-24">
      {/* 상단: 원형 프로필 사진 + 이름 + 한 줄 소개 */}
      <ProfileHeader profile={profile} />

      {/* 하단: 링크 카드 세로 목록 */}
      <div className="mt-14">
        <LinkList
          links={links}
          clickCounts={clickCounts}
          showClickCounts={showClickCounts}
        />
      </div>

      <footer className="mt-auto pt-20 text-center text-[11px] text-muted/70">
        🌳 링크나무로 만든 페이지
      </footer>
    </main>
  );
}
